import React from 'react';
import { Menu, Bell, UserRound } from 'lucide-react';

const AdminNavbar = ({ setIsOpen }) => {
  return (
    <header className="h-16 glass dark:glass-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-slate-800 dark:text-white lg:hidden">Admin Panel</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-primary to-brand-purple flex items-center justify-center text-white shadow-sm">
            <UserRound className="w-5 h-5" />
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-semibold text-slate-800 dark:text-white leading-none mb-1">Admin</p>
            <p className="text-slate-500 dark:text-slate-400 leading-none text-xs">admin@dpclasses.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
