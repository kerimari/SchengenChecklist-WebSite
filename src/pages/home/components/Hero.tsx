
import { Link } from 'react-router-dom';
import LazyImage from '@/components/base/LazyImage';

export default function Hero() {
  return (
    <div className="relative w-full min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] h-[70vh] lg:h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        {/* LCP image — eager so it loads immediately */}
        <LazyImage
          src="https://readdy.ai/api/search-image?query=Aerial%20view%20of%20European%20cityscape%20at%20dusk%20with%20historic%20architecture%20and%20warm%20golden%20lights%2C%20romantic%20European%20travel%20destination%2C%20cobblestone%20streets%2C%20cathedral%20spires%2C%20terracotta%20rooftops%2C%20cinematic%20atmosphere%2C%20professional%20travel%20photography%2C%20dark%20moody%20evening%20sky%2C%20city%20lights%20glowing&width=1920&height=1080&seq=hero002&orientation=landscape"
          alt="Avrupa Şehir Manzarası"
          loading="eager"
          fetchPriority="high"
          aspectRatio="16/9"
          width={1920}
          height={1080}
          objectFit="cover"
          objectPosition="center"
          placeholderColor="#0d1b2a"
          style={{ position: 'absolute', inset: 0, filter: 'brightness(0.75) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/95 via-[#0d1b2a]/80 to-[#0d1b2a]/55"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 sm:pt-20">
        <div className="w-full max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20">
            <i className="ri-global-line text-[#00bcd4] text-sm sm:text-base"></i>
            <span className="text-white text-xs sm:text-sm font-semibold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>29 Schengen Ülkesi</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
          >
            Schengen Vizesi İçin Gerekli Tüm Evraklar Tek Platformda
          </h1>
          <p
            className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed mb-6 sm:mb-10 max-w-xl font-medium"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
          >
            Hangi ülke için hangi belgelere ihtiyacınız var? Evrakları nereden temin edebilirsiniz? Tüm cevaplar burada.
          </p>
          <Link
            to="/countries"
            className="inline-flex items-center gap-3 sm:gap-4 bg-[#00bcd4] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#00acc1] transition-all duration-300 hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer"
            style={{ boxShadow: '0 8px 32px rgba(0,188,212,0.4), 0 2px 8px rgba(0,0,0,0.3)' }}
          >
            Ülke Seçin ve Başlayın
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
              <i className="ri-arrow-right-line text-[#00bcd4] text-lg sm:text-xl"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}