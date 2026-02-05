# AGENT 11: PR Points Calculator (Premium)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 08 (Premium System)
**Priority:** HIGH - Essential for PR planning

---

## 🎯 Your Mission

Build a PR points calculator with live updates, strategy recommendations, challenge display, and inline tooltips for terminology.

---

## 📚 Required Reading (Read FIRST)

1. **[../Prompt.md](../Prompt.md)** - Section 3.7 (PR Calculator spec)
2. **[../final-evaluation.md](../final-evaluation.md)** - Section 11 (PR-Calc issues)
3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - Components & utilities
4. **Screenshot:** `../indoz-pr-calc.png`

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ✅ **ADD** explanation for PR (Permanent Residency)
2. ✅ **ADD** explanation for 189/190 visa subclasses
3. ✅ **ADD** strategy/suggestion output after calculation
4. ✅ **ADD** challenges & strategies section
5. ✅ **MAKE ALL FIELDS BLANK** from start (no default values)

### MUST KEEP:

- Live update on dropdown change
- Interpretation results ("Eligible, tapi butuh strategi")

---

## 📋 Implementation Overview

### Key Components:

1. **PRCalculator.jsx** - Main container
2. **VisaSelector.jsx** - 189 vs 190 toggle
3. **CriteriaForm.jsx** - Age, English, Education, etc.
4. **ResultsCard.jsx** - Score + interpretation
5. **StrategyCard.jsx** - Recommendations + challenges
6. **Tooltip.jsx** - Inline explanations

### Points Calculation Logic:

```javascript
const calculatePoints = (criteria) => {
  let points = 0;

  // Age
  const agePoints = {
    '18-24': 25,
    '25-32': 30,
    '33-39': 25,
    '40-44': 15,
    '45-49': 0,
  };
  points += agePoints[criteria.age] || 0;

  // English
  const englishPoints = {
    'Superior': 20,
    'Proficient': 10,
    'Competent': 0,
  };
  points += englishPoints[criteria.english] || 0;

  // Education
  const educationPoints = {
    'PhD': 20,
    'Masters': 15,
    'Bachelor': 15,
    'Diploma': 10,
    'Certificate': 10,
  };
  points += educationPoints[criteria.education] || 0;

  // ... add more criteria

  return points;
};
```

### Strategy Recommendations:

```javascript
const getStrategies = (points, criteria) => {
  const strategies = [];
  const challenges = [];

  if (points < 65) {
    const deficit = 65 - points;
    strategies.push(`Butuh ${deficit} poin lagi untuk eligibility minimum`);

    if (criteria.english !== 'Superior') {
      strategies.push(`Upgrade English ke Superior (+${20 - getEnglishPoints(criteria.english)} pts)`);
    }

    if (!criteria.australianStudy) {
      strategies.push('Pertimbangkan study di Australia (+5 pts)');
    }

    if (!criteria.naati) {
      strategies.push('NAATI accreditation bisa tambah 5 pts');
    }

    challenges.push('Distance from minimum pass mark is significant');
  } else if (points < 85) {
    strategies.push('Skor eligible, tapi competition tinggi');
    challenges.push(`Cut-off point bulan ini: 85-90 pts (189)`);
    strategies.push('Pertimbangkan visa 190 dengan state sponsorship');
  } else {
    strategies.push('Excellent! Peluang tinggi untuk visa 189');
    strategies.push('Pertimbangkan visa 190 untuk peluang lebih pasti');
  }

  return { strategies, challenges };
};
```

### Inline Tooltips:

```jsx
const InlineTooltip = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center gap-1 cursor-help border-b border-dotted border-gray-400">
      {term}
      <Info size={14} className="text-indo-red" />
      {isVisible && (
        <div className="absolute z-50 bottom-full left-0 mb-2 px-3 py-2 w-64 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
          {definition}
        </div>
      )}
    </span>
  );
};

// Usage:
<InlineTooltip term="PR" definition="Permanent Residency - Izin tinggal permanen" />
<InlineTooltip term="189" definition="Skilled Independent Visa - Tidak butuh sponsor" />
<InlineTooltip term="190" definition="Skilled Nominated Visa - Butuh state sponsorship" />
```

---

## ✅ Deliverables

```
src/components/premium/
└── PRCalculator/
    ├── PRCalculator.jsx       ✅ Main container
    ├── VisaSelector.jsx       ✅ 189/190 toggle
    ├── CriteriaForm.jsx       ✅ Form fields
    ├── ResultsCard.jsx        ✅ Score display
    ├── StrategyCard.jsx       ✅ Recommendations
    └── InlineTooltip.jsx      ✅ Explanations
```

---

## ⚠️ Important Notes

1. **CRITICAL:** All fields MUST start blank - no default values
2. **DO** show strategies AFTER calculation (not before)
3. **DO** explain PR, 189, 190 with tooltips
4. **DO** display challenges for current score
5. **DO NOT** show results until user fills all required fields

**Reference:** `../indoz-pr-calc.png` for visual layout
