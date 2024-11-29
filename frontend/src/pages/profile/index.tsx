import { Flex, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ProfileTabs } from '../../features/profile/components';
const { Title } = Typography;

export function ProfilePage() {
  return (
    <Flex vertical>
      <Flex gap="middle" justify="flex-start">
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Profile
        </Title>
      </Flex>
      <ProfileTabs />
    </Flex>
  );
}
