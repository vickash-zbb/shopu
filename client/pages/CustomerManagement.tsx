import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  Ban,
  CheckCircle,
  AlertTriangle,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock customer data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    avatar: null,
    status: "active",
    registrationDate: "2024-01-10T08:30:00Z",
    lastOrder: "2024-01-15T10:30:00Z",
    totalOrders: 15,
    totalSpent: 892.45,
    averageOrderValue: 59.50,
    address: "123 Main St, City, State 12345",
    prescriptions: 3,
    loyaltyPoints: 450,
    riskScore: "low",
    notes: "Preferred customer, always pays on time",
    medicalConditions: ["Diabetes", "Hypertension"],
    insuranceProvider: "Blue Cross",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1 (555) 123-4568",
      relationship: "Spouse"
    }
  },
  {
    id: "CUST-002", 
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    phone: "+1 (555) 987-6543",
    avatar: null,
    status: "active",
    registrationDate: "2024-01-05T14:20:00Z",
    lastOrder: "2024-01-14T16:45:00Z",
    totalOrders: 8,
    totalSpent: 324.78,
    averageOrderValue: 40.60,
    address: "456 Oak Ave, City, State 12345",
    prescriptions: 1,
    loyaltyPoints: 180,
    riskScore: "low",
    notes: "",
    medicalConditions: ["Allergies"],
    insuranceProvider: "Aetna",
    emergencyContact: {
      name: "Michael Smith",
      phone: "+1 (555) 987-6544",
      relationship: "Brother"
    }
  },
  {
    id: "CUST-003",
    name: "Mike Johnson", 
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: null,
    status: "suspended",
    registrationDate: "2023-12-20T11:15:00Z",
    lastOrder: "2024-01-10T09:20:00Z",
    totalOrders: 23,
    totalSpent: 1456.90,
    averageOrderValue: 63.34,
    address: "789 Pine St, City, State 12345",
    prescriptions: 5,
    loyaltyPoints: 250,
    riskScore: "medium",
    notes: "Account suspended due to payment issues",
    medicalConditions: ["Heart Disease", "Arthritis"],
    insuranceProvider: "Medicare",
    emergencyContact: {
      name: "Emily Johnson",
      phone: "+1 (555) 456-7891",
      relationship: "Daughter"
    }
  },
  {
    id: "CUST-004",
    name: "Emma Wilson",
    email: "emma.wilson@email.com", 
    phone: "+1 (555) 321-0987",
    avatar: null,
    status: "inactive",
    registrationDate: "2023-11-15T13:45:00Z",
    lastOrder: "2023-12-25T10:10:00Z",
    totalOrders: 4,
    totalSpent: 156.23,
    averageOrderValue: 39.06,
    address: "321 Elm St, City, State 12345",
    prescriptions: 0,
    loyaltyPoints: 45,
    riskScore: "low",
    notes: "Inactive customer, hasn't ordered in months",
    medicalConditions: [],
    insuranceProvider: "United Healthcare",
    emergencyContact: {
      name: "Robert Wilson",
      phone: "+1 (555) 321-0988",
      relationship: "Husband"
    }
  }
];

const getStatusBadge = (status: string) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-yellow-100 text-yellow-800 border-yellow-200",
    suspended: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    active: CheckCircle,
    inactive: Clock,
    suspended: Ban,
  };

  const Icon = icons[status as keyof typeof icons];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", styles[status as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status.toUpperCase()}
    </Badge>
  );
};

const getRiskBadge = (risk: string) => {
  const styles = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    high: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[risk as keyof typeof styles])}
    >
      {risk.toUpperCase()} RISK
    </Badge>
  );
};

export function CustomerManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesTab = selectedTab === "all" || customer.status === selectedTab;

    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusCounts = () => {
    return {
      all: mockCustomers.length,
      active: mockCustomers.filter(c => c.status === 'active').length,
      inactive: mockCustomers.filter(c => c.status === 'inactive').length,
      suspended: mockCustomers.filter(c => c.status === 'suspended').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage customer profiles, view order history, and handle account management.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCustomers.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.active}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(mockCustomers.reduce((sum, c) => sum + c.averageOrderValue, 0) / mockCustomers.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search customers by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All Customers
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="relative">
            Active
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="relative">
            Inactive
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.inactive}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="suspended" className="relative">
            Suspended
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.suspended}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {/* Customers List */}
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All customers" : `${selectedTab} customers`} in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div 
                    key={customer.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{customer.name}</span>
                          {getStatusBadge(customer.status)}
                          {getRiskBadge(customer.riskScore)}
                          {customer.prescriptions > 0 && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {customer.prescriptions} Rx
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {customer.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{customer.totalOrders} orders</span>
                          <span>Last order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
                          <span>{customer.loyaltyPoints} points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${customer.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          ${customer.averageOrderValue.toFixed(2)} avg
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            View Orders
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-8">
                    <UserPlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No customers found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCustomer.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xl">
                      {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedCustomer.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedCustomer.status)}
                      {getRiskBadge(selectedCustomer.riskScore)}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedCustomer(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>

                {/* Account Statistics */}
                <div>
                  <h4 className="font-medium mb-3">Account Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Orders</p>
                      <p className="font-medium text-lg">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Spent</p>
                      <p className="font-medium text-lg">${selectedCustomer.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Order Value</p>
                      <p className="font-medium text-lg">${selectedCustomer.averageOrderValue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Loyalty Points</p>
                      <p className="font-medium text-lg">{selectedCustomer.loyaltyPoints}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="font-medium mb-3">Medical Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Medical Conditions</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.medicalConditions.length > 0 ? (
                        selectedCustomer.medicalConditions.map((condition: string) => (
                          <Badge key={condition} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">None reported</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Insurance Provider</p>
                    <p className="text-sm font-medium">{selectedCustomer.insuranceProvider}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="font-medium mb-3">Emergency Contact</h4>
                <div className="text-sm">
                  <p><strong>Name:</strong> {selectedCustomer.emergencyContact.name}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.emergencyContact.phone}</p>
                  <p><strong>Relationship:</strong> {selectedCustomer.emergencyContact.relationship}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedCustomer.notes && (
                <div>
                  <h4 className="font-medium mb-3">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Customer
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
