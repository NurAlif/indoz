# AGENT 06: Resume Checker (Cek Resume)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation)
**Priority:** MEDIUM - Useful public feature

---

## 🎯 Your Mission

Build a resume analysis tool that allows users to upload PDF resumes or paste resume text, then provides ATS (Applicant Tracking System) analysis with specific feedback for the Australian job market.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.5 (Cek Resume) - COMPLETE SPEC
   - Focus on: Section 2.1 (System Level MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 6 (Cek Resume) - all issues and good practices

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For components and utilities
   - Modal, Button, Input, validation utilities

4. **Screenshots to Reference:**
   - `../cek-resume.png` - Resume checker interface

---

## 🎨 Critical Requirements

### MUST KEEP (Good Practices):

- File validation (PDF only, max 4MB)
- "Isi Contoh Resume" button for demo/testing
- Clear visual separation between upload and paste options
- Loading state during analysis
- Display results with ATS score, strengths, and improvements

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create Resume Analysis Service

**File:** `src/services/resumeAPI.js`

```javascript
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
```

### Task 2: Create UploadArea Component

**File:** `src/components/resume/UploadArea.jsx`

```jsx
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';
import { isValidFileSize, isPDFFile } from '../../utils/validation';
import { cn } from '../../utils/cn';

const UploadArea = ({ onFileSelect = () => {}, onError = () => {} }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSelectFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      validateAndSelectFile(files[0]);
    }
  };

  const validateAndSelectFile = (file) => {
    // Validate file type
    if (!isPDFFile(file)) {
      onError('Format file harus PDF');
      return;
    }

    // Validate file size
    if (!isValidFileSize(file, 4)) {
      onError('Ukuran file maksimal 4MB');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      {!selectedFile ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-indo-red bg-indo-red/5"
              : "border-gray-300 hover:border-indo-red hover:bg-gray-50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <FileText size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Resume Anda
          </h3>
          <p className="text-gray-600 mb-4">
            Drag & drop atau klik untuk memilih file
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Upload size={16} />
            <span>Format: PDF • Max 4MB</span>
          </div>
        </div>
      ) : (
        <div className="border-2 border-success bg-success/5 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Check className="text-success" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2 text-gray-400 hover:text-error transition-colors"
              aria-label="Remove file"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
```

### Task 3: Create PasteArea Component

**File:** `src/components/resume/PasteArea.jsx`

```jsx
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

const PasteArea = ({ value = '', onChange = () => {}, onFillSample = () => {} }) => {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    onChange(text);
    setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-gray-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">
            Paste Resume Text
          </h3>
        </div>

        <button
          onClick={onFillSample}
          className="text-sm text-indo-red hover:text-red-700 font-medium transition-colors"
        >
          Isi Contoh Resume
        </button>
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste resume content here..."
        rows={15}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent resize-none font-mono text-sm"
      />

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{wordCount} kata</span>
        <span>Minimal 200 kata untuk hasil terbaik</span>
      </div>
    </div>
  );
};

export default PasteArea;
```

### Task 4: Create AnalysisResults Component

**File:** `src/components/resume/AnalysisResults.jsx`

```jsx
import React from 'react';
import { CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

const AnalysisResults = ({ results = {} }) => {
  if (!results || !results.atsScore) {
    return null;
  }

  const { atsScore, strengths = [], improvements = [], australiaSpecific = [] } = results;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* ATS Score */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ATS Compatibility Score
        </h3>

        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - atsScore / 100)}`}
                className={getScoreColor(atsScore)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold", getScoreColor(atsScore))}>
                {atsScore}
              </span>
              <span className="text-xs text-gray-600">/100</span>
            </div>
          </div>

          <div className="flex-1">
            <p className={cn("text-xl font-semibold", getScoreColor(atsScore))}>
              {getScoreLabel(atsScore)}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {atsScore >= 80
                ? 'Resume Anda sudah siap untuk apply ke perusahaan Australia!'
                : atsScore >= 60
                ? 'Resume cukup baik, tapi masih bisa ditingkatkan'
                : 'Resume perlu perbaikan signifikan untuk ATS'}
            </p>
          </div>
        </div>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-success" />
            <h3 className="text-lg font-semibold text-gray-900">
              Kekuatan Resume
            </h3>
          </div>

          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements Needed */}
      {improvements.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-gray-900">
              Perbaikan yang Disarankan
            </h3>
          </div>

          <ul className="space-y-2">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Australia-Specific Advice */}
      {australiaSpecific.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-info" />
            <h3 className="text-lg font-semibold text-gray-900">
              Tips untuk Pasar Kerja Australia
            </h3>
          </div>

          <ul className="space-y-2">
            {australiaSpecific.map((tip, index) => (
              <li
                key={index}
                className="p-3 bg-info/5 rounded-lg text-sm text-gray-700"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="bg-indo-red/5 border-2 border-indo-red/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <TrendingUp size={24} className="text-indo-red flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Tingkatkan Peluang Anda
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Dapatkan panduan lengkap cara membuat resume ATS-friendly untuk pasar kerja Australia
            </p>
            <button className="px-4 py-2 bg-indo-red text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Lihat Panduan Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
```

### Task 5: Create Main ResumeCheckerContainer Component

**File:** `src/components/resume/ResumeCheckerContainer.jsx`

```jsx
import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { analyzeResume, SAMPLE_RESUME } from '../../services/resumeAPI';
import UploadArea from './UploadArea';
import PasteArea from './PasteArea';
import AnalysisResults from './AnalysisResults';
import Button from '../common/Button';

const ResumeCheckerContainer = () => {
  const [mode, setMode] = useState('upload'); // 'upload' or 'paste'
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
    setResults(null);
  };

  const handlePasteChange = (text) => {
    setResumeText(text);
    setError('');
    setResults(null);
  };

  const handleFillSample = () => {
    setResumeText(SAMPLE_RESUME.trim());
    setError('');
    setResults(null);
  };

  const handleAnalyze = async () => {
    // Validation
    if (mode === 'upload' && !file) {
      setError('Silakan upload resume terlebih dahulu');
      return;
    }

    if (mode === 'paste' && resumeText.trim().length < 200) {
      setError('Resume text terlalu pendek. Minimal 200 kata.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // In production, you would extract text from PDF file
      // For now, we'll use the pasted text or a placeholder
      const textToAnalyze = mode === 'paste' ? resumeText : SAMPLE_RESUME;

      const analysis = await analyzeResume(textToAnalyze);
      setResults(analysis);
    } catch (err) {
      setError('Terjadi kesalahan saat menganalisis resume. Silakan coba lagi.');
      console.error('Error analyzing resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResumeText('');
    setResults(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cek Resume</h1>
        <p className="text-gray-600 text-sm mt-1">
          Analisis resume Anda untuk pasar kerja Australia
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-error/10 border-2 border-error/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {!results ? (
        <>
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMode('upload');
                  setResults(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'upload'
                    ? 'bg-indo-red text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upload PDF
              </button>

              <span className="text-gray-400">atau</span>

              <button
                onClick={() => {
                  setMode('paste');
                  setResults(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'paste'
                    ? 'bg-indo-red text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {/* Upload Mode */}
          {mode === 'upload' && <UploadArea onFileSelect={handleFileSelect} onError={setError} />}

          {/* Paste Mode */}
          {mode === 'paste' && (
            <PasteArea
              value={resumeText}
              onChange={handlePasteChange}
              onFillSample={handleFillSample}
            />
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!file && !resumeText)}
              variant="primary"
              size="lg"
              isLoading={isAnalyzing}
            >
              {isAnalyzing ? 'Menganalisa...' : 'Analisa Resume'}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <AnalysisResults results={results} />

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={handleReset} variant="outline">
              Cek Resume Lain
            </Button>
            <Button onClick={() => window.print()} variant="secondary">
              Simpan Hasil
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeCheckerContainer;
```

---

## ✅ Checklist Before Completing

- [ ] UploadArea component with drag & drop
- [ ] File validation (PDF only, max 4MB)
- [ ] PasteArea component with word count
- [ ] "Isi Contoh Resume" functionality
- [ ] AnalysisResults component with ATS score
- [ ] Resume analysis service (resumeAPI.js)
- [ ] ATS score calculation logic
- [ ] Strengths identification
- [ ] Improvements suggestions
- [ ] Australia-specific advice
- [ ] Loading state during analysis
- [ ] Error handling and display
- [ ] Results display with visual score circle
- [ ] Reset functionality
- [ ] Responsive design works
- [ ] Tested: Upload PDF validation works
- [ ] Tested: Paste text validation works
- [ ] Tested: Sample resume fills correctly
- [ ] Tested: Analysis produces results

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── resume/
│       ├── ResumeCheckerContainer.jsx  ✅
│       ├── UploadArea.jsx              ✅
│       ├── PasteArea.jsx               ✅
│       └── AnalysisResults.jsx         ✅
└── services/
    └── resumeAPI.js                    ✅
```

---

## 🎨 Visual Reference

Your resume checker interface should look like this:

```
┌─────────────────────────────────────────────────────────┐
│  CEK RESUME                                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Upload PDF] atau [Paste Text]                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │    📄 Upload Resume Anda                         │   │
│  │                                                  │   │
│  │    [Drag & drop or click to upload]             │   │
│  │                                                  │   │
│  │    Format: PDF • Max 4MB                         │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│                        ATAU                             │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │    📋 Paste Resume Text          [Isi Contoh...] │   │
│  │                                                  │   │
│  │    [Paste resume content here...]                │   │
│  │                                                  │   │
│  │    250 kata • Minimal 200 kata                   │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│                   [Analisa Resume]                      │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **DO NOT** skip file validation - security critical
2. **DO** provide clear error messages for validation failures
3. **DO NOT** analyze resume if it's too short (< 200 words)
4. **DO** use the SAMPLE_RESUME for demo purposes
5. **DO** provide actionable feedback in results
6. **DO NOT** make false promises - this is ATS estimation, not guarantee
7. **DO** include Australia-specific advice (WHV context)

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.5 for complete resume checker specs
- [../final-evaluation.md](../final-evaluation.md) - Section 6 for resume checker issues
- [../cek-resume.png](../cek-resume.png) - Visual reference
