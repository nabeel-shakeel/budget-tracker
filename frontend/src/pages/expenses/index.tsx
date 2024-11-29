import { Divider, Flex, Typography, Button } from 'antd';
import { ExpensesTable } from '../../features/expenses/components';
const { Title } = Typography;

export function ExpensesPage() {
  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Expenses
        </Title>
        <Button type="primary" size="large">
          Add Expense
        </Button>
      </Flex>
      <Divider style={{ margin: 0, borderColor: '#DDE4F0' }} />
      <Title
        level={1}
        style={{
          margin: 0,
        }}
      >
        <ExpensesTable />
      </Title>
    </Flex>
  );
}
