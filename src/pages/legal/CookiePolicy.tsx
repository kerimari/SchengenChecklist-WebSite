import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function CookiePolicyPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 bg-gradient-to-br from-teal-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-2xl mb-6">
              <i className="ri-settings-3-line text-2xl text-teal-600"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Çerez Politikası</h1>
            <p className="text-gray-500 text-sm">Son güncelleme: 1 Ocak 2025</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-10">
              <p className="text-teal-800 text-sm leading-relaxed">
                Bu Çerez Politikası, <strong>Schengen Checklist</strong> web sitesinin çerezleri nasıl kullandığını
                açıklamaktadır. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş sayılırsınız.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Çerez Nedir?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır. Oturum bilgilerinizi
                hatırlamak, tercihlerinizi kaydetmek ve site kullanımını analiz etmek amacıyla kullanılırlar.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kullandığımız Çerez Türleri</h2>
              <div className="space-y-4">
                {[
                  {
                    type: 'Zorunlu Çerezler',
                    color: 'teal',
                    badge: 'Her Zaman Aktif',
                    desc: 'Sitenin temel işlevleri için gereklidir. Oturum yönetimi, güvenlik ve temel navigasyon bu çerezler olmadan çalışmaz. Devre dışı bırakılamaz.',
                    examples: ['Oturum çerezi (session)', 'CSRF koruma çerezi', 'Kimlik doğrulama çerezi'],
                  },
                  {
                    type: 'Analitik Çerezler',
                    color: 'orange',
                    badge: 'İsteğe Bağlı',
                    desc: 'Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur. Bu veriler anonim olarak toplanır ve hizmet kalitemizi artırmak için kullanılır.',
                    examples: ['Sayfa görüntüleme sayısı', 'Ziyaret süresi', 'Trafik kaynağı'],
                  },
                  {
                    type: 'Tercih Çerezleri',
                    color: 'gray',
                    badge: 'İsteğe Bağlı',
                    desc: 'Dil tercihi, tema seçimi gibi kişisel ayarlarınızı hatırlamak için kullanılır. Bir sonraki ziyaretinizde deneyiminizi kişiselleştirir.',
                    examples: ['Dil tercihi', 'Tema ayarı', 'Son görüntülenen ülkeler'],
                  },
                ].map((cookie, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{cookie.type}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        cookie.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                        cookie.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {cookie.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{cookie.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {cookie.examples.map((ex, j) => (
                        <span key={j} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Popüler tarayıcılar için ayar sayfaları:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Google Chrome', 'Mozilla Firefox', 'Safari', 'Microsoft Edge'].map((browser, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                    <i className="ri-global-line text-teal-500 text-xl mb-1 block"></i>
                    <p className="text-xs text-gray-600 font-medium">{browser}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                Not: Zorunlu çerezleri devre dışı bırakmanız durumunda site bazı özellikler düzgün çalışmayabilir.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">İletişim</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Çerez politikamız hakkında sorularınız için{' '}
                <a href="mailto:schengenchecklist@gmail.com" className="text-teal-600 hover:underline font-medium">
                  schengenchecklist@gmail.com
                </a>{' '}
                adresine ulaşabilirsiniz.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
