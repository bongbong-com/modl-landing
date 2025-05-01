import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const freePlanFeatures = [
  "Up to 10 staff members",
  "100K API requests",
  "Full-feature moderation suite",
  "No ads, no gimmicks",
  "Community support"
];

const premiumPlanFeatures = [
  "Unlimited staff members",
  "500K API requests",
  "Access to beta AI chat moderation",
  "Priority support",
  "Additional API requests at $1/50K"
];

export default function PricingSection() {
  const [, navigate] = useLocation();

  const goToRegistration = (plan: string) => {
    navigate(`/register?plan=${plan}`);
  };

  return (
    <section id="pricing" className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your game and community size
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            className="bg-card rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Free Plan</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">Perfect for indie developers and small communities.</p>
              
              <ul className="mt-6 space-y-4">
                {freePlanFeatures.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  >
                    <Check className="text-green-500 mt-1 mr-2" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => goToRegistration("free")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Premium Plan */}
          <motion.div 
            className="bg-card rounded-2xl border border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">For established games with growing communities.</p>
              
              <ul className="mt-6 space-y-4">
                {premiumPlanFeatures.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                  >
                    <Check className="text-green-500 mt-1 mr-2" />
                    <span dangerouslySetInnerHTML={{ __html: feature.replace(/\b(Unlimited|500K|AI chat moderation|Priority|Additional)\b/g, '<b>$1</b>') }}></span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => goToRegistration("premium")}
                >
                  Choose Premium
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground">Need a custom plan for larger operations?</p>
          <a href="#" className="text-primary hover:text-primary/80 inline-flex items-center mt-2">
            <span>Contact us for enterprise pricing</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
