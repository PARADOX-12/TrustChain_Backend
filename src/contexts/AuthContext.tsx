import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

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
    const storedToken = localStorage.getItem('token'); // Also get the token
    
    if (storedUser && storedToken) {
      // You might want to add a check here to see if the token is still valid
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set default auth header
    }
    setIsLoading(false);
  }, []);

  // Email password login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call backend login API
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      const { token, data: { user: userData } } = response.data;

      // Store user data and token
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role.toLowerCase(), // Ensure role is lowercase
        walletAddress: userData.walletAddress,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); // Store the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default auth header

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`, // Use user's name from backend
      });

    } catch (err) {
      setError((err as any).response?.data?.message || (err as Error).message || 'An unexpected error occurred'); // Better error handling
      toast({
        title: "Login failed",
        description: (err as any).response?.data?.message || (err as Error).message || 'An unexpected error occurred', // Use backend error message
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
      
      // Call backend Metamask login API (you may need to implement this endpoint)
      // For now, we'll still use a mock response structure, but you'd replace this
      const response = await axios.post('http://localhost:3000/api/auth/login-metamask', { walletAddress }); // Assuming a Metamask login endpoint

      const { token, data: { user: userData } } = response.data;
      
       const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role.toLowerCase(), // Ensure role is lowercase
        walletAddress: userData.walletAddress,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); // Store the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default auth header
      
      toast({
        title: "Login successful with MetaMask",
        description: `Connected with wallet: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)} as ${user.role}`,
      });

    } catch (err) {
      setError((err as any).response?.data?.message || (err as Error).message || 'An unexpected error occurred'); // Better error handling
      toast({
        title: "MetaMask login failed",
        description: (err as any).response?.data?.message || (err as Error).message || 'An unexpected error occurred', // Use backend error message
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
    localStorage.removeItem('token'); // Remove token on logout
    delete axios.defaults.headers.common['Authorization']; // Remove auth header
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
