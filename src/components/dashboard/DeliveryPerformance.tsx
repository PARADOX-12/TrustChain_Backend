
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Progress } from '@/components/ui/progress';

interface DeliveryPerformanceProps {
  analyticsData: Array<{
    month: string;
    deliveredOnTime: number;
    delayed: number;
  }>;
}

const DeliveryPerformance = ({ analyticsData }: DeliveryPerformanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Performance</CardTitle>
        <CardDescription>On-time vs delayed deliveries</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="h-[240px] w-full overflow-x-auto overflow-y-hidden">
          <div className="min-w-[350px] h-full">
            <ChartContainer config={{ deliveredOnTime: { label: 'On Time' }, delayed: { label: 'Delayed' } }} className="h-full w-full">
              <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="deliveredOnTime" stroke="#2ECC71" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="delayed" stroke="#E74C3C" />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Current Month Performance</span>
            <span className="text-sm font-medium">97.2%</span>
          </div>
          <Progress value={97.2} className="h-2" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeliveryPerformance;
