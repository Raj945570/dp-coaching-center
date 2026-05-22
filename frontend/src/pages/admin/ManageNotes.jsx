import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Search, FileText, Loader2, Filter, Calendar } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  // Fetch all notes
  const fetchNotes = async () => {
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

      const { data } = await axios.get(`${API_BASE_URL}/api/notes`, config);
      setNotes(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Delete note handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note? This will also remove the file from Cloudinary.')) {
      return;
    }

    // Set loading state for this specific note
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

      await axios.delete(`${API_BASE_URL}/api/notes/${id}`, config);
      toast.success('Note deleted successfully!');
      
      // Update UI state immediately
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete note');
    } finally {
      // Clear loading state
      setDeletingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  // Filter notes based on search query and subject
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === '' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Notes</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">View or delete existing study materials.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-colors text-sm shadow-sm"
            />
          </div>

          {/* Subject Filter */}
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-colors text-sm shadow-sm appearance-none"
            >
              <option value="">All Subjects</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Hindi">Hindi</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Civics">Civics</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass dark:glass-dark rounded-2xl border border-white/20 dark:border-slate-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
            <p className="text-slate-500 text-sm">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No notes found</h3>
            <p className="text-slate-500">Try adjusting your search filters or upload a new note.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
              <thead className="bg-slate-50/50 dark:bg-slate-800/20">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Title & Subject
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                    Date Uploaded
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-slate-200 dark:divide-slate-700/50">
                {filteredNotes.map((note) => {
                  const fileUrl = note.pdfUrl || note.fileUrl;
                  const isDeleting = deletingIds.has(note._id);
                  return (
                    <tr key={note._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{note.title}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{note.subject}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {new Date(note.uploadedAt || note.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <a 
                            href={fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-brand-primary bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="View PDF"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button 
                            onClick={() => handleDelete(note._id)}
                            disabled={isDeleting}
                            className="p-2 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                            title="Delete Note"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNotes;
