
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Home, 
  Calendar, 
  CreditCard, 
  PiggyBank, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CircleDollarSign, // Changed from DollarSign to CircleDollarSign
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const mainNavItems: NavItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: CreditCard,
    label: 'Expenses',
    href: '/expenses',
  },
  {
    icon: BarChart3,
    label: 'Reports',
    href: '/reports',
  },
  {
    icon: Calendar,
    label: 'Upcoming',
    href: '/upcoming',
  },
  {
    icon: PiggyBank,
    label: 'Goals',
    href: '/goals',
  },
];

const accountNavItems: NavItem[] = [
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate('/login');
  };
  
  // On mobile, return bottom navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex justify-around p-2">
          {mainNavItems.slice(0, 5).map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              className={cn(
                "flex flex-col items-center p-1 text-muted-foreground",
                isActive(item.href) ? "text-primary" : "hover:text-primary"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // On desktop, return sidebar
  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground transition-all",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-budget-blue" />
            <span className="font-bold text-xl">Budgeta</span>
          </div>
        ) : (
          <CircleDollarSign className="h-6 w-6 text-budget-blue" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(!collapsed && "ml-auto")} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2",
                isActive(item.href) && "bg-sidebar-accent text-sidebar-foreground font-medium"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        {!collapsed && <div className="px-3 py-2">
          <div className="text-xs uppercase text-sidebar-foreground/60 font-medium tracking-wider pl-3 py-1">
            Account
          </div>
        </div>}
        
        <nav className="grid gap-1 px-2 mt-1">
          {accountNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2",
                isActive(item.href) && "bg-sidebar-accent text-sidebar-foreground font-medium"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-2 mt-auto border-t">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                <User size={14} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60">john@example.com</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
            >
              <LogOut size={18} />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="w-full justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <LogOut size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
