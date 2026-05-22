import React from 'react';
import { ArrowRight, BookOpen, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Founder from '../components/Founder';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <BookOpen className="h-8 w-8 text-brand-primary" />, title: t('Expert Notes'), desc: t('ExpertNotesDesc') },
    { icon: <Star className="h-8 w-8 text-brand-purple" />, title: t('PYQ Solutions'), desc: t('PYQDesc') },
    { icon: <TrendingUp className="h-8 w-8 text-emerald-500" />, title: t('Student Tracking'), desc: t('StudentTrackingDesc') }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
            {t('Master Your Studies with')} <br className="hidden md:block" />
            <span className="text-gradient">{t('DP Coaching Center')}</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
            {t('Expert guidance')} <span className="font-semibold text-slate-800 dark:text-white">Dhanraj Prajapati</span>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-lg dark:hover:bg-slate-200 hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center gap-2">
              {t('Join Now')} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/subjects" className="glass dark:glass-dark px-8 py-4 rounded-full text-slate-700 dark:text-slate-200 font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center">
              {t('Explore Subjects')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 glass dark:glass-dark border-y border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-800">
            {[
              { label: t('Active Students'), value: '100+', highlight: true },
              { label: t('Subject Experts'), value: '10+' },
              { label: t('Success Rate'), value: '98%' },
              { label: t('Years Experience'), value: '5+' },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-purple animate-pulse' : 'text-slate-800 dark:text-white'}`}>{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <Founder />

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t('Why Choose Us?')}</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t('WhyChooseDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="glass dark:glass-dark p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-white/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
