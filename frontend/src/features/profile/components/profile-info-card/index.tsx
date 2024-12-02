import { Flex, Typography, Avatar, Divider, Space } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  PushpinOutlined,
  //LinkOutlined,
} from '@ant-design/icons';
import { Card } from '@ui';
import { getNameInitials, getFullName } from '@utils/helpers';
import { IUserProfile } from '@features/profile/profile.types';
import styles from './profile-info-card.module.scss';

const { Title, Text } = Typography;

interface ProfileInfoCardProps {
  userInfo: IUserProfile;
}

export function ProfileInfoCard({ userInfo }: ProfileInfoCardProps) {
  return (
    <Card className={styles.card}>
      <Flex gap="middle" vertical>
        <Space
          className={styles.avatarSpace}
          direction="vertical"
          size={2}
          align="center"
        >
          <Avatar size={100} className={styles.avatarSize}>
            {getNameInitials(userInfo.firstName, userInfo.lastName)}
          </Avatar>
          <Title level={5}>
            {getFullName(userInfo.firstName, userInfo.lastName)}
          </Title>
          <Text className={styles.text}>{userInfo.profile?.bio.jobTitle}</Text>
        </Space>
        <Divider className={styles.divider} />
        <Space direction="vertical" size="small">
          {userInfo.profile && (
            <Space size="middle">
              <PhoneOutlined className={styles.icon} />
              <Text className={styles.text}>
                {userInfo.profile?.address.phoneNumber}
              </Text>
            </Space>
          )}
          <Space size="middle">
            <MailOutlined className={styles.icon} />
            <Text className={styles.text}>{userInfo.email}</Text>
          </Space>
          {userInfo.profile && (
            <Space size="middle">
              <PushpinOutlined className={styles.icon} />
              <Text className={styles.text}>
                {userInfo.profile?.address.city}
              </Text>
            </Space>
          )}
          {/* <Space size="middle">
            <LinkOutlined className={styles.icon} />
            <Text className={styles.text}>wwww.nabeel.com</Text>
          </Space> */}
        </Space>
      </Flex>
    </Card>
  );
}
