import { lazy, Suspense } from 'react';
import { RouteObject } from "react-router-dom";

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import("../pages/home/page"));
const CountryPage = lazy(() => import("../pages/country/page"));
const CountriesPage = lazy(() => import("../pages/countries/page"));
const FAQPage = lazy(() => import("../pages/faq/page"));
const ContactPage = lazy(() => import("../pages/contact/page"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const ProfilePage = lazy(() => import("../pages/profile/page"));
const PrivacyPolicyPage = lazy(() => import("../pages/legal/PrivacyPolicy"));
const KVKKPage = lazy(() => import("../pages/legal/KVKK"));
const TermsOfUsePage = lazy(() => import("../pages/legal/TermsOfUse"));
const CookiePolicyPage = lazy(() => import("../pages/legal/CookiePolicy"));
const AydinlatmaMetniPage = lazy(() => import("../pages/legal/AydinlatmaMetni"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Minimal page-level loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-gray-400 font-medium">Yükleniyor...</span>
    </div>
  </div>
);

const routes: RouteObject[] = [
  { path: "/", element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
  { path: "/countries", element: <Suspense fallback={<PageLoader />}><CountriesPage /></Suspense> },
  { path: "/country/:countryId", element: <Suspense fallback={<PageLoader />}><CountryPage /></Suspense> },
  { path: "/faq", element: <Suspense fallback={<PageLoader />}><FAQPage /></Suspense> },
  { path: "/contact", element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
  { path: "/register", element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
  { path: "/login", element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
  { path: "/profile", element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
  { path: "/privacy-policy", element: <Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense> },
  { path: "/kvkk", element: <Suspense fallback={<PageLoader />}><KVKKPage /></Suspense> },
  { path: "/aydinlatma-metni", element: <Suspense fallback={<PageLoader />}><AydinlatmaMetniPage /></Suspense> },
  { path: "/terms-of-use", element: <Suspense fallback={<PageLoader />}><TermsOfUsePage /></Suspense> },
  { path: "/cookie-policy", element: <Suspense fallback={<PageLoader />}><CookiePolicyPage /></Suspense> },
  { path: "*", element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
];

export default routes;
