import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: 'En az 8 karakter', test: (pwd) => pwd.length >= 8 },
  { label: 'En az 1 büyük harf (A-Z)', test: (pwd) => /[A-Z]/.test(pwd) },
  { label: 'En az 1 küçük harf (a-z)', test: (pwd) => /[a-z]/.test(pwd) },
  { label: 'En az 1 rakam (0-9)', test: (pwd) => /[0-9]/.test(pwd) },
  { label: 'En az 1 özel karakter (!@#$%^&*)', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [consents, setConsents] = useState({
    kvkk: false,
    privacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad zorunludur';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
    } else {
      const allRequirementsMet = passwordRequirements.every(req => req.test(formData.password));
      if (!allRequirementsMet) {
        newErrors.password = 'Şifre tüm gereksinimleri karşılamalıdır';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!consents.kvkk) {
      newErrors.kvkk = 'KVKK Aydınlatma Metnini onaylamanız zorunludur';
    }

    if (!consents.privacy) {
      newErrors.privacy = 'Gizlilik Politikasını onaylamanız zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const success = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: ''
    });

    setIsLoading(false);

    if (success) {
      setRegistrationSuccess(true);
    } else {
      setErrors({ email: 'Bu e-posta adresi zaten kullanılıyor' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleConsentChange = (field: 'kvkk' | 'privacy', value: boolean) => {
    setConsents(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Kayıt başarılı ekranı
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-4xl text-teal-600"></i>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Hesabınız Oluşturuldu!</h1>
            
            <p className="text-gray-600 mb-6">
              Kayıt işleminiz başarıyla tamamlandı. Artık giriş yapabilirsiniz.
            </p>

            <Link
              to="/login"
              className="w-full inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <i className="ri-passport-line text-4xl text-teal-600"></i>
              <span className="text-2xl font-bold text-gray-900">Schengen Checklist</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Oluştur</h1>
          <p className="text-gray-600">Vize başvuru sürecinizi takip edin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm`}
                  placeholder="Adınız"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm`}
                  placeholder="Soyadınız"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm`}
                placeholder="ornek@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onFocus={() => setShowPasswordRequirements(true)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm`}
                placeholder="Güçlü bir şifre oluşturun"
              />
              
              {/* Şifre Gereksinimleri */}
              {showPasswordRequirements && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-2">Şifre gereksinimleri:</p>
                  {passwordRequirements.map((requirement, index) => {
                    const isMet = requirement.test(formData.password);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 flex items-center justify-center rounded-full ${isMet ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {isMet ? (
                            <i className="ri-check-line text-white text-xs"></i>
                          ) : (
                            <i className="ri-close-line text-white text-xs"></i>
                          )}
                        </div>
                        <span className={`text-xs ${isMet ? 'text-green-700' : 'text-gray-600'}`}>
                          {requirement.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm`}
                placeholder="Şifrenizi tekrar girin"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Onay Checkboxları */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={consents.kvkk}
                      onChange={(e) => handleConsentChange('kvkk', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => handleConsentChange('kvkk', !consents.kvkk)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                        consents.kvkk
                          ? 'bg-teal-600 border-teal-600'
                          : errors.kvkk
                          ? 'border-red-500 bg-white'
                          : 'border-gray-300 bg-white group-hover:border-teal-400'
                      }`}
                    >
                      {consents.kvkk && <i className="ri-check-line text-white text-xs"></i>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <Link to="/kvkk" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                      KVKK Aydınlatma Metni
                    </Link>
                    'ni okudum ve onaylıyorum.
                  </span>
                </label>
                {errors.kvkk && <p className="text-red-500 text-xs mt-1 ml-8">{errors.kvkk}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={consents.privacy}
                      onChange={(e) => handleConsentChange('privacy', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => handleConsentChange('privacy', !consents.privacy)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                        consents.privacy
                          ? 'bg-teal-600 border-teal-600'
                          : errors.privacy
                          ? 'border-red-500 bg-white'
                          : 'border-gray-300 bg-white group-hover:border-teal-400'
                      }`}
                    >
                      {consents.privacy && <i className="ri-check-line text-white text-xs"></i>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                      Gizlilik Politikası
                    </Link>
                    'nı ve{' '}
                    <Link to="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2">
                      Kullanım Koşulları
                    </Link>
                    'nı okudum ve onaylıyorum.
                  </span>
                </label>
                {errors.privacy && <p className="text-red-500 text-xs mt-1 ml-8">{errors.privacy}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}