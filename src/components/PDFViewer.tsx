
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfUrl: string | null;
  pdfId: string | null;
  pdfName: string | null;
}

export const PDFViewer = ({ pdfUrl, pdfId, pdfName }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadPdfFromLocalStorage = () => {
      if (pdfId) {
        const storedPdf = localStorage.getItem(`pdf_${pdfId}`);
        if (storedPdf) {
          toast({
            title: "PDF Loaded from Cache",
            description: `${pdfName} loaded from local storage.`
          });
          setPdfData(storedPdf);
          return true;
        }
      }
      return false;
    };
    
    const fetchPdf = async () => {
      if (!pdfUrl || !pdfId) {
        setPdfData(null);
        return;
      }
      
      // First check if PDF is in localStorage
      const isInLocalStorage = loadPdfFromLocalStorage();
      
      if (isInLocalStorage) return;
      
      // If not in localStorage, fetch it
      setLoading(true);
      
      try {
        // Handle Google Drive links specially
        const isGoogleDriveLink = pdfUrl.includes('drive.google.com');
        
        const response = await axios.get(pdfUrl, {
          responseType: "arraybuffer",
          // For Google Drive links, we might need additional headers to bypass limitations
          headers: isGoogleDriveLink ? {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf',
          } : {}
        });
        
        // Convert arraybuffer to base64
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          
          // Save to localStorage
          try {
            localStorage.setItem(`pdf_${pdfId}`, base64);
            toast({
              title: "PDF Cached",
              description: `${pdfName} saved to local storage for faster access.`
            });
          } catch (err) {
            console.error("Error saving to localStorage:", err);
            toast({
              title: "Cache Error",
              description: "Could not save PDF to local storage. It may be too large.",
              variant: "destructive"
            });
          }
          
          setPdfData(base64);
        };
        
        reader.readAsDataURL(pdfBlob);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        toast({
          title: "Error Loading PDF",
          description: "Could not load the selected PDF. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPdf();
  }, [pdfUrl, pdfId, pdfName, toast]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  };

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-news-dark mb-4">Welcome to PDF News Portal</h3>
          <p className="text-news-dark">Please select a publication from the dropdown above to start reading.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-news-primary border-r-transparent mb-4"></div>
          <p>Loading PDF from Google Drive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="mb-4 flex items-center space-x-2">
        <Button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {pageNumber} of {numPages || "-"}
        </span>
        <Button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 1)}
          variant="outline"
        >
          Next
        </Button>
      </div>
      
      <div className="pdf-container border border-gray-200 rounded overflow-auto">
        {pdfData ? (
          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-full">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-news-primary border-r-transparent"></div>
              </div>
            }
            error={
              <div className="flex justify-center items-center h-full text-news-secondary">
                <p>Failed to load PDF. Please try again.</p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mx-auto"
              width={Math.min(window.innerWidth - 40, 800)}
            />
          </Document>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Loading PDF content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
