

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { mockCompanies } from '../../constants';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { AccountStatus } from '../../types';

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

const ProfileCompletion: React.FC<{ percentage: number }> = ({ percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-primary-700">Profile Completion</span>
      <span className="text-sm font-medium text-primary-700">{percentage}%</span>
    </div>
    <div className="w-full bg-muted rounded-full h-2.5">
      <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const CompanyProfilePage: React.FC = () => {
  const params = useParams<{ companyId: string }>();
  const location = useLocation();

  const isAdminView = location.pathname.startsWith('/admin');
  const companyId = isAdminView ? params.companyId : 'com1'; // 'com1' is logged-in company for demo

  const [initialCompanyData] = useState(() => mockCompanies.find(c => c.id === companyId));
  
  const [company, setCompany] = useState(initialCompanyData);
  const [isEditing, setIsEditing] = useState(false);

  if (!company || !initialCompanyData) {
    return (
        <>
            <DashboardHeader title="Error" />
            <div className="text-center p-8 mt-8">
                <Card>
                    <h2 className="text-2xl font-bold text-foreground">Company Not Found</h2>
                    <p className="text-muted-foreground mt-2">The requested company profile does not exist.</p>
                    {isAdminView && <Button as={Link} to="/admin/companies" className="mt-4">Back to Company Management</Button>}
                </Card>
            </div>
        </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCompany(prev => ({ ...prev!, [id]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving company data:", company);
    alert("Company data saved successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCompany(initialCompanyData);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany(prev => ({ ...prev!, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const completionPercentage = useMemo(() => {
    const fields = ['name', 'email', 'industry', 'hrDetails', 'website', 'description', 'logoUrl'];
    const filledFields = fields.filter(field => {
        const value = company[field as keyof typeof company];
        return value && String(value).trim() !== '';
    });
    return Math.round((filledFields.length / fields.length) * 100);
  }, [company]);

  return (
    <>
      <DashboardHeader title={isAdminView ? `Company Profile: ${company.name}` : "Company Profile"} />
      <div className="mt-8">
        <Card>
          <ProfileCompletion percentage={completionPercentage} />
          <div className="flex justify-between items-center mb-6 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-foreground">Company Information</h3>
            <div className="flex items-center space-x-2">
                {isAdminView && !isEditing && <Button as={Link} to="/admin/companies" variant="secondary">Back to Companies</Button>}
                {isEditing ? (
                  <div className="space-x-2">
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1 flex flex-col items-center">
              <img src={company.logoUrl || 'https://via.placeholder.com/150'} alt="Company Logo" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-muted" />
              {isEditing ? (
                 <Button as="label" htmlFor="logo-upload" variant="secondary" size="sm" className="cursor-pointer">
                    Upload Logo
                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                 </Button>
              ) : (
                 <div className="mt-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1 text-center">Account Status</label>
                  <StatusBadge status={company.status} />
                </div>
              )}
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Company Name" id="name" value={company.name} onChange={handleInputChange} disabled={!isEditing} />
                <Input label="Official Email" id="email" type="email" value={company.email} onChange={handleInputChange} disabled={!isEditing} />
                <Input label="Industry" id="industry" value={company.industry} onChange={handleInputChange} disabled={!isEditing} />
                <Input label="HR Contact Details" id="hrDetails" value={company.hrDetails} onChange={handleInputChange} disabled={!isEditing} />
                <Input label="Website" id="website" type="url" value={company.website || ''} onChange={handleInputChange} disabled={!isEditing} className="md:col-span-2" />
                <div className="md:col-span-2">
                   <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Company Description</label>
                   <textarea id="description" value={company.description || ''} onChange={handleInputChange} disabled={!isEditing} rows={4} className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-muted bg-transparent"></textarea>
                </div>
                 <Input label="Internship Capacity" id="internshipCapacity" type="number" value={company.internshipCapacity} onChange={handleInputChange} disabled={!isEditing} />
            </div>

          </div>
        </Card>
      </div>
    </>
  );
};

export default CompanyProfilePage;