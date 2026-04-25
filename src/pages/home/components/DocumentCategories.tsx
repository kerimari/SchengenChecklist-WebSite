import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Document {
  name: string;
  required: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  tip: string;
  documents: Document[];
}

const categories: Category[] = [
  {
    id: 'identity',
    name: 'Kimlik Belgeleri',
    icon: 'ri-id-card-line',
    color: '#e65100',
    bgColor: '#fff3e0',
    borderColor: '#ffcc80',
    description: 'Başvurunun temelini oluşturan kimlik ve kişisel belgeler.',
    tip: 'Pasaportunuzun vize bitiş tarihinden en az 3 ay sonrasına kadar geçerli olması zorunludur.',
    documents: [
      { name: 'Geçerli Pasaport (en az 2 boş sayfa)', required: true },
      { name: 'Eski Pasaportlar (varsa)', required: false },
      { name: 'Nüfus Cüzdanı / TC Kimlik Kartı Fotokopisi', required: true },
      { name: 'Biyometrik Fotoğraf (35x45mm, 2 adet)', required: true },
      { name: 'Schengen Vize Başvuru Formu', required: true },
      { name: 'Evlilik Cüzdanı Fotokopisi (evliyse)', required: false },
    ]
  },
  {
    id: 'financial',
    name: 'Mali Belgeler',
    icon: 'ri-money-dollar-circle-line',
    color: '#2e7d32',
    bgColor: '#e8f5e9',
    borderColor: '#a5d6a7',
    description: 'Seyahat masraflarını karşılayabileceğinizi kanıtlayan finansal belgeler.',
    tip: 'Çoğu ülke için günlük en az 50€ karşılığı bakiye önerilir. Hesap hareketleri düzenli görünmeli.',
    documents: [
      { name: 'Son 3 Aylık Banka Hesap Dökümü (kaşeli)', required: true },
      { name: 'Maaş Bordrosu (son 3 ay)', required: true },
      { name: 'Vergi Levhası (serbest meslek)', required: false },
      { name: 'Emekli Maaş Belgesi (emekliler)', required: false },
      { name: 'Sponsor Taahhütnamesi (öğrenciler)', required: false },
      { name: 'Vergi Beyannamesi (son yıl)', required: false },
    ]
  },
  {
    id: 'travel',
    name: 'Seyahat Belgeleri',
    icon: 'ri-flight-takeoff-line',
    color: '#1565c0',
    bgColor: '#e3f2fd',
    borderColor: '#90caf9',
    description: 'Seyahat planınızı ve güzergahınızı belgeleyen evraklar.',
    tip: 'Uçak biletini vize onayından önce satın almayın; rezervasyon belgesi yeterlidir.',
    documents: [
      { name: 'Gidiş-Dönüş Uçak Bileti Rezervasyonu', required: true },
      { name: 'Seyahat Sağlık Sigortası (min. 30.000€)', required: true },
      { name: 'Otel / Konaklama Rezervasyonu', required: true },
      { name: 'Detaylı Seyahat Planı (günlük)', required: false },
      { name: 'Feribot / Tren Rezervasyonu (gerekirse)', required: false },
      { name: 'Araç Kiralama Belgesi (gerekirse)', required: false },
    ]
  },
  {
    id: 'work-education',
    name: 'İş / Eğitim',
    icon: 'ri-briefcase-line',
    color: '#6a1b9a',
    bgColor: '#f3e5f5',
    borderColor: '#ce93d8',
    description: 'Çalışma veya öğrencilik durumunuzu kanıtlayan belgeler.',
    tip: 'İşveren yazısı antetli kağıda, kaşeli ve imzalı olmalı; izin tarihleri açıkça belirtilmelidir.',
    documents: [
      { name: 'İşveren İzin Yazısı (çalışanlar)', required: true },
      { name: 'SGK Prim Dökümü - son 4 ay (çalışanlar)', required: true },
      { name: 'Öğrenci Belgesi / Transkript (öğrenciler)', required: true },
      { name: 'Okul İzin Belgesi (öğrenciler)', required: true },
      { name: 'Ticaret Sicil Gazetesi (iş sahipleri)', required: false },
      { name: 'Emeklilik Belgesi (emekliler)', required: false },
    ]
  },
  {
    id: 'health',
    name: 'Sağlık Belgeleri',
    icon: 'ri-heart-pulse-line',
    color: '#c62828',
    bgColor: '#ffebee',
    borderColor: '#ef9a9a',
    description: 'Seyahat süresince sağlık güvencenizi belgeleyen evraklar.',
    tip: 'Sigorta poliçesi tüm Schengen ülkelerini kapsamalı ve seyahat tarihlerini içermelidir.',
    documents: [
      { name: 'Seyahat Sağlık Sigortası Poliçesi', required: true },
      { name: 'Sigorta Ödeme Makbuzu', required: true },
      { name: 'Kronik Hastalık Raporu (varsa)', required: false },
      { name: 'Kullanılan İlaçların Reçetesi (varsa)', required: false },
      { name: 'Aile Hekimi Sağlık Raporu (65 yaş üstü)', required: false },
      { name: 'Engellilik Belgesi (gerekirse)', required: false },
    ]
  },
  {
    id: 'accommodation',
    name: 'Konaklama Belgeleri',
    icon: 'ri-hotel-line',
    color: '#00838f',
    bgColor: '#e0f7fa',
    borderColor: '#80deea',
    description: 'Seyahat süresince nerede kalacağınızı gösteren belgeler.',
    tip: 'Konaklama belgesi tüm geceleri kapsamalı; aralıklı tarihler varsa her biri için ayrı rezervasyon gerekir.',
    documents: [
      { name: 'Otel Rezervasyon Belgesi (tüm geceler)', required: true },
      { name: 'Airbnb / Kiralık Daire Sözleşmesi', required: false },
      { name: 'Davetiye Mektubu (akraba/arkadaş ziyareti)', required: false },
      { name: 'Attestation d\'Accueil (Fransa için)', required: false },
      { name: 'Ev Sahibi Kimlik Fotokopisi (davetli ise)', required: false },
      { name: 'Konaklama Adresi Listesi', required: false },
    ]
  },
  {
    id: 'insurance',
    name: 'Sigorta Belgeleri',
    icon: 'ri-shield-check-line',
    color: '#283593',
    bgColor: '#e8eaf6',
    borderColor: '#9fa8da',
    description: 'Zorunlu seyahat sigortası ve ek güvence belgeleri.',
    tip: 'Sigorta poliçenizin İngilizce veya Almanca olması başvuruyu hızlandırır.',
    documents: [
      { name: 'Seyahat Sigortası Poliçesi (min. 30.000€)', required: true },
      { name: 'Sigorta Şirketi Onay Belgesi', required: true },
      { name: 'Acil Yardım Telefon Numarası Belgesi', required: true },
      { name: 'Ek Sağlık Sigortası (isteğe bağlı)', required: false },
      { name: 'Bagaj Sigortası Belgesi (isteğe bağlı)', required: false },
      { name: 'İptal Sigortası Belgesi (isteğe bağlı)', required: false },
    ]
  },
  {
    id: 'additional',
    name: 'Ek / Destekleyici',
    icon: 'ri-file-add-line',
    color: '#37474f',
    bgColor: '#eceff1',
    borderColor: '#b0bec5',
    description: 'Başvurunuzu güçlendiren ve bağlayıcılık kanıtı sağlayan ek belgeler.',
    tip: 'Tapu, araç ruhsatı gibi mülkiyet belgeleri Türkiye\'ye dönüş niyetinizi kanıtlar ve vize onay şansını artırır.',
    documents: [
      { name: 'Tapu Fotokopisi (mülk sahibiyse)', required: false },
      { name: 'Araç Ruhsatı Fotokopisi', required: false },
      { name: 'Önceki Schengen Vize Fotokopileri', required: false },
      { name: 'Veli İzin Belgesi (18 yaş altı, noter onaylı)', required: false },
      { name: 'Davetiye Mektubu (iş ziyareti)', required: false },
      { name: 'Ticaret Odası Üyelik Belgesi', required: false },
    ]
  }
];

export default function DocumentCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return null;
}
