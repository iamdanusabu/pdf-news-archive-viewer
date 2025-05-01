
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PDFOption {
  id: string;
  name: string;
  url: string;
}

interface HeaderProps {
  onSelectPDF: (pdf: PDFOption) => void;
  selectedPDFId: string | null;
}

// PDF sources with Google Drive links
const mockPDFs: PDFOption[] = [
  {
    id: "pdf1",
    name: "Sample Google Drive PDF",
    url: "https://drive.google.com/uc?export=download&id=1BqnJjgI5GdluiSXh7Ds8CDRRCz65biN5",
  },
  {
    id: "pdf2",
    name: "Another Google Drive PDF",
    url: "https://drive.google.com/uc?export=download&id=1pLHOdKD0-WM4kH-2KKpCkOIqcNk9YXg_",
  },
  {
    id: "pdf3",
    name: "Regular Web PDF (Fallback)",
    url: "https://www.orimi.com/pdf-test.pdf", // Regular URL as fallback
  },
  {
    id: "pdf4",
    name: "My Custom PDF Document",
    url: "https://drive.google.com/uc?export=download&id=1Lo_Ce9bGRlCE3yAbLsXEUG_MUpY9wvh9",
  },
];

export const Header = ({ onSelectPDF, selectedPDFId }: HeaderProps) => {
  const handleSelectChange = (value: string) => {
    const selectedPDF = mockPDFs.find(pdf => pdf.id === value);
    if (selectedPDF) {
      onSelectPDF(selectedPDF);
    }
  };

  return (
    <header className="bg-news-primary text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">PDF News Portal</h1>
            <p className="text-sm">Your source for digital news</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedPDFId || undefined} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[200px] bg-white text-black">
                <SelectValue placeholder="Select a publication" />
              </SelectTrigger>
              <SelectContent>
                {mockPDFs.map((pdf) => (
                  <SelectItem key={pdf.id} value={pdf.id}>
                    {pdf.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};
