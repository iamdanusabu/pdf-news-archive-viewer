
import { useState } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import PDFViewer from "@/components/PDFViewer";

interface PDFOption {
  id: string;
  name: string;
  url: string;
}

const Index = () => {
  const [selectedPDF, setSelectedPDF] = useState<PDFOption | null>(null);

  const handleSelectPDF = (pdf: PDFOption) => {
    setSelectedPDF(pdf);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSelectPDF={handleSelectPDF} 
        selectedPDFId={selectedPDF?.id || null} 
      />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <PDFViewer 
          pdfUrl={selectedPDF?.url || null}
          pdfId={selectedPDF?.id || null}
          pdfName={selectedPDF?.name || null}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
