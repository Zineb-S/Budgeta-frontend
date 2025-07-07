
import { CategoryTotals, formatCurrency } from "@/lib/mockData";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

interface ExpensesByCategoryChartProps {
  data: CategoryTotals[];
}

export function ExpensesByCategoryChart({ data }: ExpensesByCategoryChartProps) {
  const COLORS = [
    '#F59E0B', // food
    '#8B5CF6', // transport
    '#EC4899', // housing
    '#3B82F6', // entertainment
    '#F97316', // utilities
    '#6B7280', // other
  ];

  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="total"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Amount"]} 
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Total Expenses: {formatCurrency(totalExpenses)}
      </div>
    </div>
  );
}
