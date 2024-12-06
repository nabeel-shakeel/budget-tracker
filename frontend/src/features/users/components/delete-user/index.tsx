import { useState } from 'react';
import { Button, Flex, Modal, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNotification } from '@providers/notification-provider';
import { useDeleteUser } from '@features/users/users.api';
import { IUser } from '@features/users/users.types';
import styles from './delete-user.module.scss';

const { Text } = Typography;

interface IDeleteUserProps {
  item: IUser;
}

export function DeleteUser({ item }: IDeleteUserProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { notify } = useNotification();
  const { mutate, isPending } = useDeleteUser();

  const handleSubmit = () => {
    mutate(item.id, {
      onSuccess: () => {
        notify({
          type: 'success',
          message: 'User Deleted',
          description: 'User deleted successfully',
        });
        setIsModalVisible(false);
      },
      onError: (error: any) => {
        const errorMsg = error?.data?.error || error.message;
        console.error('User Deleted:', errorMsg);
        notify({
          type: 'error',
          message: 'User Deleted',
          description: errorMsg,
        });
      },
    });
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <>
      <Button
        type="text"
        icon={<DeleteOutlined className={styles.deleteIcon} />}
        onClick={handleOpenModal}
      />
      <Modal
        width={360}
        title="Delete User"
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
            className={styles.deleteBtn}
            block
            onClick={handleSubmit}
            loading={isPending}
          >
            Delete
          </Button>,
        ]}
      >
        <Flex gap="middle" vertical>
          <Flex style={{ flex: 1 }}>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>First Name</Text>
              <Text className={styles.value}>{item.firstName}</Text>
            </Space>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>Last Name</Text>
              <Text className={styles.value}>{item.lastName}</Text>
            </Space>
          </Flex>
          <Flex style={{ flex: 1 }}>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>Phone Number</Text>
              <Text className={styles.value}>
                {item.profile?.address.phoneNumber}
              </Text>
            </Space>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>Budget Limit</Text>
              <Text className={styles.value}>
                {item.profile?.financial.budget}
              </Text>
            </Space>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
