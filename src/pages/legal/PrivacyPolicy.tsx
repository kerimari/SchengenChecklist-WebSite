import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function PrivacyPolicyPage() {
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
              <i className="ri-shield-check-line text-2xl text-teal-600"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Gizlilik Sözleşmesi</h1>
            <p className="text-gray-500 text-sm">Son güncelleme: 1 Ocak 2025</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-gray">

            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-10">
              <p className="text-teal-800 text-sm leading-relaxed">
                Bu Gizlilik Sözleşmesi, <strong>Schengen Checklist</strong> ("biz", "bizim") tarafından işletilen
                schengenchecklist.com web sitesini ("Site") kullandığınızda kişisel verilerinizin nasıl toplandığını,
                kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </div>

            {[
              {
                title: '1. Toplanan Bilgiler',
                content: `Sitemizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:

• **Kimlik Bilgileri:** Ad, soyad, e-posta adresi gibi kayıt sırasında sağladığınız bilgiler.
• **Kullanım Verileri:** Ziyaret ettiğiniz sayfalar, tıkladığınız bağlantılar, oturum süresi gibi site kullanım bilgileri.
• **Teknik Veriler:** IP adresi, tarayıcı türü, işletim sistemi ve cihaz bilgileri.
• **İletişim Verileri:** Bize gönderdiğiniz mesajlar ve iletişim formları aracılığıyla paylaştığınız bilgiler.`,
              },
              {
                title: '2. Bilgilerin Kullanım Amacı',
                content: `Topladığımız bilgileri şu amaçlarla kullanırız:

• Hizmetlerimizi sunmak ve geliştirmek
• Hesabınızı oluşturmak ve yönetmek
• Size özelleştirilmiş içerik ve öneriler sunmak
• Teknik destek ve müşteri hizmetleri sağlamak
• Yasal yükümlülüklerimizi yerine getirmek
• Güvenlik ve dolandırıcılık önleme`,
              },
              {
                title: '3. Bilgilerin Paylaşımı',
                content: `Kişisel verilerinizi üçüncü taraflarla satmaz veya kiralamayız. Verileriniz yalnızca şu durumlarda paylaşılabilir:

• Hizmet sağlayıcılarımızla (barındırma, analitik vb.) — yalnızca hizmet sunumu amacıyla
• Yasal zorunluluk halinde yetkili makamlarla
• Açık rızanızın bulunduğu durumlarda`,
              },
              {
                title: '4. Çerezler',
                content: `Sitemiz, deneyiminizi iyileştirmek amacıyla çerezler kullanmaktadır. Çerezler hakkında daha fazla bilgi için Çerez Politikamızı inceleyebilirsiniz. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler düzgün çalışmayabilir.`,
              },
              {
                title: '5. Veri Güvenliği',
                content: `Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz. SSL şifreleme, güvenli sunucular ve erişim kontrolleri gibi teknik tedbirler alınmaktadır. Ancak internet üzerinden hiçbir veri iletiminin %100 güvenli olmadığını belirtmek isteriz.`,
              },
              {
                title: '6. Haklarınız',
                content: `Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:

• Verilerinize erişim talep etme
• Yanlış verilerin düzeltilmesini isteme
• Verilerinizin silinmesini talep etme
• Veri işlemeye itiraz etme
• Veri taşınabilirliği talep etme

Bu haklarınızı kullanmak için schengenchecklist@gmail.com adresine e-posta gönderebilirsiniz.`,
              },
              {
                title: '7. Değişiklikler',
                content: `Bu Gizlilik Sözleşmesi zaman zaman güncellenebilir. Önemli değişiklikler olduğunda sizi e-posta veya site bildirimi aracılığıyla bilgilendireceğiz. Güncel sözleşmeyi düzenli olarak incelemenizi öneririz.`,
              },
              {
                title: '8. İletişim',
                content: `Gizlilik uygulamalarımız hakkında sorularınız için:\n\nE-posta: schengenchecklist@gmail.com\nTelefon: +90 505 032 7940`,
              },
            ].map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.content.split('\n').map((line, j) => (
                    <p key={j} className={line.startsWith('•') ? 'ml-4 mb-1' : 'mb-2'}>
                      {line.startsWith('**') ? (
                        <strong>{line.replace(/\*\*/g, '')}</strong>
                      ) : line}
                    </p>
                  ))}
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
