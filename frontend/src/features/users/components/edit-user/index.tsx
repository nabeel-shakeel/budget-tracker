import { useState, useEffect } from 'react';
import { Button, Form, Flex, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNotification } from '@providers/notification-provider';
import { useUpdateUser } from '@features/users/users.api';
import { IUser, IUpdateUser } from '@features/users/users.types';
import styles from './edit-user.module.scss';

interface IEditUserProps {
  item: IUser;
}

export function EditUser({ item }: IEditUserProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { notify } = useNotification();
  const { mutate, isPending } = useUpdateUser();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible && item) {
      form.setFieldsValue({
        firstName: item.firstName || '',
        lastName: item.lastName || '',
        phoneNumber: item.profile?.address?.phoneNumber || '',
        budget: item.profile?.financial.budget || '',
      });
    }
  }, [isModalVisible, item, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data: IUpdateUser = {
          firstName: values.firstName,
          lastName: values.firstName,
          phoneNumber: values.phoneNumber,
          budget: values.budget,
        };
        mutate(
          { ...data, id: item.id },
          {
            onSuccess: () => {
              notify({
                type: 'success',
                message: 'User Updated',
                description: 'User edited successfully',
              });
              form.resetFields();
              setIsModalVisible(false);
            },
            onError: (error: any) => {
              const errorMsg = error?.data?.error || error.message;
              console.error('User Updated:', errorMsg);
              notify({
                type: 'error',
                message: 'User Updated',
                description: errorMsg,
              });
            },
          }
        );
      })
      .catch((error) => console.error('Validation Failed:', error));
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined className={styles.editIcon} />}
        onClick={handleOpenModal}
      />
      <Modal
        width={460}
        title="Edit User"
        centered
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button block key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            block
            onClick={handleSubmit}
            loading={isPending}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-user-form"
          className={styles.editUserForm}
        >
          <Flex gap="middle">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter the first name' },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter the last name' },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Flex>
          <Flex gap="middle">
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter the phone number' },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
              name="budget"
              label="Budget Limit(PKR)"
              rules={[{ required: true, message: 'Please enter the budget' }]}
            >
              <Input placeholder="Enter budget limit" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
