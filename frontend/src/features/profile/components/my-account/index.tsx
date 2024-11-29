import { Flex, Typography, Avatar, Divider, Space, Form } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  PushpinOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Card, Input } from '@components/ui';

const { Title, Text } = Typography;

export function MyAccount() {
  return (
    <Flex gap="large">
      <Card style={{ width: 400, height: 350 }}>
        <Flex gap="middle" vertical>
          <Space direction="vertical" size={2} align="center">
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
      <Card title="Personal Details" style={{ flex: 1 }}>
        <Form layout="vertical" size="large">
          <Flex gap={10} vertical>
            <Space size={8} direction="vertical">
              <Text style={{ margin: 0, fontWeight: 600 }}>Name & Info</Text>
              <Flex gap="10px" justify="space-between">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  style={{ width: '100%' }}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  style={{ width: '100%' }}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                  label="Job Title"
                  name="jobTitle"
                  style={{ width: '100%' }}
                >
                  <Input placeholder="Enter your job title" />
                </Form.Item>
              </Flex>
              <Divider style={{ margin: 0, color: '#dde4f0' }} />
            </Space>

            <Space size={8} direction="vertical">
              <Text style={{ margin: 0, fontWeight: 600 }}>Address</Text>
              <Text style={{ margin: 0, fontWeight: 500 }}>Feilds</Text>
              <Divider style={{ margin: 0, color: '#dde4f0' }} />
            </Space>

            <Space size={8} direction="vertical">
              <Text style={{ margin: 0, fontWeight: 600 }}>Contact Info</Text>
              <Text style={{ margin: 0, fontWeight: 500 }}>Feilds</Text>
              <Divider style={{ margin: 0, color: '#dde4f0' }} />
            </Space>
            <Space size={8} direction="vertical">
              <Text style={{ margin: 0, fontWeight: 600 }}>Bio</Text>
              <Text style={{ margin: 0, fontWeight: 500 }}>Feilds</Text>
              <Divider style={{ margin: 0, color: '#dde4f0' }} />
            </Space>
            <Space size={8} direction="vertical">
              <Text style={{ margin: 0, fontWeight: 600 }}>
                Financial Information
              </Text>
              <Text style={{ margin: 0, fontWeight: 500 }}>Feilds</Text>
              <Divider style={{ margin: 0, color: '#dde4f0' }} />
            </Space>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}
