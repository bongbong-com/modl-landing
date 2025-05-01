import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 border-b border-gray-800 backdrop-blur shadow-lg' : ''}`}>
      <div className="bg-background/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); scrollToSection("top"); }}>
                <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
                <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}>Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>Testimonials</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQ</a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={goToRegistration}>
                Get Started
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-background/95 backdrop-blur border-b border-gray-800 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#features" 
                className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10"
                onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10"
                onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10"
                onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}
              >
                Testimonials
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10"
                onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}
              >
                FAQ
              </a>
              <Button 
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={goToRegistration}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
