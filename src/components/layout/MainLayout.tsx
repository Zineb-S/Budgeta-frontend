
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto ${isMobile ? 'pb-20' : ''}`}>
        <div className="w-full py-6 px-6 md:py-8 md:px-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
