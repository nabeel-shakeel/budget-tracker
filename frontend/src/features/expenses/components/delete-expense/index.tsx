import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Form,
  Flex,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Space,
  Typography,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNotification } from '@providers/notification-provider';
import { useDeleteExpense } from '@features/expenses/expenses.api';
import { IExpenseItem } from '@features/expenses/expenses.types';
import styles from './delete-expense.module.scss';

const { Text } = Typography;

interface IDeleteExpenseProps {
  item: IExpenseItem;
}

export function DeleteExpense({ item }: IDeleteExpenseProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { notify } = useNotification();
  const { mutate, isPending } = useDeleteExpense();

  const handleSubmit = () => {
    mutate(item.id, {
      onSuccess: () => {
        notify({
          type: 'success',
          message: 'Expense Deleted',
          description: 'Expense deleted successfully',
        });
        setIsModalVisible(false);
      },
      onError: (error: any) => {
        const errorMsg = error?.data?.error || error.message;
        console.error('Expense Deleted:', errorMsg);
        notify({
          type: 'error',
          message: 'Expense Deleted',
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
        title="Delete Expense"
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
          <Space size={2} direction="vertical">
            <Text className={styles.title}>Title</Text>
            <Text className={styles.value}>{item.title}</Text>
          </Space>
          <Flex style={{ flex: 1 }}>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>Price</Text>
              <Text className={styles.value}>
                {item.price.toLocaleString()}
              </Text>
            </Space>
            <Space className={styles.flex1} size={2} direction="vertical">
              <Text className={styles.title}>Date</Text>
              <Text className={styles.value}>
                {dayjs(item.date).format('DD MMM YYYY')}
              </Text>
            </Space>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
