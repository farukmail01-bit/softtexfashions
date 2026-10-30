import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './AdminContext';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminPagesList from './AdminPagesList';
import AdminPageEditor from './AdminPageEditor';
import AdminInquiries from './AdminInquiries';
import AdminGalleries from './AdminGalleries';
import AdminMediaLibrary from './AdminMediaLibrary';
import AdminSettings from './AdminSettings';
import AdminBlogManager from './AdminBlogManager';
import AdminSecurity from './AdminSecurity';

function AdminRouter() {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
          Initializing Softtex CMS...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<AdminDashboard />} />
        <Route path="pages" element={<AdminPagesList />} />
        <Route path="pages/edit/:id" element={<AdminPageEditor />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="galleries" element={<AdminGalleries />} />
        <Route path="media" element={<AdminMediaLibrary />} />
        <Route path="blog" element={<AdminBlogManager />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default function AdminRoot() {
  return (
    <AdminProvider>
      <AdminRouter />
    </AdminProvider>
  );
}
