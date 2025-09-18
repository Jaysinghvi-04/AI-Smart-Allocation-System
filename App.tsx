

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboardLayout from './pages/StudentDashboard/StudentDashboardLayout';
import CompanyDashboardLayout from './pages/CompanyDashboard/CompanyDashboardLayout';
import AdminDashboardLayout from './pages/AdminDashboard/AdminDashboardLayout';

// Student Pages
import StudentProfilePage from './pages/StudentDashboard/ProfilePage';
import OpportunitiesPage from './pages/StudentDashboard/OpportunitiesPage';
import ApplicationsPage from './pages/StudentDashboard/ApplicationsPage';
import StudentAnalyticsPage from './pages/StudentDashboard/AnalyticsPage';
import NotificationsPage from './pages/StudentDashboard/NotificationsPage';

// Company Pages
import CompanyProfilePage from './pages/CompanyDashboard/ProfilePage';
import ManageInternshipsPage from './pages/CompanyDashboard/ManageInternshipsPage';
import ApplicationsManagementPage from './pages/CompanyDashboard/ApplicationsManagementPage';
import CompanyAnalyticsPage from './pages/CompanyDashboard/AnalyticsPage';

// Admin Pages
import AdminAnalyticsDashboard from './pages/AdminDashboard/AnalyticsDashboard';
import StudentManagementPage from './pages/AdminDashboard/StudentManagementPage';
import CompanyManagementPage from './pages/AdminDashboard/CompanyManagementPage';
import InternshipOversightPage from './pages/AdminDashboard/InternshipOversightPage';
import AllocationEnginePage from './pages/AdminDashboard/AllocationEnginePage';
import ApplicationMonitoringPage from './pages/AdminDashboard/ApplicationMonitoringPage';
import AnnouncementsPage from './pages/AdminDashboard/AnnouncementsPage';
import SettingsPage from './pages/AdminDashboard/SettingsPage';


const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Student Dashboard Routes */}
        <Route path="/student" element={<StudentDashboardLayout />}>
          <Route index element={<Navigate to="opportunities" replace />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="analytics" element={<StudentAnalyticsPage />} />
        </Route>

        {/* Company Dashboard Routes */}
        <Route path="/company" element={<CompanyDashboardLayout />}>
           <Route index element={<Navigate to="internships" replace />} />
           <Route path="profile" element={<CompanyProfilePage />} />
           <Route path="internships" element={<ManageInternshipsPage />} />
           <Route path="applications" element={<ApplicationsManagementPage />} />
           <Route path="analytics" element={<CompanyAnalyticsPage />} />
        {/* FIX: Corrected closing tag from </dRoute> to </Route> */}
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AdminAnalyticsDashboard />} />
          <Route path="students" element={<StudentManagementPage />} />
          <Route path="students/:studentId" element={<StudentProfilePage />} />
          <Route path="companies" element={<CompanyManagementPage />} />
          <Route path="companies/:companyId" element={<CompanyProfilePage />} />
          <Route path="internships" element={<InternshipOversightPage />} />
          <Route path="applications" element={<ApplicationMonitoringPage />} />
          <Route path="allocation" element={<AllocationEnginePage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;