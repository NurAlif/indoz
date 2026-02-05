/**
 * Validate email format
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (Indonesian format)
 */
export function isValidPhone(phone) {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Indonesian phone numbers: 8-13 digits
  return /^\d{8,13}$/.test(digits);
}

/**
 * Validate file size (max 4MB)
 */
export function isValidFileSize(file, maxSizeMB = 4) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validate PDF file
 */
export function isPDFFile(file) {
  return file.type === 'application/pdf';
}
