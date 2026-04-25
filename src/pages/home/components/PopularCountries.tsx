import { Link } from 'react-router-dom';
import CountryFlag from '../../../components/base/CountryFlag';
import LazyImage from '@/components/base/LazyImage';
import { countriesData } from '../../../mocks/countriesData';

const countries = [
  {
    id: 'germany',
    name: 'Almanya',
    flag: '🇩🇪',
    image:
      'https://readdy.ai/api/search-image?query=Brandenburg%20Gate%20Berlin%20Germany%20iconic%20landmark%20at%20sunset%20with%20golden%20hour%20lighting%20dramatic%20sky%20architectural%20photography%20travel%20destination%20European%20monument&width=400&height=300&seq=10&orientation=landscape',
    approvalRate: 78.0,
  },
  {
    id: 'france',
    name: 'Fransa',
    flag: '🇫🇷',
    image:
      'https://readdy.ai/api/search-image?query=Eiffel%20Tower%20Paris%20France%20iconic%20landmark%20at%20twilight%20with%20city%20lights%20romantic%20atmosphere%20architectural%20photography%20travel%20destination%20European%20monument&width=400&height=300&seq=11&orientation=landscape',
    approvalRate: 85.4,
  },
  {
    id: 'italy',
    name: 'İtalya',
    flag: '🇮🇹',
    image:
      'https://readdy.ai/api/search-image?query=Colosseum%20Rome%20Italy%20ancient%20Roman%20amphitheater%20at%20golden%20hour%20sunset%20dramatic%20lighting%20architectural%20photography%20travel%20destination%20historical%20monument&width=400&height=300&seq=12&orientation=landscape',
    approvalRate: 91.1,
  },
  {
    id: 'spain',
    name: 'İspanya',
    flag: '🇪🇸',
    image:
      'https://readdy.ai/api/search-image?query=Sagrada%20Familia%20Barcelona%20Spain%20Gaudi%20architecture%20at%20sunset%20golden%20hour%20dramatic%20sky%20architectural%20photography%20travel%20destination%20European%20landmark&width=400&height=300&seq=13&orientation=landscape',
    approvalRate: 86.5,
  },
];

function getDocumentCount(countryId: string): number {
  const country = countriesData.find(c => c.id === countryId);
  if (!country) return 0;
  let count = 0;
  Object.values(country.documents).forEach((category) => {
    count += category.items.length;
  });
  return count;
}

export default function PopularCountries() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popüler Ülkeler
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            En çok tercih edilen Schengen ülkeleri için gerekli evrak listelerine hızlıca
            ulaşın
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {countries.map((country) => (
            <Link
              key={country.id}
              to={`/country/${country.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <LazyImage
                  src={country.image}
                  alt={country.name}
                  loading="lazy"
                  aspectRatio="4/3"
                  width={400}
                  height={300}
                  objectFit="cover"
                  objectPosition="top"
                  placeholderColor="#e5e7eb"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2">
                  <span className="w-6 h-5 flex items-center justify-center">
                    <CountryFlag countryId={country.id} size="sm" />
                  </span>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {country.name}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-500">
                      Schengen Onay Oranı
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        country.approvalRate >= 85
                          ? 'text-emerald-600'
                          : country.approvalRate >= 70
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      %{country.approvalRate}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        country.approvalRate >= 85
                          ? 'bg-emerald-500'
                          : country.approvalRate >= 70
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${country.approvalRate}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    <i className="ri-file-list-3-line text-[#00bcd4]"></i>
                    <span>{getDocumentCount(country.id)} Evrak</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#00bcd4] font-medium group-hover:gap-3 transition-all text-sm sm:text-base">
                  <span>Evrakları İncele</span>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 text-[#1a237e] font-medium hover:text-[#00bcd4] transition-colors cursor-pointer text-sm sm:text-base"
          >
            Tüm Ülkeleri Görüntüle
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
