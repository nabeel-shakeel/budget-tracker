import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Flex, Typography, Divider, Space, Form, Button } from 'antd';
import { Card, Input } from '@ui';
import { routes } from '@routing';
import { useNotification } from '@providers/notification-provider';
import { ProfileInfoCard } from '@features/profile/components/profile-info-card';
import { useUpdateUserProfile } from '@features/profile/profile.api';
import { updateUserProfileSchema } from '@features/profile/profile.schema';
import {
  IUserProfile,
  IUpdateUserProfile,
} from '@features/profile/profile.types';
import styles from './my-account.module.scss';

const { Text } = Typography;

interface MyAccountProps {
  userInfo: IUserProfile;
}

const profileInitialValue = {
  address: {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  },
  bio: {
    about: '',
    jobTitle: '',
    dob: '',
    education: '',
    gender: '',
  },
  financial: {
    budget: 0,
  },
};

export function MyAccount({ userInfo }: MyAccountProps) {
  const { firstName, lastName, profile } = userInfo;
  const navigate = useNavigate();
  const mutation = useUpdateUserProfile();
  const { notify } = useNotification();

  const initialValues = {
    firstName,
    lastName,
    profile: profile ? profile : profileInitialValue,
  };

  const formik = useFormik<IUpdateUserProfile>({
    initialValues,
    enableReinitialize: true,
    validationSchema: updateUserProfileSchema,
    onSubmit: async (values) => {
      try {
        await mutation.mutateAsync(values);
        notify({
          type: 'success',
          message: 'User Profile',
          description: 'User profile updated successfully',
        });
        navigate(routes.PROFILE);
      } catch (error: any) {
        const errorMsg = error?.data?.error || error.message;
        console.error('signin failed:', errorMsg);
        notify({
          type: 'error',
          message: 'User Profile',
          description: errorMsg,
        });
      }
    },
  });

  return (
    <Flex gap="large">
      <ProfileInfoCard userInfo={userInfo} />
      <Card title="Personal Details" style={{ flex: 1 }}>
        <Form
          layout="vertical"
          size="large"
          initialValues={initialValues}
          onFinish={formik.handleSubmit}
        >
          <Flex gap={10} vertical>
            <Space size={8} direction="vertical">
              <Text className={styles.boldText}>Name & Info</Text>
              <Flex gap="10px" justify="space-between">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.firstName && formik.errors.firstName
                      ? 'error'
                      : undefined
                  }
                  help={formik.touched.firstName && formik.errors.firstName}
                >
                  <Input
                    placeholder="Enter your first name"
                    {...formik.getFieldProps('firstName')}
                  />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.lastName && formik.errors.lastName
                      ? 'error'
                      : undefined
                  }
                  help={formik.touched.lastName && formik.errors.lastName}
                >
                  <Input
                    placeholder="Enter your last name"
                    {...formik.getFieldProps('lastName')}
                  />
                </Form.Item>
                <Form.Item
                  label="Job Title"
                  name={['profile', 'bio', 'jobTitle']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.bio?.jobTitle &&
                    formik.errors.profile?.bio?.jobTitle
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.bio?.jobTitle &&
                    formik.errors.profile?.bio?.jobTitle
                  }
                >
                  <Input
                    placeholder="Enter your job title"
                    {...formik.getFieldProps('profile.bio.jobTitle')}
                  />
                </Form.Item>
              </Flex>
              <Divider className={styles.divider} />
            </Space>

            <Space size={8} direction="vertical">
              <Text className={styles.boldText}>Address</Text>
              <Flex gap="10px" justify="space-between">
                <Form.Item
                  label="Street Address"
                  name={['profile', 'address', 'streetAddress']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.address?.streetAddress &&
                    formik.errors.profile?.address?.streetAddress
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.address?.streetAddress &&
                    formik.errors.profile?.address?.streetAddress
                  }
                >
                  <Input
                    placeholder="Enter your street address"
                    {...formik.getFieldProps('profile.address.streetAddress')}
                  />
                </Form.Item>
                <Form.Item
                  label="City"
                  name={['profile', 'address', 'city']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.address?.city &&
                    formik.errors.profile?.address?.city
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.address?.city &&
                    formik.errors.profile?.address?.city
                  }
                >
                  <Input
                    placeholder="Enter your city"
                    {...formik.getFieldProps('profile.address.city')}
                  />
                </Form.Item>
                <Form.Item
                  label="State"
                  name={['profile', 'address', 'state']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.address?.state &&
                    formik.errors.profile?.address?.state
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.address?.state &&
                    formik.errors.profile?.address?.state
                  }
                >
                  <Input
                    placeholder="Enter your state"
                    {...formik.getFieldProps('profile.address.state')}
                  />
                </Form.Item>
                <Form.Item
                  label="Zip Code"
                  name={['profile', 'address', 'zipCode']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.address?.zipCode &&
                    formik.errors.profile?.address?.zipCode
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.address?.zipCode &&
                    formik.errors.profile?.address?.zipCode
                  }
                >
                  <Input
                    placeholder="Enter your zip code"
                    {...formik.getFieldProps('profile.address.zipCode')}
                  />
                </Form.Item>
              </Flex>
              <Divider className={styles.divider} />
            </Space>
            <Space size={8} direction="vertical">
              <Text className={styles.boldText}>Contact Info</Text>
              <Form.Item
                label="Phone Number"
                name={['profile', 'address', 'phoneNumber']}
                style={{ width: '20%' }}
                className={styles.fullWidth}
                validateStatus={
                  formik.touched.profile?.address?.phoneNumber &&
                  formik.errors.profile?.address?.phoneNumber
                    ? 'error'
                    : undefined
                }
                help={
                  formik.touched.profile?.address?.phoneNumber &&
                  formik.errors.profile?.address?.phoneNumber
                }
              >
                <Input
                  placeholder="Enter your phone number"
                  {...formik.getFieldProps('profile.address.phoneNumber')}
                />
              </Form.Item>
              <Divider className={styles.divider} />
            </Space>
            <Space size={8} direction="vertical">
              <Text className={styles.boldText}>Bio</Text>
              <Form.Item
                label="About"
                name={['profile', 'bio', 'about']}
                className={styles.fullWidth}
                validateStatus={
                  formik.touched.profile?.bio?.about &&
                  formik.errors.profile?.bio?.about
                    ? 'error'
                    : undefined
                }
                help={
                  formik.touched.profile?.bio?.about &&
                  formik.errors.profile?.bio?.about
                }
              >
                <Input
                  placeholder="Enter about yourself"
                  {...formik.getFieldProps('profile.bio.about')}
                />
              </Form.Item>
              <Flex gap="10px" justify="space-between">
                <Form.Item
                  label="Date of Birth"
                  name={['profile', 'bio', 'dob']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.bio?.dob &&
                    formik.errors.profile?.bio?.dob
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.bio?.dob &&
                    formik.errors.profile?.bio?.dob
                  }
                >
                  <Input
                    placeholder="Enter your dob"
                    {...formik.getFieldProps('profile.bio.dob')}
                  />
                </Form.Item>
                <Form.Item
                  label="Education"
                  name={['profile', 'bio', 'education']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.bio?.education &&
                    formik.errors.profile?.bio?.education
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.bio?.education &&
                    formik.errors.profile?.bio?.education
                  }
                >
                  <Input
                    placeholder="Enter your education"
                    {...formik.getFieldProps('profile.bio.education')}
                  />
                </Form.Item>
                <Form.Item
                  label="Gender"
                  name={['profile', 'bio', 'gender']}
                  className={styles.fullWidth}
                  validateStatus={
                    formik.touched.profile?.bio?.gender &&
                    formik.errors.profile?.bio?.gender
                      ? 'error'
                      : undefined
                  }
                  help={
                    formik.touched.profile?.bio?.gender &&
                    formik.errors.profile?.bio?.gender
                  }
                >
                  <Input
                    placeholder="Enter your gender"
                    {...formik.getFieldProps('profile.bio.gender')}
                  />
                </Form.Item>
              </Flex>
              <Divider className={styles.divider} />
            </Space>
            <Space size={8} direction="vertical">
              <Text className={styles.boldText}>Financial Information</Text>
              <Form.Item
                label="Budget(PKR)"
                name={['profile', 'financial', 'budget']}
                style={{ width: '20%' }}
                className={styles.fullWidth}
                validateStatus={
                  formik.touched.profile?.financial?.budget &&
                  formik.errors.profile?.financial?.budget
                    ? 'error'
                    : undefined
                }
                help={
                  formik.touched.profile?.financial?.budget &&
                  formik.errors.profile?.financial?.budget
                }
              >
                <Input
                  placeholder="Enter your budget"
                  {...formik.getFieldProps('profile.financial.budget')}
                />
              </Form.Item>
            </Space>
            <Space size={10}>
              <Button
                className={styles.buttonStyles}
                type="primary"
                block
                size="middle"
                htmlType="submit"
              >
                Update
              </Button>
              <Button
                className={styles.buttonStyles}
                type="default"
                block
                size="middle"
              >
                Cancel
              </Button>
            </Space>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}
