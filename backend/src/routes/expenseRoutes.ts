import express from 'express';
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getBudgetTrend,
} from '../controllers/expenseController';
import { authenticate } from '../middleware/authMiddleware';

const expenseRouter = express.Router();

expenseRouter.use(authenticate);

expenseRouter.get('/', getExpenses);
expenseRouter.post('/', addExpense);
expenseRouter.put('/:id', updateExpense);
expenseRouter.delete('/:id', deleteExpense);
expenseRouter.get('/budget-trend', getBudgetTrend);

export { expenseRouter };
