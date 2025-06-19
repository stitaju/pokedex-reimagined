import React from 'react';
import { Toaster } from 'sonner';
import Sidebar from './Sidebar/index';

interface LayoutProps {
  children: React.ReactNode;
}
// Main Layout of the App
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex max-w-[1400px] m-auto">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
      </div>

      <Toaster
        richColors
        position="top-right"
        theme={'dark'}
      />
    </div>
  );
};

export default Layout;
