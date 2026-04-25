
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  'Vize ücreti ne kadar?',
  'Hangi belgeler gerekli?',
  'Kaç günde sonuçlanır?',
  'Sigorta şartları neler?',
  'Banka bakiyesi ne kadar olmalı?',
  'Fotoğraf özellikleri neler?',
  'Çocuklar için vize ücreti?',
  'Pasaport geçerlilik süresi?',
];

const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('ücret') || lowerMessage.includes('fiyat') || lowerMessage.includes('para') || lowerMessage.includes('maliyet')) {
    return '💶 Schengen vize ücreti 2025 itibarıyla:\n\n• Yetişkin: 90 EUR\n• 6–12 yaş çocuk: 45 EUR\n• 0–6 yaş çocuk: Ücretsiz\n\nBuna ek olarak VFS Global veya iDATA gibi aracı kurumların hizmet bedeli (20–40 EUR) ayrıca ödenir.';
  }

  if (lowerMessage.includes('randevu') || lowerMessage.includes('başvur')) {
    return '📅 Randevu bilgileri:\n\n• En erken 6 ay (180 gün) öncesinden başvurabilirsiniz\n• En geç seyahatten 15 gün önce başvurmanız gerekir\n• Randevu için ilgili ülkenin konsolosluğu veya VFS Global/iDATA üzerinden işlem yapabilirsiniz\n\nÜlke sayfasından "Randevu Al" butonuna tıklayarak yönlendirilirsiniz.';
  }

  if (lowerMessage.includes('belge') || lowerMessage.includes('evrak') || lowerMessage.includes('doküman') || lowerMessage.includes('gerekli')) {
    return '📋 Temel belgeler şunlardır:\n\n• Geçerli pasaport (en az 3 ay geçerli)\n• Doldurulmuş vize başvuru formu\n• Biyometrik fotoğraf (35x45 mm)\n• Seyahat sağlık sigortası (min. 30.000 EUR)\n• Uçak bileti rezervasyonu\n• Konaklama rezervasyonu\n• Son 3–6 aylık banka hesap özeti\n• İşyeri yazısı / öğrenci belgesi\n• SGK hizmet dökümü\n\nDetaylı liste için ilgili ülke sayfasını ziyaret edin.';
  }

  if (lowerMessage.includes('süre') || lowerMessage.includes('kaç gün') || lowerMessage.includes('ne kadar') || lowerMessage.includes('sonuçlan')) {
    return '⏱️ Vize işlem süreleri:\n\n• Standart: 15 takvim günü\n• Uzatılmış inceleme: 45 takvim gününe kadar\n• Ekspres (bazı ülkeler): 48–72 saat\n\nBaşvurunuzu seyahatinizden en az 3–4 hafta önce yapmanız önerilir.';
  }

  if (lowerMessage.includes('red') || lowerMessage.includes('reddedil') || lowerMessage.includes('kabul') || lowerMessage.includes('itiraz')) {
    return '❌ Red ve itiraz hakkında:\n\n• Red kararına 15 gün içinde itiraz edebilirsiniz\n• İtiraz dilekçesi konsolosluğa yazılı olarak iletilir\n• Red oranını düşürmek için: eksiksiz belge, yeterli banka bakiyesi ve güçlü seyahat geçmişi önemlidir\n• Önceki Schengen vizesi almış olmak başvuruyu güçlendirir';
  }

  if (lowerMessage.includes('sigorta') || lowerMessage.includes('sağlık')) {
    return '🏥 Seyahat sağlık sigortası şartları:\n\n• Minimum teminat: 30.000 EUR\n• Tüm Schengen ülkelerinde geçerli olmalı\n• Seyahatin tüm süresini kapsamalı\n• Acil tıbbi yardım ve repatriyasyon dahil olmalı\n• Poliçe Türkçe ve İngilizce olabilir\n\nAXA, Allianz, Mapfre gibi firmalar Schengen uyumlu poliçe sunmaktadır.';
  }

  if (lowerMessage.includes('banka') || lowerMessage.includes('hesap') || lowerMessage.includes('bakiye') || lowerMessage.includes('gelir')) {
    return '💳 Finansal yeterlilik:\n\n• Günlük yaklaşık 50–100 EUR karşılığı bakiye önerilir\n• Son 3–6 aylık hesap özeti istenir\n• Düzenli maaş girişleri başvuruyu güçlendirir\n• Hesapta ani büyük para hareketleri şüphe yaratabilir\n• Serbest meslek sahipleri için vergi levhası ve gelir belgesi de gereklidir';
  }

  if (lowerMessage.includes('pasaport')) {
    return '🛂 Pasaport gereksinimleri:\n\n• Dönüş tarihinden itibaren en az 3 ay (uzmanlar 6 ay önerir) geçerli olmalı\n• Düzenlenme tarihinin üzerinden 10 yıldan fazla geçmemiş olmalı\n• En az 2 boş sayfası bulunmalı\n• Hasarlı veya yıpranmış pasaportlar reddedilebilir\n\nPasaportunuz bu şartları sağlamıyorsa yenilemeniz önerilir.';
  }

  if (lowerMessage.includes('fotoğraf') || lowerMessage.includes('resim') || lowerMessage.includes('biyometrik')) {
    return '📸 Biyometrik fotoğraf özellikleri:\n\n• Boyut: 35x45 mm\n• Zemin: Beyaz veya açık gri\n• Son 6 ay içinde çekilmiş olmalı\n• Yüz net, düz bakışlı ve ifadesiz\n• Gözlük artık genellikle kabul edilmiyor\n• Başlık/şapka yasak (dini sebepler hariç)\n• Dijital fotoğraf da kabul edilebilir (konsolosluğa göre değişir)';
  }

  if (lowerMessage.includes('çocuk') || lowerMessage.includes('bebek') || lowerMessage.includes('küçük') || lowerMessage.includes('aile')) {
    return '👶 Çocuklar için vize:\n\n• 6 yaş altı: Ücretsiz\n• 6–12 yaş: 45 EUR\n• 12 yaş üstü: 90 EUR (yetişkin ücreti)\n\nGerekli ek belgeler:\n• Veli izin belgesi (noter onaylı)\n• Nüfus cüzdanı sureti\n• Doğum belgesi\n• Ebeveyn pasaport fotokopisi';
  }

  if (lowerMessage.includes('öğrenci') || lowerMessage.includes('okul') || lowerMessage.includes('üniversite')) {
    return '🎓 Öğrenciler için vize:\n\n• Öğrenci belgesi / öğrenci kimliği\n• Okul yazısı (izin belgesi)\n• Çalışmıyorsanız veli sponsor mektubu\n• Velinin banka hesap özeti\n• Burs alıyorsanız burs belgesi\n\nÖğrenci vizesi için ek belgeler istenebilir, ülke sayfasını kontrol edin.';
  }

  if (lowerMessage.includes('iş') || lowerMessage.includes('çalış') || lowerMessage.includes('şirket') || lowerMessage.includes('sgk')) {
    return '💼 Çalışanlar için gerekli belgeler:\n\n• İşyeri yazısı (izin belgesi + görev belgesi)\n• Son 3 aylık maaş bordrosu\n• SGK hizmet dökümü\n• Vergi levhası (serbest meslek için)\n• Faaliyet belgesi (serbest meslek için)\n\nİşyeri yazısı Almanca veya İngilizce olmalı ya da noter onaylı tercümesi eklenmelidir.';
  }

  if (lowerMessage.includes('konaklama') || lowerMessage.includes('otel') || lowerMessage.includes('airbnb') || lowerMessage.includes('rezervasyon')) {
    return '🏨 Konaklama belgesi:\n\n• Otel rezervasyonu (ödeme yapılmamış olabilir)\n• Airbnb veya kiralık daire sözleşmesi\n• Akraba/arkadaş evinde kalıyorsanız davet mektubu + ev sahibinin pasaport fotokopisi\n\nRezervasyon iptal edilebilir türde olabilir, ödeme zorunlu değildir.';
  }

  if (lowerMessage.includes('uçak') || lowerMessage.includes('bilet') || lowerMessage.includes('uçuş')) {
    return '✈️ Uçak bileti:\n\n• Kesin bilet yerine rezervasyon (PNR kodu olan) yeterlidir\n• Gidiş-dönüş rezervasyonu olmalı\n• Vize onaylanmadan kesin bilet almanız gerekmez\n• Rezervasyon, vize başvuru tarihinizden sonraki bir tarihe ait olmalı';
  }

  if (lowerMessage.includes('hangi ülke') || lowerMessage.includes('ülkeler') || lowerMessage.includes('schengen ülke')) {
    return '🌍 Schengen Bölgesi\'nde 29 ülke bulunmaktadır:\n\nAlmanya, Avusturya, Belçika, Çekya, Danimarka, Estonya, Finlandiya, Fransa, Hollanda, İspanya, İsveç, İsviçre, İtalya, İzlanda, Letonya, Liechtenstein, Litvanya, Lüksemburg, Macaristan, Malta, Norveç, Polonya, Portekiz, Romanya, Slovakya, Slovenya, Yunanistan ve diğerleri.\n\nHer ülkenin detaylı belge listesi için Ülkeler sayfasını ziyaret edin.';
  }

  if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('iyi günler') || lowerMessage.includes('nasılsın')) {
    return '👋 Merhaba! Ben Schengo, Schengen vize asistanınızım.\n\nSize şu konularda yardımcı olabilirim:\n• Gerekli belgeler\n• Vize ücretleri\n• Başvuru süreci\n• Sigorta şartları\n• Ülkeye özel bilgiler\n\nNe öğrenmek istersiniz?';
  }

  if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağ ol') || lowerMessage.includes('tamam')) {
    return '😊 Rica ederim! Başka sorularınız olursa buradayım. Vize başvurunuzun başarıyla sonuçlanmasını dilerim! 🍀';
  }

  return '🤔 Bu konuda daha fazla bilgim yok. Şunları deneyebilirsiniz:\n\n• SSS sayfamızı ziyaret edin\n• İlgili ülke sayfasından detaylı bilgi alın\n• İletişim formu üzerinden bize ulaşın\n\nBaşka bir konuda yardımcı olabilir miyim?';
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben **Schengo**, Schengen vize asistanınızım. 👋\n\nVize başvurusu, gerekli belgeler veya ülke bilgileri hakkında sorularınızı yanıtlayabilirim. Aşağıdaki hızlı sorulardan birini seçebilir ya da kendi sorunuzu yazabilirsiniz.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setShowQuickQuestions(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 900);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(inputText);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split('**').map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[560px]'
          }`}
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a237e] to-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                  <span className="text-2xl leading-none select-none" style={{ fontFamily: 'Segoe UI Emoji, Apple Color Emoji, sans-serif' }}>🌍</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                  Schengo
                  <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full font-normal">AI</span>
                </h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  Schengen Vize Asistanı
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                title={isMinimized ? 'Genişlet' : 'Küçült'}
              >
                <i className={`${isMinimized ? 'ri-arrow-up-s-line' : 'ri-subtract-line'} text-lg`}></i>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full flex-shrink-0 mt-1 border border-gray-100 shadow-sm overflow-hidden">
                        <span className="text-base leading-none select-none" style={{ fontFamily: 'Segoe UI Emoji, Apple Color Emoji, sans-serif' }}>🌍</span>
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 max-w-[78%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-[#1a237e] to-teal-700 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{renderText(message.text)}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 px-1">{formatTime(message.timestamp)}</span>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full flex-shrink-0 mt-1">
                        <i className="ri-user-3-fill text-gray-500 text-sm"></i>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full flex-shrink-0 border border-gray-100 shadow-sm overflow-hidden">
                      <span className="text-base leading-none select-none" style={{ fontFamily: 'Segoe UI Emoji, Apple Color Emoji, sans-serif' }}>🌍</span>
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Questions */}
                {showQuickQuestions && messages.length === 1 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-2 px-1">Hızlı sorular:</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-400 px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex-shrink-0">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Sorunuzu yazın..."
                    className="flex-1 px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm transition-all"
                  />
                  <button
                    onClick={() => sendMessage(inputText)}
                    disabled={!inputText.trim() || isTyping}
                    className="w-10 h-10 bg-gradient-to-br from-[#1a237e] to-teal-600 text-white rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <i className="ri-send-plane-fill text-base"></i>
                  </button>
                </div>
                <p className="text-[10px] text-gray-300 text-center mt-2">Schengo · AI destekli vize asistanı</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-gradient-to-br from-[#1a237e] to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-50 cursor-pointer whitespace-nowrap"
        aria-label="Schengo Chatbot"
        style={{ boxShadow: '0 8px 30px rgba(26,35,126,0.4)' }}
      >
        {isOpen ? (
          <i className="ri-close-line text-2xl"></i>
        ) : (
          <span className="text-2xl leading-none select-none" style={{ fontFamily: 'Segoe UI Emoji, Apple Color Emoji, sans-serif' }}>🌍</span>
        )}
      </button>
    </>
  );
};

export default Chatbot;
