
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Truck, CheckCircle2 } from 'lucide-react';

interface DashboardCardsProps {
  totalShipments: number;
  manufacturingCount: number;
  inTransitCount: number;
  deliveredCount: number;
}

const DashboardCards = ({
  totalShipments,
  manufacturingCount,
  inTransitCount,
  deliveredCount
}: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="rounded-full p-3 bg-navy bg-opacity-10">
            <Package className="h-6 w-6 text-navy" />
          </div>
          <div>
            <p className="text-sm text-navy text-opacity-70">Total Shipments</p>
            <h3 className="text-2xl font-bold text-navy">{totalShipments}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="rounded-full p-3 bg-blue-100">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-navy text-opacity-70">Manufacturing</p>
            <h3 className="text-2xl font-bold text-navy">{manufacturingCount}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="rounded-full p-3 bg-yellow-100">
            <Truck className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-navy text-opacity-70">In Transit</p>
            <h3 className="text-2xl font-bold text-navy">{inTransitCount}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="rounded-full p-3 bg-emerald bg-opacity-10">
            <CheckCircle2 className="h-6 w-6 text-emerald" />
          </div>
          <div>
            <p className="text-sm text-navy text-opacity-70">Delivered</p>
            <h3 className="text-2xl font-bold text-navy">{deliveredCount}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
