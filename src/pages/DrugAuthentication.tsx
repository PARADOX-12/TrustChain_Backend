import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QrCode, Check, AlertTriangle, FileText, Database, Shield, X, RotateCw, Sparkles, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BlockchainAnimation from '@/components/BlockchainAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlockchainService } from '@/lib/blockchain';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Html5Qrcode } from 'html5-qrcode';
import { useAuth } from '@/contexts/AuthContext';

type VerificationStatus = 'idle' | 'scanning' | 'verifying' | 'verified' | 'counterfeit';

type DrugDetails = {
  name: string;
  manufacturer: string;
  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;
  transactionHash: string;
};

const DrugAuthentication = () => {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [drugDetails, setDrugDetails] = useState<DrugDetails | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  const { isAuthenticated, user } = useAuth();

  // Create floating particles effect
  useEffect(() => {
    if (status === 'verified') {
      const colors = ['#2ECC71', '#9b87f5', '#33C3F0', '#FFA99F'];
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [status]);

  // Handle QR code scanning process
  const handleScanClick = async () => {
    try {
      setShowScanner(true);
      setStatus('scanning');
      setProgress(0);

      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission

      // Initialize scanner
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
        
        // Start scanning
        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          handleScanResult,
          handleScanError
        );
      }

      toast({
        title: "Camera Ready",
        description: "Position the QR code within the frame",
        variant: "default",
      });
    } catch (error) {
      console.error('Camera access error:', error);
      setShowScanner(false);
      setStatus('idle');
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive",
      });
    }
  };

  // Handle QR code scan result
  const handleScanResult = async (decodedText: string) => {
    if (decodedText) {
      // Stop scanning
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current = null;
      }
      
      setShowScanner(false);
      setStatus('verifying');
      setProgress(0);
      
      try {
        // Parse the QR code data (assuming it contains the batch number)
        const batchNumber = decodedText;
        
        // Check batch status
        const statusResponse = await BlockchainService.getBatchStatus(batchNumber);
        const isVerified = await BlockchainService.isBatchVerified(batchNumber);
        
        if (isVerified) {
          const transactions = await BlockchainService.getBatchTransactions(batchNumber);
          const latestTransaction = transactions[transactions.length - 1];
          
          setDrugDetails({
            name: "Amoxicillin 500mg", // This would come from the blockchain in a real implementation
            manufacturer: "PharmaHealth Inc.",
            batchNumber: batchNumber,
            manufactureDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            transactionHash: latestTransaction?.transactionHash || "0x...",
          });
          
          setStatus('verified');
          toast({
            title: "Verification Successful",
            description: "The drug is authentic and verified on the blockchain.",
            variant: "default",
          });
        } else {
          setStatus('counterfeit');
          toast({
            title: "Verification Failed",
            description: "This drug may be counterfeit. Please do not use.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('counterfeit');
        toast({
          title: "Verification Error",
          description: "Failed to verify the drug. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle scan error
  const handleScanError = (error: string) => {
    console.error('Scan error:', error);
    // Don't show error toast for every failed scan attempt
    if (error.includes('No MultiFormat Readers were able to detect the code')) {
      return;
    }
    toast({
      title: "Scanning Error",
      description: "Failed to access camera. Please check permissions.",
      variant: "destructive",
    });
  };

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  // Reset the verification process
  const handleReset = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
    }
    setStatus('idle');
    setProgress(0);
    setDrugDetails(null);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-softgray to-white">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-10 fade-in-up">
          <h1 className="text-4xl font-bold mb-3 text-center text-navy relative inline-block">
            <span className="relative z-10">Drug Authentication</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-emerald opacity-20 rounded-full transform -rotate-1"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of pharmaceutical products using our secure blockchain verification system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Floating particles */}
          {particles.map(particle => (
            <div 
              key={particle.id}
              className="absolute rounded-full animate-float pointer-events-none"
              style={{
                width: `${particle.size}px`, 
                height: `${particle.size}px`, 
                backgroundColor: particle.color,
                left: `${particle.x}%`, 
                top: `${particle.y}%`,
                opacity: 0.7,
                filter: 'blur(1px)',
                animationDelay: `${particle.id * 0.1}s`
              }}
            />
          ))}
          
          {/* QR Code Scanner Section */}
          <Card className="lg:col-span-2 relative overflow-hidden border-2 border-navy/10 hover:shadow-lg transition-all duration-300 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-navy/5 to-emerald/5">
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-6 w-6 text-emerald" />
                QR Code Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className={`aspect-square max-w-md mx-auto relative border-2 ${status === 'idle' ? 'border-dashed border-gray-300' : 'border-blue-400'} rounded-lg flex items-center justify-center ${status === 'scanning' ? 'animate-pulse' : ''}`}>
                {status === 'idle' && !showScanner && (
                  <div className="text-center p-6">
                    <div className="p-6 bg-navy/5 rounded-full mx-auto mb-4 w-32 h-32 flex items-center justify-center">
                      <QrCode className="h-20 w-20 text-navy/40" />
                    </div>
                    <p className="text-gray-600">Position the QR code within this area to scan</p>
                  </div>
                )}
                
                {showScanner && (
                  <div id="qr-reader" className="w-full h-full"></div>
                )}
                
                {status === 'verifying' && (
                  <div className="absolute inset-0">
                    <BlockchainAnimation />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Database className="h-16 w-16 text-navy animate-pulse" />
                    </div>
                  </div>
                )}
                
                {status === 'verified' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 to-emerald/30 flex items-center justify-center">
                    <div className="relative animate-pulse-glow">
                      <Shield className="h-24 w-24 text-emerald stroke-[1.5]" />
                      <Check className="h-12 w-12 text-white bg-emerald rounded-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse-slow" />
                    </div>
                  </div>
                )}
                
                {status === 'counterfeit' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <div className="relative animate-pulse">
                      <Shield className="h-24 w-24 text-red-500 stroke-[1.5]" />
                      <X className="h-12 w-12 text-white bg-red-500 rounded-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}
              </div>
              
              {(status === 'scanning' || status === 'verifying') && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2 flex items-center justify-center">
                    {status === 'scanning' 
                      ? <><RotateCw className="h-4 w-4 mr-2 animate-spin" /> Scanning QR code...</> 
                      : <><Database className="h-4 w-4 mr-2 animate-pulse" /> Verifying on blockchain...</>
                    }
                  </p>
                  <Progress value={progress} className="h-2 bg-gray-100">
                    <div className={`h-full ${status === 'scanning' ? 'bg-blue-400' : 'bg-emerald'} transition-all`}></div>
                  </Progress>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center gap-4 p-6 bg-gradient-to-r from-navy/5 to-emerald/5">
              {status === 'idle' && !showScanner && (
                <Button onClick={handleScanClick} className="bg-navy hover:bg-navy/90 transition-all animate-bounce-slow">
                  <Camera className="mr-2 h-4 w-4" /> Start Scanning
                </Button>
              )}
              
              {(status === 'verified' || status === 'counterfeit') && (
                <Button onClick={handleReset} variant="outline" className="border-navy text-navy hover:bg-navy/5">
                  Scan Again
                </Button>
              )}
            </CardFooter>
          </Card>
          
          {/* Results Section */}
          <Card className="lg:col-span-1 border-2 border-navy/10 hover:shadow-lg transition-all duration-300 animate-fade-in-delay-1">
            <CardHeader className="bg-gradient-to-r from-navy/5 to-emerald/5">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-emerald" />
                Verification Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {status === 'idle' && (
                <div className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg h-64 flex items-center justify-center">
                  <p>Scan a drug QR code to view verification results</p>
                </div>
              )}
              
              {(status === 'scanning' || status === 'verifying') && (
                <div className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg h-64 flex flex-col items-center justify-center">
                  {status === 'scanning' ? (
                    <>
                      <RotateCw className="h-10 w-10 text-blue-400 animate-spin mb-4" />
                      <p>Waiting for scan to complete...</p>
                    </>
                  ) : (
                    <>
                      <Database className="h-10 w-10 text-navy animate-pulse mb-4" />
                      <p>Verifying authenticity...</p>
                    </>
                  )}
                </div>
              )}
              
              {status === 'verified' && drugDetails && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald p-3 bg-emerald/10 rounded-md">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">Authentic Product</span>
                  </div>
                  
                  <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm">
                    <div>
                      <p className="text-xs text-gray-500">Drug Name</p>
                      <p className="font-medium text-navy">{drugDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Manufacturer</p>
                      <p className="font-medium text-navy">{drugDetails.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Batch Number</p>
                      <p className="font-medium text-navy">{drugDetails.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Manufacture Date</p>
                      <p className="font-medium text-navy">{drugDetails.manufactureDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expiry Date</p>
                      <p className="font-medium text-navy">{drugDetails.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blockchain Transaction</p>
                      <p className="text-xs font-mono bg-navy/5 p-2 rounded overflow-x-auto text-navy">
                        {drugDetails.transactionHash}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {status === 'counterfeit' && (
                <Alert variant="destructive" className="mb-4 animate-fade-in border-2 border-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="ml-2 font-bold">Counterfeit Warning</AlertTitle>
                  <AlertDescription className="mt-2">
                    This product could not be verified on the blockchain and may be counterfeit. 
                    Please do not use this medication and report it to the authorities.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Information Section */}
        <div className="mt-16 mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-soft border border-navy/5 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4 text-navy flex items-center">
              <Shield className="mr-2 h-5 w-5 text-emerald" />
              How Blockchain Verification Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-navy/5 to-navy/10 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">1. Manufacturer Registration</h3>
                <p className="text-sm text-gray-600">Every legitimate pharmaceutical manufacturer registers on our blockchain network.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald/5 to-emerald/10 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">2. Product Authentication</h3>
                <p className="text-sm text-gray-600">Each product gets a unique digital identity stored securely on the blockchain.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy mb-2">3. Verification Process</h3>
                <p className="text-sm text-gray-600">Scan the QR code to instantly verify product authenticity against blockchain records.</p>
              </div>
            </div>
          </div>

          {/* QR Code Generator Section - Conditionally rendered */}
          {isAuthenticated && user?.role === 'manufacturer' && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-navy flex items-center">
                <QrCode className="mr-2 h-5 w-5 text-emerald" />
                Generate Test QR Code
              </h2>
              <QRCodeGenerator />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrugAuthentication;
