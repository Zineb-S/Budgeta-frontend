
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialSummary, formatCurrency } from "@/lib/mockData";
import { ArrowUpIcon, ArrowDownIcon, PiggyBankIcon, WalletIcon } from "lucide-react";

interface FinancialSummaryCardProps {
  data: FinancialSummary;
}

export function FinancialSummaryCard({ data }: FinancialSummaryCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <WalletIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.balance)}</div>
          <p className="text-xs text-muted-foreground">Available funds</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-budget-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-budget-income">{formatCurrency(data.income)}</div>
          <p className="text-xs text-muted-foreground">Monthly income</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-budget-expense" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-budget-expense">{formatCurrency(data.expenses)}</div>
          <p className="text-xs text-muted-foreground">Monthly expenses</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <PiggyBankIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.savings)}</div>
          <p className="text-xs text-muted-foreground">Monthly savings</p>
        </CardContent>
      </Card>
    </div>
  );
}
