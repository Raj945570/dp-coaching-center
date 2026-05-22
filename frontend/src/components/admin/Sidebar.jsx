import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, FileStack, BookOpenText, LogOut, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Upload Notes', path: '/admin/upload-notes', icon: <Upload className="w-5 h-5" /> },
    { label: 'Manage Notes', path: '/admin/manage-notes', icon: <FileStack className="w-5 h-5" /> },
    { label: 'Upload PYQs', path: '/admin/upload-pyq', icon: <BookOpenText className="w-5 h-5" /> },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 glass dark:glass-dark border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-purple">
              DP Admin
            </span>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                    ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <NavLink 
              to="/login" 
              onClick={() => localStorage.removeItem('adminToken')}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
