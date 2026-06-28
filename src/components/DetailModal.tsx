import React from 'react';
import { Cafe, Review } from '../types';
import { X, MapPin, Star, MessageSquare, Plus, Share2, Copy, Check } from 'lucide-react';

interface DetailModalProps {
  cafe: Cafe | null;
  reviews: Review[];
  isOpen: boolean;
  onClose: () => void;
  onWriteReviewClick: () => void;
}

export default function DetailModal({ cafe, reviews, isOpen, onClose, onWriteReviewClick }: DetailModalProps) {
  const [showShareOptions, setShowShareOptions] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setShowShareOptions(false);
    setCopied(false);
  }, [isOpen, cafe?.id]);

  // Filter reviews for this cafe safely
  const cafeReviews = React.useMemo(() => {
    if (!cafe) return [];
    return reviews.filter(r => r.cafeId === cafe.id);
  }, [reviews, cafe?.id]);

  // Calculate stats safely
  const avgRating = React.useMemo(() => {
    if (cafeReviews.length === 0) return 4.5;
    const total = cafeReviews.reduce((sum, r) => sum + r.rating, 0);
    return Number((total / cafeReviews.length).toFixed(1));
  }, [cafeReviews]);

  const badgeClass = React.useMemo(() => {
    if (!cafe) return '';
    switch (cafe.category) {
      case 'WFC':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/40';
      case 'Aestetic':
        return 'bg-rose-50 text-rose-800 border-rose-200/40';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200/40';
    }
  }, [cafe?.category]);

  if (!isOpen || !cafe) return null;

  const roundedRating = Math.round(avgRating);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/?cafe=${cafe.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Gagal menyalin link:', err);
    });
  };

  const getWhatsAppUrl = () => {
    const text = `Halo! Yuk cek tempat ngopi keren ini di *FindMyCafé*:\n\n*${cafe.name}*\n📍 ${cafe.address}\n\nFasilitas: ${cafe.facilities.join(', ')}\n\nBuka di FindMyCafé: ${window.location.origin}/?cafe=${cafe.id}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${badgeClass}`}>
              {cafe.category === 'WFC' ? 'Work From Cafe' : cafe.category}
            </span>
            <h3 className="text-xl font-bold text-slate-800 font-display mt-1">{cafe.name}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
            id="btn-close-detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Cafe Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1 rounded-2xl overflow-hidden bg-slate-100 h-36 md:h-full relative min-h-[140px] shrink-0">
              <img 
                src={cafe.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'} 
                alt={cafe.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col justify-between space-y-3.5">
              <p className="text-xs text-slate-500 flex items-start leading-relaxed">
                <MapPin className="w-4 h-4 mr-2.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{cafe.address}</span>
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fasilitas Unggulan</span>
                <div className="flex flex-wrap gap-1.5">
                  {cafe.facilities.map((f, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs bg-slate-50 text-slate-600 border border-slate-200/40 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 relative">
                <div className="flex items-center space-x-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= roundedRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {avgRating} ({cafeReviews.length} Ulasan)
                  </span>
                </div>

                {/* Dropdown Bagikan */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition-all border border-amber-200/30"
                    id="btn-share-modal"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bagikan</span>
                  </button>

                  {showShareOptions && (
                    <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                      <button
                        onClick={handleCopyLink}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition-all font-medium"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="font-semibold text-emerald-600">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Salin Link</span>
                          </>
                        )}
                      </button>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowShareOptions(false)}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition-all font-medium border-t border-slate-50/80 block"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="text-slate-700">WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Review Timeline Segment */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800 font-display flex items-center text-sm tracking-tight">
                <MessageSquare className="w-4.5 h-4.5 mr-2 text-amber-600 shrink-0" /> 
                Ulasan Pengguna ({cafeReviews.length})
              </h4>
              <button 
                onClick={onWriteReviewClick}
                className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1 border border-amber-200/30"
                id="btn-add-review-modal-detail"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Tulis Review</span>
              </button>
            </div>

            {/* Timelines container */}
            <div className="space-y-3.5 max-h-[32vh] overflow-y-auto pr-1">
              {cafeReviews.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm font-semibold text-slate-500">Belum ada ulasan untuk tempat ini.</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Masuk ke akun Anda dan jadilah orang pertama yang memberikan rating bintang dan ulasan!</p>
                </div>
              ) : (
                cafeReviews.map((r) => {
                  const reviewDate = new Date(r.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <div 
                      key={r.id} 
                      className="p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-100 flex flex-col space-y-1.5 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                            {r.username.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-700">@{r.username}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{reviewDate}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3.5 h-3.5 ${star <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-500">{r.rating}/5</span>
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{r.comment}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
