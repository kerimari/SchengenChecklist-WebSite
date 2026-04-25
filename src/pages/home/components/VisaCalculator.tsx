import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  targetCountry: string;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: string;
  bankBalance: string;
  previousSchengen: string;
  previousRejection: string;
  age: string;
  maritalStatus: string;
  passportType: string;
  otherCountriesVisited: string;
  travelFrequency: string;
}

interface ScoreBreakdown {
  label: string;
  score: number;
  max: number;
  icon: string;
  tip: string;
}

const countries = [
  { id: 'germany', name: 'Almanya', baseRate: 82 },
  { id: 'france', name: 'Fransa', baseRate: 79 },
  { id: 'italy', name: 'İtalya', baseRate: 76 },
  { id: 'spain', name: 'İspanya', baseRate: 78 },
  { id: 'netherlands', name: 'Hollanda', baseRate: 80 },
  { id: 'austria', name: 'Avusturya', baseRate: 81 },
  { id: 'belgium', name: 'Belçika', baseRate: 77 },
  { id: 'czech', name: 'Çekya', baseRate: 83 },
  { id: 'denmark', name: 'Danimarka', baseRate: 84 },
  { id: 'greece', name: 'Yunanistan', baseRate: 75 },
  { id: 'portugal', name: 'Portekiz', baseRate: 80 },
  { id: 'switzerland', name: 'İsviçre', baseRate: 78 },
  { id: 'sweden', name: 'İsveç', baseRate: 82 },
  { id: 'norway', name: 'Norveç', baseRate: 83 },
  { id: 'finland', name: 'Finlandiya', baseRate: 85 },
  { id: 'poland', name: 'Polonya', baseRate: 86 },
  { id: 'hungary', name: 'Macaristan', baseRate: 84 },
  { id: 'croatia', name: 'Hırvatistan', baseRate: 80 },
  { id: 'luxembourg', name: 'Lüksemburg', baseRate: 79 },
  { id: 'malta', name: 'Malta', baseRate: 77 },
];

const initialForm: FormData = {
  targetCountry: '',
  purpose: '',
  employmentStatus: '',
  monthlyIncome: '',
  bankBalance: '',
  previousSchengen: '',
  previousRejection: '',
  age: '',
  maritalStatus: '',
  passportType: '',
  otherCountriesVisited: '',
  travelFrequency: '',
};

