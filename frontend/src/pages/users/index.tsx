import { Divider, Flex, Typography } from 'antd';
import { UsersTable } from '@features/users/components';

const { Title } = Typography;

export function UsersPage() {
  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Users
        </Title>
      </Flex>
      <Divider style={{ margin: 0, borderColor: '#DDE4F0' }} />
      <UsersTable />
    </Flex>
  );
}
