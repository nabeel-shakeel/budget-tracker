import { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

type NotificationType = 'success' | 'error';

interface NotifyParams {
  type: NotificationType;
  message: string;
  description?: string;
}

interface NotificationContextProps {
  notify: (params: NotifyParams) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

const notificationStyles = {
  success: {
    iconColor: '#08B461',
    color: '#08B461',
    backgroundColor: '#E1F3EC',
    border: '1px solid #3EC484',
  },
  error: {
    iconColor: '#EA3B3B',
    backgroundColor: '#F3E1EA',
    border: '1px solid #C43E5E',
  },
};

function NotificationProvider({ children }: { children: ReactNode }) {
  const notify = ({ type, message, description }: NotifyParams) => {
    const icon =
      type === 'success' ? (
        <CheckCircleOutlined
          style={{ color: notificationStyles['success'].iconColor }}
        />
      ) : (
        <CloseCircleOutlined
          style={{ color: notificationStyles['error'].iconColor }}
        />
      );

    notification.open({
      message,
      description,
      placement: 'topRight',
      duration: 100,
      icon,
      style: {
        minWidth: 300,
        padding: '10px',
        borderRadius: '6px',
        ...notificationStyles[type],
      },
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
}

const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export { NotificationProvider, useNotification };
