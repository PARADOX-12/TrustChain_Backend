
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { PrimaryButton, OutlineButton } from '@/components/ui/button-variants';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Package, TrendingUp, Users, ShieldCheck, Truck, CheckCircle2, Search, Filter, UserPlus, Edit, Trash2, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const userRoleIcons: Record<string, JSX.Element> = {
  'Manufacturer': <Package className="h-4 w-4 text-blue-500" />,
  'Distributor': <Truck className="h-4 w-4 text-yellow-500" />,
  'Regulator': <ShieldCheck className="h-4 w-4 text-emerald" />,
  'Pharmacy': <Users className="h-4 w-4 text-purple-500" />
};

// Sample user data
const mockUsers = [
  { id: 'USR001', name: 'John Smith', email: 'john@pharmamfg.com', role: 'Manufacturer', company: 'PharmaGen Inc.', status: 'Active', lastLogin: '2023-11-10 09:15:22' },
  { id: 'USR002', name: 'Emma Johnson', email: 'emma@meditransport.com', role: 'Distributor', company: 'MediTransport LLC', status: 'Active', lastLogin: '2023-11-11 14:33:05' },
  { id: 'USR003', name: 'Robert Chen', email: 'robert@fdahealth.gov', role: 'Regulator', company: 'FDA Health Division', status: 'Active', lastLogin: '2023-11-09 11:42:17' },
  { id: 'USR004', name: 'Sarah Miller', email: 'sarah@citypharmacy.com', role: 'Pharmacy', company: 'City Pharmacy', status: 'Inactive', lastLogin: '2023-10-15 08:22:45' },
  { id: 'USR005', name: 'David Wilson', email: 'david@pharmamfg.com', role: 'Manufacturer', company: 'PharmaGen Inc.', status: 'Active', lastLogin: '2023-11-12 10:05:38' },
  { id: 'USR006', name: 'Lisa Garcia', email: 'lisa@quickmed.com', role: 'Distributor', company: 'QuickMed Distribution', status: 'Active', lastLogin: '2023-11-11 09:27:54' },
  { id: 'USR007', name: 'Michael Brown', email: 'michael@healthregulator.org', role: 'Regulator', company: 'Health Regulatory Body', status: 'Pending', lastLogin: 'Never' },
  { id: 'USR008', name: 'Jennifer Lee', email: 'jennifer@caringpharmacy.com', role: 'Pharmacy', company: 'Caring Pharmacy', status: 'Active', lastLogin: '2023-11-10 16:08:33' },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Manufacturer',
    company: '',
    status: 'Active'
  });
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, user: any) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, user: any) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleAddUser = () => {
    const id = `USR${String(users.length + 1).padStart(3, '0')}`;
    const newUserWithId = {
      ...newUser,
      id,
      lastLogin: 'Never'
    };

    setUsers([...users, newUserWithId]);
    setIsAddUserDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Manufacturer',
      company: '',
      status: 'Active'
    });

    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully`,
    });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditUserDialogOpen(false);
    
    toast({
      title: "User Updated",
      description: `${selectedUser.name}'s information has been updated`,
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User Deleted",
      description: `${selectedUser.name} has been removed from the system`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users across different roles in the supply chain</CardDescription>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-row gap-2">
            <PrimaryButton 
              className="flex items-center gap-2"
              onClick={() => setIsAddUserDialogOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </PrimaryButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users by name, email or ID..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue={selectedRole} onValueChange={setSelectedRole} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-5 h-9">
                <TabsTrigger value="All" className="text-xs px-2">All</TabsTrigger>
                <TabsTrigger value="Manufacturer" className="text-xs px-2">Manufacturer</TabsTrigger>
                <TabsTrigger value="Distributor" className="text-xs px-2">Distributor</TabsTrigger>
                <TabsTrigger value="Regulator" className="text-xs px-2">Regulator</TabsTrigger>
                <TabsTrigger value="Pharmacy" className="text-xs px-2">Pharmacy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleUserClick(user)}
                  >
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {userRoleIcons[user.role]} 
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-emerald bg-opacity-10 text-emerald' : 
                        user.status === 'Inactive' ? 'bg-gray-400 bg-opacity-10 text-gray-500' : 
                        'bg-yellow-400 bg-opacity-10 text-yellow-500'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={(e) => handleEditClick(e, user)}
                          className="p-1 rounded-md hover:bg-muted"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, user)}
                          className="p-1 rounded-md hover:bg-muted"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information about this user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-navy bg-opacity-10 flex items-center justify-center">
                  {userRoleIcons[selectedUser.role]}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <div className="flex items-center gap-1.5">
                    {userRoleIcons[selectedUser.role]} 
                    <span>{selectedUser.role}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p>{selectedUser.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedUser.status === 'Active' ? 'bg-emerald bg-opacity-10 text-emerald' : 
                    selectedUser.status === 'Inactive' ? 'bg-gray-400 bg-opacity-10 text-gray-500' : 
                    'bg-yellow-400 bg-opacity-10 text-yellow-500'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                <p>{selectedUser.lastLogin}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blockchain Wallet</p>
                <p className="font-mono text-xs truncate">0x7e5f4552091a69125d5dfcb7b8c2659029395bdf</p>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <OutlineButton onClick={() => setIsUserDialogOpen(false)}>Close</OutlineButton>
                <PrimaryButton onClick={() => {
                  setIsUserDialogOpen(false);
                  setIsEditUserDialogOpen(true);
                }}>Edit User</PrimaryButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for the blockchain supply chain
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter full name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter email address"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="Distributor">Distributor</SelectItem>
                    <SelectItem value="Regulator">Regulator</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newUser.status} 
                  onValueChange={(value) => setNewUser({...newUser, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                placeholder="Enter company name"
                value={newUser.company}
                onChange={(e) => setNewUser({...newUser, company: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <OutlineButton onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton 
              onClick={handleAddUser}
              disabled={!newUser.name || !newUser.email || !newUser.company}
            >
              Add User
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user information and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={selectedUser.role} 
                    onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="Distributor">Distributor</SelectItem>
                      <SelectItem value="Regulator">Regulator</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedUser.status} 
                    onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input 
                  id="edit-company" 
                  value={selectedUser.company}
                  onChange={(e) => setSelectedUser({...selectedUser, company: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-2">
            <OutlineButton onClick={() => setIsEditUserDialogOpen(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleUpdateUser}>
              Update User
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <X className="h-5 w-5 mr-2" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-red-500 bg-opacity-10 border border-red-200 rounded-md p-4">
                <p className="text-sm">
                  Are you sure you want to delete <span className="font-semibold">{selectedUser.name}</span>?
                  This will remove all user data, access permissions, and blockchain connections.
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-2">
            <OutlineButton onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton 
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete User
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
