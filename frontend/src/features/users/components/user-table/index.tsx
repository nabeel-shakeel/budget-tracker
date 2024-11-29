import {
  Table,
  Progress,
  Input,
  Select,
  DatePicker,
  Space,
  Button,
  Typography,
  Pagination,
  PaginationProps,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { LabelPrefix } from '@components/label-prefix';
import styles from './user-table.module.scss';

const { Title, Text } = Typography;

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  role: string;
}

const columns: ColumnsType<DataType> = [
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
    render: (value) => <Text className={styles['gray-fields']}>{value}</Text>,
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    render: (value) => <Text className={styles['gray-fields']}>{value}</Text>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (value) => <Text className={styles['gray-fields']}>{value}</Text>,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="small">
        <Button
          type="text"
          icon={<DeleteOutlined className={styles['delete-icon']} />}
        />
        <Button
          type="text"
          icon={<EditOutlined className={styles['edit-icon']} />}
        />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    number: '+1234567890',
    role: 'Admin',
  },
  {
    key: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    number: '+9876543210',
    role: 'User',
  },
  {
    key: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    number: '+1122334455',
    role: 'Manager',
  },
  {
    key: '4',
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    number: '+9988776655',
    role: 'User',
  },
  {
    key: '5',
    firstName: 'Charlie',
    lastName: 'Williams',
    email: 'charlie.williams@example.com',
    number: '+5566778899',
    role: 'Admin',
  },
  {
    key: '6',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    number: '+3344556677',
    role: 'User',
  },
  {
    key: '7',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    number: '+2233445566',
    role: 'Manager',
  },
  {
    key: '8',
    firstName: 'Sophia',
    lastName: 'Moore',
    email: 'sophia.moore@example.com',
    number: '+7788990011',
    role: 'User',
  },
  {
    key: '9',
    firstName: 'James',
    lastName: 'Taylor',
    email: 'james.taylor@example.com',
    number: '+4455667788',
    role: 'Admin',
  },
  {
    key: '10',
    firstName: 'Mia',
    lastName: 'Anderson',
    email: 'mia.anderson@example.com',
    number: '+6677889900',
    role: 'User',
  },
];

const TableFooter = (paginationProps: PaginationProps) => {
  return <Pagination {...paginationProps} />;
};

const TableHeader = () => {
  return (
    <div className={styles['table-header']}>
      <Title level={5} className={styles.title}>
        Users
      </Title>
      <div className={styles.filters}>
        <LabelPrefix label="Sort By">
          <Select
            defaultValue="all"
            className={styles['sort-select']}
            options={[
              { value: 'all', label: 'All' },
              { value: '', label: 'Price: Highest to lowest' },
              { value: '', label: 'Price: Lowest to highest' },
              { value: '', label: 'Date: Newest to oldest' },
              { value: '', label: 'Date: Oldest to newest' },
            ]}
          />
        </LabelPrefix>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="search-icon" />}
          className={styles['search-input']}
        />
      </div>
    </div>
  );
};

export function UsersTable() {
  const pagination = {
    total: 235,
    pageSize: 8,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total: number, range: any) => `Showing ${range[1]} / ${total}`,
  };

  return (
    <div className={styles['users-table-container']}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        title={() => <TableHeader />}
        footer={() => <TableFooter {...pagination} />}
      />
    </div>
  );
}
