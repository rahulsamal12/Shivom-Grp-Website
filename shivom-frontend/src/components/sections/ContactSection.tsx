'use client';
import { motion } from 'framer-motion';
import { fadeUp, slideInRight } from '@/lib/animations';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSubmitContact } from '@/hooks/useContact';

export function ContactSection() {
  const { mutateAsync: submitContact, isPending } = useSubmitContact();
  return (
    <section className="py-24 bg-brand-navy text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <motion.div 
            className="lg:w-5/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to discuss your next project?</h2>
            <p className="text-gray-400 text-lg mb-12">
              Our team of infrastructure experts and engineers are ready to deliver high-quality EPC and manufacturing solutions for your requirements.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Corporate Office</h4>
                  <p className="text-gray-400">Bhubaneswar, Odisha, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Contact Numbers</h4>
                  <p className="text-gray-400">+91 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email Inquiry</h4>
                  <p className="text-gray-400">info@shivomgroup.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-7/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 text-brand-navy shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send an Inquiry</h3>
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = new FormData(form);
                  
                  try {
                    await submitContact({
                      name: data.get('name') as string,
                      email: data.get('email') as string,
                      phone: data.get('phone') as string || '',
                      subject: data.get('company') as string || 'General Inquiry',
                      message: data.get('message') as string,
                    });
                    form.reset();
                    alert('Thank you for your message. We will get back to you shortly.');
                  } catch {
                    alert('There was an error sending your message. Please try again later.');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input name="name" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input name="email" required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all" placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company / Organization</label>
                  <input name="company" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all" placeholder="Govt Dept / Enterprise Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                </div>
                <Button size="lg" className="w-full" disabled={isPending}>
                  {isPending ? 'Sending...' : 'Submit Inquiry'}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
