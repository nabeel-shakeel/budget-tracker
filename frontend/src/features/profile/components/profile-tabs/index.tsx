import { Tabs, TabsProps } from 'antd';
import { ProfileInfo } from '../profile-info';
import { MyAccount } from '../my-account';
import './profile-tabs.styles.scss';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    children: <ProfileInfo />,
  },
  {
    key: '2',
    label: 'My account',
    children: <MyAccount />,
  },
];

export function ProfileTabs() {
  return (
    <Tabs
      className="profile-tabs"
      centered
      defaultActiveKey="1"
      items={items}
    />
  );
}
