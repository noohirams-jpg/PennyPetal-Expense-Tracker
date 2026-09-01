export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  note: string;
  createdAt: string;
  walletId?: string;
};

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  icon: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  isCustom: boolean;
};

export type Budget = {
  amount: number;
  month: string;
  updatedAt: string;
};

export type FinanceData = {
  transactions: Transaction[];
  wallets: Wallet[];
  categories: Category[];
  budget: Budget;
  demoCleared: boolean;
};

const KEY = 'pennypetal-finance-v1';
const builtInCategories: Category[] = [
  { id: 'food', name: 'Food & drinks', icon: 'utensils', type: 'expense', isCustom: false },
  { id: 'travel', name: 'Travel', icon: 'bus', type: 'expense', isCustom: false },
  { id: 'home', name: 'Home', icon: 'home', type: 'expense', isCustom: false },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', type: 'expense', isCustom: false },
  { id: 'health', name: 'Health', icon: 'heart-pulse', type: 'expense', isCustom: false },
  { id: 'bills', name: 'Bills', icon: 'receipt', type: 'expense', isCustom: false },
  { id: 'salary', name: 'Salary', icon: 'briefcase-business', type: 'income', isCustom: false },
  { id: 'other-income', name: 'Other income', icon: 'sparkles', type: 'income', isCustom: false },
];

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const initialData: FinanceData = {
  demoCleared: false,
  wallets: [
    { id: 'cash', name: 'Everyday cash', balance: 12400, icon: 'wallet-cards', createdAt: new Date().toISOString() },
    { id: 'savings', name: 'Little nest egg', balance: 38200, icon: 'landmark', createdAt: new Date().toISOString() },
  ],
  categories: builtInCategories,
  budget: { amount: 24000, month: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`, updatedAt: new Date().toISOString() },
  transactions: [
    { id: 'demo-1', type: 'expense', amount: 280, category: 'food', date: iso(0), paymentMethod: 'UPI', note: 'Filter coffee and dosa', createdAt: new Date().toISOString(), walletId: 'cash' },
    { id: 'demo-2', type: 'expense', amount: 640, category: 'travel', date: iso(-1), paymentMethod: 'Card', note: 'Metro recharge', createdAt: new Date().toISOString(), walletId: 'cash' },
    { id: 'demo-3', type: 'income', amount: 48500, category: 'salary', date: iso(-3), paymentMethod: 'Bank transfer', note: 'Monthly salary', createdAt: new Date().toISOString(), walletId: 'savings' },
    { id: 'demo-4', type: 'expense', amount: 1250, category: 'home', date: iso(-4), paymentMethod: 'UPI', note: 'Fresh flowers', createdAt: new Date().toISOString(), walletId: 'cash' },
    { id: 'demo-5', type: 'expense', amount: 890, category: 'shopping', date: iso(-7), paymentMethod: 'Card', note: 'A new linen shirt', createdAt: new Date().toISOString(), walletId: 'cash' },
  ],
};

export function loadFinanceData(): FinanceData {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(initialData));
      return initialData;
    }
    const parsed = JSON.parse(raw) as FinanceData;
    return { ...initialData, ...parsed, categories: parsed.categories?.length ? parsed.categories : builtInCategories };
  } catch {
    return initialData;
  }
}

export function saveFinanceData(data: FinanceData) {
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

export const builtInCategoryIds = new Set(builtInCategories.map((category) => category.id));