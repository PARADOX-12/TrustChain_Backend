
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PrimaryButton, OutlineButton } from '@/components/ui/button-variants';
import Footer from '@/components/Footer';
import { Mail, Lock, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithMetamask, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const handleMetamaskLogin = async () => {
    setIsSubmitting(true);
    await loginWithMetamask();
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-softgray">
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access the blockchain pharmaceutical tracking system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-10 text-red-500 p-3 rounded-md flex items-center space-x-2 animate-fade-in">
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email" 
                    placeholder="Enter your email"
                    className="pl-10" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="password" 
                    placeholder="Enter your password"
                    className="pl-10" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <PrimaryButton 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in with Email'}
              </PrimaryButton>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-softgray px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <OutlineButton
              type="button"
              className="w-full"
              onClick={handleMetamaskLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connecting...' : 'Connect with MetaMask'}
            </OutlineButton>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-center text-sm text-gray-500 mt-4">
              Demo accounts:
            </p>
            <div className="text-xs text-gray-500 space-y-1">
            <p>Admin: admin@example.com / AdminPassword123</p>
              <p>Manufacturer: testuser@example.com / TestPassword123</p>
              <p>Distributor: contact@globalpharmadist.com / GlobalPharma@2024</p>
              <p>Regulator: regulator@example.com / RegulatorPass456</p>
              <p>Pharmacy: pharmacy@example.com / PharmacyPass789</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
