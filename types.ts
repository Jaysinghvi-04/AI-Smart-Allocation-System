

export enum UserRole {
  Student = 'student',
  Company = 'company',
  Admin = 'admin',
}

export enum ApplicationStatus {
  Pending = 'Pending',
  Shortlisted = 'Shortlisted',
  Selected = 'Selected',
  Rejected = 'Rejected',
}

export enum AccountStatus {
  PendingApproval = 'Pending Approval',
  Active = 'Active',
  Suspended = 'Suspended',
  Rejected = 'Rejected',
}

export enum InternshipStatus {
    Active = 'Active',
    Closed = 'Closed',
    Upcoming = 'Upcoming',
    PendingApproval = 'Pending Approval',
    Rejected = 'Rejected',
}

export enum NotificationType {
    ApplicationUpdate = 'application_update',
    NewRecommendation = 'new_recommendation',
    AdminAnnouncement = 'admin_announcement',
    NewApplication = 'new_application',
    NewCompanyApproval = 'new_company_approval',
    NewInternshipApproval = 'new_internship_approval',
}

export enum AdminRole {
    SuperAdmin = 'Super Admin',
    Moderator = 'Moderator',
}

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    timestamp: string; // ISO string
    relatedId?: string; // e.g., internshipId or applicationId
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  education: string;
  skills: string[];
  preferences: {
    sector: string[];
    location: string[];
    duration: string;
    stipend: number;
  };
  resumeUrl?: string;
  status: AccountStatus;
}

export interface CompanyProfile {
  id: string;
  name: string;
  email: string;
  industry: string;
  hrDetails: string;
  internshipCapacity: number;
  status: AccountStatus;
  website?: string;
  description?: string;
  logoUrl?: string;
}

export interface Internship {
  id:string;
  companyId: string;
  companyName: string;
  role: string;
  description: string;
  skillsRequired: string[];
  stipend: number;
  duration: string; // e.g., "3 Months"
  location: string;
  capacity: number;
  status: InternshipStatus;
  deadline: string; // ISO string for the application deadline
  applicants: string[]; // Array of student IDs who have applied
}

export interface AiMatchDetails {
    skillMatch: number;
    preferenceMatch: number;
    overallScore: number;
    explanation: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  internshipId: string;
  internshipRole: string;
  companyName: string;
  status: ApplicationStatus;
  appliedDate: string;
  aiMatch?: AiMatchDetails;
}

export interface AiRecommendation extends Internship {
  skillMatch: number; // Percentage
  locationFit: number; // Percentage
  qualificationFit: number; // Percentage
  explanation: string;
}

export interface AdminProfile {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    audience: 'All' | 'Students' | 'Companies';
    date: string; // ISO string
}