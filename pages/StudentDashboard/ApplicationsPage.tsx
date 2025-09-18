import React, { useState } from 'react';
import { mockApplications } from '../../constants';
import type { Application } from '../../types';
import { ApplicationStatus } from '../../types';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';

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

const ApplicationRow: React.FC<{ application: Application }> = ({ application }) => (
    <tr className="border-b border-border hover:bg-muted/50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{application.internshipRole}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{application.companyName}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{application.appliedDate}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <StatusBadge status={application.status} />
        </td>
    </tr>
);

const ApplicationsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'All'>('All');

  const studentApplications = mockApplications.filter(app => app.studentId === 'stu1');

  const filteredApplications = filterStatus === 'All'
    ? studentApplications
    : studentApplications.filter(app => app.status === filterStatus);
    
  const filterOptions: (ApplicationStatus | 'All')[] = ['All', ...Object.values(ApplicationStatus)];

  return (
    <>
      <DashboardHeader title="My Applications" />
      <div className="mt-8">
        <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Your Application History</h3>
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Applied Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map(application => (
                                <ApplicationRow key={application.id} application={application} />
                            ))
                        ) : (
                             <tr>
                                <td colSpan={4} className="text-center py-10 text-muted-foreground">
                                    No applications found with this status.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </>
  );
};

export default ApplicationsPage;