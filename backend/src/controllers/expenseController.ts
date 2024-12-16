import { Request, Response } from 'express';
import {
  getExpenses,
  saveExpense,
  modifyExpense,
  removeExpense,
  calculateBudgetTrend,
} from '../services/expenseService';
import { validateExpenseInput } from '../utils/validations';
import { handleError } from '../utils/errors';
import { AddExpenseReqBody } from '../types/expense';

export const fetchExpenses = async (req: Request, res: Response) => {
  try {
    const { user, query } = req;
    const { _id: userId, role } = user!;

    const isAdmin = role === 'admin';
    const response = await getExpenses(userId as string, isAdmin, query);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { body, user } = req;
    validateExpenseInput(body);
    const payload: AddExpenseReqBody = { ...body, userId: user?._id as string };
    const newExpense = await saveExpense(payload);
    res.status(201).json(newExpense);
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    validateExpenseInput(req.body, true);
    const updatedExpense = await modifyExpense(req.body);
    res.status(200).json(updatedExpense);
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await removeExpense(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const getBudgetTrend = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { range } = req.query;
    const trend = await calculateBudgetTrend(
      user?._id as string,
      range as string
    );
    res.status(200).json({ trend });
  } catch (error) {
    handleError(res, error as Error);
  }
};
