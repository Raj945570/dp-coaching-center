import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success(t('Logged out successfully!'));
    setIsOpen(false);
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const navLinks = isLoggedIn ? [
    { name: t('Home'), path: '/' },
    { name: t('Subjects'), path: '/subjects' },
    { name: t('PYQ'), path: '/pyq' },
    { name: t('Memories'), path: '/memories' },
    { name: t('Profile'), path: '/profile' },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 glass dark:glass-dark border-b-0 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-brand-primary" />
            <span className="font-bold text-xl tracking-tight dark:text-white text-slate-800">
              {i18n.language === 'hi' ? 'डीपी कोचिंग' : 'DP Coaching'} <span className="text-brand-primary">{i18n.language === 'hi' ? 'सेंटर' : 'Center'}</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors font-medium hover:text-brand-primary ${
                    isActive ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="flex items-center gap-3 border-l border-slate-300 dark:border-slate-700 pl-6 transition-colors">
              <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 dark:text-slate-300 text-slate-600 font-semibold text-sm">
                 <Languages className="h-5 w-5" />
                 {i18n.language === 'en' ? 'हि' : 'En'}
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5 ml-2 cursor-pointer"
                >
                  {t('Logout')}
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-purple text-white font-medium hover:shadow-lg transition-transform hover:-translate-y-0.5 ml-2"
                >
                  {t('Login')}
                </NavLink>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
             <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs flex gap-1 items-center">
                 <Languages className="h-4 w-4" />
                 {i18n.language === 'en' ? 'हि' : 'En'}
             </button>
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-brand-primary p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass dark:glass-dark border-t border-white/10 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md font-medium ${
                    isActive ? 'text-brand-primary bg-brand-primary/10' : 'text-slate-600 dark:text-slate-300 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full block mt-4 px-3 py-2 text-center rounded-md bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium shadow-md cursor-pointer"
              >
                {t('Logout')}
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-3 py-2 text-center rounded-md bg-gradient-to-r from-brand-primary to-brand-purple text-white font-medium shadow-md"
              >
                {t('Login')}
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
