import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [, navigate] = useLocation();

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="perspective-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6 transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span>Next-Gen </span>
                <span className="bg-gradient-to-r from-primary via-accent to-green-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
                  Game Moderation
                </span>
                <span> & Player Support</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Handle player reports, moderation, and support tickets with our all-in-one platform designed specifically for game developers.
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform" 
                  onClick={goToRegistration}
                >
                  Get Started for Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={scrollToFeatures}
                >
                  <span>Learn More</span>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-5 flex items-center gap-2 text-muted-foreground">
                <Check className="text-green-500" />
                <span>No credit card required for free plan</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full filter blur-3xl"></div>
            <motion.div 
              className="relative bg-card p-4 rounded-2xl border border-gray-800 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gaming setup with RGB lighting" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">INTEGRATED MODERATION</div>
                    <div className="text-foreground font-medium">Seamless in-game web integration</div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 bg-primary rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "99.9%", label: "Uptime Reliability" },
            { stat: "500K+", label: "Monthly API Requests" },
            { stat: "200+", label: "Game Integrations" },
            { stat: "24/7", label: "Moderation Support" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-card rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            >
              <div className="text-4xl font-bold text-foreground">{item.stat}</div>
              <div className="text-muted-foreground mt-2">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
