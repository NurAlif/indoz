# AGENT 03: Onboarding Welcome Modal

**Status:** SEQUENTIAL (Must complete after Agent 02)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation)
**Outputs Required:** Onboarding modal with glossary, localStorage integration

---

## 🎯 Your Mission

Create a welcoming first-time user experience that explains key terminology and sets proper expectations for the application. This modal addresses critical usability issues identified in the evaluation.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.3 (Onboarding Welcome Modal)
   - Focus on: Section 2.1 (System Level MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 1 (Umum / Level Sistem) - Issues about terminology

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For Modal component usage

4. **[AGENT-02-Navigation.md](AGENT-02-Navigation.md)** - For integration with App.jsx

---

## 🎨 Onboarding Requirements

### What This Modal Solves (from evaluation):

1. ❌ **Issue:** Users don't understand WHV, SDUWHV, 88 days, PR terminology
   → ✅ **Solution:** Glossary section explaining all terms

2. ❌ **Issue:** No explanation of app purpose (planning vs tracking)
   → ✅ **Solution:** Clear use case explanation

3. ❌ **Issue:** No onboarding before chat
   → ✅ **Solution:** Welcome modal on first visit

### When to Show:

- Only on FIRST visit to the app
- Check localStorage: `indoz_onboarding_completed`
- Show modal if key doesn't exist
- Set to `true` when user clicks "Mulai Sekarang"

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create OnboardingModal Component

**File:** `src/components/onboarding/OnboardingModal.jsx`

```jsx
import React from 'react';
import Modal from '../common/Modal';
import { cn } from '../../utils/cn';

const GLOSSARY_ITEMS = [
  {
    term: 'WHV',
    definition: 'Working Holiday Visa (visa kerja liburan)',
  },
  {
    term: 'SDUWHV',
    definition: 'Subclass 417 WHV (jenis visa WHV)',
  },
  {
    term: '88 Days',
    definition: 'Syarat kerja 3 bulan untuk extension visa',
  },
  {
    term: 'PR',
    definition: 'Permanent Residency (izin tinggal permanen)',
  },
];

const FEATURES = [
  {
    icon: '✈️',
    title: 'Mempersiapkan Working Holiday Visa (WHV)',
  },
  {
    icon: '💼',
    title: 'Mencari lowongan kerja di Australia',
  },
  {
    icon: '📋',
    title: 'Tracking 88 days untuk extension visa',
  },
  {
    icon: '🏠',
    title: 'Merencanakan Permanent Residency (PR)',
  },
];

const OnboardingModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      showCloseButton={false}
    >
      <div className="text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat Datang di IndOz!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Gerbang Karir & Residensial Australia untuk Indonesia
        </p>

        {/* Features Grid */}
        <div className="bg-indo-red/5 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-left">
            IndOz membantu Anda:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <p className="text-sm text-gray-700 text-left">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Glossary */}
        <div className="bg-oz-gold/5 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">
            Istilah Penting:
          </h3>
          <div className="space-y-3">
            {GLOSSARY_ITEMS.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-indo-red font-semibold">{item.term} =</span>
                <span className="text-gray-700">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Case */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">
            App ini digunakan untuk:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Planning persiapan sebelum berangkat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Tracking progress saat sudah di Australia</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="w-full px-8 py-3 bg-indo-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Mulai Sekarang
        </button>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
```

### Task 2: Create Custom Hook for Onboarding

**File:** `src/hooks/useOnboarding.js`

```jsx
import { useEffect, useState } from 'react';

const ONBOARDING_KEY = 'indoz_onboarding_completed';

/**
 * Custom hook to manage onboarding modal state
 * @returns {Object} { isOpen, handleClose }
 */
export function useOnboarding() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompleted = localStorage.getItem(ONBOARDING_KEY);

    if (!hasCompleted) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Mark onboarding as completed
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return {
    isOpen,
    handleClose,
  };
}
```

### Task 3: Integrate Onboarding into App.jsx

**File:** `src/App.jsx` (update)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import OnboardingModal from './components/onboarding/OnboardingModal';
import { useOnboarding } from './hooks/useOnboarding';

// Placeholder pages
const AIChat = () => <div className="pt-20 px-4">AI Chat - Agent 04 will build this</div>;
const JobSearch = () => <div className="pt-20 px-4">Cari Lowongan - Agent 05 will build this</div>;
const ResumeChecker = () => <div className="pt-20 px-4">Cek Resume - Agent 06 will build this</div>;
const Guides = () => <div className="pt-20 px-4">Panduan Lengkap - Agent 07 will build this</div>;
const Login = () => <div className="pt-20 px-4">Login Page</div>;

function AppContent() {
  const { isOpen, handleClose } = useOnboarding();

  return (
    <>
      <TopBar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<AIChat />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/resume" element={<ResumeChecker />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />

      <OnboardingModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Task 4: Create Glossary Tooltip Component (Reusable)

**File:** `src/components/common/GlossaryTooltip.jsx`

```jsx
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const GLOSSARY_TERMS = {
  'WHV': 'Working Holiday Visa - Visa kerja liburan untuk warga usia 18-30 tahun',
  'SDUWHV': 'Subclass 417 Working Holiday Visa - Jenis WHV untuk Indonesia',
  '88 Days': 'Syarat kerja 3 bulan (88 hari) di regional Australia untuk extension visa WHV kedua',
  'PR': 'Permanent Residency - Izin tinggal permanen di Australia',
  'TFN': 'Tax File Number - Nomor pajak wajib untuk bekerja di Australia',
  'IELTS': 'International English Language Testing System - Tes bahasa Inggris yang disyaratkan untuk visa dan PR',
};

const GlossaryTooltip = ({ term, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const definition = GLOSSARY_TERMS[term];

  if (!definition) {
    return <span>{term}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 cursor-help border-b border-dotted border-gray-400",
        className
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {term}
      <Info size={14} className="text-indo-red" />

      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 w-64 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
          {definition}
          {/* Arrow */}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </span>
  );
};

export default GlossaryTooltip;
```

---

## ✅ Checklist Before Completing

- [ ] OnboardingModal component created
- [ ] Modal explains: WHV, SDUWHV, 88 Days, PR
- [ ] Modal explains app use cases (planning vs tracking)
- [ ] useOnboarding hook created
- [ ] localStorage key: `indoz_onboarding_completed`
- [ ] Modal shows on first visit only
- [ ] Modal doesn't show after clicking "Mulai Sekarang"
- [ ] GlossaryTooltip component created (reusable)
- [ ] Integrated into App.jsx
- [ ] Tested: First visit shows modal
- [ ] Tested: Reload doesn't show modal again
- [ ] Tested: Clearing localStorage shows modal again
- [ ] All text is in clear Indonesian
- [ ] No excessive slang
- [ ] Responsive design works

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   ├── onboarding/
│   │   └── OnboardingModal.jsx     ✅
│   └── common/
│       └── GlossaryTooltip.jsx     ✅
├── hooks/
│   └── useOnboarding.js            ✅
└── App.jsx                         ✅ (updated)
```

---

## 🎨 Visual Reference

Your modal should look like this:

```
┌────────────────────────────────────────────────────────┐
│                                                    [✕] │
│                                                        │
│           Selamat Datang di IndOz!                     │
│   Gerbang Karir & Residensial Australia               │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  IndOz membantu Anda:                            │ │
│  │                                                    │ │
│  │  ✈️  Mempersiapkan Working Holiday Visa (WHV)    │ │
│  │  💼  Mencari lowongan kerja di Australia          │ │
│  │  📋  Tracking 88 days untuk extension visa        │ │
│  │  🏠  Merencanakan Permanent Residency (PR)        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Istilah Penting:                                     │
│  • WHV = Working Holiday Visa (visa kerja liburan)    │
│  • SDUWHV = Subclass 417 WHV (jenis visa WHV)         │
│  • 88 Days = Syarat kerja 3 bulan untuk extension     │
│  • PR = Permanent Residency (izin tinggal permanen)   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  App ini digunakan untuk:                        │ │
│  │  • Planning persiapan sebelum berangkat          │ │
│  │  • Tracking progress saat sudah di Australia     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│                  [Mulai Sekarang]                      │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Next Steps

After you complete the onboarding modal:
1. All sequential tasks (01-03) are COMPLETE
2. Agents 04-13 can now work in PARALLEL
3. The application foundation is solid and ready

---

## 🎯 Success Metrics

Your onboarding modal successfully addresses evaluation issues when:

1. ✅ New users understand WHV/PR terminology before using features
2. ✅ Users know if this app is for planning OR tracking
3. ✅ Modal only appears once (not annoying)
4. ✅ Users can reference terms anytime via GlossaryTooltip

---

## ⚠️ Important Notes

1. **DO NOT** show modal on every visit - only first time
2. **DO NOT** use excessive slang - be clear and professional
3. **DO** use localStorage correctly with JSON.stringify
4. **DO** make the GlossaryTooltip reusable for other agents
5. **DO** ensure modal is accessible (keyboard, screen reader)
6. **DO NOT** skip the explanation of planning vs tracking

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.3 for onboarding specs
- [../final-evaluation.md](../final-evaluation.md) - Section 1 for terminology issues
- [AGENT-01-Foundation.md](AGENT-01-Foundation.md) - For Modal component usage
