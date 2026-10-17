import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Hero } from '../sections/Hero';
import { Marquee } from '../sections/Marquee';
import { CategoriesSection } from '../sections/CategoriesSection';
import { FeaturedProducts } from '../sections/FeaturedProducts';
import { AboutSection } from '../sections/AboutSection';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { Testimonials } from '../sections/Testimonials';
import { InstagramFeed } from '../sections/InstagramFeed';
import { ContactSection } from '../sections/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <InstagramFeed />
      <ContactSection />
    </PageTransition>
  );
};
