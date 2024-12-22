import { jsPDF } from 'jspdf';
import { ImageEntry } from '../types';

export const exportSingleEntryToPDF = (entry: ImageEntry) => {
  const pdf = new jsPDF();
  const yOffset = 20;

  pdf.setFontSize(16);
  pdf.text('Image Description', 20, yOffset);
  
  pdf.setFontSize(12);
  pdf.text(`Topic: ${entry.topic}`, 20, yOffset + 10);
  pdf.text(`Date: ${new Date(entry.createdAt).toLocaleDateString()}`, 20, yOffset + 20);
  pdf.text('Description:', 20, yOffset + 30);
  
  const splitDescription = pdf.splitTextToSize(entry.description, 170);
  pdf.text(splitDescription, 20, yOffset + 40);

  pdf.save(`description-${entry.id}.pdf`);
};

export const exportAllToPDF = (entries: ImageEntry[]) => {
  const pdf = new jsPDF();
  let yOffset = 20;

  entries.forEach((entry, index) => {
    if (index > 0) {
      pdf.addPage();
      yOffset = 20;
    }
    
    pdf.setFontSize(16);
    pdf.text(`Entry ${index + 1}`, 20, yOffset);
    
    pdf.setFontSize(12);
    pdf.text(`Topic: ${entry.topic}`, 20, yOffset + 10);
    pdf.text(`Date: ${new Date(entry.createdAt).toLocaleDateString()}`, 20, yOffset + 20);
    pdf.text('Description:', 20, yOffset + 30);
    
    const splitDescription = pdf.splitTextToSize(entry.description, 170);
    pdf.text(splitDescription, 20, yOffset + 40);
  });

  pdf.save('all-descriptions.pdf');
};