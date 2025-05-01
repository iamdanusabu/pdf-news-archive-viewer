
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

const mockPDFs: PDFOption[] = [
  {
    id: "pdf1",
    name: "Sample PDF 1",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf2",
    name: "Sample PDF 2",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: "pdf3",
    name: "Sample PDF 3",
    url: "https://www.orimi.com/pdf-test.pdf",
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
