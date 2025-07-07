
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Upcoming from "./pages/Upcoming";
import Goals from "./pages/Goals"; // Added import for Goals page
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DataImport from "./pages/DataImport";
import SmartTagging from "./pages/SmartTagging";
import ReceiptScanner from "./pages/ReceiptScanner";
import FamilyFinances from "./pages/FamilyFinances";
import TripBudgetPlanner from "./pages/TripBudgetPlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/expenses"
            element={
              <MainLayout>
                <Expenses />
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <Reports />
              </MainLayout>
            }
          />
          <Route
            path="/upcoming"
            element={
              <MainLayout>
                <Upcoming />
              </MainLayout>
            }
          />
          <Route
            path="/goals"
            element={
              <MainLayout>
                <Goals />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />
          {/* New feature routes */}
          <Route
            path="/data-import"
            element={
              <MainLayout>
                <DataImport />
              </MainLayout>
            }
          />
          <Route
            path="/smart-tagging"
            element={
              <MainLayout>
                <SmartTagging />
              </MainLayout>
            }
          />
          <Route
            path="/receipt-scanner"
            element={
              <MainLayout>
                <ReceiptScanner />
              </MainLayout>
            }
          />
          <Route
            path="/family-finances"
            element={
              <MainLayout>
                <FamilyFinances />
              </MainLayout>
            }
          />
          <Route
            path="/trip-budget"
            element={
              <MainLayout>
                <TripBudgetPlanner />
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
