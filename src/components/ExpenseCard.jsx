import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/utils';

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className='expense-item'>
      <div className='expense-row'>
        <h3 className='expense-title'>{expense.title}</h3>
        <div className='expense-meta'>
          <p className='expense-amount'>{formatCurrency(expense.amount)}</p>
          <div className='expense-actions'>
            <button
              type='button'
              onClick={() => onEdit(expense)}
              className='icon-btn'
              aria-label='Edit expense'
              title='Edit'
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
            <button
              type='button'
              onClick={() => onDelete(expense.id)}
              className='icon-btn icon-btn-danger'
              aria-label='Delete expense'
              title='Delete'
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
