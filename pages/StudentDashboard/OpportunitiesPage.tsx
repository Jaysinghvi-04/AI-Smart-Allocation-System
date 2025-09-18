
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { mockInternships, mockApplications, mockStudents } from '../../constants';
import type { Internship, AiRecommendation, Application } from '../../types';
import { ApplicationStatus } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Spinner from '../../components/ui/Spinner';
import InternshipDetailModal from '../../components/dashboard/InternshipDetailModal';

const LocationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CashIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SparklesIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 mr-2 text-yellow-500" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 14m3-3l2.293 2.293a1 1 0 010 1.414L13 19l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L15 17" /></svg>;
const DeadlineIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const StatusTag: React.FC<{ internship: Internship }> = ({ internship }) => {
    const isDeadlinePassed = new Date(internship.deadline) < new Date();
    if (isDeadlinePassed) {
        return <span className="absolute top-2 right-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full z-10">DEADLINE PASSED</span>;
    }

    const isCapacityFull = internship.applicants.length >= internship.capacity;
    if (isCapacityFull) {
        return <span className="absolute top-2 right-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full z-10">SLOTS FULL</span>;
    }

    return null;
};

const InternshipCard: React.FC<{ internship: Internship; onApply: (internship: Internship) => void; isApplied: boolean; onViewDetails: (internship: Internship) => void; }> = ({ internship, onApply, isApplied, onViewDetails }) => {
    const isDeadlinePassed = new Date(internship.deadline) < new Date();
    const isCapacityFull = internship.applicants.length >= internship.capacity;

    let buttonText = 'Apply Now';
    let isButtonDisabled = isApplied;

    if (isDeadlinePassed) {
        buttonText = 'Deadline Passed';
        isButtonDisabled = true;
    } else if (isCapacityFull && !isApplied) {
        buttonText = 'Slots Full';
        isButtonDisabled = true;
    } else if (isApplied) {
        buttonText = 'Applied';
    }

    return (
        <Card className="flex flex-col relative" onClick={() => onViewDetails(internship)}>
            <StatusTag internship={internship} />
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-primary-700">{internship.role}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-3">{internship.companyName}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {internship.skillsRequired.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{skill}</span>
                    ))}
                </div>
                <div className="space-y-2 text-sm text-foreground">
                    <div className="flex items-center"><LocationIcon /> {internship.location}</div>
                    <div className="flex items-center"><CalendarIcon /> {internship.duration}</div>
                    <div className="flex items-center"><CashIcon /> ₹{internship.stipend.toLocaleString()}/month</div>
                    <div className="flex items-center"><DeadlineIcon /> Apply by {new Date(internship.deadline).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="mt-6">
                <Button className="w-full" onClick={(e) => { e.stopPropagation(); onApply(internship); }} disabled={isButtonDisabled}>
                    {buttonText}
                </Button>
            </div>
        </Card>
    );
};

const RecommendationCard: React.FC<{ rec: AiRecommendation; onApply: (rec: AiRecommendation) => void; isApplied: boolean; onViewDetails: (rec: AiRecommendation) => void; }> = ({ rec, onApply, isApplied, onViewDetails }) => {
    const isDeadlinePassed = new Date(rec.deadline) < new Date();
    const isCapacityFull = rec.applicants.length >= rec.capacity;

    let buttonText = 'Apply Now';
    let isButtonDisabled = isApplied;

    if (isDeadlinePassed) {
        buttonText = 'Deadline Passed';
        isButtonDisabled = true;
    } else if (isCapacityFull && !isApplied) {
        buttonText = 'Slots Full';
        isButtonDisabled = true;
    } else if (isApplied) {
        buttonText = 'Applied';
    }
    
    return (
        <Card className="border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/10 flex flex-col animate-fade-in-up relative" onClick={() => onViewDetails(rec)}>
            <StatusTag internship={rec} />
            <div className="flex-grow">
                <div className="flex items-center mb-2">
                    <SparklesIcon />
                    <h4 className="font-bold text-primary-800 dark:text-primary-200">AI Recommendation</h4>
                </div>
                <h3 className="text-lg font-bold text-primary-700">{rec.role}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-3">{rec.companyName}</p>
                <div className="space-y-2 text-sm my-4">
                    <p><strong>Skill Match:</strong> <span className="font-semibold text-green-600">{rec.skillMatch}%</span></p>
                    <p className="text-xs text-muted-foreground">{rec.explanation}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {rec.skillsRequired.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{skill}</span>
                    ))}
                </div>
                <div className="space-y-2 text-sm text-foreground">
                    <div className="flex items-center"><LocationIcon /> {rec.location}</div>
                    <div className="flex items-center"><CalendarIcon /> {rec.duration}</div>
                    <div className="flex items-center"><CashIcon /> ₹{rec.stipend.toLocaleString()}/month</div>
                    <div className="flex items-center"><DeadlineIcon /> Apply by {new Date(rec.deadline).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="mt-6">
                <Button className="w-full" onClick={(e) => { e.stopPropagation(); onApply(rec); }} disabled={isButtonDisabled}>
                    {buttonText}
                </Button>
            </div>
        </Card>
    );
};


