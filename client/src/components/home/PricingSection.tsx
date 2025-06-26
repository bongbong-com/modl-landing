import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "modl-shared-web/components/ui/button";

const freePlanFeatures = [
  "Up to 10 staff members",
  "100K Monthly API requests",
  "Full-feature moderation & support suite",
  "No ads, no gimmicks",
  "Community support"
];

const premiumPlanFeatures = [
  "Unlimited staff members",
  "500K Monthly API requests",
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
            Free forever for hobbyists, fair forever when you get serious.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            className="bg-card rounded-2xl border border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50"
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
              <p className="mt-4 text-muted-foreground">Free forever for communities with &lt;100 concurrent players.</p>
              
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
                    <span dangerouslySetInnerHTML={{ __html: feature.replace(/\b(10|100K|Full-feature|no gimmicks|Community)\b/g, '<b>$1</b>') }}></span>
                  </motion.li>
                ))}
              </ul>
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
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="mt-4 text-muted-foreground">For large communities turning a profit.</p>
              
              <ul className="mt-12 space-y-4">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
