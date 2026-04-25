import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gfg-bg text-gfg-text">
      <Navbar />
      <div className="flex flex-1 overflow-hidden max-w-[1400px] w-full mx-auto shadow-sm bg-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gfg-bg">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
