import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "modl-shared-web/components/ui/accordion";

const FAQData = [
  {
    question: "How easy is it to integrate modl with my game?",
    answer: "Integration is straightforward with our comprehensive SDKs for Unity, Unreal Engine, and other popular game engines. We also provide a RESTful API for custom integrations. Most developers can complete basic integration in less than a day."
  },
  {
    question: "Can I customize the moderation rules for my game?",
    answer: "Absolutely! modl provides extensive customization options for moderation rules. You can adjust sensitivity levels, create custom word filters, define punishment escalation paths, and even train AI models specific to your game's context and community standards."
  },
  {
    question: "What happens if I exceed my API request limit?",
    answer: "If you exceed your monthly API request limit, you can purchase additional capacity at $1 per 50K requests. We'll notify you when you reach 80% of your limit so you can plan accordingly. We never cut off service unexpectedly - your moderation will continue to function even if you exceed your limit."
  },
  {
    question: "Is modl GDPR and COPPA compliant?",
    answer: "Yes, modl is fully compliant with GDPR, COPPA, and other major privacy regulations. We provide data processing agreements, clear privacy policies, and tools to help you meet regulatory requirements. Our systems are designed with privacy and data protection in mind."
  },
  {
    question: "Can I migrate from another moderation system?",
    answer: "We offer migration tools and support to help you transition from other moderation systems. Our team can assist with importing historical data, mapping existing rules to our platform, and providing training for your moderation team to ensure a smooth transition."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <div className="bg-card rounded-xl border border-gray-800 mb-3">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="text-lg font-medium text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </div>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
