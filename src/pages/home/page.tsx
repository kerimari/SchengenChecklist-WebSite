import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Below-the-fold components loaded lazily
const PopularCountries = lazy(() => import('./components/PopularCountries'));
const Features = lazy(() => import('./components/Features'));
const VisaCalculator = lazy(() => import('./components/VisaCalculator'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

// Lightweight section skeleton
const SectionSkeleton = () => (
  <div className="py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="h-6 bg-gray-100 rounded-full w-48 mx-auto mb-4 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded-full w-72 mx-auto mb-10 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <PopularCountries />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <VisaCalculator />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-50" />}>
        <Footer />
      </Suspense>
    </div>
  );
}