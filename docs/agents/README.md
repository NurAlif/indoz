# IndOz.work Agent Documentation

Complete implementation guide for rebuilding IndOz.work with all evaluation fixes.

---

## 📋 Overview

This directory contains detailed instructions for 13 specialized agents working together to rebuild the IndOz.work application.

### Agent Structure

**Sequential Agents (Must Complete in Order):**
1. **AGENT-01-Foundation.md** - Infrastructure & design system
2. **AGENT-02-Navigation.md** - TopBar & routing
3. **AGENT-03-Onboarding.md** - Welcome modal & glossary
4. **AGENT-04-AI-Chat.md** - AI chat with Google AI Studio

**Parallel Agents (Can Work Simultaneously):**
5. **AGENT-05-JobSearch.md** - Job search with filters
6. **AGENT-06-ResumeChecker.md** - Resume analysis tool
7. **AGENT-07-Guides.md** - Complete guide system
8. **AGENT-08-PremiumSystem.md** - Premium landing & dashboard

**Premium Features (Depend on AGENT-08):**
9. **AGENT-09-DocumentsVault.md** - Document tracking
10. **AGENT-10-Logbook.md** - 88 Days work logbook
11. **AGENT-11-PRCalculator.md** - PR points calculator
12. **AGENT-12-FutureStrategy.md** - Immigration strategy explorer

**Final Integration:**
13. **AGENT-13-Integration.md** - Final polish & testing

---

## 🚀 Quick Start

### For Development Team

1. **Start with AGENT-01** - Foundation must be built first
2. **Then AGENT-02** - Navigation system
3. **Then AGENT-03** - Onboarding modal
4. **Then AGENT-04** - Core AI Chat feature

After Agents 01-04 complete, agents 05-08 can work **in parallel**.

After Agent 08 completes, agents 09-12 can work **in parallel**.

Finally, Agent 13 integrates and polishes everything.

### For Solo Developer

Follow the sequential order: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 13

---

## 📚 Required Reading

**Before starting ANY agent:**

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
2. **[../final-evaluation.md](../final-evaluation.md)** - Issues to fix & good practices
3. **Agent-specific documentation** - Each agent's detailed guide

---

## 🎨 Design System

### Colors (CSS Variables)

```css
--indo-red: #C41E3A;    /* Primary brand color */
--oz-gold: #D4AF37;     /* Secondary brand color */
--success: #10B981;     /* Green */
--warning: #F59E0B;     /* Amber/Orange */
--error: #EF4444;       /* Red */
--info: #3B82F6;        /* Blue */
```

### Typography

- Font: Inter (via Google Fonts)
- Headings: Bold, tight tracking
- Body: Regular/medium, line-height 1.5-1.6

### Component Standards

