
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpcomingPayment, formatCurrency, formatDate } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, Home, Zap, Monitor, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

interface UpcomingPaymentsCardProps {
  payments: UpcomingPayment[];
  showAll?: boolean;
}

export function UpcomingPaymentsCard({ payments, showAll = false }: UpcomingPaymentsCardProps) {
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const displayPayments = showAll ? sortedPayments : sortedPayments.slice(0, 3);

  // Helper function to get the appropriate icon for a category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing':
        return <Home className="h-4 w-4" />;
      case 'utilities':
        return <Zap className="h-4 w-4" />;
      case 'subscription':
        return <Monitor className="h-4 w-4" />;
      default:
        return <FileQuestion className="h-4 w-4" />;
    }
  };

  // Function to calculate days until due
  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="budget-section-title">Upcoming Payments</CardTitle>
        {!showAll && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/upcoming">View All</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayPayments.map((payment) => {
            const daysUntil = getDaysUntilDue(payment.dueDate);
            return (
              <div key={payment.id} className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full 
                  ${daysUntil <= 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  {getCategoryIcon(payment.category)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{payment.title}</div>
                  <div className="text-sm text-muted-foreground">Due {formatDate(payment.dueDate)}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="font-medium">{formatCurrency(payment.amount)}</div>
                  <div className={`flex items-center text-xs font-medium
                    ${daysUntil <= 3 ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {daysUntil <= 0 ? (
                      <>
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Overdue
                      </>
                    ) : (
                      <>
                        <Clock className="mr-1 h-3 w-3" />
                        {daysUntil} days left
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
