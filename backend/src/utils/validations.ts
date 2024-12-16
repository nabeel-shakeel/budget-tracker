import { Request } from 'express';
import { Expense } from '../types/expense';
import { ValidationError } from './errors';

export const validateExpenseInput = (
  data: Expense & { id: string },
  isUpdate = false
) => {
  const { id, title, price, date } = data;

  if (isUpdate && (!id || typeof id !== 'string')) {
    throw new ValidationError(
      'Expense ID is required and must be a valid string'
    );
  }

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw new ValidationError(
      'Title is required and must be a non-empty string'
    );
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    throw new ValidationError(
      'Price is required and must be a positive number'
    );
  }

  if (!date || isNaN(Date.parse(date))) {
    throw new ValidationError('Date is required and must be a valid date');
  }
};

export const validateQueryParams = (query: Request['query']) => {
  const { page, limit, date } = query;

  // Validate pagination parameters
  if (page && (!Number.isInteger(+page) || +page <= 0)) {
    throw new ValidationError('Page must be a positive integer');
  }

  if (limit && (!Number.isInteger(+limit) || +limit <= 0)) {
    throw new ValidationError('Limit must be a positive integer');
  }

  // Validate date
  if (date && isNaN(Date.parse(date as string))) {
    throw new ValidationError('Date must be a valid ISO string');
  }
};
