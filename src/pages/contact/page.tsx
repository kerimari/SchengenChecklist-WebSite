import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://readdy.ai/api/form/d6gtd52pd4a8ta1ledcg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: 'ri-mail-line',
      title: 'E-posta',
      content: 'schengenchecklist@gmail.com',
      link: 'mailto:schengenchecklist@gmail.com',
    },
    {
      icon: 'ri-phone-line',
      title: 'Telefon (TR)',
      content: '+90 505 032 7940',
      link: 'tel:+905050327940',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={true} />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 bg-gradient-to-br from-teal-50 via-white to-orange-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=modern%20minimalist%20geometric%20pattern%20with%20soft%20teal%20and%20orange%20abstract%20shapes%20on%20white%20background%20clean%20professional%20design%20subtle%20texture%20for%20contact%20page%20header%20contemporary%20style&width=1920&height=400&seq=contact-hero-bg&orientation=landscape')] opacity-5 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Vize başvuru sürecinizle ilgili sorularınız için buradayız. Size en kısa sürede dönüş yapacağız.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <i className={`${info.icon} text-xl`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-sm text-gray-600 break-all">{info.content}</p>
                  </div>
                </div>
              </a>
            ))}
            <a
              href="tel:+14482381524"
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <i className="ri-phone-line text-xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Yurtdışı</h3>
                  <p className="text-sm text-gray-600">+1 448 238 1524</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Mesaj Gönderin</h2>
                <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none resize-none"
                      placeholder="Mesajınızı buraya yazın... (Maksimum 500 karakter)"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.message.length}/500 karakter
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 sm:py-4 px-8 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </button>
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                      Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                      Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column - Info and FAQ */}
            <div className="space-y-6 sm:space-y-8">
              {/* Response Info */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">İletişim Bilgileri</h3>
                <div className="space-y-4 sm:space-y-5">
                  <a
                    href="mailto:schengenchecklist@gmail.com"
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-teal-50 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">E-posta</p>
                      <p className="text-xs sm:text-sm text-gray-600 break-all">schengenchecklist@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+905050327940"
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-teal-50 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <i className="ri-phone-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Türkiye</p>
                      <p className="text-xs sm:text-sm text-gray-600">+90 505 032 7940</p>
                    </div>
                  </a>
                  <a
                    href="tel:+14482381524"
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-teal-50 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <i className="ri-phone-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Yurtdışı</p>
                      <p className="text-xs sm:text-sm text-gray-600">+1 448 238 1524</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
                    <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl text-white flex-shrink-0">
                      <i className="ri-time-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Yanıt Süresi</p>
                      <p className="text-xs sm:text-sm text-gray-600">Genellikle 24 saat içinde</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sıkça Sorulan Sorular</h3>
                <p className="text-teal-50 text-sm sm:text-base mb-5 sm:mb-6">
                  Vize başvuru süreciyle ilgili detaylı bilgiler için SSS sayfamızı ziyaret edin.
                </p>
                <Link
                  to="/faq"
                  className="inline-flex items-center space-x-2 bg-white text-teal-600 font-semibold px-5 sm:px-6 py-3 rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-sm sm:text-base"
                >
                  <span>SSS Sayfası</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
