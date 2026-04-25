import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function KVKKPage() {
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
              <i className="ri-government-line text-2xl text-teal-600"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">KVKK Aydınlatma Metni</h1>
            <p className="text-gray-500 text-sm">6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
              <div className="flex gap-3">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-information-line text-amber-600 text-lg"></i>
                </div>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi uyarınca
                  <strong> Schengen Checklist</strong> tarafından veri sorumlusu sıfatıyla hazırlanmıştır.
                </p>
              </div>
            </div>

            {[
              {
                icon: 'ri-user-line',
                title: 'Veri Sorumlusu',
                content: 'Schengen Checklist, kişisel verilerinizin işlenmesinde veri sorumlusu sıfatını taşımaktadır. İletişim için: schengenchecklist@gmail.com | +90 505 032 7940',
              },
              {
                icon: 'ri-database-2-line',
                title: 'İşlenen Kişisel Veriler',
                items: [
                  'Ad, soyad (kimlik verisi)',
                  'E-posta adresi (iletişim verisi)',
                  'Telefon numarası (iletişim verisi)',
                  'IP adresi ve cihaz bilgileri (teknik veri)',
                  'Site kullanım ve gezinme verileri (davranışsal veri)',
                ],
              },
              {
                icon: 'ri-focus-3-line',
                title: 'Kişisel Verilerin İşlenme Amaçları',
                items: [
                  'Üyelik ve hesap yönetimi hizmetlerinin sunulması',
                  'Schengen vize bilgi hizmetlerinin sağlanması',
                  'Müşteri destek ve iletişim faaliyetlerinin yürütülmesi',
                  'Hizmet kalitesinin iyileştirilmesi ve analiz yapılması',
                  'Yasal yükümlülüklerin yerine getirilmesi',
                  'Güvenlik ve dolandırıcılık önleme faaliyetleri',
                ],
              },
              {
                icon: 'ri-scales-3-line',
                title: 'Hukuki Sebepler',
                items: [
                  'Sözleşmenin kurulması veya ifası (KVKK m.5/2-c)',
                  'Veri sorumlusunun meşru menfaati (KVKK m.5/2-f)',
                  'Açık rıza (KVKK m.5/1) — pazarlama faaliyetleri için',
                  'Kanunlarda açıkça öngörülmesi (KVKK m.5/2-a)',
                ],
              },
              {
                icon: 'ri-share-forward-line',
                title: 'Kişisel Verilerin Aktarımı',
                content: 'Kişisel verileriniz; hizmet alınan teknik altyapı sağlayıcıları, yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları ile açık rızanızın bulunduğu üçüncü taraflarla paylaşılabilir. Yurt dışına veri aktarımı, KVKK\'nın 9. maddesi kapsamında gerekli güvenceler sağlanarak gerçekleştirilmektedir.',
              },
              {
                icon: 'ri-time-line',
                title: 'Saklama Süreleri',
                content: 'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili yasal düzenlemelerde öngörülen süreler dahilinde saklanmaktadır. Üyelik iptali veya hizmet sona ermesi halinde veriler yasal saklama süreleri sonunda silinmekte, yok edilmekte veya anonim hale getirilmektedir.',
              },
              {
                icon: 'ri-shield-user-line',
                title: 'KVKK Kapsamındaki Haklarınız',
                items: [
                  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                  'İşlenmişse buna ilişkin bilgi talep etme',
                  'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
                  'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
                  'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
                  'Silinmesini veya yok edilmesini isteme',
                  'Otomatik sistemler vasıtasıyla aleyhinize sonuç doğurmasına itiraz etme',
                  'Kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme',
                ],
              },
              {
                icon: 'ri-mail-send-line',
                title: 'Başvuru Yöntemi',
                content: 'KVKK kapsamındaki haklarınızı kullanmak için schengenchecklist@gmail.com adresine kimliğinizi doğrulayan bilgilerle birlikte yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır.',
              },
            ].map((section, i) => (
              <div key={i} className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-xl flex-shrink-0">
                    <i className={`${section.icon} text-teal-600 text-lg`}></i>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                </div>
                {section.content && (
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                )}
                {section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <i className="ri-checkbox-circle-line text-teal-500 mt-0.5 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
