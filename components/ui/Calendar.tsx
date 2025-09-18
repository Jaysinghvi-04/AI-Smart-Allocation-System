
import React, { useState } from 'react';

const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();

    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const emptyDays = Array(firstDayOfMonth).fill(null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-4 w-72">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-accent transition-colors" aria-label="Previous month">
                    <ChevronLeftIcon />
                </button>
                <div className="font-bold text-lg" aria-live="polite">
                    {monthName} {year}
                </div>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-accent transition-colors" aria-label="Next month">
                    <ChevronRightIcon />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-2" aria-hidden="true">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center text-sm">
                {emptyDays.map((_, index) => <div key={`empty-${index}`} />)}
                {monthDays.map(day => {
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    return (
                        <div key={day} className={`p-1.5 flex items-center justify-center`}>
                           <span className={`w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary-600 text-white font-bold' : ''}`}>
                                {day}
                           </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
