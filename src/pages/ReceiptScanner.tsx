import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Upload, Search, X, Check, FileText, Apple, Carrot, ChartPie } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Enhanced receipt items with more detailed information
const mockItems = [
  { 
    id: "i1", 
    name: "Organic Apples", 
    price: 4.99, 
    category: "Food", 
    healthScore: 95,
    purchaseFrequency: 3,
    purchaseDates: ["2025-04-01", "2025-04-15", "2025-05-10"],
    nutritionalInfo: {
      calories: 52,
      protein: 0.3,
      fiber: 2.4,
      sugar: 10.4
    }
  },
  { 
    id: "i2", 
    name: "Potato Chips", 
    price: 3.49, 
    category: "Food", 
    healthScore: 30,
    purchaseFrequency: 8,
    purchaseDates: ["2025-04-02", "2025-04-09", "2025-04-16", "2025-04-23", "2025-04-30", "2025-05-07", "2025-05-14", "2025-05-15"],
    nutritionalInfo: {
      calories: 152,
      protein: 2,
      fiber: 1.2,
      sugar: 0.3
    }
  },
  { 
    id: "i3", 
    name: "Paper Towels", 
    price: 5.99, 
    category: "Household",
    purchaseFrequency: 2,
    purchaseDates: ["2025-04-10", "2025-05-01"]
  },
  { 
    id: "i4", 
    name: "Orange Juice", 
    price: 3.99, 
    category: "Food", 
    healthScore: 70,
    purchaseFrequency: 4,
    purchaseDates: ["2025-04-05", "2025-04-15", "2025-04-25", "2025-05-05"],
    nutritionalInfo: {
      calories: 112,
      protein: 1.7,
      fiber: 0.5,
      sugar: 20.8
    }
  },
  { 
    id: "i5", 
    name: "Chocolate Bar", 
    price: 2.49, 
    category: "Food", 
    healthScore: 20,
    purchaseFrequency: 6,
    purchaseDates: ["2025-04-03", "2025-04-10", "2025-04-17", "2025-04-24", "2025-05-01", "2025-05-08"],
    nutritionalInfo: {
      calories: 210,
      protein: 2.2,
      fiber: 1.8,
      sugar: 24.5
    }
  },
];

// Enhanced suggestions with more detailed alternatives and savings information
const mockSuggestions = [
  { 
    id: "s1", 
    item: "Potato Chips", 
    alternative: "Baked Veggie Chips", 
    savings: 0.50, 
    healthier: true,
    reasonsToSwitch: ["38% fewer calories", "60% less fat", "Higher in fiber"],
    priceComparison: {
      original: 3.49,
      alternative: 2.99
    }
  },
  { 
    id: "s2", 
    item: "Chocolate Bar", 
    alternative: "Dark Chocolate (70% cacao)", 
    savings: 0, 
    healthier: true,
    reasonsToSwitch: ["Contains antioxidants", "Less sugar", "May improve heart health"],
    priceComparison: {
      original: 2.49,
      alternative: 2.99
    }
  },
  {
    id: "s3",
    item: "Orange Juice",
    alternative: "Whole Oranges",
    savings: 1.50,
    healthier: true,
    reasonsToSwitch: ["More fiber", "Less processed sugar", "Lower glycemic index"],
    priceComparison: {
      original: 3.99,
      alternative: 2.49
    }
  }
];

const ReceiptScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [receiptItems, setReceiptItems] = useState(mockItems);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleReceiptScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      
      toast({
        title: "Receipt scanned successfully!",
        description: "We found 5 items in your receipt.",
      });
    }, 3000);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'food': return 'bg-green-100 text-green-800';
      case 'household': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPurchaseFrequencyLabel = (frequency: number) => {
    if (frequency >= 6) return "High";
    if (frequency >= 3) return "Medium";
    return "Low";
  };

  const getPurchaseFrequencyColor = (frequency: number) => {
    if (frequency >= 6) return "text-red-600";
    if (frequency >= 3) return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressIndicatorColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const viewItemDetails = (itemId: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Receipt Scanner</h1>
        <p className="text-muted-foreground">
          Scan your receipts to track purchases and get insights.
        </p>
      </div>

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt size={20} />
              Scan Your Receipt
            </CardTitle>
            <CardDescription>
              Take a photo or upload a picture of your receipt to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-10 text-center bg-slate-50">
              <div className="flex flex-col items-center gap-4">
                <Upload size={40} className="text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Upload Receipt Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: JPG, PNG, PDF
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="relative">
                      <Input 
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleReceiptScan}
                        className="hidden"
                        id="receipt-input"
                      />
                      <Button 
                        disabled={isScanning}
                        className="relative"
                        asChild
                      >
                        <Label htmlFor="receipt-input">
                          {isScanning ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                              Scanning...
                            </>
                          ) : (
                            <>Upload Receipt</>
                          )}
                        </Label>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                  <Receipt size={20} />
                </div>
                <h3 className="font-medium">OCR Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced OCR technology can read printed receipts with high accuracy.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="font-medium">Item Detection</h3>
                <p className="text-sm text-muted-foreground">
                  We identify individual items and their prices automatically.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <h3 className="font-medium">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get insights about your purchases and suggestions for savings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="items">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">Items ({receiptItems.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Detected Items</CardTitle>
                <CardDescription>
                  Items found in your receipt with categories and prices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {receiptItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 border rounded-md hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </div>
                          {item.healthScore && (
                            <div className={`text-xs mt-1 ${getHealthScoreColor(item.healthScore)}`}>
                              Health score: {item.healthScore}/100
                            </div>
                          )}
                        </div>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-lg font-medium">
                    <div>Total</div>
                    <div>${receiptItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Smart Suggestions</CardTitle>
                <CardDescription>
                  Healthier alternatives and potential savings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {suggestions.length > 0 ? (
                  <div className="space-y-4">
                    {suggestions.map((suggestion) => (
                      <div 
                        key={suggestion.id} 
                        className="p-4 border rounded-md bg-blue-50 border-blue-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Search size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Instead of {suggestion.item}</div>
                            <div className="text-sm mt-1">
                              Try: <span className="font-medium text-blue-700">{suggestion.alternative}</span>
                            </div>
                            
                            <div className="mt-3 text-sm">
                              <h4 className="font-medium mb-1">Why make the switch:</h4>
                              <ul className="list-disc list-inside space-y-1 pl-1">
                                {suggestion.reasonsToSwitch.map((reason, index) => (
                                  <li key={index}>{reason}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mt-3 bg-white p-2 rounded border text-sm">
                              <div className="flex justify-between items-center">
                                <div>Price comparison:</div>
                                <div>
                                  <span className="line-through text-gray-500 mr-2">
                                    ${suggestion.priceComparison.original.toFixed(2)}
                                  </span>
                                  <span className="font-medium">
                                    ${suggestion.priceComparison.alternative.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex gap-3">
                              {suggestion.savings > 0 && (
                                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Save ${suggestion.savings.toFixed(2)}
                                </div>
                              )}
                              {suggestion.healthier && (
                                <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                  Healthier option
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No suggestions for this receipt.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Analytics</CardTitle>
                <CardDescription>
                  Insights about your spending habits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Category Breakdown</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Food</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Household</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Health Score</h3>
                    <div className="flex items-center gap-3">
                      <Progress value={60} className="h-2 flex-1" />
                      <span className="font-medium">60%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your purchase is somewhat healthy. Consider reducing snacks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Frequency Insights</h3>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between border-b pb-1">
                        <span>Potato Chips</span>
                        <span className="text-amber-600">Purchased 3x this month</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span>Chocolate Bar</span>
                        <span className="text-amber-600">Purchased 4x this month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Detailed Purchase Analysis
                </CardTitle>
                <CardDescription>
                  In-depth information about your purchase patterns and health impacts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Purchase Frequency</TableHead>
                      <TableHead>Health Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receiptItems.map((item) => (
                      <React.Fragment key={item.id}>
                        <TableRow>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <Badge className={getCategoryColor(item.category)}>
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={getPurchaseFrequencyColor(item.purchaseFrequency)}>
                                {getPurchaseFrequencyLabel(item.purchaseFrequency)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({item.purchaseFrequency}x this month)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.healthScore ? (
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={item.healthScore} 
                                  className="w-24 h-2" 
                                  indicatorColor={getProgressIndicatorColor(item.healthScore)}
                                />
                                <span className={getHealthScoreColor(item.healthScore)}>
                                  {item.healthScore}/100
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => viewItemDetails(item.id)}
                            >
                              {selectedItem === item.id ? 'Hide Details' : 'View Details'}
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {selectedItem === item.id && (
                          <TableRow className="bg-slate-50">
                            <TableCell colSpan={5} className="p-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Purchase History</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {item.purchaseDates.map((date, index) => (
                                      <Badge key={index} variant="outline">
                                        {new Date(date).toLocaleDateString()}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                {item.nutritionalInfo && (
                                  <div>
                                    <h4 className="font-medium mb-2">Nutritional Information</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                      <div className="p-2 border rounded bg-white">
                                        <div className="text-xs text-muted-foreground">Calories</div>
                                        <div className="font-medium">{item.nutritionalInfo.calories} kcal</div>
                                      </div>
                                      <div className="p-2 border rounded bg-white">
                                        <div className="text-xs text-muted-foreground">Protein</div>
                                        <div className="font-medium">{item.nutritionalInfo.protein}g</div>
                                      </div>
                                      <div className="p-2 border rounded bg-white">
                                        <div className="text-xs text-muted-foreground">Fiber</div>
                                        <div className="font-medium">{item.nutritionalInfo.fiber}g</div>
                                      </div>
                                      <div className="p-2 border rounded bg-white">
                                        <div className="text-xs text-muted-foreground">Sugar</div>
                                        <div className="font-medium">{item.nutritionalInfo.sugar}g</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Alternative Recommendations */}
                                {suggestions.find(s => s.item === item.name) && (
                                  <div>
                                    <h4 className="font-medium mb-2">Recommended Alternative</h4>
                                    <div className="p-3 border rounded bg-blue-50 flex items-center justify-between">
                                      <div>
                                        <div className="font-medium">
                                          {suggestions.find(s => s.item === item.name)?.alternative}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          ${suggestions.find(s => s.item === item.name)?.priceComparison.alternative.toFixed(2)}
                                        </div>
                                      </div>
                                      <div>
                                        {suggestions.find(s => s.item === item.name)?.healthier && (
                                          <div className="flex items-center gap-1 text-green-600 text-sm">
                                            <Check size={16} />
                                            Healthier Choice
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Health Assessment for Food Items */}
                                {item.category === "Food" && item.healthScore && (
                                  <div>
                                    <h4 className="font-medium mb-2">Health Assessment</h4>
                                    <div className={`p-3 border rounded ${
                                      item.healthScore >= 80 ? "bg-green-50 border-green-200" : 
                                      item.healthScore >= 50 ? "bg-yellow-50 border-yellow-200" : 
                                      "bg-red-50 border-red-200"
                                    }`}>
                                      <div className="flex items-start gap-3">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                          item.healthScore >= 80 ? "bg-green-100 text-green-600" : 
                                          item.healthScore >= 50 ? "bg-yellow-100 text-yellow-600" : 
                                          "bg-red-100 text-red-600"
                                        }`}>
                                          {item.healthScore >= 80 ? (
                                            <Apple size={16} />
                                          ) : item.healthScore >= 50 ? (
                                            <Carrot size={16} />
                                          ) : (
                                            <ChartPie size={16} />
                                          )}
                                        </div>
                                        <div>
                                          {item.healthScore >= 80 ? (
                                            <p className="text-sm">This is a very healthy choice! Rich in nutrients and low in processed ingredients.</p>
                                          ) : item.healthScore >= 50 ? (
                                            <p className="text-sm">This item is moderately healthy. Consider it an occasional part of a balanced diet.</p>
                                          ) : (
                                            <p className="text-sm">This item has limited nutritional value. Consider healthier alternatives for regular consumption.</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
                
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Consumption Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mt-0.5">
                          !
                        </div>
                        <div>
                          <p className="text-sm font-medium">High snack frequency detected</p>
                          <p className="text-xs text-muted-foreground">
                            You've purchased Potato Chips 8 times this month, which is above average.
                            Consider reducing consumption or switching to a healthier alternative.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="text-sm font-medium">Good fruit consumption</p>
                          <p className="text-xs text-muted-foreground">
                            Regular purchases of Organic Apples contribute to your daily fruit intake.
                            Keep it up!
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

// Temporary component to prevent errors
const Input = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default ReceiptScanner;
