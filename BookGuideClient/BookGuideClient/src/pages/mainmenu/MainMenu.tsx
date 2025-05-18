import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Book, BookMarked, Clock, Star, Menu, X, User, LogIn } from 'lucide-react';

const MainPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [featuredBooks, setFeaturedBooks] = useState<Array<{
    id: number;
    title: string;
    author: string;
    cover: string;
    rating: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock data for featured books - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setFeaturedBooks([
        {
          id: 1,
          title: "Suç ve Ceza",
          author: "Fyodor Dostoyevski",
          cover: "/src/images/book1.jpg",
          rating: 4.8
        },
        {
          id: 2,
          title: "Sefiller",
          author: "Victor Hugo",
          cover: "/src/images/book2.jpg",
          rating: 4.7
        },
        {
          id: 3,
          title: "Bülbülü Öldürmek",
          author: "Harper Lee",
          cover: "/src/images/book3.jpg",
          rating: 4.9
        },
        {
          id: 4,
          title: "1984",
          author: "George Orwell",
          cover: "/src/images/book4.jpg",
          rating: 4.6
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hero section images
  const heroBackgroundUrl = '/src/images/library-bg.jpg';
  const placeholderImage = 'https://via.placeholder.com/200x300';

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Header / Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <BookOpen size={32} className="text-[#8c1c13] mr-2" />
            <span className="text-xl font-bold text-[#472425]">Kütüphane Sistemi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[#472425] hover:text-[#8c1c13] font-medium">Ana Sayfa</Link>
            <Link to="/books" className="text-[#472425] hover:text-[#8c1c13] font-medium">Kitaplar</Link>
            <Link to="/authors" className="text-[#472425] hover:text-[#8c1c13] font-medium">Yazarlar</Link>
            <Link to="/about" className="text-[#472425] hover:text-[#8c1c13] font-medium">Hakkında</Link>
            <Link to="/contact" className="text-[#472425] hover:text-[#8c1c13] font-medium">İletişim</Link>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="flex items-center px-4 py-2 text-[#8c1c13] border border-[#8c1c13] rounded-md hover:bg-[#8c1c13] hover:text-white transition-colors"
            >
              <LogIn size={18} className="mr-1" />
              Giriş Yap
            </Link>
            <Link 
              to="/register" 
              className="flex items-center px-4 py-2 bg-[#8c1c13] text-white rounded-md hover:bg-[#630000] transition-colors"
            >
              <User size={18} className="mr-1" />
              Kayıt Ol
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-[#472425]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-inner border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-[#472425] hover:text-[#8c1c13] font-medium py-1">Ana Sayfa</Link>
              <Link to="/books" className="text-[#472425] hover:text-[#8c1c13] font-medium py-1">Kitaplar</Link>
              <Link to="/authors" className="text-[#472425] hover:text-[#8c1c13] font-medium py-1">Yazarlar</Link>
              <Link to="/about" className="text-[#472425] hover:text-[#8c1c13] font-medium py-1">Hakkında</Link>
              <Link to="/contact" className="text-[#472425] hover:text-[#8c1c13] font-medium py-1">İletişim</Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center px-4 py-2 text-[#8c1c13] border border-[#8c1c13] rounded-md hover:bg-[#8c1c13] hover:text-white transition-colors"
                >
                  <LogIn size={18} className="mr-1" />
                  Giriş Yap
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center px-4 py-2 bg-[#8c1c13] text-white rounded-md hover:bg-[#630000] transition-colors"
                >
                  <User size={18} className="mr-1" />
                  Kayıt Ol
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="bg-cover bg-center py-20 md:py-32" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${heroBackgroundUrl})`,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Bilgi ve Keşif Dünyasına Hoş Geldiniz
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
              Binlerce kitabı keşfedin, okuma alışkanlıklarınızı takip edin ve kütüphane deneyiminizi geliştirin.
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={20} className="text-[#8c1c13]" />
              </div>
              <input 
                type="text" 
                placeholder="Kitap adı, yazar veya konu arayın..." 
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-[#8c1c13] focus:outline-none focus:ring-2 focus:ring-[#8c1c13] focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#472425] mb-12">
              Kütüphane Sistemimizin Özellikleri
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-[#f4efe8] rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
                <div className="bg-[#8c1c13] p-4 rounded-full mb-4">
                  <BookMarked size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#472425] mb-3">Geniş Koleksiyon</h3>
                <p className="text-[#5f4b44]">
                  Binlerce kitap arasından seçim yapın ve ilgi alanlarınıza göre yeni eserler keşfedin.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-[#f4efe8] rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
                <div className="bg-[#8c1c13] p-4 rounded-full mb-4">
                  <Clock size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#472425] mb-3">Okuma Takibi</h3>
                <p className="text-[#5f4b44]">
                  Okuma alışkanlıklarınızı takip edin, hedefler belirleyin ve okuma istatistiklerinizi görüntüleyin.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-[#f4efe8] rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
                <div className="bg-[#8c1c13] p-4 rounded-full mb-4">
                  <Star size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#472425] mb-3">Kişiselleştirilmiş Öneriler</h3>
                <p className="text-[#5f4b44]">
                  Okuma geçmişinize ve tercihlerinize göre özelleştirilmiş kitap önerileri alın.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-16 bg-[#f4efe8]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#472425]">
                Öne Çıkan Kitaplar
              </h2>
              <Link to="/books" className="text-[#8c1c13] hover:text-[#630000] font-medium flex items-center">
                Tümünü Gör
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-[#8c1c13] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
                    <img 
                      src={placeholderImage} 
                      alt={book.title} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#472425]">{book.title}</h3>
                      <p className="text-[#5f4b44]">{book.author}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${i < Math.floor(book.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-[#5f4b44]">{book.rating.toFixed(1)}</span>
                      </div>
                      <Link 
                        to={`/books/${book.id}`}
                        className="mt-4 block text-center bg-[#8c1c13] hover:bg-[#630000] text-white py-2 rounded-md transition-colors"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-[#472425] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Kütüphane Sistemimize Hemen Katılın</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-200">
              Ücretsiz hesap oluşturarak kitap dünyasına erişim sağlayın, okuma alışkanlıklarınızı takip edin ve kişiselleştirilmiş öneriler alın.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-3 bg-white text-[#472425] font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-[#8c1c13] text-white font-medium rounded-md hover:bg-[#630000] transition-colors"
              >
                Hesap Oluştur
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen size={24} className="text-[#8c1c13] mr-2" />
                <span className="text-lg font-bold text-[#472425]">Kütüphane Sistemi</span>
              </div>
              <p className="text-[#5f4b44] mb-4">
                Bilgi dünyası ve okuma keyfi için en iyi adres.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#8c1c13] hover:text-[#630000]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.992 3.657 9.129 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.992 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-[#8c1c13] hover:text-[#630000]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-[#8c1c13] hover:text-[#630000]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm0 4a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#472425] mb-4">Keşfet</h3>
              <ul className="space-y-2">
                <li><Link to="/books" className="text-[#5f4b44] hover:text-[#8c1c13]">Kitaplar</Link></li>
                <li><Link to="/authors" className="text-[#5f4b44] hover:text-[#8c1c13]">Yazarlar</Link></li>
                <li><Link to="/categories" className="text-[#5f4b44] hover:text-[#8c1c13]">Kategoriler</Link></li>
                <li><Link to="/new-releases" className="text-[#5f4b44] hover:text-[#8c1c13]">Yeni Çıkanlar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#472425] mb-4">Hesabım</h3>
              <ul className="space-y-2">
                <li><Link to="/profile" className="text-[#5f4b44] hover:text-[#8c1c13]">Profilim</Link></li>
                <li><Link to="/my-books" className="text-[#5f4b44] hover:text-[#8c1c13]">Kitaplarım</Link></li>
                <li><Link to="/reading-list" className="text-[#5f4b44] hover:text-[#8c1c13]">Okuma Listem</Link></li>
                <li><Link to="/settings" className="text-[#5f4b44] hover:text-[#8c1c13]">Ayarlar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#472425] mb-4">Yardım</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-[#5f4b44] hover:text-[#8c1c13]">Sık Sorulan Sorular</Link></li>
                <li><Link to="/contact" className="text-[#5f4b44] hover:text-[#8c1c13]">İletişim</Link></li>
                <li><Link to="/privacy" className="text-[#5f4b44] hover:text-[#8c1c13]">Gizlilik Politikası</Link></li>
                <li><Link to="/terms" className="text-[#5f4b44] hover:text-[#8c1c13]">Kullanım Şartları</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-[#5f4b44]/80 text-sm">
            &copy; {new Date().getFullYear()} Kütüphane Yönetim Sistemi. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;