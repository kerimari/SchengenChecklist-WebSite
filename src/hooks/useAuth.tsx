import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; needsVerification?: boolean }>;
  register: (userData: User & { password: string }) => Promise<boolean>;
  logout: () => void;
  resendVerificationEmail: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('schengen_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData: User & { password: string }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('schengen_users') || '[]');
      
      const existingUser = users.find((u: { email: string }) => u.email === userData.email);
      if (existingUser) {
        return false;
      }

      const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        emailVerified: true,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('schengen_users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error('Kayıt hatası:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; needsVerification?: boolean }> => {
    try {
      const users = JSON.parse(localStorage.getItem('schengen_users') || '[]');
      const foundUser = users.find((u: { email: string; password: string; firstName: string; lastName: string; phone: string }) => u.email === email && u.password === password);

      if (foundUser) {
        const userData: User = {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          phone: foundUser.phone,
          emailVerified: true
        };
        
        setUser(userData);
        localStorage.setItem('schengen_current_user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Giriş hatası:', error);
      return { success: false };
    }
  };

  const resendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      console.log(`Doğrulama e-postası tekrar gönderildi: ${email}`);
      return true;
    } catch (error) {
      console.error('E-posta gönderim hatası:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schengen_current_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      resendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}