function calculateScore(form: FormData): { total: number; breakdown: ScoreBreakdown[]; approvalChance: number } {
  const country = countries.find((c) => c.id === form.targetCountry);
  const baseRate = country ? country.baseRate : 78;
  const breakdown: ScoreBreakdown[] = [];

  // Mali durum
  let financialScore = 0;
  const income = parseInt(form.monthlyIncome, 10) || 0;
  const balance = parseInt(form.bankBalance, 10) || 0;
  if (income >= 30000) financialScore += 15;
  else if (income >= 20000) financialScore += 12;
  else if (income >= 10000) financialScore += 8;
  else if (income >= 5000) financialScore += 4;
  if (balance >= 100000) financialScore += 10;
  else if (balance >= 50000) financialScore += 7;
  else if (balance >= 20000) financialScore += 4;
  else if (balance >= 10000) financialScore += 2;
  breakdown.push({
    label: 'Mali Durum',
    score: Math.min(financialScore, 25),
    max: 25,
    icon: 'ri-money-dollar-circle-line',
    tip: income < 10000 ? 'Aylık gelirinizi artırın veya banka ekstrenizi güçlendirin' : 'Mali durumunuz iyi görünüyor',
  });

  // İstihdam durumu
  let employmentScore = 0;
  if (form.employmentStatus === 'employed') employmentScore = 20;
  else if (form.employmentStatus === 'self_employed') employmentScore = 16;
  else if (form.employmentStatus === 'student') employmentScore = 14;
  else if (form.employmentStatus === 'retired') employmentScore = 18;
  else if (form.employmentStatus === 'unemployed') employmentScore = 5;
  breakdown.push({
    label: 'İstihdam Durumu',
    score: employmentScore,
    max: 20,
    icon: 'ri-briefcase-line',
    tip: form.employmentStatus === 'unemployed' ? 'İşsizlik başvuruyu olumsuz etkiler, güçlü mali kanıt sunun' : 'İstihdam durumunuz olumlu',
  });

  // Geçmiş Schengen deneyimi
  let historyScore = 0;
  if (form.previousSchengen === 'multiple') historyScore = 20;
  else if (form.previousSchengen === 'once') historyScore = 14;
  else if (form.previousSchengen === 'never') historyScore = 8;
  if (form.previousRejection === 'yes') historyScore = Math.max(0, historyScore - 12);
  breakdown.push({
    label: 'Vize Geçmişi',
    score: historyScore,
    max: 20,
    icon: 'ri-passport-line',
    tip: form.previousRejection === 'yes'
      ? 'Önceki red kararı olumsuz etki yaratır, güçlü gerekçe hazırlayın'
      : form.previousSchengen === 'never'
      ? 'İlk başvuru olması nötr değerlendirilebilir'
      : 'Schengen geçmişiniz olumlu',
  });

  // Seyahat geçmişi & pasaport
  let travelScore = 0;
  if (form.passportType === 'biometric') travelScore += 5;
  else if (form.passportType === 'standard') travelScore += 3;

  if (form.otherCountriesVisited === 'many') travelScore += 10;
  else if (form.otherCountriesVisited === 'some') travelScore += 7;
  else if (form.otherCountriesVisited === 'few') travelScore += 4;
  else if (form.otherCountriesVisited === 'none') travelScore += 1;

  if (form.travelFrequency === 'frequent') travelScore += 5;
  else if (form.travelFrequency === 'occasional') travelScore += 3;
  else if (form.travelFrequency === 'rare') travelScore += 1;

  breakdown.push({
    label: 'Seyahat Geçmişi',
    score: Math.min(travelScore, 20),
    max: 20,
    icon: 'ri-flight-takeoff-line',
    tip: travelScore < 10
      ? 'Uluslararası seyahat geçmişiniz zayıf; diğer ülke vizelerini güçlendirici unsur olarak sunun'
      : 'Seyahat geçmişiniz olumlu bir profil oluşturuyor',
  });

  // Seyahat amacı
  let purposeScore = 0;
  if (form.purpose === 'tourism') purposeScore = 10;
  else if (form.purpose === 'business') purposeScore = 15;
  else if (form.purpose === 'education') purposeScore = 11;
  else if (form.purpose === 'family') purposeScore = 9;
  else if (form.purpose === 'medical') purposeScore = 10;
  breakdown.push({
    label: 'Seyahat Amacı',
    score: purposeScore,
    max: 15,
    icon: 'ri-map-pin-line',
    tip: 'Seyahat amacınızı destekleyen belgeler (davet mektubu, rezervasyon vb.) hazırlayın',
  });

  const totalScore = breakdown.reduce((sum, b) => sum + b.score, 0);
  const maxScore = breakdown.reduce((sum, b) => sum + b.max, 0);
  const scoreRatio = totalScore / maxScore;
  const approvalChance = Math.round(baseRate * 0.4 + scoreRatio * 60);

  return { total: totalScore, breakdown, approvalChance: Math.min(97, Math.max(15, approvalChance)) };
}

function CircularProgress({ value, size = 140 }: { value: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const offset = circumference - (animated / 100) * circumference;
  const color = value >= 75 ? '#22c55e' : value >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>%{animated}</span>
        <span className="text-xs text-gray-500 font-medium">Onay Şansı</span>
      </div>
    </div>
  );
}

