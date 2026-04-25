
import CountryFlag from '../../../components/base/CountryFlag';
import LazyImage from '@/components/base/LazyImage';

interface CountryHeroProps {
  countryId: string;
  name: string;
  flag: string;
  heroImage: string;
  appointmentProvider: string;
  visaFee: string;
}

export default function CountryHero({ countryId, name, heroImage, appointmentProvider, visaFee }: CountryHeroProps) {
  return (
    <section className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
      <LazyImage
        src={heroImage}
        alt={name}
        loading="lazy"
        aspectRatio="16/9"
        width={1920}
        height={1080}
        objectFit="cover"
        objectPosition="center"
        placeholderColor="#1a237e"
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'brightness(0.7) contrast(1.05)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-10 lg:pb-12 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-16 h-12 flex items-center justify-center">
            <CountryFlag countryId={countryId} size="xl" className="rounded-md shadow-lg" />
          </span>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span
              className="bg-[#00bcd4] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            >
              <i className="ri-calendar-check-line mr-1"></i>
              Randevu: {appointmentProvider}
            </span>
            <span
              className="bg-black/40 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap border border-white/30"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            >
              <i className="ri-money-euro-circle-line mr-1"></i>
              Vize: {visaFee}
            </span>
          </div>
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}
        >
          {name} Vize Başvurusu
        </h1>
        <p
          className="text-white text-sm sm:text-base lg:text-lg font-medium"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
        >
          Schengen Vizesi Gerekli Evraklar ve Başvuru Rehberi
        </p>
      </div>
    </section>
  );
}