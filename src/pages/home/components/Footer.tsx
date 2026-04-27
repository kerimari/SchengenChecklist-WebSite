import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Formspree entegrasyonu sağlandı
      const response = await fetch('https://formspree.io/f/xbdqbvje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Yeni Bülten Aboneliği',
          email: email
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#f5f7fa] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a237e] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 text-[#2a3f8e] text-[60px] sm:text-[80px] lg:text-[120px] font-bold opacity-50 leading-none select-none">
            SCHENGEN
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">Schengen Checklist</h3>
              <p className="text-[#b0bec5] text-sm leading-relaxed">
                Türkiye'den Schengen vizesi başvurusu yapacaklar için en kapsamlı evrak rehberi platformu.
              </p>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4 sm:mb-6">Hızlı Linkler</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link to="/countries" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Ülkeler
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    SSS
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4 sm:mb-6">Yasal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy-policy" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Gizlilik Sözleşmesi
                  </Link>
                </li>
                <li>
                  <Link to="/kvkk" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    KVKK
                  </Link>
                </li>
                <li>
                  <Link to="/aydinlatma-metni" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Aydınlatma Metni
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-sm text-[#b0bec5] hover:text-white transition-colors cursor-pointer">
                    Çerez Politikası
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-white text-base leading-relaxed mb-4 sm:mb-6">
                Vize güncellemeleri ve ipuçları için bültene abone olun.
              </p>
              <form id="newsletter-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-white/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:w-12 sm:h-12 w-full py-3 sm:py-0 bg-white rounded-lg sm:rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50 gap-2"
                >
                  <i className={`${isSubmitting ? 'ri-loader-4-line animate-spin' : 'ri-arrow-right-line'} text-[#1a237e] text-xl`}></i>
                  <span className="sm:hidden text-[#1a237e] text-sm font-medium">Abone Ol</span>
                </button>
              </form>
              {submitStatus === 'success' && (
                <p className="text-green-300 text-xs mt-2">✓ Bültene başarıyla abone oldunuz!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-300 text-xs mt-2">Bir hata oluştu, lütfen tekrar deneyin.</p>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex items-center justify-end">
              <p className="text-[#b0bec5] text-sm text-right">© 2026 Schengen Checklist. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}