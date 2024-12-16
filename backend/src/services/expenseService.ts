import { startOfMonth, endOfMonth, subMonths } from 'date-fns';
import Expense from '../models/expense';
import { monthNames } from '../utils/constants';
import { NotFoundError } from '../utils/errors';
import { AddExpenseReqBody, UpdateExpenseReqBody } from '../types/expense';
import { IUser } from '../models/user';

export const getExpenses = async (
  userId: string,
  isAdmin: boolean,
  query: any
) => {
  const { date, keyword, sort, page = 1, limit = 10 } = query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const filters: any = {};
  const sortOptions: any = {};

  if (!isAdmin) {
    filters.userId = userId;
  }

  if (date) {
    const selectedDate = new Date(date);
    filters.date = {
      $gte: selectedDate.setHours(0, 0, 0, 0),
      $lte: selectedDate.setHours(23, 59, 59, 999),
    };
  }

  if (keyword) {
    filters.title = { $regex: keyword, $options: 'i' };
  }

  if (sort === 'price_high') sortOptions.price = -1;
  if (sort === 'price_low') sortOptions.price = 1;
  if (sort === 'date_new') sortOptions.date = -1;
  if (sort === 'date_old') sortOptions.date = 1;

  let expensesQuery = Expense.find(filters)
    .sort(sortOptions)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  if (isAdmin) {
    expensesQuery = expensesQuery.populate(
      'userId',
      'firstName lastName email'
    );
  }

  const expenses = await expensesQuery;
  const total = await Expense.countDocuments(filters);

  const startOfMonthDate = startOfMonth(new Date());
  const endOfMonthDate = endOfMonth(new Date());
  const monthlyTotal = await Expense.aggregate([
    {
      $match: {
        ...(isAdmin ? {} : { userId }),
        date: { $gte: startOfMonthDate, $lte: endOfMonthDate },
      },
    },
    {
      $group: { _id: null, total: { $sum: '$price' } },
    },
  ]);

  const totalExpenditure = monthlyTotal[0]?.total || 0;

  const expensesData = expenses.map((expense) => {
    const userDetails = expense.userId as IUser;
    return {
      id: expense._id,
      title: expense.title,
      price: expense.price,
      date: expense.date.toISOString(),
      user: isAdmin
        ? {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
          }
        : undefined,
      expenditure: totalExpenditure
        ? ((expense.price / totalExpenditure) * 100).toFixed(2)
        : 0,
    };
  });

  return {
    data: expensesData,
    total,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
  };
};

export const saveExpense = async (payload: AddExpenseReqBody) => {
  const newExpense = new Expense(payload);
  await newExpense.save();
  return payload;
};

export const modifyExpense = async (body: UpdateExpenseReqBody) => {
  const { id, title, price, date } = body;
  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    { title, price, date: new Date(date) },
    { new: true }
  );

  if (!updatedExpense) throw new NotFoundError('Expense not found');

  const updatedExpenseObject = updatedExpense.toObject();
  updatedExpenseObject.id = updatedExpenseObject._id;
  delete updatedExpenseObject._id;

  return {
    ...updatedExpenseObject,
    date: updatedExpenseObject.date.toISOString(),
  };
};

export const removeExpense = async (id: string) => {
  const deletedExpense = await Expense.findByIdAndDelete(id);
  if (!deletedExpense) throw new NotFoundError('Expense not found');
  return id;
};

export const calculateBudgetTrend = async (userId: string, range: string) => {
  const monthsBack = range === 'last6' ? 6 : range === 'last12' ? 12 : 1;
  const startDate = startOfMonth(subMonths(new Date(), monthsBack));
  const endDate = endOfMonth(new Date());

  const expenses = await Expense.aggregate([
    { $match: { userId, date: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: { year: { $year: '$date' }, month: { $month: '$date' } },
        totalExpenses: { $sum: '$price' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return expenses.map((expense) => ({
    month: monthNames[expense._id.month - 1],
    value: expense.totalExpenses,
  }));
};
