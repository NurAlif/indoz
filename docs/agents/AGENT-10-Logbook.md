# AGENT 10: 88 Days Logbook (Premium)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 08 (Premium System)
**Priority:** HIGH - Critical WHV requirement tracking

---

## 🎯 Your Mission

Build an 88 Days work logbook with bulk entry feature, keyboard shortcuts, and clear validation for tracking WHV extension requirements.

---

## 📚 Required Reading (Read FIRST)

1. **[../Prompt.md](../Prompt.md)** - Section 3.7 (88 Days Logbook spec)
2. **[../final-evaluation.md](../final-evaluation.md)** - Section 10 (Logbook issues)
3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - Components & utilities
4. **Screenshot:** `../indoz-logboook.png`

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ✅ **ADD** bulk entry feature (add multiple days at once)
2. ✅ **ADD** specific error messages for invalid entries (future dates, etc.)
3. ✅ **ADD** explanation: "Catat hari kerja untuk memenuhi syarat 88 days WHV"
4. ✅ **ADD** use case clarification: tracking saat bekerja di Australia
5. ❌ **REMOVE** dark mode toggle (inappropriate location)

### MUST KEEP:

- Progress bar with "3 / 88 Hari" display
- Quick-add buttons (+1 Day, +1 Week)

---

## 📋 Implementation Overview

### Key Components:

1. **Logbook.jsx** - Main container
2. **ProgressHeader.jsx** - Shows 3/88 progress
3. **LogbookTable.jsx** - Lists entries
4. **BulkEntryModal.jsx** - Add multiple days
5. **EntryForm.jsx** - Single entry form

### Bulk Entry Feature:

```javascript
// Bulk Entry Modal
const BulkEntryModal = ({ onAdd, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employer, setEmployer] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    // Calculate days between start and end
    const entries = generateEntries(startDate, endDate, employer, hoursPerDay, location);
    onAdd(entries);
    onClose();
  };

  return (
    <Modal>
      <h3>Bulk Add Work Days</h3>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <input value={employer} onChange={e => setEmployer(e.target.value)} placeholder="Employer" />
      <input type="number" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={handleSubmit}>Add {calculateDays(startDate, endDate)} Days</button>
    </Modal>
  );
};
```

### Keyboard Shortcuts:

```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    // Ctrl+N: New entry
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      setIsModalOpen(true);
    }
    // Ctrl+S: Save (if form open)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Validation:

```javascript
const validateEntry = (entry) => {
  const errors = [];

  // Check for future date
  if (new Date(entry.date) > new Date()) {
    errors.push('Tanggal tidak boleh di masa depan');
  }

  // Check for reasonable hours
  if (entry.hours < 1 || entry.hours > 24) {
    errors.push('Jam kerja harus antara 1-24 jam');
  }

  // Check for required fields
  if (!entry.employer) {
    errors.push('Nama employer wajib diisi');
  }

  return errors;
};
```

---

## ✅ Deliverables

```
src/components/premium/
└── Logbook/
    ├── Logbook.jsx            ✅ Main container
    ├── ProgressHeader.jsx     ✅ 3/88 progress
    ├── LogbookTable.jsx       ✅ Entry list
    ├── BulkEntryModal.jsx     ✅ Bulk add
    └── EntryForm.jsx          ✅ Single entry
```

---

## ⚠️ Important Notes

1. **MUST ADD** bulk entry - this is critical for UX
2. **DO NOT** show dark mode toggle
3. **DO** provide specific error messages
4. **DO** implement keyboard shortcuts (Ctrl+N, Ctrl+S)
5. **DO** explain the purpose at the top

**Reference:** `../indoz-logboook.png` for visual layout
