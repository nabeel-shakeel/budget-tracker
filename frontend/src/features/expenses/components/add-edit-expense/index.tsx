import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Form,
  Flex,
  Input,
  InputNumber,
  DatePicker,
  Modal,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNotification } from '@providers/notification-provider';
import {
  useAddExpense,
  useUpdateExpense,
} from '@features/expenses/expenses.api';
import { IExpense, IExpenseUpdate } from '@features/expenses/expenses.types';
import styles from './add-edit-expense.module.scss';

interface IAddExpenseProps {
  isEdit?: boolean;
  item?: IExpenseUpdate;
}

export function AddEditExpense({ isEdit = false, item }: IAddExpenseProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { notify } = useNotification();
  const { mutate, isPending } = useAddExpense();
  const { mutate: updateExpense, isPending: updatePending } =
    useUpdateExpense();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible && item) {
      form.setFieldsValue({
        title: item.title || '',
        price: item.price || 0,
        date: item.date ? dayjs(item.date) : undefined, // Ensure date is a dayjs object
      });
    }
  }, [isModalVisible, item, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data: IExpense = {
          title: values.title,
          price: values.price,
          date: values.date,
        };
        if (isEdit) {
          updateExpense(
            { ...data, id: item?.id || '' },
            {
              onSuccess: () => {
                notify({
                  type: 'success',
                  message: 'Expense Updated',
                  description: 'Expense edited successfully',
                });
                form.resetFields();
                setIsModalVisible(false);
              },
              onError: (error: any) => {
                const errorMsg = error?.data?.error || error.message;
                console.error('Expense Updated:', errorMsg);
                notify({
                  type: 'error',
                  message: 'Expense Updated',
                  description: errorMsg,
                });
              },
            }
          );
        } else {
          mutate(data, {
            onSuccess: () => {
              notify({
                type: 'success',
                message: 'Expense Added',
                description: 'Expense added successfully',
              });
              form.resetFields();
              setIsModalVisible(false);
            },
            onError: (error: any) => {
              const errorMsg = error?.data?.error || error.message;
              console.error('Expense Added:', errorMsg);
              notify({
                type: 'error',
                message: 'Expense Added',
                description: errorMsg,
              });
            },
          });
        }
      })
      .catch((error) => console.error('Validation Failed:', error));
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <>
      {isEdit ? (
        <Button
          type="text"
          icon={<EditOutlined className={styles.editIcon} />}
          onClick={handleOpenModal}
        />
      ) : (
        <Button type="primary" size="middle" onClick={handleOpenModal}>
          {isEdit ? 'Update Expense' : 'Add Expense'}
        </Button>
      )}
      <Modal
        width={460}
        title="Add Expense"
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
            loading={isPending || updatePending}
          >
            {isEdit ? 'Save Changes' : 'Add'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="add-expense-form"
          className={styles.addExpenseForm}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter expense title" />
          </Form.Item>
          <Flex gap="middle">
            <Form.Item
              name="price"
              label="Price(PKR)"
              className={styles.flexItem}
              rules={[
                { required: true, message: 'Please enter the price' },
                {
                  type: 'number',
                  min: 0,
                  message: 'Price must be a positive number',
                },
              ]}
            >
              <InputNumber
                className={styles.fullWidth}
                placeholder="Enter expense price"
              />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              className={styles.flexItem}
              rules={[{ required: true, message: 'Please select the date' }]}
            >
              <DatePicker className={styles.fullWidth} />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
