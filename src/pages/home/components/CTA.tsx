import { Link } from 'react-router-dom';
import LazyImage from '@/components/base/LazyImage';

export default function CTA() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] h-[50vh] overflow-hidden my-12 sm:my-16 lg:my-24">
      <div className="absolute inset-0">
        <LazyImage
          src="https://readdy.ai/api/search-image?query=Wide%20panoramic%20view%20of%20beautiful%20European%20city%20skyline%2C%20Paris%20or%20Rome%20architecture%2C%20golden%20hour%20lighting%2C%20professional%20travel%20photography%2C%20horizontal%20composition%2C%20clear%20sky%2C%20iconic%20buildings%2C%20elegant%20urban%20landscape%2C%20high%20quality%20tourism%20photo&width=1920&height=800&seq=cta001&orientation=landscape"
          alt="Avrupa Şehir Manzarası"
          loading="lazy"
          aspectRatio="21/9"
          width={1920}
          height={800}
          objectFit="cover"
          objectPosition="center"
          placeholderColor="#1a1a2e"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-10 sm:py-12 lg:py-16">
        <div className="w-full lg:w-1/3">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">Hemen Başlayın</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8">
          <Link
            to="/countries"
            className="inline-flex items-center gap-3 sm:gap-4 bg-white text-[#1a237e] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer"
          >
            Ülke Seçin
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
              <i className="ri-arrow-right-line text-white text-lg sm:text-xl"></i>
            </div>
          </Link>

          <div className="w-full sm:w-1/2 lg:w-1/3 text-left sm:text-right">
            <p className="text-base sm:text-xl lg:text-2xl text-white font-light leading-relaxed">
              Vize başvurunuz için gerekli tüm evrakları öğrenin. Ücretsiz ve detaylı rehberler.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