- Borders: `--gray-200` (#E5E7EB)
- Shadows: `shadow-sm`, `shadow-md`
- Rounded corners: `rounded-lg` (8px) or `rounded-xl` (12px)
- Spacing: Tailwind scale (4px base unit)

---

## 🔑 Critical Requirements

### MUST FIX (from evaluation)

**System Level:**
- ❌ Remove `user-select: none`
- ❌ Remove `oncontextmenu="return false;"`
- ✅ Add onboarding modal
- ✅ Add glossary tooltips
- ✅ Explain app purpose (planning vs tracking)

**Navigation:**
- ✅ Flatten navigation (no dropdown)
- ❌ Remove breadcrumb
- ❌ Remove 🇮🇩 from logo
- ✅ Standardize active states

**AI Chat:**
- ✅ Disable input while generating
- ✅ Clear typing indicator
- ✅ Visual separation for tabs
- ✅ Tab menu only shows first time

**General UI:**
- ✅ Fix form contrast (white-on-white issue)
- ✅ Standardize colors
- ✅ Fix SVG icons

### MUST KEEP (Good Practices)

- Skeleton loaders on all dynamic components
- Privacy notices
- Progress bars with numeric indicators
- Live updates on form changes
- Clear error messages

---

## 📦 Technology Stack

```
- Framework: React 18 with Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Utilities: clsx, tailwind-merge
- AI API: Google AI Studio (Gemini Pro)
```

### Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.300.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "react-markdown": "^9.0.0"
}
```

---

## 🗂️ Code Organization

```
src/
├── components/
│   ├── common/          # Shared components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Tooltip.jsx
│   │   └── GlossaryTooltip.jsx
│   ├── layout/          # Layout components
│   │   ├── TopBar.jsx
│   │   └── Footer.jsx
│   ├── onboarding/      # Onboarding system
│   │   └── OnboardingModal.jsx
│   ├── ai-chat/         # AI Chat feature
│   │   ├── AIChatContainer.jsx
│   │   ├── AIProfile.jsx
│   │   ├── ChatTabMenu.jsx
│   │   ├── ChatHistory.jsx
│   │   └── PrivacyNotice.jsx
│   ├── jobs/            # Job search
│   │   ├── JobSearchContainer.jsx
│   │   ├── JobFilters.jsx
│   │   ├── JobCard.jsx
│   │   └── JobSkeleton.jsx
│   ├── resume/          # Resume checker
│   │   ├── ResumeCheckerContainer.jsx
│   │   ├── UploadArea.jsx
│   │   ├── PasteArea.jsx
│   │   └── AnalysisResults.jsx
│   ├── guides/          # Complete guides
│   │   ├── GuidesContainer.jsx
│   │   ├── GuideTabs.jsx
│   │   ├── TableOfContents.jsx
│   │   ├── GuideContent.jsx
│   │   └── ConsultationForm.jsx
│   └── premium/         # Premium features
│       ├── PremiumRoute.jsx
│       ├── PremiumLanding.jsx
│       ├── PremiumDashboard.jsx
│       ├── DocumentsVault/
│       ├── Logbook/
│       ├── PRCalculator/
│       └── FutureStrategy/
├── services/            # API services
│   ├── googleAI.js
│   ├── jobsAPI.js
│   └── resumeAPI.js
├── data/                # Static data
│   ├── chatSuggestions.js
│   └── guideContent.js
├── hooks/               # Custom hooks
│   ├── useLocalStorage.js
│   └── useOnboarding.js
├── utils/               # Utilities
│   ├── cn.js
│   └── validation.js
├── styles/              # Global styles
│   └── index.css
├── App.jsx              # Main app
└── main.jsx             # Entry point
```

---

## 🎯 Agent-Specific Notes

### AGENT-01: Foundation
- **CRITICAL:** All other agents depend on this
- Create ALL utility functions & hooks first
- Set up Tailwind with custom colors
- NO user restrictions

### AGENT-02: Navigation
- Flatten navigation structure
- No dropdown menus
- Active state: red indicator bar

### AGENT-03: Onboarding
- Only shows on first visit
- Explains WHV, SDUWHV, 88 Days, PR
- Creates reusable GlossaryTooltip

### AGENT-04: AI Chat
- **MOST COMPLEX FEATURE**
- Google AI Studio integration
- Tab menu: Persiapan, Kerja & 88 Days, Menetap
- Privacy notice always visible

### AGENT-05: Job Search
- Skeleton loader critical
- 88 Day Focus toggle
- Save search functionality

### AGENT-06: Resume Checker
- Upload validation (PDF, 4MB)
- "Isi Contoh Resume" button
- ATS scoring with feedback

### AGENT-07: Guides
- 4 tabs with markdown content
- Sticky TOC on desktop
- Consultation form with proper contrast

### AGENT-08: Premium System
- Landing page with access code
- Separate dashboard layout
- Card-based (not tabed)

### AGENT-09-12: Premium Features
- Each builds on premium dashboard
- Detailed implementation specs in each agent doc

### AGENT-13: Integration
- **FINAL STEP**
- Fix ALL remaining issues
- Comprehensive testing
- Accessibility audit

---

## ✅ Quality Checklist

Use this checklist before final delivery:

### Functionality
- [ ] All features work as specified
- [ ] No console errors
- [ ] All evaluation issues fixed
- [ ] All forms validate correctly
- [ ] All buttons/actions work

### Design
- [ ] Consistent styling across all pages
- [ ] Responsive on all devices
- [ ] Proper contrast ratios (WCAG AA)
- [ ] All icons display correctly
- [ ] No broken layouts

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1

### Performance
- [ ] Fast initial load (< 3s)
- [ ] Smooth transitions
- [ ] Optimized images
- [ ] No memory leaks

### Browser Support
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🔗 Helpful Resources

### Internal Documentation
- [../Prompt.md](../Prompt.md) - Complete project specs
- [../final-evaluation.md](../final-evaluation.md) - Evaluation results

### External Resources
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Lucide Icons](https://lucide.dev)
- [Google AI Studio](https://makersuite.google.com/appmaker)

### Screenshots (Visual References)
- `../first-page-ai-chat.png`
- `../contoh-chat.png`
- `../topbar.png`
- `../panduan-lengkap.png`
- `../cari-lowongan.png`
- `../cek-resume.png`
- `../indoz-premium.png`
- `../indoz-dokumen.png`
- `../indoz-logboook.png`
- `../indoz-pr-calc.png`
- `../indoz-exit-strategy.png`

---

## 🤝 Collaboration Tips

### For Teams Working in Parallel

**Phase 1 (Sequential):**
- Agent 01-02-03-04 must complete in order

**Phase 2 (Parallel):**
- Agent 05, 06, 07, 08 can work simultaneously
- Use Git branches for each agent
- Merge to main after testing

**Phase 3 (Parallel):**
- Agent 09, 10, 11, 12 can work simultaneously
- Depend on Agent 08 completion
- Merge to develop branch

**Phase 4 (Sequential):**
- Agent 13 integrates everything
- Final testing and polish

### Communication

- Use clear commit messages: `feat(agent-05): Add job search filters`
- Reference agent docs in pull requests
- Tag relevant reviewers for each feature

---

## 📝 Version History

- **v1.0** (2025-02-05): Initial agent documentation created
- Based on evaluation findings and project specifications

---

## 🎉 Success Metrics

When all agents complete their tasks, the result will be:

1. ✅ Complete IndOz.work application rebuilt
2. ✅ All evaluation issues fixed
3. ✅ Premium features implemented
4. ✅ Accessible to all users
5. ✅ Responsive on all devices
6. ✅ Production-ready code

---

**Let's build something amazing!** 🚀

---

*For questions or clarifications, refer to individual agent documentation files.*
