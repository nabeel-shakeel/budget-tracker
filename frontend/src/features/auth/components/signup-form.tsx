import { Link } from 'react-router-dom';
import { Flex, Form, Input, Button, Typography } from 'antd';
import { MailOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

export function SignupForm() {
  return (
    <Flex gap="20px" style={{ flexGrow: 1 }} justify="center" vertical>
      <div>
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Sign Up
        </Title>
        <Title
          level={2}
          style={{
            margin: 0,
            color: '#878A99',
            fontWeight: 400,
          }}
        >
          Welcome to our community
        </Title>
      </div>

      <Form layout="vertical" size="large">
        <Flex gap="small" justify="space-between">
          <Form.Item
            label="First Name"
            name="firstName"
            style={{ marginBottom: 10, width: '100%' }}
          >
            <Input
              placeholder="Enter your first name"
              style={{
                borderRadius: '4px',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            style={{ marginBottom: 10, width: '100%' }}
          >
            <Input
              placeholder="Enter your last name"
              style={{
                borderRadius: '4px',
              }}
            />
          </Form.Item>
        </Flex>
        <Form.Item label="Email" name="email" style={{ marginBottom: 10 }}>
          <Input
            placeholder="test@gmail.com"
            suffix={<MailOutlined style={{ color: '#98A2B3' }} />}
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          style={{ marginBottom: 10 }}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (
              <EyeOutlined style={{ color: '#98A2B3' }} />
            )}
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          style={{ marginBottom: 10 }}
        >
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) => (
              <EyeOutlined style={{ color: '#98A2B3' }} />
            )}
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>
        <Form.Item
          label="Budget Limit"
          name="budgetLimit"
          style={{ marginBottom: 10 }}
        >
          <Input
            placeholder="Enter Amount"
            style={{
              borderRadius: '4px',
            }}
          />
        </Form.Item>
      </Form>
      <Flex gap="small" vertical>
        <Button type="primary" block size="large">
          SIGN UP
        </Button>

        <Flex justify="center" align="center" gap="2px">
          <Title level={5} style={{ margin: 0, fontWeight: 400 }}>
            Already have an account?
          </Title>
          <Link to="/reset-password">
            <Title level={5} style={{ margin: 0, color: '#7C3AED' }}>
              Log in
            </Title>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
