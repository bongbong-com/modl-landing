import { motion } from "framer-motion";

const productLinks = ["Features", "Pricing", "Integrations", "Changelog", "Documentation"];
const resourceLinks = ["Blog", "Community", "Case Studies", "Help Center", "API Reference"];
const companyLinks = ["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
              <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              The complete moderation and player support solution for game developers.
            </p>
            <div className="mt-6 flex space-x-4">
              {["twitter", "discord", "github", "linkedin"].map((socialIcon, i) => (
                <motion.a 
                  key={socialIcon}
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <FooterLinkColumn title="Product" links={productLinks} delay={0.1} />
          <FooterLinkColumn title="Resources" links={resourceLinks} delay={0.2} />
          <FooterLinkColumn title="Company" links={companyLinks} delay={0.3} />
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} modl, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links, delay = 0 }: { title: string; links: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + (index * 0.03) }}
          >
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {link}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
