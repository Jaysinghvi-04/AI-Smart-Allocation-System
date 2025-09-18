
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Spinner from '../../components/ui/Spinner';
import ExportButton from '../../components/ui/ExportButton';

const AllocationEnginePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const runAllocation = () => {
        setIsLoading(true);
        setIsComplete(false);
        setTimeout(() => {
            setIsLoading(false);
            setIsComplete(true);
        }, 3000); // Simulate a 3-second allocation process
    };

    const handleOverride = (studentName: string) => {
        alert(`Manual override for ${studentName} initiated. This action would typically require secondary approval and will be logged.`);
    };

    const fairnessMetrics = [
        { name: 'Rural / Aspirational Districts', value: '15%', status: 'good' },
        { name: 'Social Diversity (Category)', value: '25%', status: 'good' },
        { name: 'Gender Balance', value: '48% F / 52% M', status: 'good' },
        { name: 'First-Time Participants', value: '70%', status: 'good' },
    ];

    const allocationResults = [
        { student: 'Aarav Sharma', company: 'InnovateTech Solutions', role: 'Frontend Developer' },
        { student: 'Rohan Gupta', company: 'FinSecure Capital', role: 'Data Analyst' },
        { student: 'Diya Patel', company: 'MarketPro Inc.', role: 'Digital Marketing' },
    ];

    return (
        <>
            <DashboardHeader title="AI Allocation Engine" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Control Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Run Allocation</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Start the automated process to match students with internships based on skills, preferences, and fairness criteria.
                        </p>
                        <Button onClick={runAllocation} disabled={isLoading} className="w-full">
                            {isLoading ? <><Spinner className="mr-2"/> Running...</> : 'Run Batch Allocation'}
                        </Button>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Fairness Metrics</h3>
                        <div className="space-y-3">
                            {fairnessMetrics.map(metric => (
                                <div key={metric.name} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">{metric.name}</span>
                                    <span className="font-semibold text-slate-800">{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Results */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-slate-800">Allocation Results</h3>
                            {isComplete && !isLoading && (
                                <ExportButton
                                    data={allocationResults}
                                    headers={[
                                        { label: 'Student', key: 'student' },
                                        { label: 'Allocated Company', key: 'company' },
                                        { label: 'Role', key: 'role' }
                                    ]}
                                    filename="ai_allocation_results"
                                    reportName="AI Allocation Results"
                                />
                            )}
                        </div>
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-64">
                                <Spinner className="w-12 h-12" />
                                <p className="mt-4 text-slate-600">AI is processing matches...</p>
                            </div>
                        )}
                        {isComplete && !isLoading && (
                             <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Allocated Company</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {allocationResults.map((res, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{res.student}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{res.company}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{res.role}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <Button variant="secondary" size="sm" onClick={() => handleOverride(res.student)}>Override</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {!isLoading && !isComplete && (
                             <div className="text-center h-64 flex items-center justify-center">
                                <p className="text-slate-500">Run the allocation engine to see results.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AllocationEnginePage;