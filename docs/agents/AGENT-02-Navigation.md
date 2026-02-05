# AGENT 02: Navigation & Layout

**Status:** SEQUENTIAL (Must complete after Agent 01)
**Dependencies:** Agent 01 (Foundation)
**Outputs Required:** TopBar navigation, Logo, Routing structure

---

## 🎯 Your Mission

Build the main navigation system that will be used throughout the entire application. You're creating the "highway" that connects all features.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.1 (Navigation Structure)
   - Focus on: Section 2.1 (Navigation MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 2 (Top Bar / Navigasi) - all issues and good practices

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - Foundation setup
   - You'll use components from this agent

4. **Screenshots to Reference:**
   - `../topbar.png` - Visual reference for navigation

---

## 🎨 Navigation Requirements

### FLATTENED Navigation (CRITICAL)

You MUST create a **flattened** navigation with:
- ❌ **NO dropdown** menus
- ❌ **NO breadcrumb** navigation
- ✅ All 4 main menu items visible directly in topbar

### Menu Items (Left to Right)

1. **Logo:** "IndOz" wordmark (modern, NO flags)
   - Click → Reset to home view (route to `/`)
   - Use Inter font, bold, indored color

2. **Main Menu Items:**
   - "AI Chat" (default active)
   - "Cari Lowongan"
   - "Cek Resume"
   - "Panduan Lengkap"

3. **Action Button (Right):**
   - "Masuk" / "Login" button
   - Variant: primary (Indo Red)

### Active State Design

- Red indicator bar (4px height) below active item
- Bold text for active menu
- Consistent across ALL menu items
- Red color: `--indo-red` (#C41E3A)

---

## 🚨 CRITICAL Issues from Evaluation

### MUST FIX:

1. ❌ **REMOVE** "Tools & Guides" dropdown → Flatten to direct links
2. ❌ **REMOVE** breadcrumb → Only 1 level, useless
3. ❌ **REMOVE** 🇮🇩 emoji from logo → Confusing, not a language switcher
4. ✅ **STANDARDIZE** active states → All menu items use same red indicator bar

### MUST KEEP (Good Practices):

- Bar indikator merah di bawah active menu
- Logo sebagai "Home" button
- Ikon mendampingi label teks (if using icons)

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create TopBar Component

**File:** `src/components/layout/TopBar.jsx`

```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { name: 'AI Chat', path: '/chat' },
  { name: 'Cari Lowongan', path: '/jobs' },
  { name: 'Cek Resume', path: '/resume' },
  { name: 'Panduan Lengkap', path: '/guides' },
];

const TopBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-indo-red hover:text-red-700 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>IndOz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/chat' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indo-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link to="/login" className="btn-primary">
              Masuk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/chat' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indo-red/10 text-indo-red"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/login"
              className="block w-full px-4 py-2 text-center text-sm font-medium bg-indo-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
```

### Task 2: Update App.jsx with Routes

**File:** `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';

// Placeholder pages - other agents will build these
const AIChat = () => <div className="pt-20 px-4">AI Chat - Agent 04 will build this</div>;
const JobSearch = () => <div className="pt-20 px-4">Cari Lowongan - Agent 05 will build this</div>;
const ResumeChecker = () => <div className="pt-20 px-4">Cek Resume - Agent 06 will build this</div>;
const Guides = () => <div className="pt-20 px-4">Panduan Lengkap - Agent 07 will build this</div>;
const Login = () => <div className="pt-20 px-4">Login Page</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <TopBar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<AIChat />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/resume" element={<ResumeChecker />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Task 3: Add Custom Button Styles to index.css

**File:** `src/index.css` (append to existing)

```css
/* Custom button styles */
.btn-primary {
  @apply px-6 py-2 bg-indo-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors;
}

.btn-secondary {
  @apply px-6 py-2 bg-oz-gold text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors;
}

.btn-outline {
  @apply px-6 py-2 border-2 border-indo-red text-indo-red font-medium rounded-lg hover:bg-indo-red hover:text-white transition-colors;
}
```

### Task 4: Create Footer Component (Optional but Recommended)

**File:** `src/components/layout/Footer.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">IndOz</h3>
            <p className="text-sm">
              Gerbang Karir & Residensial Australia untuk Indonesia
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Chat</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Cari Lowongan</Link></li>
              <li><Link to="/resume" className="hover:text-white transition-colors">Cek Resume</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Panduan Lengkap</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guides" className="hover:text-white transition-colors">Panduan</Link></li>
              <li><a href="#feedback" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} IndOz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### Task 5: Update App.jsx to Include Footer

```jsx
// ... imports
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TopBar />

        <main className="flex-grow">
          <Routes>
            {/* ... existing routes */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
```

---

## ✅ Checklist Before Completing

- [ ] TopBar component created with flattened navigation
- [ ] NO dropdown menus (only direct links)
- [ ] NO breadcrumb navigation
- [ ] Logo "IndOz" without flags/emojis
- [ ] Red indicator bar (4px) on active menu item
- [ ] Active state consistent across all menu items
- [ ] Mobile menu with hamburger icon
- [ ] Login button visible (primary variant)
- [ ] Routes configured in App.jsx
- [ ] Footer component created
- [ ] All links use React Router
- [ ] Responsive design works (desktop + mobile)
- [ ] Tested: Clicking logo goes to home
- [ ] Tested: Active menu shows red indicator
- [ ] Tested: Mobile menu opens/closes correctly

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── layout/
│       ├── TopBar.jsx         ✅
│       └── Footer.jsx         ✅
└── App.jsx                    ✅ (updated with routes)
```

---

## 🎨 Visual Reference

Your TopBar should look like this:

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  IndOz  AI Chat | Cari Lowongan | Cek Resume | Panduan    │
│  (Logo)  ──────                    Lengkap      [Masuk]   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

With red bar under active item:

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  IndOz  AI Chat | Cari Lowongan | Cek Resume | Panduan    │
│  (Logo)  ██████                   Lengkap      [Masuk]   │
│          ← red bar                                         │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 Next Steps

After you complete the navigation:
1. **Agent 03** will build Onboarding Modal
2. Then Agents 04-13 can work in parallel on their features

---

## ⚠️ Important Notes

1. **DO NOT** create dropdown menus - navigation must be flat
2. **DO NOT** add breadcrumb - it's useless for 1-level navigation
3. **DO NOT** use flags or emojis in logo
4. **DO** ensure active state is identical for all menu items
5. **DO** test mobile responsiveness thoroughly
6. **DO** use React Router for all navigation

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.1 for navigation requirements
- [../final-evaluation.md](../final-evaluation.md) - Section 2 for navigation issues
- [../topbar.png](../topbar.png) - Visual reference
