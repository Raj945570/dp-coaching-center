import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download, Eye, Loader2, ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const SkeletonNoteCard = () => (
  <div className="glass dark:glass-dark rounded-2xl p-6 border border-white/25 dark:border-slate-800/80 animate-pulse flex flex-col h-[260px] justify-between relative overflow-hidden">
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        <div className="w-24 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-3"></div>
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
    </div>
  </div>
);

const NotesList = () => {
  const { subjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const endpoint = subjectId === 'all'
          ? `${API_BASE_URL}/api/notes`
          : `${API_BASE_URL}/api/notes/${subjectId}`;
        const { data } = await axios.get(endpoint);
        setNotes(data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Failed to load notes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [subjectId]);

  // Helper to generate a download URL from Cloudinary URL by injecting fl_attachment
  const getDownloadUrl = (url) => {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 animate-fade-in relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/subjects" className="inline-flex items-center text-brand-primary hover:text-brand-purple transition-all duration-300 mb-4 font-medium hover:translate-x-[-4px]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight">
              {subjectId === 'all' ? 'All Subjects' : subjectId} <span className="text-gradient">Notes</span>
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {subjectId === 'all' 
                ? 'Read and download study materials for all subjects curated by experts.' 
                : `Read and download study materials for ${subjectId} curated by experts.`}
            </p>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 p-1.5 glass dark:glass-dark rounded-2xl border border-slate-200 dark:border-slate-800/85 w-full md:max-w-max">
          {['all', 'Chemistry', 'Physics', 'Hindi', 'History', 'Geography', 'Civics'].map((sub) => {
            const isActive = subjectId.toLowerCase() === sub.toLowerCase();
            return (
              <Link
                key={sub}
                to={`/subjects/${sub}`}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize flex-1 md:flex-initial text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-primary to-brand-purple text-white shadow-md cursor-default'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {sub === 'all' ? 'All Subjects' : sub}
              </Link>
            );
          })}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonNoteCard />
            <SkeletonNoteCard />
            <SkeletonNoteCard />
            <SkeletonNoteCard />
            <SkeletonNoteCard />
            <SkeletonNoteCard />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24 glass dark:glass-dark rounded-3xl border border-white/20 dark:border-slate-800/80 shadow-xl transition-all duration-300">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No notes available</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">We are currently uploading study materials for {subjectId}. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => {
              const fileUrl = note.pdfUrl || note.fileUrl;
              return (
                <div 
                  key={note._id} 
                  className="glass dark:glass-dark rounded-2xl p-6 border border-white/25 dark:border-slate-800/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute -right-10 -top-10 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl group-hover:bg-brand-primary/25 transition-all duration-300"></div>
                  
                  <div className="flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      {/* PDF Icon (Red style) */}
                      <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center shadow-inner">
                        <FileText className="w-6 h-6" />
                      </div>
                      {/* Subject Badge */}
                      <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-purple/20 text-brand-primary dark:text-brand-purple-light border border-brand-primary/10 dark:border-brand-purple/35">
                        <BookOpen className="w-3.5 h-3.5" />
                        {note.subject}
                      </span>
                    </div>
 
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors duration-300" title={note.title}>
                      {note.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Added: {new Date(note.uploadedAt || note.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  
                  {/* View / Download Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all duration-200 text-sm shadow-sm"
                    >
                      <Eye className="w-4 h-4" /> View PDF
                    </a>
                    <a 
                      href={getDownloadUrl(fileUrl)} 
                      download={`${note.title}.pdf`}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-primary text-white hover:bg-brand-primary/95 dark:bg-brand-purple dark:hover:bg-brand-purple/95 rounded-xl font-semibold transition-all duration-200 text-sm shadow-sm hover:shadow-lg hover:shadow-brand-primary/20 dark:hover:shadow-brand-purple/20"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
