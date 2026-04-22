const EMPTY_FORM = { title: '', amount: '' };
import { formatCurrency } from '../utils/utils';
function ExpenseForm({
  form,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className='entry-card'>
      <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
      <form className='entry-form' onSubmit={onSubmit}>
        <input
          name='title'
          value={form.title}
          onChange={onChange}
          placeholder='Expense title'
          autoComplete='off'
        />
        <input
          name='amount'
          type='number'
          value={form.amount}
          onChange={onChange}
          placeholder='Amount'
          min='0'
          step='0.01'
        />
        <div className='entry-actions'>
          {isEditing && (
            <button type='button' className='entry-btn entry-btn-secondary' onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type='submit' className='entry-btn entry-btn-primary'>
            {isEditing ? 'Save' : 'Add'}
          </button>
        </div>
      </form>
    </section>
  );
}

ExpenseForm.EMPTY_FORM = EMPTY_FORM;

export default ExpenseForm;
