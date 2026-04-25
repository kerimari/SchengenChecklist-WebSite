import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import CountryFlag from '../../../components/base/CountryFlag';
import LazyImage from '@/components/base/LazyImage';

interface NavbarProps {
  scrolled: boolean;
}

const allCountries = [
  { id: 'germany', name: 'Almanya' },
  { id: 'france', name: 'Fransa' },
  { id: 'italy', name: 'İtalya' },
  { id: 'spain', name: 'İspanya' },
  { id: 'netherlands', name: 'Hollanda' },
  { id: 'austria', name: 'Avusturya' },
  { id: 'belgium', name: 'Belçika' },
  { id: 'czech', name: 'Çekya' },
  { id: 'denmark', name: 'Danimarka' },
  { id: 'estonia', name: 'Estonya' },
  { id: 'finland', name: 'Finlandiya' },
  { id: 'greece', name: 'Yunanistan' },
  { id: 'hungary', name: 'Macaristan' },
  { id: 'iceland', name: 'İzlanda' },
  { id: 'latvia', name: 'Letonya' },
  { id: 'liechtenstein', name: 'Lihtenştayn' },
  { id: 'lithuania', name: 'Litvanya' },
  { id: 'luxembourg', name: 'Lüksemburg' },
  { id: 'malta', name: 'Malta' },
  { id: 'norway', name: 'Norveç' },
  { id: 'poland', name: 'Polonya' },
  { id: 'portugal', name: 'Portekiz' },
  { id: 'slovakia', name: 'Slovakya' },
  { id: 'slovenia', name: 'Slovenya' },
  { id: 'sweden', name: 'İsveç' },
  { id: 'switzerland', name: 'İsviçre' },
  { id: 'croatia', name: 'Hırvatistan' },
  { id: 'bulgaria', name: 'Bulgaristan' },
  { id: 'romania', name: 'Romanya' },
];

export default function Navbar({ scrolled }: NavbarProps) {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const textClass = scrolled ? 'text-gray-700' : 'text-white';
  const hoverClass = 'hover:text-[#00bcd4]';

  // Dışarı tıklandığında kullanıcı menüsünü kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobil menü açıkken body scroll'u kilitle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCountriesOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    closeMobileMenu();
    navigate('/login');
  };

  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 z-10" onClick={closeMobileMenu}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <LazyImage
                  src="https://flagcdn.com/w40/eu.png"
                  alt="EU"
                  loading="eager"
                  objectFit="contain"
                  width={40}
                  height={30}
                  placeholderColor="transparent"
                />
              </div>
              <span className={`text-xl sm:text-2xl font-bold transition-colors ${scrolled || isMobileMenuOpen ? 'text-[#1a237e]' : 'text-white'}`}>
                Schengen Checklist
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`text-base font-medium transition-colors ${textClass} ${hoverClass} cursor-pointer`}>
                Ana Sayfa
              </Link>

              {/* Countries Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCountriesOpen(true)}
                onMouseLeave={() => setIsCountriesOpen(false)}
              >
                <button
                  className={`text-base font-medium transition-colors ${hoverClass} flex items-center gap-1 cursor-pointer ${textClass}`}
                >
                  Ülkeler
                  <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${isCountriesOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isCountriesOpen && (
                  <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl py-2 w-56 border border-gray-100" style={{ marginTop: '-2px', paddingTop: '10px' }}>
                    <div style={{ position: 'absolute', top: '-8px', left: 0, right: 0, height: '10px' }} />
                    <Link
                      to="/countries"
                      className="flex items-center gap-2 px-4 py-2.5 text-[#1a237e] font-semibold hover:bg-[#e8eaf6] transition-colors cursor-pointer border-b border-gray-100 mb-1"
                      onClick={() => setIsCountriesOpen(false)}
                    >
                      <i className="ri-global-line text-base"></i>
                      Tüm Ülkeler
                    </Link>
                    <div className="max-h-72 overflow-y-auto">
                      {allCountries.map((country) => (
                        <Link
                          key={country.id}
                          to={`/country/${country.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00bcd4] transition-colors cursor-pointer text-sm"
                          onClick={() => setIsCountriesOpen(false)}
                        >
                          <CountryFlag countryId={country.id} size="sm" />
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/faq" className={`text-base font-medium transition-colors ${textClass} ${hoverClass} cursor-pointer`}>
                SSS
              </Link>

              <Link to="/contact" className={`text-base font-medium transition-colors ${textClass} ${hoverClass} cursor-pointer`}>
                İletişim
              </Link>

              {/* Auth Area */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#00bcd4] flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:bg-[#0097a7] transition-colors">
                      {getInitials()}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${textClass} ${hoverClass}`}>
                      {user.firstName}
                    </span>
                    <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''} ${textClass}`}></i>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl py-2 w-52 border border-gray-100 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#00bcd4] transition-colors cursor-pointer text-sm"
                      >
                        <i className="ri-user-line text-base"></i>
                        Profilim
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-sm"
                      >
                        <i className="ri-logout-box-r-line text-base"></i>
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className={`text-sm font-semibold transition-colors ${textClass} ${hoverClass} cursor-pointer whitespace-nowrap`}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#00bcd4] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0097a7] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                scrolled || isMobileMenuOpen
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu — navbar'ın hemen altında, tam genişlikte */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ borderTop: isMobileMenuOpen ? '1px solid #f0f0f0' : 'none' }}
        >
          <div className="bg-white px-4 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">

            {/* Mobile User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-[#00bcd4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {getInitials()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate text-gray-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs truncate text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
            >
              Ana Sayfa
            </Link>

            {/* Mobile Countries */}
            <div>
              <button
                onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                className="w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer text-gray-700 hover:bg-gray-50"
              >
                Ülkeler
                <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${isMobileCountriesOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isMobileCountriesOpen && (
                <div className="ml-4 mt-1 rounded-lg p-2 bg-gray-50">
                  <Link
                    to="/countries"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold mb-1 border-b border-gray-200 pb-2 text-[#1a237e] hover:bg-gray-100"
                  >
                    <i className="ri-global-line"></i> Tüm Ülkeler
                  </Link>
                  <div className="max-h-52 overflow-y-auto space-y-0.5">
                    {allCountries.map((country) => (
                      <Link
                        key={country.id}
                        to={`/country/${country.id}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <CountryFlag countryId={country.id} size="sm" />
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/faq"
              onClick={closeMobileMenu}
              className="px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
            >
              SSS
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
            >
              İletişim
            </Link>

            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
                >
                  <i className="ri-user-line"></i>
                  Profilim
                </Link>
                <button
                  onClick={handleLogout}
                  className="mx-4 mt-2 flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-logout-box-r-line"></i>
                  Çıkış Yap
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mx-4 mt-3 mb-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-center px-5 py-3 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer whitespace-nowrap border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4] hover:text-white"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="text-center bg-[#00bcd4] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#0097a7] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
