import { Link } from 'react-router-dom';

interface Tip {
  icon: string;
  title: string;
  text: string;
  type: 'warning' | 'info' | 'success';
}

interface ProgressSidebarProps {
  countryName: string;
  countryFlag?: string;
  totalDocuments: number;
  completedDocuments: number;
  processingTime?: string;
  visaFee?: string;
  validityPeriod?: string;
  consulates: string[];
  description?: string;
  tips?: Tip[];
  appointmentProvider?: string;
  appointmentUrl?: string;
  onDownloadPDF: () => void;
}

const tipTypeStyles = {
  warning: {
    bar: 'bg-amber-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-gray-600',
    dot: 'bg-amber-400',
  },
  info: {
    bar: 'bg-sky-400',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    titleColor: 'text-sky-900',
    textColor: 'text-gray-600',
    dot: 'bg-sky-400',
  },
  success: {
    bar: 'bg-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-900',
    textColor: 'text-gray-600',
    dot: 'bg-emerald-400',
  },
};

export default function ProgressSidebar({
  countryName,
  totalDocuments,
  completedDocuments,
  consulates,
  tips,
  appointmentProvider,
  appointmentUrl,
  onDownloadPDF,
}: ProgressSidebarProps) {
  // Guard against division by zero
  const safeTotal = totalDocuments > 0 ? totalDocuments : 1;
  const percentage = Math.round((completedDocuments / safeTotal) * 100);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const hasTips = Array.isArray(tips) && tips.length > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Başvuru İlerlemeniz
        </h3>

        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={percentage === 100 ? '#10b981' : '#00bcd4'}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">{percentage}%</span>
              {percentage === 100 && (
                <span className="text-xs text-emerald-500 font-medium mt-0.5">Tamamlandı!</span>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          <span className="font-semibold text-[#00bcd4]">{completedDocuments}</span> /{' '}
          {totalDocuments} Evrak Tamamlandı
        </p>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? '#10b981' : '#00bcd4',
            }}
          ></div>
        </div>

        <button
          onClick={onDownloadPDF}
          className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i className="ri-download-line"></i>
          <span>Kontrol Listesini İndir</span>
        </button>
      </div>

      {/* Appointment Card */}
      {appointmentUrl && appointmentProvider && (
        <div className="bg-gradient-to-br from-[#00bcd4] to-[#0097a7] rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <i className="ri-calendar-check-line text-xl sm:text-2xl"></i>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Randevu Al
          </h3>
          <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
            {appointmentProvider} üzerinden randevu alabilirsiniz
          </p>
          <a
            href={appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-[#00bcd4] py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
          >
            <i className="ri-external-link-line"></i>
            Randevu Sayfasına Git
          </a>
        </div>
      )}

      {/* Country‑Specific Tips */}
      {hasTips && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 flex items-center justify-center bg-amber-50 rounded-lg">
              <i className="ri-lightbulb-flash-line text-amber-500 text-base"></i>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{countryName} Notları</h3>
          </div>

          <div className="space-y-2.5">
            {tips!.map((tip, index) => {
              const s = tipTypeStyles[tip.type] ?? tipTypeStyles.info;
              return (
                <div key={index} className="flex items-start gap-3 group">
                  {/* Colored left bar */}
                  <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${s.bar}`}></div>
                  <div
                    className={`w-7 h-7 flex-shrink-0 flex items-center justify-center ${s.iconBg} rounded-lg mt-0.5`}
                  >
                    <i className={`${tip.icon} ${s.iconColor} text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${s.titleColor} leading-tight`}>
                      {tip.title}
                    </p>
                    <p className={`text-[11px] leading-relaxed ${s.textColor} mt-0.5`}>
                      {tip.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Consulate Info */}
      <div className="bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl p-4 sm:p-6 text-white">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
          <i className="ri-building-line text-xl sm:text-2xl"></i>
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Konsolosluk Bilgileri</h3>
        <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">{countryName} konsoloslukları:</p>
        <div className="space-y-2">
          {consulates.map((city, index) => (
            <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
              <i className="ri-map-pin-line text-[#00bcd4]"></i>
              <span>{city}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00bcd4]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
          <i className="ri-customer-service-2-line text-xl sm:text-2xl text-[#00bcd4]"></i>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
          Yardıma mı ihtiyacınız var?
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
          Uzmanlarımız sorularınızı yanıtlamak için hazır.
        </p>
        <Link
          to="/faq"
          className="w-full border-2 border-[#00bcd4] text-[#00bcd4] py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl font-medium hover:bg-[#00bcd4] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
        >
          <i className="ri-message-3-line"></i>
          SSS Sayfası
        </Link>
      </div>
    </div>
  );
}
