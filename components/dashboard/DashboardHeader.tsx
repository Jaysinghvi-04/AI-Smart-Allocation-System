

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Notification, NotificationType } from '../../types';
import ThemeToggle from '../ui/ThemeToggle';
import { useNotifications } from '../../contexts/NotificationContext';
import Calendar from '../ui/Calendar';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

// --- SVG Icons ---
const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LogoutIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const BellIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const NotificationIcons: React.FC<{ type: NotificationType }> = ({ type }) => {
    const icons = {
        [NotificationType.ApplicationUpdate]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        [NotificationType.NewRecommendation]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 14m3-3l2.293 2.293a1 1 0 010 1.414L13 19l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L15 17" /></svg>,
        [NotificationType.AdminAnnouncement]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.358 1.84 18.674 1.5 19 1.5c.326 0 .642.34 1 .85.358.51.5 1.15.5 1.65 0 1.5-.5 2.5-1.5 3.5-1 .99-2.5 1.5-4 1.5h-1.032a4.001 4.001 0 01-3.268 1.683z" /></svg>,
        [NotificationType.NewApplication]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>,
        [NotificationType.NewCompanyApproval]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" /></svg>,
        [NotificationType.NewInternshipApproval]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    };
    return icons[type] || null;
};

// --- Time Formatting Utility ---
const timeAgo = (dateString: string, t: (key: string) => string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return t('time.now');

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}${t('time.m')} ${t('time.ago')}`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}${t('time.h')} ${t('time.ago')}`;

    const days = Math.floor(hours / 24);
    return `${days}${t('time.d')} ${t('time.ago')}`;
};

interface DashboardHeaderProps {
    title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notifDropdownRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const { t } = useLanguage();
    const {
        studentNotifications, 
        companyNotifications, 
        adminNotifications,
        markStudentNotificationAsRead,
        markCompanyNotificationAsRead,
        markAdminNotificationAsRead,
        markAllStudentNotificationsAsRead,
        markAllCompanyNotificationsAsRead,
        markAllAdminNotificationsAsRead
    } = useNotifications();
    
    // Effect for updating time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
                setIsNotifDropdownOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    let notifications: Notification[] = [];
    let markAsRead: (id: string) => void = () => {};
    let markAllAsRead: () => void = () => {};

    if (location.pathname.startsWith('/student')) {
        notifications = studentNotifications;
        markAsRead = markStudentNotificationAsRead;
        markAllAsRead = markAllStudentNotificationsAsRead;
    } else if (location.pathname.startsWith('/company')) {
        notifications = companyNotifications;
        markAsRead = markCompanyNotificationAsRead;
        markAllAsRead = markAllCompanyNotificationsAsRead;
    } else if (location.pathname.startsWith('/admin')) {
        notifications = adminNotifications;
        markAsRead = markAdminNotificationAsRead;
        markAllAsRead = markAllAdminNotificationsAsRead;
    }

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAsRead = (id: string) => {
        markAsRead(id);
    };
    
    const handleMarkAllAsRead = () => {
        markAllAsRead();
    };

    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = currentDateTime.toLocaleTimeString('en-US');


    return (
        <header className="bg-card shadow-sm border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>

                <div className="flex items-center space-x-2 sm:space-x-4">
                     <div className="relative" ref={calendarRef}>
                        <div
                            className="text-right hidden sm:block cursor-pointer hover:bg-accent p-2 rounded-md transition-colors"
                            onClick={() => setIsCalendarOpen(prev => !prev)}
                            aria-expanded={isCalendarOpen}
                            aria-haspopup="true"
                            aria-controls="calendar-popup"
                        >
                            <p className="font-medium text-sm text-foreground">{formattedDate}</p>
                            <p className="text-xs text-muted-foreground">{formattedTime}</p>
                        </div>
                         {isCalendarOpen && (
                            <div id="calendar-popup" className="absolute top-full right-0 mt-2 z-20 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                                <Calendar />
                            </div>
                        )}
                    </div>
                    <LanguageSwitcher />
                    <ThemeToggle />
                    {/* Notifications Dropdown */}
                    <div className="relative" ref={notifDropdownRef}>
                        <button onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)} className="flex items-center justify-center w-10 h-10 bg-muted rounded-full text-muted-foreground hover:bg-accent transition">
                            <BellIcon />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        {isNotifDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-popover rounded-md shadow-lg z-10 border border-border animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                                <div className="p-3 border-b border-border flex justify-between items-center">
                                    <h4 className="text-sm font-semibold text-popover-foreground">{t('header.notifications')}</h4>
                                    {unreadCount > 0 && (
                                        <button onClick={handleMarkAllAsRead} className="text-xs font-medium text-primary-600 hover:underline">
                                            {t('header.markAllAsRead')}
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? notifications.map(notif => (
                                        <div key={notif.id} onClick={() => handleMarkAsRead(notif.id)} className={`flex items-start p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0 ${!notif.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}>
                                            <div className="flex-shrink-0 mr-3 mt-0.5">
                                                <NotificationIcons type={notif.type} />
                                            </div>
                                            <div className="flex-grow">
                                                <p className={`text-sm ${!notif.isRead ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{notif.message}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.timestamp, t)}</p>
                                            </div>
                                            {!notif.isRead && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 ml-3 flex-shrink-0"></div>}
                                        </div>
                                    )) : (
                                        <p className="p-4 text-sm text-muted-foreground text-center">{t('header.noNotifications')}</p>
                                    )}
                                </div>
                                {location.pathname.startsWith('/student') && (
                                    <Link to="/student/notifications" className="block p-2 bg-muted text-center text-sm font-medium text-primary-600 hover:underline">
                                        {t('header.viewAllNotifications')}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="relative" ref={userDropdownRef}>
                        <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center justify-center w-10 h-10 bg-muted rounded-full text-muted-foreground hover:bg-accent transition">
                            <UserIcon />
                        </button>
                        {isUserDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-1 z-10 border border-border animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                                <Link to="/login" className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent">
                                    <LogoutIcon />
                                    {t('header.logout')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;