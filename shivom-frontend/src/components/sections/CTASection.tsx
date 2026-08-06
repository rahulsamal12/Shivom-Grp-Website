'use client';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/90 to-brand-orange/80 mix-blend-multiply" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start your next infrastructure project?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Partner with Shivom Group for reliable, high-quality, and government-grade utility solutions across Odisha.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">Contact Us Today</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-orange">View Our Projects</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
