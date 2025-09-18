

import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useParams, useLocation, Link } from 'react-router-dom';
import { mockStudents } from '../../constants';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Spinner from '../../components/ui/Spinner';

// --- SVG Icons ---
const DownloadIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 mr-3 text-yellow-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 14m3-3l2.293 2.293a1 1 0 010 1.414L13 19l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L15 17" />
    </svg>
);


const StudentProfilePage: React.FC = () => {
  const params = useParams<{ studentId: string }>();
  const location = useLocation();

  const isAdminView = location.pathname.startsWith('/admin');
  const studentId = isAdminView ? params.studentId : 'stu1'; // 'stu1' is the logged-in student for demo

  const [initialStudentData] = useState(() => mockStudents.find(s => s.id === studentId));
  
  const [student, setStudent] = useState(initialStudentData);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ skill: string; reason: string }[] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  if (!student || !initialStudentData) {
    return (
        <>
            <DashboardHeader title="Error" />
            <div className="text-center p-8 mt-8">
                <Card>
                    <h2 className="text-2xl font-bold text-foreground">Student Not Found</h2>
                    <p className="text-muted-foreground mt-2">The requested student profile does not exist.</p>
                    {isAdminView && <Button as={Link} to="/admin/students" className="mt-4">Back to Student Management</Button>}
                </Card>
            </div>
        </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id.startsWith('pref-')) {
        const prefKey = id.split('-')[1];
        setStudent(prev => ({ ...prev!, preferences: { ...prev!.preferences, [prefKey]: value } }));
    } else {
        setStudent(prev => ({ ...prev!, [id]: value }));
    }
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent(prev => ({...prev!, skills: e.target.value.split(',').map(s => s.trim())}));
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setIsUploading(true);
      setUploadSuccess(false);

      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        setStudent(prev => ({ ...prev!, resumeUrl: file.name }));
        setResumeFile(null);
        setAnalysisResult(null);
        setAnalysisError(null);
        setTimeout(() => setUploadSuccess(false), 3000);
      }, 2000);
    }
  };
  
  const handleResumeAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    if (!student.resumeUrl) {
        setAnalysisError("Please upload a resume first.");
        setIsAnalyzing(false);
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const resumeContent = `
            Student Profile:
            - Education: ${student.education}
            - Current Skills: ${student.skills.join(', ')}
            - Preferred Sectors: ${student.preferences.sector.join(', ')}
        `;

        const prompt = `Based on the following student profile, which simulates their resume, identify 5-7 key technical or soft skills they are likely missing to be a strong candidate in their preferred fields. For each skill, provide a brief (1 sentence) explanation for why it's important for their career goals. Return the result as a JSON array of objects, where each object has 'skill' and 'reason' properties.
        
        ${resumeContent}
        `;

        const responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    reason: { type: Type.STRING },
                },
                required: ["skill", "reason"],
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema,
            },
        });

        const result = JSON.parse(response.text);
        setAnalysisResult(result);

    } catch (error) {
        console.error("AI analysis failed:", error);
        setAnalysisError("Failed to analyze profile. The AI engine might be busy. Please try again later.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving student data:", student);
    alert('Student data saved successfully!');
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setStudent(initialStudentData);
    setResumeFile(null);
    setIsUploading(false);
    setUploadSuccess(false);
  };

  return (
    <>
      <DashboardHeader title={isAdminView ? `Student Profile: ${student.name}` : "My Profile"} />
      <div className="mt-8">
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Profile Information</h3>
                <div className="flex items-center space-x-2">
                    {isAdminView && !isEditing && <Button as={Link} to="/admin/students" variant="secondary">Back to Students</Button>}
                    {isEditing ? (
                        <>
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" id="name" value={student.name} onChange={handleInputChange} disabled={!isEditing} />
            <Input label="Email Address" id="email" type="email" value={student.email} onChange={handleInputChange} disabled={!isEditing} />
            <Input label="Education" id="education" value={student.education} onChange={handleInputChange} disabled={!isEditing} />
            <Input label="Skills (comma separated)" id="skills" value={student.skills.join(', ')} onChange={handleSkillsChange} disabled={!isEditing} />

            <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Internship Preferences</h4>
            </div>

            <Input label="Preferred Sector(s)" id="pref-sector" value={student.preferences.sector.join(', ')} onChange={e => setStudent(prev => ({...prev!, preferences: {...prev!.preferences, sector: e.target.value.split(',').map(s => s.trim())}}))} disabled={!isEditing} />
            <Input label="Preferred Location(s)" id="pref-location" value={student.preferences.location.join(', ')} onChange={e => setStudent(prev => ({...prev!, preferences: {...prev!.preferences, location: e.target.value.split(',').map(s => s.trim())}}))} disabled={!isEditing} />
            <Input label="Preferred Duration" id="pref-duration" value={student.preferences.duration} onChange={handleInputChange} disabled={!isEditing} />
            <Input label="Minimum Stipend (per month)" id="pref-stipend" type="number" value={student.preferences.stipend} onChange={handleInputChange} disabled={!isEditing} />
            
            <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">Resume</h4>
                <div className="p-4 border border-dashed border-border rounded-md">
                    <div className="flex items-center justify-between">
                         <p className="text-muted-foreground flex-grow truncate pr-4">
                            {resumeFile ? resumeFile.name : (student.resumeUrl || 'No resume uploaded.')}
                        </p>
                        
                        {!isEditing && student.resumeUrl && (
                            <Button as="a" href="#" download={student.resumeUrl} variant="secondary" size="sm" className="inline-flex items-center flex-shrink-0">
                                <DownloadIcon className="mr-2"/>
                                Download
                            </Button>
                        )}

                        {isEditing && !isUploading && (
                             <div className="flex-shrink-0">
                                <Input id="resume-upload" type="file" label="" className="hidden" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
                                <label htmlFor="resume-upload">
                                    <Button variant="secondary" as="span" className="cursor-pointer">
                                        {student.resumeUrl ? 'Replace Resume' : 'Upload Resume'}
                                    </Button>
                                </label>
                            </div>
                        )}
                    </div>

                    {isEditing && (isUploading || uploadSuccess) && (
                        <div className="mt-3">
                            {isUploading && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Spinner className="mr-2 h-4 w-4"/>
                                    Uploading...
                                </div>
                            )}
                            {uploadSuccess && (
                                <div className="flex items-center text-sm text-green-600 font-medium animate-fade-in-up">
                                    <CheckCircleIcon className="mr-1.5" />
                                    Resume uploaded successfully!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
          </div>
        </Card>
        
        <Card className="mt-8 animate-fade-in-up">
            <div className="flex items-center mb-4">
                <SparklesIcon />
                <h3 className="text-xl font-semibold text-foreground">AI Skill Gap Analysis</h3>
            </div>
            <p className="text-muted-foreground mb-6">
                Let our AI analyze your profile against your career preferences to identify key skills you can learn to become a top candidate.
            </p>

            {isAnalyzing && (
                <div className="flex justify-center items-center py-8">
                    <Spinner className="w-8 h-8" />
                    <p className="ml-4 text-muted-foreground">Analyzing your skills...</p>
                </div>
            )}

            {analysisError && (
                <div className="text-center py-4 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800">
                    <p className="font-semibold">Analysis Failed</p>
                    <p className="text-sm mt-1">{analysisError}</p>
                </div>
            )}

            {analysisResult && (
                <div className="animate-fade-in-up">
                     <h4 className="font-semibold text-foreground mb-4">Recommended Skills to Learn:</h4>
                     <ul className="space-y-4">
                        {analysisResult.map((item, index) => (
                            <li key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
                                <h5 className="font-bold text-primary-700 dark:text-primary-400">{item.skill}</h5>
                                <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                            </li>
                        ))}
                    </ul>
                     <div className="text-center mt-6">
                         <Button variant="secondary" onClick={handleResumeAnalysis} disabled={isAnalyzing}>
                            {isAnalyzing ? <Spinner className="w-5 h-5"/> : 'Re-analyze Profile'}
                         </Button>
                    </div>
                </div>
            )}
            
            {!isAnalyzing && !analysisResult && !analysisError && (
                <div className="text-center border-t border-border pt-6">
                    <Button 
                        onClick={handleResumeAnalysis} 
                        disabled={isAnalyzing || !student.resumeUrl}
                        aria-label={!student.resumeUrl ? "Upload a resume to enable analysis" : "Analyze my profile with AI"}
                    >
                        {student.resumeUrl ? "Analyze My Profile" : "Upload Resume to Analyze"}
                    </Button>
                    {!student.resumeUrl && (
                         <p className="text-xs text-muted-foreground mt-2">An uploaded resume is required for analysis.</p>
                    )}
                </div>
            )}

        </Card>
      </div>
    </>
  );
};

export default StudentProfilePage;