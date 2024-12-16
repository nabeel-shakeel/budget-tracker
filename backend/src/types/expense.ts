export interface Expense {
  title: string;
  price: number;
  date: string;
}

export interface AddExpenseReqBody extends Expense {
  userId: string;
}

export interface UpdateExpenseReqBody extends Expense {
  id: string;
}
