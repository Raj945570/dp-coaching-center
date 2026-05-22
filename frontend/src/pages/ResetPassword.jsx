import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Key, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const ResetPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from query params
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      toast.success(data.message || t('Password reset successful!'));
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || t('Password reset failed. Please check OTP and try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-brand-primary/20 to-brand-purple/20 rounded-full blur-[100px] -z-10"></div>
      
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass-dark sm:glass dark:glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border border-white/20 dark:border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white bg-clip-text">
              {t('Reset Password')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {t('Enter OTP and your new password')}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleResetPassword}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Email Address')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('6-Digit OTP')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900 tracking-widest font-semibold text-center"
                  placeholder="123456"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('New Password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  minLength="6"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl text-white bg-slate-900 dark:bg-brand-primary hover:bg-slate-800 dark:hover:bg-brand-primary/80 shadow-lg hover:shadow-xl transition-all items-center gap-2 font-semibold text-lg disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('Resetting...')}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t('Reset Password')}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('Back to Login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
