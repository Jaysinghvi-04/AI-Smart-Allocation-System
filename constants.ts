

import type { StudentProfile, CompanyProfile, Internship, Application, AiRecommendation, Notification, AdminProfile, Announcement } from './types';
import { ApplicationStatus, AccountStatus, NotificationType, InternshipStatus, AdminRole } from './types';

export const mockStudents: StudentProfile[] = [
  { id: 'stu1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', education: 'B.Tech in Computer Science', skills: ['React', 'Node.js', 'Python', 'MongoDB'], preferences: { sector: ['IT', 'Fintech'], location: ['Bangalore', 'Pune'], duration: '3 Months', stipend: 30000 }, resumeUrl: 'resume_aarav_sharma.pdf', status: AccountStatus.Active },
  { id: 'stu2', name: 'Diya Patel', email: 'diya.patel@example.com', education: 'MBA in Marketing', skills: ['Digital Marketing', 'SEO', 'Content Creation'], preferences: { sector: ['Marketing', 'E-commerce'], location: ['Mumbai'], duration: '6 Months', stipend: 25000 }, status: AccountStatus.Active },
  { id: 'stu3', name: 'Rohan Gupta', email: 'rohan.gupta@example.com', education: 'B.Sc in Data Science', skills: ['Python', 'Pandas', 'TensorFlow', 'SQL'], preferences: { sector: ['Data Science', 'AI/ML'], location: ['Hyderabad', 'Bangalore'], duration: '6 Months', stipend: 40000 }, status: AccountStatus.Active },
  { id: 'stu4', name: 'Ishan Singh', email: 'ishan.singh@example.com', education: 'B.E. Mechanical', skills: ['AutoCAD', 'SolidWorks', 'MATLAB', 'Ansys'], preferences: { sector: ['Automobile', 'Manufacturing'], location: ['Chennai', 'Pune'], duration: '6 Months', stipend: 20000 }, resumeUrl: 'resume_ishan_singh.pdf', status: AccountStatus.Active },
  { id: 'stu5', name: 'Ananya Reddy', email: 'ananya.reddy@example.com', education: 'B.Com Honours', skills: ['Accounting', 'Tally ERP', 'GST Filing', 'MS Excel'], preferences: { sector: ['Finance', 'Consulting'], location: ['Delhi', 'Mumbai'], duration: '3 Months', stipend: 15000 }, status: AccountStatus.Active },
  { id: 'stu6', name: 'Kabir Khan', email: 'kabir.khan@example.com', education: 'B.A. Journalism', skills: ['Content Writing', 'Social Media Marketing', 'Video Editing', 'Podcasting'], preferences: { sector: ['Media', 'Marketing'], location: ['Remote'], duration: '3 Months', stipend: 18000 }, status: AccountStatus.Active },
  { id: 'stu7', name: 'Meera Iyer', email: 'meera.iyer@example.com', education: 'M.Sc. Biotechnology', skills: ['PCR', 'Cell Culture', 'Genomics', 'Bioinformatics'], preferences: { sector: ['Biotechnology', 'Healthcare'], location: ['Hyderabad', 'Bangalore'], duration: '6 Months', stipend: 28000 }, status: AccountStatus.PendingApproval },
  { id: 'stu8', name: 'Arjun Das', email: 'arjun.das@example.com', education: 'B.Tech IT', skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'], preferences: { sector: ['IT', 'Cloud Computing'], location: ['Bangalore', 'Hyderabad'], duration: '6 Months', stipend: 35000 }, resumeUrl: 'resume_arjun_das.pdf', status: AccountStatus.Active },
  { id: 'stu9', name: 'Sana Kumar', email: 'sana.kumar@example.com', education: 'BBA', skills: ['Project Management', 'Agile', 'Market Research', 'Power BI'], preferences: { sector: ['Consulting', 'Management'], location: ['Gurgaon'], duration: '3 Months', stipend: 22000 }, status: AccountStatus.Active },
  { id: 'stu10', name: 'Vikram Batra', email: 'vikram.batra@example.com', education: 'B.Sc. Physics', skills: ['Quantum Computing', 'Python', 'C++', 'Qiskit'], preferences: { sector: ['Deep Tech', 'AI/ML'], location: ['Bangalore'], duration: '6 Months', stipend: 45000 }, resumeUrl: 'resume_vikram_batra.pdf', status: AccountStatus.Active },
  { id: 'stu11', name: 'Priya Desai', email: 'priya.desai@example.com', education: 'B.Des Fashion Design', skills: ['Adobe Illustrator', 'Pattern Making', 'Textile Design'], preferences: { sector: ['Fashion', 'Retail'], location: ['Mumbai', 'Delhi'], duration: '6 Months', stipend: 20000 }, status: AccountStatus.Active },
  { id: 'stu12', name: 'Advik Mehta', email: 'advik.mehta@example.com', education: 'M.Tech AI', skills: ['PyTorch', 'Computer Vision', 'NLP', 'Reinforcement Learning'], preferences: { sector: ['AI/ML', 'Robotics'], location: ['Bangalore', 'Remote'], duration: '6 Months', stipend: 50000 }, status: AccountStatus.Active },
  { id: 'stu13', name: 'Zara Ali', email: 'zara.ali@example.com', education: 'B.Sc. Chemistry', skills: ['Organic Synthesis', 'HPLC', 'Spectroscopy'], preferences: { sector: ['Pharmaceuticals', 'R&D'], location: ['Hyderabad'], duration: '12 Months', stipend: 25000 }, resumeUrl: 'resume_zara_ali.pdf', status: AccountStatus.Active },
  { id: 'stu14', name: 'Vivaan Rao', email: 'vivaan.rao@example.com', education: 'B.Tech Electrical', skills: ['VHDL', 'Embedded Systems', 'IoT', 'PCB Design'], preferences: { sector: ['Electronics', 'Semiconductor'], location: ['Bangalore', 'Noida'], duration: '6 Months', stipend: 30000 }, status: AccountStatus.Active },
  { id: 'stu15', name: 'Aisha Begum', email: 'aisha.begum@example.com', education: 'MBA Finance', skills: ['Financial Modeling', 'Valuation', 'Bloomberg Terminal', 'M&A'], preferences: { sector: ['Investment Banking', 'Fintech'], location: ['Mumbai'], duration: '3 Months', stipend: 60000 }, status: AccountStatus.PendingApproval },
  { id: 'stu16', name: 'Dhruv Jain', email: 'dhruv.jain@example.com', education: 'B.A. Economics', skills: ['Econometrics', 'Stata', 'R', 'Data Visualization'], preferences: { sector: ['Consulting', 'Public Policy'], location: ['Delhi'], duration: '3 Months', stipend: 25000 }, resumeUrl: 'resume_dhruv_jain.pdf', status: AccountStatus.Active },
  { id: 'stu17', name: 'Kiara Kapoor', email: 'kiara.kapoor@example.com', education: 'B.Tech Civil', skills: ['AutoCAD', 'STAAD Pro', 'Surveying', 'Primavera'], preferences: { sector: ['Construction', 'Infrastructure'], location: ['Mumbai', 'Delhi'], duration: '6 Months', stipend: 22000 }, status: AccountStatus.Active },
  { id: 'stu18', name: 'Neel Shah', email: 'neel.shah@example.com', education: 'B.Sc. Mathematics', skills: ['Statistics', 'R', 'Actuarial Science', 'Python'], preferences: { sector: ['Insurance', 'Finance'], location: ['Mumbai', 'Pune'], duration: '6 Months', stipend: 30000 }, status: AccountStatus.Active },
  { id: 'stu19', name: 'Fatima Ansari', email: 'fatima.ansari@example.com', education: 'B.A. Psychology', skills: ['Counseling', 'Research Methods', 'SPSS', 'HR Principles'], preferences: { sector: ['Human Resources', 'Mental Health'], location: ['Bangalore', 'Delhi'], duration: '3 Months', stipend: 18000 }, resumeUrl: 'resume_fatima_ansari.pdf', status: AccountStatus.Active },
  { id: 'stu20', name: 'Siddharth Menon', email: 'siddharth.menon@example.com', education: 'B.Tech ECE', skills: ['Verilog', 'Signal Processing', '5G', 'Cadence'], preferences: { sector: ['Telecommunication', 'Semiconductor'], location: ['Bangalore'], duration: '6 Months', stipend: 32000 }, status: AccountStatus.Active },
];

export const mockCompanies: CompanyProfile[] = [
  { id: 'com1', name: 'InnovateTech Solutions', email: 'hr@innovatetech.com', industry: 'Information Technology', hrDetails: 'Ms. Priya Singh', internshipCapacity: 10, status: AccountStatus.Active, website: 'https://innovatetech.com', description: 'A leading provider of cloud-based solutions, driving innovation in the tech industry.', logoUrl: 'https://picsum.photos/seed/logo1/200' },
  { id: 'com2', name: 'FinSecure Capital', email: 'careers@finsecure.com', industry: 'Fintech', hrDetails: 'Mr. Raj Verma', internshipCapacity: 5, status: AccountStatus.Active, website: 'https://finsecure.com', description: 'Pioneering the future of financial services with secure and scalable platforms.', logoUrl: 'https://picsum.photos/seed/logo2/200' },
  { id: 'com3', name: 'MarketPro Inc.', email: 'hr@marketpro.com', industry: 'Marketing', hrDetails: 'Ms. Anjali Mehta', internshipCapacity: 8, status: AccountStatus.PendingApproval, website: 'https://marketpro.com', description: 'A full-service digital marketing agency that helps brands grow.', logoUrl: 'https://picsum.photos/seed/logo3/200' },
  { id: 'com4', name: 'HealthWell Group', email: 'hr@healthwell.com', industry: 'Healthcare', hrDetails: 'Dr. Sameer Khan', internshipCapacity: 4, status: AccountStatus.Suspended, website: 'https://healthwell.com', description: 'Innovating in patient care and medical technology.', logoUrl: 'https://picsum.photos/seed/logo4/200' },
  { id: 'com5', name: 'DataLeap Analytics', email: 'hr@dataleap.com', industry: 'Data Science', hrDetails: 'Ms. Sunita Rao', internshipCapacity: 12, status: AccountStatus.Active, website: 'https://dataleap.com', description: 'Leveraging big data to provide actionable business insights.', logoUrl: 'https://picsum.photos/seed/logo5/200' },
  { id: 'com6', name: 'GreenShift Energy', email: 'careers@greenshift.com', industry: 'Renewable Energy', hrDetails: 'Mr. Alok Nath', internshipCapacity: 6, status: AccountStatus.Active, website: 'https://greenshift.com', description: 'Developing sustainable energy solutions for a greener tomorrow.', logoUrl: 'https://picsum.photos/seed/logo6/200' },
  { id: 'com7', name: 'QuantumCore AI', email: 'hr@quantumcore.ai', industry: 'AI/ML', hrDetails: 'Dr. Evelyn Reed', internshipCapacity: 7, status: AccountStatus.Active, website: 'https://quantumcore.ai', description: 'Building the next generation of artificial intelligence.', logoUrl: 'https://picsum.photos/seed/logo7/200' },
  { id: 'com8', name: 'BioGen Innovations', email: 'recruitment@biogen.com', industry: 'Biotechnology', hrDetails: 'Mr. Sanjay Murthy', internshipCapacity: 5, status: AccountStatus.PendingApproval, website: 'https://biogen.com', description: 'Research and development in genetic engineering and biopharmaceuticals.', logoUrl: 'https://picsum.photos/seed/logo8/200' },
  { id: 'com9', name: 'BuildRight Infra', email: 'contact@buildright.com', industry: 'Construction', hrDetails: 'Ms. Kavita Desai', internshipCapacity: 15, status: AccountStatus.Active, website: 'https://buildright.com', description: 'Leading infrastructure and real estate development across the country.', logoUrl: 'https://picsum.photos/seed/logo9/200' },
  { id: 'com10', name: 'E-Shoppe Hub', email: 'hr@eshopehub.com', industry: 'E-commerce', hrDetails: 'Mr. Rohan Mehra', internshipCapacity: 10, status: AccountStatus.Active, website: 'https://eshopehub.com', description: 'The one-stop online destination for all your shopping needs.', logoUrl: 'https://picsum.photos/seed/logo10/200' },
];

export const mockInternships: Internship[] = [
  { id: 'int1', companyId: 'com1', companyName: 'InnovateTech Solutions', role: 'Frontend Developer Intern', description: 'Work on our flagship React-based web application.', skillsRequired: ['React', 'TypeScript', 'Tailwind CSS'], stipend: 35000, duration: '3 Months', location: 'Bangalore', capacity: 4, status: InternshipStatus.Active, deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu3'] },
  { id: 'int2', companyId: 'com2', companyName: 'FinSecure Capital', role: 'Data Analyst Intern', description: 'Analyze financial data to derive market insights.', skillsRequired: ['Python', 'SQL', 'Pandas'], stipend: 40000, duration: '6 Months', location: 'Mumbai', capacity: 2, status: InternshipStatus.Active, deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu1', 'stu3', 'stu5', 'stu9'] },
  { id: 'int3', companyId: 'com1', companyName: 'InnovateTech Solutions', role: 'Backend Developer Intern', description: 'Develop and maintain our Node.js microservices.', skillsRequired: ['Node.js', 'Express', 'MongoDB'], stipend: 35000, duration: '3 Months', location: 'Pune', capacity: 3, status: InternshipStatus.Upcoming, deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), applicants: [] },
  { id: 'int4', companyId: 'com3', companyName: 'MarketPro Inc.', role: 'Digital Marketing Intern', description: 'Assist in SEO, SMM, and content marketing campaigns.', skillsRequired: ['SEO', 'Google Analytics', 'Content Writing'], stipend: 20000, duration: '6 Months', location: 'Remote', capacity: 5, status: InternshipStatus.Closed, deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu2'] },
  { id: 'int5', companyId: 'com2', companyName: 'FinSecure Capital', role: 'Cybersecurity Intern', description: 'Assist in monitoring security infrastructure and analyzing threats.', skillsRequired: ['Networking', 'Cybersecurity', 'Linux'], stipend: 30000, duration: '6 Months', location: 'Mumbai', capacity: 1, status: InternshipStatus.PendingApproval, deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), applicants: [] },
  { id: 'int6', companyId: 'com5', companyName: 'DataLeap Analytics', role: 'Data Science Intern', description: 'Work on predictive modeling and data visualization projects.', skillsRequired: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'], stipend: 42000, duration: '6 Months', location: 'Bangalore', capacity: 5, status: InternshipStatus.Active, deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu12', 'stu16'] },
  { id: 'int7', companyId: 'com6', companyName: 'GreenShift Energy', role: 'Mechanical Engineer Intern', description: 'Assist in the design and testing of wind turbine components.', skillsRequired: ['AutoCAD', 'SolidWorks', 'Ansys'], stipend: 25000, duration: '6 Months', location: 'Chennai', capacity: 3, status: InternshipStatus.Active, deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(), applicants: [] },
  { id: 'int8', companyId: 'com7', companyName: 'QuantumCore AI', role: 'AI Research Intern', description: 'Contribute to cutting-edge research in Natural Language Processing.', skillsRequired: ['PyTorch', 'NLP', 'TensorFlow'], stipend: 55000, duration: '6 Months', location: 'Remote', capacity: 2, status: InternshipStatus.Active, deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu12', 'stu10', 'stu20'] },
  { id: 'int9', companyId: 'com8', companyName: 'BioGen Innovations', role: 'Lab Research Intern', description: 'Perform experiments in cell culture and molecular biology.', skillsRequired: ['PCR', 'Cell Culture', 'Western Blot'], stipend: 28000, duration: '6 Months', location: 'Hyderabad', capacity: 4, status: InternshipStatus.PendingApproval, deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), applicants: [] },
  { id: 'int10', companyId: 'com9', companyName: 'BuildRight Infra', role: 'Civil Engineering Intern', description: 'On-site experience in project management and quality control for a major metro project.', skillsRequired: ['AutoCAD', 'STAAD Pro', 'Project Management'], stipend: 24000, duration: '6 Months', location: 'Delhi', capacity: 8, status: InternshipStatus.Active, deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu17'] },
  { id: 'int11', companyId: 'com10', companyName: 'E-Shoppe Hub', role: 'Supply Chain Intern', description: 'Optimize logistics and inventory management for our e-commerce platform.', skillsRequired: ['MS Excel', 'Supply Chain Management', 'Data Analysis'], stipend: 22000, duration: '3 Months', location: 'Mumbai', capacity: 4, status: InternshipStatus.Upcoming, deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), applicants: [] },
  { id: 'int12', companyId: 'com1', companyName: 'InnovateTech Solutions', role: 'Cloud Engineer Intern', description: 'Work with our DevOps team on AWS and Kubernetes infrastructure.', skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], stipend: 40000, duration: '6 Months', location: 'Bangalore', capacity: 3, status: InternshipStatus.Active, deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(), applicants: ['stu8'] },
];

