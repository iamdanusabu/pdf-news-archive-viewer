
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface PDFOption {
  id: string;
  name: string;
  url: string;
}

// Sample PDF options - replace these with your actual Google Drive PDFs
const PDF_OPTIONS: PDFOption[] = [
  {
    id: "daily-news-may-01",
    name: "Daily News - May 1, 2025",
    url: "https://drive.google.com/uc?export=download&id=1BXmQU6rS9-e41PneVZDkbXVCVlCdIZRL",
  },
  {
    id: "weekly-report",
    name: "Weekly Report",
    url: "https://drive.google.com/uc?export=download&id=1zHDuOsxhkxOBBmgdZZEJ_6e18R8TYvGg",
  },
  {
    id: "monthly-magazine",
    name: "Monthly Magazine",
    url: "https://drive.google.com/uc?export=download&id=1p_8E4SrGBnHV8Pk_y1e4Y9YEgUEXm5dT",
  },
];

interface HeaderProps {
  onSelectPDF: (pdf: PDFOption) => void;
  selectedPDFId: string | null;
}

export const Header = ({ onSelectPDF, selectedPDFId }: HeaderProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectChange = (value: string) => {
    setIsLoading(true);
    const selectedPDF = PDF_OPTIONS.find(pdf => pdf.id === value);
    
    if (selectedPDF) {
      toast({
        title: "Loading PDF",
        description: `Loading ${selectedPDF.name}...`,
      });
      
      onSelectPDF(selectedPDF);
    }
    
    setIsLoading(false);
  };

  return (
    <header className="bg-news-primary text-white py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">PDF News Portal</h1>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select
            value={selectedPDFId || undefined}
            onValueChange={handleSelectChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full md:w-[240px] bg-white text-news-dark">
              <SelectValue placeholder="Select a publication" />
            </SelectTrigger>
            <SelectContent>
              {PDF_OPTIONS.map((pdf) => (
                <SelectItem key={pdf.id} value={pdf.id}>
                  {pdf.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            disabled={isLoading || !selectedPDFId}
            onClick={() => {
              const selectedPDF = PDF_OPTIONS.find(pdf => pdf.id === selectedPDFId);
              if (selectedPDF) {
                window.open(selectedPDF.url);
              }
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </header>
  );
};
