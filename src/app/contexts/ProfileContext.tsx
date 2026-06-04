import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  saveProfile: (data: UserProfile) => void;
  updateProfile: (data: UserProfile) => void;
  logout: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'spontane_profile';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [profile]);

  const saveProfile = (data: UserProfile) => {
    setProfile({ ...data, memberSince: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) });
  };

  const updateProfile = (data: UserProfile) => {
    setProfile(data);
  };

  const logout = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoggedIn: !!profile, saveProfile, updateProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
