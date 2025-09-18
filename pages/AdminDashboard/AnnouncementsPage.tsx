import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { mockAnnouncements } from '../../constants';
import type { Announcement } from '../../types';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationType } from '../../types';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
    const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; content: string; audience: Announcement['audience'] }>({ title: '', content: '', audience: 'All' });
    const { addStudentNotification, addCompanyNotification } = useNotifications();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);

    const handleSend = () => {
        if (!newAnnouncement.title || !newAnnouncement.content) {
            alert('Please fill in both title and content.');
            return;
        }
        const announcement: Announcement = {
            id: `ann-${Date.now()}`,
            ...newAnnouncement,
            date: new Date().toISOString(),
        };
        setAnnouncements(prev => [announcement, ...prev]);

        // Send notification to the appropriate audience
        const notificationPayload = {
            type: NotificationType.AdminAnnouncement,
            message: newAnnouncement.title,
        };

        if (newAnnouncement.audience === 'All' || newAnnouncement.audience === 'Students') {
            addStudentNotification(notificationPayload);
        }
        if (newAnnouncement.audience === 'All' || newAnnouncement.audience === 'Companies') {
            addCompanyNotification(notificationPayload);
        }


        setNewAnnouncement({ title: '', content: '', audience: 'All' });
        alert('Announcement sent successfully!');
    };
    
    const handleDeleteRequest = (announcementId: string) => {
        setAnnouncementToDelete(announcementId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (announcementToDelete) {
            setAnnouncements(prev => prev.filter(ann => ann.id !== announcementToDelete));
        }
        setIsDeleteModalOpen(false);
        setAnnouncementToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setAnnouncementToDelete(null);
    };

    return (
        <>
            <DashboardHeader title="Announcements" />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this announcement? This action cannot be undone."
                confirmText="Delete"
            />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Announcement */}
                <div className="lg:col-span-1">
                    <Card>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Create Announcement</h3>
                        <div className="space-y-4">
                            <Input 
                                label="Title" 
                                id="title" 
                                value={newAnnouncement.title}
                                onChange={e => setNewAnnouncement(p => ({...p, title: e.target.value}))}
                            />
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">Content</label>
                                <textarea 
                                    id="content" 
                                    rows={5} 
                                    className="w-full px-3 py-2 border border-input rounded-md bg-transparent"
                                    value={newAnnouncement.content}
                                    onChange={e => setNewAnnouncement(p => ({...p, content: e.target.value}))}
                                ></textarea>
                            </div>
                             <div>
                                <label htmlFor="audience" className="block text-sm font-medium text-foreground mb-1">Audience</label>
                                <select 
                                    id="audience"
                                    className="w-full px-3 py-2 border border-input rounded-md bg-card"
                                    value={newAnnouncement.audience}
                                    onChange={e => setNewAnnouncement(p => ({...p, audience: e.target.value as Announcement['audience']}))}
                                >
                                    <option>All</option>
                                    <option>Students</option>
                                    <option>Companies</option>
                                </select>
                            </div>
                            <Button className="w-full" onClick={handleSend}>Send Announcement</Button>
                        </div>
                    </Card>
                </div>

                {/* Sent Announcements */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-xl font-semibold text-foreground mb-4">Sent History</h3>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {announcements.length > 0 ? announcements.map(ann => (
                                <div key={ann.id} className="p-4 border border-border rounded-md bg-muted">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-foreground">{ann.title}</h4>
                                            <p className="text-xs text-muted-foreground">
                                                To: {ann.audience} | On: {new Date(ann.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteRequest(ann.id)}>Delete</Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{ann.content}</p>
                                </div>
                            )) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    No announcements have been sent yet.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AnnouncementsPage;
