import React, { useState } from 'react';
import { Cafe, Review } from '../types';
import { X, Star } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  cafe: Cafe | null;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const STAR_DESCRIPTIONS: Record<number, string> = {
  0: 'Pilih jumlah bintang',
  1: 'Sangat Kurang (1 Bintang)',
  2: 'Kurang Baik (2 Bintang)',
  3: 'Cukup Baik (3 Bintang)',
  4: 'Sangat Memuaskan (4 Bintang)',
  5: 'Luar Biasa Sempurna! (5 Bintang)'
};

export default function WriteReviewModal({ isOpen, cafe, onClose, onSubmit }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoveredRating(null);
      setComment('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || !cafe) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError('Harap tentukan jumlah rating bintang ulasan Anda.');
      return;
    }

    if (!comment.trim()) {
      setError('Ulasan tertulis tidak boleh kosong.');
      return;
    }

    onSubmit(rating, comment.trim());
  };

  const activeRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-display">Tulis Ulasan Baru</h3>
            <p className="text-xs text-slate-500 font-medium">Ulasan untuk: <span className="font-semibold text-slate-700">{cafe.name}</span></p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
            id="btn-close-review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/50">
              {error}
            </div>
          )}

          {/* Interactive Stars Picker */}
          <div className="text-center py-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Rating Bintang</label>
            
            <div className="flex justify-center items-center space-x-2.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="star-picker-btn text-slate-300 hover:scale-110 active:scale-95 transition-all duration-150 focus:outline-none"
                  id={`star-btn-${star}`}
                >
                  <Star 
                    className={`w-9 h-9 fill-current ${
                      star <= activeRating ? 'text-amber-400' : 'text-slate-200'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <p className="text-xs text-amber-800 font-semibold mt-3 h-4">
              {STAR_DESCRIPTIONS[activeRating]}
            </p>
          </div>

          {/* Review Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Komentar / Ulasan Tertulis</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              placeholder="Ceritakan pengalaman Anda di cafe ini. Apa menu andalan Anda? Bagaimana dengan kestabilan Wi-Fi dan stop kontaknya?"
              className="w-full px-4 py-3 bg-slate-50 focus:bg-white hover:bg-slate-50/75 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 rounded-xl text-sm transition-all resize-none leading-relaxed"
              id="textarea-review-comment"
            />
          </div>

          {/* Action buttons */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-600/10"
            id="btn-submit-review"
          >
            Kirim Ulasan Jujur
          </button>
        </form>
      </div>
    </div>
  );
}
