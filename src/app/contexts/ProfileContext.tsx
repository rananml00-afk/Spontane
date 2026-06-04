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

interface StoredAccount {
  profile: UserProfile;
  password: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoggedIn: boolean;
  saveProfile: (data: UserProfile) => void;
  updateProfile: (data: UserProfile) => void;
  register: (fullName: string, email: string, password: string, city: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoginDialogOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ACCOUNT_KEY = 'spontane_account';
const SESSION_KEY = 'spontane_session';

function loadAccount(): StoredAccount | null {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<StoredAccount | null>(loadAccount);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!loadAccount() && sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  useEffect(() => {
    if (account) {
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    } else {
      localStorage.removeItem(ACCOUNT_KEY);
    }
  }, [account]);

  const register = (fullName: string, email: string, password: string, city: string) => {
    const profile: UserProfile = {
      fullName,
      email,
      city,
      bio: '',
      languages: [],
      interests: [],
      memberSince: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      upcomingEventIds: [1, 4, 3],
      joinedEventIds: [6, 2],
    };
    const newAccount: StoredAccount = { profile, password };
    setAccount(newAccount);
    setIsLoggedIn(true);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const login = (email: string, password: string): boolean => {
    const stored = loadAccount();
    if (stored && stored.profile.email === email && stored.password === password) {
      setAccount(stored);
      setIsLoggedIn(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const saveProfile = (data: UserProfile) => {
    const updated: StoredAccount = {
      profile: { ...data, memberSince: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
      password: account?.password ?? '',
    };
    setAccount(updated);
    setIsLoggedIn(true);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const updateProfile = (data: UserProfile) => {
    if (!account) return;
    setAccount({ ...account, profile: data });
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <ProfileContext.Provider value={{
      profile: isLoggedIn ? (account?.profile ?? null) : null,
      isLoggedIn,
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
