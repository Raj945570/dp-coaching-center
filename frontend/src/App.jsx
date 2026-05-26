import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Subjects from './pages/Subjects';
import Profile from './pages/Profile';
import PreviousYearQuestions from './pages/PreviousYearQuestions';
import Memories from './pages/Memories';

import NotesList from './pages/NotesList';
import ProtectedRoute from './components/ProtectedRoute';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UploadNotes from './pages/admin/UploadNotes';
import ManageNotes from './pages/admin/ManageNotes';
import UploadPYQ from './pages/admin/UploadPYQ';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Main User Routes wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="subjects/:subjectId" element={<ProtectedRoute><NotesList /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="pyq" element={<ProtectedRoute><PreviousYearQuestions /></ProtectedRoute>} />
          <Route path="memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute tokenKey="adminToken" redirectTo="/login">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload-notes" element={<UploadNotes />} />
          <Route path="manage-notes" element={<ManageNotes />} />
          <Route path="upload-pyq" element={<UploadPYQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
