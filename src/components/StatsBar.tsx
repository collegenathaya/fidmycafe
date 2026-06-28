import React from 'react';
import { Cafe, Review } from '../types';
import { Coffee, MessageSquare, Star, Library } from 'lucide-react';

interface StatsBarProps {
  cafes: Cafe[];
  reviews: Review[];
}

export default function StatsBar({ cafes, reviews }: StatsBarProps) {
  const totalCafes = cafes.length;
  const totalReviews = reviews.length;
  
  const avgRating = React.useMemo(() => {
    if (reviews.length === 0) return 4.5;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="flex items-center space-x-3.5 p-2">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <Coffee className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-slate-800 font-display tracking-tight">{totalCafes}</div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Total Cafe</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3.5 p-2 border-l border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-slate-800 font-display tracking-tight">{totalReviews}</div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Ulasan</div>
        </div>
      </div>

      <div className="flex items-center space-x-3.5 p-2 border-t md:border-t-0 md:border-l border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-slate-800 font-display tracking-tight">{avgRating}</div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Rata-rata Rating</div>
        </div>
      </div>

      <div className="flex items-center space-x-3.5 p-2 border-t border-l md:border-t-0 border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
          <Library className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-slate-800 font-display tracking-tight">3</div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Kategori Utama</div>
        </div>
      </div>
    </div>
  );
}
