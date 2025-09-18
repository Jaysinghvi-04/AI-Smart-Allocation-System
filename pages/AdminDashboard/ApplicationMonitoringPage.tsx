

import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import { mockApplications } from '../../constants';
import { ApplicationStatus } from '../../types';

const ApplicationMonitoringPage: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'All'>('All');

    const filteredApplications = useMemo(() => {
        if (filterStatus === 'All') return mockApplications;
        return mockApplications.filter(app => app.status === filterStatus);
    }, [filterStatus]);

    const filterOptions: (ApplicationStatus | 'All')[] = ['All', ...Object.values(ApplicationStatus)];

    const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
        const statusClasses = {
          [ApplicationStatus.Pending]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
          [ApplicationStatus.Shortlisted]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
          [ApplicationStatus.Selected]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
          [ApplicationStatus.Rejected]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return (
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
          </span>
        );
    };

    return (
        <>
            <DashboardHeader title="Application Monitoring" />
            <div className="mt-8">
                <Card>
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">All Student Applications</h3>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Internship Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Applied Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border">
                                {filteredApplications.map(app => (
                                    <tr key={app.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-foreground">{app.studentName}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{app.internshipRole}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{app.companyName}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{app.appliedDate}</td>
                                        <td className="px-6 py-4 text-sm"><StatusBadge status={app.status} /></td>
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

export default ApplicationMonitoringPage;