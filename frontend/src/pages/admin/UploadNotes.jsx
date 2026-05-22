import React, { useState } from 'react';
import { Upload, FileUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config';

const UploadNotes = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      setSelectedFile(null);
      e.target.value = null; // reset input
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size cannot exceed 10MB');
      setSelectedFile(null);
      e.target.value = null; // reset input
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsUploading(true);

    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${API_BASE_URL}/api/notes/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${adminToken}`,
          },
        }
      );

      toast.success("PDF uploaded successfully!");
      
      // Reset form fields
      setTitle('');
      setSubject('');
      setSelectedFile(null);
      e.target.reset();

    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to upload file";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Upload Notes</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Add new study materials for students to access.</p>
      </div>

      <div className="glass dark:glass-dark rounded-2xl p-6 md:p-8 border border-white/20 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Note Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Organic Chemistry Chapter 1"
              className="w-full px-4 py-3 rounded-xl border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-colors"
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
            <select 
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-brand-primary focus:border-brand-primary dark:text-white transition-colors appearance-none"
            >
              <option value="">Select a subject...</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Hindi">Hindi</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Civics">Civics</option>
            </select>
          </div>

          {/* File Upload zone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload PDF</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-xl bg-white/30 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors relative group">
              <div className="space-y-1 text-center">
                <FileUp className="mx-auto h-12 w-12 text-slate-400 group-hover:text-brand-primary transition-colors" />
                <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                  <label className="relative cursor-pointer rounded-md font-medium text-brand-primary hover:text-brand-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary transition-colors">
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
                <p className="text-xs text-slate-500">PDF up to 10MB</p>
                {selectedFile && (
                  <span className="font-semibold text-brand-primary dark:text-brand-purple-light block mt-2 text-sm bg-brand-primary/10 dark:bg-brand-purple/20 px-3 py-1.5 rounded-lg border border-brand-primary/10 dark:border-brand-purple/20">
                    {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button 
              type="submit" 
              disabled={isUploading}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-purple text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {isUploading ? 'Uploading...' : 'Publish Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadNotes;
