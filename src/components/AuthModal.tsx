import React, { useState } from 'react';
import { X, Lock, User as UserIcon, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Status Alerts
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  React.useEffect(() => {
    setActiveTab(initialTab);
    setAlert(null);
    // Clear forms on reopen
    setLoginUsername('');
    setLoginPassword('');
    setRegUsername('');
    setRegPassword('');
    setRegConfirmPassword('');
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // LocalStorage Simulated Auth Helper
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    const usernameTrimmed = loginUsername.trim();
    if (!usernameTrimmed || !loginPassword) {
      setAlert({ type: 'error', message: 'Harap lengkapi semua kolom.' });
      return;
    }

    const rawUsers = localStorage.getItem('coffeeshop_users');
    const users = rawUsers ? JSON.parse(rawUsers) : [{ username: 'budi', password: '123' }, { username: 'anita', password: '123' }];

    const user = users.find(
      (u: any) => u.username.toLowerCase() === usernameTrimmed.toLowerCase() && u.password === loginPassword
    );

    if (user) {
      // Set active user
      localStorage.setItem('coffeeshop_active_user', JSON.stringify({ username: user.username }));
      onLoginSuccess(user.username);
      onClose();
    } else {
      setAlert({ type: 'error', message: 'Username atau password salah! Hubungi admin atau buat akun baru.' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    const usernameTrimmed = regUsername.trim();
    if (!usernameTrimmed || !regPassword || !regConfirmPassword) {
      setAlert({ type: 'error', message: 'Harap lengkapi semua kolom.' });
      return;
    }

    if (regPassword.length < 4) {
      setAlert({ type: 'error', message: 'Password minimal terdiri dari 4 karakter.' });
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAlert({ type: 'error', message: 'Konfirmasi password tidak cocok.' });
      return;
    }

    const rawUsers = localStorage.getItem('coffeeshop_users');
    const users = rawUsers ? JSON.parse(rawUsers) : [{ username: 'budi', password: '123' }, { username: 'anita', password: '123' }];

    const isExisting = users.some((u: any) => u.username.toLowerCase() === usernameTrimmed.toLowerCase());
    if (isExisting) {
      setAlert({ type: 'error', message: 'Username sudah digunakan! Harap pilih yang lain.' });
      return;
    }

    // Register user
    users.push({ username: usernameTrimmed, password: regPassword });
    localStorage.setItem('coffeeshop_users', JSON.stringify(users));

    setAlert({ type: 'success', message: 'Registrasi Berhasil! Silakan masuk menggunakan tab di atas.' });
    
    // Auto switch to login tab with prefilled username
    setTimeout(() => {
      setLoginUsername(usernameTrimmed);
      setActiveTab('login');
      setAlert(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 font-display">
            {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
            id="btn-close-auth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => { setActiveTab('login'); setAlert(null); }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-all ${
              activeTab === 'login' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            id="tab-btn-login"
          >
            Masuk
          </button>
          <button 
            onClick={() => { setActiveTab('register'); setAlert(null); }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-all ${
              activeTab === 'register' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            id="tab-btn-register"
          >
            Daftar Baru
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Alerts Area */}
          {alert && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-start space-x-2.5 mb-4 border ${
              alert.type === 'error' 
                ? 'bg-rose-50 text-rose-800 border-rose-200/50' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
            }`}>
              {alert.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              ) : (
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              )}
              <span>{alert.message}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="text" 
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    placeholder="Masukkan username Anda..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/75 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="Masukkan password Anda..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/75 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 py-3 bg-slate-900 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-slate-900/10 hover:shadow-amber-600/15"
                id="btn-submit-login"
              >
                Masuk Sekarang
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Username Baru</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="text" 
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    placeholder="Pilih username yang unik..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/75 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password Baru</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="password" 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="Minimal 4 karakter..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/75 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="password" 
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                    placeholder="Ulangi password di atas..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/75 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-600/10"
                id="btn-submit-register"
              >
                Daftar Akun Baru
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
