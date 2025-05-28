import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, User, Lock, Mail, UserPlus, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // React Router'dan navigate fonksiyonu

  const handleRegister = () => {
    // Form validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor. Lütfen kontrol ediniz.');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
      // React Router ile yönlendirme
      navigate('/login');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Vite'da resim URL'lerini elde etmek için özelleştirilmiş kod
  const bookshelfImageUrl = '/src/images/bookshelf.jpg';
  
  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* Sol Taraf - Resim Bölümü */}
      <div 
        className="hidden md:block w-1/2 bg-cover bg-center" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${bookshelfImageUrl})`,
        }}
      >
      </div>
      
      {/* Sağ Taraf - Kayıt Formu */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-[#f4efe8]">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 border border-[#8c1c13]/20">
          {/* Logo ve Başlık */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#8c1c13] p-3 rounded-full mb-4">
              <UserPlus size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#472425]">Hesap Oluştur</h1>
            <p className="text-[#5f4b44] mt-2 text-center">Kütüphane sistemine kayıt olmak için bilgilerinizi giriniz</p>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Kayıt Formu */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-[#472425] mb-1">
              Ad Soyad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-[#8c1c13]/70" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#472425] mb-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-[#8c1c13]/70" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#472425] mb-1">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-[#8c1c13]/70" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-[#8c1c13]/70" />
                ) : (
                  <Eye size={18} className="text-[#8c1c13]/70" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-[#5f4b44]">Şifreniz en az 8 karakter olmalıdır</p>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#472425] mb-1">
              Şifreyi Tekrarla
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-[#8c1c13]/70" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13]"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-[#8c1c13]/70" />
                ) : (
                  <Eye size={18} className="text-[#8c1c13]/70" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-[#8c1c13] hover:bg-[#630000] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : null}
            {isLoading ? "Kayıt Yapılıyor..." : "Hesap Oluştur"}
          </button>

          {/* Giriş Sayfasına Dön */}
          <div className="mt-6 text-center">
            <p className="text-[#5f4b44]">
              Zaten hesabınız var mı?{" "}
              <Link to="/login" className="text-[#8c1c13] hover:text-[#630000] font-medium">
                Giriş Yap
              </Link>
            </p>
          </div>

          {/* Geri Dön Butonu */}
          <div className="mt-6 flex justify-center">
            <Link to="/" className="flex items-center text-[#5f4b44] hover:text-[#8c1c13] transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Ana Sayfaya Dön
            </Link>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-6 text-center text-[#5f4b44]/80 text-sm">
            &copy; {new Date().getFullYear()} Kütüphane Yönetim Sistemi. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;