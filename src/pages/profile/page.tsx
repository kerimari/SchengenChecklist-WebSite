import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import ApplicationTracker from './components/ApplicationTracker';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [memberSince, setMemberSince] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordStatus, setPasswordStatus] = useState<'success' | 'error' | null>(null);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('schengen_users') || '[]');
      const foundUser = users.find((u: { email: string; createdAt?: string }) => u.email === user.email);
      if (foundUser && foundUser.createdAt) {
        const date = new Date(foundUser.createdAt);
        const formattedDate = date.toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        setMemberSince(formattedDate);
      }
    }
  }, [user]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus('error');
      setPasswordError('Yeni şifreler eşleşmiyor.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordStatus('error');
      setPasswordError('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('schengen_users') || '[]');
      const userIndex = users.findIndex((u: { email: string }) => u.email === user?.email);

      if (userIndex === -1) {
        setPasswordStatus('error');
        setPasswordError('Kullanıcı bulunamadı.');
        return;
      }

      if (users[userIndex].password !== passwordData.currentPassword) {
        setPasswordStatus('error');
        setPasswordError('Mevcut şifre yanlış.');
        return;
      }

      users[userIndex].password = passwordData.newPassword;
      localStorage.setItem('schengen_users', JSON.stringify(users));

      setPasswordStatus('success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordStatus(null);
      }, 2000);
    } catch {
      setPasswordStatus('error');
      setPasswordError('Şifre değiştirme sırasında bir hata oluştu.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 lg:pb-20 bg-gradient-to-br from-teal-50 via-white to-orange-50">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full text-white text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 shadow-xl">
              {getInitials()}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Hesap bilgilerinizi görüntüleyin ve yönetin
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Profil Bilgileri</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200 whitespace-nowrap"
                >
                  {isEditing ? 'İptal' : 'Düzenle'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad
                  </label>
                  <div className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50">
                    {user.firstName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Soyad
                  </label>
                  <div className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50">
                    {user.lastName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta
                  </label>
                  <div className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50">
                    {user.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon
                  </label>
                  <div className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
                    {user.phone || 'Belirtilmemiş'}
                  </div>
                </div>

                {memberSince && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Üyelik Tarihi
                    </label>
                    <div className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50">
                      {memberSince}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Application Tracker */}
            <ApplicationTracker />

            {/* Password Change Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Güvenlik</h2>
              </div>

              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Şifre Değiştir
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mevcut Şifre
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                      placeholder="Mevcut şifrenizi girin"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                      placeholder="Yeni şifrenizi girin (en az 6 karakter)"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Yeni Şifre (Tekrar)
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 outline-none"
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                      Şifreyi Güncelle
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordStatus(null);
                        setPasswordError('');
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300 whitespace-nowrap"
                    >
                      İptal
                    </button>
                  </div>

                  {passwordStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                      Şifreniz başarıyla güncellendi!
                    </div>
                  )}
                  {passwordStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                      {passwordError}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Logout Card */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-red-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Oturumu Kapat</h2>
              <p className="text-gray-600 mb-6">
                Hesabınızdan çıkış yapmak istediğinizden emin misiniz?
              </p>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}