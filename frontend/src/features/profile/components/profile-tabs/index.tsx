/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tabs, TabsProps } from 'antd';
import { Loader } from '@components';
import { ProfileInfo } from '@features/profile/components/profile-info';
import { MyAccount } from '@features/profile/components/my-account';
import { useUserProfile } from '@features/profile/profile.api';
import styles from './profile-tabs.module.scss';

export function ProfileTabs() {
  const { data, isFetching } = useUserProfile();

  if (isFetching) return <Loader />;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: <ProfileInfo userInfo={data!} />,
    },
    {
      key: '2',
      label: 'My account',
      children: <MyAccount userInfo={data!} />,
    },
  ];
  return (
    <Tabs
      className={styles.profileTabs}
      centered
      defaultActiveKey="1"
      items={data && items}
    />
  );
}
