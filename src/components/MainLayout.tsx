import { ReactNode } from 'react';
import { GovernmentHeader } from './GovernmentHeader';
import { CommandSidebar } from './CommandSidebar';
import { GovernmentFooter } from './GovernmentFooter';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-command font-ibm-plex">
      <GovernmentHeader />
      <div className="flex h-[calc(100vh-8rem)]">
        <CommandSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <GovernmentFooter />
    </div>
  );
}