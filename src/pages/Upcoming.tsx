
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatCurrency, formatDate, mockUpcomingPayments } from "@/lib/mockData";
import { PlusCircle, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Upcoming() {
  const [payments, setPayments] = useState(mockUpcomingPayments);

  // Function to calculate days until due
  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePaymentToggle = (id: string, isPaid: boolean) => {
    setPayments(payments.map(payment => {
      if (payment.id === id) {
        const updatedPayment = { ...payment, paid: isPaid };
        if (isPaid) {
          toast.success(`${payment.title} marked as paid`);
        }
        return updatedPayment;
      }
      return payment;
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upcoming Payments</h2>
        <p className="text-muted-foreground">Track your bills and recurring payments.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Payment Schedule</CardTitle>
            <CardDescription>Manage your upcoming bills and subscriptions.</CardDescription>
          </div>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Payment
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const daysUntil = getDaysUntilDue(payment.dueDate);
                  let statusComponent;
                  
                  if (payment.paid) {
                    statusComponent = (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Paid
                      </Badge>
                    );
                  } else if (daysUntil <= 0) {
                    statusComponent = (
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Overdue
                      </Badge>
                    );
                  } else if (daysUntil <= 3) {
                    statusComponent = (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        <Clock className="mr-1 h-3 w-3" />
                        Due soon
                      </Badge>
                    );
                  } else {
                    statusComponent = (
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        <Clock className="mr-1 h-3 w-3" />
                        {daysUntil} days left
                      </Badge>
                    );
                  }
                  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.title}</TableCell>
                      <TableCell>{formatDate(payment.dueDate)}</TableCell>
                      <TableCell>{statusComponent}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={payment.paid} 
                          onCheckedChange={(checked) => handlePaymentToggle(payment.id, checked)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
