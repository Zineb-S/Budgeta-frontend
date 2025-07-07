
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Users, Share2, Wallet, UserPlus, Link, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock family members
const familyMembers = [
  { id: "m1", name: "You", avatar: null, isOwner: true },
  { id: "m2", name: "Sarah", avatar: null, isOwner: false },
  { id: "m3", name: "Michael", avatar: null, isOwner: false },
  { id: "m4", name: "Emma", avatar: null, isOwner: false },
];

// Mock shared expenses
const sharedExpenses = [
  { 
    id: "e1", 
    description: "Groceries", 
    amount: 132.45, 
    date: "2025-05-12",
    paidBy: "You",
    category: "Food",
    split: "equal"
  },
  { 
    id: "e2", 
    description: "Internet Bill", 
    amount: 59.99, 
    date: "2025-05-10",
    paidBy: "Sarah",
    category: "Utilities",
    split: "equal"
  },
  { 
    id: "e3", 
    description: "Family Dinner", 
    amount: 78.50, 
    date: "2025-05-08",
    paidBy: "Michael",
    category: "Dining",
    split: "equal"
  },
];

// Mock savings goals
const savingsGoals = [
  {
    id: "g1",
    name: "Family Vacation",
    target: 2000,
    current: 1250,
    deadline: "2025-12-25",
    contributors: ["You", "Sarah", "Michael", "Emma"]
  },
  {
    id: "g2",
    name: "Emergency Fund",
    target: 5000,
    current: 3200,
    contributors: ["You", "Sarah"]
  },
];

const FamilyFinances = () => {
  const { toast } = useToast();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  
  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a mock invite code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
    setShowInviteCode(true);
    
    toast({
      title: "Invitation created",
      description: "Share the code with your family member.",
    });
  };
  
  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Copied to clipboard",
      description: "Send this code to your family member.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Family Finances</h1>
        <p className="text-muted-foreground">
          Manage shared expenses and budgets with your family.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Family Members
            </CardTitle>
            <CardDescription>
              People who share this budget with you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">
                      {member.name}
                      {member.isOwner && (
                        <Badge variant="outline" className="ml-2 text-xs">Owner</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => setShowInviteDialog(true)}
              >
                <UserPlus size={16} className="mr-2" />
                Invite Family Member
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet size={20} />
              Shared Expenses
            </CardTitle>
            <CardDescription>
              Expenses shared among family members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sharedExpenses.map((expense) => (
                <div 
                  key={expense.id} 
                  className="p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${expense.amount.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        Paid by: {expense.paidBy}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{expense.category}</Badge>
                    <Badge variant="outline">Split equally</Badge>
                  </div>
                </div>
              ))}
              
              <Button className="w-full">
                Add Shared Expense
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="savings">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="savings">Collective Savings</TabsTrigger>
          <TabsTrigger value="sync">Device Sync</TabsTrigger>
        </TabsList>
        
        <TabsContent value="savings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Savings Goals</CardTitle>
              <CardDescription>
                Track progress towards shared financial goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {savingsGoals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{goal.name}</h3>
                      <div className="text-sm font-medium">
                        ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                      </div>
                    </div>
                    
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>
                        {goal.contributors.length} Contributors
                      </div>
                      {goal.deadline && (
                        <div>
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex -space-x-2">
                      {goal.contributors.map((contributor, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs">
                            {contributor.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <Button className="w-full">
                Create New Savings Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sync" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 size={20} />
                Peer-to-Peer Sync
              </CardTitle>
              <CardDescription>
                Securely sync budget data between family devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <Check size={18} />
                  <div>Device Sync Enabled</div>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your budget data is synchronized with all family devices.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">How Sync Works</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our P2P sync uses end-to-end encryption to share data directly between devices without storing sensitive information in the cloud.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Connected Devices</h3>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 border rounded-md flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="text-sm">Your Phone</div>
                      </div>
                      <Badge variant="outline">This device</Badge>
                    </div>
                    
                    <div className="p-2 border rounded-md flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="text-sm">Sarah's Laptop</div>
                      </div>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    
                    <div className="p-2 border rounded-md flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-300" />
                        <div className="text-sm">Michael's Phone</div>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">Offline</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                <Link size={16} className="mr-2" />
                Generate Device Pairing Code
              </Button>
              <Button variant="outline" className="w-full">
                Manage Sync Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Invite dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Family Member</DialogTitle>
            <DialogDescription>
              Enter the email address of the family member you want to invite.
            </DialogDescription>
          </DialogHeader>
          
          {!showInviteCode ? (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="family@example.com" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInviteMember}>
                  Send Invitation
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="text-center p-4 bg-green-50 rounded-md space-y-2">
                  <div className="inline-flex h-10 w-10 rounded-full bg-green-100 text-green-700 items-center justify-center">
                    <Check size={20} />
                  </div>
                  <h3 className="font-medium">Invitation Created!</h3>
                </div>
                
                <div className="space-y-2">
                  <Label>Share this code with your family member</Label>
                  <div className="flex gap-2">
                    <Input value={inviteCode} readOnly />
                    <Button variant="outline" onClick={copyInviteCode}>Copy</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This code expires in 48 hours.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowInviteDialog(false)}>
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyFinances;
