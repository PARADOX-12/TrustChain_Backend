
import { Package, TrendingUp, Users, ShieldCheck, Truck, CheckCircle2, Clock, AlertTriangle, Search, Clipboard, FileWarning, FileCheck } from 'lucide-react';
import React from 'react';

export const shipmentData = [
  { id: 'SH001', product: 'VacciShield', batch: 'B12345', origin: 'Boston Lab', destination: 'NYC Hospital', status: 'Delivered', date: '2023-11-10' },
  { id: 'SH002', product: 'PainRelief+', batch: 'B12346', origin: 'Chicago Lab', destination: 'LA Pharmacy', status: 'In Transit', date: '2023-11-12' },
  { id: 'SH003', product: 'ImmunoBoost', batch: 'B12347', origin: 'Houston Lab', destination: 'Miami Clinic', status: 'Manufactured', date: '2023-11-15' },
  { id: 'SH004', product: 'CardioPlus', batch: 'B12348', origin: 'NYC Lab', destination: 'Chicago Hospital', status: 'Delivered', date: '2023-11-05' },
  { id: 'SH005', product: 'DiabeCare', batch: 'B12349', origin: 'LA Lab', destination: 'Denver Pharmacy', status: 'In Transit', date: '2023-11-09' },
];

export const timelineData = [
  { name: 'Manufacturing', value: 8 },
  { name: 'Quality Check', value: 5 },
  { name: 'Packaging', value: 7 },
  { name: 'Distribution', value: 10 },
  { name: 'Delivery', value: 6 },
];

export const analyticsData = [
  { month: 'Jan', deliveredOnTime: 45, delayed: 5 },
  { month: 'Feb', deliveredOnTime: 50, delayed: 8 },
  { month: 'Mar', deliveredOnTime: 55, delayed: 3 },
  { month: 'Apr', deliveredOnTime: 60, delayed: 6 },
  { month: 'May', deliveredOnTime: 65, delayed: 4 },
  { month: 'Jun', deliveredOnTime: 70, delayed: 2 },
];

export const statusColors: Record<string, string> = {
  'Manufactured': 'bg-blue-500',
  'In Transit': 'bg-yellow-500',
  'Delivered': 'bg-emerald',
};

export const statusIcons: Record<string, JSX.Element> = {
  'Manufactured': <Package className="h-5 w-5 text-blue-500" />,
  'In Transit': <Truck className="h-5 w-5 text-yellow-500" />,
  'Delivered': <CheckCircle2 className="h-5 w-5 text-emerald" />,
};

// Role-specific data and views
export const roleSpecificData = {
  Manufacturer: {
    title: "Manufacturing Dashboard",
    kpiTitle: "Production Status",
    description: "Monitor and manage your pharmaceutical manufacturing process",
    kpiData: [
      { label: "Production Batches", value: 28, change: "+12%", icon: <Package className="h-5 w-5" /> },
      { label: "Quality Checks", value: 42, change: "+8%", icon: <ShieldCheck className="h-5 w-5" /> }
    ],
    actions: [
      { icon: <Clipboard className="mr-2 h-4 w-4" />, label: "Production Log" },
      { icon: <ShieldCheck className="mr-2 h-4 w-4" />, label: "Quality Check" }
    ]
  },
  Distributor: {
    title: "Distribution Dashboard",
    kpiTitle: "Shipment Status",
    description: "Track and manage your pharmaceutical deliveries",
    kpiData: [
      { label: "Active Shipments", value: 15, change: "+5%", icon: <Truck className="h-5 w-5" /> },
      { label: "Delivery Routes", value: 8, change: "+2%", icon: <TrendingUp className="h-5 w-5" /> }
    ],
    actions: [
      { icon: <Truck className="mr-2 h-4 w-4" />, label: "Create Shipment" },
      { icon: <TrendingUp className="mr-2 h-4 w-4" />, label: "Route Analytics" }
    ]
  },
  Regulator: {
    title: "Regulatory Dashboard",
    kpiTitle: "Inspection Status",
    description: "Monitor compliance and regulatory oversight",
    kpiData: [
      { label: "Pending Approvals", value: 12, change: "-3%", icon: <FileWarning className="h-5 w-5" /> },
      { label: "Certified Products", value: 87, change: "+15%", icon: <FileCheck className="h-5 w-5" /> }
    ],
    actions: [
      { icon: <FileWarning className="mr-2 h-4 w-4" />, label: "Compliance Check" },
      { icon: <FileCheck className="mr-2 h-4 w-4" />, label: "Issue Certificate" }
    ]
  },
  Pharmacy: {
    title: "Pharmacy Dashboard",
    kpiTitle: "Inventory Status",
    description: "Manage your pharmaceutical inventory and verify authenticity",
    kpiData: [
      { label: "Available Products", value: 124, change: "+8%", icon: <Package className="h-5 w-5" /> },
      { label: "Authentication Checks", value: 56, change: "+18%", icon: <AlertTriangle className="h-5 w-5" /> }
    ],
    actions: [
      { icon: <Package className="mr-2 h-4 w-4" />, label: "Check Inventory" },
      { icon: <AlertTriangle className="mr-2 h-4 w-4" />, label: "Report Issue" }
    ]
  }
};
