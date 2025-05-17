
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PrimaryButton, SecondaryButton, OutlineButton } from '@/components/ui/button-variants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { Package, TrendingUp, Users, ShieldCheck, Truck, CheckCircle2, Clock, AlertTriangle, Search, Clipboard, FileWarning, FileCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCards from '@/components/dashboard/DashboardCards';
import ShipmentTable from '@/components/dashboard/ShipmentTable';
import SupplyChainTimeline from '@/components/dashboard/SupplyChainTimeline';
import DeliveryPerformance from '@/components/dashboard/DeliveryPerformance';
import QuickActions from '@/components/dashboard/QuickActions';
import { useToast } from '@/hooks/use-toast';
import { shipmentData, timelineData, analyticsData, statusColors, statusIcons, roleSpecificData } from '@/data/dashboardData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Dashboard = () => {
  const [role, setRole] = useState('Manufacturer');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const filteredShipments = shipmentData.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalShipments = shipmentData.length;
  const inTransitCount = shipmentData.filter(s => s.status === 'In Transit').length;
  const deliveredCount = shipmentData.filter(s => s.status === 'Delivered').length;
  const manufacturingCount = shipmentData.filter(s => s.status === 'Manufactured').length;

  const currentRoleData = roleSpecificData[role as keyof typeof roleSpecificData];

  const handleActionClick = (actionName: string) => {
    setCurrentAction(actionName);
    setActionDialogOpen(true);
    toast({
      title: actionName,
      description: `${actionName} action was triggered for ${role} role`,
    });
  };

  const handleDetailsClick = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsDialogOpen(true);
    toast({
      title: `Shipment ${shipment.id} Details`,
      description: `Viewing detailed information for ${shipment.product}`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-softgray">
      <DashboardHeader />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue={role} onValueChange={setRole} className="w-full mb-6">
            <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4'} w-full`}>
              <TabsTrigger value="Manufacturer">Manufacturer</TabsTrigger>
              <TabsTrigger value="Distributor">Distributor</TabsTrigger>
              <TabsTrigger value="Regulator">Regulator</TabsTrigger>
              <TabsTrigger value="Pharmacy">Pharmacy</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold text-navy">{currentRoleData.title}</h1>
              <p className="text-navy text-opacity-70">{currentRoleData.description}</p>
            </div>
          </Tabs>

          <DashboardCards 
            totalShipments={totalShipments}
            manufacturingCount={manufacturingCount}
            inTransitCount={inTransitCount}
            deliveredCount={deliveredCount}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Shipment Tracking</CardTitle>
                  <CardDescription>Track the status of your shipments in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by ID, product or batch..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <ShipmentTable 
                shipments={filteredShipments} 
                onDetailsClick={handleDetailsClick}
                statusIcons={statusIcons}
              />
            </div>
            
            <div className="space-y-6">
              <SupplyChainTimeline timelineData={timelineData} />
              <DeliveryPerformance analyticsData={analyticsData} />
              <QuickActions 
                role={role} 
                currentRoleData={currentRoleData}
                onActionClick={handleActionClick}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Shipment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
            <DialogDescription>
              Complete information about this shipment
            </DialogDescription>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p className="font-medium">{selectedShipment.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch</p>
                  <p>{selectedShipment.batch}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Product</p>
                  <p>{selectedShipment.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="flex items-center space-x-2">
                    {statusIcons[selectedShipment.status]}
                    <span>{selectedShipment.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Origin</p>
                  <p>{selectedShipment.origin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p>{selectedShipment.destination}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipment Date</p>
                <p>{selectedShipment.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blockchain Transaction</p>
                <p className="font-mono text-xs truncate">0x7e5f4552091a69125d5dfcb7b8c2659029395bdf</p>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <OutlineButton onClick={() => setIsDialogOpen(false)}>Close</OutlineButton>
                <PrimaryButton>Verify on Blockchain</PrimaryButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentAction}</DialogTitle>
            <DialogDescription>
              {currentAction === "Production Log" && "View and manage production logs for your manufacturing facility"}
              {currentAction === "Quality Check" && "Run quality checks on manufactured batches"}
              {currentAction === "Create Shipment" && "Create a new shipment for pharmaceutical products"}
              {currentAction === "Route Analytics" && "Analyze distribution routes and optimize delivery"}
              {currentAction === "Compliance Check" && "Verify compliance with regulatory requirements"}
              {currentAction === "Issue Certificate" && "Issue compliance certificates for verified products"}
              {currentAction === "Check Inventory" && "Check and manage your pharmaceutical inventory"}
              {currentAction === "Report Issue" && "Report issues with received pharmaceutical products"}
              {currentAction === "View History" && "View historical data and transaction records"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This feature is being implemented. You will be able to {currentAction.toLowerCase()} soon.
            </p>
            <div className="mt-4 bg-navy bg-opacity-5 p-4 rounded-md">
              <p className="text-xs font-mono">Feature ID: {currentAction.replace(/\s+/g, '-').toLowerCase()}-{Math.floor(Math.random() * 1000)}</p>
              <p className="text-xs font-mono">Role: {role}</p>
              <p className="text-xs font-mono">Status: Development in progress</p>
            </div>
          </div>
          <div className="flex justify-end">
            <OutlineButton onClick={() => setActionDialogOpen(false)}>Close</OutlineButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
