import { useState, useEffect } from 'react';

interface UpdateBannerProps {
  hasUpdate: boolean;
  onUpdate: () => void;
}

export default function UpdateBanner({ hasUpdate, onUpdate }: UpdateBannerProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (hasUpdate && !dismissed) {
      // Small delay so it doesn't flash on first load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasUpdate, dismissed]);

  const handleUpdate = () => {
    setVisible(false);
    onUpdate();
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm"
      role="alert"
      aria-live="polite"
    >
      <div
        className="bg-[#003399] text-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
        style={{
          animation: 'slideUpFade 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Icon */}
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <i className="ri-refresh-line text-lg" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">Yeni sürüm mevcut</p>
          <p className="text-xs text-white/70 mt-0.5 leading-tight">
            Güncel içerik için sayfayı yenileyin.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleUpdate}
            className="bg-white text-[#003399] text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer hover:bg-white/90 transition-colors"
          >
            Yenile
          </button>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-colors"
            aria-label="Kapat"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
