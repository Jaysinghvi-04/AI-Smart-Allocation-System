
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { mockApplications, mockStudents } from '../../constants';

const CompanyAnalyticsPage: React.FC = () => {
    const applicantStats = [
        { name: 'Frontend Intern', applied: 45, shortlisted: 12, selected: 4 },
        { name: 'Backend Intern', applied: 60, shortlisted: 10, selected: 3 },
    ];
    
    const applicantSkills = mockApplications
        .map(app => mockStudents.find(s => s.id === app.studentId)?.skills || [])
        .flat();

    const skillDistribution = applicantSkills.reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const skillData = Object.entries(skillDistribution).map(([name, value]) => ({ name, value }));
    const COLORS = ['#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7'];

    return (
        <>
            <DashboardHeader title="Company Analytics" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Applicant Funnel by Role</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={applicantStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="applied" fill="#8884d8" />
                                <Bar dataKey="shortlisted" fill="#82ca9d" />
                                <Bar dataKey="selected" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Applicant Demographics by Skill</h3>
                    <div style={{ width: '100%', height: 300 }}>
                         <ResponsiveContainer>
                            <PieChart>
                                {/* FIX: The 'percent' prop from recharts can be undefined. Coalesce to 0 to prevent arithmetic errors. */}
                                <Pie data={skillData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}>
                                    {skillData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default CompanyAnalyticsPage;
