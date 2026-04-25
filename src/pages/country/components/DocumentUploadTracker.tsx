
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';

interface UploadedDocument {
  id: string;
  name: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  note?: string;
}

interface DocumentUploadTrackerProps {
  countryId: string;
  countryName: string;
}

export default function DocumentUploadTracker({ countryId, countryName }: DocumentUploadTrackerProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('passport');
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: 'passport', name: 'Pasaport', icon: 'ri-passport-line' },
    { id: 'photo', name: 'Fotoğraf', icon: 'ri-camera-line' },
    { id: 'insurance', name: 'Sigorta', icon: 'ri-shield-check-line' },
    { id: 'financial', name: 'Mali Belgeler', icon: 'ri-bank-card-line' },
    { id: 'accommodation', name: 'Konaklama', icon: 'ri-hotel-line' },
    { id: 'flight', name: 'Uçuş Bileti', icon: 'ri-flight-takeoff-line' },
    { id: 'employment', name: 'İş Belgesi', icon: 'ri-briefcase-line' },
    { id: 'other', name: 'Diğer', icon: 'ri-file-add-line' },
  ];

  // Get user-specific storage key
  const getStorageKey = () => {
    if (!user) return null;
    return `docs_${user.email}_${countryId}`;
  };

  // Load from localStorage (user-specific)
  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setUploadedDocs(JSON.parse(saved));
      }
    }
  }, [countryId, user]);

  // Save to localStorage (user-specific)
  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey && uploadedDocs.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(uploadedDocs));
    }
  }, [uploadedDocs, countryId, user]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const category = categories.find(c => c.id === selectedCategory);
    const newDocs: UploadedDocument[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: category?.name || 'Belge',
      fileName: file.name,
      uploadDate: new Date().toLocaleDateString('tr-TR'),
      status: 'pending' as const,
    }));

    setUploadedDocs(prev => [...prev, ...newDocs]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeDocument = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
    const remaining = uploadedDocs.filter(doc => doc.id !== id);
    const storageKey = getStorageKey();
    if (remaining.length === 0 && storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      default: return 'İnceleniyor';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return 'ri-check-line';
      case 'rejected': return 'ri-close-line';
      default: return 'ri-time-line';
    }
  };

  const completedCount = uploadedDocs.filter(d => d.status === 'approved').length;
  const pendingCount = uploadedDocs.filter(d => d.status === 'pending').length;

  // Don't show if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 bg-gradient-to-r from-[#00bcd4] to-[#0097a7] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      >
        <div className="relative">
          <i className="ri-upload-cloud-2-line text-2xl"></i>
          {uploadedDocs.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#1a237e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {uploadedDocs.length}
            </span>
          )}
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Evrak Yükle & Takip Et
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">Evrak Yükleme & Takip</h2>
                  <p className="text-white/80 text-sm">{countryName} vize başvurusu için evraklarınızı yükleyin</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <i className="ri-file-list-3-line text-sm"></i>
                  <span className="text-xs sm:text-sm">{uploadedDocs.length} Yüklendi</span>
                </div>
                <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <i className="ri-time-line text-sm"></i>
                  <span className="text-xs sm:text-sm">{pendingCount} Bekliyor</span>
                </div>
                <div className="bg-white/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <i className="ri-check-double-line text-sm"></i>
                  <span className="text-xs sm:text-sm">{completedCount} Onaylı</span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Success Message */}
              {showSuccess && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Evrak başarıyla yüklendi!</p>
                    <p className="text-sm text-green-600">Evrakınız inceleme için sıraya alındı.</p>
                  </div>
                </div>
              )}

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Evrak Kategorisi Seçin</label>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'border-[#00bcd4] bg-[#00bcd4]/10 text-[#00bcd4]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <i className={`${cat.icon} text-xl`}></i>
                      <span className="text-xs font-medium text-center">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-[#00bcd4] bg-[#00bcd4]/10'
                    : 'border-gray-300 hover:border-[#00bcd4]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-[#00bcd4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-upload-cloud-2-line text-3xl text-[#00bcd4]"></i>
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  Dosyalarınızı sürükleyip bırakın
                </p>
                <p className="text-gray-500 text-sm mb-4">veya</p>
                <label className="inline-flex items-center gap-2 bg-[#00bcd4] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#00a5b5] transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-folder-open-line"></i>
                  Dosya Seç
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileInput}
                  />
                </label>
                <p className="text-gray-400 text-xs mt-4">
                  PDF, JPG, PNG, DOC formatları desteklenir (Maks. 10MB)
                </p>
              </div>

              {/* Uploaded Documents List */}
              {uploadedDocs.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Yüklenen Evraklar ({uploadedDocs.length})</h3>
                  <div className="space-y-3">
                    {uploadedDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <i className="ri-file-text-line text-[#00bcd4] text-xl"></i>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-gray-500 text-xs">{doc.fileName}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{doc.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                            <i className={getStatusIcon(doc.status)}></i>
                            {getStatusText(doc.status)}
                          </span>
                          <button
                            onClick={() => removeDocument(doc.id)}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-information-line text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">Evrak Takip Sistemi</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Yüklediğiniz evraklar hesabınıza özel olarak saklanır. 
                    Başvuru sürecinizi takip etmek ve eksik evraklarınızı görmek için bu sistemi kullanabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
