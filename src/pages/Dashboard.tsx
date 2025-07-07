
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpensesByCategoryChart } from '@/components/dashboard/ExpensesByCategoryChart';
import { FinancialSummaryCard } from '@/components/dashboard/FinancialSummaryCard';
import { RecentExpensesCard } from '@/components/dashboard/RecentExpensesCard';
import { UpcomingPaymentsCard } from '@/components/dashboard/UpcomingPaymentsCard';
import { FeatureNav } from '@/components/layout/FeatureNav';
import { 
  mockFinancialSummary, 
  mockExpensesByCategory,
  mockUpcomingPayments,
  mockRecentExpenses
} from '@/lib/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Header with beautiful gradient */}
      <div className="flex flex-col gap-2 budget-gradient-bg text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <p className="text-white/90 max-w-2xl">
          Welcome to your personal finance hub. Track your expenses, manage your budget, and plan for your financial future.
        </p>
      </div>
      
      {/* Financial Summary Section */}
      <div className="mb-6">
        <FinancialSummaryCard data={mockFinancialSummary} />
      </div>
      
      {/* Feature Navigation */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <FeatureNav />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Expenses Chart */}
        <div className="space-y-6">
          <div className="budget-card overflow-hidden">
            <div className="p-6 pb-2">
              <h2 className="text-xl font-semibold">Expenses by Category</h2>
            </div>
            <ExpensesByCategoryChart data={mockExpensesByCategory} />
          </div>
        </div>
        
        {/* Right Column - Monthly Overview */}
        <div className="space-y-6">
          <div className="budget-card overflow-hidden h-full">
            <div className="p-6 pb-2">
              <h2 className="text-xl font-semibold">Monthly Overview</h2>
            </div>
            <div className="p-6">
              <UpcomingPaymentsCard payments={mockUpcomingPayments} showAll={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Width Tabs Section */}
      <div className="w-full">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="recent">Recent Expenses</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="budget-card overflow-hidden">
              <ScrollArea className="h-[400px]">
                <RecentExpensesCard expenses={mockRecentExpenses} />
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="budget-card overflow-hidden">
              <ScrollArea className="h-[400px]">
                <UpcomingPaymentsCard payments={mockUpcomingPayments} />
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
