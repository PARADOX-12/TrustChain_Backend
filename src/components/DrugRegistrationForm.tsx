import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BlockchainService } from '@/lib/blockchain';
import { PackagePlus } from 'lucide-react';

const DrugRegistrationForm = () => {
  const [name, setName] = useState('');
  const [ndc, setNdc] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const drug = {
        name,
        ndc,
        description,
      };

      await BlockchainService.registerDrug(drug);

      toast({
        title: "Drug Registered",
        description: `Successfully registered drug: ${name} (${ndc})`,
      });

      // Clear form
      setName('');
      setNdc('');
      setDescription('');

    } catch (error) {
      console.error('Error registering drug:', error);
      toast({
        title: "Drug Registration Failed",
        description: 'Failed to register drug. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackagePlus className="h-5 w-5" /> Register New Drug
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="drug-name">Drug Name</Label>
            <Input 
              id="drug-name" 
              placeholder="Enter drug name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="drug-ndc">NDC</Label>
            <Input 
              id="drug-ndc" 
              placeholder="Enter NDC (National Drug Code)"
              value={ndc}
              onChange={(e) => setNdc(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="drug-description">Description</Label>
            <Input 
              id="drug-description" 
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Drug'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DrugRegistrationForm; 