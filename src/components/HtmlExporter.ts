import { Cafe, Review } from '../types';

export function getSingleFileHtml(cafes: Cafe[], defaultReviews: Review[]): string {
  // We'll stringify the default cafes and reviews to embed them directly into the output script
  const cafesJson = JSON.stringify(cafes, null, 2);
  const reviewsJson = JSON.stringify(defaultReviews, null, 2);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Review Coffeeshop Hub - Temukan & Review Tempat Kopi Terbaik</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts (Inter & Space Grotesk) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons via CDN (UMD Version) -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    /* Premium custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-amber-100 selection:text-amber-950 min-h-screen flex flex-col">

  <!-- NAVBAR -->
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3 cursor-pointer" onclick="resetFilters()">
        <div class="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
          <i data-lucide="coffee" class="w-5 h-5"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold font-display tracking-tight text-slate-800">Review Coffeeshop</h1>
          <p class="text-[10px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">Tangerang & Jakarta Hub</p>
        </div>
      </div>

      <!-- Auth Section inside Navbar -->
      <div id="nav-auth-section" class="flex items-center space-x-3">
        <!-- Will be populated dynamically by JavaScript -->
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-10 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/50 mb-4 animate-pulse">
        <i data-lucide="sparkles" class="w-3 h-3 mr-1"></i> Database Coffeeshop Pilihan Anda
      </span>
      <h2 class="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
        Temukan Sudut Ngopi Terbaik Untuk <span class="text-amber-600 relative inline-block">Produktif & Estetik<span class="absolute left-0 bottom-1 w-full h-1.5 bg-amber-200 -z-10 rounded-full"></span></span>
      </h2>
      <p class="mt-4 text-base md:text-lg text-slate-500 max-w-xl mx-auto">
        Jelajahi, berikan rating bintang, dan baca ulasan jujur tentang fasilitas, suasana, dan kelezatan kopi dari 15 coffeeshop pilihan.
      </p>

      <!-- STATS BAR -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div class="text-center p-2">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-800 font-display" id="stat-total-cafe">15</div>
          <div class="text-xs text-slate-400">Total Coffeeshop</div>
        </div>
        <div class="text-center p-2 border-l border-slate-100">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-800 font-display" id="stat-total-reviews">0</div>
          <div class="text-xs text-slate-400 font-sans">Ulasan Pengguna</div>
        </div>
        <div class="text-center p-2 border-l border-slate-100">
          <div class="text-2xl md:text-3xl font-extrabold text-amber-500 font-display" id="stat-avg-rating">4.5</div>
          <div class="text-xs text-slate-400">Rata-rata Rating</div>
        </div>
        <div class="text-center p-2 border-l border-slate-100">
          <div class="text-2xl md:text-3xl font-extrabold text-slate-800 font-display">3</div>
          <div class="text-xs text-slate-400">Kategori Tempat</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN CONTAINER -->
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
    
    <!-- SEARCH, FILTER, AND VIEW ROW -->
    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <!-- Search Input -->
      <div class="relative flex-grow max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <i data-lucide="search" class="w-5 h-5"></i>
        </div>
        <input 
          type="text" 
          id="search-input" 
          oninput="handleFilterChange()" 
          placeholder="Cari berdasarkan nama atau alamat cafe..." 
          class="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-sm transition-all"
        >
        <button 
          id="search-clear-btn" 
          onclick="clearSearch()" 
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 hidden"
        >
          <i data-lucide="x-circle" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Category Badges -->
      <div class="flex flex-wrap gap-1.5 items-center">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Filter:</span>
        <button 
          onclick="setCategoryFilter('Semua')" 
          id="btn-filter-Semua" 
          class="filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-amber-600 text-white shadow-sm"
        >
          Semua
        </button>
        <button 
          onclick="setCategoryFilter('Coffee Shop')" 
          id="btn-filter-Coffee-Shop" 
          class="filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          Coffee Shop
        </button>
        <button 
          onclick="setCategoryFilter('WFC')" 
          id="btn-filter-WFC" 
          class="filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          Work From Cafe (WFC)
        </button>
        <button 
          onclick="setCategoryFilter('Aestetic')" 
          id="btn-filter-Aestetic" 
          class="filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          Aesthetic
        </button>
      </div>
    </div>

    <!-- MAIN GRID LAYOUT -->
    <div id="empty-state" class="hidden text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">
      <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-400">
        <i data-lucide="search-code" class="w-8 h-8"></i>
      </div>
      <h3 class="text-lg font-bold text-slate-800 font-display">Tidak Ada Hasil</h3>
      <p class="text-sm text-slate-400 mt-1 max-w-xs mx-auto">Kami tidak dapat menemukan coffeeshop dengan pencarian atau filter aktif saat ini.</p>
      <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-xl transition-all">
        Reset Pencarian
      </button>
    </div>

    <div id="cafes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Will be populated dynamically by JavaScript -->
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
            <i data-lucide="coffee" class="w-4 h-4"></i>
          </div>
          <span class="text-white font-bold font-display">Review Coffeeshop Hub</span>
        </div>
        <p class="text-xs text-slate-500">
          &copy; 2026 Review Coffeeshop Hub. Simulasi LocalStorage & Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>

  <!-- AUTH MODAL (LOGIN / REGISTER TABBED) -->
  <div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden">
    <div class="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 id="auth-modal-title" class="text-lg font-bold text-slate-800 font-display">Masuk Akun</h3>
        <button onclick="closeAuthModal()" class="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Auth Tab Headers -->
      <div class="flex border-b border-slate-100">
        <button id="tab-login" onclick="switchAuthTab('login')" class="flex-1 py-3 text-sm font-semibold text-center border-b-2 border-amber-600 text-amber-600">
          Masuk
        </button>
        <button id="tab-register" onclick="switchAuthTab('register')" class="flex-1 py-3 text-sm font-semibold text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800">
          Daftar Baru
        </button>
      </div>

      <div class="p-6 overflow-y-auto">
        <!-- Error & Success Alert Area -->
        <div id="auth-alert" class="hidden mb-4 p-3 rounded-xl text-xs font-medium"></div>

        <!-- LOGIN FORM -->
        <form id="login-form" onsubmit="handleLoginSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Username</label>
            <input 
              type="text" 
              id="login-username" 
              required
              placeholder="Masukkan username Anda..." 
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Password</label>
            <input 
              type="password" 
              id="login-password" 
              required
              placeholder="Masukkan password Anda..." 
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
          </div>
          <button type="submit" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-600/10">
            Masuk Sekarang
          </button>
        </form>

        <!-- REGISTER FORM -->
        <form id="register-form" onsubmit="handleRegisterSubmit(event)" class="space-y-4 hidden">
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Username Baru</label>
            <input 
              type="text" 
              id="register-username" 
              required
              placeholder="Pilih username unik..." 
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Password Baru</label>
            <input 
              type="password" 
              id="register-password" 
              required
              placeholder="Minimal 4 karakter..." 
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Konfirmasi Password</label>
            <input 
              type="password" 
              id="register-confirm-password" 
              required
              placeholder="Ulangi password di atas..." 
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
          </div>
          <button type="submit" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-600/10">
            Daftar Akun Baru
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- DETAIL & REVIEWS MODAL -->
  <div id="detail-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden">
    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
      
      <!-- Detail Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <span id="detail-category" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200/40">Kategori</span>
          <h3 id="detail-title" class="text-xl font-bold text-slate-800 font-display mt-1">Nama Cafe</h3>
        </div>
        <button onclick="closeDetailModal()" class="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Detail Body (Scrollable) -->
      <div class="p-6 overflow-y-auto space-y-6 flex-grow">
        <!-- Cafe Info Card -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-1 rounded-xl overflow-hidden bg-slate-100 h-32 md:h-full relative">
            <img id="detail-image" src="" alt="Cafe Picture" class="w-full h-full object-cover">
          </div>
          <div class="md:col-span-2 space-y-3">
            <p class="text-xs text-slate-500 flex items-start">
              <i data-lucide="map-pin" class="w-4 h-4 mr-2 text-rose-500 shrink-0 mt-0.5"></i>
              <span id="detail-address">Alamat lengkap cafe...</span>
            </p>
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fasilitas Unggulan</span>
              <div id="detail-facilities" class="flex flex-wrap gap-1.5">
                <!-- Dynamic facility tags -->
              </div>
            </div>
            <div class="flex items-center space-x-2 pt-1 border-t border-slate-100">
              <div id="detail-rating-stars" class="flex text-amber-400"></div>
              <span id="detail-rating-text" class="text-sm font-bold text-slate-700">4.5</span>
            </div>
          </div>
        </div>

        <!-- Review Section Header -->
        <div class="border-t border-slate-100 pt-5">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-bold text-slate-800 font-display flex items-center">
              <i data-lucide="message-square" class="w-4.5 h-4.5 mr-2 text-amber-600"></i> Ulasan Pengguna (<span id="detail-reviews-count">0</span>)
            </h4>
            <button id="detail-write-review-btn" onclick="openReviewModalFromDetail()" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl transition-all flex items-center space-x-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> <span>Tulis Review</span>
            </button>
          </div>

          <!-- Reviews Timeline -->
          <div id="detail-reviews-list" class="space-y-4 max-h-[30vh] overflow-y-auto pr-1">
            <!-- Review cards will be loaded here -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- WRITE REVIEW MODAL -->
  <div id="review-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden">
    <div class="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 class="text-lg font-bold text-slate-800 font-display">Tulis Ulasan</h3>
          <p id="review-cafe-name" class="text-xs text-slate-500">Nama Cafe</p>
        </div>
        <button onclick="closeReviewModal()" class="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <form onsubmit="handleReviewSubmit(event)" class="p-6 space-y-4">
        <!-- Star Selection Area -->
        <div class="text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Berikan Rating Anda</label>
          <div class="flex justify-center items-center space-x-2">
            <button type="button" onclick="setRatingValue(1)" onmouseover="hoverStars(1)" onmouseout="resetStarsHover()" class="star-btn text-slate-300 hover:scale-110 transition-transform">
              <i data-lucide="star" class="w-8 h-8 fill-current"></i>
            </button>
            <button type="button" onclick="setRatingValue(2)" onmouseover="hoverStars(2)" onmouseout="resetStarsHover()" class="star-btn text-slate-300 hover:scale-110 transition-transform">
              <i data-lucide="star" class="w-8 h-8 fill-current"></i>
            </button>
            <button type="button" onclick="setRatingValue(3)" onmouseover="hoverStars(3)" onmouseout="resetStarsHover()" class="star-btn text-slate-300 hover:scale-110 transition-transform">
              <i data-lucide="star" class="w-8 h-8 fill-current"></i>
            </button>
            <button type="button" onclick="setRatingValue(4)" onmouseover="hoverStars(4)" onmouseout="resetStarsHover()" class="star-btn text-slate-300 hover:scale-110 transition-transform">
              <i data-lucide="star" class="w-8 h-8 fill-current"></i>
            </button>
            <button type="button" onclick="setRatingValue(5)" onmouseover="hoverStars(5)" onmouseout="resetStarsHover()" class="star-btn text-slate-300 hover:scale-110 transition-transform">
              <i data-lucide="star" class="w-8 h-8 fill-current"></i>
            </button>
          </div>
          <input type="hidden" id="review-rating-value" value="0" required>
          <p id="star-description" class="text-xs text-amber-700 font-medium mt-2 h-4">Pilih jumlah bintang</p>
        </div>

        <!-- Written Comment -->
        <div>
          <label class="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Komentar / Ulasan Tertulis</label>
          <textarea 
            id="review-comment" 
            required
            rows="4" 
            placeholder="Bagikan pengalaman Anda tentang tempat ini, pelayanan, kopi, maupun fasilitas..." 
            class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          ></textarea>
        </div>

        <button type="submit" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-600/10">
          Kirim Ulasan Jujur
        </button>
      </form>
    </div>
  </div>

  <!-- FLOATING ACTION TOAST -->
  <div id="toast" class="fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl transition-all transform translate-y-20 opacity-0 pointer-events-none">
    <i id="toast-icon" data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
    <span id="toast-message">Pesan sukses disini</span>
  </div>

  <!-- JAVASCRIPT LOGIC -->
  <script>
    // Embedded Data Arrays from Server
    const cafes = ${cafesJson};
    const defaultReviews = ${reviewsJson};

    // State Variables
    let currentAuthTab = 'login';
    let categoryFilter = 'Semua';
    let searchQuery = '';
    let selectedRating = 0;
    let activeReviewCafeId = null;

    // Load LocalStorage Data
    function getStoredReviews() {
      const stored = localStorage.getItem('coffeeshop_reviews');
      if (!stored) {
        localStorage.setItem('coffeeshop_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
      }
      return JSON.parse(stored);
    }

    function saveReview(review) {
      const reviews = getStoredReviews();
      reviews.unshift(review); // Prepend new review
      localStorage.setItem('coffeeshop_reviews', JSON.stringify(reviews));
      return reviews;
    }

    function getStoredUsers() {
      const stored = localStorage.getItem('coffeeshop_users');
      return stored ? JSON.parse(stored) : [];
    }

    function registerUser(username, password) {
      const users = getStoredUsers();
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: 'Username sudah digunakan!' };
      }
      users.push({ username, password });
      localStorage.setItem('coffeeshop_users', JSON.stringify(users));
      return { success: true };
    }

    function loginUser(username, password) {
      const users = getStoredUsers();
      const found = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      if (!found) {
        return { success: false, message: 'Username atau password salah!' };
      }
      localStorage.setItem('coffeeshop_active_user', JSON.stringify({ username }));
      return { success: true, user: { username } };
    }

    function getActiveUser() {
      const active = localStorage.getItem('coffeeshop_active_user');
      return active ? JSON.parse(active) : null;
    }

    function logoutUser() {
      localStorage.removeItem('coffeeshop_active_user');
      showToast('logout', 'Anda berhasil keluar dari akun.');
      renderNavbar();
    }

    // Modal Handlers
    function openAuthModal(tab = 'login') {
      currentAuthTab = tab;
      switchAuthTab(tab);
      document.getElementById('auth-modal').classList.remove('hidden');
      document.getElementById('auth-alert').classList.add('hidden');
    }

    function closeAuthModal() {
      document.getElementById('auth-modal').classList.add('hidden');
    }

    function switchAuthTab(tab) {
      currentAuthTab = tab;
      const tabLogin = document.getElementById('tab-login');
      const tabRegister = document.getElementById('tab-register');
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');
      const title = document.getElementById('auth-modal-title');

      if (tab === 'login') {
        tabLogin.className = "flex-1 py-3 text-sm font-semibold text-center border-b-2 border-amber-600 text-amber-600";
        tabRegister.className = "flex-1 py-3 text-sm font-semibold text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800";
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        title.innerText = "Masuk Akun";
      } else {
        tabRegister.className = "flex-1 py-3 text-sm font-semibold text-center border-b-2 border-amber-600 text-amber-600";
        tabLogin.className = "flex-1 py-3 text-sm font-semibold text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800";
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        title.innerText = "Pendaftaran Akun Baru";
      }
    }

    // Detail & review modal
    function openDetailModal(cafeId) {
      const cafe = cafes.find(c => c.id === cafeId);
      if (!cafe) return;

      document.getElementById('detail-category').innerText = cafe.category;
      document.getElementById('detail-title').innerText = cafe.name;
      document.getElementById('detail-image').src = cafe.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80';
      document.getElementById('detail-address').innerText = cafe.address;

      // Category styling matching card
      const catBadge = document.getElementById('detail-category');
      if (cafe.category === 'WFC') {
        catBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-800 border border-blue-200/40";
      } else if (cafe.category === 'Aestetic') {
        catBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-50 text-rose-800 border border-rose-200/40";
      } else {
        catBadge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200/40";
      }

      // Facilities tags
      const facilitiesContainer = document.getElementById('detail-facilities');
      facilitiesContainer.innerHTML = cafe.facilities.map(f => 
        \`<span class="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-slate-50 text-slate-600 border border-slate-200/40 font-medium">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>\${f}
         </span>\`
      ).join('');

      // Reviews dynamic calculations
      const allReviews = getStoredReviews();
      const cafeReviews = allReviews.filter(r => r.cafeId === cafeId);
      document.getElementById('detail-reviews-count').innerText = cafeReviews.length;

      const avgRating = cafeReviews.length > 0 
        ? (cafeReviews.reduce((sum, r) => sum + r.rating, 0) / cafeReviews.length).toFixed(1)
        : '0.0';

      document.getElementById('detail-rating-text').innerText = \`\${avgRating} (\${cafeReviews.length} Ulasan)\`;

      // Rating stars display
      const detailStars = document.getElementById('detail-rating-stars');
      let starsHtml = '';
      const roundedAvg = Math.round(Number(avgRating));
      for (let i = 1; i <= 5; i++) {
        if (i <= roundedAvg) {
          starsHtml += '<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>';
        } else {
          starsHtml += '<i data-lucide="star" class="w-4 h-4 text-slate-300"></i>';
        }
      }
      detailStars.innerHTML = starsHtml;

      // Save global target cafe for write review from here
      activeReviewCafeId = cafeId;

      // Populate review timeline list
      const reviewsList = document.getElementById('detail-reviews-list');
      if (cafeReviews.length === 0) {
        reviewsList.innerHTML = \`<div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p class="text-sm text-slate-400">Belum ada ulasan untuk cafe ini.</p>
          <p class="text-xs text-slate-400 mt-1">Jadilah yang pertama untuk menulis review!</p>
        </div>\`;
      } else {
        reviewsList.innerHTML = cafeReviews.map(r => {
          const date = new Date(r.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
          let reviewStars = '';
          for (let i = 1; i <= 5; i++) {
            if (i <= r.rating) {
              reviewStars += '<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>';
            } else {
              reviewStars += '<i data-lucide="star" class="w-3.5 h-3.5 text-slate-200"></i>';
            }
          }

          return \`<div class="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex flex-col space-y-1.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  \${r.username.charAt(0).toUpperCase()}
                </div>
                <span class="text-xs font-semibold text-slate-700">\${r.username}</span>
              </div>
              <span class="text-[10px] text-slate-400 font-mono">\${date}</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <div class="flex text-amber-400">\${reviewStars}</div>
              <span class="text-xs font-bold text-slate-600">\${r.rating}/5</span>
            </div>
            <p class="text-xs text-slate-600 italic">"\${r.comment}"</p>
          </div>\`;
        }).join('');
      }

      document.getElementById('detail-modal').classList.remove('hidden');
      lucide.createIcons(); // Reactivate Lucide icons
    }

    function closeDetailModal() {
      document.getElementById('detail-modal').classList.add('hidden');
    }

    // Review Write Modal Handlers
    function openReviewModal(cafeId) {
      const activeUser = getActiveUser();
      if (!activeUser) {
        openAuthModal('login');
        showToast('alert', 'Harap login terlebih dahulu untuk memberikan ulasan.');
        return;
      }

      activeReviewCafeId = cafeId;
      const cafe = cafes.find(c => c.id === cafeId);
      if (!cafe) return;

      document.getElementById('review-cafe-name').innerText = cafe.name;
      document.getElementById('review-comment').value = '';
      setRatingValue(0);

      document.getElementById('review-modal').classList.remove('hidden');
    }

    function openReviewModalFromDetail() {
      closeDetailModal();
      if (activeReviewCafeId) {
        openReviewModal(activeReviewCafeId);
      }
    }

    function closeReviewModal() {
      document.getElementById('review-modal').classList.add('hidden');
    }

    // Interactive Star Rating system
    const starDescriptions = {
      0: 'Pilih jumlah bintang',
      1: 'Sangat Kurang (1 Bintang)',
      2: 'Kurang Baik (2 Bintang)',
      3: 'Cukup Baik (3 Bintang)',
      4: 'Sangat Memuaskan (4 Bintang)',
      5: 'Luar Biasa Sempurna! (5 Bintang)'
    };

    function setRatingValue(val) {
      selectedRating = val;
      document.getElementById('review-rating-value').value = val;
      updateStarsUI(val);
      document.getElementById('star-description').innerText = starDescriptions[val];
    }

    function hoverStars(val) {
      updateStarsUI(val);
      document.getElementById('star-description').innerText = starDescriptions[val];
    }

    function resetStarsHover() {
      updateStarsUI(selectedRating);
      document.getElementById('star-description').innerText = starDescriptions[selectedRating];
    }

    function updateStarsUI(val) {
      const starButtons = document.querySelectorAll('.star-btn');
      starButtons.forEach((btn, index) => {
        if (index < val) {
          btn.className = "star-btn text-amber-400 hover:scale-110 transition-transform";
        } else {
          btn.className = "star-btn text-slate-300 hover:scale-110 transition-transform";
        }
      });
    }

    // Submit Actions
    function handleLoginSubmit(event) {
      event.preventDefault();
      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value;
      const alertArea = document.getElementById('auth-alert');

      if (!user || !pass) return;

      const result = loginUser(user, pass);
      if (result.success) {
        closeAuthModal();
        renderNavbar();
        renderCafes();
        showToast('success', \`Selamat datang kembali, \${user}!\`);
      } else {
        alertArea.className = "mb-4 p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/50";
        alertArea.innerText = result.message;
        alertArea.classList.remove('hidden');
      }
    }

    function handleRegisterSubmit(event) {
      event.preventDefault();
      const user = document.getElementById('register-username').value.trim();
      const pass = document.getElementById('register-password').value;
      const confirmPass = document.getElementById('register-confirm-password').value;
      const alertArea = document.getElementById('auth-alert');

      if (!user || !pass) return;

      if (pass.length < 4) {
        alertArea.className = "mb-4 p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/50";
        alertArea.innerText = "Password minimal terdiri dari 4 karakter.";
        alertArea.classList.remove('hidden');
        return;
      }

      if (pass !== confirmPass) {
        alertArea.className = "mb-4 p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/50";
        alertArea.innerText = "Konfirmasi password tidak cocok.";
        alertArea.classList.remove('hidden');
        return;
      }

      const result = registerUser(user, pass);
      if (result.success) {
        alertArea.className = "mb-4 p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/50";
        alertArea.innerText = "Akun berhasil didaftarkan! Sila masuk menggunakan tab Masuk.";
        alertArea.classList.remove('hidden');
        switchAuthTab('login');
        // Pre-fill login username
        document.getElementById('login-username').value = user;
      } else {
        alertArea.className = "mb-4 p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/50";
        alertArea.innerText = result.message;
        alertArea.classList.remove('hidden');
      }
    }

    function handleReviewSubmit(event) {
      event.preventDefault();
      const rating = selectedRating;
      const comment = document.getElementById('review-comment').value.trim();
      const activeUser = getActiveUser();

      if (!activeUser) {
        closeReviewModal();
        openAuthModal('login');
        return;
      }

      if (rating < 1) {
        showToast('alert', 'Harap berikan bintang ulasan terlebih dahulu.');
        return;
      }

      if (!comment) {
        showToast('alert', 'Harap isi ulasan tertulis.');
        return;
      }

      const newReview = {
        id: 'REV-' + Date.now(),
        cafeId: activeReviewCafeId,
        username: activeUser.username,
        rating: rating,
        comment: comment,
        createdAt: new Date().toISOString()
      };

      saveReview(newReview);
      closeReviewModal();
      renderCafes();
      updateStats();
      showToast('success', 'Ulasan Anda berhasil dikirim!');

      // Re-open detail to show the review
      setTimeout(() => {
        openDetailModal(activeReviewCafeId);
      }, 300);
    }

    // Filter Logic
    function setCategoryFilter(cat) {
      categoryFilter = cat;
      // Style buttons
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        if (btn.id === \`btn-filter-\${cat.replace(' ', '-')}\`) {
          btn.className = "filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-amber-600 text-white shadow-sm";
        } else {
          btn.className = "filter-btn px-4 py-2 rounded-xl text-xs font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200";
        }
      });

      renderCafes();
    }

    function handleFilterChange() {
      searchQuery = document.getElementById('search-input').value.toLowerCase();
      const clearBtn = document.getElementById('search-clear-btn');
      if (searchQuery.length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      renderCafes();
    }

    function clearSearch() {
      document.getElementById('search-input').value = '';
      searchQuery = '';
      document.getElementById('search-clear-btn').classList.add('hidden');
      renderCafes();
    }

    function resetFilters() {
      clearSearch();
      setCategoryFilter('Semua');
    }

    // Navbar Rendering
    function renderNavbar() {
      const activeUser = getActiveUser();
      const authContainer = document.getElementById('nav-auth-section');

      if (activeUser) {
        authContainer.innerHTML = \`<div class="flex items-center space-x-3">
          <div class="hidden sm:flex flex-col text-right">
            <span class="text-xs text-slate-400">Selamat datang,</span>
            <span class="text-sm font-bold text-slate-800">@\${activeUser.username}</span>
          </div>
          <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 font-bold border border-amber-200/50 flex items-center justify-center">
            \${activeUser.username.charAt(0).toUpperCase()}
          </div>
          <button onclick="logoutUser()" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all" title="Keluar">
            <i data-lucide="log-out" class="w-5 h-5"></i>
          </button>
        </div>\`;
      } else {
        authContainer.innerHTML = \`<div class="flex items-center space-x-2">
          <button onclick="openAuthModal('login')" class="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-amber-700 transition-all">
            Masuk
          </button>
          <button onclick="openAuthModal('register')" class="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition-all shadow-md shadow-slate-900/10 hover:shadow-amber-600/15">
            Daftar
          </button>
        </div>\`;
      }
      lucide.createIcons();
    }

    // Cafes Listing Grid Rendering
    function renderCafes() {
      const listContainer = document.getElementById('cafes-grid');
      const emptyState = document.getElementById('empty-state');
      const reviews = getStoredReviews();

      const filtered = cafes.filter(c => {
        const matchesCategory = categoryFilter === 'Semua' || c.category === categoryFilter;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery) || c.address.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      emptyState.classList.add('hidden');

      listContainer.innerHTML = filtered.map(c => {
        const cafeReviews = reviews.filter(r => r.cafeId === c.id);
        const avgRating = cafeReviews.length > 0 
          ? (cafeReviews.reduce((sum, r) => sum + r.rating, 0) / cafeReviews.length).toFixed(1)
          : '0.0';

        // Choose category colors
        let catColorClass = "bg-amber-50 text-amber-800 border-amber-200/50";
        if (c.category === 'WFC') catColorClass = "bg-blue-50 text-blue-800 border-blue-200/50";
        if (c.category === 'Aestetic') catColorClass = "bg-rose-50 text-rose-800 border-rose-200/50";

        // Build stars rating component
        let starRatingHtml = '';
        const roundedAvg = Math.round(Number(avgRating));
        for (let i = 1; i <= 5; i++) {
          if (i <= roundedAvg) {
            starRatingHtml += '<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>';
          } else {
            starRatingHtml += '<i data-lucide="star" class="w-3.5 h-3.5 text-slate-200"></i>';
          }
        }

        // Build facilities badges
        const facilitiesHtml = c.facilities.slice(0, 3).map(f => 
          \`<span class="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 text-[10px] text-slate-500 border border-slate-100 font-medium">
            \${f}
           </span>\`
        ).join('');

        return \`
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
            <!-- Card Cover Image -->
            <div class="h-44 bg-slate-100 relative overflow-hidden">
              <img src="\${c.imageUrl}" alt="\${c.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border \${catColorClass}">
                  \${c.category}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <!-- Title & Rating Row -->
                <div class="flex items-start justify-between">
                  <h4 class="font-bold text-slate-800 font-display group-hover:text-amber-700 transition-colors line-clamp-1">\${c.name}</h4>
                  <div class="flex items-center space-x-1 shrink-0 bg-amber-50/50 border border-amber-200/30 px-1.5 py-0.5 rounded-lg">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>
                    <span class="text-[10px] font-extrabold text-slate-700">\${avgRating}</span>
                  </div>
                </div>

                <!-- Facilities row -->
                <div class="flex flex-wrap gap-1">
                  \${facilitiesHtml}
                </div>

                <!-- Address row -->
                <p class="text-xs text-slate-400 flex items-start line-clamp-2">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0 mt-0.5"></i>
                  \${c.address}
                </p>
              </div>

              <!-- Button Actions -->
              <div class="flex items-center space-x-2 pt-3 border-t border-slate-100">
                <button onclick="openDetailModal('\${c.id}')" class="flex-1 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all">
                  Detail & Ulasan
                </button>
                <button onclick="openReviewModal('\${c.id}')" class="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all" title="Beri Review">
                  <i data-lucide="edit-3" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        \`;
      }).join('');

      lucide.createIcons();
    }

    // Stats calculations
    function updateStats() {
      const reviews = getStoredReviews();
      document.getElementById('stat-total-reviews').innerText = reviews.length;

      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '4.5';
      document.getElementById('stat-avg-rating').innerText = avgRating;
    }

    // Action Toast Notifications
    function showToast(type, msg) {
      const toast = document.getElementById('toast');
      const toastIcon = document.getElementById('toast-icon');
      const toastMsg = document.getElementById('toast-message');

      toastMsg.innerText = msg;

      if (type === 'success') {
        toast.className = "fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl transition-all transform translate-y-0 opacity-100";
        toastIcon.className = "w-4 h-4 text-emerald-400";
        toastIcon.setAttribute('data-lucide', 'check-circle');
      } else if (type === 'alert') {
        toast.className = "fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl transition-all transform translate-y-0 opacity-100";
        toastIcon.className = "w-4 h-4 text-amber-400";
        toastIcon.setAttribute('data-lucide', 'alert-triangle');
      } else {
        toast.className = "fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl transition-all transform translate-y-0 opacity-100";
        toastIcon.className = "w-4 h-4 text-blue-400";
        toastIcon.setAttribute('data-lucide', 'info');
      }

      lucide.createIcons();

      // Dismiss after 3 seconds
      setTimeout(() => {
        toast.className = "fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl transition-all transform translate-y-20 opacity-0 pointer-events-none";
      }, 3000);
    }

    // Initial setup
    window.addEventListener('DOMContentLoaded', () => {
      // Seed dummy users if not present so they have account simulations available
      const users = getStoredUsers();
      if (users.length === 0) {
        localStorage.setItem('coffeeshop_users', JSON.stringify([
          { username: 'budi', password: '123' },
          { username: 'anita', password: '123' }
        ]));
      }

      renderNavbar();
      renderCafes();
      updateStats();
    });
  </script>
</body>
</html>`;
}
