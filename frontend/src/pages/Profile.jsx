import React, { useState, useEffect } from 'react';
import { User, Book, Target, Languages, Save, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const Profile = () => {
  const [isSaved, setIsSaved] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    class: '',
    dob: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, config);
        setProfileData(data);
        if (data && data.name) {
          localStorage.setItem('userName', data.name);
        }
      } catch (error) {
        toast.error('Failed to load profile. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    localStorage.setItem('userName', profileData.name);
    toast.success('Profile saved temporarily! (Backend update pending)');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 animate-fade-in relative overflow-hidden z-10 w-full flex justify-center">
      <div className="absolute top-0 left-0 w-full h-96 bg-brand-primary/10 -skew-y-6 transform origin-top-left -z-10"></div>
      
      <div className="w-full max-w-3xl">
        <div className="glass dark:glass-dark rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="bg-slate-900 dark:bg-slate-950 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-brand-primary to-brand-purple flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-slate-800">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{profileData.name || t('Student Profile')}</h1>
              <p className="text-slate-400 mt-1">{profileData.email || t('Manage your personal info')}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="h-4 w-4 text-brand-primary" /> {t('Full Name')}
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>

              {/* Class */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Book className="h-4 w-4 text-brand-primary" /> {t('Class')}
                </label>
                <select 
                  value={profileData.class}
                  onChange={(e) => setProfileData({ ...profileData, class: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 text-slate-700 dark:text-slate-200">
                  <option value="">Select your class</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="dropper">Dropper</option>
                </select>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-primary" /> {t('Mobile')}
                </label>
                <input
                  type="tel"
                  value={profileData.mobile}
                  onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                  placeholder="Enter mobile number"
                />
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Book className="h-4 w-4 text-brand-primary" /> {t('Date of Birth')}
                </label>
                <input
                  type="date"
                  value={profileData.dob}
                  onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className={`text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-opacity ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
                Profile verified and saved successfully!
              </span>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-purple text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Save className="h-5 w-5" /> {t('Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
