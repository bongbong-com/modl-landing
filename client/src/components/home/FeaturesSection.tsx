import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Define the features array
const features = [
  {
    icon: "shield-check",
    title: "Dynamic Punishments",
    description: "Create customizable punishment systems that scale with player behavior patterns.",
    bgColor: "bg-primary/20",
    textColor: "text-primary"
  },
  {
    icon: "link",
    title: "Account Linking",
    description: "Seamlessly connect player accounts across platforms for comprehensive moderation.",
    bgColor: "bg-accent/20",
    textColor: "text-accent"
  },
  {
    icon: "headphones",
    title: "Support Tickets",
    description: "Integrated ticketing system for player reports, appeals, and bug submissions.",
    bgColor: "bg-green-500/20",
    textColor: "text-green-500"
  },
  {
    icon: "bot",
    title: "AI Auto-Moderation",
    description: "Advanced AI systems that detect and respond to toxic behavior in real-time.",
    bgColor: "bg-primary/20",
    textColor: "text-primary"
  },
  {
    icon: "globe",
    title: "Web Integration",
    description: "Embed moderation interfaces directly within your game for seamless player experience.",
    bgColor: "bg-accent/20",
    textColor: "text-accent"
  },
  {
    icon: "layout-dashboard",
    title: "Analytics Dashboard",
    description: "Comprehensive reports and insights on community health and moderator activity.",
    bgColor: "bg-green-500/20",
    textColor: "text-green-500"
  }
];

const integrationFeatures = [
  "Simple API endpoints for core functionality",
  "Unity, Unreal, and web SDK support",
  "Customizable UI components",
  "Webhook integration for real-time events"
];

// Icon mapping
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "shield-check":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "link":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
    case "headphones":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.0 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "bot":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "layout-dashboard":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    default:
      return null;
  }
};

// Feature card container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Feature card item animation
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Moderation Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to keep your gaming community safe, engaged, and thriving
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <span className={feature.textColor}>
                  {getIcon(feature.icon)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Seamless In-Game Integration</h3>
                <p className="text-muted-foreground mb-6">
                  Our API and SDK solutions make it easy to integrate moderation tools directly into your game experience. Players can report issues without leaving your game, and moderators can respond quickly.
                </p>
                <ul className="space-y-3">
                  {integrationFeatures.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    >
                      <Check className="text-green-500 mt-1 mr-2" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Esports team at gaming event" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
