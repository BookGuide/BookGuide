import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Loader2, AlertTriangle, List } from 'lucide-react';

// Arama sonuçları için basit bir arayüz
interface SearchedBook {
  id: string;
  title: string;
  author: string;
}

// Örnek kitap verileri (arama için kullanılacak)
const mockAllBooksForSearch: SearchedBook[] = [
  { id: 's-guid-1', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski' },
  { id: 's-guid-2', title: '1984', author: 'George Orwell' },
  { id: 's-guid-3', title: 'Yüzüklerin Efendisi', author: 'J.R.R. Tolkien' },
  { id: 's-guid-4', title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry' },
  { id: 's-guid-5', title: 'Sefiller', author: 'Victor Hugo' },
  { id: 's-guid-6', title: 'Beyaz Diş', author: 'Jack London' },
  { id: 's-guid-7', title: 'Simyacı', author: 'Paulo Coelho' },
];

const MainMenu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchedBook[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false); // Arama yapılıp yapılmadığını takip eder

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <nav className="bg-[#660000] shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <Link to="/mainmenu" className="text-2xl font-bold text-white">
              BookGuide
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/viewallbooks" // Tüm kitapların listelendiği sayfaya yönlendirme
              className="text-white hover:text-gray-300 font-medium"
            >
              Kitap Listesi
            </Link>
            <Link
              to="/history"
              className="text-white hover:text-gray-300 font-medium"
            >
              Geçmişim
            </Link>
            <Link
              to="/recommendation"
              className="text-white hover:text-gray-300 font-medium"
            >
              Öneriler
            </Link>
            <Link
              to="/myprofile"
              className="text-white hover:text-gray-300 font-medium"
            >
              Profilim
            </Link>
            <Link
              to="/login" // Çıkış yapıldığında login sayfasına yönlendir
              className="text-white hover:text-gray-300 font-medium"
            >
              Çıkış Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <div className="text-center w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-[#660000] mb-4">BookGuide'a Hoş Geldiniz!</h1>
          <p className="text-lg text-[#472425] mb-8">
            Kitapları keşfetmek, ödünç almak ve okuma geçmişinizi takip etmek için gezinin.
          </p>

          {/* Kitap Arama Sekmesi */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSearching(true);
              setSearchAttempted(true);
              // API çağrısı simülasyonu
              setTimeout(() => {
                if (searchQuery.trim() === '') {
                  setSearchResults([]);
                } else {
                  const filteredBooks = mockAllBooksForSearch.filter(
                    (book) =>
                      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      book.author.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  setSearchResults(filteredBooks);
                }
                setIsSearching(false);
              }, 1000);
            }}
            className="mb-10 w-full"
          >
            <div className="relative flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kitap adı veya yazar ara..."
                className="w-full pl-4 pr-12 py-3 border border-[#660000]/50 rounded-l-md focus:ring-2 focus:ring-[#660000] focus:border-transparent transition-colors bg-white/90 text-gray-700 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-[#660000] hover:bg-[#800000] text-white px-6 py-3 rounded-r-md flex items-center justify-center transition-colors"
                disabled={isSearching}
              >
                {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              </button>
            </div>
          </form>

          {/* Arama Sonuçları */}
          {searchAttempted && (
            <div className="w-full mt-6 mb-8 text-left">
              {isSearching && (
                <p className="text-center text-gray-600 flex items-center justify-center"><Loader2 size={24} className="animate-spin mr-2" /> Sonuçlar aranıyor...</p>
              )}
              {!isSearching && searchResults.length === 0 && searchQuery.trim() !== '' && (
                <p className="text-center text-red-600 flex items-center justify-center"><AlertTriangle size={20} className="mr-2"/> Aradığınız kriterlere uygun kitap bulunamadı.</p>
              )}
              {!isSearching && searchResults.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-[#472425] mb-3 flex items-center"><List size={22} className="mr-2"/>Arama Sonuçları:</h3>
                  <ul className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {searchResults.map((book) => (
                      <li key={book.id} className="p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded">
                        <p className="font-medium text-[#5c0000]">{book.title}</p>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Link
            to="/viewallbooks"
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out text-lg"
          >
            Kitapları Görüntüle
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
