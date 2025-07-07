// Mock data types
export interface Expense {
  id: string;
  amount: number;
  category: 'food' | 'transport' | 'housing' | 'entertainment' | 'utilities' | 'other';
  description: string;
  date: string;
}

export interface UpcomingPayment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  recurring: boolean;
  paid: boolean;
  category: 'housing' | 'utilities' | 'subscription' | 'other';
}

export interface DebtOrLoan {
  id: string;
  title: string;
  amount: number;
  type: 'debt' | 'loan';
  dueDate: string | null;
  interestRate: number | null;
  person: string | null;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
}

export interface FinancialSummary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryTotals {
  category: string;
  total: number;
}

// Generate mock data
export const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 12.99,
    category: "food",
    description: "Lunch at Cafe Delight",
    date: "2023-05-01"
  },
  {
    id: "2",
    amount: 34.50,
    category: "transport",
    description: "Uber ride",
    date: "2023-05-02"
  },
  {
    id: "3",
    amount: 1200.00,
    category: "housing",
    description: "Monthly rent",
    date: "2023-05-03"
  },
  {
    id: "4",
    amount: 45.99,
    category: "entertainment",
    description: "Movie tickets",
    date: "2023-05-04"
  },
  {
    id: "5",
    amount: 89.99,
    category: "utilities",
    description: "Electricity bill",
    date: "2023-05-05"
  },
  {
    id: "6",
    amount: 65.00,
    category: "other",
    description: "Haircut",
    date: "2023-05-06"
  },
  {
    id: "7",
    amount: 28.75,
    category: "food",
    description: "Grocery shopping",
    date: "2023-05-07"
  },
  {
    id: "8",
    amount: 15.00,
    category: "transport",
    description: "Bus pass",
    date: "2023-05-08"
  },
  {
    id: "9",
    amount: 9.99,
    category: "entertainment",
    description: "Streaming subscription",
    date: "2023-05-09"
  },
  {
    id: "10",
    amount: 75.00,
    category: "other",
    description: "New headphones",
    date: "2023-05-10"
  }
];

export const mockUpcomingPayments: UpcomingPayment[] = [
  {
    id: "1",
    title: "Rent",
    amount: 1200.00,
    dueDate: "2023-05-31",
    recurring: true,
    paid: false,
    category: "housing"
  },
  {
    id: "2",
    title: "Internet bill",
    amount: 49.99,
    dueDate: "2023-05-25",
    recurring: true,
    paid: false,
    category: "utilities"
  },
  {
    id: "3",
    title: "Netflix subscription",
    amount: 13.99,
    dueDate: "2023-05-20",
    recurring: true,
    paid: false,
    category: "subscription"
  },
  {
    id: "4",
    title: "Gym membership",
    amount: 35.00,
    dueDate: "2023-05-15",
    recurring: true,
    paid: false,
    category: "subscription"
  },
  {
    id: "5",
    title: "Water bill",
    amount: 28.75,
    dueDate: "2023-05-18",
    recurring: true,
    paid: false,
    category: "utilities"
  }
];

export const mockFinancialSummary: FinancialSummary = {
  balance: 4250.75,
  income: 3500.00,
  expenses: 1677.21,
  savings: 800.00
};

export const mockCategoryTotals: CategoryTotals[] = [
  { category: "Food", total: 41.74 },
  { category: "Transport", total: 49.50 },
  { category: "Housing", total: 1200.00 },
  { category: "Entertainment", total: 55.98 },
  { category: "Utilities", total: 89.99 },
  { category: "Other", total: 140.00 }
];

// Add the missing exports
// Export mockExpenses as mockRecentExpenses too (since they're the same data)
export const mockRecentExpenses = mockExpenses;

// Export mockCategoryTotals as mockExpensesByCategory (since they represent the same concept)
export const mockExpensesByCategory = mockCategoryTotals;

// Format currency function
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Get date in readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
