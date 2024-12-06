import { useState } from 'react';
import debounce from 'lodash.debounce';
import {
  Table,
  Input,
  Space,
  Typography,
  Pagination,
  PaginationProps,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { EditUser } from '@features/users/components/edit-user';
import { DeleteUser } from '@features/users/components/delete-user';
import { useFetchUsers } from '@features/users/users.api';
import { IUser, FilterValues } from '@features/users/users.types';
import { PAGE_LIMIT, DEBOUNCE_DELAY } from '@utils/constants';
import styles from './users-table.module.scss';

const { Title, Text } = Typography;

const columns: ColumnsType<IUser> = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (value) => <Text className={styles.grayFields}>{value}</Text>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (value) => <Text className={styles.grayFields}>{value}</Text>,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_text, record) => (
      <Space size={0}>
        {record.role !== 'admin' && <DeleteUser item={record} />}
        <EditUser item={record} />
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
    handleValueChange('name', value);
  }, DEBOUNCE_DELAY);

  return (
    <div className={styles.tableHeader}>
      <Title level={5}>Users</Title>
      <div className={styles.filters}>
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

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>({
    name: '',
  });

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

  const { data: users, isFetching } = useFetchUsers({
    page,
    ...selectedFilters,
  });

  const pagination = {
    total: users?.total || 0,
    pageSize: Number(PAGE_LIMIT),
    showSizeChanger: false,
    showQuickJumper: false,
    onChange: (page: number) => setPage(page),
    showTotal: (total: number, range: any) => `Showing ${range[1]} / ${total}`,
  };

  return (
    <div className={styles.usersTableContainer}>
      <Table
        columns={columns}
        dataSource={users?.data || []}
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
