import React, { useState } from 'react';
import { Star, Pencil, X } from 'lucide-react';
import Modal from './Modal';
import { cn } from '../../utils/cn';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Umum');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log({ rating, category, comment });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setCategory('Umum');
    setComment('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} showCloseButton={false} size="md">
      {isSubmitted ? (
        <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Star size={40} className="text-green-600 fill-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h2>
          <p className="text-gray-500 max-w-xs mx-auto mb-8">
            Masukan Anda sangat berharga bagi kami untuk terus mengembangkan IndOz Work.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 px-4 bg-indo-red hover:bg-red-700 text-white rounded-lg text-base font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Tutup
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Berikan Masukan</h2>
              <p className="text-sm text-gray-500 mt-1">Bantu kami meningkatkan IndOz Work.</p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-4 my-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-colors",
                    (hoverRating || rating) >= star
                      ? "text-yellow-500"
                      : "text-gray-200 fill-gray-50"
                  )}
                  fill={(hoverRating || rating) >= star ? "#D4AF37" : "transparent"}
                  color={(hoverRating || rating) >= star ? "#D4AF37" : "#D1D5DB"}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-wide">
              KATEGORI
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-400 text-gray-900 text-base rounded-lg focus:ring-2 focus:ring-indo-red focus:border-transparent block p-3 pr-10 outline-none transition-shadow"
              >
                <option value="Umum">Umum</option>
                <option value="Pertanyaan">Pertanyaan / Butuh Bantuan</option>
                <option value="Bug">Bug</option>
                <option value="Fitur">Saran Fitur</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Pencil size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-wide">
              KOMENTAR <span className="text-indo-red">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="block w-full p-3 text-base text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-2 focus:ring-indo-red focus:border-transparent outline-none resize-none transition-shadow"
              placeholder="Tuliskan masukan atau pengalamanmu di sini..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || !comment.trim() || isSubmitting}
            className={cn(
              "w-full py-3 px-4 rounded-lg text-base font-bold text-white transition-colors shadow-sm",
              rating > 0 && comment.trim() && !isSubmitting
                ? "bg-indo-red hover:bg-red-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Feedback'}
          </button>
        </>
      )}
    </Modal>
  );
};

export default FeedbackModal;
