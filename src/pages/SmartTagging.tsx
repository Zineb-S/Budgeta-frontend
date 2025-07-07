
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tag, FileText, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Define transaction type for proper typing
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  suggestedTag: string;
  confidence: number;
  recipient?: string;
  accepted?: boolean;
  rejected?: boolean;
}

// Mock data for transaction items
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    description: "AMAZON MARKETPLACE",
    amount: 42.99,
    date: "2025-05-10",
    suggestedTag: "Shopping",
    confidence: 95,
  },
  {
    id: "t2",
    description: "TRANSFER TO AHMED",
    amount: 850,
    date: "2025-05-05",
    suggestedTag: "Rent",
    confidence: 88,
    recipient: "Ahmed (Landlord)",
  },
  {
    id: "t3",
    description: "ORANGE TELECOM",
    amount: 38.50,
    date: "2025-05-03",
    suggestedTag: "Utilities",
    confidence: 98,
  },
  {
    id: "t4",
    description: "RESTAURANT LE BISTRO",
    amount: 78.25,
    date: "2025-05-07",
    suggestedTag: "Dining",
    confidence: 92,
  },
  {
    id: "t5",
    description: "UBER TRIP",
    amount: 12.75,
    date: "2025-05-08",
    suggestedTag: "Transport",
    confidence: 96,
  },
];

const SmartTagging = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [autoAccept, setAutoAccept] = useState(false);

  const handleAcceptTag = (id: string) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, accepted: true } : t
    ));
    
    toast({
      title: "Tag accepted",
      description: "Transaction has been tagged successfully.",
    });
  };

  const handleRejectTag = (id: string) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, accepted: false, rejected: true } : t
    ));
    
    toast({
      title: "Tag rejected",
      description: "Please select a different tag for this transaction.",
    });
  };

  const handleSaveAll = () => {
    toast({
      title: "Tags saved",
      description: "All transaction tags have been saved.",
    });
  };

  const getTagClass = (tag: string) => {
    switch(tag.toLowerCase()) {
      case 'shopping': return 'bg-blue-100 text-blue-800';
      case 'rent': return 'bg-purple-100 text-purple-800';
      case 'utilities': return 'bg-yellow-100 text-yellow-800';
      case 'dining': return 'bg-green-100 text-green-800';
      case 'transport': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Smart Tagging</h1>
        <p className="text-muted-foreground">
          AI-powered transaction categorization and tagging.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag size={20} />
            Transaction Auto-Tagging
          </CardTitle>
          <CardDescription>
            Our AI automatically detects and categorizes your transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-accept" 
                checked={autoAccept} 
                onCheckedChange={setAutoAccept}
              />
              <Label htmlFor="auto-accept">Auto-accept high confidence tags</Label>
            </div>
            <Button onClick={handleSaveAll}>Save All Tags</Button>
          </div>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className={`p-4 border rounded-lg transition-all ${transaction.accepted ? 'bg-green-50 border-green-200' : transaction.rejected ? 'bg-red-50 border-red-200' : 'hover:border-gray-300'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()} · ${transaction.amount.toFixed(2)}
                    </div>
                    {transaction.recipient && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Detected recipient: {transaction.recipient}
                      </div>
                    )}
                  </div>
                  <Badge className={getTagClass(transaction.suggestedTag)}>
                    {transaction.suggestedTag}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="text-xs text-muted-foreground">Confidence:</div>
                  <Progress value={transaction.confidence} className="h-2 w-24" />
                  <div className="text-xs font-medium">{transaction.confidence}%</div>
                </div>
                
                {!transaction.accepted && !transaction.rejected && (
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleAcceptTag(transaction.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Check size={16} className="mr-1" /> Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRejectTag(transaction.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X size={16} className="mr-1" /> Reject
                    </Button>
                  </div>
                )}
                
                {transaction.accepted && (
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <Check size={14} /> Tag accepted
                  </div>
                )}
                
                {transaction.rejected && (
                  <div className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <X size={14} /> Tag rejected
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Smart Tagging Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <h3 className="font-medium">Automatic Detection</h3>
              <p className="text-sm text-muted-foreground">
                Our AI identifies transaction sources and recipients automatically.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Tag size={20} />
              </div>
              <h3 className="font-medium">Smart Categorization</h3>
              <p className="text-sm text-muted-foreground">
                Transactions are intelligently grouped and tagged based on patterns.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <Check size={20} />
              </div>
              <h3 className="font-medium">Time Saving</h3>
              <p className="text-sm text-muted-foreground">
                Save hours of manual categorization with our smart tagging system.
              </p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center space-y-1">
            <h3 className="font-medium">Learning from your decisions</h3>
            <p className="text-sm text-muted-foreground">
              Our AI improves with each transaction you confirm or correct, making future tagging more accurate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartTagging;