export const mockAiRecommendations: AiRecommendation[] = [
    { ...mockInternships[0], skillMatch: 95, locationFit: 100, qualificationFit: 90, explanation: 'Your React and Python skills are a perfect match for this role in your preferred location.' },
    { ...mockInternships[2], skillMatch: 85, locationFit: 70, qualificationFit: 95, explanation: 'Strongly aligns with your Data Science background and Node.js skills.' },
];

export const mockApplications: Application[] = [
  { id: 'app1', studentId: 'stu1', studentName: 'Aarav Sharma', internshipId: 'int2', internshipRole: 'Data Analyst Intern', companyName: 'FinSecure Capital', status: ApplicationStatus.Shortlisted, appliedDate: '2024-07-15', aiMatch: { overallScore: 92, skillMatch: 95, preferenceMatch: 88, explanation: "Excellent skill alignment with Python & SQL. Strong preference match for location and sector." } },
  { id: 'app2', studentId: 'stu3', studentName: 'Rohan Gupta', internshipId: 'int1', internshipRole: 'Frontend Developer Intern', companyName: 'InnovateTech Solutions', status: ApplicationStatus.Pending, appliedDate: '2024-07-18', aiMatch: { overallScore: 78, skillMatch: 70, preferenceMatch: 90, explanation: "Good preference match, but lacks TypeScript experience. Strong foundation in related technologies." } },
  { id: 'app3', studentId: 'stu2', studentName: 'Diya Patel', internshipId: 'int4', internshipRole: 'Digital Marketing Intern', companyName: 'MarketPro Inc.', status: ApplicationStatus.Selected, appliedDate: '2024-07-10' },
  { id: 'app4', studentId: 'stu3', studentName: 'Rohan Gupta', internshipId: 'int2', internshipRole: 'Data Analyst Intern', companyName: 'FinSecure Capital', status: ApplicationStatus.Shortlisted, appliedDate: '2024-07-12' },
  { id: 'app5', studentId: 'stu8', studentName: 'Arjun Das', internshipId: 'int12', internshipRole: 'Cloud Engineer Intern', companyName: 'InnovateTech Solutions', status: ApplicationStatus.Pending, appliedDate: '2024-07-20', aiMatch: { overallScore: 95, skillMatch: 98, preferenceMatch: 92, explanation: "Perfect alignment of skills (AWS, Java) and location preference." } },
  { id: 'app6', studentId: 'stu4', studentName: 'Ishan Singh', internshipId: 'int7', internshipRole: 'Mechanical Engineer Intern', companyName: 'GreenShift Energy', status: ApplicationStatus.Pending, appliedDate: '2024-07-19' },
  { id: 'app7', studentId: 'stu12', studentName: 'Advik Mehta', internshipId: 'int8', internshipRole: 'AI Research Intern', companyName: 'QuantumCore AI', status: ApplicationStatus.Shortlisted, appliedDate: '2024-07-18', aiMatch: { overallScore: 98, skillMatch: 99, preferenceMatch: 97, explanation: "Expert-level skills in PyTorch and NLP match the research focus perfectly." } },
  { id: 'app8', studentId: 'stu17', studentName: 'Kiara Kapoor', internshipId: 'int10', internshipRole: 'Civil Engineering Intern', companyName: 'BuildRight Infra', status: ApplicationStatus.Selected, appliedDate: '2024-07-14' },
  { id: 'app9', studentId: 'stu5', studentName: 'Ananya Reddy', internshipId: 'int2', internshipRole: 'Data Analyst Intern', companyName: 'FinSecure Capital', status: ApplicationStatus.Rejected, appliedDate: '2024-07-11' },
  { id: 'app10', studentId: 'stu10', studentName: 'Vikram Batra', internshipId: 'int8', internshipRole: 'AI Research Intern', companyName: 'QuantumCore AI', status: ApplicationStatus.Shortlisted, appliedDate: '2024-07-21', aiMatch: { overallScore: 85, skillMatch: 90, preferenceMatch: 80, explanation: "Strong quantum and Python background, but less direct experience in NLP." } },
  { id: 'app11', studentId: 'stu1', studentName: 'Aarav Sharma', internshipId: 'int3', internshipRole: 'Backend Developer Intern', companyName: 'InnovateTech Solutions', status: ApplicationStatus.Pending, appliedDate: '2024-07-22' },
  { id: 'app12', studentId: 'stu12', studentName: 'Advik Mehta', internshipId: 'int6', internshipRole: 'Data Science Intern', companyName: 'DataLeap Analytics', status: ApplicationStatus.Pending, appliedDate: '2024-07-22' },
  { id: 'app13', studentId: 'stu16', studentName: 'Dhruv Jain', internshipId: 'int6', internshipRole: 'Data Science Intern', companyName: 'DataLeap Analytics', status: ApplicationStatus.Rejected, appliedDate: '2024-07-18' },
];


