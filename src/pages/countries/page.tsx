import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { allSchengenCountries, countriesData } from '../../mocks/countriesData';
import CountryFlag from '../../components/base/CountryFlag';

type RegionType = 'Tümü' | 'Batı Avrupa' | 'Orta Avrupa' | 'Kuzey Avrupa' | 'Güney Avrupa';

export default function CountriesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('Tümü');
  const [showPopularOnly, setShowPopularOnly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const regions: RegionType[] = ['Tümü', 'Batı Avrupa', 'Orta Avrupa', 'Kuzey Avrupa', 'Güney Avrupa'];

  const filteredCountries = allSchengenCountries.filter(country => {
    const query = searchQuery.toLocaleLowerCase('tr-TR');
    const matchesSearch = country.name.toLocaleLowerCase('tr-TR').includes(query) ||
                         country.capital.toLocaleLowerCase('tr-TR').includes(query);
    const matchesRegion = selectedRegion === 'Tümü' || country.region === selectedRegion;
    const matchesPopular = !showPopularOnly || country.popular;
    return matchesSearch && matchesRegion && matchesPopular;
  });

  const hasDetailPage = (countryId: string) => {
    return countriesData.some(c => c.id === countryId);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/countries-bg.jpg')`,
            filter: 'brightness(0.7) contrast(1.05)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/90 via-[#0d1b2a]/75 to-[#0d1b2a]/95"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20">
            <i className="ri-global-line text-[#00bcd4] text-sm sm:text-base"></i>
            <span className="text-white text-xs sm:text-sm font-semibold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>29 Schengen Ülkesi</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)' }}
          >
            Tüm Schengen Ülkeleri
          </h1>
          <p
            className="text-base sm:text-lg lg:text-xl text-white max-w-2xl font-medium"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >
            Schengen bölgesindeki tüm ülkelerin vize gereksinimleri ve evrak listelerini keşfedin
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search */}
            <div className="relative w-full">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                placeholder="Ülke veya başkent ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]/20 transition-all"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Region Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedRegion === region
                        ? 'bg-[#1a237e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Popular Toggle */}
              <button
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  showPopularOnly
                    ? 'bg-[#00bcd4] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className="ri-star-line"></i>
                Popüler
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#00bcd4] transition-colors cursor-pointer">
              Ana Sayfa
            </Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-[#00bcd4] font-medium">Ülkeler</span>
          </div>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {filteredCountries.length} Ülke Listeleniyor
          </h2>
          <div className="text-xs sm:text-sm text-gray-500">
            {showPopularOnly && <span className="text-[#00bcd4]">Sadece popüler ülkeler</span>}
          </div>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <i className="ri-search-line text-5xl sm:text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-gray-600 text-sm sm:text-base">Arama kriterlerinize uygun ülke bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCountries.map((country) => (
              <Link
                key={country.id}
                to={hasDetailPage(country.id) ? `/country/${country.id}` : '/countries'}
                className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  hasDetailPage(country.id) 
                    ? 'hover:shadow-xl hover:border-[#00bcd4]/30 cursor-pointer hover:-translate-y-1' 
                    : 'opacity-80 cursor-default'
                }`}
                onClick={!hasDetailPage(country.id) ? (e) => e.preventDefault() : undefined}
              >
                {/* Country Header */}
                <div className="relative h-28 sm:h-32 bg-gradient-to-br from-[#1a237e] to-[#283593] p-4 sm:p-6 flex items-start">
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    {country.popular && (
                      <span className="bg-[#00bcd4] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium">
                        Popüler
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <CountryFlag countryId={country.id} size="xl" className="rounded-md shadow-md" />
                  </div>
                </div>

                {/* Country Info */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#1a237e] transition-colors">
                      {country.name}
                    </h3>
                    {hasDetailPage(country.id) && (
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#00bcd4] group-hover:translate-x-1 transition-all"></i>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <i className="ri-map-pin-line text-[#00bcd4]"></i>
                      <span>{country.capital}</span>
                    </div>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <span className="text-[10px] sm:text-xs bg-gray-100 px-2 py-0.5 rounded-full">{country.region}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Vize Ücreti</div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{country.visaFee}</div>
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Evrak Sayısı</div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{country.documentCount}</div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-20">
                          <div
                            className={`h-full rounded-full ${
                              (country.approvalRate ?? 0) >= 85
                                ? 'bg-emerald-500'
                                : (country.approvalRate ?? 0) >= 70
                                ? 'bg-amber-400'
                                : 'bg-rose-400'
                            }`}
                            style={{ width: `${country.approvalRate ?? 0}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${
                          (country.approvalRate ?? 0) >= 85
                            ? 'text-emerald-600'
                            : (country.approvalRate ?? 0) >= 70
                            ? 'text-amber-500'
                            : 'text-rose-500'
                        }`}>
                          %{country.approvalRate ?? '-'}
                        </span>
                      </div>
                      {hasDetailPage(country.id) ? (
                        <span className="text-[10px] sm:text-xs text-[#00bcd4] font-medium">Detayları Gör</span>
                      ) : (
                        <span className="text-[10px] sm:text-xs text-gray-400">Yakında</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Schengen Vizesi Hakkında</h2>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Schengen vizesi, 26 Avrupa ülkesini kapsayan ortak bir vize sistemidir. Bu vize ile 180 günlük süre içinde 
                toplam 90 gün boyunca Schengen bölgesinde seyahat edebilirsiniz.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00bcd4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-[#00bcd4] text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Tek Vize, 26 Ülke</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Bir Schengen vizesi ile tüm üye ülkelere seyahat edebilirsiniz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00bcd4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-[#00bcd4] text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Standart Evraklar</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Temel evrak gereksinimleri tüm ülkeler için benzerdir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00bcd4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-[#00bcd4] text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">90 Gün Kalış Hakkı</h4>
                    <p className="text-xs sm:text-sm text-gray-600">180 günlük süre içinde toplam 90 gün kalabilirsiniz.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#f8fafc] to-[#e8f4f8] rounded-2xl p-5 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Genel Evrak Listesi</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { icon: 'ri-passport-line', text: 'Geçerli Pasaport' },
                  { icon: 'ri-file-text-line', text: 'Vize Başvuru Formu' },
                  { icon: 'ri-camera-line', text: 'Biyometrik Fotoğraf' },
                  { icon: 'ri-bank-card-line', text: 'Banka Hesap Dökümü' },
                  { icon: 'ri-plane-line', text: 'Uçak Rezervasyonu' },
                  { icon: 'ri-hotel-line', text: 'Otel Rezervasyonu' },
                  { icon: 'ri-shield-check-line', text: 'Seyahat Sigortası' },
                  { icon: 'ri-briefcase-line', text: 'İşveren Yazısı / SGK Dökümü' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1a237e]/10 rounded-lg flex items-center justify-center">
                      <i className={`${item.icon} text-[#1a237e] text-sm sm:text-base`}></i>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Vize Başvurunuza Başlayın</h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">
            Gitmek istediğiniz ülkeyi seçin ve gerekli evrakları adım adım hazırlayın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/faq"
              className="w-full sm:w-auto bg-white text-[#1a237e] px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              Sıkça Sorulan Sorular
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto bg-[#00bcd4] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-[#00a5b5] transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}