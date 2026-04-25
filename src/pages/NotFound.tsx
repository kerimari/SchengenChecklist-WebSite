import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 text-[180px] md:text-[260px] font-black text-gray-50 select-none pointer-events-none z-0 leading-none">
        404
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center bg-[#1a237e]/10 rounded-full mb-6">
          <i className="ri-map-pin-line text-4xl text-[#1a237e]"></i>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Sayfa Bulunamadı</h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0097a7] transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-home-4-line"></i>
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}