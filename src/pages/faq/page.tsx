import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: 'genel',
    title: 'Genel Sorular',
    icon: 'ri-question-line',
    items: [
      {
        question: 'Schengen vizesi nedir?',
        answer: 'Schengen vizesi, Schengen Bölgesi\'ne dahil 29 Avrupa ülkesine seyahat etmenizi sağlayan bir belgedir. Bu vize ile 180 günlük süre içinde en fazla 90 gün bu ülkelerde kalabilirsiniz. Schengen vizesi turizm, iş, aile ziyareti veya kısa süreli eğitim amaçlı seyahatler için uygundur.'
      },
      {
        question: 'Schengen Bölgesi\'ne hangi ülkeler dahildir?',
        answer: 'Schengen Bölgesi\'ne Almanya, Fransa, İtalya, İspanya, Hollanda, Avusturya, Belçika, Çekya, Danimarka, Estonya, Finlandiya, Yunanistan, Macaristan, İzlanda, Letonya, Litvanya, Lüksemburg, Malta, Norveç, Polonya, Portekiz, Slovakya, Slovenya, İsveç, İsviçre, Hırvatistan, Lihtenştayn, Bulgaristan ve Romanya dahildir.'
      },
      {
        question: 'Vize başvurusu ne kadar sürede sonuçlanır?',
        answer: 'Standart vize başvuruları genellikle 15 iş günü içinde sonuçlanır. Ancak yoğun dönemlerde bu süre 30 güne kadar uzayabilir. Acil durumlarda bazı konsolosluklar hızlandırılmış işlem seçeneği sunmaktadır. Seyahat tarihinizden en az 4-6 hafta önce başvuru yapmanızı öneririz.'
      },
      {
        question: 'Vize başvurusu için randevu nasıl alınır?',
        answer: 'Vize başvurusu için ilgili ülkenin konsolosluğu veya vize başvuru merkezi (VFS Global, iDATA vb.) üzerinden online randevu alabilirsiniz. Randevu almadan önce tüm evraklarınızı hazırlamanız önerilir. Yoğun dönemlerde randevu bulmak zorlaşabileceğinden erken hareket etmeniz önemlidir.'
      },
      {
        question: 'Schengen vizesi ile transit geçiş yapabilir miyim?',
        answer: 'Evet, geçerli bir Schengen vizesi ile bölge içindeki tüm ülkelerden transit geçiş yapabilirsiniz. Ancak sadece havalimanı transit geçişi için ayrı bir "Havalimanı Transit Vizesi (A tipi)" de mevcuttur. Eğer havalimanı dışına çıkmayacaksanız ve ülkeniz transit vize gerektiriyorsa bu vize yeterlidir.'
      },
      {
        question: 'Schengen vizesi ile İngiltere\'ye gidebilir miyim?',
        answer: 'Hayır, İngiltere Schengen Bölgesi\'ne dahil değildir. İngiltere\'ye seyahat etmek için ayrı bir İngiliz vizesi almanız gerekmektedir. Aynı şekilde İrlanda da Schengen Bölgesi dışındadır ve ayrı vize gerektirir.'
      },
      {
        question: 'Vize başvurusunu ne kadar önceden yapmalıyım?',
        answer: 'Vize başvurusunu seyahat tarihinizden en az 15 gün, en fazla 6 ay önce yapabilirsiniz. Yoğun dönemlerde (yaz ayları, bayram tatilleri) randevu bulmak zorlaşabileceğinden 2-3 ay öncesinden başvuru sürecini başlatmanız önerilir.'
      }
    ]
  },
  {
    id: 'evraklar',
    title: 'Gerekli Evraklar',
    icon: 'ri-file-list-3-line',
    items: [
      {
        question: 'Vize başvurusu için hangi evraklar gereklidir?',
        answer: 'Temel evraklar: Geçerli pasaport (en az 6 ay geçerlilik), biyometrik fotoğraf, doldurulmuş başvuru formu, seyahat sağlık sigortası, uçak bileti rezervasyonu, otel rezervasyonu, mali durum belgesi (banka hesap dökümü, maaş bordrosu), işveren yazısı veya öğrenci belgesi. Ülkeye göre ek evraklar istenebilir.'
      },
      {
        question: 'Banka hesap dökümü ne kadar süreyi kapsamalı?',
        answer: 'Banka hesap dökümünüz son 3-6 ayı kapsamalıdır. Hesabınızda seyahat sürenize uygun yeterli bakiye bulunmalıdır. Genel kural olarak günlük en az 50-100 Euro karşılığı bakiye önerilir. Düzenli gelir akışı gösteren bir hesap dökümü başvurunuzu güçlendirir.'
      },
      {
        question: 'Seyahat sigortası neleri kapsamalı?',
        answer: 'Schengen vizesi için seyahat sigortanız minimum 30.000 Euro teminat kapsamında olmalıdır. Sigorta, tüm Schengen ülkelerinde geçerli olmalı ve acil tıbbi masraflar, hastaneye yatış, tıbbi tahliye ve cenaze nakli masraflarını kapsamalıdır. Sigorta süresi seyahat tarihlerinizi tam olarak kapsamalıdır.'
      },
      {
        question: 'Davetiye mektubu ne zaman gereklidir?',
        answer: 'Aile veya arkadaş ziyareti için başvuruyorsanız, davet eden kişiden davetiye mektubu gereklidir. Mektupta davet edenin kimlik bilgileri, adresi, sizinle ilişkisi, kalış süresi ve konaklama detayları yer almalıdır. İş seyahati için ise davet eden şirketten resmi davet mektubu istenir.'
      },
      {
        question: 'Fotoğraf özellikleri nelerdir?',
        answer: 'Schengen vizesi için biyometrik fotoğraf gereklidir: 35x45 mm boyutunda, son 6 ay içinde çekilmiş, beyaz veya açık gri arka plan, yüz net görünür, gözlük veya başlık yok (dini sebepler hariç), doğal ifade. Fotoğrafçınıza "biyometrik vize fotoğrafı" istediğinizi belirtin.'
      },
      {
        question: 'Pasaportumun geçerlilik süresi ne kadar olmalı?',
        answer: 'Pasaportunuzun planlanan dönüş tarihinden itibaren en az 3 ay (bazı ülkeler 6 ay) geçerli olması ve en az 2 boş vize sayfası bulunması gerekmektedir. Eski tip pasaportlar kabul edilmez; biyometrik (çipli) pasaport zorunludur.'
      },
      {
        question: 'İşveren yazısında neler bulunmalı?',
        answer: 'İşveren yazısında şirket antetli kağıdı üzerinde: adınız, pozisyonunuz, işe başlama tarihiniz, maaşınız, izin tarihleri, işe dönüş garantisi ve şirketin iletişim bilgileri yer almalıdır. Yazı güncel tarihli, imzalı ve kaşeli olmalıdır.'
      },
      {
        question: 'Seyahat planı (itinerary) nasıl hazırlanmalı?',
        answer: 'Seyahat planınızda gün gün nerede kalacağınız, hangi şehirleri ziyaret edeceğiniz, ulaşım detayları ve konaklama bilgileri yer almalıdır. Birden fazla ülke ziyaret edecekseniz her ülkedeki kalış süresini ve geçiş tarihlerini belirtin. Detaylı bir plan başvurunuzu güçlendirir.'
      }
    ]
  },
  {
    id: 'ucretler',
    title: 'Ücretler ve Ödemeler',
    icon: 'ri-money-euro-circle-line',
    items: [
      {
        question: 'Schengen vizesi ücreti ne kadardır?',
        answer: 'Standart Schengen vize ücreti yetişkinler için 90 Euro\'dur. 6-12 yaş arası çocuklar için 45 Euro, 6 yaş altı çocuklar için ücretsizdir. Bu ücretlere ek olarak vize başvuru merkezi hizmet bedeli (yaklaşık 25-35 Euro) eklenebilir. Ücretler değişiklik gösterebilir.'
      },
      {
        question: 'Vize ücreti iade edilir mi?',
        answer: 'Vize başvurusu reddedilse bile ödenen vize ücreti iade edilmez. Bu nedenle başvuru yapmadan önce tüm evraklarınızın eksiksiz olduğundan emin olun. Vize başvuru merkezi hizmet bedeli de iade kapsamında değildir.'
      },
      {
        question: 'Ödeme nasıl yapılır?',
        answer: 'Vize ücreti genellikle başvuru merkezinde nakit veya kredi kartı ile ödenir. Bazı merkezler sadece belirli ödeme yöntemlerini kabul edebilir. Randevu almadan önce kabul edilen ödeme yöntemlerini kontrol etmenizi öneririz. Online ödeme seçeneği sunan merkezler de mevcuttur.'
      },
      {
        question: 'VFS Global veya iDATA hizmet bedeli ne kadar?',
        answer: 'Vize başvuru merkezlerinin hizmet bedeli ülkeye ve merkeze göre değişmekle birlikte genellikle 25-40 Euro arasındadır. Bu ücret vize ücretine ek olarak alınır. Bazı merkezler SMS bilgilendirme, kurye hizmeti gibi ek ücretli hizmetler de sunmaktadır.'
      },
      {
        question: 'Çoklu giriş vizesi daha mı pahalıdır?',
        answer: 'Hayır, tek girişli ve çoklu girişli Schengen vizesi ücreti aynıdır (90 Euro). Çoklu giriş vizesi verilip verilmeyeceği konsolosluk tarafından başvurunuza göre değerlendirilir. Daha önce düzenli seyahat geçmişiniz varsa çoklu giriş vizesi alma şansınız artar.'
      }
    ]
  },
  {
    id: 'red',
    title: 'Ret ve İtiraz',
    icon: 'ri-close-circle-line',
    items: [
      {
        question: 'Vize başvurum neden reddedilebilir?',
        answer: 'Yaygın ret sebepleri: Eksik veya hatalı evraklar, yetersiz mali durum, seyahat amacının belirsizliği, daha önce vize ihlali, yetersiz seyahat sigortası, ülkeye dönüş garantisinin zayıf olması, sahte veya yanıltıcı belge sunulması. Her ret kararında gerekçe yazılı olarak bildirilir.'
      },
      {
        question: 'Ret kararına itiraz edebilir miyim?',
        answer: 'Evet, ret kararına itiraz hakkınız vardır. İtiraz süresi ülkeye göre değişmekle birlikte genellikle 15-30 gün arasındadır. İtiraz dilekçenizde ret gerekçelerine karşı açıklama ve destekleyici belgeler sunmalısınız. İtiraz süreci ücretsiz veya düşük ücretli olabilir.'
      },
      {
        question: 'Ret sonrası tekrar başvurabilir miyim?',
        answer: 'Evet, ret sonrası yeni bir başvuru yapabilirsiniz. Ancak aynı eksikliklerle başvurursanız yine reddedilme ihtimaliniz yüksektir. Ret gerekçelerini dikkatlice inceleyin, eksiklikleri giderin ve güçlü bir dosya ile tekrar başvurun. İki başvuru arasında belirli bir bekleme süresi zorunluluğu yoktur.'
      },
      {
        question: 'Ret kararı gelecekteki başvurularımı etkiler mi?',
        answer: 'Bir ret kararı otomatik olarak gelecekteki başvurularınızın reddedileceği anlamına gelmez. Ancak ret geçmişiniz kayıt altındadır ve yeni başvurularda değerlendirilir. Ret nedenlerini giderip güçlü bir dosya ile başvurursanız onay alma şansınız yüksektir.'
      },
      {
        question: 'Sahte belge kullanmanın sonuçları nelerdir?',
        answer: 'Sahte veya yanıltıcı belge sunmak çok ciddi sonuçlar doğurur: Başvurunuz anında reddedilir, Schengen Bilgi Sistemi\'ne (SIS) kaydedilirsiniz, 1-5 yıl arası giriş yasağı uygulanabilir ve yasal işlem başlatılabilir. Kesinlikle gerçek ve doğru belgeler sunmanız gerekmektedir.'
      }
    ]
  },
  {
    id: 'seyahat',
    title: 'Seyahat ve Konaklama',
    icon: 'ri-plane-line',
    items: [
      {
        question: 'Uçak bileti kesin mi olmalı?',
        answer: 'Vize başvurusu için kesin bilet yerine rezervasyon yeterlidir. Vize onaylanmadan kesin bilet almanız önerilmez çünkü ret durumunda bilet ücretini kaybedebilirsiniz. Birçok havayolu şirketi ücretsiz iptal edilebilir rezervasyon seçeneği sunmaktadır.'
      },
      {
        question: 'Otel rezervasyonu zorunlu mu?',
        answer: 'Evet, konaklama belgesi zorunludur. Otel rezervasyonu, Airbnb rezervasyonu veya davet edeninin konaklama taahhüdü kabul edilir. Rezervasyonun tüm seyahat süresini kapsaması ve adınıza düzenlenmiş olması gerekir. Ücretsiz iptal edilebilir rezervasyonlar tercih edilebilir.'
      },
      {
        question: 'Birden fazla ülkeyi ziyaret edebilir miyim?',
        answer: 'Evet, Schengen vizesi ile bölgedeki tüm ülkeleri ziyaret edebilirsiniz. Ancak vize başvurusunu en uzun süre kalacağınız veya ilk giriş yapacağınız ülkenin konsolosluğuna yapmalısınız. Seyahat planınızı başvuru sırasında detaylı olarak belirtmeniz gerekir.'
      },
      {
        question: '90 günlük süre nasıl hesaplanır?',
        answer: 'Schengen Bölgesi\'nde 180 günlük dönem içinde en fazla 90 gün kalabilirsiniz. Bu süre, bölgeye her girişinizde hesaplanır. Örneğin, 30 gün kaldıktan sonra çıkış yaparsanız, kalan 150 gün içinde 60 gün daha kalma hakkınız olur. Online hesaplayıcılar ile sürenizi takip edebilirsiniz.'
      },
      {
        question: 'Schengen bölgesinde araç kiralayabilir miyim?',
        answer: 'Evet, geçerli bir Schengen vizesi ve uluslararası ehliyet ile araç kiralayabilirsiniz. Türk ehliyeti bazı ülkelerde kabul edilse de uluslararası sürücü belgesi almanız önerilir. Kiralık araçla sınır geçişi yapacaksanız kiralama şirketini önceden bilgilendirmeniz gerekir.'
      },
      {
        question: 'Vize sürem dolmadan ülkeden çıkmazsam ne olur?',
        answer: 'Vize süresini aşmak (overstay) ciddi sonuçlar doğurur: Para cezası, sınır dışı edilme, gelecekteki vize başvurularının reddedilmesi ve Schengen Bilgi Sistemi\'ne kayıt. Sürenizi mutlaka takip edin ve zamanında çıkış yapın. Zorunlu hallerde konsolosluğa başvurarak vize uzatma talep edebilirsiniz.'
      }
    ]
  },
  {
    id: 'ozel',
    title: 'Özel Durumlar',
    icon: 'ri-user-star-line',
    items: [
      {
        question: 'Çocuklar için ek evrak gerekli mi?',
        answer: '18 yaş altı çocuklar için ek evraklar: Doğum belgesi, velayet belgesi (boşanmış ebeveynler için), ebeveyn onay mektubu (çocuk tek ebeveyn veya üçüncü kişi ile seyahat ediyorsa), okul izin belgesi. Her iki ebeveynin de noter onaylı muvafakatnamesi gerekebilir.'
      },
      {
        question: 'Emekliler için farklı evraklar var mı?',
        answer: 'Emekliler için: Emekli maaş belgesi, SGK döküm belgesi, varsa ek gelir belgeleri (kira, faiz vb.), banka hesap dökümü. İşveren yazısı yerine emeklilik belgesi sunulur. Yeterli mali güvence gösterilmesi önemlidir.'
      },
      {
        question: 'Öğrenciler nasıl başvurmalı?',
        answer: 'Öğrenciler için: Öğrenci belgesi, veli muvafakatnamesi (18 yaş altı için), sponsor mektubu (masrafları karşılayan kişiden), sponsorun mali belgeleri. Erasmus veya değişim programları için ek kabul mektubu gerekebilir.'
      },
      {
        question: 'Serbest meslek sahipleri için ne gerekli?',
        answer: 'Serbest meslek sahipleri için: Vergi levhası, son yıla ait vergi beyannamesi, ticaret sicil kaydı, şirket kuruluş belgeleri, son 6 aylık banka hesap dökümü, varsa müşteri sözleşmeleri veya faturalar. İşin sürekliliğini ve gelir düzeyini kanıtlayan belgeler önemlidir.'
      },
      {
        question: 'Ev hanımları/ev kadınları nasıl başvurmalı?',
        answer: 'Ev hanımları için eşin mali belgeleri (maaş bordrosu, banka dökümü), evlilik cüzdanı fotokopisi, eşin sponsor mektubu ve eşin işveren yazısı gereklidir. Eşin gelir düzeyinin seyahat masraflarını karşılayacak seviyede olduğunu göstermek önemlidir.'
      },
      {
        question: 'Engelli bireyler için kolaylık var mı?',
        answer: 'Bazı konsolosluklar ve vize başvuru merkezleri engelli bireyler için öncelikli randevu ve erişilebilir hizmet sunmaktadır. Başvuru sırasında durumunuzu belirterek özel düzenleme talep edebilirsiniz. Refakatçi ile seyahat edecekseniz refakatçi için de ayrı vize başvurusu yapılmalıdır.'
      },
      {
        question: 'Çifte vatandaşlar nasıl başvurmalı?',
        answer: 'Çifte vatandaşlık durumunda, Schengen vizesi başvurusunu Türk pasaportunuz ile yapmanız gerekmektedir. Diğer vatandaşlığınız bir AB/Schengen ülkesine aitse zaten vize muafiyetiniz olabilir. Başvuru sırasında her iki vatandaşlığınızı da beyan etmeniz gerekmektedir.'
      }
    ]
  },
  {
    id: 'vize-turleri',
    title: 'Vize Türleri',
    icon: 'ri-passport-line',
    items: [
      {
        question: 'Schengen vize türleri nelerdir?',
        answer: 'Başlıca Schengen vize türleri: A Tipi (Havalimanı Transit), C Tipi (Kısa Süreli - en yaygın), D Tipi (Ulusal/Uzun Süreli). C tipi vize turizm, iş, aile ziyareti gibi amaçlarla 90 güne kadar kalış için verilir. D tipi vize ise eğitim, çalışma gibi uzun süreli kalışlar içindir.'
      },
      {
        question: 'Çoklu giriş vizesi (multiple entry) nedir?',
        answer: 'Çoklu giriş vizesi, vize geçerlilik süresi boyunca Schengen Bölgesi\'ne birden fazla giriş-çıkış yapmanıza olanak tanır. 180 gün içinde toplam 90 gün kuralı yine geçerlidir. Düzenli seyahat geçmişi olan başvurucular için 1, 3 veya 5 yıllık çoklu giriş vizesi verilebilir.'
      },
      {
        question: 'İş vizesi ile turist vizesi arasındaki fark nedir?',
        answer: 'Her ikisi de C tipi Schengen vizesidir ancak seyahat amacı farklıdır. İş vizesi için davet eden şirketten resmi davet mektubu, toplantı programı ve şirketinizin yazısı gerekir. Turist vizesi için otel rezervasyonu ve seyahat planı yeterlidir. Her iki vize türü de aynı kalış süresine tabidir.'
      },
      {
        question: 'Uzun süreli (D tipi) vize nasıl alınır?',
        answer: 'D tipi vize, 90 günden uzun kalışlar için gereklidir (eğitim, çalışma, aile birleşimi vb.). Başvuru doğrudan ilgili ülkenin konsolosluğuna yapılır. Gerekli evraklar amaca göre değişir ve işlem süresi C tipi vizeye göre daha uzundur. Kabul mektubu veya çalışma izni gibi ek belgeler istenir.'
      }
    ]
  },
  {
    id: 'randevu',
    title: 'Randevu ve Başvuru Süreci',
    icon: 'ri-calendar-check-line',
    items: [
      {
        question: 'Randevu bulamıyorum, ne yapmalıyım?',
        answer: 'Yoğun dönemlerde randevu bulmak zorlaşabilir. Şu yöntemleri deneyin: Sabah erken saatlerde sistemi kontrol edin, iptal olan randevuları yakalamak için sık sık bakın, farklı şehirlerdeki başvuru merkezlerini deneyin. Bazı ülkeler için farklı vize başvuru merkezleri (VFS, iDATA, BLS, TLS) üzerinden de randevu alabilirsiniz.'
      },
      {
        question: 'Biyometrik veri (parmak izi) vermek zorunlu mu?',
        answer: 'Evet, 12 yaş üstü tüm başvurucuların biyometrik verilerini (10 parmak izi ve dijital fotoğraf) vermesi zorunludur. Bu veriler 5 yıl boyunca VIS (Vize Bilgi Sistemi) sisteminde saklanır. Son 5 yıl içinde biyometrik veri verdiyseniz tekrar vermeniz gerekmeyebilir.'
      },
      {
        question: 'Başvuru merkezine gitmeden online başvuru yapabilir miyim?',
        answer: 'Başvuru formunu online doldurabilirsiniz ancak evrak teslimi ve biyometrik veri kaydı için başvuru merkezine bizzat gitmeniz gerekmektedir. Bazı ülkeler belirli koşullarda posta ile başvuru kabul edebilir, ancak bu yaygın bir uygulama değildir.'
      },
      {
        question: 'Başvuru sırasında mülakat yapılır mı?',
        answer: 'Bazı konsolosluklar başvuru sırasında kısa bir mülakat yapabilir. Mülakatta seyahat amacınız, kalış süreniz, mali durumunuz ve dönüş planınız sorulabilir. Sakin ve tutarlı cevaplar verin, evraklarınızla uyumlu bilgiler paylaşın. Her başvuruda mülakat yapılmaz.'
      },
      {
        question: 'Başvurumu takip edebilir miyim?',
        answer: 'Evet, çoğu vize başvuru merkezi online takip sistemi sunmaktadır. Başvuru sırasında verilen referans numarası ile başvurunuzun durumunu kontrol edebilirsiniz. Ayrıca SMS bilgilendirme hizmeti satın alarak anlık bildirim alabilirsiniz.'
      }
    ]
  }
];

