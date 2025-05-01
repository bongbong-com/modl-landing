import { motion } from "framer-motion";

const testimonials = [
  {
    content: "modl has completely transformed how we handle player reports. The AI auto-moderation catches 95% of toxic behavior before it's even reported.",
    author: "Victoria Peters",
    role: "Community Director, Quantum Games",
    initials: "VP",
    avatarColor: "bg-primary/20",
    textColor: "text-primary",
    rating: 5
  },
  {
    content: "The seamless in-game integration makes it easy for players to report issues without disrupting gameplay. Our moderation team's efficiency has improved by 70%.",
    author: "James Wilson",
    role: "Lead Developer, Stellar Studios",
    initials: "JW",
    avatarColor: "bg-accent/20",
    textColor: "text-accent",
    rating: 5
  },
  {
    content: "We started with the free plan for our indie game launch and easily scaled up as our community grew. The pricing is transparent and the API is rock solid.",
    author: "Rachel Morgan",
    role: "Indie Game Developer",
    initials: "RM",
    avatarColor: "bg-green-500/20",
    textColor: "text-green-500",
    rating: 4.5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {hasHalfStar && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <svg key={i + fullStars + (hasHalfStar ? 1 : 0)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Game Developers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about our moderation services
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -15px rgba(139, 92, 246, 0.2)" }}
            >
              <div className="flex items-center mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-foreground mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center`}>
                  <span className={testimonial.textColor + " font-bold"}>{testimonial.initials}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-card rounded-2xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                  alt="Esports team logo" 
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Epic Legends Online</h3>
              <div className="text-muted-foreground mb-6 text-lg">
                "After implementing modl, our player retention improved by 22%. The toxic players were driving away our core audience, but now our community is thriving. The AI moderation catches problematic behavior before it escalates, and the appeal system gives players a fair process."
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">CTO, Epic Legends Online</div>
                </div>
                <div className="flex items-center text-primary">
                  <span>Read full case study</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gaming tournament with players" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
