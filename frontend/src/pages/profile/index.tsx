import { useNavigate } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { ProfileTabs } from '@features/profile/components';

const { Title } = Typography;

export function ProfilePage() {
  const navigate = useNavigate();
  return (
    <Flex vertical>
      <Flex gap="middle" justify="flex-start">
        <ArrowLeftOutlined
          style={{ fontSize: 20 }}
          onClick={() => navigate(routes.EXPENSES)}
        />
        <Title level={1}>Profile</Title>
      </Flex>
      <ProfileTabs />
    </Flex>
  );
}
