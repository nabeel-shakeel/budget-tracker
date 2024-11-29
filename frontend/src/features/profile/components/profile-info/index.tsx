import { Flex, Typography, Avatar, Divider, Space } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  PushpinOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Card } from '@components/ui';

const { Title, Text } = Typography;

export function ProfileInfo() {
  return (
    <Flex gap="large">
      <Card style={{ minWidth: 400, height: 350 }}>
        <Flex gap="middle" vertical>
          <Space
            style={{ marginTop: '10px' }}
            direction="vertical"
            size={2}
            align="center"
          >
            <Avatar
              size={100}
              src={'https://avatars.githubusercontent.com/u/8186664?v=4'}
            />
            <Title level={5} style={{ margin: 0 }}>
              Nabeel Shakeel
            </Title>
            <Text style={{ margin: 0, color: '#9E9E9E' }}>
              Senior Software Engineer
            </Text>
          </Space>
          <Divider style={{ margin: 0 }} />
          <Space direction="vertical" size="small">
            <Space size="middle">
              <PhoneOutlined style={{ fontSize: 18, color: '#9E9E9E' }} />
              <Text style={{ margin: 0, color: '#9E9E9E' }}>
                +92 324 8220699
              </Text>
            </Space>
            <Space size="middle">
              <MailOutlined style={{ fontSize: 18, color: '#9E9E9E' }} />
              <Text style={{ margin: 0, color: '#9E9E9E' }}>
                nabeel.sahkeel@emumba.com
              </Text>
            </Space>
            <Space size="middle">
              <PushpinOutlined style={{ fontSize: 18, color: '#9E9E9E' }} />
              <Text style={{ margin: 0, color: '#9E9E9E' }}>Karachi</Text>
            </Space>
            <Space size="middle">
              <LinkOutlined style={{ fontSize: 18, color: '#9E9E9E' }} />
              <Text style={{ margin: 0, color: '#9E9E9E' }}>
                wwww.nabeel.com
              </Text>
            </Space>
          </Space>
        </Flex>
      </Card>
      <Flex gap="large" vertical>
        <Card title="About Me">
          <Text style={{ margin: 0, color: '#9E9E9E' }}>
            Passionate UI/UX designer with over 5 years of experience in
            creating user-friendly and visually appealing digital experiences.
            Skilled in wireframing, prototyping, and user research to deliver
            intuitive designs. Committed to enhancing user satisfaction through
            innovative and effective design solutions.
          </Text>
        </Card>
        <Card title="Personal Details">
          <Flex>
            <Flex style={{ flex: 1 }} gap="20px" vertical>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Full Name</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>
                  Nabeel Shakeel
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Gender</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>Male</Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Email</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>
                  nabeel.shakeel@emumba.com
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Education</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>Master</Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Address</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>
                  Saddar, Karachi
                </Text>
              </Space>
            </Flex>
            <Flex style={{ flex: 1 }} gap="20px" vertical>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Father Name</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>
                  Shakeel Ahmed
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Phone</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>
                  +92 324 8220699
                </Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>Zip Code</Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>74400</Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>
                  Date of Birth
                </Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>8 Jan 1995</Text>
              </Space>
              <Space size={2} direction="vertical">
                <Text style={{ margin: 0, color: '#9E9E9E' }}>
                  Budget Limit
                </Text>
                <Text style={{ margin: 0, fontWeight: 500 }}>3000 PKR</Text>
              </Space>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
