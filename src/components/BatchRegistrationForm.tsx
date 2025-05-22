import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BlockchainService } from '@/lib/blockchain';
import { Box, Calendar, FileText, Package } from 'lucide-react';

const BatchRegistrationForm = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [drugNdc, setDrugNdc] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert dates to Unix timestamps (seconds)
      const manufTimestamp = Math.floor(new Date(manufactureDate).getTime() / 1000);
      const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);

      const batch = {
        batchNumber,
        drugNdc,
        manufactureDate: manufTimestamp,
        expiryDate: expiryTimestamp,
        ipfsHash,
      };

      await BlockchainService.registerBatch(batch);

      toast({
        title: "Batch Registered",
        description: `Successfully registered batch: ${batchNumber} for NDC ${drugNdc}`,
      });

      // Clear form
      setBatchNumber('');
      setDrugNdc('');
      setManufactureDate('');
      setExpiryDate('');
      setIpfsHash('');

    } catch (error) {
      console.error('Error registering batch:', error);
      toast({
        title: "Batch Registration Failed",
        description: 'Failed to register batch. Please try again.',
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
          <Package className="h-5 w-5" /> Register New Batch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batch-number">Batch Number</Label>
            <Input 
              id="batch-number" 
              placeholder="Enter batch number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-drug-ndc">Drug NDC</Label>
            <Input 
              id="batch-drug-ndc" 
              placeholder="Enter Drug NDC"
              value={drugNdc}
              onChange={(e) => setDrugNdc(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacture-date">Manufacture Date</Label>
            <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                id="manufacture-date" 
                type="date"
                className="pl-10"
                value={manufactureDate}
                onChange={(e) => setManufactureDate(e.target.value)}
                required
                />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
             <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                id="expiry-date" 
                type="date"
                className="pl-10"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="ipfs-hash">IPFS Hash (Optional)</Label>
             <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                id="ipfs-hash" 
                placeholder="Enter IPFS hash"
                className="pl-10"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
                />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Batch'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchRegistrationForm; 