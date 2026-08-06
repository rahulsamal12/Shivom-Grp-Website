import { PageBanner } from '@/components/layout/PageBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shivom Group',
  description: 'Privacy Policy and data protection details for Shivom Group.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title="Privacy Policy" breadcrumb="Home / Privacy Policy" />
      <div className="container mx-auto px-4 py-24 max-w-4xl prose prose-lg text-gray-600">
        <h2 className="text-3xl font-bold text-brand-navy mb-6">Introduction</h2>
        <p className="mb-6 leading-relaxed">
          At Shivom Group, accessible from shivomgroup.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Shivom Group and how we use it.
        </p>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Information We Collect</h2>
        <p className="mb-6 leading-relaxed">
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you to provide updates and other information relating to the website</li>
        </ul>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at info@shivomgroup.in.
        </p>
      </div>
    </>
  );
}
