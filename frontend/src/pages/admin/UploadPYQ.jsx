import React, { useState, useEffect } from 'react';
import { Upload, FileUp, Loader2, BookOpenText, Trash2, Eye, Calendar, Layers } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const SUBJECT_OPTIONS = ['Chemistry', 'Physics', 'Hindi', 'History', 'Geography', 'Civics'];

const YEAR_OPTIONS = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= currentYear - 10; y--) {
    years.push(y.toString());
  }
  return years;
})();

const UploadPYQ = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('12'); // '10' or '12'
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [pyqs, setPyqs] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const navigate = useNavigate();

  // Fetch PYQs for selected class
  const fetchPYQs = async () => {
    setIsLoadingList(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/pyq/${activeTab}`);
      setPyqs(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load PYQs');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchPYQs();
  }, [activeTab]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate type
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      setFile(null);
      e.target.value = null;
      return;
    }

    // Validate size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size cannot exceed 10MB');
      setFile(null);
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) {
      toast.error('Please select a subject');
      return;
    }
    if (!year) {
      toast.error('Please select a year');
      return;
    }
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('class', activeTab);
    formData.append('subject', subject);
    formData.append('year', year);
    formData.append('file', file);

    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${adminToken}`,
        },
      };

      await axios.post(`${API_BASE_URL}/api/pyq/upload`, formData, config);
      toast.success('PYQ uploaded successfully!');
      
      // Reset form
      setTitle('');
      setSubject('');
      setYear('');
      setFile(null);
      e.target.reset();

      // Refresh list
      fetchPYQs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this PYQ?')) {
      return;
    }

    setDeletingIds((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });

    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      await axios.delete(`${API_BASE_URL}/api/pyq/${id}`, config);
      toast.success('PYQ deleted successfully!');
      
      // Update UI state
      setPyqs((prevPyqs) => prevPyqs.filter((pyq) => pyq._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete PYQ');
    } finally {
      setDeletingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Upload Previous Year Questions</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Add board exam PYQs with subject, year, and PDF file metadata.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form - Left column (spans 2) */}
        <div className="lg:col-span-2 glass dark:glass-dark rounded-2xl p-6 md:p-8 border border-white/20 dark:border-slate-800 shadow-sm relative">
          
          {/* Class Selectors */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('10')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border ${
                activeTab === '10' 
                ? 'border-brand-primary bg-brand-primary/10 text-brand-primary shadow-sm' 
                : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Class 10 PYQs
            </button>
            <button
              onClick={() => setActiveTab('12')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border ${
                activeTab === '12' 
                ? 'border-brand-purple bg-brand-purple/10 text-brand-purple shadow-sm' 
                : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Class 12 PYQs
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Paper Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`e.g., Physics Board Paper (Class ${activeTab})`}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-all text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-all text-sm font-medium"
                >
                  <option value="" disabled className="dark:bg-slate-900">Select Subject</option>
                  {SUBJECT_OPTIONS.map((sub) => (
                    <option key={sub} value={sub} className="dark:bg-slate-900">{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Exam Year</label>
                <select
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-all text-sm font-medium"
                >
                  <option value="" disabled className="dark:bg-slate-900">Select Year</option>
                  {YEAR_OPTIONS.map((yr) => (
                    <option key={yr} value={yr} className="dark:bg-slate-900">{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Upload PDF File</label>
              <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-xl bg-white/30 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors relative group">
                <div className="space-y-1 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-slate-400 group-hover:text-brand-primary transition-colors animate-pulse" />
                  <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                    <label className="relative cursor-pointer rounded-md font-semibold text-brand-primary hover:text-brand-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary transition-colors">
                      <span>Upload a file</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        required 
                        accept=".pdf" 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF up to 10MB allowed</p>
                  {file && (
                    <span className="font-bold text-brand-primary dark:text-brand-purple-light block mt-3 text-sm bg-brand-primary/10 dark:bg-brand-purple/20 px-3 py-1.5 rounded-lg border border-brand-primary/10 dark:border-brand-purple/20">
                      {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button 
                type="submit" 
                disabled={isUploading}
                className={`flex items-center gap-2 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r ${activeTab==='12' ? 'from-brand-purple to-pink-500' : 'from-brand-primary to-cyan-500'}`}
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                {isUploading ? 'Uploading...' : 'Publish PYQ'}
              </button>
            </div>
          </form>
        </div>

        {/* Right column - Recent uploads for selected class */}
        <div className="glass dark:glass-dark rounded-2xl p-6 border border-white/20 dark:border-slate-800 shadow-sm grow flex flex-col min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpenText className={`w-5 h-5 ${activeTab==='12' ? 'text-brand-purple' : 'text-brand-primary'}`} />
            Recent Class {activeTab} PYQs
          </h3>
          
          {isLoadingList ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
              <p className="text-slate-500 text-xs">Loading list...</p>
            </div>
          ) : pyqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center p-4">
              <BookOpenText className="w-12 h-12 text-slate-400 mb-2 opacity-40" />
              <p className="text-sm text-slate-500">No papers found for Class {activeTab}.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800 flex-1 overflow-y-auto max-h-[480px] pr-1 space-y-1">
              {pyqs.map((pyq) => {
                const isDeleting = deletingIds.has(pyq._id);
                return (
                  <li key={pyq._id} className="py-4 flex justify-between items-start group">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-brand-primary transition-colors" title={pyq.title}>
                        {pyq.title}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <Layers className="w-3 h-3 text-slate-400" />
                          {pyq.subject}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {pyq.year}
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 mt-1">
                        Uploaded {new Date(pyq.uploadedAt || pyq.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <a
                        href={pyq.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="View PDF"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(pyq._id)}
                        disabled={isDeleting}
                        className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete PYQ"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPYQ;

