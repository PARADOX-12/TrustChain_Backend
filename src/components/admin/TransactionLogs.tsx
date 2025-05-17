
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Eye, ArrowUpDown, FileSearch, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OutlineButton, PrimaryButton } from '@/components/ui/button-variants';

// Sample transaction data
const mockTransactions = [
  { id: 'TX001', type: 'Production', product: 'VacciShield', actor: 'PharmaGen Inc.', timestamp: '2023-11-10 08:24:15', hash: '0x7a16f9e42a1c10fbe14ead99aaccc7f970c23555e5c1a4e4fc64fac44b98c649' },
  { id: 'TX002', type: 'Distribution', product: 'PainRelief+', actor: 'MediTransport LLC', timestamp: '2023-11-10 10:12:09', hash: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' },
  { id: 'TX003', type: 'Verification', product: 'ImmunoBoost', actor: 'FDA Health Division', timestamp: '2023-11-10 11:45:33', hash: '0x5c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' },
  { id: 'TX004', type: 'Dispensing', product: 'DiabeCare', actor: 'City Pharmacy', timestamp: '2023-11-10 14:22:47', hash: '0x3a16f9e42a1c10fbe14ead99aaccc7f970c23555e5c1a4e4fc64fac44b98c649' },
  { id: 'TX005', type: 'Production', product: 'CardioPlus', actor: 'PharmaGen Inc.', timestamp: '2023-11-11 09:05:19', hash: '0x1c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' },
  { id: 'TX006', type: 'Distribution', product: 'VacciShield', actor: 'QuickMed Distribution', timestamp: '2023-11-11 11:33:28', hash: '0x9a16f9e42a1c10fbe14ead99aaccc7f970c23555e5c1a4e4fc64fac44b98c649' },
  { id: 'TX007', type: 'Verification', product: 'PainRelief+', actor: 'Health Regulatory Body', timestamp: '2023-11-11 13:14:52', hash: '0x2c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' },
  { id: 'TX008', type: 'Dispensing', product: 'ImmunoBoost', actor: 'Caring Pharmacy', timestamp: '2023-11-11 15:48:21', hash: '0x6a16f9e42a1c10fbe14ead99aaccc7f970c23555e5c1a4e4fc64fac44b98c649' },
];

const typeColorMap: Record<string, string> = {
  'Production': 'bg-blue-500 bg-opacity-10 text-blue-500',
  'Distribution': 'bg-yellow-500 bg-opacity-10 text-yellow-500',
  'Verification': 'bg-emerald bg-opacity-10 text-emerald',
  'Dispensing': 'bg-purple-500 bg-opacity-10 text-purple-500',
};

const TransactionLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

  const filteredTransactions = mockTransactions.filter(tx => 
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-[#1A1F2C] text-white">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-white">Transaction Logs</CardTitle>
            <CardDescription className="text-gray-300">Immutable blockchain transaction records</CardDescription>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-row gap-2">
            <OutlineButton className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Download className="h-4 w-4" />
              Export
            </OutlineButton>
            <OutlineButton className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Calendar className="h-4 w-4" />
              Date Range
            </OutlineButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-md border border-white/10">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-gray-300">
                    <div className="flex items-center gap-1">
                      ID
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center gap-1">
                      Type
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center gap-1">
                      Product
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center gap-1">
                      Actor
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center gap-1">
                      Timestamp
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">Hash</TableHead>
                  <TableHead className="text-right text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="cursor-pointer hover:bg-white/5 border-white/10"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColorMap[transaction.type]}`}>
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-200">{transaction.product}</TableCell>
                    <TableCell className="text-gray-200">{transaction.actor}</TableCell>
                    <TableCell className="text-gray-200">{transaction.timestamp}</TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-gray-300 truncate max-w-[120px] inline-block">
                        {transaction.hash}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={(e) => { 
                          e.stopPropagation();
                          handleTransactionClick(transaction);
                        }}
                        className="p-1 rounded-md hover:bg-white/10"
                      >
                        <FileSearch className="h-4 w-4 text-gray-300" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-[#1A1F2C] text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Transaction Details</DialogTitle>
            <DialogDescription className="text-gray-300">
              Immutable blockchain record
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Transaction ID</p>
                  <p className="font-medium text-white">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Type</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColorMap[selectedTransaction.type]}`}>
                    {selectedTransaction.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Product</p>
                  <p className="text-white">{selectedTransaction.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Actor</p>
                  <p className="text-white">{selectedTransaction.actor}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400">Timestamp</p>
                <p className="text-white">{selectedTransaction.timestamp}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400">Transaction Hash</p>
                <p className="font-mono text-xs text-gray-200 break-all">{selectedTransaction.hash}</p>
              </div>
              
              <div className="bg-white/5 rounded-md p-4 border border-white/10">
                <p className="text-sm font-medium text-gray-400 mb-2">Transaction Data</p>
                <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap break-all">
                  {JSON.stringify({
                    transactionId: selectedTransaction.id,
                    blockNumber: 14356789,
                    blockHash: "0xb9c5d6341a31d1fda305fc8b5fa0a8c288bbb09e6a752cac17efeb4497b9fb0d",
                    from: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
                    to: "0xbda5747bfd65f08deb54cb465eb87d40e51b197e",
                    gasUsed: "21000",
                    status: "success",
                    timestamp: selectedTransaction.timestamp,
                    product: {
                      id: "PROD" + selectedTransaction.id.slice(2),
                      name: selectedTransaction.product,
                      batch: "B" + Math.floor(10000 + Math.random() * 90000),
                      action: selectedTransaction.type,
                    }
                  }, null, 2)}
                </pre>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <OutlineButton className="text-white border-white/20 hover:bg-white/10 hover:text-white" onClick={() => setIsTransactionDialogOpen(false)}>
                  Close
                </OutlineButton>
                <OutlineButton className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </OutlineButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionLogs;
