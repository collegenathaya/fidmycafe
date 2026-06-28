import React from 'react';
import { Cafe, Review } from '../types';
import { Star, MapPin, Edit3, MessageSquare } from 'lucide-react';

interface CafeCardProps {
  cafe: Cafe;
  reviews: Review[];
  onViewDetail: (id: string) => void;
  onWriteReview: (id: string) => void;
}

export default function CafeCard({ cafe, reviews, onViewDetail, onWriteReview }: CafeCardProps) {
  // Filter reviews matching this specific cafe
  const cafeReviews = React.useMemo(() => {
    return reviews.filter(r => r.cafeId === cafe.id);
  }, [reviews, cafe.id]);

  // Calculate average rating
  const avgRating = React.useMemo(() => {
    if (cafeReviews.length === 0) return 4.5; // Default starter or seed-level high rating
    const total = cafeReviews.reduce((sum, r) => sum + r.rating, 0);
    return Number((total / cafeReviews.length).toFixed(1));
  }, [cafeReviews]);

  // Choose badge colors based on category
  const badgeClasses = React.useMemo(() => {
    switch (cafe.category) {
      case 'WFC':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
      case 'Aestetic':
        return 'bg-rose-50 text-rose-700 border-rose-200/50';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200/50';
    }
  }, [cafe.category]);

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:scale-[1.02] hover:border-slate-200/80 transition-all duration-300 ease-out"
      id={`cafe-card-${cafe.id}`}
    >
      {/* Cover Image & Category */}
      <div className="w-full h-28 sm:h-40 md:h-48 bg-slate-100 relative overflow-hidden shrink-0">
        <img 
          src={cafe.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'} 
          alt={cafe.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3">
          <span className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider border ${badgeClasses} backdrop-blur-sm`}>
            {cafe.category === 'WFC' ? 'WFC' : cafe.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-5 flex-grow flex flex-col justify-between min-w-0 space-y-2.5 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2.5">
          {/* Header row with Name and Rating */}
          <div className="flex items-start justify-between gap-1">
            <h4 className="font-bold text-slate-800 font-display group-hover:text-amber-700 transition-colors line-clamp-1 text-xs sm:text-base md:text-lg">
              {cafe.name}
            </h4>
            <div className="flex items-center space-x-0.5 sm:space-x-1 shrink-0 bg-amber-50/70 border border-amber-200/30 px-1.5 py-0.5 rounded-md sm:rounded-lg">
              <Star className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span className="text-[9px] sm:text-[11px] font-black text-slate-700 leading-none">{avgRating}</span>
            </div>
          </div>

          {/* Facilities Row */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {cafe.facilities.map((facility, idx) => (
              <span 
                key={idx} 
                className={`inline-flex items-center px-1 py-0.5 rounded bg-slate-50 text-[8px] sm:text-[10px] text-slate-500 border border-slate-200/40 font-medium ${
                  idx >= 1 ? 'hidden sm:inline-flex' : 'inline-flex'
                }`}
              >
                {facility}
              </span>
            ))}
          </div>

          {/* Address Row */}
          <p className="text-[9px] sm:text-xs text-slate-400 flex items-start line-clamp-1 md:line-clamp-2">
            <MapPin className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 mr-0.5 sm:mr-1.5 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{cafe.address}</span>
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 pt-2 sm:pt-3.5 border-t border-slate-100 shrink-0">
          <button 
            onClick={() => onViewDetail(cafe.id)}
            className="flex-grow py-1 sm:py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 hover:border-slate-300/80 text-slate-700 text-[9px] sm:text-xs font-bold rounded-md sm:rounded-xl transition-all whitespace-nowrap px-1.5 sm:px-2"
            id={`btn-detail-${cafe.id}`}
          >
            Detail
          </button>
          
          <button 
            onClick={() => onWriteReview(cafe.id)}
            className="p-1 sm:p-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md sm:rounded-xl transition-all shadow-sm shadow-amber-600/10 shrink-0"
            title="Beri Review"
            id={`btn-write-${cafe.id}`}
          >
            <Edit3 className="w-3 sm:w-4 h-3 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
