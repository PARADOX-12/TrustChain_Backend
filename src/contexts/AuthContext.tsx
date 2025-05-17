
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

// Define types for our authentication context
type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manufacturer' | 'distributor' | 'regulator' | 'pharmacy';
  walletAddress?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithMetamask: () => Promise<void>;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Email password login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a mock login - in a real app, you would call your backend
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
      } else if (email === 'manufacturer@example.com' && password === 'password') {
        const user: User = {
          id: '2',
          email: 'manufacturer@example.com',
          name: 'Manufacturer User',
          role: 'manufacturer'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Manufacturer!",
        });
      } else if (email === 'distributor@example.com' && password === 'password') {
        const user: User = {
          id: '3',
          email: 'distributor@example.com',
          name: 'Distributor User',
          role: 'distributor'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Distributor!",
        });
      } else if (email === 'regulator@example.com' && password === 'password') {
        const user: User = {
          id: '4',
          email: 'regulator@example.com',
          name: 'Regulator User',
          role: 'regulator'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Regulator!",
        });
      } else if (email === 'pharmacy@example.com' && password === 'password') {
        const user: User = {
          id: '5',
          email: 'pharmacy@example.com',
          name: 'Pharmacy User',
          role: 'pharmacy'
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Pharmacy!",
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Login failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Metamask login
  const loginWithMetamask = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const walletAddress = accounts[0];
      
      // Here, you would typically validate this wallet address on your backend
      // and return the user's role based on the address
      // For demo purposes, we'll assign a random role
      const roles: ('admin' | 'manufacturer' | 'distributor' | 'regulator' | 'pharmacy')[] = [
        'admin', 'manufacturer', 'distributor', 'regulator', 'pharmacy'
      ];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      
      const user: User = {
        id: '3',
        email: 'wallet@example.com',
        name: 'Wallet User',
        role: randomRole,
        walletAddress: walletAddress
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Login successful with MetaMask",
        description: `Connected with wallet: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} as ${randomRole}`,
      });
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "MetaMask login failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    loginWithMetamask,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Add types for window.ethereum to avoid TypeScript errors
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
