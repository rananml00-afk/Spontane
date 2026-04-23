import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Frankfurt, Germany",
    text: "Spontane helped me practice German with locals in my neighborhood. Within just 3 months, I went from basic conversational skills to confidently discussing complex topics with native speakers.",
    language: "German"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    location: "Berlin, Germany", 
    text: "As a software developer who moved to Germany, Spontane was exactly what I needed. The app connected me with other professionals who helped me practice business German in real-world scenarios.",
    language: "German"
  },
  {
    id: 3,
    name: "Sophie Chen",
    location: "Munich, Germany",
    text: "I love how Spontane focuses on real conversations rather than textbook exercises. Meeting people through the app has not only improved my German but also helped me build genuine friendships.",
    language: "German"
  },
  {
    id: 4,
    name: "Marco Bianchi",
    location: "Hamburg, Germany",
    text: "The safety features and verification process made me feel comfortable meeting new people. Spontane created a trustworthy environment where I could focus on learning without worrying about security.",
    language: "German"
  },
  {
    id: 5,
    name: "Elena Petrov",
    location: "Cologne, Germany",
    text: "What sets Spontane apart is the quality of connections. I've met people who share similar interests and professional backgrounds, making our language exchanges both educational and enjoyable.",
    language: "German"
  },
  {
    id: 6,
    name: "David Kim",
    location: "Stuttgart, Germany",
    text: "The flexibility of scheduling through Spontane is amazing. Whether I have 30 minutes during lunch or a free evening, I can always find someone available for a quick language practice session.",
    language: "German"
  }
];

export function Testimonials() {
  return (
    <section className="w-full py-32 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
            SUCCESS STORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real People, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            See how language learners are connecting through Spontane
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-gray-700 mb-6 leading-relaxed font-light">
                "{testimonial.text}"
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}