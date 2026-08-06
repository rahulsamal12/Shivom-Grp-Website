'use client';

import { PageBanner } from '@/components/layout/PageBanner';
import { useCareers } from '@/hooks/useCareers';
import { useSubmitApplication } from '@/hooks/useCareerApplications';
import { ICareer } from '@/types';
import { 
  Loader2, 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Upload, 
  File, 
  Trash2, 
  AlertCircle 
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function CareersPage() {
  const { data: careers = [], isLoading } = useCareers();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<ICareer | null>(null);
  
  // Drag & drop file states
  const [dragActive, setDragActive] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    experience: '',
    coverLetter: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { mutate: submitApplication, isPending } = useSubmitApplication();
  const scrollableBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when a new job is selected and modal opens
  useEffect(() => {
    if (selectedJob && scrollableBodyRef.current) {
      scrollableBodyRef.current.scrollTop = 0;
    }
  }, [selectedJob]);

  // Filter only active jobs
  const activeJobs = careers.filter((job: ICareer) => job.isActive !== false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApplyClick = (job: ICareer) => {
    setSelectedJob(job);
    setResumeFile(null);
    setFileError(null);
    setFormErrors({});
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      currentLocation: '',
      experience: '',
      coverLetter: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setFileError(null);
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!isValidExtension) {
      setFileError('Only PDF, DOC, and DOCX files are allowed.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      setFileError('File size must be less than 5 MB.');
      return;
    }
    
    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const scrollToPositions = () => {
    const element = document.getElementById('openings-section');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address format.';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone Number is required.';
    if (!formData.currentLocation.trim()) errors.currentLocation = 'Current Location is required.';
    if (!formData.experience.trim()) errors.experience = 'Years of Experience is required.';
    if (!resumeFile) {
      setFileError('Please upload your resume.');
      return false;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("currentLocation", formData.currentLocation);
    payload.append("experience", formData.experience);
    payload.append("position", selectedJob.title);
    payload.append("careerId", selectedJob._id);
    payload.append("slug", selectedJob.slug || 'general');
    payload.append("coverLetter", formData.coverLetter);
    payload.append("division", selectedJob.division || 'group');
    if (resumeFile) {
      payload.append("resume", resumeFile);
    }

    submitApplication(payload, {
      onSuccess: (success) => {
        if (success) {
          setToastMessage("Application Submitted Successfully\n\nThank you for your interest in Shivom Group.\n\nOur HR Team will contact you shortly.");
          setTimeout(() => setToastMessage(null), 5000);
          setSelectedJob(null);
          setResumeFile(null);
        } else {
          setFileError("Failed to submit application. Please try again.");
        }
      },
      onError: (error: Error) => {
        const errMsg = error?.message || "An error occurred during submission. Please try again.";
        setFileError(errMsg);
      }
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce border border-green-500">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-sm whitespace-pre-line">{toastMessage}</span>
        </div>
      )}

      <PageBanner 
        title="Careers at Shivom" 
        breadcrumb="Careers" 
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
      />

      {/* Dynamic Hiring CTA Header */}
      <section className="py-20 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            {activeJobs.length} Active Openings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
            Join Shivom Group
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-light">
            Build your career with Odisha&apos;s leading Infrastructure, EPC, Solar Energy and Manufacturing organization.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={scrollToPositions} size="lg" className="hover:scale-105 active:scale-95 transition-all">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      <section id="openings-section" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Current Openings
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
              Review Open Requirements
            </h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Checking current job requirements...</p>
            </div>
          ) : activeJobs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-150 shadow-inner max-w-3xl mx-auto px-6">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-brand-navy mb-3">No Open Positions Currently</h3>
              <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
                You may still submit your profile to our HR Team.
              </p>
              <div className="mb-8 text-sm text-gray-600 space-y-1">
                <p className="font-bold text-brand-navy text-base">Contact:</p>
                <p className="font-semibold text-brand-navy">Mr. Satyam Singh</p>
                <p>+91 8895865734</p>
                <p>hr@shivomgroup.in</p>
              </div>
              <Button 
                onClick={() => handleApplyClick({ 
                  _id: 'general-app', 
                  title: 'General Application', 
                  department: 'General', 
                  location: 'Bhubaneswar', 
                  type: 'Full-time', 
                  description: 'General resume submission for future openings.', 
                  requirements: [], 
                  responsibilities: [], 
                  isActive: true, 
                  slug: 'general',
                  division: 'group'
                })}
                className="hover:scale-105 transition-transform"
              >
                Submit General Application
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {activeJobs.map((job: ICareer) => {
                const isExpanded = expandedId === job._id;
                
                // Helper to strip HTML tags from description for short description preview
                const strippedDesc = job.description
                  ? job.description.replace(/<[^>]*>/g, '')
                  : '';
                const shortDesc = strippedDesc.length > 150 
                  ? `${strippedDesc.substring(0, 150)}...` 
                  : strippedDesc;

                return (
                  <div 
                    key={job._id} 
                    className="border border-gray-150 rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="p-6 md:p-8 flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {job.division && (
                          <span className={`text-[10px] md:text-xs font-extrabold px-2.5 py-1 rounded border uppercase tracking-wider ${
                            job.division.toLowerCase() === 'group' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            job.division.toLowerCase() === 'enterprise' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                            job.division.toLowerCase() === 'solar' ? 'bg-green-50 text-green-600 border-green-200' :
                            job.division.toLowerCase() === 'concrete' ? 'bg-gray-100 text-gray-600 border-gray-300' :
                            'bg-gray-100 text-gray-600 border-gray-300'
                          }`}>
                            [ {job.division} ]
                          </span>
                        )}
                        <span className="bg-brand-navy/5 text-brand-navy text-[10px] md:text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] md:text-xs text-gray-400 font-semibold uppercase">
                          <Clock className="w-3.5 h-3.5 text-brand-orange" />
                          {job.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-4">
                        {job.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        {job.experience && (
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-brand-orange shrink-0" />
                            <span className="truncate">Exp: {job.experience}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {shortDesc}
                      </p>

                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-100 bg-gray-50/20">
                          <div className="prose max-w-none text-gray-600 mb-6 text-sm leading-relaxed">
                            <h4 className="font-bold text-brand-navy mb-2">Role Description</h4>
                            <p dangerouslySetInnerHTML={{ __html: job.description }} />
                          </div>
                          
                          {job.requirements && job.requirements.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-bold text-brand-navy text-sm mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start gap-2.5 text-gray-600 text-xs md:text-sm">
                                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-bold text-brand-navy text-sm mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((resp, index) => (
                                  <li key={index} className="flex items-start gap-2.5 text-gray-600 text-xs md:text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0 mt-2" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0">
                      <Button 
                        variant="outline" 
                        onClick={() => toggleExpand(job._id)}
                        className="text-xs md:text-sm font-semibold flex-grow py-3"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </Button>
                      <Button 
                        onClick={() => handleApplyClick(job)}
                        className="text-xs md:text-sm font-semibold flex-grow py-3"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dedicated HR Contact Card */}
          <div className="max-w-4xl mx-auto mt-20 bg-brand-navy rounded-2xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.1),transparent)]" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-2 block">
                  Need help applying?
                </span>
                <h3 className="text-2xl font-bold mb-1">Mr. Satyam Singh</h3>
                <p className="text-gray-300 text-sm mb-4 font-medium">HR & Accounts Manager</p>
                <p className="text-gray-400 text-sm max-w-xl">
                  Reach out directly to our HR department for technical queries, application issues, or recruitment status tracking.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0 w-full md:w-auto">
                <a 
                  href="tel:+918895865734" 
                  className="flex items-center justify-center gap-3 bg-white/10 hover:bg-brand-orange hover:text-white transition-all px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 88958 65734</span>
                </a>
                <a 
                  href="mailto:hr@shivomgroup.in" 
                  className="flex items-center justify-center gap-3 bg-white/10 hover:bg-brand-orange hover:text-white transition-all px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>hr@shivomgroup.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
        {selectedJob && (
          <form onSubmit={handleFormSubmit} className="flex flex-col h-full max-h-[90vh]">
            {/* Sticky Header */}
            <div className="p-6 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10 pr-12">
              <h2 className="text-2xl font-bold text-brand-navy">Apply for Position</h2>
              <p className="text-sm text-gray-500 mt-1">
                Role: <strong>{selectedJob.title}</strong>
              </p>
            </div>
            
            {/* Scrollable Body */}
            <div ref={scrollableBodyRef} className="overflow-y-auto p-6 flex-1 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-fullname-input" className="text-sm font-semibold text-brand-navy">Full Name *</label>
                  <Input 
                    id="career-fullname-input"
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    error={formErrors.fullName}
                    placeholder="Enter your full name"
                    required 
                    aria-required="true"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-email-input" className="text-sm font-semibold text-brand-navy">Email Address *</label>
                  <Input 
                    id="career-email-input"
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    error={formErrors.email}
                    placeholder="Enter email address"
                    required 
                    aria-required="true"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-phone-input" className="text-sm font-semibold text-brand-navy">Phone Number *</label>
                  <Input 
                    id="career-phone-input"
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    error={formErrors.phone}
                    placeholder="+91 99999 99999"
                    required 
                    aria-required="true"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-location-input" className="text-sm font-semibold text-brand-navy">Current Location *</label>
                  <Input 
                    id="career-location-input"
                    name="currentLocation" 
                    value={formData.currentLocation} 
                    onChange={handleInputChange} 
                    error={formErrors.currentLocation}
                    placeholder="e.g. Bhubaneswar, Odisha"
                    required 
                    aria-required="true"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-experience-input" className="text-sm font-semibold text-brand-navy">Years of Experience *</label>
                  <Input 
                    id="career-experience-input"
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleInputChange} 
                    error={formErrors.experience}
                    placeholder="e.g. 5 Years"
                    required 
                    aria-required="true"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="career-position-input" className="text-sm font-semibold text-brand-navy">Position Applying For *</label>
                  <Input 
                    id="career-position-input"
                    name="position" 
                    value={selectedJob.title} 
                    readOnly
                    disabled
                    className="bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="career-coverletter-input" className="text-sm font-semibold text-brand-navy">Cover Letter / Message</label>
                <Textarea 
                  id="career-coverletter-input"
                  name="coverLetter" 
                  value={formData.coverLetter} 
                  onChange={handleInputChange} 
                  placeholder="Explain your fit or interest in this role..."
                  rows={3}
                  disabled={isPending}
                />
              </div>

              {/* Drag and Drop Resume Upload Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-navy">Upload Resume *</label>
                
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={onButtonClick}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    dragActive 
                      ? 'border-brand-orange bg-brand-orange/5 scale-[1.02]' 
                      : 'border-gray-300 hover:border-brand-orange hover:bg-gray-50/50'
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isPending}
                  />
                  
                  {resumeFile ? (
                    <div className="flex items-center gap-3 w-full max-w-md bg-gray-50 border border-gray-200 p-3.5 rounded-lg shadow-sm">
                      <div className="p-2 bg-brand-navy/5 text-brand-navy rounded-lg">
                        <File className="w-6 h-6" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-bold text-brand-navy truncate">{resumeFile.name}</p>
                        <p className="text-xs text-gray-400">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={isPending}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 pointer-events-none">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto" />
                      <p className="text-sm font-semibold text-brand-navy">Drag & Drop or click to Browse File</p>
                      <p className="text-xs text-gray-400">PDF, DOC, DOCX up to 5 MB</p>
                    </div>
                  )}
                </div>

                {fileError && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-1 bg-red-50 p-2.5 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="p-6 pt-4 border-t border-gray-100 bg-white sticky bottom-0 z-10 flex justify-end gap-3">
              <Button 
                variant="secondary" 
                type="button" 
                onClick={() => setSelectedJob(null)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex items-center gap-2">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
