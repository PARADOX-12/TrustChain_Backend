
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton, OutlineButton } from '@/components/ui/button-variants';
import { AlertTriangle, Clock } from 'lucide-react';

interface QuickActionsProps {
  role: string;
  currentRoleData: {
    title: string;
    kpiTitle: string;
    actions: Array<{
      icon: JSX.Element;
      label: string;
    }>;
  };
  onActionClick: (actionName: string) => void;
}

const QuickActions = ({ role, currentRoleData, onActionClick }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {currentRoleData.actions.map((action, index) => (
            <PrimaryButton 
              key={index} 
              className={`w-full ${index % 2 === 1 ? 'bg-emerald' : ''}`}
              onClick={() => onActionClick(action.label)}
            >
              {action.icon}
              {action.label}
            </PrimaryButton>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <OutlineButton 
            className="w-full"
            onClick={() => onActionClick('Report Issue')}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Issue
          </OutlineButton>
          <OutlineButton 
            className="w-full"
            onClick={() => onActionClick('View History')}
          >
            <Clock className="mr-2 h-4 w-4" />
            View History
          </OutlineButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
