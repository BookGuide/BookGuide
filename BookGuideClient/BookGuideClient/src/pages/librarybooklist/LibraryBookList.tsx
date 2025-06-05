import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  Library as LibraryIcon,
  BookMarked,
  Info,
  PlusCircle,
  Edit3,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import { jwtDecode } from 'jwt-decode';

interface BookDetails {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
}

interface DisplayLibraryBook {
  libraryBookId: string;
  bookInfo: BookDetails;
  totalCount: number;
  availableCount: number;
}

const LibraryBookList: React.FC = () => {
  const [displayBooks, setDisplayBooks] = useState<DisplayLibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [allSystemBooks, setAllSystemBooks] = useState<BookDetails[]>([]);
  const [newRecord, setNewRecord] = useState<{ bookId: string; totalCount: number; availableCount: number }>({ bookId: '', totalCount: 1, availableCount: 1 });

   const getLibraryIdFromToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded['library_id'] || null;
    } catch {
      return null;
    }
  };

  const libraryId = getLibraryIdFromToken();

  useEffect(() => {
    const fetchBooksAndInventory = async () => {
      setIsLoading(true);
      try {
        const booksRes = await fetch('https://localhost:7127/api/Book/GetBooks');
        const booksData = await booksRes.json();

        const inventoryRes = await fetch(`https://localhost:7127/api/LibraryBook/GetLibraryBooks?LibraryId=${libraryId}`);
        const inventoryData = await inventoryRes.json();

        if (booksData.succeeded && inventoryData.succeeded) {
          const books: BookDetails[] = booksData.books;
          setAllSystemBooks(books);

          const libraryBooks: DisplayLibraryBook[] = inventoryData.books.map((libBook: any) => {
            const bookDetail = books.find(b => b.id === libBook.bookId);
            return {
              libraryBookId: libBook.id,
              bookInfo: bookDetail || {
                id: libBook.bookId,
                title: 'Bilinmeyen Kitap',
                author: 'Bilinmiyor',
                description: '',
                category: 'Bilinmiyor'
              },
              totalCount: libBook.totalCount,
              availableCount: libBook.availableCount
            };
          });

          setDisplayBooks(libraryBooks);
          if (books.length > 0) {
            setNewRecord(prev => ({ ...prev, bookId: books[0].id }));
          }
        }
      } catch (err) {
        alert('Veriler yüklenirken hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksAndInventory();
  }, []);

  const handleAddLibraryBookRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7127/api/LibraryBook/AddLibraryBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          libraryId: libraryId,
          bookId: newRecord.bookId,
          totalCount: newRecord.totalCount,
          availableCount: newRecord.availableCount,
        })
      });
      const data = await response.json();
      if (data.succeeded) {
        alert('Kitap başarıyla eklendi.');
        window.location.reload();
      } else {
        alert('Ekleme işlemi başarısız.');
      }
    } catch {
      alert('Sunucu hatası oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/librarypage" className="flex items-center">
            <LibraryIcon size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Kütüphane</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/librarybooklist" className="text-white hover:text-gray-300 font-medium">Kitap Listesi</Link>
            <Link to="/libraryborrowpage" className="text-white hover:text-gray-300 font-medium">Ödünç Kitaplar</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/loginpage" className="p-2 text-white hover:text-gray-300 rounded-full">
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425]">
            <BookMarked size={30} className="inline-block mr-2 align-middle" />
            Kütüphanemdeki Kitaplar
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            {showAddForm ? 'Formu Kapat' : 'Yeni Kitap Kaydı Ekle'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddLibraryBookRecord} className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kitap Seçin</label>
              <select
                name="bookId"
                value={newRecord.bookId}
                onChange={(e) => setNewRecord({ ...newRecord, bookId: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                {allSystemBooks.map(book => (
                  <option key={book.id} value={book.id}>{book.title} - ({book.author})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Toplam Stok Adedi</label>
              <input
                type="number"
                value={newRecord.totalCount}
                onChange={(e) => setNewRecord({ ...newRecord, totalCount: parseInt(e.target.value) })}
                min={1}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mevcut Stok Adedi</label>
              <input
                type="number"
                value={newRecord.availableCount}
                onChange={(e) => setNewRecord({ ...newRecord, availableCount: parseInt(e.target.value) })}
                min={0}
                max={newRecord.totalCount}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-[#660000] text-white rounded-lg shadow-md hover:bg-[#800000]"
              >
                Kaydı Ekle
              </button>
            </div>
          </form>
        )}

        {isLoading ? (
          <p className="text-center text-gray-500 mt-10">Kitaplar yükleniyor...</p>
        ) : displayBooks.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Kütüphanenizde gösterilecek kitap bulunmamaktadır.</p>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mevcut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayBooks.map(book => (
                  <tr key={book.libraryBookId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{book.bookInfo.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.bookInfo.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.bookInfo.category}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">{book.totalCount}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">{book.availableCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen size={24} className="text-[#660000] mr-2" />
              <span className="text-lg font-bold text-[#472425]">BookGuide</span>
            </div>
          </div>
          <div className="mt-4 text-center text-[#5f4b44]/80 text-sm">
            &copy; {new Date().getFullYear()} BookGuide. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryBookList;
