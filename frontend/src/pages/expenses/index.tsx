import { Divider, Flex, Typography, Button } from 'antd';
import { ExpensesTable } from '@features/expenses/components';
const { Title } = Typography;

export function ExpensesPage() {
  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between">
        <Title level={1}>Expenses</Title>
        <Button type="primary" size="middle">
          Add Expense
        </Button>
      </Flex>
      <Divider />
      <ExpensesTable />
    </Flex>
  );
}
