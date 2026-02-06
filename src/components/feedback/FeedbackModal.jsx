import React, { useState } from 'react';
import { Star, X, Pencil } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Umum');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Feedback submitted:', { rating, category, comment });

    setIsSubmitting(false);
    onClose();
    // Reset form
    setRating(0);
    setCategory('Umum');
    setComment('');
  };

  const categories = ['Umum', 'Laporan Bug', 'Saran Fitur', 'Lainnya'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      size="md"
    >
      <div className="space-y-6">
        {/* Custom Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Berikan Masukan</h2>
            <p className="text-sm text-gray-500 mt-1">Bantu kami meningkatkan IndOz Work.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110 p-1"
            >
              <Star
                size={32}
                className={cn(
                  "transition-colors duration-200",
                  (hoverRating || rating) >= star
                    ? "text-oz-gold fill-oz-gold"
                    : "text-gray-300 fill-transparent"
                )}
              />
            </button>
          ))}
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            KATEGORI
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Pencil
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Comment Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            KOMENTAR (OPSIONAL)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalamanmu..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          className={cn(
            "w-full py-3 font-bold transition-all",
            rating === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
              : "bg-indo-red text-white hover:bg-red-700 shadow-md hover:shadow-lg"
          )}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Feedback'}
        </Button>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
