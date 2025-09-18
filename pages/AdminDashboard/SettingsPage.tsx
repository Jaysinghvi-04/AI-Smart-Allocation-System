import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { mockAdmins } from '../../constants';

const SettingsPage: React.FC = () => {
    const [admin, setAdmin] = useState(mockAdmins[0]);

    const handleSaveChanges = () => {
        // In a real application, you would add password validation and an API call here.
        alert("Admin settings have been saved successfully!");
    };

    return (
        <>
            <DashboardHeader title="Settings" />
            <div className="mt-8">
                <Card className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6">Admin Profile</h3>
                    <div className="space-y-4">
                        <Input 
                            label="Full Name"
                            id="name"
                            value={admin.name}
                            onChange={(e) => setAdmin(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input 
                            label="Email Address"
                            id="email"
                            type="email"
                            value={admin.email}
                            disabled
                        />
                         <Input 
                            label="Role"
                            id="role"
                            value={admin.role}
                            disabled
                        />
                         <Input 
                            label="New Password"
                            id="password"
                            type="password"
                            placeholder="Enter a new password"
                        />
                         <Input 
                            label="Confirm New Password"
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your new password"
                        />
                        <div className="pt-4 flex justify-end">
                             <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default SettingsPage;