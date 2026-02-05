# AGENT 01: Foundation & Infrastructure

**Status:** SEQUENTIAL (MUST BE DONE FIRST)
**Dependencies:** None
**Outputs Required:** Foundation codebase ready for other agents

---

## 🎯 Your Mission

Build the foundational infrastructure that ALL other agents will depend on. You are creating the bedrock of the entire application.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Phase 1 (Project Setup & Foundation)
   - Focus on: Section 1.3 (Color Palette with CSS variables)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: System Level issues (MUST FIX)
   - Focus on: All "Good Practices" to maintain

3. **Screenshots to Reference:**
   - View all screenshots in `../` to understand the visual style

---

## 🎨 Design System & Style Guide

### Color Palette (CSS Variables)

You MUST create these exact CSS variables in `src/styles/index.css`:

```css
:root {
  /* Primary Brand Colors */
  --indo-red: #C41E3A;        /* Bold, professional red */
  --oz-gold: #D4AF37;         /* Warm, reliable gold */

  /* Semantic Colors */
  --success: #10B981;         /* Green for success */
  --warning: #F59E0B;         /* Orange/amber for warnings */
  --error: #EF4444;           /* Red for errors */
  --info: #3B82F6;            /* Blue for information */

  /* Neutral Colors */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

### Typography

- Font family: Use Inter (already configured in Tailwind)
- Headings: Bold, tight tracking
- Body: Regular/medium, comfortable line-height (1.5-1.6)

### Component Standards

ALL components you build must follow:

1. **Borders:** Use `--gray-200` for subtle borders
2. **Shadows:** Use Tailwind's shadow-sm, shadow-md
3. **Rounded corners:** Consistent rounded-lg (8px) or rounded-xl (12px)
4. **Spacing:** Use Tailwind's spacing scale consistently
5. **Interactive states:**
   - Hover: Slightly darker background
   - Active: Scale down to 95%
   - Focus: ring-2 ring-[--indo-red]

---

## 🚫 CRITICAL: What NOT to Do

### MUST AVOID (from evaluation):

1. ❌ **NEVER** add `user-select: none` - users MUST be able to copy text
2. ❌ **NEVER** add `oncontextmenu="return false;"` - allow right-click
3. ❌ **NEVER** use emojis inappropriately (no flags in logo)
4. ❌ **NEVER** create white text on white background

### MUST DO:

1. ✅ Use proper contrast ratios (WCAG AA minimum)
2. ✅ Allow text selection everywhere
3. ✅ Support keyboard navigation
4. ✅ Add ARIA labels for accessibility
5. ✅ Use semantic HTML elements

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Configure Tailwind CSS

**File:** `tailwind.config.js`

Update the config to include our custom colors:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indo-red': 'var(--indo-red)',
        'oz-gold': 'var(--oz-gold)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
        'info': 'var(--info)',
      },
    },
  },
  plugins: [],
}
```

### Task 2: Update CSS Variables

**File:** `src/index.css` (or `src/styles/index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Primary Colors */
  --indo-red: #C41E3A;
  --oz-gold: #D4AF37;

  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* Neutral Colors */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}

body {
  font-family: 'Inter', sans-serif;
  @apply text-gray-800 bg-gray-50;
}

/* Allow text selection everywhere */
* {
  user-select: text;
  -webkit-user-select: text;
}

/* Allow right-click */
html {
  oncontextmenu: true;
}
```

### Task 3: Create Utility Functions

**File:** `src/utils/cn.js`

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes intelligently
 * @param {...string} inputs - Class names to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**File:** `src/utils/validation.js`

```javascript
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
```

### Task 4: Create Custom Hooks

**File:** `src/hooks/useLocalStorage.js`

```javascript
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage localStorage with state
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
```

### Task 5: Create Common Components

Create ALL components in `src/components/common/`:

#### Button.jsx

```jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger
  size = 'md', // sm | md | lg
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indo-red text-white hover:bg-red-700 focus:ring-indo-red",
    secondary: "bg-oz-gold text-white hover:bg-yellow-600 focus:ring-oz-gold",
    outline: "border-2 border-indo-red text-indo-red hover:bg-indo-red hover:text-white focus:ring-indo-red",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    danger: "bg-error text-white hover:bg-red-600 focus:ring-error",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
```

#### Card.jsx

```jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({
  children,
  className = '',
  variant = 'default', // default | elevated | bordered
  ...props
}, ref) => {
  const variants = {
    default: "bg-white",
    elevated: "bg-white shadow-md",
    bordered: "bg-white border border-gray-200",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
```

#### Input.jsx

```jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const inputStyles = cn(
    "w-full px-4 py-2 border rounded-lg",
    "focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent",
    "transition-all duration-200",
    "disabled:bg-gray-100 disabled:cursor-not-allowed",
    error ? "border-error" : "border-gray-300",
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
```

#### Modal.jsx

```jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md', // sm | md | lg | xl
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "bg-white rounded-xl shadow-xl w-full",
          sizes[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

#### Skeleton.jsx

```jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded",
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
```

#### Tooltip.jsx

```jsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const Tooltip = ({
  children,
  content,
  position = 'top', // top | bottom | left | right
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap",
            positions[position],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
```

### Task 6: Setup Routing

**File:** `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Foundation Ready - Agent 02 will build navigation</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## ✅ Checklist Before Completing

- [ ] Tailwind config updated with custom colors
- [ ] CSS variables defined in index.css
- [ ] All utility functions created (cn.js, validation.js)
- [ ] All hooks created (useLocalStorage.js)
- [ ] All common components created:
  - [ ] Button.jsx
  - [ ] Card.jsx
  - [ ] Input.jsx
  - [ ] Modal.jsx
  - [ ] Skeleton.jsx
  - [ ] Tooltip.jsx
- [ ] Routing setup in App.jsx
- [ ] NO user-select restrictions anywhere
- [ ] NO oncontextmenu blocks
- [ ] All components use semantic HTML
- [ ] All components have ARIA labels where appropriate
- [ ] Tested: All components render without errors

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── common/
│       ├── Button.jsx       ✅
│       ├── Card.jsx         ✅
│       ├── Input.jsx        ✅
│       ├── Modal.jsx        ✅
│       ├── Skeleton.jsx     ✅
│       └── Tooltip.jsx      ✅
├── hooks/
│   └── useLocalStorage.js  ✅
├── utils/
│   ├── cn.js                ✅
│   └── validation.js        ✅
└── App.jsx                  ✅ (basic routing setup)
```

---

## 🚀 Next Steps

After you complete this foundation:
1. **Agent 02** will build Navigation & Layout
2. **Agent 03** will build Onboarding Modal
3. Then Agents 04-13 can work in parallel

---

## ⚠️ Important Notes

1. **DO NOT** skip any components - all agents depend on them
2. **DO NOT** change color values - they're brand standards
3. **DO NOT** add user restrictions (user-select, oncontextmenu)
4. **DO** ensure all components are properly typed/commented
5. **DO** test each component renders correctly

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 4.2 for full code organization
- [../final-evaluation.md](../final-evaluation.md) - For what to avoid
