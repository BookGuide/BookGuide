import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, BookOpen, ChevronLeft } from 'lucide-react';
import type { FormEvent, MouseEvent, ChangeEvent } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation
    if (!email.trim() || !password.trim()) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Giriş başarılı! Dashboard sayfasına yönlendiriliyorsunuz...');
    }, 1500);
  };

  const handleForgotPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Şifre sıfırlama sayfasına yönlendiriliyorsunuz...');
  };

  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Kayıt sayfasına yönlendiriliyorsunuz...');
  };

  const handleBackToHome = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Ana sayfaya yönlendiriliyorsunuz...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sol Bölüm - Form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-6 lg:p-12">
        <div className="w-full max-w-md mx-auto">
          {/* Logo ve Başlık */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white">
                <BookOpen size={20} />
              </div>
              <h1 className="text-xl font-bold text-slate-800">LibrarySystem</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Tekrar Hoşgeldiniz</h2>
            <p className="mt-2 text-slate-600">Kütüphane sistemine giriş yaparak devam edin</p>
          </div>
          
          {/* Hata Mesajı */}
          {error && (
            <div 
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-slide-down"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
          
          {/* Giriş Formu */}
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                E-posta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="ornek@mail.com"
                  required
                  aria-describedby={error ? "error-message" : undefined}
                  className={`pl-10 block w-full px-3 py-2.5 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-900 transition-all duration-200 ${
                    error && !email.trim() 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Şifre <span className="text-red-500">*</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors focus:outline-none focus:underline"
                  tabIndex={0}
                >
                  Şifremi Unuttum
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  aria-describedby={error ? "error-message" : undefined}
                  className={`pl-10 pr-10 block w-full px-3 py-2.5 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 text-slate-900 transition-all duration-200 ${
                    error && !password.trim() 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:text-slate-600"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              aria-describedby="login-status"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" aria-hidden="true"></div>
                  <span id="login-status">Giriş Yapılıyor...</span>
                </>
              ) : (
                <span id="login-status">Giriş Yap</span>
              )}
            </button>
          </form>
          
          {/* Kayıt Bağlantısı */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Hesabınız yok mu?{" "}
              <button 
                onClick={handleRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
                tabIndex={0}
              >
                Hesap Oluşturun
              </button>
            </p>
          </div>
          
          {/* Geri Dön Butonu */}
          <div className="mt-12 text-center">
            <button 
              onClick={handleBackToHome}
              className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition-all duration-200 group focus:outline-none focus:text-slate-900"
              tabIndex={0}
            >
              <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              Ana Sayfaya Dön
            </button>
          </div>
          
          {/* Alt Bilgi */}
          <div className="mt-12 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Kütüphane Yönetim Sistemi
          </div>
        </div>
      </div>
      
      {/* Sağ Bölüm - Görsel */}
      <div className="hidden md:block md:w-3/5 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
      }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center p-12 text-center">
          <div className="max-w-lg">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
              <BookOpen size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Kütüphane Sistemi</h2>
            <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
              Dijital kütüphane sistemimiz ile kitaplarınızı kolayca yönetin, ödünç alın ve bilgi dünyasının kapılarını aralayın.
            </p>
            
            {/* Özellikler */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">Kolay Erişim</h3>
                </div>
                <p className="text-indigo-200 text-sm pl-10">Tüm kitaplara anında dijital erişim sağlayın</p>
              </div>
              
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">Güvenli Sistem</h3>
                </div>
                <p className="text-indigo-200 text-sm pl-10">Verileriniz ve işlemleriniz tam koruma altında</p>
              </div>
              
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">Rezervasyon</h3>
                </div>
                <p className="text-indigo-200 text-sm pl-10">İstediğiniz kitapları önceden ayırtın</p>
              </div>
              
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium">Takvim</h3>
                </div>
                <p className="text-indigo-200 text-sm pl-10">Teslim tarihlerini takip edin</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-400 bg-opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-400 bg-opacity-20 rounded-full blur-lg"></div>
      </div>
      
      
    </div>
  );
};

export default LoginPage;