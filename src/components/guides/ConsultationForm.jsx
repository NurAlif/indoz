import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import { cn } from '../../utils/cn';

const ConsultationForm = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    needs: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.needs) {
      newErrors.needs = 'Pilih kebutuhan konsultasi';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor HP wajib diisi';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Format nomor HP tidak valid';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={cn("text-center py-10 animate-in zoom-in duration-300", className)}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Send className="text-green-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Terima Kasih!
        </h3>
        <p className="text-gray-500 max-w-xs mx-auto mb-8">
          Permintaan konsultasi Anda telah terkirim. Kami akan menghubungi Anda segera melalui WhatsApp atau Email.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full py-3 px-4 bg-indo-red hover:bg-red-700 text-white rounded-lg text-base font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          Kirim Lagi
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Nama lengkap Anda"
          required
          className="text-gray-900 bg-white"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@contoh.com"
          required
          className="text-gray-900 bg-white"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kebutuhan Anda <span className="text-error">*</span>
          </label>
          <select
            name="needs"
            value={formData.needs}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all text-gray-900 bg-white",
              errors.needs ? "border-error" : "border-gray-300"
            )}
            required
          >
            <option value="">Pilih kebutuhan</option>
            <option value="visa-application">Bantuan Aplikasi Visa</option>
            <option value="pr-planning">Perencanaan PR</option>
            <option value="skill-assessment">Skill Assessment</option>
            <option value="job-search">Mencari Kerja</option>
            <option value="other">Lainnya</option>
          </select>
          {errors.needs && (
            <p className="mt-1 text-sm text-error">{errors.needs}</p>
          )}
        </div>

        <Input
          label="Nomor HP"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="0812 3456 7890"
          helperText="Akan dihubungi via WhatsApp"
          required
          className="text-gray-900 bg-white"
        />

        {isSubmitting && (
          <div className="bg-info/10 border-2 border-info/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-info flex-shrink-0 mt-0.5" />
            <p className="text-sm text-info">
              Mengirim permintaan konsultasi...
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
