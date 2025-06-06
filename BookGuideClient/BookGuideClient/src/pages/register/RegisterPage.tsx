import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, UserPlus, ArrowLeft, UserCog } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Kütüphane seçimi için state'ler
  const [libraries, setLibraries] = useState<{ id: string; name: string }[]>([]);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string>('');
  const [isFetchingLibraries, setIsFetchingLibraries] = useState(false);
  const [libraryFetchError, setLibraryFetchError] = useState<string | null>(null);

  const userRoleOptions = [
    { value: "Normal", label: "Kullanıcı" },
    { value: "Admin", label: "Admin" },
    { value: "Library", label: "Kütüphane" },
  ];
  const [selectedRole, setSelectedRole] = useState<string>(userRoleOptions[0].value);

  const navigate = useNavigate();

  // Kütüphaneleri çekme işlemi
  useEffect(() => {
    const fetchLibraries = async () => {
      setIsFetchingLibraries(true);
      setLibraryFetchError(null);
      try {
        // LibraryList.tsx dosyasında kullanılan endpoint'i kullanıyoruz
        const res = await fetch('https://localhost:7127/api/Library/GetLibraries');
        const data = await res.json();
        if (data.succeeded && Array.isArray(data.libraries)) {
          const librariesData = data.libraries.map((lib: any) => ({
            id: lib.id,
            name: lib.name,
          }));
          setLibraries(librariesData);
          // Eğer kütüphane varsa ilkini varsayılan olarak seç
          if (librariesData.length > 0) {
            setSelectedLibraryId(librariesData[0].id);
          }
        } else {
          setLibraryFetchError('Kütüphane listesi alınamadı.');
        }
      } catch (err) {
        setLibraryFetchError('Kütüphane listesi yüklenirken bir hata oluştu.');
      } finally {
        setIsFetchingLibraries(false);
      }
    };
    fetchLibraries();
  }, []); // Component mount edildiğinde bir kere çalışır

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor. Lütfen kontrol ediniz.');
      return;
    }

    setError('');
    setIsLoading(true);
    setLibraryFetchError(null); // Kayıt denemeden önce kütüphane hatasını temizle

    // Alanların dolu olup olmadığını kontrol et
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
       setError('Lütfen tüm alanları doldurunuz.');
       setIsLoading(false);
       return;
    }

    // Eğer rol kütüphaneyse ve kütüphane seçilmemişse hata ver
    if (selectedRole === 'Library' && !selectedLibraryId) {
        setError('Lütfen bir kütüphane seçiniz.');
        setIsLoading(false);
        return;
    }

    let libraryName = null;
    if (selectedRole === 'Library' && selectedLibraryId) {
      const selectedLibrary = libraries.find(lib => lib.id === selectedLibraryId);
      libraryName = selectedLibrary ? selectedLibrary.name : null;
    }

    const registrationData = {
      username: username,
      email: email,
      rawPassword: password,
      user_Role: selectedRole,
      libraryId: selectedRole === 'Library' ? selectedLibraryId : null,
      libraryName: libraryName // Kütüphane adını ekle
    };

    try {
      const response = await fetch('https://localhost:7127/api/Auth/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      // Detaylı hata mesajı için
      if (!response.ok) {
        let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData) {
            if (errorData.title) {
              errorDetails = `${errorData.title}`;
            }
            if (errorData.errors) {
              errorDetails += `\nDetaylar: ${Object.values(errorData.errors).flat().join(', ')}`;
            } else if (errorData.message) { // Genel bir mesaj alanı varsa
              errorDetails = errorData.message;
            }
          }
        } catch (e) {
          // JSON parse edilemezse, text olarak almayı dene
          const textError = await response.text();
          if (textError) errorDetails = textError;
        }
        throw new Error(`Kayıt başarısız. ${errorDetails}`);
      }

      const data = await response.json();

      if (data.succeeded) {
        alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
        navigate('/login');
      } else {
        setError(data.message || 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            <label htmlFor="username" className="block text-sm font-medium text-[#472425] mb-1">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-[#8c1c13]/70" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adınız"
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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#472425] mb-1">
              Şifre Tekrarı
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
                placeholder="Şifrenizi tekrar girin"
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

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-[#472425] mb-1">
              Kullanıcı Rolü
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCog size={18} className="text-[#8c1c13]/70" />
              </div>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13] bg-white appearance-none"
              >
                {userRoleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kullanıcı Rolü Seçimi */}
          

          {/* Kütüphane Seçimi (Sadece Rol Kütüphane ise Görünür) */}
          {selectedRole === 'Library' && (
            <div className="mb-6">
              <label htmlFor="library" className="block text-sm font-medium text-[#472425] mb-1">
                Kütüphane Seçin
              </label>
              <div className="relative">
                 {isFetchingLibraries ? (
                    <p className="text-sm text-gray-500">Kütüphaneler yükleniyor...</p>
                 ) : libraryFetchError ? (
                    <p className="text-sm text-red-600">{libraryFetchError}</p>
                 ) : libraries.length === 0 ? (
                    <p className="text-sm text-gray-500">Kütüphane bulunamadı.</p>
                 ) : (
                    <select
                      id="library"
                      value={selectedLibraryId}
                      onChange={(e) => setSelectedLibraryId(e.target.value)}
                      className="w-full px-4 py-2 border border-[#8c1c13]/20 rounded-md focus:ring-2 focus:ring-[#8c1c13] focus:border-[#8c1c13] bg-white appearance-none"
                      required={selectedRole === 'Library'} // Rol kütüphaneyse zorunlu yap
                    >
                      {libraries.map(library => (
                        <option key={library.id} value={library.id}>
                          {library.name}
                        </option>
                      ))}
                    </select>
                 )}
              </div>
            </div>
          )}

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