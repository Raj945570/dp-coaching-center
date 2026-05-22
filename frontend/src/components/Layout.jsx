import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundCarousel from './BackgroundCarousel';
import QuotesSection from './QuotesSection';

const Layout = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-primary/20 relative w-full h-full text-slate-900 dark:text-slate-100">
      <BackgroundCarousel />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-grow z-10 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md relative">
        <QuotesSection />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
