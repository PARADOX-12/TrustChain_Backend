
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface SupplyChainTimelineProps {
  timelineData: Array<{
    name: string;
    value: number;
  }>;
}

const SupplyChainTimeline = ({ timelineData }: SupplyChainTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply Chain Timeline</CardTitle>
        <CardDescription>Average time (in days) spent at each stage</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="h-[240px] w-full overflow-x-auto overflow-y-hidden">
          <div className="min-w-[350px] h-full">
            <ChartContainer config={{ data: { label: 'Days' } }} className="h-full w-full">
              <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#2ECC71" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainTimeline;
