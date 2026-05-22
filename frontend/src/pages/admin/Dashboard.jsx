import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Layers, TrendingUp, Loader2, Calendar, FileText, Trash2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const Dashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          const config = {
            headers: { Authorization: `Bearer ${adminToken}` }
          };
          const { data } = await axios.get(`${API_BASE_URL}/api/admin/stats`, config);
          setStatsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
        <p className="text-slate-500 dark:text-slate-400 animate-pulse">Loading dashboard stats...</p>
      </div>
    );
  }

  const { stats, recentUploads = [], monthlyStats = [] } = statsData || {
    stats: { totalNotes: 0, totalPYQs: 0, totalSubjects: 6, totalUploads: 0 },
    recentUploads: [],
    monthlyStats: []
  };

  const statCards = [
    { name: 'Total Notes', value: stats.totalNotes.toString(), icon: <BookOpen className="w-6 h-6" />, color: 'text-brand-primary', bg: 'bg-brand-primary/10', border: 'border-brand-primary/20' },
    { name: 'Total PYQs', value: stats.totalPYQs.toString(), icon: <TrendingUp className="w-6 h-6" />, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: 'Total Uploads', value: stats.totalUploads.toString(), icon: <FileText className="w-6 h-6" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Subjects', value: stats.totalSubjects.toString(), icon: <Layers className="w-6 h-6" />, color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20' },
  ];

  // SVG Chart calculation
  const maxVal = Math.max(...monthlyStats.map(d => d.total), 5); // Fallback to 5 to avoid divide by zero/flat charts
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 20;

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Welcome Banner */}
      <div className="glass dark:glass-dark rounded-2xl p-8 relative overflow-hidden border border-white/20 dark:border-slate-800">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Here is what's happening with the DP Coaching Center repository. Upload materials, manage notes, previous year question papers, and monitor portal activity.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/upload-notes" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-purple text-white font-medium hover:opacity-90 transition-opacity text-sm shadow-md">
              + Upload Note
            </Link>
            <Link to="/admin/upload-pyq" className="px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity text-sm shadow-md">
              + Upload PYQ
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`glass dark:glass-dark rounded-2xl p-6 border ${stat.border} flex items-center justify-between hover:-translate-y-1 transition-all duration-300 shadow-sm`}>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
              <p className="text-3xl font-black text-slate-800 dark:text-white mt-2 tracking-tight">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Activity Chart */}
        <div className="lg:col-span-2 glass dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Upload Activity</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Aggregate upload frequency across Notes and PYQs over the last 6 months</p>
          </div>
          
          <div className="w-full relative overflow-x-auto">
            {/* SVG Chart Container */}
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight + paddingY * 2}`} className="w-full min-w-[400px] overflow-visible">
              <defs>
                <linearGradient id="barGradNotes" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="barGradPyqs" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const yPos = paddingY + chartHeight * (1 - ratio);
                const valLabel = Math.round(maxVal * ratio);
                return (
                  <g key={idx} className="opacity-30 dark:opacity-20">
                    <line x1={paddingX} y1={yPos} x2={chartWidth - paddingX} y2={yPos} stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeDasharray="4 4" />
                    <text x={paddingX - 10} y={yPos + 4} textAnchor="end" className="text-[10px] font-medium fill-slate-400 dark:fill-slate-500">{valLabel}</text>
                  </g>
                );
              })}

              {/* Chart Bars */}
              {monthlyStats.map((item, idx) => {
                const stepX = (chartWidth - paddingX * 2) / (monthlyStats.length - 1 || 1);
                const xPos = paddingX + idx * stepX;
                
                // Notes bar height
                const notesRatio = item.notes / maxVal;
                const notesBarH = notesRatio * chartHeight;
                const notesY = paddingY + chartHeight - notesBarH;

                // PYQs bar height
                const pyqsRatio = item.pyqs / maxVal;
                const pyqsBarH = pyqsRatio * chartHeight;
                const pyqsY = paddingY + chartHeight - pyqsBarH;

                const barWidth = 14;

                return (
                  <g key={idx}>
                    {/* Notes Bar */}
                    <rect
                      x={xPos - barWidth - 2}
                      y={notesY}
                      width={barWidth}
                      height={notesBarH}
                      rx={3}
                      fill="url(#barGradNotes)"
                      className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                    />
                    {/* PYQs Bar */}
                    <rect
                      x={xPos + 2}
                      y={pyqsY}
                      width={barWidth}
                      height={pyqsBarH}
                      rx={3}
                      fill="url(#barGradPyqs)"
                      className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                    />
                    
                    {/* Text Label on X Axis */}
                    <text
                      x={xPos}
                      y={paddingY + chartHeight + 15}
                      textAnchor="middle"
                      className="text-[11px] font-semibold fill-slate-500 dark:fill-slate-400"
                    >
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="flex gap-6 mt-6 justify-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-brand-primary"></span>
              Notes Uploaded
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
              PYQs Uploaded
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="glass dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Quick Actions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Manage items or view student portal portals</p>
          </div>
          
          <div className="space-y-4 flex flex-col flex-grow">
            <Link to="/admin/upload-notes" className="w-full py-4 px-5 rounded-2xl font-semibold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-all flex items-center justify-between text-left group">
              Upload Study Notes
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/admin/upload-pyq" className="w-full py-4 px-5 rounded-2xl font-semibold text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 transition-all flex items-center justify-between text-left group">
              Upload PYQs & PAPERS
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/admin/manage-notes" className="w-full py-4 px-5 rounded-2xl font-semibold text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20 transition-all flex items-center justify-between text-left group">
              Manage Existing Notes
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/" className="w-full py-4 px-5 rounded-2xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-between text-left group">
              View Student Website
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="glass dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recent Uploads</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review the last 5 uploads pushed to the platform</p>
          </div>
          <Calendar className="w-6 h-6 text-slate-400" />
        </div>

        {recentUploads.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            No recent uploads found. Get started by uploading a Note or PYQ!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Uploaded At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {recentUploads.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200 max-w-[200px] truncate">
                      {item.title}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        item.type === 'Note' 
                          ? 'bg-brand-primary/10 text-brand-primary' 
                          : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.subject}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.type === 'PYQ' ? `Class ${item.class || 'N/A'} • ${item.year || 'N/A'}` : 'Study Note'}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(item.uploadedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

