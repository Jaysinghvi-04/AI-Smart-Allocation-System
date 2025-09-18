
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { mockApplications } from '../../constants';
import { ApplicationStatus } from '../../types';

const StudentAnalyticsPage: React.FC = () => {
    const applicationData = [
        { name: 'Applied', value: mockApplications.filter(a => a.studentId === 'stu1').length },
        { name: 'Shortlisted', value: mockApplications.filter(a => a.studentId === 'stu1' && a.status === ApplicationStatus.Shortlisted).length },
        { name: 'Selected', value: mockApplications.filter(a => a.studentId === 'stu1' && a.status === ApplicationStatus.Selected).length },
    ];
    
    const skillGapData = [
        { skill: 'React', current: 90, required: 85 },
        { skill: 'Node.js', current: 80, required: 90 },
        { skill: 'Python', current: 85, required: 85 },
        { skill: 'SQL', current: 70, required: 80 },
        { skill: 'TypeScript', current: 75, required: 90 },
    ];

    const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd'];


    return (
        <>
            <DashboardHeader title="My Analytics" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Application Funnel</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                {/* FIX: The 'percent' prop from recharts can be undefined. Coalesce to 0 to prevent arithmetic errors. */}
                                <Pie data={applicationData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}>
                                    {applicationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Skill Gap Analysis</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={skillGapData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="skill" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="current" fill="#82ca9d" name="Your Skill Level" />
                                <Bar dataKey="required" fill="#8884d8" name="Avg. Required Level" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default StudentAnalyticsPage;
