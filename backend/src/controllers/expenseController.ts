import { Request, Response } from 'express';
import { startOfMonth, subMonths, endOfMonth, ISOStringFormat } from 'date-fns';
import Expense from '../models/expense';
import { IUser } from '../models/user';
import { monthNames } from '../utils/constants';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const getExpenses = async (req: Request, res: Response) => {
  const { date, keyword, sort, page = 1, limit = 10 } = req.query;

  const filters: any = { userId: req.user?._id };

  // Filter by date (default to today's date)
  if (date) {
    const selectedDate = new Date(date as ISOStringFormat);
    filters.date = {
      $gte: selectedDate.setHours(0, 0, 0, 0),
      $lte: selectedDate.setHours(23, 59, 59, 999),
    };
  } else {
    const today = new Date();
    filters.date = {
      $gte: today.setHours(0, 0, 0, 0),
      $lte: today.setHours(23, 59, 59, 999),
    };
  }

  // Filter by keyword in the title
  if (keyword) {
    filters.title = { $regex: keyword, $options: 'i' };
  }

  // Sorting
  const sortOptions: any = {};
  if (sort === 'price_high') sortOptions.price = -1; // Highest to lowest
  if (sort === 'price_low') sortOptions.price = 1; // Lowest to highest
  if (sort === 'date_new') sortOptions.date = -1; // Newest to oldest
  if (sort === 'date_old') sortOptions.date = 1; // Oldest to newest

  try {
    const expenses = await Expense.find(filters)
      .sort(sortOptions)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Expense.countDocuments(filters);

    // Calculate total expenditure for the month
    const startOfMonthDate = startOfMonth(new Date());
    const endOfMonthDate = endOfMonth(new Date());
    const monthlyTotal = await Expense.aggregate([
      {
        $match: {
          userId: req.user?._id,
          date: {
            $gte: startOfMonthDate,
            $lte: endOfMonthDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
        },
      },
    ]);

    const totalExpenditure = monthlyTotal[0]?.total || 0;
    const response = {
      data: expenses.map((expense) => ({
        id: expense._id,
        title: expense.title,
        price: expense.price,
        date: expense.date.toISOString(),
        expenditure: totalExpenditure
          ? ((expense.price / totalExpenditure) * 100).toFixed(2)
          : 0,
      })),
      total,
      currentPage: +page,
      totalPages: Math.ceil(total / +limit),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  const { title, price, date } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user?._id,
      title,
      price,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(201).json({
      title,
      price,
      date,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id, title, price, date } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, price, date: new Date(date) },
      { new: true }
    );

    if (!updatedExpense) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }

    const updatedExpenseObject = updatedExpense.toObject();
    updatedExpenseObject.id = updatedExpenseObject._id;
    delete updatedExpenseObject._id;

    res.status(200).json({
      ...updatedExpenseObject,
      date: updatedExpenseObject.date.toISOString(),
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getBudgetTrend = async (req: Request, res: Response) => {
  const { range } = req.query;

  let monthsBack = 1;
  if (range === 'last6') monthsBack = 6;
  if (range === 'last12') monthsBack = 12;

  const startDate = startOfMonth(subMonths(new Date(), monthsBack));
  const endDate = endOfMonth(new Date());

  console.log('Start date: ', startDate);
  console.log('End date: ', endDate);

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: req.user?._id,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalExpenses: { $sum: '$price' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }, // Sort by year and month
      },
    ]);

    // Format budget trend data
    const trend = expenses.map((expense) => ({
      month: monthNames[expense._id.month - 1],
      value: expense.totalExpenses,
    }));

    res.status(200).json({ trend });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
