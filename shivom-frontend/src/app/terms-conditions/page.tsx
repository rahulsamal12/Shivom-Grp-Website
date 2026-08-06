import { PageBanner } from '@/components/layout/PageBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Shivom Group',
  description: 'Terms and Conditions of service for Shivom Group.',
};

export default function TermsConditionsPage() {
  return (
    <>
      <PageBanner title="Terms & Conditions" breadcrumb="Home / Terms & Conditions" />
      <div className="container mx-auto px-4 py-24 max-w-4xl prose prose-lg text-gray-600">
        <h2 className="text-3xl font-bold text-brand-navy mb-6">Terms of Service</h2>
        <p className="mb-6 leading-relaxed">
          Welcome to Shivom Group! These terms and conditions outline the rules and regulations for the use of Shivom Group&apos;s Website, located at shivomgroup.in.
        </p>
        <p className="mb-6 leading-relaxed">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Shivom Group if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Cookies</h2>
        <p className="mb-6 leading-relaxed">
          We employ the use of cookies. By accessing Shivom Group, you agreed to use cookies in agreement with the Shivom Group&apos;s Privacy Policy. Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
        </p>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">License</h2>
        <p className="mb-6 leading-relaxed">
          Unless otherwise stated, Shivom Group and/or its licensors own the intellectual property rights for all material on Shivom Group. All intellectual property rights are reserved. You may access this from Shivom Group for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Disclaimer</h2>
        <p className="mb-6 leading-relaxed">
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury resulting from negligence, fraud or fraudulent misrepresentation.
        </p>
      </div>
    </>
  );
}
