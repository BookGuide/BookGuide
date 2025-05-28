import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';

const MainMenu: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arama yapılıyor:', query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <nav className="bg-[#660000]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <Link to="/mainmenu" className="text-2xl font-bold text-white">
              BookGuide
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/myprofile"
              className="text-white hover:text-gray-300 font-medium"
            >
              Profilim
            </Link>
            <Link
              to="/logout"
              className="text-white hover:text-gray-300 font-medium"
            >
              Çıkış Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sol Sütun: Geçmiş ve Öneriler */}
        <div className="flex flex-col space-y-8">
          {/* Geçmişte Okunan Kitaplar */}
          <div className="relative">
            <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-xl" />
            <section className="relative p-8">
              <h2 className="text-2xl font-bold text-[#660000] mb-4">
                Geçmişte Okunan Kitaplar
              </h2>
              <p className="text-[#472425] mb-6">
                Daha önce okuduğunuz kitaplara ve okuma istatistiklerinize buradan
                ulaşın.
              </p>
              <Link
                to="/history"
                className="inline-block px-6 py-2 border-2 border-[#660000] rounded-full text-[#660000] font-semibold hover:bg-[#660000] hover:text-white transition-colors"
              >
                Geçmişe Göz At
              </Link>
            </section>
          </div>

          {/* Tavsiye Edilen Kitaplar */}
          <div className="relative">
            <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-xl" />
            <section className="relative p-8">
              <h2 className="text-2xl font-bold text-[#660000] mb-4">
                Tavsiye Edilen Kitaplar
              </h2>
              <p className="text-[#472425] mb-6">
                Okuma geçmişinize ve tercihlerinize göre size özel kitap
                önerilerini keşfedin.
              </p>
              <Link
                to="/recommendation"
                className="inline-block px-6 py-2 bg-[#660000] rounded-full text-white font-semibold hover:bg-[#4a0000] transition-colors"
              >
                Önerileri Görüntüle
              </Link>
            </section>
          </div>
        </div>

        {/* Sağ Sütun: Kitap Arama */}
        <div className="relative">
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-xl" />
          <section className="relative p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#660000] mb-4">
              Kitap Ara
            </h2>
            <p className="text-[#472425] mb-6">
              Aradığınız kitabı başlık, yazar veya konuya göre bulun.
            </p>
            <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-[#660000]/70" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Kitap ara..."
                  className="w-full pl-10 pr-4 py-3 border border-[#660000]/30 rounded-full focus:ring-2 focus:ring-[#660000] focus:border-transparent transition-colors"
                />
              </div>
            </form>
            <div className="w-full max-w-md h-64 border border-[#660000]/30 rounded-lg bg-white/70">
              {/* Arama sonuçları buraya gelecek */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
