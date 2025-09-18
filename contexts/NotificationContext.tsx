import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Notification } from '../types';
import { 
    mockNotifications as initialStudentNotifications, 
    mockCompanyNotifications as initialCompanyNotifications,
    mockAdminNotifications as initialAdminNotifications 
} from '../constants';

interface NotificationContextType {
  studentNotifications: Notification[];
  companyNotifications: Notification[];
  adminNotifications: Notification[];
  addStudentNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  addCompanyNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  addAdminNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markStudentNotificationAsRead: (id: string) => void;
  markCompanyNotificationAsRead: (id: string) => void;
  markAdminNotificationAsRead: (id: string) => void;
  markAllStudentNotificationsAsRead: () => void;
  markAllCompanyNotificationsAsRead: () => void;
  markAllAdminNotificationsAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [studentNotifications, setStudentNotifications] = useState<Notification[]>(initialStudentNotifications);
    const [companyNotifications, setCompanyNotifications] = useState<Notification[]>(initialCompanyNotifications);
    const [adminNotifications, setAdminNotifications] = useState<Notification[]>(initialAdminNotifications);

    const createNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>): Notification => ({
        ...notification,
        id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
        isRead: false,
    });

    const addStudentNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
        setStudentNotifications(prev => [createNotification(notification), ...prev]);
    };

    const addCompanyNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
        setCompanyNotifications(prev => [createNotification(notification), ...prev]);
    };

    const addAdminNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
        setAdminNotifications(prev => [createNotification(notification), ...prev]);
    };

    const markStudentNotificationAsRead = (id: string) => {
        setStudentNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markCompanyNotificationAsRead = (id: string) => {
        setCompanyNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAdminNotificationAsRead = (id: string) => {
        setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllStudentNotificationsAsRead = () => {
        setStudentNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const markAllCompanyNotificationsAsRead = () => {
        setCompanyNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const markAllAdminNotificationsAsRead = () => {
        setAdminNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };
    
    const value = {
        studentNotifications,
        companyNotifications,
        adminNotifications,
        addStudentNotification,
        addCompanyNotification,
        addAdminNotification,
        markStudentNotificationAsRead,
        markCompanyNotificationAsRead,
        markAdminNotificationAsRead,
        markAllStudentNotificationsAsRead,
        markAllCompanyNotificationsAsRead,
        markAllAdminNotificationsAsRead
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
