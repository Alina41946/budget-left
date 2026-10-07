'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';

type Expense = {
  id: string;
  amount: number;
  createdAt: string;
};

type MonthData = {
  budget: number;
  expenses: Expense[];
};

type Store = {
  version: 1;
  defaultBudget: number;
  months: Record<string, MonthData>;
};

const STORAGE_KEY = 'budget-left:v1';
const DEFAULT_BUDGET = 30000;

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function money(value: number) {
  return new Intl.NumberFormat('zh-TW').format(Math.round(value));
}

export default function BudgetApp() {
  const [ready, setReady] = useState(false);
  const [store, setStore] = useState<Store>({
    version: 1,
    defaultBudget: DEFAULT_BUDGET,
    months: {},
  });

  const [amount, setAmount] = useState('');
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');

  const key = monthKey();

  // PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/budget-left/sw.js');
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        setStore(JSON.parse(raw));
      }
    } catch {
      // 使用預設資料即可
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  }, [store, ready]);

  const month = store.months[key] ?? {
    budget: store.defaultBudget,
    expenses: [],
  };

  const spent = useMemo(
    () => month.expenses.reduce((sum, item) => sum + item.amount, 0),
    [month.expenses],
  );

  const remaining = month.budget - spent;

  function updateMonth(next: MonthData) {
    setStore((prev) => ({
      ...prev,
      months: {
        ...prev.months,
        [key]: next,
      },
    }));
  }

  function addExpense(e: FormEvent) {
    e.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    updateMonth({
      ...month,
      expenses: [
        {
          id: crypto.randomUUID(),
          amount: Math.round(value),
          createdAt: new Date().toISOString(),
        },
        ...month.expenses,
      ],
    });

    setAmount('');
  }

  function deleteExpense(id: string) {
    updateMonth({
      ...month,
      expenses: month.expenses.filter((item) => item.id !== id),
    });
  }

  function saveBudget(e: FormEvent) {
    e.preventDefault();

    const value = Number(budgetInput);

    if (!Number.isFinite(value) || value < 0) {
      return;
    }

    const newBudget = Math.round(value);

    updateMonth({
      ...month,
      budget: newBudget,
    });

    setStore((prev) => ({
      ...prev,
      defaultBudget: newBudget,
    }));

    setEditingBudget(false);
  }

  function resetMonth() {
    if (!confirm('確定要清除本月所有支出紀錄嗎？')) {
      return;
    }

    updateMonth({
      ...month,
      expenses: [],
    });
  }

  if (!ready) {
    return (
      <main className="shell">
        <div className="loading">載入中…</div>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="card">
        {/* 設定 */}
        <header className="topbar">
          <div />

          <button
            className="ghost"
            onClick={() => {
              setBudgetInput(String(month.budget));
              setEditingBudget(true);
            }}
          >
            設定
          </button>
        </header>

        {/* 可用預算 */}
        <div className={`hero ${remaining < 0 ? 'over' : ''}`}>
          <span>{remaining >= 0 ? '可用預算' : '已超出預算'}</span>

          <strong>NT$ {money(Math.abs(remaining))}</strong>
        </div>

        {/* 預算統計 */}
        <div className="stats">
          <div>
            <span>月預算</span>
            <b>NT$ {money(month.budget)}</b>
          </div>

          <div>
            <span>已花費</span>
            <b>NT$ {money(spent)}</b>
          </div>
        </div>

        {/* 新增支出 */}
        <form className="expense-form" onSubmit={addExpense}>
          <input
            inputMode="numeric"
            type="number"
            min="1"
            step="1"
            placeholder="輸入支出金額"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="支出金額"
          />

          <button type="submit">＋ 新增支出</button>
        </form>

        {/* 支出紀錄 */}
        <div className="records-head">
          <h2>支出紀錄</h2>

          {month.expenses.length > 0 && (
            <button className="text-btn" onClick={resetMonth}>
              清除本月
            </button>
          )}
        </div>

        {month.expenses.length === 0 ? (
          <div className="empty">還沒有支出紀錄</div>
        ) : (
          <ul className="records">
            {month.expenses.map((item) => (
              <li key={item.id}>
                <div>
                  <b>NT$ {money(item.amount)}</b>

                  <span>
                    {new Date(item.createdAt).toLocaleString('zh-TW', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <button
                  aria-label="刪除支出"
                  onClick={() => deleteExpense(item.id)}
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 設定預算視窗 */}
      {editingBudget && (
        <div className="overlay" role="dialog" aria-modal="true">
          <form className="modal" onSubmit={saveBudget}>
            <h2>設定本月預算</h2>

            <input
              autoFocus
              inputMode="numeric"
              type="number"
              min="0"
              step="1"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setEditingBudget(false)}
              >
                取消
              </button>

              <button type="submit">儲存</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
