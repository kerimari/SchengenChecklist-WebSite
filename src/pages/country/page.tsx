import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import CountryHero from './components/CountryHero';
import DocumentChecklist from './components/DocumentChecklist';
import ProgressSidebar from './components/ProgressSidebar';
import RelatedCountries from './components/RelatedCountries';
import DocumentUploadTracker from './components/DocumentUploadTracker';
import { countriesData, relatedCountries } from '../../mocks/countriesData';

type ApplicantType = 'employee' | 'student' | 'retired' | 'self-employed';

const applicantTypes: { value: ApplicantType; label: string; icon: string }[] = [
  { value: 'employee', label: 'Çalışan', icon: 'ri-briefcase-line' },
  { value: 'student', label: 'Öğrenci', icon: 'ri-graduation-cap-line' },
  { value: 'retired', label: 'Emekli', icon: 'ri-heart-pulse-line' },
  { value: 'self-employed', label: 'Serbest Meslek', icon: 'ri-store-2-line' },
];

export default function CountryPage() {
  const { countryId } = useParams<{ countryId: string }>();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [applicantType, setApplicantType] = useState<ApplicantType>('employee');
  const [completedDocuments, setCompletedDocuments] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const checklistRef = useRef<{ generatePDF: () => void }>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryId]);

  const country = countryId ? countriesData.find(c => c.id === countryId) : null;

  // Calculate filtered total for current applicant type
  const getFilteredTotal = useCallback(() => {
    if (!country) return 0;
    let total = 0;
    Object.values(country.documents).forEach((category) => {
      category.items.forEach((item) => {
        const matchesType =
          item.applicantType === 'all' ||
          item.applicantType === applicantType;
        if (matchesType) {
          total++;
        }
      });
    });
    return total;
  }, [country, applicantType]);

  // Recalculate total when applicant type or country changes
  useEffect(() => {
    const total = getFilteredTotal();
    setTotalDocuments(total);
    setCompletedDocuments(0);
  }, [applicantType, countryId, getFilteredTotal]);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <i className="ri-error-warning-line text-6xl text-gray-300 mb-4 block"></i>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ülke Bulunamadı</h1>
          <p className="text-gray-500 mb-6">Aradığınız ülke bilgisi mevcut değil.</p>
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#00a5b5] transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line"></i>
            Tüm Ülkelere Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    if (checklistRef.current) {
      checklistRef.current.generatePDF();
    }
  };

  const handleCheckChange = (completed: number, total: number) => {
    setCompletedDocuments(completed);
    setTotalDocuments(total);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />

      <CountryHero
        countryId={country.id}
        name={country.name}
        flag={country.flag}
        heroImage={country.heroImage}
        appointmentProvider={country.appointmentProvider}
        visaFee={country.visaFee}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Applicant Type Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-[#00bcd4]/10 rounded-lg">
              <i className="ri-user-settings-line text-[#00bcd4] text-lg"></i>
            </div>
            Başvuran Tipinizi Seçin
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Seçiminize göre sadece sizin için gerekli evraklar listelenecektir.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {applicantTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setApplicantType(type.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  applicantType === type.value
                    ? 'bg-[#00bcd4] text-white shadow-md shadow-[#00bcd4]/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${type.icon} text-base`}></i>
                </div>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <DocumentChecklist
              ref={checklistRef}
              documents={country.documents}
              applicantType={applicantType}
              countryId={country.id}
              countryName={country.name}
              countryFlag={country.flag}
              onCheckChange={handleCheckChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProgressSidebar
              countryName={country.name}
              countryFlag={country.flag}
              totalDocuments={totalDocuments}
              completedDocuments={completedDocuments}
              processingTime={country.processingTime}
              visaFee={country.visaFee}
              validityPeriod={country.validityPeriod}
              consulates={country.consulates}
              description={country.description}
              tips={country.tips}
              appointmentProvider={country.appointmentProvider}
              appointmentUrl={country.appointmentUrl}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </div>

        {/* Related Countries */}
        <div className="mt-12 lg:mt-16">
          <RelatedCountries countries={relatedCountries} currentCountryId={country.id} />
        </div>
      </div>

      <DocumentUploadTracker countryId={country.id} countryName={country.name} />

      <Footer />
    </div>
  );
}
