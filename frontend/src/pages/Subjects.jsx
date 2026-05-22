import React from 'react';
import { FlaskConical, Atom, Languages, BookOpen, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Subjects = () => {
  const { t } = useTranslation();

  const subjects = [
    { name: 'Chemistry', icon: <FlaskConical className="h-10 w-10" />, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/50', text: 'text-blue-600 dark:text-blue-400' },
    { name: 'Physics', icon: <Atom className="h-10 w-10" />, color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/50', text: 'text-purple-600 dark:text-purple-400' },
    { name: 'Hindi', icon: <Languages className="h-10 w-10" />, color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/50', text: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'History', icon: <BookOpen className="h-10 w-10" />, color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/50', text: 'text-amber-600 dark:text-amber-400' },
    { name: 'Geography', icon: <Calculator className="h-10 w-10" />, color: 'from-green-400 to-green-600', bg: 'bg-green-50 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-400' },
    { name: 'Civics', icon: <BookOpen className="h-10 w-10" />, color: 'from-rose-400 to-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/50', text: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] py-20 animate-fade-in relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('Explore')} <span className="text-gradient">{t('Subjects')}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('Choose a subject')}
          </p>
          <div className="mt-6 flex justify-center">
            <Link 
              to="/subjects/all" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-purple text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:opacity-95 transition-all duration-300 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              {t('View All Notes')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, idx) => (
            <div key={idx} className="group glass dark:glass-dark rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${subject.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              <div className={`w-20 h-20 rounded-2xl ${subject.bg} ${subject.text} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {subject.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{subject.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">{t('ExpertNotesDesc') || 'Explore expert-curated notes for this subject.'}</p>
              
              <Link to={`/subjects/${subject.name}`} className="inline-flex items-center text-sm font-semibold text-brand-primary group-hover:text-brand-purple transition-colors">
                {t('View Notes')} <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
