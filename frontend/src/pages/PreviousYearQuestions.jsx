import React, { useState, useEffect } from 'react';
import { Download, Eye, FileText, Loader2, Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const SUBJECTS = ['All', 'Chemistry', 'Physics', 'Hindi', 'History', 'Geography', 'Civics'];

const SkeletonCard = () => (
  <div className="p-6 border-b border-slate-100 dark:border-slate-800 animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="flex items-center gap-4 w-full">
      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="space-y-2 w-full max-w-[300px]">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
      </div>
    </div>
    <div className="flex gap-3 ml-16 sm:ml-0 shrink-0">
      <div className="w-20 h-9 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      <div className="w-24 h-9 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
    </div>
  </div>
);

const PreviousYearQuestions = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('12'); // '10' or '12'
  const [pyqs, setPyqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    const fetchPYQs = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/pyq/${activeTab}`);
        setPyqs(data);
      } catch (err) {
        toast.error('Failed to load PYQs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPYQs();
  }, [activeTab]);

  // Helper to generate a download URL from Cloudinary URL by injecting fl_attachment
  const getDownloadUrl = (url) => {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  // Get list of unique years in current PYQ dataset
  const uniqueYears = ['All', ...new Set(pyqs.map(p => p.year?.toString()).filter(Boolean))].sort((a, b) => b - a);

  // Filter papers
  const filteredPyqs = pyqs.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
    const matchesYear = selectedYear === 'All' || item.year?.toString() === selectedYear;
    return matchesSearch && matchesSubject && matchesYear;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] py-20 animate-fade-in relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('Previous Year')} <span className="text-gradient">{t('Questions')}</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('Practice with original') || 'Practice with authentic previous year board papers.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="glass dark:glass-dark p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 inline-flex">
            <button
              onClick={() => {
                setActiveTab('10');
                setSelectedSubject('All');
                setSelectedYear('All');
              }}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                activeTab === '10' 
                  ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-md cursor-default' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              Class 10
            </button>
            <button
              onClick={() => {
                setActiveTab('12');
                setSelectedSubject('All');
                setSelectedYear('All');
              }}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                activeTab === '12' 
                  ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-md cursor-default' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              Class 12
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="glass dark:glass-dark rounded-2xl p-6 border border-slate-100 dark:border-slate-800 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers by title..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm font-medium transition-all"
              />
            </div>

            {/* Subject Select */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm font-medium transition-all appearance-none"
              >
                <option value="All" className="dark:bg-slate-900">All Subjects</option>
                {SUBJECTS.filter(s => s !== 'All').map((sub) => (
                  <option key={sub} value={sub} className="dark:bg-slate-900">{sub}</option>
                ))}
              </select>
            </div>

            {/* Year Select */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm font-medium transition-all appearance-none"
              >
                <option value="All" className="dark:bg-slate-900">All Years</option>
                {uniqueYears.filter(y => y !== 'All').map((yr) => (
                  <option key={yr} value={yr} className="dark:bg-slate-900">{yr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* List of PYQs */}
        <div className="glass dark:glass-dark rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[300px] flex flex-col">
          {isLoading ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredPyqs.length === 0 ? (
            <div className="text-center py-20 flex-1 flex flex-col justify-center items-center">
              <FileText className="w-16 h-16 text-slate-400 mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-1">No question papers found</h3>
              <p className="text-sm text-slate-500 max-w-sm">No papers matches your filters. Reset search queries or filters to try again.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPyqs.map((item) => (
                <li key={item._id} className="p-6 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* PDF Icon (Red style) */}
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 dark:text-rose-400 group-hover:scale-105 transition-transform shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.subject}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600">
                          Year {item.year}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Uploaded {new Date(item.uploadedAt || item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-16 sm:ml-0 shrink-0">
                    <a 
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Eye className="h-4 w-4" /> {t('View')}
                    </a>
                    <a 
                      href={getDownloadUrl(item.pdfUrl)}
                      download={`${item.title}.pdf`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-purple hover:opacity-90 transition-colors shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="h-4 w-4" /> {t('Download')}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousYearQuestions;

