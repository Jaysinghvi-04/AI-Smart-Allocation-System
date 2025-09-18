
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { mockStudents, mockCompanies, mockInternships, mockDiversityData } from '../../constants';
import { InternshipStatus } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </Card>
);

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const CompanyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 14m3-3l2.293 2.293a1 1 0 010 1.414L13 19l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L15 17" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;


const AdminAnalyticsDashboard: React.FC = () => {
    const demandVsCapacity = [
        { name: 'IT', demand: 120, capacity: 80 },
        { name: 'Fintech', demand: 80, capacity: 50 },
        { name: 'Marketing', demand: 95, capacity: 100 },
        { name: 'Data Science', demand: 150, capacity: 60 },
    ];
    
    const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff'];

    const oversubscribedInternships = mockInternships.filter(
        internship => internship.applicants.length > internship.capacity && internship.status !== InternshipStatus.Closed
    );

    return (
        <>
            <DashboardHeader title="Admin Dashboard" />
            <div className="mt-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Students" value={mockStudents.length} icon={<UserIcon />} />
                    <StatCard title="Total Companies" value={mockCompanies.length} icon={<CompanyIcon />} />
                    <StatCard title="Total Internships" value={mockInternships.length} icon={<BriefcaseIcon />} />
                    <StatCard title="AI Accuracy" value="94.7%" icon={<SparklesIcon />} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Demand vs Capacity by Sector</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={demandVsCapacity}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="demand" fill="#8884d8" name="Student Demand" />
                                    <Bar dataKey="capacity" fill="#82ca9d" name="Internship Capacity" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Diversity & Fairness Metrics</h3>
                        <div style={{ width: '100%', height: 300 }}>
                           <ResponsiveContainer>
                            <PieChart>
                                {/* FIX: The 'percent' prop from recharts can be undefined. Coalesce to 0 to prevent arithmetic errors. */}
                                <Pie data={mockDiversityData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}>
                                    {mockDiversityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                 {/* Oversubscribed Internships */}
                <div className="mt-8">
                    <Card>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                           <AlertIcon />
                            Oversubscribed Internships (Requires Attention)
                        </h3>
                        {oversubscribedInternships.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Applicants</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacity</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Oversubscribed By</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-card divide-y divide-border">
                                        {oversubscribedInternships.map(internship => (
                                            <tr key={internship.id} className="hover:bg-muted/50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{internship.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{internship.companyName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{internship.applicants.length}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{internship.capacity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                                                    {internship.applicants.length - internship.capacity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-4">No internships are currently oversubscribed.</p>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AdminAnalyticsDashboard;
