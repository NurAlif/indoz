# AGENT 09: Documents Vault (Premium)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 08 (Premium System)
**Priority:** HIGH - Core premium feature

---

## 🎯 Your Mission

Build a document tracking system with progress bar, upload functionality, and celebration feedback when all documents are complete.

---

## 📚 Required Reading (Read FIRST)

1. **[../Prompt.md](../Prompt.md)** - Section 3.7 (Documents Vault spec)
2. **[../final-evaluation.md](../final-evaluation.md)** - Section 9 (Documents issues)
3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - Components & utilities
4. **Screenshot:** `../indoz-dokumen.png`

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ✅ **ADD** legend/tooltip for status (Saved vs Verified)
2. ✅ **ADD** celebration feedback when 8/8 complete (green progress bar, checkmark)
3. ✅ **ADD** explanation of menu purpose at the start
4. ✅ **ADD** upload feature with file validation and auto-compress

### MUST KEEP:

- Progress bar with numeric indicator (8/8)
- Checklist for document requirements

---

## 📋 Implementation Overview

### Key Components:

1. **DocumentsVault.jsx** - Main container with progress tracking
2. **DocumentSection.jsx** - Grouped documents by category
3. **DocumentCard.jsx** - Individual document with status
4. **UploadModal.jsx** - File upload with validation

### Progress Calculation:

```javascript
const progress = documents.filter(d => d.status === 'verified' || d.status === 'saved').length;
const total = documents.length;
const percentage = (progress / total) * 100;

// When complete (8/8):
if (progress === total && total > 0) {
  // Show celebration: green bar, confetti, checkmark
}
```

### Status Types:

- **Empty** (⬜): Not uploaded
- **Saved** (📁): Uploaded, not verified
- **Verified** (✅): Verified by user/system

---

## ✅ Deliverables

```
src/components/premium/
├── DocumentsVault/
│   ├── DocumentsVault.jsx      ✅ Main container
│   ├── DocumentSection.jsx     ✅ Section group
│   ├── DocumentCard.jsx        ✅ Individual card
│   └── UploadModal.jsx         ✅ Upload dialog
```

---

## ⚠️ Important Notes

1. **DO** validate file uploads (PDF, max 4MB)
2. **DO** compress images automatically if needed
3. **DO NOT** skip celebration feedback - it's motivating
4. **DO** explain the purpose at the top of the page
5. **DO** provide clear legend for status types

**Reference:** `../indoz-dokumen.png` for visual layout
