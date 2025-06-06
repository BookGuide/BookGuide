import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ChevronLeft, LogIn } from 'lucide-react';
import type { FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Form validation
    if (!username.trim() || !password.trim()) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7127/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          rawPassword: password
        })
      });

      if (!response.ok) {
        throw new Error('Sunucudan hata yanıtı alındı.');
      }

      const data = await response.json();

      if (data.succeeded) {
        // Token'ı localStorage'a kaydet (ya da cookie'ye)
        localStorage.setItem('token', data.token);

        // Kullanıcı bilgilerini kaydetmek istersen:
        localStorage.setItem('user', JSON.stringify(data.user));

        
        if(data.user.role === 'Admin') {
          alert('Giriş başarılı! Admin sayfasına yönlendiriliyorsunuz...');
          navigate('/adminpage');
        } else if(data.user.role === 'User') {
          alert('Giriş başarılı! Ana menüye yönlendiriliyorsunuz...');
          navigate('/mainmenu');
        }
        else {
          alert('Giriş başarılı! Kütüphane sayfasına yönlendiriliyorsunuz...');
          navigate('/librarypage');
        }
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error(err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Şifre sıfırlama sayfasına yönlendiriliyorsunuz...');
  };

  const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleBackToHome = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Ana sayfaya yönlendiriliyorsunuz...');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="flex flex-col justify-center items-center h-full p-8 text-white">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Kütüphane Sistemi</h1>
          <p className="text-xl text-center max-w-md drop-shadow-md">
            Kitaplarınızı yönetin, okuma deneyiminizi geliştirin, bilgi dünyasına açılın.
          </p>
        </div>
      </div>

      {/* Sağ Taraf - Giriş Formu */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-[#f4efe8]">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 border border-[#8c1c13]/20">
          {/* Logo ve Başlık */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#8c1c13] p-3 rounded-full mb-4">
              <LogIn size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#472425]">Tekrar Hoşgeldiniz</h1>
            <p className="text-[#5f4b44] mt-2 text-center">Kütüphane sistemine giriş yaparak devam edin</p>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Giriş Formu */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#472425] mb-1">
                Kullanıcı Adı <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-[#8c1c13]/70" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Kullanıcı adınız"
                  required
                  aria-describedby={error ? "error-message" : undefined}
                  className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13] transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-[#472425]">
                  Şifre <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#8c1c13]/70" />
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
                  className="pl-10 pr-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13] transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e as any)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8c1c13]/70 hover:text-[#8c1c13] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => handleLogin(e as any)}
              disabled={isLoading}
              className="w-full bg-[#8c1c13] hover:bg-[#630000] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#8c1c13] mt-6"
              aria-describedby="login-status"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></div>
                  <span id="login-status">Giriş Yapılıyor...</span>
                </>
              ) : (
                <span id="login-status">Giriş Yap</span>
              )}
            </button>
          </div>

          {/* Kayıt Bağlantısı */}
          <div className="mt-6 text-center">
            <p className="text-[#5f4b44]">
              Hesabınız yok mu?{" "}
              <button
                onClick={handleRegister}
                className="text-[#8c1c13] hover:text-[#630000] font-medium transition-colors focus:outline-none focus:underline"
                tabIndex={0}
              >
                Hesap Oluşturun
              </button>
            </p>
          </div>


          {/* Alt Bilgi */}
          <div className="mt-6 text-center text-[#5f4b44]/80 text-sm">
            &copy; {new Date().getFullYear()} Kütüphane Yönetim Sistemi.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;