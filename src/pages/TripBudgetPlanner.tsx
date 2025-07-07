
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Airplay, Calendar, Share2, Users, Plus, CreditCard, Landmark, Receipt, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock trip data
const tripData = {
  id: "t1",
  name: "Weekend in Barcelona",
  dateRange: "May 20-23, 2025",
  totalBudget: 1200,
  spentSoFar: 780,
  participants: [
    { id: "p1", name: "You", avatar: null },
    { id: "p2", name: "Alex", avatar: null },
    { id: "p3", name: "Jamie", avatar: null },
    { id: "p4", name: "Taylor", avatar: null },
  ],
  expenses: [
    { 
      id: "e1", 
      description: "Hotel Booking", 
      amount: 450, 
      date: "2025-05-20", 
      category: "Accommodation",
      paidBy: "You",
      splitWith: ["Alex", "Jamie", "Taylor"]
    },
    { 
      id: "e2", 
      description: "Train Tickets", 
      amount: 180, 
      date: "2025-05-20", 
      category: "Transportation",
      paidBy: "Alex",
      splitWith: ["You", "Jamie", "Taylor"]
    },
    { 
      id: "e3", 
      description: "Tapas Dinner", 
      amount: 120, 
      date: "2025-05-21", 
      category: "Food",
      paidBy: "Jamie",
      splitWith: ["You", "Alex", "Taylor"]
    },
    { 
      id: "e4", 
      description: "Museum Tickets", 
      amount: 30, 
      date: "2025-05-22", 
      category: "Activities",
      paidBy: "Taylor",
      splitWith: ["You", "Alex", "Jamie"]
    },
  ],
  categories: {
    Accommodation: 450,
    Transportation: 180,
    Food: 120,
    Activities: 30,
  }
};

// Settlement calculations
const settlements = [
  { from: "You", to: "Alex", amount: 15 },
  { from: "Jamie", to: "You", amount: 20 },
  { from: "Taylor", to: "You", amount: 5 },
];

const TripBudgetPlanner = () => {
  const { toast } = useToast();
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: "",
    category: "",
    paidBy: "You"
  });

  const handleAddExpense = () => {
    // Input validation
    if (!expenseData.description || !expenseData.amount || !expenseData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Add expense (simulate)
    toast({
      title: "Expense added",
      description: `${expenseData.description} has been added to the trip.`,
    });

    // Reset and close
    setExpenseData({
      description: "",
      amount: "",
      category: "",
      paidBy: "You"
    });
    setShowAddExpenseDialog(false);
  };

  const handleShareTrip = () => {
    // Generate share code (simulate)
    const shareCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareCode);
    
    toast({
      title: "Share code copied",
      description: "Send this code to your friends to join the trip.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'accommodation': return 'bg-blue-100 text-blue-800';
      case 'transportation': return 'bg-green-100 text-green-800';
      case 'food': return 'bg-yellow-100 text-yellow-800';
      case 'activities': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Trip Budget Planner</h1>
          <Button onClick={handleShareTrip}>
            <Share2 size={16} className="mr-2" />
            Share Trip
          </Button>
        </div>
        <p className="text-muted-foreground">
          Plan and track expenses for your trips with friends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Airplay size={20} className="text-blue-500" />
                  <CardTitle>{tripData.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Calendar size={14} />
                  {tripData.dateRange}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                <Users size={14} />
                <span>{tripData.participants.length} travelers</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mt-2 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Budget spent</span>
                <span>${tripData.spentSoFar} of ${tripData.totalBudget}</span>
              </div>
              <Progress value={(tripData.spentSoFar / tripData.totalBudget) * 100} className="h-2" />
            </div>
            
            <Tabs defaultValue="expenses">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="settlements">Settlements</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>
              
              <TabsContent value="expenses" className="space-y-4 pt-4">
                <div className="flex justify-end">
                  <Button onClick={() => setShowAddExpenseDialog(true)}>
                    <Plus size={16} className="mr-1" />
                    Add Expense
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {tripData.expenses.map((expense) => (
                    <Card key={expense.id}>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(expense.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${expense.amount.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">
                              Paid by {expense.paidBy}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <Badge className={getCategoryColor(expense.category)}>
                            {expense.category}
                          </Badge>
                          
                          <div className="flex -space-x-2">
                            {expense.splitWith.map((person, i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <AvatarFallback className="text-xs">
                                  {person.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="settlements" className="space-y-4 pt-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center mb-4">
                  <h3 className="font-medium text-green-800">Optimal Settlement Plan</h3>
                  <p className="text-sm text-green-600">
                    The simplest way to settle all debts with minimum transactions
                  </p>
                </div>
                
                <div className="space-y-3">
                  {settlements.map((settlement, i) => (
                    <Card key={i}>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{settlement.from.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{settlement.from}</div>
                              <div className="text-xs text-muted-foreground">should pay</div>
                            </div>
                          </div>
                          
                          <div className="text-primary font-medium">
                            ${settlement.amount.toFixed(2)}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm font-medium">{settlement.to}</div>
                              <div className="text-xs text-muted-foreground">will receive</div>
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{settlement.to.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline">
                    Mark All Settlements Complete
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="participants" className="space-y-4 pt-4">
                <div className="space-y-3">
                  {tripData.participants.map((participant) => (
                    <div 
                      key={participant.id} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{participant.name}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          Paid: $100
                        </Badge>
                        <Badge variant="outline">
                          Owes: $50
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button>
                    <UserPlus size={16} className="mr-2" />
                    Invite Traveler
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(tripData.categories).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category}</span>
                    <span>${amount} ({((amount / tripData.spentSoFar) * 100).toFixed(0)}%)</span>
                  </div>
                  <Progress value={(amount / tripData.spentSoFar) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">P2P Sync Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>Your Device (Synced)</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>Alex's Phone (Synced)</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>Jamie's Phone (Synced)</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div>Taylor's Phone (Offline)</div>
              </div>
              
              <div className="pt-2 text-xs text-muted-foreground">
                Data is synchronized between devices without cloud storage for maximum privacy.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Receipt size={16} className="mr-2" />
                Export Expense Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard size={16} className="mr-2" />
                Edit Budget
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Landmark size={16} className="mr-2" />
                Add Points of Interest
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Trip Expense</DialogTitle>
            <DialogDescription>
              Enter the details of the expense you want to add to the trip.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="e.g., Dinner at Restaurant"
                value={expenseData.description}
                onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input 
                id="amount" 
                type="number"
                placeholder="0.00"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={expenseData.category} onValueChange={(value) => setExpenseData({...expenseData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Accommodation">Accommodation</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paidBy">Paid By</Label>
              <Select value={expenseData.paidBy} onValueChange={(value) => setExpenseData({...expenseData, paidBy: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Who paid?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="You">You</SelectItem>
                  <SelectItem value="Alex">Alex</SelectItem>
                  <SelectItem value="Jamie">Jamie</SelectItem>
                  <SelectItem value="Taylor">Taylor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Split With</Label>
              <div className="flex flex-wrap gap-2">
                {tripData.participants.map((participant) => (
                  <Badge key={participant.id} variant="outline" className="cursor-pointer">
                    {participant.name} ✓
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                By default, expenses are split equally among all participants.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExpenseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripBudgetPlanner;
