import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-transparent pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('DP Coaching Center')}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t('WhyChooseDesc')}
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200 mt-4">
              Founder: <span className="text-brand-primary">Dhanraj Prajapati</span>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('Home')}</Link></li>
              <li><Link to="/subjects" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('Subjects')}</Link></li>
              <li><Link to="/pyq" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('PYQ')}</Link></li>
              <li><Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('Login')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">PVS School Chhiri, Bara, Jasra, Prayagraj</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-primary flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">+91 9651207626</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-brand-purple hover:text-white transition-colors cursor-pointer">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} DP Coaching Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
