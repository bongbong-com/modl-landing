import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowDown, Shield, ShieldCheck, Users, MessageSquare } from "lucide-react";

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
      {/* Background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            className="perspective-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span>Next-Gen </span>
                <span className="bg-gradient-to-r from-primary via-accent to-green-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
                  Game Moderation
                </span>
                <span> & Player Support</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handle player reports, moderation, and support tickets with our all-in-one platform designed specifically for game developers.
              </p>
              <div className="flex flex-wrap gap-4 pt-3 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform" 
                  onClick={goToRegistration}
                >
                  Register Your Server for Free
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
              <div className="pt-5 flex items-center gap-2 text-muted-foreground justify-center">
                <Check className="text-green-500" />
                <span>Free forever, no card or gimmicks</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature cards replacing the image */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { 
              icon: <Shield className="h-6 w-6" />, 
              title: "Auto Moderation", 
              desc: "AI-powered chat and behavior monitoring" 
            },
            { 
              icon: <ShieldCheck className="h-6 w-6" />, 
              title: "Dynamic Punishments", 
              desc: "Escalating penalties based on violation history" 
            },
            { 
              icon: <Users className="h-6 w-6" />, 
              title: "Account Linking", 
              desc: "Connect in-game identities with Discord & more" 
            },
            { 
              icon: <MessageSquare className="h-6 w-6" />, 
              title: "Support Tickets", 
              desc: "In-game reporting system for players" 
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-card/60 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-primary/50 transition-colors hover:shadow-lg hover:shadow-primary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
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
