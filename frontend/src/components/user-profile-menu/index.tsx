import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Avatar, Popover, Typography, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { routes } from '@routing';
import { getFullName, getNameInitials } from '@utils/helpers';
import './user-profile-menu.styles.scss';

const { Text, Title } = Typography;

interface UserProfileMenuProps {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export function UserProfileMenu(props: UserProfileMenuProps) {
  const { firstName, lastName, email, avatarUrl } = props;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleClosePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate(routes.PROFILE);
    handleClosePopover();
  };

  const handleSignoutClick = () => {
    navigate(routes.SIGN_IN);
    handleClosePopover();
  };

  const content = (
    <Flex className="user-profile-menu" justify="flex-start" vertical>
      <Flex gap="middle">
        <Avatar size={42} src={avatarUrl}>
          {!avatarUrl && getNameInitials(firstName, lastName)}
        </Avatar>
        <div>
          <Title level={5} className="user-title">
            {getFullName(firstName, lastName)}
          </Title>
          <Text type="secondary">{email}</Text>
        </div>
      </Flex>
      <Divider className="user-divider" />
      <Button
        type="text"
        icon={<UserOutlined />}
        block
        onClick={handleProfileClick}
      >
        Profile
      </Button>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        block
        onClick={handleSignoutClick}
      >
        Logout
      </Button>
    </Flex>
  );

  return (
    <Popover
      open={isOpen}
      content={content}
      trigger="click"
      placement="bottomRight"
      onOpenChange={handleClosePopover}
      overlayInnerStyle={{ padding: '20px' }}
    >
      <Avatar size={42} src={avatarUrl}>
        {!avatarUrl && getNameInitials(firstName, lastName)}
      </Avatar>
    </Popover>
  );
}
