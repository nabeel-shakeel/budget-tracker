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
expenseRouter.put('/', updateExpense);
expenseRouter.delete('/:id', deleteExpense);
expenseRouter.get('/trend', getBudgetTrend);

export { expenseRouter };