const OpportunitiesPage: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>(mockInternships);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [skillsFilter, setSkillsFilter] = useState('');
    const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
    const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedInternship, setSelectedInternship] = useState<Internship | AiRecommendation | null>(null);

    const currentStudentId = 'stu1';
    const currentStudentName = 'Aarav Sharma';

    useEffect(() => {
        const studentApps = mockApplications
            .filter(app => app.studentId === currentStudentId)
            .map(app => app.internshipId);
        setAppliedIds(new Set(studentApps));
    }, []);

    const generateRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const studentProfile = mockStudents.find(s => s.id === currentStudentId);
            if (!studentProfile) {
                throw new Error("Student profile not found.");
            }
            const availableInternships = internships.filter(i => 
                (i.status === 'Active' || i.status === 'Upcoming') && 
                new Date(i.deadline) > new Date() &&
                i.applicants.length < i.capacity
            );

            const prompt = `Based on the following student profile and list of available internships, act as an expert career counselor. Recommend the top 2-3 internships that are the best fit. For each recommendation, provide a "skillMatch" percentage, and a concise "explanation" (max 20 words). Return ONLY the JSON array of recommended internships. The structure for each object in the array should match the internship object structure, plus the additional AI-generated fields (skillMatch, explanation).

Student Profile: ${JSON.stringify(studentProfile)}
Available Internships: ${JSON.stringify(availableInternships)}`;

            const responseSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        companyId: { type: Type.STRING },
                        companyName: { type: Type.STRING },
                        role: { type: Type.STRING },
                        description: { type: Type.STRING },
                        skillsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
                        stipend: { type: Type.NUMBER },
                        duration: { type: Type.STRING },
                        location: { type: Type.STRING },
                        capacity: { type: Type.NUMBER },
                        status: { type: Type.STRING },
                        skillMatch: { type: Type.NUMBER, description: "Percentage match for skills." },
                        explanation: { type: Type.STRING, description: "A brief explanation of why this is a good match." },
                        locationFit: { type: Type.NUMBER, description: "Percentage match for location preference." },
                        qualificationFit: { type: Type.NUMBER, description: "Percentage match for education and qualifications." },
                    },
                    required: ["id", "companyName", "role", "skillsRequired", "stipend", "duration", "location", "skillMatch", "explanation"]
                }
            };

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema,
                },
            });

            const jsonResponse = JSON.parse(result.text);
            const recommendationsWithFullData = jsonResponse.map((rec: any) => {
                const originalInternship = internships.find(i => i.id === rec.id);
                if (!originalInternship) return null;
                return {
                    ...originalInternship,
                    ...rec,
                    locationFit: rec.locationFit || 0,
                    qualificationFit: rec.qualificationFit || 0,
                } as AiRecommendation;
            }).filter(Boolean);
            
            setRecommendations(recommendationsWithFullData as AiRecommendation[]);
        } catch (e) {
            console.error("Error generating recommendations:", e);
            setError("Sorry, the AI is currently unavailable. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = (internshipToApply: Internship | AiRecommendation) => {
        if (appliedIds.has(internshipToApply.id)) return;

        const newApplication: Application = {
            id: `app${mockApplications.length + 1}-${Math.random().toString(36).substring(7)}`,
            studentId: currentStudentId,
            studentName: currentStudentName,
            internshipId: internshipToApply.id,
            internshipRole: internshipToApply.role,
            companyName: internshipToApply.companyName,
            status: ApplicationStatus.Pending,
            appliedDate: new Date().toISOString().split('T')[0],
        };

        mockApplications.push(newApplication);
        setAppliedIds(prev => new Set(prev).add(internshipToApply.id));

        setInternships(prevInternships =>
            prevInternships.map(internship =>
                internship.id === internshipToApply.id
                ? { ...internship, applicants: [...internship.applicants, currentStudentId] }
                : internship
            )
        );

        setRecommendations(prevRecs =>
            prevRecs.map(rec =>
                rec.id === internshipToApply.id
                ? { ...rec, applicants: [...rec.applicants, currentStudentId] }
                : rec
            )
        );
        
        alert(`Successfully applied for ${internshipToApply.role} at ${internshipToApply.companyName}!`);
    };
    
    const handleViewDetails = (internship: Internship | AiRecommendation) => {
        setSelectedInternship(internship);
    };

    const handleCloseModal = () => {
        setSelectedInternship(null);
    };
  
    const filteredInternships = useMemo(() => internships.filter(internship => {
        const searchMatch = searchTerm === '' ||
            internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const locationMatch = locationFilter === '' ||
            internship.location.toLowerCase().includes(locationFilter.toLowerCase());
            
        const requiredSkills = skillsFilter.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        const skillsMatch = requiredSkills.length === 0 ||
            requiredSkills.every(skill => 
                internship.skillsRequired.some(reqSkill => reqSkill.toLowerCase().includes(skill))
            );

        return searchMatch && locationMatch && skillsMatch;
    }), [internships, searchTerm, locationFilter, skillsFilter]);
  
    return (
      <>
        <DashboardHeader title="Internship Opportunities" />
        {selectedInternship && (
            <InternshipDetailModal 
                internship={selectedInternship}
                onClose={handleCloseModal}
                onApply={(internship) => {
                    handleApply(internship);
                    handleCloseModal();
                }}
                isApplied={appliedIds.has(selectedInternship.id)}
            />
        )}
        <div className="mt-8">
            <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Search by role or company..."
                        className="w-full px-3 py-2 border border-input bg-transparent rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Filter by location..."
                        className="w-full px-3 py-2 border border-input bg-transparent rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    />
                     <input
                        type="text"
                        placeholder="Filter by skills (e.g., React, Python)..."
                        className="w-full px-3 py-2 border border-input bg-transparent rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={skillsFilter}
                        onChange={(e) => setSkillsFilter(e.target.value)}
                    />
                </div>
            </Card>

            <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Recommended For You</h2>
                
                {!isLoading && recommendations.length === 0 && !error && (
                    <Card className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Click the button to get personalized internship recommendations from our AI.</p>
                        <Button onClick={generateRecommendations}>
                            <SparklesIcon className="h-5 w-5"/> <span className="ml-2">Generate AI Recommendations</span>
                        </Button>
                    </Card>
                )}

                {isLoading && (
                    <Card className="text-center py-8">
                        <div className="flex justify-center items-center">
                            <Spinner className="w-8 h-8" />
                            <p className="text-muted-foreground ml-4">Analyzing your profile and finding the best matches...</p>
                        </div>
                    </Card>
                )}

                {error && (
                    <Card className="text-center py-8 border-red-300 bg-red-50">
                        <p className="text-red-700 font-semibold">An Error Occurred</p>
                        <p className="text-red-600 mt-2">{error}</p>
                        <Button onClick={generateRecommendations} className="mt-4">
                            Try Again
                        </Button>
                    </Card>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {recommendations.map(rec => (
                        <RecommendationCard 
                            key={rec.id} 
                            rec={rec} 
                            onApply={handleApply}
                            isApplied={appliedIds.has(rec.id)}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">All Opportunities</h2>
                 {filteredInternships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredInternships.map(internship => (
                            <InternshipCard 
                                key={internship.id} 
                                internship={internship} 
                                onApply={handleApply}
                                isApplied={appliedIds.has(internship.id)}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <h3 className="text-lg font-semibold text-foreground">No Internships Found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your search filters to find more opportunities.</p>
                    </Card>
                )}
            </div>
        </div>
      </>
    );
};

export default OpportunitiesPage;
