
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-news-primary text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">PDF News Portal</h2>
            <p className="text-sm text-gray-300">Your source for digital publications</p>
          </div>
          
          <div className="text-sm text-gray-300">
            <p>&copy; {currentYear} PDF News Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
