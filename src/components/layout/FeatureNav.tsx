
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Upload, Tag, Receipt, Users, Airplay } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "Bank Import",
    icon: Upload,
    path: "/data-import",
    description: "Import bank statements",
  },
  {
    name: "Smart Tagging",
    icon: Tag,
    path: "/smart-tagging",
    description: "AI-powered categorization",
  },
  {
    name: "Receipt Scanner",
    icon: Receipt,
    path: "/receipt-scanner",
    description: "Scan & analyze receipts",
  },
  {
    name: "Family Finances",
    icon: Users,
    path: "/family-finances",
    description: "Shared budgeting",
  },
  {
    name: "Trip Planner",
    icon: Airplay,
    path: "/trip-budget",
    description: "Plan trip expenses",
  },
];

export function FeatureNav() {
  const location = useLocation();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-6">
      {features.map((feature) => (
        <Link
          key={feature.path}
          to={feature.path}
          className={cn(
            "flex flex-col items-center justify-center p-4 rounded-lg text-center transition-colors",
            "border hover:border-primary hover:bg-primary/5",
            location.pathname === feature.path
              ? "bg-primary/10 border-primary"
              : "bg-card border-border"
          )}
        >
          <feature.icon className="h-6 w-6 mb-2 text-primary" />
          <span className="font-medium text-sm">{feature.name}</span>
          <span className="text-xs text-muted-foreground hidden md:block">
            {feature.description}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default FeatureNav;
