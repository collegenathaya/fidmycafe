import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coffee, 
  Search, 
  Sparkles, 
  LogOut, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  XCircle,
  HelpCircle,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { Cafe, Review, CafeCategory } from './types';
import { INITIAL_CAFES, SEED_REVIEWS } from './data';
import StatsBar from './components/StatsBar';
import AuthModal from './components/AuthModal';
import CafeCard from './components/CafeCard';
import DetailModal from './components/DetailModal';
import WriteReviewModal from './components/WriteReviewModal';

export default function App() {
  // Application Data States
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Semua' | CafeCategory>('Semua');

  // Modal Control States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ type: 'success' | 'alert' | 'info'; message: string } | null>(null);

  // Load and seed LocalStorage on component mount
  useEffect(() => {
    // 1. Check/Seed dummy users so the user has immediate accounts to play with
    const storedUsers = localStorage.getItem('coffeeshop_users');
    if (!storedUsers) {
      localStorage.setItem('coffeeshop_users', JSON.stringify([
        { username: 'budi', password: '123' },
        { username: 'anita', password: '123' }
      ]));
    }

    // 1.5. Load or seed Cafes
    const storedCafes = localStorage.getItem('coffeeshop_cafes');
    if (storedCafes) {
      setCafes(JSON.parse(storedCafes));
    } else {
      localStorage.setItem('coffeeshop_cafes', JSON.stringify(INITIAL_CAFES));
      setCafes(INITIAL_CAFES);
    }

    // 2. Load Reviews
    const storedReviews = localStorage.getItem('coffeeshop_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      localStorage.setItem('coffeeshop_reviews', JSON.stringify(SEED_REVIEWS));
      setReviews(SEED_REVIEWS);
    }

    // 3. Load active user
    const storedActiveUser = localStorage.getItem('coffeeshop_active_user');
    if (storedActiveUser) {
      try {
        const parsed = JSON.parse(storedActiveUser);
        setActiveUser(parsed.username);
      } catch (err) {
        console.error('Error parsing active user', err);
      }
    }
  }, []);

  // Show customized action toast
  const showToast = (type: 'success' | 'alert' | 'info', message: string) => {
    setToast({ type, message });
    // Dismiss after 3.5 seconds
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth actions
  const handleLogout = () => {
    localStorage.removeItem('coffeeshop_active_user');
    setActiveUser(null);
    showToast('info', 'Anda telah keluar dari akun tamu.');
  };

  const handleLoginSuccess = (username: string) => {
    setActiveUser(username);
    showToast('success', `Selamat datang kembali, @${username}!`);
  };

  // Review submission action
  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!activeUser) {
      setIsWriteReviewOpen(false);
      setAuthInitialTab('login');
      setIsAuthOpen(true);
      return;
    }

    if (!selectedCafeId) return;

    const newReview: Review = {
      id: `REV-${Date.now()}`,
      cafeId: selectedCafeId,
      username: activeUser,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem('coffeeshop_reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setIsWriteReviewOpen(false);
    showToast('success', 'Ulasan jujur Anda telah sukses terekam!');

    // Reopen detail panel to let user view their freshly minted review
    setTimeout(() => {
      setIsDetailOpen(true);
    }, 300);
  };

  // Triggering Review flow
  const handleWriteReviewRequest = (cafeId: string) => {
    setSelectedCafeId(cafeId);
    if (!activeUser) {
      setAuthInitialTab('login');
      setIsAuthOpen(true);
      showToast('alert', 'Silakan masuk / daftar akun terlebih dahulu untuk menulis ulasan.');
      return;
    }
    setIsWriteReviewOpen(true);
  };

  const handleViewDetailRequest = (cafeId: string) => {
    setSelectedCafeId(cafeId);
    setIsDetailOpen(true);
  };

  // Filtering Logic
  const filteredCafes = useMemo(() => {
    return cafes.filter((c) => {
      const matchesCategory = categoryFilter === 'Semua' || c.category === categoryFilter;
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [cafes, categoryFilter, searchQuery]);

  const selectedCafe = useMemo(() => {
    if (!selectedCafeId) return null;
    return cafes.find(c => c.id === selectedCafeId) || null;
  }, [cafes, selectedCafeId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="app-container">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => { setSearchQuery(''); setCategoryFilter('Semua'); }}
            className="flex items-center space-x-3 cursor-pointer select-none"
            id="nav-logo-group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold font-display tracking-tight text-amber-900">
                ☕ FindMy<span className="text-amber-500">Café</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">Tangerang & Jakarta Hub</p>
            </div>
          </div>

          {/* Download & Auth Section */}
          <div className="flex items-center space-x-3" id="nav-actions-group">
            {/* Dynamic Auth display */}
            {activeUser ? (
              <div className="flex items-center space-x-2.5" id="user-profile-badge">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[10px] text-slate-400">Selamat datang,</span>
                  <span className="text-xs font-bold text-slate-700">@{activeUser}</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 font-bold border border-amber-200/40 flex items-center justify-center text-sm uppercase shadow-inner shrink-0">
                  {activeUser.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Keluar dari Akun"
                  id="btn-logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5" id="guest-auth-buttons">
                <button 
                  onClick={() => { setAuthInitialTab('login'); setIsAuthOpen(true); }}
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-amber-800 transition-all rounded-lg"
                  id="btn-login-trigger"
                >
                  Masuk
                </button>
                <button 
                  onClick={() => { setAuthInitialTab('register'); setIsAuthOpen(true); }}
                  className="px-3.5 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-amber-600 transition-all shadow-md shadow-slate-900/10 hover:shadow-amber-600/15"
                  id="btn-register-trigger"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO HEROICS */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-10 md:py-16" id="hero-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/30">
            <Sparkles className="w-3 h-3 mr-1.5 text-amber-600 animate-pulse" /> 
            Simulasi Database & LocalStorage Aktif
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Temukan Sudut Ngopi Terbaik Untuk <span className="text-amber-600 relative inline-block">Produktif & Estetik<span className="absolute left-0 bottom-1 w-full h-1.5 bg-amber-200 -z-10 rounded-full"></span></span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Daftar 15 coffeeshop legendaris di Tangerang, Bekasi, dan Jakarta. Tulis ulasan, berikan rating bintang, dan baca review fasilitas terlengkap.
          </p>

          {/* Analytics stats row */}
          <div className="max-w-4xl mx-auto pt-6" id="stats-container">
            <StatsBar cafes={cafes} reviews={reviews} />
          </div>
        </div>
      </section>

      {/* QUICK GUIDE ALERT BAR FOR TESTING */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="p-3.5 bg-slate-100 border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600 gap-2">
          <span className="flex items-center font-medium">
            <Info className="w-4 h-4 mr-2 text-slate-500 shrink-0" />
            <span><strong>Tip Pengujian:</strong> Belum punya akun? Masuk dengan akun bawaan <strong>username: budi</strong> dan <strong>password: 123</strong> untuk langsung menulis review.</span>
          </span>
          <span className="text-[10px] bg-white text-slate-500 border border-slate-200 px-2 py-0.5 rounded-lg shrink-0 w-fit">
            Persistensi LocalStorage
          </span>
        </div>
      </div>

      {/* SEARCH AND FILTER SEGMENT */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="main-content">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between" id="filter-bar">
          {/* Text Search Input */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama cafe, alamat, atau fasilitas..." 
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 rounded-xl text-xs transition-all"
              id="search-box-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                id="search-clear-btn"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category tabs filters */}
          <div className="flex flex-wrap gap-1.5 items-center" id="category-filter-group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Filter Kategori:</span>
            {(['Semua', 'Coffee Shop', 'WFC', 'Aestetic'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  categoryFilter === cat 
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                id={`btn-filter-${cat.replace(' ', '-')}`}
              >
                {cat === 'Semua' ? 'Semua' : cat === 'WFC' ? (
                  <>
                    <span className="md:hidden">WFC</span>
                    <span className="hidden md:inline">WFC (Work from Cafe)</span>
                  </>
                ) : cat}
              </button>
            ))}
          </div>
        </div>

        {/* CAFES GRID OR EMPTY STATE */}
        {filteredCafes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto" id="search-empty-state">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-400 shrink-0">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">Tidak Ada Coffeeshop Cocok</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
              Kami tidak dapat menemukan coffeeshop yang cocok dengan pencarian "{searchQuery}" atau filter "{categoryFilter}".
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setCategoryFilter('Semua'); }}
              className="mt-5 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition-all"
              id="btn-reset-filters"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6" id="cafes-grid-layout">
            {filteredCafes.map((cafe) => (
              <CafeCard 
                key={cafe.id}
                cafe={cafe}
                reviews={reviews}
                onViewDetail={handleViewDetailRequest}
                onWriteReview={handleWriteReviewRequest}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800 shrink-0" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3" id="footer-logo-group">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                <Coffee className="w-4.5 h-4.5" />
              </div>
              <span className="text-white font-bold font-display text-sm tracking-tight">☕ FindMyCafé Hub</span>
            </div>
            <div className="text-center md:text-right text-[11px] text-slate-500 space-y-0.5">
              <p className="font-semibold text-slate-400">@made by</p>
              <p>Nathaya Rachma Jilly - 1712425035</p>
              <p>Putri Evilin Simanjuntak - 1712425127</p>
              <p className="text-slate-600 mt-1 text-[10px]">Untuk penugasan mata kuliah aplikom 2 semester 124</p>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS RENDER SECTION */}
      
      {/* 1. Auth Login / Register Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialTab={authInitialTab}
      />

      {/* 2. Detail & Review History modal */}
      <DetailModal 
        cafe={selectedCafe}
        reviews={reviews}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onWriteReviewClick={() => {
          setIsDetailOpen(false);
          if (selectedCafeId) {
            handleWriteReviewRequest(selectedCafeId);
          }
        }}
      />

      {/* 3. Write Star Review Modal */}
      <WriteReviewModal 
        isOpen={isWriteReviewOpen}
        cafe={selectedCafe}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmit={handleReviewSubmit}
      />

      {/* FLOATING ACTION TOAST */}
      {toast && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-xl border border-slate-800 animate-slide-up"
          id="toast-notification"
        >
          {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          <span className="leading-none">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
