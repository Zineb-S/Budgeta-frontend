
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, PiggyBank, Calendar, CircleDollarSign, Pencil, Trash2 } from "lucide-react";
import { FinancialGoal, formatCurrency } from "@/lib/mockData";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock goals data - in a real app, this would come from an API or database
const initialGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 2750,
    targetDate: "2023-12-31"
  },
  {
    id: "2",
    title: "New Car",
    targetAmount: 15000,
    currentAmount: 3500,
    targetDate: "2024-06-30"
  },
  {
    id: "3",
    title: "Vacation",
    targetAmount: 2000,
    currentAmount: 1200,
    targetDate: "2023-08-15"
  }
];

export default function Goals() {
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const goalToAdd = {
      id: Date.now().toString(),
      title: newGoal.title || "",
      targetAmount: Number(newGoal.targetAmount) || 0,
      currentAmount: Number(newGoal.currentAmount) || 0,
      targetDate: newGoal.targetDate || null
    };

    setGoals([...goals, goalToAdd]);
    setNewGoal({
      title: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: ""
    });
    setIsDialogOpen(false);
    toast.success("Goal added successfully!");
  };

  const handleUpdateGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setGoals(goals.map(goal => {
      if (goal.id === editingGoalId) {
        return {
          ...goal,
          title: newGoal.title || goal.title,
          targetAmount: Number(newGoal.targetAmount) || goal.targetAmount,
          currentAmount: Number(newGoal.currentAmount) || goal.currentAmount,
          targetDate: newGoal.targetDate || goal.targetDate
        };
      }
      return goal;
    }));
    
    setIsEditing(false);
    setEditingGoalId(null);
    setNewGoal({
      title: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: ""
    });
    setIsDialogOpen(false);
    toast.success("Goal updated successfully!");
  };

  const handleEditGoal = (goal: FinancialGoal) => {
    setIsEditing(true);
    setEditingGoalId(goal.id);
    setNewGoal({
      title: goal.title,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      targetDate: goal.targetDate || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success("Goal deleted successfully!");
  };

  const calculateProgress = (current: number, target: number): number => {
    const percentage = (current / target) * 100;
    return Math.min(percentage, 100);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "No target date";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Goals</h2>
          <p className="text-muted-foreground">Track and manage your savings goals</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="group">
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Goal" : "Add New Goal"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your financial goal."
                  : "Create a new financial goal to track your savings progress."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Goal Name</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Emergency Fund"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetAmount">Target Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="targetAmount"
                    type="number"
                    className="pl-8"
                    value={newGoal.targetAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) })}
                    placeholder="5000"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentAmount">Current Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="currentAmount"
                    type="number"
                    className="pl-8"
                    value={newGoal.currentAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetDate">Target Date (Optional)</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={isEditing ? handleUpdateGoal : handleAddGoal}>
                {isEditing ? "Update Goal" : "Add Goal"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <PiggyBank className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-center">No goals yet</p>
            <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
              Set financial goals to help stay on track with your savings
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => {
                  setIsEditing(false);
                  setNewGoal({
                    title: "",
                    targetAmount: 0,
                    currentAmount: 0,
                    targetDate: ""
                  });
                  setIsDialogOpen(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Goal
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="budget-card overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold truncate">{goal.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {formatDate(goal.targetDate)}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditGoal(goal)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Target className="h-5 w-5 text-budget-blue" />
                      <span className="text-sm font-medium">Target:</span>
                    </div>
                    <span className="font-semibold text-budget-blue">{formatCurrency(goal.targetAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <CircleDollarSign className="h-5 w-5 text-budget-green" />
                      <span className="text-sm font-medium">Current:</span>
                    </div>
                    <span className="font-semibold text-budget-green">{formatCurrency(goal.currentAmount)}</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{Math.round(calculateProgress(goal.currentAmount, goal.targetAmount))}%</span>
                    </div>
                    <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/30 px-6 py-3">
                <div className="w-full text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-medium">
                      {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
