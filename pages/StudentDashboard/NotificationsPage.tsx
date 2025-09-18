

import React from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationType } from '../../types';

// --- SVG Icons ---
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
const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `now`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};


const NotificationsPage: React.FC = () => {
    const { studentNotifications, markStudentNotificationAsRead, markAllStudentNotificationsAsRead } = useNotifications();
    const unreadCount = studentNotifications.filter(n => !n.isRead).length;

    return (
        <>
            <DashboardHeader title="Notifications" />
            <div className="mt-8">
                <Card>
                    <div className="flex justify-between items-center p-4 border-b border-border">
                        <h3 className="text-xl font-semibold text-foreground">All Notifications</h3>
                        {unreadCount > 0 && (
                        <Button variant="secondary" size="sm" onClick={markAllStudentNotificationsAsRead}>
                            Mark all as read
                        </Button>
                        )}
                    </div>
                    <div className="divide-y divide-border">
                        {studentNotifications.length > 0 ? (
                        studentNotifications.map(notif => (
                            <div 
                                key={notif.id} 
                                onClick={() => markStudentNotificationAsRead(notif.id)} 
                                className={`flex items-start p-4 transition-colors cursor-pointer ${!notif.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : 'hover:bg-accent'}`}
                            >
                                <div className="flex-shrink-0 mr-4 mt-1">
                                    <NotificationIcons type={notif.type} />
                                </div>
                                <div className="flex-grow">
                                    <p className={`text-sm ${!notif.isRead ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.timestamp)}</p>
                                </div>
                                {!notif.isRead && (
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 ml-4 flex-shrink-0"></div>
                                )}
                            </div>
                        ))
                        ) : (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-semibold text-foreground">No Notifications Yet</h2>
                            <p className="text-muted-foreground mt-2">Check back here for updates on your applications and recommendations.</p>
                        </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default NotificationsPage;
