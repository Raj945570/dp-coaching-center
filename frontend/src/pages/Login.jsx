import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Loader2, User, BookOpen, Calendar, Phone } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Set active tab based on query param if available, default to 'login'
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'register' ? 'register' : 'login');
  
  // Update active tab if query param changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'register' || tabParam === 'login') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: '',
    class: '',
    dob: '',
    mobile: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [isCustomClass, setIsCustomClass] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    if (e.target.name === 'classSelect') {
      if (e.target.value === 'Other') {
        setIsCustomClass(true);
        setRegisterData({ ...registerData, class: '' });
      } else {
        setIsCustomClass(false);
        setRegisterData({ ...registerData, class: e.target.value });
      }
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  // Unified Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
      
      if (data.isAdmin) {
        localStorage.setItem('adminToken', data.token);
        toast.success(t('Admin login successful!'));
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('token', data.token);
        toast.success(t('Login successful!'));
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || t('Login failed. Please check credentials.'));
    } finally {
      setLoading(false);
    }
  };

  // Student Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      toast.error(t('Please enter a valid email address'));
      setLoading(false);
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(registerData.mobile)) {
      toast.error(t('Please enter a valid 10-digit mobile number'));
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast.error(t('Password must be at least 6 characters long'));
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, registerData);
      toast.success(t('Registration successful!'));
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || t('Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-brand-primary/20 to-brand-purple/20 rounded-full blur-[100px] -z-10"></div>
      
      <div className="w-full max-w-md animate-slide-up my-8">
        <div className="glass-dark sm:glass dark:glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border border-white/20 dark:border-white/10">
          
          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 p-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl">
            <button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 py-3 text-center font-semibold text-sm rounded-xl transition-all ${
                activeTab === 'login'
                  ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {t('Login')}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 py-3 text-center font-semibold text-sm rounded-xl transition-all ${
                activeTab === 'register'
                  ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {t('Register')}
            </button>
          </div>

          {activeTab === 'login' ? (
            /* Login Section */
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white bg-clip-text">
                  {t('Welcome Back')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{t('Login to your account')}</p>
              </div>

              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('Email Address')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('Password')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Link to="/forgot-password" className="text-sm text-brand-primary hover:text-brand-purple font-medium transition-colors">
                      {t('Forgot password?')}
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 rounded-xl text-white bg-slate-900 dark:bg-brand-primary hover:bg-slate-800 dark:hover:bg-brand-primary/80 shadow-lg hover:shadow-xl transition-all items-center gap-2 font-semibold text-lg disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>{t('Sign In')} <LogIn className="h-5 w-5" /></>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Register Section */
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white bg-clip-text">
                  {t('Create Account')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{t('Join DP Coaching Center today')}</p>
              </div>

              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Full Name')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Class')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-5 w-5 text-slate-400" />
                      </div>
                      <select
                        name="classSelect"
                        value={isCustomClass ? 'Other' : registerData.class}
                        onChange={handleRegisterChange}
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900 appearance-none"
                      >
                        <option value="" disabled>{t('Select Class')}</option>
                        <option value="6">{t('Class 6')}</option>
                        <option value="7">{t('Class 7')}</option>
                        <option value="8">{t('Class 8')}</option>
                        <option value="9">{t('Class 9')}</option>
                        <option value="10">{t('Class 10')}</option>
                        <option value="11">{t('Class 11')}</option>
                        <option value="12">{t('Class 12')}</option>
                        <option value="Other">{t('Other (Custom)')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('DOB')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="date"
                        name="dob"
                        value={registerData.dob}
                        onChange={handleRegisterChange}
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {isCustomClass && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Enter Custom Class')}</label>
                    <input
                      type="text"
                      name="class"
                      value={registerData.class}
                      onChange={(e) => setRegisterData({ ...registerData, class: e.target.value })}
                      required
                      className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="e.g. B.Tech 1st Year"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Mobile Number')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={registerData.mobile}
                      onChange={handleRegisterChange}
                      required
                      pattern="[0-9]{10}"
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Email Address')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="student@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('Password')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      minLength="6"
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-brand-primary focus:border-brand-primary bg-white/50 dark:bg-slate-900/50 dark:text-white backdrop-blur-sm transition-all focus:bg-white dark:focus:bg-slate-900"
                      placeholder="•••••• (min 6 chars)"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-slate-900 dark:bg-brand-primary hover:bg-slate-800 dark:hover:bg-brand-primary/80 shadow-lg hover:shadow-xl transition-all items-center gap-2 font-semibold text-lg disabled:opacity-70 cursor-pointer mt-4"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>{t('Register')} <LogIn className="h-5 w-5" /></>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
