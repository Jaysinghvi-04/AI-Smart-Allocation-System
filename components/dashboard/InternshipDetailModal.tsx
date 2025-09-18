
import React, { useState } from 'react';
import type { Internship } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Icons
const LocationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CashIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClipboardIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CheckIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const CapacityIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const DeadlineIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface InternshipDetailModalProps {
  internship: Internship;
  onClose: () => void;
  onApply: (internship: Internship) => void;
  isApplied: boolean;
}

const ModalStatusBanner: React.FC<{ isDeadlinePassed: boolean; isCapacityFull: boolean }> = ({ isDeadlinePassed, isCapacityFull }) => {
    if (!isDeadlinePassed && !isCapacityFull) {
        return null;
    }

    let message = '';
    let bgColor = '';
    let textColor = '';

    if (isDeadlinePassed) {
        message = 'The application deadline for this internship has passed.';
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-800 dark:text-red-200';
    } else if (isCapacityFull) {
        message = 'This internship has reached its maximum number of applicants. No more applications are being accepted.';
        bgColor = 'bg-amber-100 dark:bg-amber-900/30';
        textColor = 'text-amber-800 dark:text-amber-200';
    }

    return (
        <div className={`p-3 rounded-md mb-4 text-sm font-medium ${bgColor} ${textColor}`}>
            {message}
        </div>
    );
};

const InternshipDetailModal: React.FC<InternshipDetailModalProps> = ({ internship, onClose, onApply, isApplied }) => {
  const [isCopied, setIsCopied] = useState(false);

  const isDeadlinePassed = new Date(internship.deadline) < new Date();
  const isCapacityFull = internship.applicants.length >= internship.capacity;
  const spotsRemaining = internship.capacity - internship.applicants.length;

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

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#/student/opportunities?internshipId=${internship.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-up" onClick={onClose}>
      <Card className="w-full max-w-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl font-bold">&times;</button>
        
        <ModalStatusBanner isDeadlinePassed={isDeadlinePassed} isCapacityFull={isCapacityFull} />

        <div>
          <h2 className="text-2xl font-bold text-primary-700">{internship.role}</h2>
          <p className="text-md font-medium text-muted-foreground mb-4">{internship.companyName}</p>
        </div>

        <div className="my-4 border-t border-border"></div>

        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
            <p className="text-foreground leading-relaxed">{internship.description}</p>
            
            <div>
                <h4 className="font-semibold text-foreground mb-2">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                    {internship.skillsRequired.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center text-foreground"><LocationIcon /> {internship.location}</div>
                <div className="flex items-center text-foreground"><CalendarIcon /> {internship.duration}</div>
                <div className="flex items-center text-foreground"><CashIcon /> ₹{internship.stipend.toLocaleString()}/month</div>
                 <div className="flex items-center text-foreground"><DeadlineIcon /> Apply by {new Date(internship.deadline).toLocaleDateString()}</div>
                <div className="flex items-center text-foreground col-span-full">
                    <CapacityIcon />
                    {isCapacityFull ? 'All positions are filled' : `${spotsRemaining} of ${internship.capacity} spots open`}
                </div>
            </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto flex-1" onClick={() => onApply(internship)} disabled={isButtonDisabled}>
            {buttonText}
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto flex-1" onClick={handleShare}>
            {isCopied ? <><CheckIcon /> Copied!</> : <><ClipboardIcon /> Share Link</>}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InternshipDetailModal;
