// src/features/reports/components/ReportExportButtons.tsx
'use client';
import { ReportResult } from '../types';
import { Button } from '@/components/ui/button';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export const ReportExportButtons = ({ report }: { report: ReportResult }) => {


const generatePdf = (reportData: any): Blob => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Report (${reportData.period})`, 10, 10);

    // Table header
    const head = [["ID", "Date", "Description", "Amount", "Account", "Category"]];
    // Table rows
    const data = reportData.rows.map((r: any) => [
        r.id,
        r.date,
        r.description,
        r.amount.toString(),
        r.accountId,
        r.categoryId,
    ]);

    // Add table to PDF using the autoTable function
    autoTable(doc, { head, body: data, startY: 20 });

    // Totals summary after table
    const finalY = (doc as any).lastAutoTable?.finalY || 30;
    doc.text(`Income: ${reportData.totals.income.toFixed(2)}`, 10, finalY + 10);
    doc.text(`Expense: ${reportData.totals.expense.toFixed(2)}`, 10, finalY + 16);
    doc.text(`Net: ${reportData.totals.net.toFixed(2)}`, 10, finalY + 22);

    return doc.output("blob");
  };

const download = (type: 'csv' | 'json' | 'pdf') => {
    if (type === 'csv') {
      // Convert rows to CSV format
      const header = ['id', 'date', 'description', 'amount', 'accountId', 'categoryId'];
      const rows = report.rows.map(r => [r.id, r.date, r.description, r.amount, r.accountId, r.categoryId].join(','));
      const csvContent = [header.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.csv`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    if (type === 'pdf') {
      const blob = generatePdf(report);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    // JSON export (default)
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex gap-2">
      <Button onClick={() => download('csv')}>Export CSV</Button>
      <Button onClick={() => download('json')}>Export JSON</Button>
      <Button onClick={() => download('pdf')}>Export PDF</Button>
    </div>
  );
};
