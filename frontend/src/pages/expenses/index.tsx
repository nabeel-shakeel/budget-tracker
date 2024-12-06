import { Divider, Flex, Typography } from 'antd';
import { ExpensesTable, AddEditExpense } from '@features/expenses/components';
const { Title } = Typography;

export function ExpensesPage() {
  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between">
        <Title level={1}>Expenses</Title>
        <AddEditExpense />
      </Flex>
      <Divider />
      <ExpensesTable />
    </Flex>
  );
}
