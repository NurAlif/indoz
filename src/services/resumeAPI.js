/**
 * Mock resume analysis service
 * In production, this would use AI to analyze actual resume content
 */

export async function analyzeResume(resumeText) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simple keyword-based analysis (in production, use AI)
  const analysis = {
    atsScore: calculateATSScore(resumeText),
    strengths: identifyStrengths(resumeText),
    improvements: identifyImprovements(resumeText),
    australiaSpecific: getAustraliaSpecificAdvice(resumeText),
  };

  return analysis;
}

function calculateATSScore(text) {
  let score = 50; // Base score

  // Check for key sections
  if (text.toLowerCase().includes('experience')) score += 10;
  if (text.toLowerCase().includes('education')) score += 10;
  if (text.toLowerCase().includes('skills')) score += 10;
  if (text.toLowerCase().includes('contact')) score += 10;

  // Check for metrics/achievements
  if (/\d+/.test(text)) score += 5;

  // Check for action verbs
  const actionVerbs = ['managed', 'developed', 'created', 'led', 'achieved', 'improved'];
  const hasActionVerbs = actionVerbs.some(verb =>
    text.toLowerCase().includes(verb)
  );
  if (hasActionVerbs) score += 5;

  return Math.min(score, 100);
}

function identifyStrengths(text) {
  const strengths = [];

  if (text.length > 500) {
    strengths.push('Resume memiliki detail yang cukup');
  }

  if (/\d+/.test(text)) {
    strengths.push('Termasuk metrik/angka pencapaian');
  }

  if (text.toLowerCase().includes('education')) {
    strengths.push('Memiliki section pendidikan yang jelas');
  }

  if (text.toLowerCase().includes('experience')) {
    strengths.push('Memiliki section pengalaman kerja');
  }

  if (strengths.length === 0) {
    strengths.push('Format resume sudah ada kerangka dasar');
  }

  return strengths;
}

function identifyImprovements(text) {
  const improvements = [];

  if (text.length < 500) {
    improvements.push('Tambahkan lebih detail tentang pengalaman kerja');
  }

  if (!/\d+/.test(text)) {
    improvements.push('Gunakan angka/metrik untuk mengukur pencapaian (contoh: "Increased sales by 25%")');
  }

  if (!text.toLowerCase().includes('australia') && !text.toLowerCase().includes('australian')) {
    improvements.push('Sesuaikan dengan pasar kerja Australia (contoh: sebutkan "Regional Work Experience" untuk WHV)');
  }

  if (!text.toLowerCase().includes('skills')) {
    improvements.push('Tambahkan section keterampilan (skills) yang spesifik');
  }

  if (!text.includes('@') && !text.toLowerCase().includes('email')) {
    improvements.push('Pastikan kontak information lengkap (email, phone, LinkedIn)');
  }

  return improvements;
}

function getAustraliaSpecificAdvice(text) {
  const advice = [];

  // Check for WHV-relevant experience
  if (text.toLowerCase().includes('farm') ||
      text.toLowerCase().includes('agriculture') ||
      text.toLowerCase().includes('fruit picking')) {
    advice.push('✅ Pengalaman kerja di sektor pertanian sangat relevan untuk WHV dan 88 days requirement');
  }

  // Check for hospitality
  if (text.toLowerCase().includes('hospitality') ||
      text.toLowerCase().includes('customer service')) {
    advice.push('✅ Pengalaman hospitality sangat dicari di kota-kota wisata Australia');
  }

  // Check for English proficiency
  if (!text.toLowerCase().includes('ielts') &&
      !text.toLowerCase().includes('english') &&
      !text.toLowerCase().includes('toefl')) {
    advice.push('⚠️ Pertimbangkan sertifikasi IELTS/TOEFL untuk memperkuat aplikasi WHV');
  }

  // Check for driver license
  if (!text.toLowerCase().includes('driver') &&
      !text.toLowerCase().includes('driving')) {
    advice.push('💡 Sebutkan jika memiliki SIM yang valid (driver license) - ini nilai plus untuk regional jobs');
  }

  // Check for regional experience
  if (!text.toLowerCase().includes('regional')) {
    advice.push('💡 Highlight pengalaman kerja di area regional/non-kota untuk 88 days eligibility');
  }

  if (advice.length === 0) {
    advice.push('Pastikan resume menonjolkan pengalaman yang relevan dengan visa WHV (regional work, hospitality, agriculture)');
  }

  return advice;
}

export const SAMPLE_RESUME = `
JOHN DOE
Email: john.doe@email.com | Phone: +62 812 3456 7890
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Motivated and hardworking professional with 3 years of experience in customer service and hospitality. Eager to contribute strong work ethic and adaptability to the Australian workforce through Working Holiday Visa program.

WORK EXPERIENCE

Customer Service Representative | ABC Company, Jakarta
June 2021 - Present
- Handle 50+ customer inquiries daily with 95% satisfaction rate
- Train 5 new staff members on service protocols
- Developed and implemented new customer feedback system

Hospitality Staff | XYZ Hotel, Bali
January 2020 - May 2021
- Managed front desk operations for 100+ room hotel
- Assisted guests from various countries, improving English communication skills
- Received "Employee of the Month" award twice

EDUCATION
Bachelor of Business Administration | University of Indonesia
2016 - 2020 | GPA: 3.5/4.0

SKILLS
- Customer Service: Expert
- Communication: Advanced (English: Intermediate-Advanced)
- Problem Solving: Strong
- Team Collaboration: Excellent
- Basic Computer Skills: Microsoft Office, Google Workspace

CERTIFICATIONS
- IELTS Academic: Overall 6.5 (Planning to retake for WHV requirement)
- First Aid Certificate (2021)

ADDITIONAL INFORMATION
- Driver License: Class A (Valid until 2025)
- Willing to work in regional areas
- Physically fit for manual labor tasks
- Quick learner and adaptable to new environments
`;
