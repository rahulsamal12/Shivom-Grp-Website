'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PageBanner } from '@/components/layout/PageBanner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useSubmitContact } from '@/hooks/useContact';
import {
  Phone,
  Mail,
  Globe,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function ContactPage() {
  const { mutateAsync: submitContact, isPending } = useSubmitContact();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Validation & status states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Validate Form Fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      // Check phone contains only digits, spaces, hyphens, pluses, and is reasonable length (e.g. 7-15 chars)
      const phoneRegex = /^[+]?[0-9\s\-()]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message details are required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setApiErrorMessage('');

    if (!validateForm()) return;

    try {
      const success = await submitContact(formData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setSubmitStatus('error');
        setApiErrorMessage('Failed to submit the form. Please try again.');
      }
    } catch (err: unknown) {
      setSubmitStatus('error');
      const msg = err instanceof Error ? err.message : 'There was an error submitting your request. Please try again later.';
      setApiErrorMessage(msg);
    }
  };

  // Smooth scroll helper for CTA
  const scrollToForm = () => {
    const element = document.getElementById('contact-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus on the first input after scrolling
      setTimeout(() => {
        const nameInput = document.getElementById('contact-name-input');
        if (nameInput) nameInput.focus();
      }, 800);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "SHIVOM SOLAR SOLUTIONS",
            "image": "https://shivomgroup.in/logo.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar",
              "addressLocality": "Bhubaneswar",
              "addressRegion": "Odisha",
              "postalCode": "751010",
              "addressCountry": "IN"
            },
            "email": "info@shivomgroup.in",
            "url": "https://shivomgroup.in"
          })
        }}
      />
      {/* SECTION 1: PAGE BANNER */}
      <PageBanner
        title="Contact Shivom Group"
        subtitle="Let's Build Infrastructure Together"
        breadcrumb="Contact"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
      />

      {/* Main Content Grid: Info & Form */}
      <section id="contact-form-section" className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* SECTION 2: CONTACT INFORMATION (5 Columns) */}
            <motion.div className="lg:col-span-5 space-y-8" variants={fadeUp}>
              <div>
                <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-3 block">
                  Find Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                  Get in Touch with our Offices
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have questions about our civil engineering, grid-scale solar, or PSC pole production? Reach out to our leadership or operational branches below.
                </p>
              </div>

              {/* Office: SHIVOM GROUP */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-brand-navy">SHIVOM GROUP</h3>
                    <span className="bg-brand-orange/15 text-brand-orange text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Primary</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-3">
                    Plot No. 41, Sect. A, Zone B{"\n"}
                    Near KTM Showroom, Mancheswar{"\n"}
                    Bhubaneswar – 751010{"\n"}
                    Odisha, India
                  </p>
                </div>
              </div>

              {/* Quick Contact Details */}
              <div className="bg-brand-navy rounded-xl p-8 text-white space-y-6">
                <h3 className="text-xl font-bold text-brand-orange mb-4">Direct Details</h3>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Email</span>
                    <a href="mailto:info@shivomgroup.in" className="text-white hover:text-brand-orange-light transition-colors font-medium">
                      info@shivomgroup.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Website</span>
                    <a href="https://shivomgroup.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-orange-light transition-colors font-medium">
                      shivomgroup.in
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 3: CONTACT FORM & MAP (7 Columns) */}
            <motion.div className="lg:col-span-7 space-y-8" variants={fadeUp}>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-brand-navy mb-2">Send us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Please fill in the details below. Our corporate executives will reach back to you within 24 business hours.</p>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 flex gap-3 items-start"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-green-900 mb-1">Message Sent Successfully!</h3>
                      <p className="text-sm">Thank you for contacting Shivom Group. Your message has been recorded and we will respond shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-6 bg-red-50 border border-red-200 rounded-xl text-red-800 flex gap-3 items-start"
                  >
                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-900 mb-1">Submission Failed</h3>
                      <p className="text-sm">{apiErrorMessage}</p>
                    </div>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name-input" className="text-sm font-semibold text-brand-navy">Full Name</label>
                      <Input
                        id="contact-name-input"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        placeholder="John Doe"
                        required
                        disabled={isPending}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email-input" className="text-sm font-semibold text-brand-navy">Email Address</label>
                      <Input
                        id="contact-email-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="john@example.com"
                        required
                        disabled={isPending}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-phone-input" className="text-sm font-semibold text-brand-navy">Phone Number</label>
                      <Input
                        id="contact-phone-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="Enter your contact number"
                        required
                        disabled={isPending}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-subject-input" className="text-sm font-semibold text-brand-navy">Subject</label>
                      <Input
                        id="contact-subject-input"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        error={errors.subject}
                        placeholder="Request for PSC Pole Quote"
                        required
                        disabled={isPending}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message-input" className="text-sm font-semibold text-brand-navy">Message Details</label>
                    <Textarea
                      id="contact-message-input"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      error={errors.message}
                      rows={5}
                      placeholder="Explain your project specifications or inquiry details..."
                      required
                      disabled={isPending}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </div>

              {/* Map Section */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 group h-[450px] md:h-[600px] lg:h-[700px]">
                <iframe
                  src="https://maps.google.com/maps?q=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full transition-all duration-500"
                  title="Shivom Group Location Map Mancheswar Bhubaneswar Odisha"
                />

                {/* Floating Contact Card */}
                <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-100/50 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                        <Building className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>Shivom Group</span>
                      </h4>
                      <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                        Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India
                      </p>
                    </div>



                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=KTM+Showroom+Mancheswar+Bhubaneswar+Odisha+751010"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg text-center"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* SECTION 5: BUSINESS CTA */}
      <section className="py-20 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.1),transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Need Solar, Infrastructure or PSC Pole Solutions?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Our technical experts are ready to collaborate on utility and custom infrastructure project blueprints.
            </p>
            <Button
              onClick={scrollToForm}
              variant="primary"
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-light hover:scale-105 active:scale-95 transition-all text-white px-8"
            >
              Request Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
