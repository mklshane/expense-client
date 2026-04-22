import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ExpenseCard from './components/ExpenseCard';
import ExpenseForm from './components/ExpenseForm';
const API = 'http://localhost:3000/api/expenses';
const formatCurrency = (value) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(Number(value) || 0);
const EMPTY_FORM = { title: '', amount: '' };

function App() {
  const [expenses, setExpenses]    = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setExpenses(res.data.data ?? []);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((exp) =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpend = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  const addExpense = async (payload) => {
    try {
      await axios.post(API, payload);
      await fetchExpenses();
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const updateExpense = async (id, payload) => {
    try {
      await axios.put(`${API}/${id}`, payload);
      await fetchExpenses();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      title: expense.title ?? '',
      amount: String(expense.amount ?? ''),
    });
  };

  const handleInlineSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.amount) return;

    const payload = {
      title: form.title.trim(),
      amount: Number(form.amount),
    };

    if (editingId) {
      await updateExpense(editingId, payload);
    } else {
      await addExpense(payload);
    }

    resetForm();
  };

  return (
    <main className='basic-app'>
      <header className='basic-header'>
        <h1>Expense Tracker</h1>
        <p>Manage expenses efficiently</p>
      </header>

      <section className='total-card'>
        <p className='total-label'>Total Expenses</p>
        <p className='total-value'>{formatCurrency(totalSpend)}</p>
      </section>

      <ExpenseForm
        form={form}
        isEditing={Boolean(editingId)}
        onChange={handleFormChange}
        onSubmit={handleInlineSubmit}
        onCancel={resetForm}
      />

      <section className='history-card'>
        <h2>Expense History</h2>
        <SearchBar query={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <p className='empty-state'>Loading expenses...</p>
        ) : (
          <div className='expense-list'>
            {filteredExpenses.length === 0 && (
              <p className='empty-state'>No expenses found.</p>
            )}
            {filteredExpenses.map((exp) => (
              <ExpenseCard
                key={exp.id}
                expense={exp}
                onDelete={deleteExpense}
                onEdit={startEdit}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;