import { Divider, Flex, Typography } from 'antd';
import { UsersTable } from '@features/users/components';

const { Title } = Typography;

export function UsersPage() {
  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between">
        <Title level={1}>Users</Title>
      </Flex>
      <Divider />
      <UsersTable />
    </Flex>
  );
}
