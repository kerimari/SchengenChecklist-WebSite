
export default function Features() {
  const features = [
    {
      icon: 'ri-file-list-3-line',
      title: 'Kapsamlı Evrak Listesi',
      description: '2026 yılı güncel gereksinimlerine göre hazırlanmış, detaylı evrak kontrol listeleri'
    },
    {
      icon: 'ri-checkbox-circle-line',
      title: 'Adım Adım Takip',
      description: 'Başvuru sürecinizi kolayca takip edin, eksik evraklarınızı görün'
    },
    {
      icon: 'ri-time-line',
      title: 'Güncel Bilgiler',
      description: 'Sürekli güncellenen vize gereksinimleri ve işlem süreleri'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Güvenli ve Ücretsiz',
      description: 'Verileriniz güvende, tüm özellikler tamamen ücretsiz'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a237e] mb-4 sm:mb-6">
            Neden Schengen Checklist?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Vize başvuru sürecinizi kolaylaştırmak için ihtiyacınız olan her şey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#e8eaf6] to-white p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#c5cae9]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00bcd4] rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <i className={`${feature.icon} text-2xl sm:text-3xl text-white`}></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a237e] mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
