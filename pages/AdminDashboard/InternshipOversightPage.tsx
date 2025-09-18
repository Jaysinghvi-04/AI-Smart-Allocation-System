import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import { mockInternships } from '../../constants';
import { Internship, InternshipStatus } from '../../types';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

const InternshipOversightPage: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>(mockInternships);
    const [filterStatus, setFilterStatus] = useState<InternshipStatus | 'All'>('All');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [internshipToDelete, setInternshipToDelete] = useState<string | null>(null);

    const filteredInternships = filterStatus === 'All'
        ? internships
        : internships.filter(i => i.status === filterStatus);

    const filterOptions: (InternshipStatus | 'All')[] = ['All', ...Object.values(InternshipStatus)];

    const handleStatusChange = (internshipId: string, newStatus: InternshipStatus) => {
        setInternships(prev => prev.map(i => i.id === internshipId ? { ...i, status: newStatus } : i));
    };

    const handleDeleteRequest = (internshipId: string) => {
        setInternshipToDelete(internshipId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (internshipToDelete) {
            setInternships(prev => prev.filter(i => i.id !== internshipToDelete));
        }
        setIsDeleteModalOpen(false);
        setInternshipToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setInternshipToDelete(null);
    };
    
    const handleEdit = () => {
        alert("This action would open a modal for editing internship details.");
    };

    const StatusBadge: React.FC<{ status: InternshipStatus }> = ({ status }) => {
        const statusClasses = {
          [InternshipStatus.Active]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
          [InternshipStatus.Upcoming]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
          [InternshipStatus.Closed]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
          [InternshipStatus.PendingApproval]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
          [InternshipStatus.Rejected]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return (
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
          </span>
        );
    };

    return (
        <>
            <DashboardHeader title="Internship Oversight" />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to permanently delete this internship posting? This action cannot be undone."
                confirmText="Delete"
            />
            <div className="mt-8">
                <Card>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">All Internship Postings</h3>
                        <div className="flex flex-wrap gap-2">
                             {filterOptions.map(status => (
                                <Button
                                    key={status}
                                    size="sm"
                                    variant={filterStatus === status ? 'primary' : 'secondary'}
                                    onClick={() => setFilterStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border">
                                {filteredInternships.map(i => (
                                    <tr key={i.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-foreground">{i.role}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{i.companyName}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{i.location}</td>
                                        <td className="px-6 py-4 text-sm"><StatusBadge status={i.status} /></td>
                                        <td className="px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                                            {i.status === InternshipStatus.PendingApproval && <>
                                                <Button size="sm" onClick={() => handleStatusChange(i.id, InternshipStatus.Active)}>Approve</Button>
                                                <Button variant="danger" size="sm" onClick={() => handleStatusChange(i.id, InternshipStatus.Rejected)}>Reject</Button>
                                            </>}
                                            <Button variant="ghost" size="sm" onClick={handleEdit}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteRequest(i.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default InternshipOversightPage;
