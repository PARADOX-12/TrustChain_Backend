
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserManagement from '@/components/admin/UserManagement';
import TransactionLogs from '@/components/admin/TransactionLogs';
import AlertsAnomalies from '@/components/admin/AlertsAnomalies';
import SettingsPanel from '@/components/admin/SettingsPanel';
import { ShieldCheck, ClipboardList, BellRing, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Check if the user has admin role
    if (user?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin panel",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Handler for tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // You could add analytics tracking here
  };

  return (
    <div className="flex flex-col min-h-screen bg-softgray">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-navy">Admin Control Panel</h1>
            <p className="text-navy text-opacity-70">
              Secure management interface for the blockchain-based pharmaceutical supply chain
            </p>
          </div>

          <Tabs 
            defaultValue={activeTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full mb-8">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Transaction Logs</span>
                <span className="sm:hidden">Logs</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                <span className="hidden sm:inline">Alerts & Anomalies</span>
                <span className="sm:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <UserManagement />
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <TransactionLogs />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <AlertsAnomalies />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
