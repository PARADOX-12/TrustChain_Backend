
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PrimaryButton } from '@/components/ui/button-variants';

interface ShipmentTableProps {
  shipments: Array<{
    id: string;
    product: string;
    batch: string;
    origin: string;
    destination: string;
    status: string;
    date: string;
  }>;
  onDetailsClick: (shipment: any) => void;
  statusIcons: Record<string, JSX.Element>;
}

const ShipmentTable = ({ shipments, onDetailsClick, statusIcons }: ShipmentTableProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Shipment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-softgray transition-colors cursor-pointer">
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.product}</TableCell>
                  <TableCell>{shipment.batch}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {statusIcons[shipment.status as keyof typeof statusIcons]}
                      <span>{shipment.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell className="text-right">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <PrimaryButton 
                          size="sm" 
                          onClick={() => onDetailsClick(shipment)}
                        >
                          Details
                        </PrimaryButton>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Shipment Details</h4>
                          <div className="text-sm">
                            <p><span className="font-medium">Origin:</span> {shipment.origin}</p>
                            <p><span className="font-medium">Destination:</span> {shipment.destination}</p>
                            <p><span className="font-medium">Current Status:</span> {shipment.status}</p>
                            <p><span className="font-medium">Last Updated:</span> {shipment.date}</p>
                          </div>
                          <div className="pt-2">
                            <p className="text-xs text-navy text-opacity-70">This shipment is being tracked on the blockchain with an immutable record.</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentTable;
