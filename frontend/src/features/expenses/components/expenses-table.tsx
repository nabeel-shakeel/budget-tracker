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
  CalendarOutlined,
} from '@ant-design/icons';
import { LabelPrefix } from '@components';
import './expenses-table.styles.scss';

const { Title, Text } = Typography;

interface DataType {
  key: string;
  expense: string;
  expenditure: number;
  price: number;
  date: string;
  user: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Expense',
    dataIndex: 'expense',
    key: 'expense',
  },
  {
    title: 'Total Expenditure',
    dataIndex: 'expenditure',
    key: 'expenditure',
    render: (value) => (
      <div className="expenditure-progress">
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
      <Text className="gray-fields">{value.toLocaleString()}</Text>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => <Text className="gray-fields">{value}</Text>,
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (value) => <Text className="gray-fields">{value}</Text>,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="small">
        <Button type="text" icon={<DeleteOutlined className="delete-icon" />} />
        <Button type="text" icon={<EditOutlined className="edit-icon" />} />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    expense: 'Prestigious Clientele Segment',
    expenditure: 50,
    price: 25000,
    date: '22 Jan 2022',
    user: 'guy-hawkins',
  },
  {
    key: '2',
    expense: 'Prestigious Clientele Segment',
    expenditure: 25,
    price: 25000,
    date: '22 Jan 2022',
    user: 'wade-warren',
  },
  {
    key: '3',
    expense: 'Prestigious Clientele Segment',
    expenditure: 35,
    price: 25000,
    date: '22 Jan 2022',
    user: 'jenny-wilson',
  },
  {
    key: '4',
    expense: 'Prestigious Clientele Segment',
    expenditure: 45,
    price: 25000,
    date: '22 Jan 2022',
    user: 'robert-fox',
  },
  {
    key: '5',
    expense: 'Prestigious Clientele Segment',
    expenditure: 15,
    price: 25000,
    date: '22 Jan 2022',
    user: 'guy-hawkins',
  },
  {
    key: '6',
    expense: 'Prestigious Clientele Segment',
    expenditure: 55,
    price: 25000,
    date: '22 Jan 2022',
    user: 'wade-warren',
  },
  {
    key: '7',
    expense: 'Prestigious Clientele Segment',
    expenditure: 30,
    price: 25000,
    date: '22 Jan 2022',
    user: 'ralph-edwards',
  },
  {
    key: '8',
    expense: 'Prestigious Clientele Segment',
    expenditure: 40,
    price: 25000,
    date: '22 Jan 2022',
    user: 'marvin-mckinney',
  },
];

const TableFooter = (paginationProps: PaginationProps) => {
  return <Pagination {...paginationProps} />;
};

export function ExpensesTable() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const tableHeader = (
    <div className="table-header">
      <Title level={5} className="title">
        Expenses
      </Title>
      <div className="filters">
        <LabelPrefix label=" Sort By">
          <Select
            defaultValue="all"
            className="sort-select"
            onChange={handleChange}
            options={[
              { value: 'all', label: 'All' },
              { value: '', label: 'Price: Highest to lowest' },
              { value: '', label: 'Price: Lowest to highest' },
              { value: '', label: 'Date: Newest to oldest' },
              { value: '', label: 'Date: Oldest to newest' },
            ]}
          />
        </LabelPrefix>
        <LabelPrefix label="By Date">
          <DatePicker
            suffixIcon={<CalendarOutlined className="calendar-icon" />}
            className="date-picker"
          />
        </LabelPrefix>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="search-icon" />}
          className="search-input"
        />
      </div>
    </div>
  );

  const pagination = {
    total: 235,
    pageSize: 8,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total: number, range: any) => `Showing ${range[1]} / ${total}`,
  };

  return (
    <div className="expenses-table-container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        // pagination={{
        //   total: 235,
        //   pageSize: 8,
        //   showSizeChanger: false,
        //   showQuickJumper: false,
        //   showTotal: (total, range) => `Showing ${range[1]} / ${total}`,
        // }}
        title={() => tableHeader}
        footer={() => <TableFooter {...pagination} />}
      />
    </div>
  );
}
