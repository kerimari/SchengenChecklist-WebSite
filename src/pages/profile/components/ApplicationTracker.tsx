import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { countriesData } from '@/mocks/countriesData';

interface CountryProgress {
  countryId: string;
  countryName: string;
  countryFlag: string;
  applicantType: string;
  completed: number;
  total: number;
  checkedItems: string[];
  lastUpdated: string | null;
}

const APPLICANT_TYPE_LABELS: Record<string, string> = {
  employee: 'Çalışan',
  student: 'Öğrenci',
  retired: 'Emekli',
  'self-employed': 'Serbest Meslek',
  all: 'Genel',
};

const APPLICANT_TYPES = ['employee', 'student', 'retired', 'self-employed'];

function getCountryProgress(
  countryId: string,
  applicantType: string,
  storageKey: string
): { completed: number; total: number; checkedItems: string[] } {
  const country = countriesData.find((c) => c.id === countryId);
  if (!country) return { completed: 0, total: 0, checkedItems: [] };

  const saved = localStorage.getItem(storageKey);
  const checkedSet = new Set<string>(saved ? JSON.parse(saved) : []);

  let total = 0;
  let completed = 0;
  const checkedItems: string[] = [];

  Object.entries(country.documents).forEach(([categoryKey, category]) => {
    category.items.forEach((item, index) => {
      const matchesType =
        applicantType === 'all' ||
        item.applicantType === 'all' ||
        item.applicantType === applicantType;
      if (matchesType) {
        total++;
        const key = `${categoryKey}-${index}`;
        if (checkedSet.has(key)) {
          completed++;
          checkedItems.push(item.name);
        }
      }
    });
  });

  return { completed, total, checkedItems };
}

