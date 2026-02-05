# AGENT 08: Premium System (IndOz+)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation)
**Priority:** HIGH - Premium features gate

---

## 🎯 Your Mission

Build the Premium System including landing page with access code entry, and a separate premium dashboard that's visually distinct from the public system.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.7 (Premium System) - COMPLETE SPEC
   - Focus on: Section 2.1 (System Level MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 7 (Premium Landing) & Section 8 (Premium Dashboard) - all issues

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For components and utilities

4. **Screenshots to Reference:**
   - `../indoz-premium.png` - Premium landing page

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ❌ **Issue:** "Access Code" field doesn't give hint where to get code
   → ✅ **Fix:** Add hint text with "Get Access Code" button/link

2. ❌ **Issue:** Premium menu should be separate layout from public
   → ✅ **Fix:** Create completely different dashboard view

3. ❌ **Issue:** Dashboard shouldn't use tabed view, but card-based overview
   → ✅ **Fix:** Use cards for each premium feature

### MUST KEEP (Good Practices):

- "Beta" badge clearly visible
- Strong visual hierarchy
- Clear feature cards with icons

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create Premium Landing Page

**File:** `src/components/premium/PremiumLanding.jsx`

```jsx
import React, { useState } from 'react';
import { Lock, Crown, Check, Zap } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { cn } from '../../utils/cn';

const PREMIUM_FEATURES = [
  {
    icon: '📋',
    title: 'Documents Vault',
    description: 'Track kelengkapan dokumen untuk aplikasi visa',
  },
  {
    icon: '⏱️',
    title: '88 Days Logbook',
    description: 'Catat hari kerja untuk extension WHV kedua',
  },
  {
    icon: '🧮',
    title: 'PR Calculator',
    description: 'Hitung poin dan rencanakan strategi PR',
  },
  {
    icon: '🚀',
    title: 'Future Strategy',
    description: 'Eksplor opsi imigrasi untuk kembali ke Australia',
  },
];

const VALID_ACCESS_CODES = ['BETA2025', 'INDOZ2025', 'PREMIUM']; // For demo

const PremiumLanding = ({ onUnlock = () => {} }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessCode.trim()) {
      setError('Silakan masukkan access code');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (VALID_ACCESS_CODES.includes(accessCode.toUpperCase())) {
      onUnlock(accessCode);
    } else {
      setError('Access code tidak valid. Coba lagi atau hubungi support.');
    }

    setIsSubmitting(false);
  };

  const handleGetCode = () => {
    // In production, this would open a modal or navigate to pricing page
    alert('Demo: Gunakan kode BETA2025 untuk akses premium');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-oz-gold/10 text-oz-gold text-sm font-semibold rounded-full mb-4">
          <Zap size={16} />
          BETA
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          IndOz+ Premium
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock fitur premium untuk mempermudah perjalanan WHV dan PR Anda
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PREMIUM_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 hover:border-oz-gold rounded-xl p-6 transition-all group"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-oz-gold transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Access Code Form */}
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-indo-red/10 to-oz-gold/10 border-2 border-indo-red/20 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indo-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-indo-red" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unlock Premium Features
            </h2>
            <p className="text-gray-600 text-sm">
              Masukkan access code untuk mengakses semua fitur premium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-indo-red text-center text-lg font-mono tracking-wider"
              />
              {error && (
                <p className="mt-2 text-sm text-error text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 rounded-lg font-semibold transition-all",
                "bg-indo-red text-white hover:bg-red-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Memvalidasi...' : 'Unlock Premium'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleGetCode}
                className="text-sm text-indo-red hover:text-red-700 font-medium underline"
              >
                Dapatkan Access Code
              </button>
            </div>
          </form>

          {/* Demo Code Hint */}
          <div className="mt-6 p-4 bg-white/50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo:</strong> Gunakan kode <span className="font-mono">BETA2025</span>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Kenapa IndOz+ Premium?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Save Time</p>
              <p className="text-sm text-gray-600">
                Tools otomatis untuk tracking dokumen dan 88 days
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Expert Guidance</p>
              <p className="text-sm text-gray-600">
                Kalkulator PR dengan strategi personal
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Stay Organized</p>
              <p className="text-sm text-gray-600">
                Semua dokumen dan progress dalam satu tempat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;
```

### Task 2: Create Premium Dashboard

**File:** `src/components/premium/PremiumDashboard.jsx`

```jsx
import React, { useState } from 'react';
import { LogOut, User, Trophy, Target, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Import premium feature components
import DocumentsVault from './DocumentsVault';
import Logbook from './Logbook';
import PRCalculator from './PRCalculator';
import FutureStrategy from './FutureStrategy';

const PremiumDashboard = ({ onLogout = () => {} }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [accessCode] = useLocalStorage('indoz_premium_code', '');

  // Mock user data
  const userStatus = {
    visaStatus: 'WHV Active',
    prPoints: 65,
    documentsReady: '5/8',
  };

  const premiumFeatures = [
    {
      id: 'documents',
      icon: '📋',
      title: 'Documents Vault',
      description: 'Track dokumen visa',
      status: '5/8 Ready',
      color: 'indo-red',
    },
    {
      id: 'logbook',
      icon: '⏱️',
      title: '88 Days Logbook',
      description: 'Tracking hari kerja',
      status: '3/88 Hari',
      color: 'oz-gold',
    },
    {
      id: 'pr-calc',
      icon: '🧮',
      title: 'PR Calculator',
      description: 'Hitung poin PR',
      status: '65 pts',
      color: 'info',
    },
    {
      id: 'strategy',
      icon: '🚀',
      title: 'Future Strategy',
      description: 'Strategi imigrasi',
      status: '3 Options',
      color: 'success',
    },
  ];

  if (activeFeature) {
    // Render the selected feature
    const featureComponents = {
      documents: <DocumentsVault onBack={() => setActiveFeature(null)} />,
      logbook: <Logbook onBack={() => setActiveFeature(null)} />,
      'pr-calc': <PRCalculator onBack={() => setActiveFeature(null)} />,
      strategy: <FutureStrategy onBack={() => setActiveFeature(null)} />,
    };

    return featureComponents[activeFeature] || null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Crown className="text-oz-gold" size={28} />
            <h1 className="text-3xl font-bold text-gray-900">
              IndOz+ Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Selamat datang kembali! Berikut progress Anda.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Status Overview */}
      <div className="bg-gradient-to-br from-indo-red/5 to-oz-gold/5 border-2 border-indo-red/10 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          STATUS OVERVIEW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visa Status */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indo-red/10 rounded-lg flex items-center justify-center">
                <Target className="text-indo-red" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visa Status</p>
                <p className="font-semibold text-gray-900">{userStatus.visaStatus}</p>
              </div>
            </div>
          </div>

          {/* PR Points */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-oz-gold/10 rounded-lg flex items-center justify-center">
                <Trophy className="text-oz-gold" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">PR Points</p>
                <p className="font-semibold text-gray-900">{userStatus.prPoints} pts</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-success" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="font-semibold text-gray-900">{userStatus.documentsReady}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          PREMIUM FEATURES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className="bg-white border-2 border-gray-200 hover:border-indo-red rounded-xl p-6 text-left transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-indo-red transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="px-3 py-1 bg-gray-100 rounded-full">
                  <span className="text-xs font-medium text-gray-700">
                    {feature.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-indo-red text-sm font-medium">
                Buka Fitur
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Access Code: {accessCode}</p>
        <p className="mt-1">© 2025 IndOz+ Premium. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PremiumDashboard;
```

### Task 3: Create Premium Route Handler

**File:** `src/components/premium/PremiumRoute.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PremiumLanding from './PremiumLanding';
import PremiumDashboard from './PremiumDashboard';

const PremiumRoute = () => {
  const [accessCode, setAccessCode] = useLocalStorage('indoz_premium_code', '');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if user has valid access code stored
    if (accessCode) {
      setIsUnlocked(true);
    }
  }, [accessCode]);

  const handleUnlock = (code) => {
    setAccessCode(code);
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    setAccessCode('');
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <PremiumLanding onUnlock={handleUnlock} />;
  }

  return <PremiumDashboard onLogout={handleLogout} />;
};

export default PremiumRoute;
```

### Task 4: Update App.jsx with Premium Route

**File:** `src/App.jsx` (update)

```jsx
// Add premium route
import PremiumRoute from './components/premium/PremiumRoute';

// In Routes section:
<Route path="/premium" element={<PremiumRoute />} />
```

---

## ✅ Checklist Before Completing

- [ ] PremiumLanding component with 4 feature cards
- [ ] Access code validation working
- [ ] "Get Access Code" button/hint
- [ ] Demo code hint (BETA2025)
- [ ] PremiumDashboard component with status overview
- [ ] 4 premium feature cards (not tabs)
- [ ] PremiumRoute component handles unlock state
- [ ] localStorage integration for access code
- [ ] Logout functionality
- [ ] Completely different layout from public pages
- [ ] No breadcrumb in premium dashboard
- [ ] Status overview with 3 metrics
- [ ] Each feature card shows current status
- [ ] Responsive design works
- [ ] Tested: Access code unlocks premium
- [ ] Tested: Logout returns to landing

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── premium/
│       ├── PremiumRoute.jsx        ✅
│       ├── PremiumLanding.jsx      ✅
│       └── PremiumDashboard.jsx    ✅
└── App.jsx                         ✅ (updated)
```

---

## 🎨 Visual Reference

**Landing Page:**
```
┌─────────────────────────────────────────────────────────┐
│                  [BETA]                                 │
│                                                         │
│              IndOz+ Premium                             │
│        Unlock fitur premium untuk WHV & PR              │
│                                                         │
│  ┌─────────┬─────────┬─────────┬─────────┐            │
│  │📋       │⏱️       │🧮       │🚀       │            │
│  │Documents│88 Days  │PR Calc  │Strategy │            │
│  │ Vault   │Logbook  │         │         │            │
│  └─────────┴─────────┴─────────┴─────────┘            │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │         [🔒]                             │           │
│  │   Unlock Premium Features               │           │
│  │                                         │           │
│  │   [Enter access code...]                │           │
│  │                                         │           │
│  │      [Unlock Premium]                   │           │
│  │                                         │           │
│  │      Dapatkan Access Code               │           │
│  └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

**Dashboard:**
```
┌─────────────────────────────────────────────────────────┐
│  [👑] IndOz+ Dashboard                                 │
│  Welcome back! Track your progress.          [Logout] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATUS OVERVIEW                                       │
│  ┌───────────┬───────────┬───────────┐                │
│  │Visa Status│PR Points  │Documents  │                │
│  │WHV Active │  65 pts   │  5/8 Ready │                │
│  └───────────┴───────────┴───────────┘                │
│                                                         │
│  PREMIUM FEATURES                                      │
│  ┌─────────────────────┬─────────────────────┐         │
│  │📋 Documents Vault   │⏱️ 88 Days Logbook   │         │
│  │Track dokumen visa   │Tracking hari kerja  │         │
│  │5/8 Ready  [Open→]   │3/88 Hari  [Open→]   │         │
│  ├─────────────────────┼─────────────────────┤         │
│  │🧮 PR Calculator     │🚀 Future Strategy   │         │
│  │Hitung poin PR       │Strategi imigrasi    │         │
│  │65 pts     [Open→]   │3 Options  [Open→]   │         │
│  └─────────────────────┴─────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **DO NOT** use tabed view in dashboard - use card-based layout
2. **DO NOT** show breadcrumb in premium dashboard
3. **DO** make premium dashboard visually distinct from public
4. **DO** provide hint for getting access code
5. **DO NOT** hardcode access codes in production
6. **DO** store access code in localStorage for persistence
7. **DO** ensure logout clears the stored code

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.7 for complete premium system specs
- [../final-evaluation.md](../final-evaluation.md) - Section 7 & 8 for premium issues
- [../indoz-premium.png](../indoz-premium.png) - Visual reference
