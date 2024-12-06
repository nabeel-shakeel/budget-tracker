export interface IExpense {
  title: string;
  price: number;
  date: string;
}

export interface IExpenseItem extends IExpense {
  id: string;
  expenditure: number;
}

export interface IExpenseUpdate extends IExpense {
  id: string;
}

export interface IFetchExpensesResponse {
  data: IExpenseItem[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface IExpenseTrend {
  trend: { month: string; value: number }[];
}

export interface IExpenseFilters {
  page: number;
  keyword?: string;
  sort?: string;
  date?: string;
}

export type FilterValues = Omit<IExpenseFilters, 'page'>;