export default function FAQPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('genel');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredFAQ = searchQuery
    ? faqData.map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.question.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR')) ||
            item.answer.toLocaleLowerCase('tr-TR').includes(searchQuery.toLocaleLowerCase('tr-TR'))
        )
      })).filter(category => category.items.length > 0)
    : faqData.filter(category => category.id === activeCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://readdy.ai/api/form/d62fo500h9ov63emh700', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          question: formData.question
        }).toString()
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', question: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowMobileCategories(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-br from-[#1a237e] to-[#0d1442] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-48 sm:w-64 h-48 sm:h-64 bg-[#00bcd4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-64 sm:w-80 h-64 sm:h-80 bg-[#00bcd4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <i className="ri-question-answer-line text-[#00bcd4] text-sm sm:text-base"></i>
            <span className="text-white/90 text-xs sm:text-sm">Yardım Merkezi</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-6 sm:mb-8">
            Schengen vizesi hakkında merak ettiğiniz tüm soruların cevaplarını burada bulabilirsiniz
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-gray-400 text-lg"></i>
            </div>
            <input
              type="text"
              placeholder="Soru ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white shadow-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#00bcd4] transition-colors cursor-pointer">
              Ana Sayfa
            </Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-[#00bcd4] font-medium">SSS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Category Sidebar - Mobile Toggle */}
          {!searchQuery && (
            <>
              {/* Mobile Category Selector */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowMobileCategories(!showMobileCategories)}
                  className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00bcd4]/10">
                      <i className={`${faqData.find(c => c.id === activeCategory)?.icon} text-[#00bcd4]`}></i>
                    </div>
                    <span className="font-medium text-gray-900">
                      {faqData.find(c => c.id === activeCategory)?.title}
                    </span>
                  </div>
                  <i className={`ri-arrow-down-s-line text-xl text-gray-400 transition-transform ${showMobileCategories ? 'rotate-180' : ''}`}></i>
                </button>

                {showMobileCategories && (
                  <div className="mt-2 bg-white rounded-xl shadow-sm border border-gray-100 p-2 space-y-1">
                    {faqData.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer ${
                          activeCategory === category.id
                            ? 'bg-[#00bcd4]/10 text-[#00bcd4]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          activeCategory === category.id ? 'bg-[#00bcd4]/20' : 'bg-gray-100'
                        }`}>
                          <i className={`${category.icon} text-lg`}></i>
                        </div>
                        <span className="text-sm font-medium">{category.title}</span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === category.id ? 'bg-[#00bcd4]/20' : 'bg-gray-100'
                        }`}>
                          {category.items.length}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20 lg:top-24">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 px-2">Kategoriler</h3>
                  <nav className="space-y-1">
                    {faqData.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer ${
                          activeCategory === category.id
                            ? 'bg-[#00bcd4]/10 text-[#00bcd4]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          activeCategory === category.id ? 'bg-[#00bcd4]/20' : 'bg-gray-100'
                        }`}>
                          <i className={`${category.icon} text-lg`}></i>
                        </div>
                        <span className="text-sm font-medium">{category.title}</span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === category.id ? 'bg-[#00bcd4]/20' : 'bg-gray-100'
                        }`}>
                          {category.items.length}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </>
          )}

          {/* FAQ Content */}
          <div className={searchQuery ? 'lg:col-span-4' : 'lg:col-span-3'}>
            {searchQuery && (
              <div className="mb-4 sm:mb-6">
                <p className="text-gray-600 text-sm sm:text-base">
                  <span className="font-medium text-gray-900">"{searchQuery}"</span> için{' '}
                  {filteredFAQ.reduce((acc, cat) => acc + cat.items.length, 0)} sonuç bulundu
                </p>
              </div>
            )}

            {filteredFAQ.map(category => (
              <div key={category.id} className="mb-6 sm:mb-8">
                {searchQuery && (
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#1a237e]/10 rounded-lg">
                      <i className={`${category.icon} text-[#1a237e] text-sm sm:text-base`}></i>
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">{category.title}</h2>
                  </div>
                )}

                <div className="space-y-2 sm:space-y-3">
                  {category.items.map((item, index) => {
                    const questionId = `${category.id}-${index}`;
                    const isOpen = openQuestions.includes(questionId);

                    return (
                      <div
                        key={questionId}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900 pr-3 sm:pr-4">{item.question}</span>
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <i className="ri-arrow-down-s-line text-gray-600"></i>
                          </div>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                            <div className="pt-3 sm:pt-4 border-t border-gray-100">
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                  <i className="ri-search-line text-2xl sm:text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-600 text-sm sm:text-base">Farklı anahtar kelimeler ile tekrar deneyin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ask Question Section */}
      <section className="bg-white border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#00bcd4]/10 rounded-2xl mb-3 sm:mb-4">
              <i className="ri-chat-3-line text-xl sm:text-2xl text-[#00bcd4]"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Sorunuzu Bulamadınız mı?</h2>
            <p className="text-gray-600 text-sm sm:text-base">Bize sorunuzu gönderin, en kısa sürede yanıtlayalım</p>
          </div>

          <form
            id="faq-question-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="bg-[#f8fafc] rounded-2xl p-5 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adınız</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent text-sm"
                  placeholder="Adınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent text-sm"
                  placeholder="E-posta adresinizi girin"
                />
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sorunuz</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value.slice(0, 500) })}
                required
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent text-sm resize-none"
                placeholder="Sorunuzu detaylı bir şekilde yazın..."
              ></textarea>
              <p className="text-xs text-gray-400 mt-1 text-right">{formData.question.length}/500</p>
            </div>

            {submitSuccess && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <p className="text-xs sm:text-sm text-green-700">Sorunuz başarıyla gönderildi! En kısa sürede yanıtlayacağız.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00bcd4] text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-[#00a5b5] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line"></i>
                  Soruyu Gönder
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-[#f8fafc] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Link
              to="/"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#1a237e]/10 rounded-xl mb-3 sm:mb-4 group-hover:bg-[#1a237e]/20 transition-colors">
                <i className="ri-home-4-line text-xl sm:text-2xl text-[#1a237e]"></i>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Ana Sayfa</h3>
              <p className="text-xs sm:text-sm text-gray-600">Tüm hizmetlerimize göz atın</p>
            </Link>

            <Link
              to="/country/germany"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#00bcd4]/10 rounded-xl mb-3 sm:mb-4 group-hover:bg-[#00bcd4]/20 transition-colors">
                <i className="ri-file-list-3-line text-xl sm:text-2xl text-[#00bcd4]"></i>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Evrak Listesi</h3>
              <p className="text-xs sm:text-sm text-gray-600">Ülkelere göre gerekli evraklar</p>
            </Link>

            <a
              href="mailto:schengenchecklist@gmail.com"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-green-100 rounded-xl mb-3 sm:mb-4 group-hover:bg-green-200 transition-colors">
                <i className="ri-mail-line text-xl sm:text-2xl text-green-600"></i>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">İletişim</h3>
              <p className="text-xs sm:text-sm text-gray-600">schengenchecklist@gmail.com</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
