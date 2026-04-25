
import React from 'react';

interface Tip {
  icon: string;
  title: string;
  text: string;
  type: 'warning' | 'info' | 'success';
}

interface CountryTipsProps {
  tips: Tip[];
  countryName: string;
}

const typeStyles = {
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-700',
    badgeLabel: 'Dikkat',
  },
  info: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    titleColor: 'text-sky-900',
    textColor: 'text-sky-800',
    badge: 'bg-sky-100 text-sky-700',
    badgeLabel: 'Bilgi',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-900',
    textColor: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
    badgeLabel: 'İpucu',
  },
};

export default function CountryTips({ tips, countryName }: CountryTipsProps) {
  // Guard clause: render nothing if there are no tips
  if (!Array.isArray(tips) || tips.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-amber-50 rounded-lg">
          <i className="ri-lightbulb-flash-line text-amber-500 text-lg"></i>
        </div>
        {countryName} İçin Önemli Notlar
      </h3>
      <p className="text-sm text-gray-500 mb-4 ml-10">
        Başvuru sürecinizi kolaylaştıracak ipuçları ve uyarılar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, index) => {
          const style = typeStyles[tip.type];
          // Defensive programming: ensure style exists
          if (!style) {
            console.warn(`Unsupported tip type: ${tip.type}`);
            return null;
          }

          return (
            <div
              key={index}
              className={`${style.bg} ${style.border} border rounded-xl p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 flex-shrink-0 flex items-center justify-center ${style.iconBg} rounded-lg`}
                >
                  <i className={`${tip.icon} ${style.iconColor} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-sm font-semibold ${style.titleColor}`}>
                      {tip.title}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${style.badge} whitespace-nowrap`}
                    >
                      {style.badgeLabel}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${style.textColor}`}>
                    {tip.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