export default function VisaCalculator() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [result, setResult] = useState<{ total: number; breakdown: ScoreBreakdown[]; approvalChance: number } | null>(null);
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);

  const isStep1Valid = !!(form.targetCountry && form.purpose && form.age && form.maritalStatus);
  const isStep2Valid = !!(form.employmentStatus && form.monthlyIncome && form.bankBalance);
  const isStep3Valid = !!(form.previousSchengen && form.previousRejection);
  const isStep4Valid = !!(form.passportType && form.otherCountriesVisited && form.travelFrequency);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setResult(calculateScore(form));
      setIsCalculating(false);
    }, 1200);
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setStep(1);
  };

  const getLabel = (value: number) => {
    if (value >= 80) return { text: 'Çok Yüksek', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (value >= 65) return { text: 'Yüksek', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    if (value >= 50) return { text: 'Orta', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (value >= 35) return { text: 'Düşük', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { text: 'Çok Düşük', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const selectedCountry = countries.find((c) => c.id === form.targetCountry);

  const selectClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-all bg-white cursor-pointer";
  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  const steps = [
    { num: 1, label: 'Temel Bilgiler' },
    { num: 2, label: 'Mali Durum' },
    { num: 3, label: 'Vize Geçmişi' },
    { num: 4, label: 'Seyahat Geçmişi' },
  ];

  const canGoToStep = (num: number) => {
    if (num <= step) return true;
    if (num === 2) return isStep1Valid;
    if (num === 3) return isStep1Valid && isStep2Valid;
    if (num === 4) return isStep1Valid && isStep2Valid && isStep3Valid;
    return false;
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8f8fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#00bcd4]/10 border border-[#00bcd4]/20 px-4 py-1.5 rounded-full mb-4">
            <i className="ri-calculator-line text-[#00bcd4] text-sm"></i>
            <span className="text-[#00bcd4] text-xs font-bold uppercase tracking-wider">Ücretsiz Araç</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a237e] mb-4">
            Vize Onay Şansı Hesaplayıcı
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Bilgilerinizi girin, yapay zeka destekli algoritmamız Schengen vize başvurunuzun tahmini onay şansını hesaplasın.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {!result ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Step indicator */}
              <div className="flex border-b border-gray-100">
                {steps.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => canGoToStep(s.num) && setStep(s.num)}
                    className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                      step === s.num
                        ? 'border-[#00bcd4] text-[#00bcd4] bg-[#00bcd4]/5'
                        : s.num < step
                        ? 'border-green-400 text-green-600 bg-green-50/50'
                        : 'border-transparent text-gray-400'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-1.5 ${
                      s.num < step ? 'bg-green-500 text-white' : step === s.num ? 'bg-[#00bcd4] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {s.num < step ? <i className="ri-check-line text-xs"></i> : s.num}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                {/* Step 1 — Temel Bilgiler */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-[#1a237e] mb-6 flex items-center gap-2">
                      <i className="ri-map-pin-2-line text-[#00bcd4]"></i>
                      Temel Seyahat Bilgileri
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Hedef Ülke</label>
                        <select className={selectClass} value={form.targetCountry} onChange={(e) => setForm({ ...form, targetCountry: e.target.value })}>
                          <option value="">Ülke seçin...</option>
                          {countries.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Seyahat Amacı</label>
                        <select className={selectClass} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>
                          <option value="">Amaç seçin...</option>
                          <option value="tourism">Turizm</option>
                          <option value="business">İş Seyahati</option>
                          <option value="education">Eğitim</option>
                          <option value="family">Aile Ziyareti</option>
                          <option value="medical">Sağlık</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Yaşınız</label>
                        <select className={selectClass} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}>
                          <option value="">Yaş aralığı seçin...</option>
                          <option value="18-25">18-25</option>
                          <option value="26-35">26-35</option>
                          <option value="36-50">36-50</option>
                          <option value="51-65">51-65</option>
                          <option value="65+">65+</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Medeni Durum</label>
                        <select className={selectClass} value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}>
                          <option value="">Seçin...</option>
                          <option value="single">Bekar</option>
                          <option value="married">Evli</option>
                          <option value="divorced">Boşanmış</option>
                          <option value="widowed">Dul</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => isStep1Valid && setStep(2)}
                        disabled={!isStep1Valid}
                        className="flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00acc1] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                      >
                        Devam Et
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 — Mali Durum */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-[#1a237e] mb-6 flex items-center gap-2">
                      <i className="ri-money-dollar-circle-line text-[#00bcd4]"></i>
                      Mali Durum ve İstihdam
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>İstihdam Durumu</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { value: 'employed', label: 'Çalışan', icon: 'ri-briefcase-line' },
                            { value: 'self_employed', label: 'Serbest Meslek', icon: 'ri-store-line' },
                            { value: 'student', label: 'Öğrenci', icon: 'ri-graduation-cap-line' },
                            { value: 'retired', label: 'Emekli', icon: 'ri-user-heart-line' },
                            { value: 'unemployed', label: 'İşsiz', icon: 'ri-user-unfollow-line' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, employmentStatus: opt.value })}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                                form.employmentStatus === opt.value
                                  ? 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <i className={`${opt.icon} text-base`}></i>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Aylık Net Gelir (₺)</label>
                        <input
                          type="number"
                          className={inputClass}
                          placeholder="Örn: 25000"
                          value={form.monthlyIncome}
                          onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                        />
                        <p className="text-xs text-gray-400 mt-1">Türk Lirası cinsinden</p>
                      </div>
                      <div>
                        <label className={labelClass}>Banka Hesap Bakiyesi (₺)</label>
                        <input
                          type="number"
                          className={inputClass}
                          placeholder="Örn: 50000"
                          value={form.bankBalance}
                          onChange={(e) => setForm({ ...form, bankBalance: e.target.value })}
                        />
                        <p className="text-xs text-gray-400 mt-1">Son 3 aylık ortalama</p>
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-arrow-left-line"></i>
                        Geri
                      </button>
                      <button
                        onClick={() => isStep2Valid && setStep(3)}
                        disabled={!isStep2Valid}
                        className="flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00acc1] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                      >
                        Devam Et
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — Vize Geçmişi */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-[#1a237e] mb-6 flex items-center gap-2">
                      <i className="ri-passport-line text-[#00bcd4]"></i>
                      Vize Geçmişi
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Daha önce Schengen vizesi aldınız mı?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { value: 'never', label: 'Hiç almadım', icon: 'ri-close-circle-line' },
                            { value: 'once', label: 'Bir kez aldım', icon: 'ri-checkbox-circle-line' },
                            { value: 'multiple', label: 'Birden fazla kez', icon: 'ri-star-line' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, previousSchengen: opt.value })}
                              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                                form.previousSchengen === opt.value
                                  ? 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <i className={`${opt.icon} text-base`}></i>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Daha önce vize reddi yaşadınız mı?</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'no', label: 'Hayır, hiç reddedilmedim', icon: 'ri-thumb-up-line' },
                            { value: 'yes', label: 'Evet, reddedildim', icon: 'ri-thumb-down-line' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, previousRejection: opt.value })}
                              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                                form.previousRejection === opt.value
                                  ? opt.value === 'yes'
                                    ? 'border-red-400 bg-red-50 text-red-600'
                                    : 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <i className={`${opt.icon} text-base`}></i>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-arrow-left-line"></i>
                        Geri
                      </button>
                      <button
                        onClick={() => isStep3Valid && setStep(4)}
                        disabled={!isStep3Valid}
                        className="flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00acc1] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                      >
                        Devam Et
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4 — Seyahat Geçmişi */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-[#1a237e] mb-2 flex items-center gap-2">
                      <i className="ri-flight-takeoff-line text-[#00bcd4]"></i>
                      Seyahat Geçmişi ve Pasaport
                    </h3>
                    <p className="text-sm text-gray-500 -mt-2">Uluslararası seyahat geçmişiniz konsolosluk değerlendirmesinde önemli bir etkendir.</p>

                    <div className="space-y-5">
                      {/* Pasaport tipi */}
                      <div>
                        <label className={labelClass}>Pasaport Türünüz</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { value: 'biometric', label: 'Biyometrik Pasaport (Çipli)', icon: 'ri-fingerprint-line', desc: 'Yeni nesil, çipli pasaport' },
                            { value: 'standard', label: 'Standart Pasaport', icon: 'ri-book-open-line', desc: 'Çipsiz eski tip pasaport' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, passportType: opt.value })}
                              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                form.passportType === opt.value
                                  ? 'border-[#00bcd4] bg-[#00bcd4]/8'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                form.passportType === opt.value ? 'bg-[#00bcd4] text-white' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <i className={`${opt.icon} text-sm`}></i>
                              </div>
                              <div>
                                <p className={`text-sm font-semibold ${form.passportType === opt.value ? 'text-[#00bcd4]' : 'text-gray-700'}`}>{opt.label}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Diğer ülkeler */}
                      <div>
                        <label className={labelClass}>Daha önce kaç farklı ülkeye gittiniz?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { value: 'none', label: 'Hiç gitmedim', icon: 'ri-map-line' },
                            { value: 'few', label: '1-3 ülke', icon: 'ri-map-2-line' },
                            { value: 'some', label: '4-10 ülke', icon: 'ri-earth-line' },
                            { value: 'many', label: '10+ ülke', icon: 'ri-global-line' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, otherCountriesVisited: opt.value })}
                              className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border text-xs font-medium transition-all cursor-pointer text-center ${
                                form.otherCountriesVisited === opt.value
                                  ? 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <i className={`${opt.icon} text-lg`}></i>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Seyahat sıklığı */}
                      <div>
                        <label className={labelClass}>Yurt dışı seyahat sıklığınız</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { value: 'rare', label: 'Nadiren (2 yılda bir veya daha az)', icon: 'ri-time-line' },
                            { value: 'occasional', label: 'Ara sıra (yılda 1-2 kez)', icon: 'ri-calendar-line' },
                            { value: 'frequent', label: 'Sık sık (yılda 3+ kez)', icon: 'ri-flight-takeoff-line' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setForm({ ...form, travelFrequency: opt.value })}
                              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                                form.travelFrequency === opt.value
                                  ? 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <i className={`${opt.icon} text-base flex-shrink-0`}></i>
                              <span className="text-xs leading-tight">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button onClick={() => setStep(3)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-arrow-left-line"></i>
                        Geri
                      </button>
                      <button
                        onClick={handleCalculate}
                        disabled={isCalculating || !isStep4Valid}
                        className="flex items-center gap-2 bg-[#1a237e] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#283593] transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCalculating ? (
                          <>
                            <i className="ri-loader-4-line animate-spin"></i>
                            Hesaplanıyor...
                          </>
                        ) : (
                          <>
                            <i className="ri-calculator-line"></i>
                            Onay Şansımı Hesapla
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Result */
            <div className="space-y-6">
              {/* Main result card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                  <div className="flex flex-col items-center gap-4 flex-shrink-0 lg:w-auto w-full">
                    <CircularProgress value={result.approvalChance} size={160} />
                    <div className={`px-4 py-1.5 rounded-full border text-sm font-bold ${getLabel(result.approvalChance).bg} ${getLabel(result.approvalChance).color} ${getLabel(result.approvalChance).border}`}>
                      {getLabel(result.approvalChance).text} Onay Şansı
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1a237e] mb-1">
                      {selectedCountry?.name} Vize Analizi
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Profiliniz analiz edildi. Bu sonuç istatistiksel bir tahmindir, kesin sonuç değildir.
                    </p>

                    {/* Score breakdown */}
                    <div className="space-y-3">
                      {result.breakdown.map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <i className={`${item.icon} text-[#00bcd4] text-sm`}></i>
                              <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-500">{item.score}/{item.max}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${(item.score / item.max) * 100}%`,
                                backgroundColor: item.score / item.max >= 0.7 ? '#22c55e' : item.score / item.max >= 0.5 ? '#f59e0b' : '#ef4444',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Country CTA — direkt ülke sayfasına */}
                    {selectedCountry && (
                      <div className="mt-6 pt-5 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-3">Başvurunuzu güçlendirmek için gerekli evrakları inceleyin:</p>
                        <Link
                          to={`/country/${selectedCountry.id}`}
                          className="inline-flex items-center gap-2 bg-[#1a237e] text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#283593] transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
                        >
                          <i className="ri-file-list-3-line"></i>
                          {selectedCountry.name} Evrak Listesini Gör
                          <i className="ri-arrow-right-line"></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips */}
              {(result.breakdown.some((b) => b.score / b.max < 0.75) || result.approvalChance >= 75) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.breakdown
                    .filter((b) => b.score / b.max < 0.75)
                    .map((item, i) => (
                      <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="ri-lightbulb-line text-amber-600 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-amber-700 mb-0.5">{item.label}</p>
                          <p className="text-xs text-amber-600">{item.tip}</p>
                        </div>
                      </div>
                    ))}
                  {result.approvalChance >= 75 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-checkbox-circle-line text-green-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-700 mb-0.5">Profiliniz Güçlü</p>
                        <p className="text-xs text-green-600">Evrak listenizi eksiksiz hazırlayın ve başvurunuzu yapın!</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Disclaimer + actions */}
              <div className="bg-[#f0f4ff] rounded-xl p-4 sm:p-5 flex flex-col gap-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong className="text-gray-700">Yasal Uyarı:</strong> Bu hesaplayıcı yalnızca bilgilendirme amaçlıdır. Gerçek vize kararı konsolosluk tarafından verilir ve birçok faktöre bağlıdır.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-refresh-line"></i>
                    Yeniden Hesapla
                  </button>
                  <Link
                    to="/countries"
                    className="flex items-center justify-center gap-2 bg-[#00bcd4] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00acc1] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Tüm Ülkeler
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
