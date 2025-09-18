import React, { useState } from 'react';
import { mockInternships } from '../../constants';
import type { Internship } from '../../types';
import { InternshipStatus } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

const StatusBadge: React.FC<{ status: InternshipStatus }> = ({ status }) => {
    const statusClasses = {
      [InternshipStatus.Active]: 'bg-green-100 text-green-800',
      [InternshipStatus.Upcoming]: 'bg-blue-100 text-blue-800',
      [InternshipStatus.Closed]: 'bg-slate-100 text-slate-800',
      [InternshipStatus.PendingApproval]: 'bg-yellow-100 text-yellow-800',
      [InternshipStatus.Rejected]: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>
        {status}
      </span>
    );
};

const InternshipModal: React.FC<{ internship: Partial<Internship> | null; onClose: () => void; onSave: (internship: Internship) => void; }> = ({ internship, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Internship>>(internship || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleSave = () => {
        // Basic validation
        if(formData.role && formData.description) {
            onSave(formData as Internship);
        }
    }

    if (!internship) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl">
                <h3 className="text-xl font-bold mb-4">{internship.id ? 'Edit Internship' : 'Post New Internship'}</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <Input id="role" label="Role" value={formData.role || ''} onChange={handleChange} required />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea id="description" rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-md" value={formData.description || ''} onChange={handleChange}></textarea>
                    </div>
                    <Input id="skillsRequired" label="Skills Required (comma-separated)" value={Array.isArray(formData.skillsRequired) ? formData.skillsRequired.join(', ') : ''} onChange={e => setFormData(p => ({...p, skillsRequired: e.target.value.split(',').map(s=>s.trim())}))} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="stipend" label="Stipend (per month)" type="number" value={formData.stipend || ''} onChange={handleChange} />
                        <Input id="capacity" label="Capacity (No. of interns)" type="number" value={formData.capacity || ''} onChange={handleChange} />
                        <Input id="duration" label="Duration" value={formData.duration || ''} onChange={handleChange} />
                        <Input id="location" label="Location" value={formData.location || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Internship</Button>
                </div>
            </Card>
        </div>
    );
};


const InternshipPostingCard: React.FC<{ internship: Internship; onEdit: (internship: Internship) => void; onDelete: (id: string) => void; }> = ({ internship, onEdit, onDelete }) => (
  <Card>
    <div className="flex justify-between items-start">
        <div>
            <h4 className="text-lg font-bold text-primary-700">{internship.role}</h4>
            <p className="text-sm text-slate-500 mb-2">{internship.location} | {internship.duration}</p>
            <StatusBadge status={internship.status} />
        </div>
        <div className="text-right">
            <p className="font-semibold text-slate-800">{internship.capacity} positions</p>
            <p className="text-sm text-slate-500">₹{internship.stipend}/month</p>
        </div>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Applicants: {Math.floor(Math.random() * 20) + 5}</p>
            <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(internship)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(internship.id)}>Delete</Button>
            </div>
        </div>
    </div>
  </Card>
);

const ManageInternshipsPage: React.FC = () => {
    const [internships, setInternships] = useState(mockInternships.filter(i => i.companyId === 'com1'));
    const [editingInternship, setEditingInternship] = useState<Partial<Internship> | null>(null);

    const handleOpenModal = (internship: Internship | null = null) => {
        setEditingInternship(internship || { companyId: 'com1', companyName: 'InnovateTech Solutions', status: InternshipStatus.PendingApproval });
    };

    const handleCloseModal = () => {
        setEditingInternship(null);
    };

    const handleSave = (internship: Internship) => {
        if (internship.id) {
            setInternships(internships.map(i => i.id === internship.id ? { ...i, ...internship } : i));
        } else {
            const newInternship = { ...internship, id: `int-new-${Date.now()}`};
            setInternships([...internships, newInternship]);
        }
        handleCloseModal();
    };
    
    const handleDelete = (internshipId: string) => {
        if (window.confirm("Are you sure you want to delete this internship posting? This action cannot be undone.")) {
            setInternships(prev => prev.filter(i => i.id !== internshipId));
        }
    };

    return (
        <>
            <DashboardHeader title="Manage Internships" />
            {editingInternship && <InternshipModal internship={editingInternship} onClose={handleCloseModal} onSave={handleSave} />}
            <div className="mt-8">
                <div className="flex justify-end mb-6">
                    <Button onClick={() => handleOpenModal()}>+ Post New Internship</Button>
                </div>
                <div className="space-y-6">
                    {internships.map(internship => (
                        <InternshipPostingCard key={internship.id} internship={internship} onEdit={handleOpenModal} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ManageInternshipsPage;