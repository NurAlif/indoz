# AGENT 12: Future Strategy (Premium)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 08 (Premium System)
**Priority:** MEDIUM - Strategic planning feature

---

## 🎯 Your Mission

Build a comprehensive future strategy explorer with detailed information cards for each immigration pathway option.

---

## 📚 Required Reading (Read FIRST)

1. **[../Prompt.md](../Prompt.md)** - Section 3.7 (Future Strategy spec)
2. **[../final-evaluation.md](../final-evaluation.md)** - Section 12 (Future Strategy issues)
3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - Components & utilities
4. **Screenshot:** `../indoz-exit-strategy.png`

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ✅ **ADD** detailed information for each strategy option
2. ✅ **INCLUDE** Duration, Cost, PR Pathway, Pros, Cons for each card
3. ✅ **ORGANIZE** by clear categories (Populer, Hard Mode, Niche)

### MUST KEEP:

- High-level categorization (Populer, Hard Mode, Niche)

---

## 📋 Implementation Overview

### Key Components:

1. **FutureStrategy.jsx** - Main container with tabs
2. **StrategyCard.jsx** - Detailed strategy card
3. **CategoryTabs.jsx** - Populer/Hard Mode/Niche toggle

### Strategy Data Structure:

```javascript
const STRATEGIES = {
  populer: [
    {
      id: 'student-visa',
      icon: '🎓',
      title: 'Student Visa (500)',
      subtitle: 'Kuliah di Australia untuk pathway ke PR',
      details: {
        duration: '2 years (typical)',
        cost: '~AUD 30,000/year tuition + living',
        prPathway: 'Graduate → 485 visa → 189/190',
        pros: [
          'Work rights (40hr/fortnight)',
          'Partner can accompany',
          'Pathway jelas ke PR',
          'Meningkatkan English',
        ],
        cons: [
          'Expensive (tuition mahal)',
          'No government benefits',
          'Tidak guarantee PR',
          'Perlu valid IELTS lagi',
        ],
      },
    },
    {
      id: 'partner-visa',
      icon: '💑',
      title: 'Partner Visa (820/801)',
      subtitle: 'Jika pasangan adalah Australian citizen/PR',
      details: {
        duration: '12-24 months processing',
        cost: '~AUD 8,000 visa fee',
        prPathway: 'Direct to PR (tempory then permanent)',
        pros: [
          'Full work rights',
          'Access to healthcare (Medicare)',
          'No study requirement',
          'Permanent outcome',
        ],
        cons: [
          'Processing time sangat lama',
          'Butuh bukti relationship genuine',
          'Expensive application fee',
          'Partner harus sponsor',
        ],
      },
    },
  ],
  hardMode: [
    {
      id: 'employer-sponsored',
      icon: '💼',
      title: 'Employer Sponsored (482)',
      subtitle: 'Ditempatkan oleh employer Australia',
      details: {
        duration: '2-4 years',
        cost: 'Employer pays (butuh legal fee ~AUD 5k)',
        prPathway: '482 → 186 (ENS) PR after 3 years',
        pros: [
          'Full work rights',
          'Stable income',
          'Pathway ke PR jelas',
          'Employer membantu proses',
        ],
        cons: [
          'Tied to specific employer',
          'Difficult cari sponsor',
          'Regional work requirement',
          'Risk jika employer breaching',
        ],
      },
    },
  ],
  niche: [
    {
      id: 'regional-work',
      icon: '🌾',
      title: 'Regional Work Program',
      subtitle: 'Priority untuk daerah regional',
      details: {
        duration: 'Ongoing',
        cost: 'Minimal (relocation costs)',
        prPathway: '491 → 191 PR',
        pros: [
          'Points bonus untuk regional',
          'Lower cost of living',
          'Priority processing',
          'Community support',
        ],
        cons: [
          'Limited job opportunities',
          'Isolated location',
          'Access to services limited',
          'Culture shock',
        ],
      },
    },
    // ... more niche strategies
  ],
};
```

### Strategy Card Component:

```jsx
const StrategyCard = ({ strategy }) => (
  <div className="bg-white border-2 border-gray-200 hover:border-indo-red rounded-xl p-6 transition-all">
    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <span className="text-4xl">{strategy.icon}</span>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{strategy.subtitle}</p>
      </div>
    </div>

    {/* Details */}
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Duration</p>
          <p className="font-medium text-gray-900">{strategy.details.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Cost</p>
          <p className="font-medium text-gray-900">{strategy.details.cost}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase mb-1">PR Pathway</p>
        <p className="text-sm text-gray-700">{strategy.details.prPathway}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-success/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-success mb-2">Pros</p>
          <ul className="space-y-1">
            {strategy.details.pros.map((pro, i) => (
              <li key={i} className="text-xs text-gray-700">✓ {pro}</li>
            ))}
          </ul>
        </div>

        <div className="bg-error/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-error mb-2">Cons</p>
          <ul className="space-y-1">
            {strategy.details.cons.map((con, i) => (
              <li key={i} className="text-xs text-gray-700">✗ {con}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* CTA */}
    <button className="mt-4 w-full py-2 bg-indo-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
      Learn More
    </button>
  </div>
);
```

---

## ✅ Deliverables

```
src/components/premium/
└── FutureStrategy/
    ├── FutureStrategy.jsx    ✅ Main container
    ├── StrategyCard.jsx      ✅ Detailed card
    └── CategoryTabs.jsx      ✅ Category toggle
```

---

## ⚠️ Important Notes

1. **DO** include detailed Pros/Cons for each option
2. **DO** show Duration and Cost clearly
3. **DO NOT** make information too brief - users need details
4. **DO** organize by clear categories

**Reference:** `../indoz-exit-strategy.png` for visual layout
