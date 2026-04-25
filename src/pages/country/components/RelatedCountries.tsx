
import { Link } from 'react-router-dom';
import CountryFlag from '../../../components/base/CountryFlag';

interface Country {
  id: string;
  name: string;
  flag: string;
  processingTime: string;
  documentCount: number;
}

interface RelatedCountriesProps {
  countries: Country[];
  currentCountryId: string;
}

export default function RelatedCountries({ countries, currentCountryId }: RelatedCountriesProps) {
  const filteredCountries = countries.filter(c => c.id !== currentCountryId).slice(0, 4);

  return (
    <section className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Diğer Ülkeler</h2>
          <Link
            to="/countries"
            className="text-[#00bcd4] font-medium hover:underline flex items-center gap-1 cursor-pointer text-sm sm:text-base"
          >
            Tümünü Gör
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredCountries.map(country => (
            <Link
              key={country.id}
              to={`/country/${country.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="h-32 sm:h-40 bg-gradient-to-br from-[#1a237e] to-[#283593] flex items-center justify-center">
                <div className="group-hover:scale-110 transition-transform">
                  <CountryFlag countryId={country.id} size="xl" className="rounded-md shadow-lg" />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{country.name}</h3>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-[#00bcd4]"></i>
                    <span>Süre: {country.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-file-list-3-line text-[#00bcd4]"></i>
                    <span>{country.documentCount} Evrak</span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-[#00bcd4] font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base">
                    Detayları Gör
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