function getProgressColor(pct: number) {
  if (pct >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  if (pct >= 50) return { bar: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
  if (pct > 0) return { bar: 'bg-[#00bcd4]', text: 'text-[#00bcd4]', bg: 'bg-[#00bcd4]/5', border: 'border-[#00bcd4]/20' };
  return { bar: 'bg-gray-200', text: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-100' };
}

export default function ApplicationTracker() {
  const { user } = useAuth();
  const [progressList, setProgressList] = useState<CountryProgress[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'active'>('active');

  useEffect(() => {
    const results: CountryProgress[] = [];

    countriesData.forEach((country) => {
      // Deduplicate by id (countriesData has duplicate italy)
      if (results.find((r) => r.countryId === country.id)) return;

      APPLICANT_TYPES.forEach((aType) => {
        const userKey = user
          ? `checklist_${user.email}_${country.id}_${aType}`
          : `checklist_guest_${country.id}_${aType}`;

        const saved = localStorage.getItem(userKey);
        if (!saved) return;

        const parsed: string[] = JSON.parse(saved);
        if (parsed.length === 0) return;

        const { completed, total, checkedItems } = getCountryProgress(country.id, aType, userKey);
        if (total === 0) return;

        results.push({
          countryId: country.id,
          countryName: country.name,
          countryFlag: country.flag,
          applicantType: aType,
          completed,
          total,
          checkedItems,
          lastUpdated: null,
        });
      });
    });

    // Sort by completion percentage desc
    results.sort((a, b) => b.completed / b.total - a.completed / a.total);
    setProgressList(results);
  }, [user]);

  const clearProgress = (countryId: string, applicantType: string) => {
    const userKey = user
      ? `checklist_${user.email}_${countryId}_${applicantType}`
      : `checklist_guest_${countryId}_${applicantType}`;
    localStorage.removeItem(userKey);
    setProgressList((prev) =>
      prev.filter((p) => !(p.countryId === countryId && p.applicantType === applicantType))
    );
  };

  const displayed = filterType === 'active'
    ? progressList.filter((p) => p.completed > 0)
    : progressList;

  const totalCountries = progressList.length;
  const completedCountries = progressList.filter((p) => p.completed === p.total && p.total > 0).length;
  const totalChecked = progressList.reduce((s, p) => s + p.completed, 0);
  const totalDocs = progressList.reduce((s, p) => s + p.total, 0);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#00bcd4]/10 rounded-xl">
              <i className="ri-map-pin-2-line text-[#00bcd4] text-xl"></i>
            </div>
            Başvuru Takibim
          </h2>
          <p className="text-sm text-gray-500 mt-1 ml-[52px]">
            Ülke evrak listelerindeki ilerlemeniz
          </p>
        </div>

        {progressList.length > 0 && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 self-start sm:self-auto">
            <button
              onClick={() => setFilterType('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'active'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tümü
            </button>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {progressList.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <div className="bg-[#00bcd4]/5 border border-[#00bcd4]/15 rounded-2xl p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-[#00bcd4]">{totalCountries}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Ülke Takip</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-emerald-600">{completedCountries}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Tamamlanan</p>
          </div>
          <div className="bg-[#1a237e]/5 border border-[#1a237e]/10 rounded-2xl p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-3xl font-bold text-[#1a237e]">{totalChecked}<span className="text-sm sm:text-base font-normal text-gray-400">/{totalDocs}</span></p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Toplam Evrak</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {progressList.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-full mx-auto mb-5">
            <i className="ri-file-list-3-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Henüz evrak işaretlemediniz</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
            Ülke sayfalarındaki evrak listelerinde tik attıkça ilerlemeniz burada görünecek.
          </p>
          <Link
            to="/countries"
            className="inline-flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0097a7] transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-global-line"></i>
            Ülkeleri İncele
          </Link>
        </div>
      )}

      {/* Progress Cards */}
      {displayed.length > 0 && (
        <div className="space-y-3">
          {displayed.map((item) => {
            const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
            const colors = getProgressColor(pct);
            const cardKey = `${item.countryId}-${item.applicantType}`;
            const isExpanded = expandedCard === cardKey;

            return (
              <div
                key={cardKey}
                className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${colors.border} ${colors.bg}`}
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Flag */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-xl border border-gray-100 flex-shrink-0 text-xl sm:text-2xl">
                      {item.countryFlag}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-sm sm:text-base">{item.countryName}</span>
                        <span className="text-[10px] sm:text-xs bg-white border border-gray-200 text-gray-500 px-1.5 sm:px-2 py-0.5 rounded-full">
                          {APPLICANT_TYPE_LABELS[item.applicantType] || item.applicantType}
                        </span>
                        {pct === 100 && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <i className="ri-check-line"></i> Tamamlandı
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-white/70 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold whitespace-nowrap ${colors.text}`}>
                          {item.completed}/{item.total}
                        </span>
                        <span className={`text-xs font-semibold whitespace-nowrap ${colors.text}`}>
                          %{pct}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        to={`/country/${item.countryId}`}
                        className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-[#00bcd4] hover:border-[#00bcd4] hover:text-white text-gray-500 transition-all cursor-pointer"
                        title="Ülke sayfasına git"
                      >
                        <i className="ri-external-link-line text-sm"></i>
                      </Link>
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
                        className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-all cursor-pointer"
                        title="Detayları göster"
                      >
                        <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-white/60 bg-white/50 px-4 sm:px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        İşaretlenen Evraklar ({item.checkedItems.length})
                      </p>
                      <button
                        onClick={() => clearProgress(item.countryId, item.applicantType)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line"></i>
                        Sıfırla
                      </button>
                    </div>

                    {item.checkedItems.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.checkedItems.map((docName, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                          >
                            <i className="ri-check-line text-emerald-500"></i>
                            {docName}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Henüz evrak işaretlenmemiş.</p>
                    )}

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {item.total - item.completed} evrak daha tamamlanacak
                      </p>
                      <Link
                        to={`/country/${item.countryId}`}
                        className="text-xs text-[#00bcd4] hover:text-[#0097a7] font-medium transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap"
                      >
                        Devam Et
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty filtered state */}
      {progressList.length > 0 && displayed.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-gray-400">Aktif ilerleme bulunamadı.</p>
          <button
            onClick={() => setFilterType('all')}
            className="mt-2 text-sm text-[#00bcd4] hover:underline cursor-pointer"
          >
            Tümünü göster
          </button>
        </div>
      )}
    </div>
  );
}
