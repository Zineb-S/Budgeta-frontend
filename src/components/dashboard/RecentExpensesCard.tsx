
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense, formatCurrency, formatDate } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Bus, Home, Film, Zap, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface RecentExpensesCardProps {
  expenses: Expense[];
}

export function RecentExpensesCard({ expenses }: RecentExpensesCardProps) {
  // Helper function to get the appropriate icon for a category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return <ShoppingBag className="h-4 w-4" />;
      case 'transport':
        return <Bus className="h-4 w-4" />;
      case 'housing':
        return <Home className="h-4 w-4" />;
      case 'entertainment':
        return <Film className="h-4 w-4" />;
      case 'utilities':
        return <Zap className="h-4 w-4" />;
      default:
        return <FileQuestion className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="budget-section-title">Recent Expenses</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/expenses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.slice(0, 5).map((expense) => (
            <div key={expense.id} className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full category-${expense.category}`}>
                {getCategoryIcon(expense.category)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{expense.description}</div>
                <div className="text-sm text-muted-foreground">{formatDate(expense.date)}</div>
              </div>
              <div className="font-medium text-right">{formatCurrency(expense.amount)}</div>
              <Badge variant="outline" className={`category-${expense.category}`}>
                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
