
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PrimaryButton, OutlineButton } from '@/components/ui/button-variants';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertTriangle, CheckCircle2, Clock, Eye, Bell, 
  AlertCircle, XCircle, Shield, BellRing, Filter 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample alerts data
const mockAlerts = [
  { 
    id: 'ALT001', 
    type: 'Counterfeit', 
    severity: 'High',
    product: 'VacciShield', 
    batch: 'B12345',
    location: 'New York City',
    timestamp: '2023-11-10 08:24:15', 
    status: 'New',
    description: 'Authentication hash mismatch detected for VacciShield batch B12345 in NYC location.'
  },
  { 
    id: 'ALT002', 
    type: 'Temperature', 
    severity: 'Medium',
    product: 'PainRelief+', 
    batch: 'B12346',
    location: 'Chicago',
    timestamp: '2023-11-10 10:12:09', 
    status: 'Investigating',
    description: 'Temperature threshold exceeded during transport. Recorded 10°C above acceptable range.'
  },
  { 
    id: 'ALT003', 
    type: 'Unauthorized', 
    severity: 'High',
    product: 'ImmunoBoost', 
    batch: 'B12347',
    location: 'Miami',
    timestamp: '2023-11-10 11:45:33', 
    status: 'Resolved',
    description: 'Unauthorized access attempt detected for distribution records of ImmunoBoost.'
  },
  { 
    id: 'ALT004', 
    type: 'Delay', 
    severity: 'Low',
    product: 'DiabeCare', 
    batch: 'B12349',
    location: 'Denver',
    timestamp: '2023-11-10 14:22:47', 
    status: 'New',
    description: 'Shipment delayed by more than 48 hours. Current location tracking indicates it is in transit.'
  },
  { 
    id: 'ALT005', 
    type: 'Counterfeit', 
    severity: 'High',
    product: 'CardioPlus', 
    batch: 'B12348',
    location: 'Los Angeles',
    timestamp: '2023-11-11 09:05:19', 
    status: 'Investigating',
    description: 'QR code validation failed. Product appears to be counterfeit based on visual inspection.'
  },
];

const severityColorMap: Record<string, string> = {
  'High': 'bg-red-500 bg-opacity-10 text-red-500',
  'Medium': 'bg-yellow-500 bg-opacity-10 text-yellow-500',
  'Low': 'bg-blue-500 bg-opacity-10 text-blue-500',
};

const statusColorMap: Record<string, string> = {
  'New': 'bg-purple-500 bg-opacity-10 text-purple-500',
  'Investigating': 'bg-yellow-500 bg-opacity-10 text-yellow-500',
  'Resolved': 'bg-emerald bg-opacity-10 text-emerald',
};

const typeIconMap: Record<string, JSX.Element> = {
  'Counterfeit': <AlertTriangle className="h-5 w-5 text-red-500" />,
  'Temperature': <AlertCircle className="h-5 w-5 text-yellow-500" />,
  'Unauthorized': <Shield className="h-5 w-5 text-purple-500" />,
  'Delay': <Clock className="h-5 w-5 text-blue-500" />,
};

const AlertsAnomalies = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  
  const filteredAlerts = mockAlerts.filter(alert => {
    return selectedStatus === 'All' || alert.status === selectedStatus;
  });

  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
    setIsAlertDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-400/5 border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Counterfeit Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">2</span>
              <span className="text-xs bg-red-500 bg-opacity-10 text-red-500 px-2 py-1 rounded-full">
                +1 last 24h
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span>Quality Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">1</span>
              <span className="text-xs bg-yellow-500 bg-opacity-10 text-yellow-500 px-2 py-1 rounded-full">
                +1 last 24h
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Security Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">2</span>
              <span className="text-xs bg-blue-500 bg-opacity-10 text-blue-500 px-2 py-1 rounded-full">
                +0 last 24h
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Alerts & Anomalies</CardTitle>
            <CardDescription>Monitor suspicious activities in the supply chain</CardDescription>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-row gap-2">
            <Tabs defaultValue={selectedStatus} onValueChange={setSelectedStatus} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-4 h-9">
                <TabsTrigger value="All" className="text-xs px-2">All Alerts</TabsTrigger>
                <TabsTrigger value="New" className="text-xs px-2">New</TabsTrigger>
                <TabsTrigger value="Investigating" className="text-xs px-2">Investigating</TabsTrigger>
                <TabsTrigger value="Resolved" className="text-xs px-2">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Product (Batch)</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow
                    key={alert.id}
                    className={`cursor-pointer hover:bg-muted/50 ${
                      alert.status === 'New' ? 'bg-red-50 dark:bg-red-950/10' : ''
                    }`}
                    onClick={() => handleAlertClick(alert)}
                  >
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {typeIconMap[alert.type]} 
                        <span>{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        severityColorMap[alert.severity]
                      }`}>
                        {alert.severity}
                      </span>
                    </TableCell>
                    <TableCell>{alert.product} ({alert.batch})</TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColorMap[alert.status]
                      }`}>
                        {alert.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <OutlineButton size="sm" onClick={(e) => { 
                        e.stopPropagation();
                        handleAlertClick(alert);
                      }}>
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </OutlineButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Alert Details Dialog */}
      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && typeIconMap[selectedAlert.type]}
              Alert Details
            </DialogTitle>
            <DialogDescription>
              Complete information about this alert
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alert ID</p>
                  <p className="font-medium">{selectedAlert.id}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  statusColorMap[selectedAlert.status]
                }`}>
                  {selectedAlert.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <div className="flex items-center gap-1.5">
                    {typeIconMap[selectedAlert.type]} 
                    <span>{selectedAlert.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Severity</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    severityColorMap[selectedAlert.severity]
                  }`}>
                    {selectedAlert.severity}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Product</p>
                  <p>{selectedAlert.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch</p>
                  <p>{selectedAlert.batch}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p>{selectedAlert.location}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                <p>{selectedAlert.timestamp}</p>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-sm">{selectedAlert.description}</p>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <OutlineButton onClick={() => setIsAlertDialogOpen(false)}>
                  Close
                </OutlineButton>
                {selectedAlert.status !== 'Resolved' && (
                  <>
                    {selectedAlert.status === 'New' ? (
                      <PrimaryButton>
                        Start Investigation
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton>
                        Mark as Resolved
                      </PrimaryButton>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertsAnomalies;
