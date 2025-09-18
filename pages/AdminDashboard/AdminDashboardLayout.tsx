import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { UserRole } from '../../types';

const AdminDashboardLayout: React.FC = () => {
  return (
    <div className="theme-admin flex min-h-screen">
      <Sidebar userRole={UserRole.Admin} />
      <main className="flex-1">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;