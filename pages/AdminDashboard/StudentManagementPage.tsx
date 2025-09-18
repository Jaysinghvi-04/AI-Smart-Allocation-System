import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { mockStudents } from '../../constants';
import type { StudentProfile } from '../../types';
import { AccountStatus } from '../../types';
import ExportButton from '../../components/ui/ExportButton';

const StudentManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<StudentProfile[]>(mockStudents);

    const filteredStudents = useMemo(() => 
        students.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            s.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm, students]);
        
    const handleStudentStatusChange = (studentId: string) => {
        setStudents(prev => prev.map(s => {
            if (s.id === studentId) {
                const newStatus = s.status === AccountStatus.Active ? AccountStatus.Suspended : AccountStatus.Active;
                return { ...s, status: newStatus };
            }
            return s;
        }));
    };

    const StatusBadge: React.FC<{ status: AccountStatus }> = ({ status }) => {
        const statusClasses = {
            [AccountStatus.PendingApproval]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            [AccountStatus.Active]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            [AccountStatus.Suspended]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
            [AccountStatus.Rejected]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        return (
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
          </span>
        );
    };

    return (
        <>
            <DashboardHeader title="Student Management" />
            <div className="mt-8">
                 <Card className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full px-3 py-2 border border-input bg-transparent rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-foreground">Student Accounts</h3>
                        <ExportButton 
                            data={filteredStudents}
                            headers={[
                                { label: 'Name', key: 'name' },
                                { label: 'Email', key: 'email' },
                                { label: 'Education', key: 'education' },
                                { label: 'Status', key: 'status' }
                            ]}
                            filename="student_accounts_export"
                            reportName="Student Accounts Report"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Education</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border">
                                {filteredStudents.map(s => (
                                    <tr key={s.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-foreground">{s.name}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{s.email}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{s.education}</td>
                                        <td className="px-6 py-4 text-sm"><StatusBadge status={s.status} /></td>
                                        <td className="px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                                            <Button 
                                                variant={s.status === AccountStatus.Suspended ? 'secondary' : 'danger'} 
                                                size="sm"
                                                onClick={() => handleStudentStatusChange(s.id)}
                                            >
                                                {s.status === AccountStatus.Suspended ? 'Reactivate' : 'Suspend'}
                                            </Button>
                                            <Button as={Link} to={`/admin/students/${s.id}`} variant="ghost" size="sm">View Profile</Button>
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

export default StudentManagementPage;
