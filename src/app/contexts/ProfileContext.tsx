import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase/client';

export interface UserLanguage {
  name: string;
  level: 'Native' | 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1';
}

export interface UserProfile {
  fullName: string;
  email: string;
  city: string;
  bio: string;
  languages: UserLanguage[];
  interests: string[];
  memberSince: string;
  upcomingEventIds: number[];
  joinedEventIds: number[];
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  saveProfile: (data: UserProfile) => Promise<void>;
  updateProfile: (data: UserProfile) => Promise<void>;
  register: (fullName: string, email: string, password: string, city: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  isLoginDialogOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function buildProfile(authUser: { email?: string; created_at?: string }, dbRow: Record<string, unknown> | null): UserProfile {
  return {
    fullName: (dbRow?.full_name as string) || '',
    email: authUser.email || '',
    city: (dbRow?.city as string) || '',
    bio: (dbRow?.bio as string) || '',
    languages: (dbRow?.languages as UserLanguage[]) || [],
    interests: (dbRow?.interests as string[]) || [],
    memberSince: authUser.created_at
      ? new Date(authUser.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
      : '',
    upcomingEventIds: [],
    joinedEventIds: [],
  };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  async function loadProfileFromDB(userId: string, authUser: { email?: string; created_at?: string }) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setProfile(buildProfile(authUser, data));
    setIsLoggedIn(true);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfileFromDB(session.user.id, session.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfileFromDB(session.user.id, session.user);
      } else {
        setProfile(null);
        setIsLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (fullName: string, email: string, password: string, city: string): Promise<string | null> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    const user = data.user;
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: fullName,
        city,
        bio: '',
        languages: [],
        interests: [],
        updated_at: new Date().toISOString(),
      });
      await loadProfileFromDB(user.id, user);
    }
    return null;
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    if (data.user) await loadProfileFromDB(data.user.id, data.user);
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setIsLoggedIn(false);
  };

  const saveProfile = async (data: UserProfile) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    await supabase.from('profiles').upsert({
      id: session.user.id,
      full_name: data.fullName,
      city: data.city,
      bio: data.bio,
      languages: data.languages,
      interests: data.interests,
      updated_at: new Date().toISOString(),
    });
    setProfile({ ...data, email: session.user.email || data.email });
    setIsLoggedIn(true);
  };

  const updateProfile = async (data: UserProfile) => {
    await saveProfile(data);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      isLoggedIn,
      isLoading,
      saveProfile,
      updateProfile,
      register,
      login,
      logout,
      isLoginDialogOpen,
      openLoginDialog: () => setIsLoginDialogOpen(true),
      closeLoginDialog: () => setIsLoginDialogOpen(false),
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
