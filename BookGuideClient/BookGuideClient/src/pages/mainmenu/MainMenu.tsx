import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Loader2, AlertTriangle, Eye } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  is_Online: boolean;
  fileId: string;
}

const MainMenu: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7127/api/Book/GetBooks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.succeeded) {
          setBooks(data.books);
          setFilteredBooks(data.books);
        }
      } catch (error) {
        console.error('Kitaplar alınamadı:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [searchQuery, books]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar sabit */}
      <nav className="bg-[#660000] shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <Link to="/mainmenu" className="text-2xl font-bold text-white">
              BookGuide
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/mainmenu" className="text-white hover:text-gray-300 font-medium">Kitap Listesi</Link>
            <Link to="/history" className="text-white hover:text-gray-300 font-medium">Geçmişim</Link>
            <Link to="/recommendation" className="text-white hover:text-gray-300 font-medium">Öneriler</Link>
            <Link to="/myprofile" className="text-white hover:text-gray-300 font-medium">Profilim</Link>
            <Link to="/login" className="text-white hover:text-gray-300 font-medium">Çıkış Yap</Link>
          </div>
        </div>
      </nav>

      {/* Ana içerik */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Arama Kutusu */}
        <div className="w-full max-w-3xl mx-auto mb-10">
          <form onSubmit={(e) => e.preventDefault()} className="relative flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitap adı veya yazar ara..."
              className="w-full pl-4 pr-12 py-3 border border-[#660000]/50 rounded-l-md focus:ring-2 focus:ring-[#660000] focus:border-transparent transition-colors bg-white/90 text-gray-700 placeholder-gray-500"
            />
            <button type="submit" className="bg-[#660000] text-white px-6 py-3 rounded-r-md">
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Kitap Listesi */}
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-[#472425] mb-4">Kitaplar</h3>
          {isLoading ? (
            <div className="flex justify-center items-center text-gray-700">
              <Loader2 className="animate-spin mr-2" /> Yükleniyor...
            </div>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-red-600 flex items-center justify-center">
              <AlertTriangle size={20} className="mr-2" /> Kitap bulunamadı.
            </p>
          ) : (
            <ul className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredBooks.map((book) => (
                <li key={book.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div>
                    <p className="font-bold text-[#5c0000]">{book.title}</p>
                    <p className="text-sm text-gray-700">{book.author}</p>
                  </div>
                  <Link
                    to={`/book/${book.id}`}
                    className="text-[#660000] hover:text-[#800000] flex items-center text-sm"
                  >
                    <Eye size={18} className="mr-1" /> Görüntüle
                    
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
