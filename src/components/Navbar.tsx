
import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 backdrop-blur-lg bg-white bg-opacity-80 shadow-soft' 
          : 'py-5 bg-white bg-opacity-95'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-navy font-bold text-2xl tracking-tight animate-fade-in">TrustChain</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-navy text-sm font-medium hover-link ${location.pathname === '/' ? 'font-bold' : ''}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`text-navy text-sm font-medium hover-link ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}>
            Dashboard
          </Link>
          <Link to="/drug-authentication" className={`text-navy text-sm font-medium hover-link ${location.pathname === '/drug-authentication' ? 'font-bold' : ''}`}>
            Drug Authentication
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`text-navy text-sm font-medium hover-link ${location.pathname === '/admin' ? 'font-bold' : ''}`}>
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 bg-emerald text-white hover:bg-opacity-90 transition-all">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.name} ({user?.role})
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground text-xs">
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button className="btn-outline" onClick={handleLogin}>
                Login
              </button>
              <button className="btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-navy"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col pt-20 p-6 md:hidden transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link
            to="/"
            className={`text-navy text-lg font-medium border-b border-gray-100 pb-2 ${location.pathname === '/' ? 'font-bold' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-navy text-lg font-medium border-b border-gray-100 pb-2 ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/drug-authentication"
            className={`text-navy text-lg font-medium border-b border-gray-100 pb-2 ${location.pathname === '/drug-authentication' ? 'font-bold' : ''}`}
          >
            Drug Authentication
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`text-navy text-lg font-medium border-b border-gray-100 pb-2 ${location.pathname === '/admin' ? 'font-bold' : ''}`}
            >
              Admin Panel
            </Link>
          )}
        </nav>
        
        <div className="mt-8 flex flex-col space-y-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                <Avatar className="h-9 w-9 bg-emerald text-white">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button className="btn-outline w-full flex items-center justify-center gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="btn-outline w-full" onClick={handleLogin}>
                Login
              </button>
              <button className="btn-primary w-full" onClick={handleGetStarted}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
