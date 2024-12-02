import { Flex, Typography, Space } from 'antd';
import { Card } from '@ui';
import {
  getFullName,
  getFormattedPhoneNumber,
  getFullAddress,
} from '@utils/helpers';
import { ProfileInfoCard } from '../profile-info-card';
import { IUserProfile } from '../../profile.types';
import styles from './profile-info.module.scss';

const { Text } = Typography;

interface ProfileInfoProps {
  userInfo: IUserProfile;
}

export function ProfileInfo({ userInfo }: ProfileInfoProps) {
  return (
    <Flex gap="large">
      <ProfileInfoCard userInfo={userInfo} />
      <Flex gap="large" vertical className={styles.flexColumn}>
        <Card title="About Me">
          <Text className={styles.text}>
            {userInfo.profile ? userInfo.profile.bio.about : 'Add your bio'}
          </Text>
        </Card>
        <Card title="Personal Details">
          <Flex>
            <Flex className={styles.flexColumn} gap="20px" vertical>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Full Name</Text>
                <Text className={styles.boldText}>
                  {getFullName(userInfo.firstName, userInfo.lastName)}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Gender</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile?.bio.gender}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Email</Text>
                <Text className={styles.boldText}>{userInfo.email}</Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Education</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile?.bio.education}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Address</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile
                    ? getFullAddress(userInfo.profile.address)
                    : ''}
                </Text>
              </Space>
            </Flex>
            <Flex className={styles.flexColumn} gap="20px" vertical>
              {/* <Space size={2} direction="vertical">
                <Text className={styles.text}>Father Name</Text>
                <Text className={styles.boldText}>Shakeel Ahmed</Text>
              </Space> */}
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Phone</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile
                    ? getFormattedPhoneNumber(
                        userInfo.profile.address.phoneNumber
                      )
                    : ''}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Zip Code</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile?.address.zipCode}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Date of Birth</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile?.bio.dob}
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text className={styles.text}>Budget Limit</Text>
                <Text className={styles.boldText}>
                  {userInfo.profile?.financial.budget} PKR
                </Text>
              </Space>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
