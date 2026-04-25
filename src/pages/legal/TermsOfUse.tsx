import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function TermsOfUsePage() {
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
              <i className="ri-file-text-line text-2xl text-teal-600"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Kullanım Koşulları</h1>
            <p className="text-gray-500 text-sm">Son güncelleme: 1 Ocak 2025</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-10">
              <p className="text-teal-800 text-sm leading-relaxed">
                Bu Kullanım Koşulları, <strong>Schengen Checklist</strong> web sitesini ve hizmetlerini kullanımınızı
                düzenleyen yasal bir sözleşmedir. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
            </div>

            {[
              {
                number: '01',
                title: 'Hizmetin Tanımı',
                content: 'Schengen Checklist, Türkiye\'den Schengen bölgesi ülkelerine vize başvurusu yapacak kişilere gerekli evrak listelerini, ipuçlarını ve rehberlik bilgilerini sunan bir bilgi platformudur. Sitemizde sunulan bilgiler genel bilgilendirme amaçlıdır ve resmi hukuki veya danışmanlık hizmeti niteliği taşımaz.',
              },
              {
                number: '02',
                title: 'Kullanıcı Yükümlülükleri',
                items: [
                  'Siteyi yalnızca yasal amaçlarla kullanmak',
                  'Başkalarının haklarını ihlal edecek içerik paylaşmamak',
                  'Sisteme zarar verecek yazılım veya kod göndermemek',
                  'Hesap bilgilerinizi üçüncü şahıslarla paylaşmamak',
                  'Doğru ve güncel bilgiler sağlamak',
                  'Siteyi ticari amaçlarla izinsiz kullanmamak',
                ],
              },
              {
                number: '03',
                title: 'Fikri Mülkiyet',
                content: 'Sitede yer alan tüm içerikler (metinler, görseller, logolar, tasarımlar) Schengen Checklist\'e aittir ve telif hakkı yasalarıyla korunmaktadır. İçeriklerin izinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.',
              },
              {
                number: '04',
                title: 'Sorumluluk Reddi',
                content: 'Sitemizde sunulan vize evrak listeleri ve bilgiler, en güncel resmi kaynaklara dayanılarak hazırlanmış olmakla birlikte, vize mevzuatı sık değişebilmektedir. Başvurunuzu yapmadan önce ilgili konsolosluk veya büyükelçiliğin resmi web sitesini kontrol etmenizi şiddetle tavsiye ederiz. Schengen Checklist, eksik veya güncel olmayan bilgilerden kaynaklanabilecek vize ret kararlarından sorumlu tutulamaz.',
              },
              {
                number: '05',
                title: 'Hesap Güvenliği',
                content: 'Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi güçlü tutmanızı ve kimseyle paylaşmamanızı öneririz. Hesabınızda yetkisiz bir erişim fark ettiğinizde derhal bizimle iletişime geçiniz. Hesabınızın kötüye kullanımından doğan zararlardan Schengen Checklist sorumlu tutulamaz.',
              },
              {
                number: '06',
                title: 'Hizmet Değişiklikleri',
                content: 'Schengen Checklist, önceden bildirimde bulunmaksızın hizmetlerini değiştirme, askıya alma veya sonlandırma hakkını saklı tutar. Ayrıca bu Kullanım Koşullarını herhangi bir zamanda güncelleme hakkına sahiptir. Güncellemeler sitede yayınlandığı andan itibaren geçerli olur.',
              },
              {
                number: '07',
                title: 'Uygulanacak Hukuk',
                content: 'Bu Kullanım Koşulları Türk hukukuna tabidir. Anlaşmazlık halinde Türkiye mahkemeleri yetkilidir.',
              },
              {
                number: '08',
                title: 'İletişim',
                content: 'Kullanım koşullarına ilişkin sorularınız için: schengenchecklist@gmail.com | +90 505 032 7940',
              },
            ].map((section, i) => (
              <div key={i} className="mb-6 flex gap-6">
                <div className="text-4xl font-black text-teal-100 leading-none select-none flex-shrink-0 w-12 text-right">
                  {section.number}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                  {section.content && (
                    <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <i className="ri-arrow-right-s-line text-teal-500 mt-0.5 flex-shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
