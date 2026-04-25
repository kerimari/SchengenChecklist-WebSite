export interface Document {
  name: string;
  required: boolean;
  note?: string;
  applicantType?: 'all' | 'student' | 'employee' | 'self-employed' | 'retired';
}

export interface DocumentCategory {
  title: string;
  icon: string;
  items: Document[];
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  processingTime: string;
  visaFee: string;
  validityPeriod: string;
  description: string;
  consulates: string[];
  appointmentProvider: string;
  appointmentUrl: string;
  appointmentStatus?: {
    city: string;
    lastOpenedDate: string;
    soldOutUntil: string;
  }[];
  heroImage: string;
  approvalRate: number;
  tips?: { icon: string; title: string; text: string; type: 'warning' | 'info' | 'success' }[];
  documents: {
    [key: string]: DocumentCategory;
  };
}

export const countriesData: Country[] = [
  {
    id: 'germany',
    name: 'Almanya',
    flag: '🇩🇪',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Almanya Schengen vizesi için gerekli evraklar ve başvuru süreci',
    consulates: ['Ankara', 'İstanbul', 'İzmir'],
    appointmentProvider: 'iDATA',
    appointmentUrl: 'https://www.idata.com.tr',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Brandenburg%20Gate%20Berlin%20Germany%20iconic%20landmark%20neoclassical%20architecture%20blue%20sky%20historic%20monument%20city%20center%20famous%20tourist%20destination%20European%20capital%20architectural%20masterpiece%20cultural%20heritage%20symbol%20of%20unity%20grand%20columns%20majestic%20structure%20urban%20landscape%20travel%20photography&width=1400&height=400&seq=germany-hero-001&orientation=landscape',
    approvalRate: 78.0,
    tips: [
      { icon: 'ri-calendar-2-line', title: 'Randevu Süreci (iDATA)', text: 'Almanya konsolosluğu randevuları doğrudan açmaz. iDATA üzerinden önce bekleme listesine girmeniz gerekir. Bu listeye göre yaklaşık 6-9 ay sonra rastgele bir tarihe randevu atanır; bu nedenle seyahat planlamanızı çok önceden yapmanız kritik önem taşır.', type: 'warning' },
      { icon: 'ri-time-line', title: 'Pasaport İnceleme Süresi', text: 'Almanya\'da pasaport inceleme süreci ortalama 25-40 iş günü arasında değişmektedir. Bu süreyi göz önünde bulundurarak başvurunuzu zamanında yapın.', type: 'info' },
      { icon: 'ri-bank-line', title: 'Mali Yeterlilik', text: 'Almanya günlük en az 50€ karşılığı bakiye bekler. 15 günlük seyahat için hesabınızda minimum 750€ karşılığı TL bulunmalıdır.', type: 'info' },
      { icon: 'ri-alarm-warning-line', title: 'Cascade Kuralı ve Dikkat Edilmesi Gerekenler', text: 'Almanya Cascade Kuralına uymakla birlikte, Türkiye vatandaşları için ilk Schengen vizesi olarak önerilmez. Başvuru yapacaksanız tüm belgelerinizin eksiksiz ve sorunsuz hazırlanmasına özellikle dikkat edin; küçük bir eksiklik bile süreci olumsuz etkileyebilir.', type: 'warning' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan, vize bitiminden 3 ay sonrası geçerli pasaport', required: true, note: 'Eski pasaportlarınızı da başvuruya eklemeniz önerilir', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz ve doğru şekilde doldurulmuş, imzalanmış Schengen vize başvuru formu', required: true, note: 'Online olarak doldurulup çıktı alınmalıdır', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm boyutunda, son 6 ay içinde çekilmiş, beyaz arka planlı 2 adet biyometrik fotoğraf', required: true, note: 'Gözlük ve başlık olmadan çekilmelidir', applicantType: 'all' },
          { name: 'Nüfus Cüzdanı Fotokopisi', description: 'Nüfus cüzdanının ön ve arka yüzünün fotokopisi', required: true, note: null, applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3aya ait banka hesap hareketleri ve güncel bakiye (kaşeli ve imzalı)', required: true, note: 'Günlük en az 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3aya ait maaş bordroları', required: true, note: 'Çalışanlar için zorunludur', applicantType: 'employee' },
          { name: 'Vergi Levhası', description: 'Güncel vergi levhası fotokopisi', required: true, note: 'Serbest meslek sahipleri için zorunlu', applicantType: 'self-employed' },
          { name: 'Emekli Maaş Belgesi', description: 'SGK\'dan alınan emekli maaş belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' },
          { name: 'Sponsor Mektubu', description: 'Masrafları karşılayacak kişinin noter onaylı taahhüt mektubu ve mali belgeleri', required: true, note: 'Öğrenciler ve geliri olmayan kişiler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Bileti Rezervasyonu', description: 'Gidiş-dönüş uçak bileti rezervasyonu (satın alınmış olması gerekmez)', required: true, note: 'Vize onayından sonra satın alınması önerilir', applicantType: 'all' },
          { name: 'Seyahat Sağlık Sigortası', description: 'Minimum 30.000€ teminatlı, tüm Schengen bölgesini kapsayan seyahat sağlık sigortası', required: true, note: 'Seyahat tarihlerini kapsamalı', applicantType: 'all' },
          { name: 'Konaklama Belgesi', description: 'Otel rezervasyonu veya davetiye mektubu', required: true, note: 'Tüm konaklama süresini kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Günlük detaylı seyahat programı', required: false, note: 'Ziyaret edilecek yerler ve aktiviteler', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Antetli kağıda, kaşeli ve imzalı olmalıdır', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4aylık SGK prim dökümü', required: true, note: 'e-Devlet üzerinden alınabilir', applicantType: 'employee' },
          { name: 'Ticaret Sicil Gazetesi', description: 'Şirket sahipleri için ticaret sicil gazetesi', required: true, note: 'İş sahipleri için zorunlu', applicantType: 'self-employed' },
          { name: 'Vergi Beyannamesi', description: 'Son yıla ait vergi beyannamesi', required: true, note: 'Serbest meslek sahipleri için zorunlu', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Güncel öğrenci belgesi ve transkript', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK\'dan alınan emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Evlilik Cüzdanı Fotokopisi', description: 'Evli başvuru sahipleri için evlilik cüzdanı fotokopisi', required: false, note: 'Evli başvuru sahipleri için', applicantType: 'all' },
          { name: 'Araç Ruhsatı', description: 'Araç sahibi iseniz ruhsat fotokopisi', required: false, note: 'Bağlayıcılık kanıtı olarak', applicantType: 'all' },
          { name: 'Tapu Fotokopisi', description: 'Gayrimenkul sahibi iseniz tapu fotokopisi', required: false, note: 'Bağlayıcılık kanıtı olarak', applicantType: 'all' },
          { name: 'Aile Hekimi Raporu', description: '65 yaş üstü başvuru sahipleri için sağlık raporu', required: false, note: '65 yaş üstü için önerilir', applicantType: 'retired' },
          { name: 'Veli İzin Belgesi', description: '18 yaş altı başvurular için noter onaylı veli izni', required: true, note: 'Reşit olmayanlar için zorunlu', applicantType: 'student' }
        ]
      }
    }
  },
  {
    id: 'france',
    name: 'Fransa',
    flag: '🇫🇷',
    region: 'Batı Avrupa',
    processingTime: '15-20 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Fransa, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara', 'İzmir'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/fra',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Eiffel%20Tower%20Paris%20France%20iconic%20landmark%20iron%20lattice%20tower%20sunset%20golden%20hour%20romantic%20city%20Seine%20river%20view%20famous%20monument%20French%20capital%20architectural%20wonder%20travel%20destination%20European%20tourism%20elegant%20structure%20city%20skyline%20cultural%20symbol&width=1400&height=400&seq=france-hero-001&orientation=landscape',
    approvalRate: 85.4,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Randevu Süreci (VFS Global)', text: 'VFS Global\'ün Fransa randevu sistemi sürekli teknik hatalar vermektedir. Randevular sık sık açılsa bile sisteme bağlanmak ve slot yakalamak oldukça güçtür. Sabırlı olun ve sistemi düzenli aralıklarla takip edin.', type: 'warning' },
      { icon: 'ri-time-line', title: 'Kısa Pasaport İnceleme Süresi', text: 'Randevu alındıktan sonra süreç oldukça hızlı ilerler. Pasaport inceleme süresi genellikle yalnızca 5-7 iş günü gibi kısa bir sürede tamamlanır; bu Schengen ülkeleri arasında en hızlı süreçlerden biridir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Günlük Bütçe', text: 'Fransa günlük en az 65€ karşılığı bakiye bekler — Schengen ortalamasının üzerindedir. Banka hesabınızı buna göre hazırlayın.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'İlk Başvuru İçin Önerilen Ülke', text: 'Fransa, Cascade Kuralına tam anlamıyla uymasa da ilk Schengen vizesi için önerilen ülkeler arasındadır. Onay oranları oldukça yüksek olup eksiksiz bir başvuruyla olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'Online olarak doldurulup çıktı alınmalıdır', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm boyutunda, son 6 ay içinde çekilmiş, beyaz arka planlı 2 adet biyometrik fotoğraf', required: true, note: 'ICAO standartlarına uygun olmalıdır', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'Nüfus cüzdanının ön ve arka yüzünün fotokopisi', required: true, note: null, applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay banka hesap hareketleri ve güncel bakiye (kaşeli ve imzalı)', required: true, note: 'Günlük en az 65€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay maaş bordroları', required: true, note: 'Çalışanlar için zorunludur', applicantType: 'employee' },
          { name: 'Sponsor Mektubu', description: 'Masrafları karşılayacak kişinin noter onaylı taahhüt mektubu ve mali belgeleri', required: true, note: 'Öğrenciler ve geliri olmayan kişiler için zorunlu', applicantType: 'student' },
          { name: 'Emekli Maaş Belgesi', description: 'SGK\'dan alınan emekli maaş belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden alınan gelir belgesi ve vergi beyannamesi', required: true, note: 'Serbest meslek sahipleri için zorunlu', applicantType: 'self-employed' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Bileti Rezervasyonu', description: 'Gidiş-dönüş uçak bileti rezervasyonu', required: true, note: 'Vize onayından sonra satın alınması önerilir', applicantType: 'all' },
          { name: 'Seyahat Sağlık Sigortası', description: 'Minimum 30.000€ teminatlı seyahat sağlık sigortası', required: true, note: 'Fransa\'yı kapsamalıdır', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Fransa\'da ikamet eden kişiden davetiye (Attestation d\'accueil)', required: false, note: 'Aile/arkadaş ziyareti için', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Fransızca veya İngilizce tercümesi gerekebilir', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Ticaret Odası Belgesi', description: 'İş sahipleri için faaliyet belgesi', required: true, note: 'Şirket sahipleri için zorunlu', applicantType: 'self-employed' },
          { name: 'Vergi Beyannamesi', description: 'Son yıla ait vergi beyannamesi', required: true, note: 'Serbest meslek sahipleri için zorunlu', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Güncel öğrenci belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Evlilik Cüzdanı Fotokopisi', description: 'Evli başvuru sahipleri için', required: false, note: 'Evli başvuru sahipleri için', applicantType: 'all' },
          { name: 'Araç Ruhsatı', description: 'Araç sahibi iseniz ruhsat fotokopisi', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Tapu Fotokopisi', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'italy',
    name: 'İtalya',
    flag: '🇮🇹',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İtalya, tarihi zenginlikleri, sanat eserleri ve lezzetli mutfağıyla ünlüdür. Roma, Venedik, Floransa gibi şehirleri ziyaret etmek için vize başvuru evraklarını inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'iDATA',
    appointmentUrl: 'https://www.idata.com.tr',
    appointmentStatus: [
      {
        city: 'İstanbul',
        lastOpenedDate: '25.02.2026',
        soldOutUntil: '31.03.2026'
      },
      {
        city: 'İzmir',
        lastOpenedDate: '13.02.2026',
        soldOutUntil: '13.03.2026'
      }
    ],
    heroImage: 'https://readdy.ai/api/search-image?query=Colosseum%20Rome%20Italy%20ancient%20amphitheater%20Roman%20architecture%20historic%20landmark%20blue%20sky%20iconic%20monument%20archaeological%20site%20Italian%20heritage%20famous%20ruins%20travel%20destination%20classical%20architecture%20European%20history%20tourist%20attraction%20majestic%20structure&width=1400&height=400&seq=italy-hero-001&orientation=landscape',
    approvalRate: 91.1,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Erken Randevu Alın (iDATA)', text: 'iDATA\'da randevu almak oldukça zordur. Yoğunluk yüzünden sistem ödeme ekranında sürekli hata verir. Seyahat tarihinizden en az 3 ay önce randevu almaya başlayın.', type: 'warning' },
      { icon: 'ri-time-line', title: 'Pasaport İnceleme Süresi', text: 'İstanbul Konsolosluğu pasaportları seyahat tarihinden 2-3 gün önce teslim ederken, İzmir Konsolosluğu yaklaşık 4-5 iş günü içinde teslim etmektedir.', type: 'info' },
      { icon: 'ri-parent-line', title: 'Öğrenci Sponsor Kuralı', text: 'İtalya, öğrenci başvurularında mutlaka ebeveyn sponsor belgesi ister. Arkadaş veya akraba sponsor kabul edilmez.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'İlk Schengen Başvurusu İçin İdeal', text: 'İtalya, ilk kez Schengen vizesi başvurusu yapacaklar için şiddetle tavsiye edilir. Onay oranı oldukça yüksektir ve başvuru süreci nispeten kolaydır.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'İtalya Konsolosluğu web sitesinden indirilebilir', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay banka hesap hareketleri', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay maaş bordroları', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Ebeveyn Sponsor Belgesi', description: 'Ebeveynin mali durumunu gösteren belgeler (banka hesap dökümü, maaş bordrosu, işveren yazısı)', required: true, note: 'Öğrenciler için zorunlu - Ebeveyn sponsor göstermesi gereklidir', applicantType: 'student' },
          { name: 'Sponsor Taahhütnamesi', description: 'Ebeveynin not not noter onaylı taahhüt mektubu', required: true, note: 'Öğrenciler için zorunlu - Masrafları karşılayacağına dair', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Bileti Rezervasyonu', description: 'Gidiş-dönüş rezervasyonu', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı seyahat sigortası', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'İtalya\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' },
          { name: 'Eski Vizeler', description: 'Önceki vizeler', required: false, note: 'Varsa', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'spain',
    name: 'İspanya',
    flag: '🇪🇸',
    region: 'Güney Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İspanya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'BLS International',
    appointmentUrl: 'https://turkey.blsspainvisa.com/istanbul/',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Sagrada%20Familia%20Barcelona%20Spain%20Gaudi%20architecture%20iconic%20basilica%20modernist%20design%20colorful%20facade%20Spanish%20landmark%20religious%20monument%20artistic%20masterpiece%20blue%20sky%20famous%20cathedral%20travel%20destination%20architectural%20wonder%20European%20tourism%20unique%20structure&width=1400&height=400&seq=spain-hero-001&orientation=landscape',
    approvalRate: 86.5,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Randevu Yoğunluğu (BLS International)', text: 'Sürekli randevu açılmasına rağmen BLS International üzerinden randevu almak bir hayli zordur. Seyahat tarihinizden en az 3 ay önce randevu bakmaya başlayın.', type: 'warning' },
      { icon: 'ri-time-line', title: 'Pasaport İnceleme Süresi', text: 'İspanya\'da pasaport inceleme süresi konsolosluğa göre farklılık göstermektedir. İstanbul için ortalama 25 iş günü beklenirken, İzmir ve Ankara konsolosluklarında bu süre ortalama 15 iş gününe kadar düşmektedir.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'En Yüksek Onay Oranlarından Biri', text: 'İspanya, İtalya ile birlikte Türk vatandaşları için en yüksek vize onay oranına sahip Schengen ülkeleri arasında yer almaktadır. Eksiksiz ve doğru hazırlanmış bir başvuruyla olumlu sonuç alma ihtimaliniz oldukça yüksektir.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Geçerli pasaport, en az 2 boş sayfa', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'netherlands',
    name: 'Hollanda',
    flag: '🇳🇱',
    region: 'Batı Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Hollanda, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/nld',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Amsterdam%20canals%20Netherlands%20traditional%20Dutch%20houses%20colorful%20buildings%20waterfront%20architecture%20bicycles%20bridges%20European%20city%20travel%20photography%20historic%20district%20charming%20streets%20Dutch%20culture%20iconic%20scenery%20tourist%20attraction%20picturesque%20view&width=1400&height=400&seq=netherlands-hero-001&orientation=landscape',
    approvalRate: 80.0,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Sıkı Denetim', text: 'Hollanda, mali belgeleri çok detaylı inceler. Banka hesabınızda ani yüksek para girişleri varsa bunların kaynağını açıklayan belge hazırlayın.', type: 'warning' },
      { icon: 'ri-plane-line', title: 'Transit Vize', text: 'Schiphol Havalimanı\'ndan transit geçiş yapacaksanız bile Schengen vizesi gereklidir. Aktarmalı uçuşlarda buna dikkat edin.', type: 'info' },
      { icon: 'ri-calendar-2-line', title: 'Randevu Süreci (VFS Global)', text: 'Hollanda da Almanya gibi direkt randevu açmaz; önce bekleme listesine girmeniz gerekir. Bekleme listesine göre ortalama 1-1,5 ay içinde size bir randevu tarihi atanır. Bu nedenle seyahat planlamanızı en az 2-3 ay öncesinden yapmanız önerilir.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Cascade Kuralı', text: 'Hollanda Cascade Kuralına uymaktadır. Daha önce Schengen vizesi almış iseniz, geçmiş vize geçmişinize bağlı olarak 6 ay veya 1 yıl gibi daha uzun süreli vize alabilirsiniz. Bu durum başvurunuzu önemli ölçüde güçlendirir.', type: 'success' },
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50-60€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'austria',
    name: 'Avusturya',
    flag: '🇦🇹',
    region: 'Orta Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Avusturya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/aut',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Schonbrunn%20Palace%20Vienna%20Austria%20baroque%20architecture%20imperial%20palace%20gardens%20historic%20landmark%20yellow%20facade%20Austrian%20heritage%20royal%20residence%20European%20tourism%20majestic%20building%20cultural%20monument%20travel%20destination%20elegant%20structure&width=1400&height=400&seq=austria-hero-001&orientation=landscape',
    approvalRate: 83.0,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Titiz İnceleme', text: 'Avusturya konsolosluğu evrakları çok titiz inceler. Eksik veya hatalı belge durumunda başvuru doğrudan reddedilebilir.', type: 'warning' },
      { icon: 'ri-translate-2', title: 'Almanca Tercüme', text: 'Avusturya, belgelerin Almanca tercümesini tercih eder. İngilizce tercüme de kabul edilir ancak Almanca daha avantajlıdır.', type: 'info' },
      { icon: 'ri-money-euro-circle-line', title: 'Makul Bakiye Beklentisi', text: 'Avusturya için günlük 40-50€ karşılığı bakiye yeterli kabul edilmektedir. Seyahat sürenize göre toplam bakiyenizi hesaplayın.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Kış Sezonu Avantajı', text: 'Kayak sezonu dışında (Ekim-Kasım) başvuru yaparsanız hem randevu hem işlem süresi daha kısa olur.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Geçerli pasaport', required: true, note: 'En az 2 boş sayfa', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40-50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Avusturya\'yı ve tüm Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Almanca veya İngilizce tercüme gerekebilir', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Avusturya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'belgium',
    name: 'Belçika',
    flag: '🇧🇪',
    region: 'Batı Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Belçika, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/bel',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Grand%20Place%20Brussels%20Belgium%20medieval%20square%20ornate%20guildhalls%20golden%20facades%20historic%20architecture%20European%20landmark%20Belgian%20heritage%20city%20center%20tourist%20destination%20baroque%20buildings%20cultural%20monument%20travel%20photography%20charming%20district%20blue%20sky&width=1400&height=400&seq=belgium-hero-001&orientation=landscape',
    approvalRate: 72.5,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Yavaş İşlem', text: 'Belçika vize işlemleri bazen 30 güne kadar uzayabilir. Seyahat tarihinizden en az 2 ay önce başvurun.', type: 'warning' },
      { icon: 'ri-government-line', title: 'AB Kurumları', text: 'İş amaçlı Brüksel ziyaretlerinde AB kurumlarından davet mektubu başvurunuzu güçlendirir.', type: 'info' },
      { icon: 'ri-speed-line', title: 'Hızlı Sonuç', text: 'Belçika genellikle 10-15 iş günü içinde vize sonucu verir. Schengen ülkelerinden en hızlı sonuç veren ülkelere sahiptir.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Rezervasyon yeterli', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' },
          { name: 'Eski Vizeler', description: 'Önceki vizeler', required: false, note: 'Varsa', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'czech',
    name: 'Çekya',
    flag: '🇨🇿',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Çekya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/cze',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Prague%20Castle%20Czech%20Republic%20medieval%20fortress%20Gothic%20architecture%20imperial%20palace%20gardens%20historic%20landmark%20Vltava%20river%20view%20European%20heritage%20royal%20residence%20city%20skyline%20tourist%20destination%20ancient%20monument%20Czech%20culture%20majestic%20structure%20travel%20photography%20blue%20sky&width=1400&height=400&seq=czech-hero-001&orientation=landscape',
    approvalRate: 79.4,
    tips: [
      { icon: 'ri-calendar-check-line', title: 'Randevu Süreci (VFS Global)', text: 'Çekya\'nın VFS Global sistemi, Fransa gibi ülkelere kıyasla çok daha stabil çalışır. Randevu almak görece kolaydır; ancak randevular genellikle ayda bir kez açılır. Sistemi düzenli takip etmeniz ve uygun slot çıktığında hızlıca almanız önerilir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Çekya, Schengen bölgesinin en uygun fiyatlı ülkelerinden biridir. Günlük 40€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Çekya Euro kullanmaz, Çek Zloty (CZK) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-information-line', title: 'Onay Oranı ve Cascade Kuralı', text: 'Çekya\'nın onay oranının nispeten düşük görünmesine aldanmayın. İlk Schengen başvurusu için genellikle önerilmez; ancak Cascade kuralına uymadığından sizi 3aylık kısa süreli vizelerde tutabilir. Yunanistan\'dan ilk vizeyi aldıktan sonra Cascade kuralına uyan ülkelere (Danimarka, Norveç gibi) başvurursanız çok daha uzun süreli vize alabilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'denmark',
    name: 'Danimarka',
    flag: '🇩🇰',
    region: 'Kuzey Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Danimarka, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/dnk',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Nyhavn%20Copenhagen%20Denmark%20colorful%20houses%20waterfront%20canal%20historic%20harbor%20Scandinavian%20architecture%20boats%20Danish%20landmark%20tourist%20destination%20vibrant%20facades%20European%20city%20blue%20sky%20travel%20photography%20Scandinavian%20heritage&width=1400&height=400&seq=denmark-hero-001&orientation=landscape',
    approvalRate: 60.6,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Uzun Bekleme', text: 'Danimarka vize işlemleri 15-20 iş günü sürer. Yaz aylarında bu süre 4 haftayı aşabilir, seyahat tarihinizden en az 2 ay önce başvurun.', type: 'warning' },
      { icon: 'ri-money-euro-circle-line', title: 'Yüksek Yaşam Maliyeti', text: 'Danimarka pahalı bir ülkedir. Günlük en az 70€ karşılığı bakiye göstermeniz beklenir.', type: 'warning' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Danimarka Euro kullanmaz, Danimarka Kronu (DKK) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Hızlı Sonuç', text: 'Danimarka genellikle 10 iş günü içinde sonuç alırsınız. VFS Global üzerinden randevu alabilirsiniz.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 70€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'estonia',
    name: 'Estonya',
    flag: '🇪🇪',
    region: 'Kuzey Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Estonya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/est',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Tallinn%20Old%20Town%20Estonia%20historic%20city%20center%20medieval%20architecture%20wooden%20buildings%20historic%20center%20Baltic%20heritage%20European%20city%20UNESCO%20site%20tourist%20destination%20charming%20streets%20cultural%20landmark%20travel%20photography%20blue%20sky%20travel%20photography%20Scandinavian%20heritage&width=1400&height=400&seq=estonia-hero-001&orientation=landscape',
    approvalRate: 57.5,
    tips: [
      { icon: 'ri-check-double-line', title: 'Kolay Başvuru', text: 'Estonya, nispeten kolay vize veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile onay oranı artar.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Fiyat', text: 'Estonya, Baltık ülkeleri arasında en uygun fiyatlı olanıdır. Günlük 40-50€ bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-flight-takeoff-line', title: 'Uçuş İmkanı', text: 'İstanbul\'dan Tallinn\'ye direkt uçuşlar mevcuttur. Uygun fiyatlı biletler bulabilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Estonya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'finland',
    name: 'Finlandiya',
    flag: '🇫🇮',
    region: 'Kuzey Avrupa',
    processingTime: '15-20 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Finlandiya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/fin',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Helsinki%20Cathedral%20Finland%20white%20neoclassical%20church%20green%20domes%20Senate%20Square%20Finnish%20landmark%20Nordic%20architecture%20Lutheran%20cathedral%20city%20center%20tourist%20destination%20European%20monument%20elegant%20structure%20blue%20sky&width=1400&height=400&seq=finland-hero-001&orientation=landscape',
    approvalRate: 68.7,
    tips: [
      { icon: 'ri-snowy-line', title: 'Kış Seyahati', text: 'Kış aylarında Finlandiya\'ya gidecekseniz, seyahat sigortanızın kış sporları ve soğuk hava koşullarını kapsadığından emin olun.', type: 'info' },
      { icon: 'ri-money-euro-circle-line', title: 'Bakiye Beklentisi', text: 'Finlandiya günlük 60€ karşılığı bakiye bekler. Kuzey Finlandiya\'ya gidecekseniz daha yüksek bakiye gösterin.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Hızlı Sonuç', text: 'Finlandiya genellikle 10-15 iş günü içinde vize sonucu verir. Kış sezonu dışında daha hızlı olabilir.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 60€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Finlandiya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'greece',
    name: 'Yunanistan',
    flag: '🇬🇷',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Yunanistan, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara', 'İzmir'],
    appointmentProvider: 'Kosmos Vize',
    appointmentUrl: 'https://www.kosmosvize.com',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Parthenon%20Athens%20Greece%20ancient%20temple%20Acropolis%20classical%20Greek%20architecture%20marble%20columns%EF%BF%BDhistoric%20ruins%20archaeological%20site%20Mediterranean%20landmark%20cultural%20heritage%20tourist%20destination%20blue%20sky%EF%BF%BDiconic%20monument%20travel%20photography%EF%BF%BDancient%20civilization&width=1400&height=400&seq=greece-hero-001&orientation=landscape',
    approvalRate: 85.4,
    tips: [
      { icon: 'ri-ship-line', title: 'Kapıda Vize ile Ada Girişi', text: 'Yunan adalarına geleneksel Schengen vizesi almak yerine kapıda vize alarak giriş yapabilirsiniz. Aydın, İzmir, İstanbul gibi çeşitli şehirlerden feribot seferleri kalkmaktadır. Ancak bu kapıda vize yalnızca bulunduğunuz adada geçerlidir; diğer Schengen ülkelerine geçiş kesinlikle yasaktır.', type: 'info' },
      { icon: 'ri-alarm-warning-line', title: 'Yaz Yoğunluğu', text: 'Haziran-Ağustos arası başvuru yapacaksanız randevuyu 2-3 ay önceden alın.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Yüksek Onay Oranı', text: 'Yunanistan, Türk vatandaşlarına en yüksek onay oranı veren Schengen ülkelerinden biridir. Onay oranı %90 civarındadır.', type: 'success' },
      { icon: 'ri-map-pin-line', title: 'İzmir Avantajı', text: 'İzmir\'de ikamet ediyorsanız, bu bilgiyi seyahat başvurunuzda belirtmek faydalı olabilir.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Ebeveyn Sponsor Belgesi', description: 'Ebeveynin mali durumunu gösteren belgeler (banka hesap dökümü, maaş bordrosu, işveren yazısı)', required: true, note: 'Öğrenciler için zorunlu - Ebeveyn sponsor göstermesi gereklidir', applicantType: 'student' },
          { name: 'Sponsor Taahhütnamesi', description: 'Ebeveynin not not not noter onaylı taahhüt mektubu', required: true, note: 'Öğrenciler için zorunlu - Masrafları karşılayacağına dair', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Bileti Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı seyahat sigortası', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'hungary',
    name: 'Macaristan',
    flag: '🇭🇺',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Macaristan, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'AS Visa',
    appointmentUrl: 'https://www.as-visa.com/Default.aspx',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Hungarian%20Parliament%20Budapest%20Hungary%20Gothic%20Revival%20architecture%20Danube%20river%20view%20iconic%20landmark%20ornate%20building%20European%20capital%20historic%20monument%20travel%20destination%20majestic%20structure%20blue%20sky%20travel%20photography%20Scandinavian%20heritage&width=1400&height=400&seq=hungary-hero-001&orientation=landscape',
    approvalRate: 85.1,
    tips: [
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Macaristan, Schengen ülkeleri arasında en düşük günlük bakiye beklentisine sahiptir. Günlük 40€ karşılığı yeterlidir.', type: 'success' },
      { icon: 'ri-calendar-check-line', title: 'Hızlı Randevu (AS Visa)', text: 'Macaristan konsolosluğunda AS Visa üzerinden randevu bulmak nispeten kolaydır. 1-2 hafta içinde uygun tarih bulabilirsiniz.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Macaristan Euro kullanmaz, Forint kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-flight-takeoff-line', title: 'Direkt Uçuş', text: 'İstanbul\'dan Budapeşte\'ye direkt uçuşlar mevcuttur. Uygun fiyatlı biletler bulabilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'iceland',
    name: 'İzlanda',
    flag: '🇮🇸',
    region: 'Kuzey Avrupa',
    processingTime: '15-20 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İzlanda, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/isl',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Icelandic%20landscape%20Iceland%20volcanic%20terrain%20geothermal%20springs%20dramatic%20nature%20rugged%20mountains%20serene%20waters%20travel%20destination%20Nordic%20beauty%20majestic%20scenery%20outdoor%20adventure%20untouched%20nature&width=1400&height=400&seq=iceland-hero-001&orientation=landscape',
    approvalRate: 82.0,
    tips: [
      { icon: 'ri-money-euro-circle-line', title: 'Çok Yüksek Maliyet', text: 'İzlanda dünyanın en pahalı ülkelerinden biridir. Günlük en az 100€ (yaklaşık 15.000 ISK) karşılığı bakiye önerilir.', type: 'warning' },
      { icon: 'ri-translate-2', title: 'Resmi Dil', text: 'İzlanda\'nın resmi dili İzlandacadır; ancak İngilizce yaygın olarak konuşulur. Belgelerinizin İngilizce tercümesi yeterlidir.', type: 'info' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'İzlanda Euro kullanmaz, İzlanda Kronu (ISK) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Güvenilir Süreç', text: 'İzlanda konsolosluğu düzenli çalışır. Genellikle 10-15 iş günü içinde sonuç alırsınız.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 100€ (yaklaşık 15.000 ISK) karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'latvia',
    name: 'Letonya',
    flag: '🇱🇻',
    region: 'Kuzey Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Letonya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/lva',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Tallinn%20Old%20Town%20Estonia%20historic%20city%20center%20medieval%20architecture%20wooden%20buildings%20historic%20center%20Baltic%20heritage%20European%20city%20UNESCO%20site%20tourist%20destination%20charming%20streets%20cultural%20landmark%20travel%20photography%20blue%20sky%20travel%20photography%20Scandinavian%20heritage&width=1400&height=400&seq=latvia-hero-001&orientation=landscape',
    approvalRate: 75.0,
    tips: [
      { icon: 'ri-check-double-line', title: 'Kolay Başvuru', text: 'Letonya, nispeten kolay vize veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile onay oranı artar.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Fiyat', text: 'Letonya, Baltık ülkeleri arasında uygun fiyatlı bir destinasyondur. Günlük 40-50€ bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-flight-takeoff-line', title: 'Uçuş İmkanı', text: 'İstanbul\'dan Riga\'ya (Letonya\'nın başkenti) bağlantılı uçuşlar mevcuttur. Uygun fiyatlı biletler bulabilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Letonya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'liechtenstein',
    name: 'Lihtenştayn',
    flag: '🇱🇮',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Lihtenştayn, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İsviçre Konsolosluğu üzerinden'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/che',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Vaduz%20Castle%20Liechtenstein%20Alpine%20mountains%20medieval%20fortress%20scenic%20landscape%20European%20principality%20mountain%20backdrop%20historic%20residence%20travel%20destination%20majestic%20scenery%20blue%20sky&width=1400&height=400&seq=liechtenstein-hero-001&orientation=landscape',
    approvalRate: 82.3,
    tips: [
      { icon: 'ri-information-line', title: 'İsviçre Üzerinden', text: 'Lihtenştayn vizesi İsviçre konsolosluğu üzerinden işlenir. VFS Global\'den İsviçre/Lihtenştayn seçeneğini işaretleyin.', type: 'info' },
      { icon: 'ri-money-euro-circle-line', title: 'Yüksek Yaşam Maliyeti', text: 'Lihtenştayn Avrupa\'nın en pahalı ülkesidir. Günlük en az 100 CHF (yaklaşık 105€) karşılığı bakiye göstermeniz şiddetle tavsiye edilir.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Schengen Vizesi Yeterli', text: 'Lihtenştayn, herhangi bir Schengen vizesiyle girebilirsiniz. Ayrı vize gerekmez.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 100 CHF karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'İsviçre\'yi kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Lihtenştayn\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'lithuania',
    name: 'Litvanya',
    flag: '🇱🇹',
    region: 'Kuzey Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Litvanya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/ltu',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Vilnius%20Old%20Town%20Lithuania%20baroque%20architecture%20historic%20churches%20medieval%20buildings%20Baltic%20heritage%20colorful%20facades%20European%20city%20UNESCO%20site%20tourist%20destination%20charming%20streets%20blue%20sky%20travel%20photography%20Lithuanian%20culture&width=1400&height=400&seq=lithuania-hero-001&orientation=landscape',
    approvalRate: 66.0,
    tips: [
      { icon: 'ri-check-double-line', title: 'Hızlı İşlem', text: 'Litvanya genellikle 7-10 iş günü içinde vize sonucu verir. Schengen ülkelerinden en hızlı sonuç veren ülkelere sahiptir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Litvanya, Batı Avrupa\'ya kıyasla oldukça uygun fiyatlıdır. Günlük 40€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-map-pin-line', title: 'İzmir Avantajı', text: 'İzmir\'de ikamet ediyorsanız, bu bilgiyi seyahat başvurunuzda belirtmek faydalı olabilir.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'luxembourg',
    name: 'Lüksemburg',
    flag: '🇱🇺',
    region: 'Batı Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Lüksemburg, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/lux',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Luxembourg%20City%20fortifications%20historic%20castle%20medieval%20architecture%20European%20capital%20scenic%20valley%20ancient%20walls%20UNESCO%20heritage%20tourist%20destination%20cultural%20landmark%20travel%20photography%20blue%20sky%20travel%20photography%20Scandinavian%20heritage&width=1400&height=400&seq=luxembourg-hero-001&orientation=landscape',
    approvalRate: 83.0,
    tips: [
      { icon: 'ri-information-line', title: 'Belçika Üzerinden', text: 'Lüksemburg vizesi Belçika konsolosluğu üzerinden işlenir. VFS Global\'den Belçika/Lüksemburg seçeneğini işaretleyin.', type: 'info' },
      { icon: 'ri-money-euro-circle-line', title: 'Çok Yüksek Maliyet', text: 'Lüksemburg Avrupa\'nın en pahalı ülkelerinden biridir. Günlük en az 100€ karşılığı bakiye önerilir.', type: 'warning' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Lüksemburg Euro kullanır. Banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 100€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'portugal',
    name: 'Portekiz',
    flag: '🇵🇹',
    region: 'Güney Avrupa',
    processingTime: '15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Portekiz, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'AS Visa',
    appointmentUrl: 'https://www.as-visa.com/Default.aspx',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Belem%20Tower%20Lisbon%20Portugal%20Manueline%20architecture%20historic%20fortress%20Dracula%20castle%20mountain%20backdrop%20historic%20landmark%20Portuguese%20heritage%20Gothic%20architecture%20travel%20destination%20blue%20sky%20tourism%20photography%20charming%20old%20stone%20walls%20European%20culture&width=1400&height=400&seq=portugal-hero-001&orientation=landscape',
    approvalRate: 93.0,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Randevu Sıkıntısı', text: 'Portekiz son yıllarda çok popüler oldu. Randevu bulmak zorlaşabilir, 1-2 ay önceden başvurun.', type: 'warning' },
      { icon: 'ri-money-euro-circle-line', title: 'Makul Bütçe', text: 'Portekiz, Batı Avrupa\'ya kıyasla oldukça uygun fiyatlıdır. Günlük 40€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-check-double-line', title: 'İyi Onay Oranı', text: 'Portekiz\'in Türk vatandaşlarına vize onay oranı oldukça yüksektir. Eksiksiz başvuru ile şansınız çok iyi.', type: 'success' },
      { icon: 'ri-map-pin-line', title: 'AS Visa', text: 'Başvurular AS Visa üzerinden yapılır. Online randevu sistemi üzerinden uygun tarih seçebilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'malta',
    name: 'Malta',
    flag: '🇲🇹',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Malta, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/mlt',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Valletta%20Malta%20historic%20capital%20city%20Mediterranean%20sea%20limestone%20buildings%20baroque%20architecture%20Grand%20Harbour%20fortifications%20UNESCO%20heritage%20European%20island%20travel%20destination%20blue%20sky%20reflection%20serene%20water%20Slovenian%20heritage%20scenic%20beauty&width=1400&height=400&seq=malta-hero-001&orientation=landscape',
    approvalRate: 61.5,
    tips: [
      { icon: 'ri-translate-2', title: 'İngilizce Resmi Dil', text: 'Malta\'nın resmi dillerinden biri İngilizcedir. Belgelerinizin İngilizce tercümesi yeterlidir, ayrıca Maltaca gerekmez.', type: 'info' },
      { icon: 'ri-alarm-warning-line', title: 'Düşük Onay Oranı', text: 'Malta, Schengen ülkeleri arasında en düşük onay oranlarından birine sahiptir. Başvurunuzu eksiksiz ve dikkatli hazırlamanız kritik önem taşır.', type: 'warning' },
      { icon: 'ri-ship-line', title: 'İşlem Süresi', text: 'Malta\'da işlem süresi genellikle 15-20 iş günü sürer. Yaz aylarında bu süre uzayabilir, seyahat tarihinizden en az 2 ay önce başvurun.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Hızlı Sonuç', text: 'Malta genellikle 10 iş günü içinde vize sonucu verir. Eksiksiz başvuru ile süreç sorunsuz ilerler.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Malta\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'norway',
    name: 'Norveç',
    flag: '🇳🇴',
    region: 'Kuzey Avrupa',
    processingTime: '15-20 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Norveç, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/nor',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Norwegian%20fjords%20Norway%20dramatic%20landscape%20Geirangerfjord%20steep%20cliffs%20waterfalls%20serene%20water%20Scandinavian%20nature%20majestic%20scenery%20Nordic%20beauty%20travel%20destination%20blue%20sky%20pristine%20environment%20stunning%20mountain%20reflections%20outdoor%20adventure&width=1400&height=400&seq=norway-hero-002&orientation=landscape',
    approvalRate: 79.0,
    tips: [
      { icon: 'ri-money-euro-circle-line', title: 'Yüksek Yaşam Maliyeti', text: 'Norveç, Avrupa\'nın en pahalı ülkesidir. Günlük en az 80€ karşılığı bakiye göstermeniz önerilir.', type: 'warning' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Norveç Euro kullanmaz, Norveç Kronu (NOK) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-alarm-warning-line', title: 'Uzun İşlem Süresi', text: 'Norveç vize işlemleri 15-20 iş günü sürebilir. Yaz aylarında bu süre uzayabilir, seyahat tarihinizden en az 2 ay önce başvurun.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Güvenilir Süreç', text: 'Norveç konsolosluğunda düzenli ve şeffaf çalışır. Başvurunuzu eksiksiz yaparsanız süreç sorunsuz ilerler.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 80€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Norveç\'ten davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'poland',
    name: 'Polonya',
    flag: '🇵🇱',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Polonya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/pol',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Wawel%20Castle%20Krakow%20Poland%20medieval%20fortress%20hilltop%20historic%20landmark%20Vistula%20river%20view%20Polish%20heritage%20Gothic%20Renaissance%20architecture%20European%20capital%20city%20skyline%20travel%20destination%20blue%20sky%20cultural%20monument&width=1400&height=400&seq=poland-hero-001&orientation=landscape',
    approvalRate: 82.6,
    tips: [
      { icon: 'ri-check-double-line', title: 'Yüksek Onay Oranı', text: 'Polonya, Türk vatandaşlarına oldukça yüksek onay oranı veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Polonya, Orta Avrupa\'nın en uygun fiyatlı ülkelerinden biridir. Günlük 40-50€ bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Polonya Euro kullanmaz, Polonya Zloty (PLN) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-flight-takeoff-line', title: 'Direkt Uçuş', text: 'İstanbul\'dan Varşova ve Krakow\'a direkt uçuşlar mevcuttur. Uygun fiyatlı biletler bulabilirsiniz.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'slovakia',
    name: 'Slovakya',
    flag: '🇸🇰',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Slovakya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'BLS International',
    appointmentUrl: 'https://blsslovakiavisa.com/turkey/',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Bratislava%20Castle%20Slovakia%20hilltop%20fortress%20Danube%20river%20view%20historic%20walls%20Slovak%20capital%20city%20skyline%20medieval%20architecture%20European%20heritage%20travel%20destination%20blue%20sky%20cultural%20monument%20elegant%20structure&width=1400&height=400&seq=slovakia-hero-001&orientation=landscape',
    approvalRate: 88.8,
    tips: [
      { icon: 'ri-check-double-line', title: 'Yüksek Onay Oranı', text: 'Slovakya, Türk vatandaşlarına en yüksek onay oranı veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Slovakya, Orta Avrupa\'nın en uygun fiyatlı ülkelerinden biridir. Günlük 40-50€ bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-calendar-check-line', title: 'Randevu (BLS International)', text: 'Slovakya randevuları BLS International üzerinden alınmaktadır. 1-2 hafta içinde uygun tarih bulabilirsiniz.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Slovakya Euro kullanır. Banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'slovenia',
    name: 'Slovenya',
    flag: '🇸🇮',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Slovenya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'AS Visa',
    appointmentUrl: 'https://www.as-visa.com/Default.aspx',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Lake%20Bled%20Slovenia%20emerald%20green%20lake%20island%20church%20Julian%20Alps%20mountain%20backdrop%20stunning%20landscape%20European%20nature%20travel%20destination%20blue%20sky%20reflection%20serene%20water%20Slovenian%20heritage%20scenic%20beauty&width=1400&height=400&seq=slovenia-hero-001&orientation=landscape',
    approvalRate: 89.1,
    tips: [
      { icon: 'ri-check-double-line', title: 'En Yüksek Onay Oranlarından Biri', text: 'Slovenya, Türk vatandaşlarına en yüksek onay oranı veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Slovenya, Batı Avrupa\'ya kıyasla oldukça uygun fiyatlıdır. Günlük 45-55€ bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-calendar-check-line', title: 'Randevu (AS Visa)', text: 'Slovenya randevuları AS Visa üzerinden alınmaktadır. Sistemi düzenli takip ederek kısa sürede uygun tarih bulabilirsiniz.', type: 'success' },
      { icon: 'ri-map-pin-line', title: 'Doğa Harikası', text: 'Bled Gölü ve Triglav Milli Parkı gibi doğal güzellikleri ziyaret edecekseniz konaklama rezervasyonlarınızı önceden yapmanız önerilir.', type: 'info' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 45-55€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Slovenya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'sweden',
    name: 'İsveç',
    flag: '🇸🇪',
    region: 'Kuzey Avrupa',
    processingTime: '15-20 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İsveç, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/swe',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Stockholm%20Sweden%20old%20town%20Gamla%20Stan%20colorful%20buildings%20waterfront%20Baltic%20sea%20Scandinavian%20architecture%20historic%20city%20center%20Swedish%20heritage%20European%20capital%20travel%20destination%20blue%20sky%20charming%20streets%20cultural%20landmark&width=1400&height=400&seq=sweden-hero-001&orientation=landscape',
    approvalRate: 80.8,
    tips: [
      { icon: 'ri-money-euro-circle-line', title: 'Yüksek Yaşam Maliyeti', text: 'İsveç, Avrupa\'nın en pahalı ülkesidir. Günlük en az 75€ karşılığı bakiye göstermeniz önerilir.', type: 'warning' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'İsveç Euro kullanmaz, İsveç Kronu (SEK) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-alarm-warning-line', title: 'Uzun İşlem Süresi', text: 'İsveç vize işlemleri 15-20 iş günü sürebilir. Yaz aylarında bu süre uzayabilir, seyahat tarihinizden en az 2 ay önce başvurun.', type: 'warning' },
      { icon: 'ri-check-double-line', title: 'Güvenilir Süreç', text: 'İsveç konsolosluğunda düzenli ve şeffaf çalışır. Başvurunuzu eksiksiz yaparsanız süreç sorunsuz ilerler.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFScontact üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 75€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'SGK belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'İsveç\'ten davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'switzerland',
    name: 'İsviçre',
    flag: '🇨🇭',
    region: 'Orta Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İsviçre, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/che',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Swiss%20Alps%20Switzerland%20snow%20capped%20mountains%20Matterhorn%20peak%20dramatic%20alpine%20landscape%20Zermatt%20village%20scenic%20valley%20green%20meadows%20crystal%20clear%20lake%20reflection%20majestic%20peaks%20European%20nature%20travel%20destination%20blue%20sky%20pristine%20environment%20stunning%20scenery&width=1400&height=400&seq=switzerland-hero-001&orientation=landscape',
    approvalRate: 84.0,
    tips: [
      { icon: 'ri-money-euro-circle-line', title: 'Yüksek Yaşam Maliyeti', text: 'İsviçre, Avrupa\'nın en pahalı ülkesidir. Günlük en az 100 CHF (yaklaşık 105€) karşılığı bakiye göstermeniz önerilir.', type: 'warning' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'İsviçre Euro kullanmaz, İsviçre Frangı kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-calendar-check-line', title: 'Randevu Süreci (VFS Global)', text: 'İsviçre randevuları VFS Global üzerinden alınmaktadır. Sistem genellikle stabil çalışır; ancak yaz ve kış tatili dönemlerinde yoğunluk artabilir. Seyahat tarihinizden en az 6-8 hafta önce randevu almanız önerilir.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Güvenilir Süreç', text: 'İsviçre konsolosluğunda düzenli ve şeffaf çalışır. Başvurunuzu eksiksiz hazırlarsanız süreç sorunsuz ilerler ve genellikle 10 iş günü içinde sonuç alırsınız.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Doldurulmuş form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 100 CHF karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'İsviçre\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'croatia',
    name: 'Hırvatistan',
    flag: '🇭🇷',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Hırvatistan, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/hrv',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Dubrovnik%20Croatia%20old%20town%20medieval%20walls%20Adriatic%20sea%20limestone%20buildings%20historic%20city%20center%20UNESCO%20heritage%20European%20coastal%20city%20travel%20destination%20blue%20sky%20charming%20streets%20cultural%20landmark%20orange%20rooftops%20Mediterranean%20architecture&width=1400&height=400&seq=croatia-hero-001&orientation=landscape',
    approvalRate: 79.0,
    tips: [
      { icon: 'ri-calendar-check-line', title: 'Randevu Süreci (VFS Global)', text: 'Hırvatistan randevuları VFS Global üzerinden alınmaktadır. Yaz aylarında (Haziran-Ağustos) turizm yoğunluğu nedeniyle randevu bulmak güçleşebilir; seyahat tarihinizden en az 2 ay önce başvurmanız önerilir.', type: 'warning' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Hırvatistan, Batı Avrupa\'ya kıyasla oldukça uygun fiyatlıdır. Günlük 50-60€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-ship-line', title: 'Yaz Sezonu', text: 'Hırvatistan\'ın Adriyatik kıyıları yaz aylarında çok yoğundur. Konaklama rezervasyonlarınızı önceden yapmanız ve seyahat sigortanızın deniz aktivitelerini kapsamasına dikkat etmeniz önerilir.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'Schengen Üyesi', text: 'Hırvatistan 2023\'te Schengen bölgesine katıldı. Schengen vizesiyle Hırvatistan\'a giriş yapabilirsiniz.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Belçika\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'bulgaria',
    name: 'Bulgaristan',
    flag: '🇧🇬',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Bulgaristan, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/bgr',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Rila%20Monastery%20Bulgaria%20Orthodox%20Christian%20monastery%20mountain%20valley%20colorful%20frescoes%20historic%20architecture%20Bulgarian%20heritage%20UNESCO%20site%20travel%20destination%20blue%20sky%20cultural%20landmark%20Eastern%20European%20monastery%20ancient%20stone%20walls&width=1400&height=400&seq=bulgaria-hero-001&orientation=landscape',
    approvalRate: 81.2,
    tips: [
      { icon: 'ri-check-double-line', title: 'Yüksek Onay Oranı', text: 'Bulgaristan, Türk vatandaşlarına oldukça yüksek onay oranı veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Bulgaristan, Avrupa\'nın en uygun fiyatlı ülkelerinden biridir. Günlük 35-45€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Bulgaristan Euro kullanmaz, Bulgar Levası (BGN) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-calendar-check-line', title: 'Kolay Randevu', text: 'Bulgaristan konsolosluğunda randevu bulmak nispeten kolaydır. VFS Global sistemi üzerinden kısa sürede uygun tarih bulabilirsiniz.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 35€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen kapsamlı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Bulgaristan\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'romania',
    name: 'Romanya',
    flag: '🇷🇴',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'Romanya, turizm ve iş amaçlı vize başvuruları için gerekli evrakları inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/tur/tr/rou',
    appointmentStatus: [],
    heroImage: 'https://readdy.ai/api/search-image?query=Bran%20Castle%20Romania%20Transylvania%20medieval%20fortress%20Dracula%20castle%20mountain%20backdrop%20historic%20landmark%20Gothic%20architecture%20travel%20destination%20blue%20sky%20tourism%20photography%20charming%20old%20stone%20walls%20European%20culture%20Romanian%20heritage&width=1400&height=400&seq=romania-hero-001&orientation=landscape',
    approvalRate: 87.2,
    tips: [
      { icon: 'ri-check-double-line', title: 'Yüksek Onay Oranı', text: 'Romanya, Türk vatandaşlarına en yüksek onay oranı veren Schengen ülkelerinden biridir. Eksiksiz başvuru ile olumlu sonuç alma ihtimaliniz çok yüksektir.', type: 'success' },
      { icon: 'ri-money-euro-circle-line', title: 'Uygun Bütçe', text: 'Romanya, Avrupa\'nın en uygun fiyatlı ülkelerinden biridir. Günlük 35-45€ karşılığı bakiye yeterlidir.', type: 'success' },
      { icon: 'ri-exchange-line', title: 'Para Birimi', text: 'Romanya Euro kullanmaz, Romen Leyi (RON) kullanır. Ancak banka hesabınızda Euro veya TL göstermeniz yeterlidir.', type: 'info' },
      { icon: 'ri-calendar-check-line', title: 'Hızlı Randevu', text: 'Romanya konsolosluğunda randevu bulmak oldukça kolaydır. VFS Global sistemi üzerinden genellikle 1-2 hafta içinde uygun tarih bulabilirsiniz.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'VFS Global üzerinden doldurulmalı', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay', required: true, note: 'Günlük 40€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Gelir Belgesi', description: 'Vergi dairesinden gelir belgesi', required: false, note: 'Serbest meslek için', applicantType: 'self-employed' },
          { name: 'Emekli Belgesi', description: 'Emekli maaş belgesi', required: false, note: 'Emekliler için', applicantType: 'retired' },
          { name: 'Sponsor Belgesi', description: 'Masrafları karşılayacak kişinin noter onaylı belgesi', required: true, note: 'Öğrenciler için zorunlu', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Rezervasyonu', description: 'Gidiş-dönüş rezervasyon', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin onayı, maaş bilgisi ve pozisyonu içeren işveren yazısı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Öğrenci durum belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'Romanya\'dan davet mektubu', required: false, note: 'Ziyaret amaçlı ise', applicantType: 'all' }
        ]
      }
    }
  },
  {
    id: 'italy',
    name: 'İtalya',
    flag: '🇮🇹',
    region: 'Güney Avrupa',
    processingTime: '10-15 iş günü',
    visaFee: '90 €',
    validityPeriod: '90 gün',
    description: 'İtalya, tarihi zenginlikleri, sanat eserleri ve lezzetli mutfağıyla ünlüdür. Roma, Venedik, Floransa gibi şehirleri ziyaret etmek için vize başvuru evraklarını inceleyin.',
    consulates: ['İstanbul', 'Ankara'],
    appointmentProvider: 'iDATA',
    appointmentUrl: 'https://www.idata.com.tr',
    appointmentStatus: [
      {
        city: 'İstanbul',
        lastOpenedDate: '25.02.2026',
        soldOutUntil: '31.03.2026'
      },
      {
        city: 'İzmir',
        lastOpenedDate: '13.02.2026',
        soldOutUntil: '13.03.2026'
      }
    ],
    heroImage: 'https://readdy.ai/api/search-image?query=Colosseum%20Rome%20Italy%20ancient%20amphitheater%20Roman%20architecture%20historic%20landmark%20blue%20sky%20iconic%20monument%20archaeological%20site%20Italian%20heritage%20famous%20ruins%20travel%20destination%20classical%20architecture%20European%20history%20tourist%20attraction%20majestic%20structure&width=1400&height=400&seq=italy-hero-001&orientation=landscape',
    approvalRate: 91.1,
    tips: [
      { icon: 'ri-alarm-warning-line', title: 'Erken Randevu Alın (iDATA)', text: 'iDATA\'da randevu almak oldukça zordur. Yoğunluk yüzünden sistem ödeme ekranında sürekli hata verir. Seyahat tarihinizden en az 3 ay önce randevu almaya başlayın.', type: 'warning' },
      { icon: 'ri-time-line', title: 'Pasaport İnceleme Süresi', text: 'İstanbul Konsolosluğu pasaportları seyahat tarihinden 2-3 gün önce teslim ederken, İzmir Konsolosluğu yaklaşık 4-5 iş günü içinde teslim etmektedir.', type: 'info' },
      { icon: 'ri-parent-line', title: 'Öğrenci Sponsor Kuralı', text: 'İtalya, öğrenci başvurularında mutlaka ebeveyn sponsor belgesi ister. Arkadaş veya akraba sponsor kabul edilmez.', type: 'info' },
      { icon: 'ri-check-double-line', title: 'İlk Schengen Başvurusu İçin İdeal', text: 'İtalya, ilk kez Schengen vizesi başvurusu yapacaklar için şiddetle tavsiye edilir. Onay oranı oldukça yüksektir ve başvuru süreci nispeten kolaydır.', type: 'success' }
    ],
    documents: {
      temelEvraklar: {
        title: 'Temel Evraklar',
        icon: 'ri-file-text-line',
        items: [
          { name: 'Pasaport', description: 'Son 10 yıl içinde alınmış, en az 2 boş sayfası olan pasaport', required: true, note: 'Vize bitiminden 3 ay sonrası geçerli olmalı', applicantType: 'all' },
          { name: 'Vize Başvuru Formu', description: 'Eksiksiz doldurulmuş ve imzalanmış form', required: true, note: 'İtalya Konsolosluğu web sitesinden indirilebilir', applicantType: 'all' },
          { name: 'Biyometrik Fotoğraf', description: '35x45mm, son 6 ay içinde çekilmiş, 2 adet', required: true, note: 'Beyaz arka plan zorunludur', applicantType: 'all' },
          { name: 'Kimlik Fotokopisi', description: 'TC kimlik kartı fotokopisi', required: true, note: 'Ön ve arka yüz', applicantType: 'all' }
        ]
      },
      maliEvraklar: {
        title: 'Mali Belgeler',
        icon: 'ri-bank-card-line',
        items: [
          { name: 'Banka Hesap Dökümü', description: 'Son 3 ay banka hesap hareketleri', required: true, note: 'Günlük 50€ karşılığı bakiye önerilir', applicantType: 'all' },
          { name: 'Maaş Bordrosu', description: 'Son 3 ay maaş bordroları', required: true, note: 'Çalışanlar için zorunlu', applicantType: 'employee' },
          { name: 'Ebeveyn Sponsor Belgesi', description: 'Ebeveynin mali durumunu gösteren belgeler (banka hesap dökümü, maaş bordrosu, işveren yazısı)', required: true, note: 'Öğrenciler için zorunlu - Ebeveyn sponsor göstermesi gereklidir', applicantType: 'student' },
          { name: 'Sponsor Taahhütnamesi', description: 'Ebeveynin not not noter onaylı taahhüt mektubu', required: true, note: 'Öğrenciler için zorunlu - Masrafları karşılayacağına dair', applicantType: 'student' }
        ]
      },
      seyahatEvraklar: {
        title: 'Seyahat Belgeleri',
        icon: 'ri-plane-line',
        items: [
          { name: 'Uçak Bileti Rezervasyonu', description: 'Gidiş-dönüş rezervasyonu', required: true, note: 'Onaydan sonra satın alın', applicantType: 'all' },
          { name: 'Seyahat Sigortası', description: '30.000€ teminatlı seyahat sigortası', required: true, note: 'Schengen bölgesini kapsamalı', applicantType: 'all' },
          { name: 'Otel Rezervasyonu', description: 'Konaklama belgesi', required: true, note: 'Tüm geceleri kapsamalı', applicantType: 'all' },
          { name: 'Seyahat Planı', description: 'Detaylı gezi programı', required: false, note: 'Önerilir', applicantType: 'all' }
        ]
      },
      isEvraklar: {
        title: 'İş/Eğitim Belgeleri',
        icon: 'ri-briefcase-line',
        items: [
          { name: 'İşveren Yazısı', description: 'İzin ve maaş bilgisi içeren yazı', required: true, note: 'Kaşeli ve imzalı', applicantType: 'employee' },
          { name: 'SGK Dökümü', description: 'Son 4 ay SGK prim dökümü', required: true, note: 'e-Devlet\'ten alınabilir', applicantType: 'employee' },
          { name: 'Şirket Belgeleri', description: 'Ticaret sicil gazetesi', required: false, note: 'İş sahipleri için', applicantType: 'self-employed' },
          { name: 'Öğrenci Belgesi', description: 'Okul kayıt belgesi', required: false, note: 'Öğrenciler için', applicantType: 'student' },
          { name: 'Okul İzin Belgesi', description: 'Okuldan alınan izin belgesi', required: false, note: 'Öğrenciler için zorunlu', applicantType: 'student' },
          { name: 'Emeklilik Belgesi', description: 'SGK emeklilik belgesi', required: true, note: 'Emekliler için zorunlu', applicantType: 'retired' }
        ]
      },
      ekEvraklar: {
        title: 'Ek Belgeler',
        icon: 'ri-folder-add-line',
        items: [
          { name: 'Aile Cüzdanı', description: 'Evlilik cüzdanı fotokopisi', required: false, note: 'Evliler için', applicantType: 'all' },
          { name: 'Tapu/Araç Ruhsatı', description: 'Mülkiyet belgeleri', required: false, note: 'Bağlayıcılık kanıtı', applicantType: 'all' },
          { name: 'Eski Vize Fotokopileri', description: 'Önceki Schengen vizeleri', required: false, note: 'Varsa ekleyin', applicantType: 'all' },
          { name: 'Davetiye Mektubu', description: 'İtalya\'dan davet mektubu', required: false, note: 'Ziyaret için', applicantType: 'all' },
          { name: 'Eski Vizeler', description: 'Önceki vizeler', required: false, note: 'Varsa', applicantType: 'all' }
        ]
      }
    }
  }
];

export const relatedCountries = [
  { id: 'germany', name: 'Almanya', flag: '🇩🇪', processingTime: '10-15 gün', documentCount: 18 },
  { id: 'france', name: 'Fransa', flag: '🇫🇷', processingTime: '15-20 gün', documentCount: 17 },
  { id: 'italy', name: 'İtalya', flag: '🇮🇹', processingTime: '10-15 gün', documentCount: 16 }
];

export const allSchengenCountries = [
  { id: 'germany', name: 'Almanya', flag: '🇩🇪', capital: 'Berlin', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 18, popular: true, region: 'Orta Avrupa', approvalRate: 78.0 },
  { id: 'france', name: 'Fransa', flag: '🇫🇷', capital: 'Paris', processingTime: '15-20 iş günü', visaFee: '90 €', documentCount: 17, popular: true, region: 'Batı Avrupa', approvalRate: 85.4 },
  { id: 'italy', name: 'İtalya', flag: '🇮🇹', capital: 'Roma', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Güney Avrupa', approvalRate: 91.1 },
  { id: 'spain', name: 'İspanya', flag: '🇪🇸', capital: 'Madrid', processingTime: '15-20 iş günü', visaFee: '90 €', documentCount: 17, popular: true, region: 'Güney Avrupa', approvalRate: 86.5 },
  { id: 'netherlands', name: 'Hollanda', flag: '🇳🇱', capital: 'Amsterdam', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Batı Avrupa', approvalRate: 80.0 },
  { id: 'austria', name: 'Avusturya', flag: '🇦🇹', capital: 'Viyana', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Orta Avrupa', approvalRate: 83.0 },
  { id: 'belgium', name: 'Belçika', flag: '🇧🇪', capital: 'Brüksel', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Batı Avrupa', approvalRate: 72.5 },
  { id: 'czech', name: 'Çekya', flag: '🇨🇿', capital: 'Prag', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Orta Avrupa', approvalRate: 79.4 },
  { id: 'denmark', name: 'Danimarka', flag: '🇩🇰', capital: 'Kopenhagen', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Kuzey Avrupa', approvalRate: 60.6 },
  { id: 'estonia', name: 'Estonya', flag: '🇪🇪', capital: 'Tallinn', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Kuzey Avrupa', approvalRate: 57.5 },
  { id: 'finland', name: 'Finlandiya', flag: '🇫🇮', capital: 'Helsinki', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Kuzey Avrupa', approvalRate: 68.7 },
  { id: 'greece', name: 'Yunanistan', flag: '🇬🇷', capital: 'Atina', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Güney Avrupa', approvalRate: 85.4 },
  { id: 'hungary', name: 'Macaristan', flag: '🇭🇺', capital: 'Budapeşte', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Orta Avrupa', approvalRate: 85.1 },
  { id: 'iceland', name: 'İzlanda', flag: '🇮🇸', capital: 'Reykjavik', processingTime: '15-20 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Kuzey Avrupa', approvalRate: 82.0 },
  { id: 'latvia', name: 'Letonya', flag: '🇱🇻', capital: 'Riga', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Kuzey Avrupa', approvalRate: 75.0 },
  { id: 'liechtenstein', name: 'Lihtenştayn', flag: '🇱🇮', capital: 'Vaduz', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Orta Avrupa', approvalRate: 82.3 },
  { id: 'lithuania', name: 'Litvanya', flag: '🇱🇹', capital: 'Vilnius', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Kuzey Avrupa', approvalRate: 66.0 },
  { id: 'luxembourg', name: 'Lüksemburg', flag: '🇱🇺', capital: 'Lüksemburg', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Batı Avrupa', approvalRate: 83.0 },
  { id: 'portugal', name: 'Portekiz', flag: '🇵🇹', capital: 'Lizbon', processingTime: '15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Güney Avrupa', approvalRate: 93.0 },
  { id: 'slovakia', name: 'Slovakya', flag: '🇸🇰', capital: 'Bratislava', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Orta Avrupa', approvalRate: 88.8 },
  { id: 'slovenia', name: 'Slovenya', flag: '🇸🇮', capital: 'Ljubljana', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Güney Avrupa', approvalRate: 89.1 },
  { id: 'sweden', name: 'İsveç', flag: '🇸🇪', capital: 'Stockholm', processingTime: '15-20 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Kuzey Avrupa', approvalRate: 80.8 },
  { id: 'switzerland', name: 'İsviçre', flag: '🇨🇭', capital: 'Bern', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 16, popular: true, region: 'Orta Avrupa', approvalRate: 84.0 },
  { id: 'croatia', name: 'Hırvatistan', flag: '🇭🇷', capital: 'Zagreb', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Güney Avrupa', approvalRate: 79.0 },
  { id: 'bulgaria', name: 'Bulgaristan', flag: '🇧🇬', capital: 'Sofya', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Güney Avrupa', approvalRate: 81.2 },
  { id: 'romania', name: 'Romanya', flag: '🇷🇴', capital: 'Bükreş', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Güney Avrupa', approvalRate: 87.2 },
  { id: 'malta', name: 'Malta', flag: '🇲🇹', capital: 'Valletta', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Güney Avrupa', approvalRate: 61.5 },
  { id: 'norway', name: 'Norveç', flag: '🇳🇴', capital: 'Oslo', processingTime: '15-20 iş günü', visaFee: '90 €', documentCount: 16, popular: false, region: 'Kuzey Avrupa', approvalRate: 79.0 },
  { id: 'poland', name: 'Polonya', flag: '🇵🇱', capital: 'Varşova', processingTime: '10-15 iş günü', visaFee: '90 €', documentCount: 15, popular: false, region: 'Orta Avrupa', approvalRate: 82.6 },
];
