
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { formatCurrency } from "@/lib/mockData";
import { useState } from "react";

const monthlyData = [
  { month: "Jan", expenses: 1450, income: 3500, savings: 2050 },
  { month: "Feb", expenses: 1320, income: 3500, savings: 2180 },
  { month: "Mar", expenses: 1700, income: 3500, savings: 1800 },
  { month: "Apr", expenses: 1580, income: 3700, savings: 2120 },
  { month: "May", expenses: 1677, income: 3500, savings: 1823 },
  { month: "Jun", expenses: 1490, income: 3500, savings: 2010 },
];

const categoryMonthlyData = [
  { month: "Jan", food: 410, transport: 150, housing: 800, utilities: 90, entertainment: 0 },
  { month: "Feb", food: 380, transport: 120, housing: 800, utilities: 85, entertainment: 35 },
  { month: "Mar", food: 430, transport: 170, housing: 800, utilities: 95, entertainment: 205 },
  { month: "Apr", food: 390, transport: 140, housing: 800, utilities: 110, entertainment: 140 },
  { month: "May", food: 420, transport: 160, housing: 800, utilities: 100, entertainment: 197 },
  { month: "Jun", food: 400, transport: 135, housing: 800, utilities: 95, entertainment: 60 },
];

export default function Reports() {
  const [period, setPeriod] = useState("6months");
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Visualize your financial data.</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, ""]} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#10B981" />
                    <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                    <Bar dataKey="savings" name="Savings" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryMonthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, ""]} />
                    <Legend />
                    <Bar dataKey="food" name="Food" fill="#F59E0B" />
                    <Bar dataKey="transport" name="Transport" fill="#8B5CF6" />
                    <Bar dataKey="housing" name="Housing" fill="#EC4899" />
                    <Bar dataKey="utilities" name="Utilities" fill="#F97316" />
                    <Bar dataKey="entertainment" name="Entertainment" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, ""]} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Expenses" 
                      stroke="#EF4444" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Income" 
                      stroke="#10B981" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
