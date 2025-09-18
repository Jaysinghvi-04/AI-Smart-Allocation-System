
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

const DownloadIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 mr-2" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

interface ExportHeader<T> {
  label: string;
  key: keyof T;
}

interface ExportButtonProps<T> {
  data: T[];
  filename: string;
  headers: ExportHeader<T>[];
  reportName: string; 
}

const ExportButton = <T extends Record<string, any>>({ data, filename, headers, reportName }: ExportButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportToCsv = () => {
    if (data.length === 0) return;

    const csvHeaders = headers.map(h => h.label).join(',');
    const csvRows = data.map(row => 
        headers.map(h => {
            // FIX: Avoid reassigning `value` to a string, which can cause a type error
            // if the original value was not a string. Instead, handle null/undefined
            // cases and convert to string in a separate variable.
            const value = row[h.key];
            const stringValue = (value === null || value === undefined) ? '' : String(value);
            return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(',')
    );

    const csvContent = `${csvHeaders}\n${csvRows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportToPdf = () => {
    const tableHeaders = headers.map(h => `<th>${h.label}</th>`).join('');
    const tableBody = data.map(row => {
        const cells = headers.map(h => `<td>${row[h.key] ?? ''}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
          <html>
              <head>
                  <title>${reportName}</title>
                  <style>
                      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 20px;}
                      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                      th, td { border: 1px solid #dee2e6; padding: 8px; text-align: left; }
                      th { background-color: #f8f9fa; font-weight: 600; }
                      h1 { color: #343a40; }
                      @media print {
                          body { -webkit-print-color-adjust: exact; }
                          .no-print { display: none; }
                      }
                  </style>
              </head>
              <body>
                  <h1>${reportName}</h1>
                  <table>
                      <thead><tr>${tableHeaders}</tr></thead>
                      <tbody>${tableBody}</tbody>
                  </table>
                  <script>
                      window.onload = function() {
                          window.focus();
                          window.print();
                          window.onafterprint = function() {
                             window.close();
                          }
                      }
                  </script>
              </body>
          </html>
      `);
      printWindow.document.close();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <Button variant="secondary" size="sm" onClick={() => setIsOpen(!isOpen)} disabled={data.length === 0}>
            <DownloadIcon />
            Export
        </Button>
      </div>
      {isOpen && (
        <div 
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 z-10 animate-fade-in-up" 
            style={{ animationDuration: '0.1s' }}
            role="menu" aria-orientation="vertical" aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
                onClick={exportToCsv}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                role="menuitem"
            >
              Export as CSV/Excel
            </button>
            <button
                onClick={exportToPdf}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                role="menuitem"
            >
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;