# Local-First Personal Finance Tracker

## Goal
Build a privacy-focused budget tracker with receipt OCR, spending categorization, and trend analysis. Everything runs locally - no cloud, no backend, pure browser-based with IndexedDB persistence.

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS
- **OCR**: Tesseract.js (runs entirely in browser)
- **Storage**: IndexedDB (via Dexie.js for easier API)
- **Charts**: Recharts or Chart.js
- **Camera**: Browser's MediaDevices API

## Core Features
1. **Receipt Capture**: Take photo or upload image of receipt
2. **OCR Processing**: Extract merchant name, total amount, date
3. **Manual Entry**: Fallback for non-receipt transactions
4. **Categorization**: Assign categories (food, transport, entertainment, etc.)
5. **Dashboard**: Monthly spending breakdown, trends, budgets
6. **Reports**: Spending by category, merchant frequency, date ranges

## Quick Start
```bash
npm create vite@latest finance-tracker -- --template react-ts
cd finance-tracker
npm install
npm install tesseract.js dexie dexie-react-hooks recharts tailwindcss autoprefixer postcss
npm install date-fns
npx tailwindcss init -p
```

## Database Schema (Dexie)
```typescript
import Dexie, { Table } from 'dexie';

interface Transaction {
  id?: number;
  date: Date;
  merchant: string;
  amount: number;
  category: string;
  notes?: string;
  receiptImage?: string; // Base64 or blob URL
  createdAt: Date;
}

class FinanceDB extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super('FinanceDB');
    this.version(1).stores({
      transactions: '++id, date, category, merchant, amount'
    });
  }
}

export const db = new FinanceDB();
```

## OCR Implementation
```typescript
import Tesseract from 'tesseract.js';

async function processReceipt(imageFile: File) {
  const { data: { text } } = await Tesseract.recognize(
    imageFile,
    'eng',
    {
      logger: m => console.log(m) // Progress updates
    }
  );
  
  // Parse the extracted text
  const amount = extractAmount(text);
  const merchant = extractMerchant(text);
  const date = extractDate(text);
  
  return { amount, merchant, date, rawText: text };
}
```

## Receipt Parsing Strategies
- **Amount**: Regex for currency patterns `$XX.XX`, `TOTAL`, `AMOUNT DUE`
- **Merchant**: Usually at top of receipt, or look for `STORE`, `SHOP`
- **Date**: Look for date patterns `MM/DD/YYYY`, `DD-MM-YYYY`
- **Fallback**: Show extracted text, let user correct/confirm

## Categories
Predefined categories:
- 🍔 Food & Dining
- 🚗 Transportation
- 🏠 Housing
- 💡 Utilities
- 🎬 Entertainment
- 🛒 Shopping
- 💊 Healthcare
- ✈️ Travel
- 📚 Education
- 💰 Other

## Core Views

### 1. Add Transaction
- Camera button → Capture receipt → Process with OCR
- Upload button → Select image → Process with OCR
- Manual entry form as fallback
- Show preview of extracted data for confirmation

### 2. Dashboard
- Current month spending total
- Spending by category (pie/donut chart)
- Recent transactions list
- Budget warnings if set

### 3. Trends
- Line chart: Spending over time (weekly/monthly)
- Bar chart: Month-over-month comparison
- Top merchants by frequency and amount
- Category breakdown over time

### 4. Transaction List
- Filterable by date range, category, merchant
- Searchable by notes/merchant name
- Edit/delete functionality
- Sort by date, amount, category

## Development Approach
1. Set up Dexie database and basic CRUD operations
2. Build manual transaction entry form (no OCR yet)
3. Create dashboard with simple charts
4. Add camera/upload functionality
5. Integrate Tesseract.js for OCR
6. Implement receipt parsing logic
7. Polish UI and add budget features

## Budget Features (Stretch)
- Set monthly budget per category
- Visual indicators when approaching limit
- Notifications when exceeding budget
- Budget vs. actual comparison charts

## Stretch Goals
- Recurring transaction templates (rent, subscriptions)
- Export to CSV/Excel
- Dark mode
- Multi-currency support
- Split transactions (shared expenses)
- Tag system for custom organization
- Receipt gallery view
- Predictive categorization (ML based on merchant)
- Budget forecasting
- Savings goals tracker

## Privacy & Performance Notes
- All data stays in browser - emphasize this in UI
- IndexedDB can handle thousands of transactions
- Tesseract.js is CPU-intensive - show loading indicator
- Consider Web Worker for OCR to avoid blocking UI
- Optionally allow export for backup (download JSON)

## Camera Implementation
```typescript
// Use browser's media devices API
const stream = await navigator.mediaDevices.getUserMedia({ 
  video: { facingMode: 'environment' } // Use back camera on mobile
});

// Capture frame from video stream
const canvas = document.createElement('canvas');
canvas.getContext('2d')?.drawImage(videoElement, 0, 0);
const imageBlob = await canvas.toBlob();
```

## Testing Tips
- Use sample receipt images for testing OCR
- Test with various receipt formats (retail, restaurant, gas)
- OCR accuracy varies - always allow manual correction
- Mobile camera quality affects OCR results
