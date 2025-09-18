import React, { useState } from 'react';
import { mockApplications, mockStudents, mockInternships } from '../../constants';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ApplicationStatus, AiMatchDetails, Application, NotificationType } from '../../types';
import { useNotifications } from '../../contexts/NotificationContext';

const SparklesIcon: React.FC<{ className?: string }> = ({ className = '' }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.934L13 17.256A1 1 0 0112 18a1 1 0 01-.967-.744L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.934L11 2.744A1 1 0 0112 2z" clipRule="evenodd" /></svg>;

const AiMatchModal: React.FC<{ matchDetails: AiMatchDetails; studentName: string; onClose: () => void }> = ({ matchDetails, studentName, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in-up" onClick={onClose}>
        <Card className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold text-primary-700 flex items-center"><SparklesIcon className="mr-2 text-yellow-500" /> AI Match Insights</h3>
                    <p className="text-muted-foreground">Analysis for {studentName}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="!p-1 h-auto">&times;</Button>
            </div>
            <div className="mt-6 space-y-4">
                <div>
                    <h4 className="font-semibold text-foreground">Overall Match Score: {matchDetails.overallScore}%</h4>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${matchDetails.overallScore}%` }}></div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground">Skill Match: {matchDetails.skillMatch}%</h4>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${matchDetails.skillMatch}%` }}></div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">Preference Match: {matchDetails.preferenceMatch}%</h4>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${matchDetails.preferenceMatch}%` }}></div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">AI Explanation</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md mt-1 border border-border">{matchDetails.explanation}</p>
                </div>
            </div>
        </Card>
    </div>
);

const ApplicationsManagementPage: React.FC = () => {
    const companyInternships = mockInternships.filter(i => i.companyId === 'com1');
    const [applications, setApplications] = useState<Application[]>(mockApplications);
    const [selectedInternship, setSelectedInternship] = useState(companyInternships[0]?.id || '');
    const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'All'>('All');
    const [selectedMatch, setSelectedMatch] = useState<{ details: AiMatchDetails; name: string } | null>(null);
    const { addStudentNotification } = useNotifications();

    const applicants = applications.filter(app => 
        app.internshipId === selectedInternship &&
        (filterStatus === 'All' || app.status === filterStatus)
    );

    const getStudentSkills = (studentId: string) => mockStudents.find(s => s.id === studentId)?.skills || [];
    
    const handleStatusChange = (appId: string, status: ApplicationStatus) => {
        let changedApplication: Application | undefined;

        setApplications(apps => apps.map(app => {
            if (app.id === appId) {
                changedApplication = { ...app, status };
                return changedApplication;
            }
            return app;
        }));

        if (changedApplication) {
            addStudentNotification({
                type: NotificationType.ApplicationUpdate,
                message: `Your application for ${changedApplication.internshipRole} at ${changedApplication.companyName} has been updated to "${status}".`,
                relatedId: appId,
            });
        }
    };

    const handleViewResume = (studentName: string) => {
        alert(`Displaying resume for ${studentName}. (This is a placeholder action).`);
    };

    const exportToCSV = () => {
        const headers = ["Student Name", "Applied Date", "Status", "AI Match Score", "Skills"];
        const rows = applicants.map(app => [
            app.studentName,
            app.appliedDate,
            app.status,
            app.aiMatch?.overallScore || 'N/A',
            getStudentSkills(app.studentId).join('; ')
        ]);
        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `applicants_${companyInternships.find(i=>i.id === selectedInternship)?.role}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <DashboardHeader title="Applications Management" />
            {selectedMatch && <AiMatchModal matchDetails={selectedMatch.details} studentName={selectedMatch.name} onClose={() => setSelectedMatch(null)} />}
            <div className="mt-8">
                <Card className="mb-6">
                    <label htmlFor="internship-select" className="block text-sm font-medium text-foreground mb-1">Select Internship Posting</label>
                    <select
                        id="internship-select"
                        className="w-full px-3 py-2 border border-input bg-card rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        value={selectedInternship}
                        onChange={e => setSelectedInternship(e.target.value)}
                    >
                        {companyInternships.map(i => <option key={i.id} value={i.id}>{i.role}</option>)}
                    </select>
                </Card>

                {selectedInternship && (
                    <Card>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Applicants for {companyInternships.find(i=>i.id === selectedInternship)?.role}</h3>
                            <div className="flex items-center gap-2">
                                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="px-3 py-1.5 border border-input bg-card rounded-md text-sm">
                                    <option value="All">All Statuses</option>
                                    {Object.values(ApplicationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <Button variant="secondary" size="sm" onClick={exportToCSV}>Export to CSV</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Candidate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">AI Match</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Skills</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-card divide-y divide-border">
                                    {applicants.map(app => (
                                        <tr key={app.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{app.studentName}</td>
                                            <td className="px-6 py-4">
                                                {app.aiMatch ? (
                                                     <button onClick={() => setSelectedMatch({details: app.aiMatch!, name: app.studentName})} className="font-semibold text-primary-600 hover:underline flex items-center">
                                                        <SparklesIcon className="w-4 h-4 mr-1 text-yellow-500" />
                                                        {app.aiMatch.overallScore}%
                                                    </button>
                                                ) : <span className="text-muted-foreground text-sm">N/A</span>}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground truncate" style={{maxWidth: '200px'}}>{getStudentSkills(app.studentId).join(', ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{app.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleViewResume(app.studentName)}>Resume</Button>
                                                <Button size="sm" onClick={() => handleStatusChange(app.id, ApplicationStatus.Shortlisted)}>Shortlist</Button>
                                                <Button size="sm" variant="secondary" onClick={() => handleStatusChange(app.id, ApplicationStatus.Selected)}>Select</Button>
                                                <Button variant="danger" size="sm" onClick={() => handleStatusChange(app.id, ApplicationStatus.Rejected)}>Reject</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
};

export default ApplicationsManagementPage;
