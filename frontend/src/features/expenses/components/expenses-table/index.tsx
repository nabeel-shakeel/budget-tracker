import { useState } from 'react';
import debounce from 'lodash.debounce';
import {
  Table,
  Progress,
  Input,
  Select,
  DatePicker,
  Space,
  Typography,
  Pagination,
  PaginationProps,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useUserStore } from '@store/useUserStore';
import { LabelPrefix } from '@components';
import { AddEditExpense } from '@features/expenses/components/add-edit-expense';
import { DeleteExpense } from '@features/expenses/components/delete-expense';
import { useFetchExpenses } from '@features/expenses/expenses.api';
import { IExpenseItem, FilterValues } from '@features/expenses/expenses.types';
import { getFormattedDate } from '@utils/helpers';
import { PAGE_LIMIT, DEBOUNCE_DELAY } from '@utils/constants';
import styles from './expenses-table.module.scss';

const { Title, Text } = Typography;

const sortOptions = [
  { value: 'price_high', label: 'Price: Highest to lowest' },
  { value: 'price_low', label: 'Price: Lowest to highest' },
  { value: 'date_new', label: 'Date: Newest to oldest' },
  { value: 'date_old', label: 'Date: Oldest to newest' },
];

// eslint-disable-next-line prefer-const
let columns: ColumnsType<IExpenseItem> = [
  {
    title: 'Expense',
    dataIndex: 'title',
    key: 'expense',
  },
  {
    title: 'Total Expenditure',
    dataIndex: 'expenditure',
    key: 'expenditure',
    render: (value) => (
      <div className={styles.expenditureProgress}>
        <Progress
          percent={value}
          showInfo={true}
          strokeColor="#7539FF"
          trailColor="#E1E8F2"
        />
      </div>
    ),
  },
  {
    title: 'Price(PKR)',
    dataIndex: 'price',
    key: 'price',
    render: (value) => (
      <Text className={styles.grayFields}>{value.toLocaleString()}</Text>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => (
      <Text className={styles.grayFields}>
        {getFormattedDate(new Date(value))}
      </Text>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_text, record) => (
      <Space size={0}>
        <DeleteExpense item={record} />
        <AddEditExpense isEdit item={record} />
      </Space>
    ),
  },
];

const TableFooter = (paginationProps: PaginationProps) => {
  return <Pagination {...paginationProps} />;
};

interface IExpenseTableHeaderProps {
  filters: FilterValues;
  onFilterChange: (value: FilterValues) => void;
}

const TableHeader = (props: IExpenseTableHeaderProps) => {
  const { filters, onFilterChange } = props;

  const handleValueChange = (key: keyof FilterValues, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const debouncedSearch = debounce((value: string) => {
    handleValueChange('keyword', value);
  }, DEBOUNCE_DELAY);

  return (
    <div className={styles.tableHeader}>
      <Title level={5}>Expenses</Title>
      <div className={styles.filters}>
        <LabelPrefix label="Sort By">
          <Select
            allowClear
            className={styles.sortSelect}
            value={filters.sort}
            onChange={(value) => handleValueChange('sort', value)}
            options={sortOptions}
          />
        </LabelPrefix>
        <LabelPrefix label="By Date">
          <DatePicker
            className={styles.datePicker}
            suffixIcon={<CalendarOutlined className={styles.calendarIcon} />}
            onChange={(_, date) => handleValueChange('date', date as string)}
          />
        </LabelPrefix>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className={styles.searchIcon} />}
          className={styles.searchInput}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export function ExpensesTable() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>({
    date: '',
    keyword: '',
    sort: '',
  });

  const role = useUserStore((state) => state.role);

  if (role === 'admin') {
    if (!columns.find((column) => column.key === 'user')) {
      columns.splice(3, 0, {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (user) => (
          <Text className={styles.grayFields}>
            {user.firstName} {user.lastName}
          </Text>
        ),
      });
    }
  }

  const handleChangeFilters = (filters: FilterValues) => {
    setFilters(filters);
    setPage(1);
  };

  const selectedFilters = Object.entries(filters).reduce(
    (acc: Record<string, string>, curr) => {
      if (curr[1]) {
        acc[curr[0]] = curr[1];
      }
      return acc;
    },
    {}
  );

  const { data: expenses, isFetching } = useFetchExpenses({
    page,
    ...selectedFilters,
  });

  const pagination = {
    total: expenses?.total || 0,
    pageSize: Number(PAGE_LIMIT),
    showSizeChanger: false,
    showQuickJumper: false,
    onChange: (page: number) => setPage(page),
    showTotal: (total: number, range: any) => `Showing ${range[1]} / ${total}`,
  };

  return (
    <div className={styles.expensesTableContainer}>
      <Table
        columns={columns}
        dataSource={expenses?.data || []}
        pagination={false}
        loading={isFetching}
        title={() => (
          <TableHeader filters={filters} onFilterChange={handleChangeFilters} />
        )}
        footer={() => <TableFooter {...pagination} />}
      />
    </div>
  );
}