export const mockNotifications: Notification[] = [
    { id: 'notif1', type: NotificationType.ApplicationUpdate, message: 'Your application for Frontend Developer Intern at InnovateTech Solutions has been shortlisted!', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), relatedId: 'app1' },
    { id: 'notif2', type: NotificationType.NewRecommendation, message: 'A new internship, "Backend Developer Intern", matches your profile.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), relatedId: 'int3' },
    { id: 'notif3', type: NotificationType.AdminAnnouncement, message: 'The deadline for all summer internship applications is approaching. Apply now!', isRead: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
    { id: 'notif4', type: NotificationType.ApplicationUpdate, message: 'FinSecure Capital has selected you for the Data Analyst Intern role!', isRead: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), relatedId: 'app2' }
];

export const mockCompanyNotifications: Notification[] = [
    { id: 'c_notif1', type: NotificationType.NewApplication, message: 'Aarav Sharma has applied for the Frontend Developer Intern role.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), relatedId: 'app1' },
    { id: 'c_notif2', type: NotificationType.AdminAnnouncement, message: 'Please update your internship listings for the next cycle by the end of the month.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
    { id: 'c_notif3', type: NotificationType.NewApplication, message: 'Rohan Gupta has applied for the Frontend Developer Intern role.', isRead: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), relatedId: 'app4' },
];

export const mockAdminNotifications: Notification[] = [
    { id: 'a_notif1', type: NotificationType.NewCompanyApproval, message: 'MarketPro Inc. has registered and requires approval.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), relatedId: 'com3' },
    { id: 'a_notif2', type: NotificationType.NewInternshipApproval, message: 'FinSecure Capital posted a "Cybersecurity Intern" role that needs approval.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), relatedId: 'int5' },
    { id: 'a_notif3', type: NotificationType.AdminAnnouncement, message: 'Reminder: The quarterly analytics report is due next week.', isRead: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
    { id: 'a_notif4', type: NotificationType.NewCompanyApproval, message: 'BioGen Innovations has registered and requires approval.', isRead: false, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), relatedId: 'com8' },
];

export const mockAdmins: AdminProfile[] = [
    { id: 'adm1', name: 'Admin User', email: 'admin@pminternship.gov', role: AdminRole.SuperAdmin }
];

export const mockDiversityData = [
    { name: 'Rural/Aspirational', value: 25 },
    { name: 'Urban', value: 75 },
    { name: 'Female', value: 48 },
    { name: 'Male', value: 52 },
    { name: 'SC/ST/OBC', value: 30 },
    { name: 'General', value: 70 },
];

export const mockAnnouncements: Announcement[] = [
    { id: 'ann1', title: 'Application Deadline Approaching', content: 'The deadline for all summer internship applications is this Friday. Please submit your applications soon!', audience: 'Students', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
    { id: 'ann2', title: 'Update Internship Postings', content: 'Please ensure all your company internship postings for the new cycle are updated by the end of the month.', audience: 'Companies', date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
];

type TFunction = (key: string) => string;

export const getStudentNavLinks = (t: TFunction) => [
  { name: t('nav.student.profile'), path: '/student/profile' },
  { name: t('nav.student.opportunities'), path: '/student/opportunities' },
  { name: t('nav.student.myApplications'), path: '/student/applications' },
  { name: t('nav.student.notifications'), path: '/student/notifications' },
  { name: t('nav.student.analytics'), path: '/student/analytics' },
];

export const getCompanyNavLinks = (t: TFunction) => [
  { name: t('nav.company.profile'), path: '/company/profile' },
  { name: t('nav.company.manageInternships'), path: '/company/internships' },
  { name: t('nav.company.applicationsManagement'), path: '/company/applications' },
  { name: t('nav.company.analytics'), path: '/company/analytics' },
];

export const getAdminNavLinks = (t: TFunction) => [
  { name: t('nav.admin.dashboard'), path: '/admin/analytics' },
  { name: t('nav.admin.studentManagement'), path: '/admin/students' },
  { name: t('nav.admin.companyManagement'), path: '/admin/companies' },
  { name: t('nav.admin.internshipOversight'), path: '/admin/internships' },
  { name: t('nav.admin.applicationMonitoring'), path: '/admin/applications' },
  { name: t('nav.admin.allocationEngine'), path: '/admin/allocation' },
  { name: t('nav.admin.announcements'), path: '/admin/announcements' },
  { name: t('nav.admin.settings'), path: '/admin/settings' },
];