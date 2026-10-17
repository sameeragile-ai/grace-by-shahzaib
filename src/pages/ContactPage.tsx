import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { ContactSection } from '../sections/ContactSection';
import { WhyChooseUs } from '../sections/WhyChooseUs';

export const ContactPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-16">
        <ContactSection />
        <WhyChooseUs />
      </div>
    </PageTransition>
  );
};
