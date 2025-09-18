import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import { UserRole } from '../../types';

const StudentDashboardLayout: React.FC = () => {
  return (
    <div className="theme-student flex min-h-screen">
      <Sidebar userRole={UserRole.Student} />
      <main className="flex-1">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardLayout;