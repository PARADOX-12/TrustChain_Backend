import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrimaryButton, OutlineButton, SecondaryButton } from '@/components/ui/button-variants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Key, ShieldCheck, Users, FileText, RefreshCw, Copy, 
  CheckCircle2, Download, Upload, Eye, EyeOff, Package, Truck
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SettingsPanel = () => {
  const [settingsTab, setSettingsTab] = useState('api');
  const [showKey, setShowKey] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [regenerateKeyDialogOpen, setRegenerateKeyDialogOpen] = useState(false);
  
  const mockDocuments = [
    { id: 'DOC001', name: 'Compliance Certification', type: 'PDF', size: '2.4 MB', uploadDate: '2023-10-15', status: 'Valid' },
    { id: 'DOC002', name: 'FDA Registration', type: 'PDF', size: '3.1 MB', uploadDate: '2023-09-22', status: 'Valid' },
    { id: 'DOC003', name: 'ISO 9001 Certificate', type: 'PDF', size: '1.8 MB', uploadDate: '2023-11-05', status: 'Valid' },
    { id: 'DOC004', name: 'Manufacturing License', type: 'PDF', size: '4.2 MB', uploadDate: '2023-08-17', status: 'Expiring Soon' },
    { id: 'DOC005', name: 'Distribution Agreement', type: 'PDF', size: '5.5 MB', uploadDate: '2023-07-30', status: 'Valid' },
  ];

  const copyApiKey = () => {
    navigator.clipboard.writeText("sk_test_blockchain_1a2b3c4d5e6f7g8h9i0j");
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue={settingsTab} onValueChange={setSettingsTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API & Authentication
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Compliance Documents
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Role Permissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys & Authentication</CardTitle>
                  <CardDescription>Manage your API keys for blockchain integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-muted rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-base font-medium">Production API Key</h3>
                        <p className="text-sm text-muted-foreground">Use this key for all production blockchain transactions</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="relative flex items-center">
                        <Input 
                          type={showKey ? "text" : "password"} 
                          value="sk_test_blockchain_1a2b3c4d5e6f7g8h9i0j" 
                          readOnly
                          className="font-mono pr-20"
                        />
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-14 p-2 text-muted-foreground hover:text-foreground"
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={copyApiKey}
                          className="absolute right-2 p-2 text-muted-foreground hover:text-foreground"
                        >
                          {apiKeyCopied ? <CheckCircle2 className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <OutlineButton 
                          className="flex items-center gap-2"
                          onClick={() => setRegenerateKeyDialogOpen(true)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          Regenerate Key
                        </OutlineButton>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Admin 2FA Requirement</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                          Enabled
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Session Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-muted-foreground mb-2">Automatically log out after inactivity</p>
                        <div className="flex items-center">
                          <Input type="number" value="30" className="w-20" />
                          <span className="ml-2">minutes</span>
                        </div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">Login Attempts</p>
                        <p className="text-sm text-muted-foreground mb-2">Lock account after failed attempts</p>
                        <div className="flex items-center">
                          <Input type="number" value="5" className="w-20" />
                          <span className="ml-2">attempts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <PrimaryButton>Save Changes</PrimaryButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Compliance Documents</CardTitle>
                    <CardDescription>Manage regulatory and compliance documentation</CardDescription>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <PrimaryButton className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Document
                    </PrimaryButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockDocuments.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{doc.id}</TableCell>
                            <TableCell>{doc.name}</TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell>{doc.uploadDate}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                doc.status === 'Valid' ? 'bg-emerald bg-opacity-10 text-emerald' : 
                                'bg-yellow-500 bg-opacity-10 text-yellow-500'
                              }`}>
                                {doc.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <OutlineButton size="sm" className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  View
                                </OutlineButton>
                                <OutlineButton size="sm" className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  Download
                                </OutlineButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>Configure access levels for different user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-500" />
                          Manufacturer Role
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between p-2 border-b">
                          <div>
                            <p className="font-medium">Create New Products</p>
                            <p className="text-sm text-muted-foreground">Add new products to the blockchain</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                              Allowed
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b">
                          <div>
                            <p className="font-medium">Initiate Shipments</p>
                            <p className="text-sm text-muted-foreground">Create and track product shipments</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                              Allowed
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <div>
                            <p className="font-medium">View Transaction Logs</p>
                            <p className="text-sm text-muted-foreground">Access to blockchain transaction history</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                              Own Records Only
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border overflow-hidden">
                      <div className="bg-muted p-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Truck className="h-5 w-5 text-yellow-500" />
                          Distributor Role
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between p-2 border-b">
                          <div>
                            <p className="font-medium">Update Shipment Status</p>
                            <p className="text-sm text-muted-foreground">Change status of shipments during transit</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                              Allowed
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b">
                          <div>
                            <p className="font-medium">Transfer Custody</p>
                            <p className="text-sm text-muted-foreground">Transfer product custody to another entity</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald bg-opacity-10 text-emerald">
                              Allowed
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <div>
                            <p className="font-medium">Create New Products</p>
                            <p className="text-sm text-muted-foreground">Add new products to the blockchain</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 bg-opacity-10 text-red-500">
                              Denied
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <PrimaryButton>Update Permissions</PrimaryButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Regenerate API Key Dialog */}
      <Dialog open={regenerateKeyDialogOpen} onOpenChange={setRegenerateKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Regenerate API Key</DialogTitle>
            <DialogDescription>
              This action will invalidate your current API key and generate a new one. All applications using the old key will stop working.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Caution required</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Regenerating your API key is a security measure that should only be performed when necessary, such as:
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>You suspect your key has been compromised</li>
                      <li>You're rotating keys as part of security protocols</li>
                      <li>You're removing access from a third-party service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <OutlineButton onClick={() => setRegenerateKeyDialogOpen(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton className="bg-red-600 hover:bg-red-700" onClick={() => setRegenerateKeyDialogOpen(false)}>
              Regenerate Key
            </PrimaryButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPanel;
