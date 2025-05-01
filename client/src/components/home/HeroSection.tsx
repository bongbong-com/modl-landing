import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowDown, Shield, ShieldCheck, Users, MessageSquare, ChevronDown, X } from "lucide-react";

// Define the feature data structure
interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  expandedContent: string;
}

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  // Features data with expanded content
  const features: Feature[] = [
    { 
      icon: <Shield className="h-6 w-6" />, 
      title: "Auto Moderation", 
      desc: "AI-powered chat and behavior monitoring",
      expandedContent: "Our AI-driven auto-moderation system can detect toxic language, hate speech, spam, and harassment in real-time. It adapts to your community's unique communication style and can be fine-tuned to match your specific standards. Reduce manual moderation time by up to 85%."
    },
    { 
      icon: <ShieldCheck className="h-6 w-6" />, 
      title: "Dynamic Punishments", 
      desc: "Escalating penalties based on violation history",
      expandedContent: "Automatically adjust punishment severity based on a player's history. First offenses might receive warnings, while repeat offenders face temporary or permanent bans. Create custom escalation paths for different violation types and ensure consistency across your moderation team."
    },
    { 
      icon: <Users className="h-6 w-6" />, 
      title: "Account Linking", 
      desc: "Connect in-game identities with Discord & more",
      expandedContent: "Link player accounts across platforms to maintain consistent moderation history. Connect game accounts with Discord, Steam, Xbox, PlayStation, and more. Prevent banned players from circumventing punishments by creating new accounts, ensuring a truly secure gaming environment."
    },
    { 
      icon: <MessageSquare className="h-6 w-6" />, 
      title: "Support Tickets", 
      desc: "In-game reporting system for players",
      expandedContent: "Give players a seamless way to report issues without leaving your game. Our customizable ticket system handles player reports, chat reports, bug reports, and punishment appeals. Assign tickets to staff members, track resolution status, and maintain detailed logs for reference."
    }
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-8">
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
            <div className="pt-3 flex items-center gap-2 text-muted-foreground justify-center">
              <Check className="text-green-500" />
              <span>Free forever, no card or gimmicks</span>
            </div>
          </div>
        </motion.div>
        
        {/* Feature cards - expandable */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <motion.div 
                  className={`bg-card/60 backdrop-blur-sm rounded-xl border ${expandedFeature === index ? 'border-primary' : 'border-gray-800'} p-6 transition-colors cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ y: expandedFeature === index ? 0 : -5 }}
                  onClick={() => toggleFeature(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mt-1 -mr-1 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFeature(index);
                      }}
                    >
                      {expandedFeature === index ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  
                  <AnimatePresence>
                    {expandedFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-gray-800">
                          <p className="text-sm text-foreground">
                            {feature.expandedContent}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
