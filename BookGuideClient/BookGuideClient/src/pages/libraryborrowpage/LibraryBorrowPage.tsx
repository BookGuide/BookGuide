import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  Library as LibraryIcon, // Kütüphane ana ikonu
  PlusCircle,
  Edit3,
  Trash2,
  Archive, // Sayfa başlığı için ikon
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// Backend'deki Book entity'sinden temel bilgileri almak için (dropdown için)
interface BookForSelection {
  id: string; // BookId (Guid)
  title: string;
}

// Backend'deki LibraryBook entity'sine karşılık gelen arayüz
interface LibraryBookItem {
  id: string; // LibraryBook entity'sinin Id'si (Guid)
  bookId: string; // Kitabın genel Id'si (Guid)
  bookTitle: string; // Kitabın adı (Gösterim için)
  totalCount: number;
  availableCount: number;
}

// Örnek veriler (Gerçek uygulamada API'den gelecek)
const allBooksForSelection: BookForSelection[] = [
  { id: 'book-guid-1', title: 'Suç ve Ceza' },
  { id: 'book-guid-2', title: '1984' },
  { id: 'book-guid-3', title: 'Sefiller' },
  { id: 'book-guid-4', title: 'Yüzüklerin Efendisi' },
  { id: 'book-guid-5', title: 'Küçük Prens' },
];

const initialLibraryBooks: LibraryBookItem[] = [
  { id: 'lib-book-guid-1', bookId: 'book-guid-1', bookTitle: 'Suç ve Ceza', totalCount: 10, availableCount: 7 },
  { id: 'lib-book-guid-2', bookId: 'book-guid-2', bookTitle: '1984', totalCount: 5, availableCount: 5 },
];

const LibraryBorrowPage: React.FC = () => {
  const [libraryBooks, setLibraryBooks] = useState<LibraryBookItem[]>(initialLibraryBooks);
  const [availableBooks, setAvailableBooks] = useState<BookForSelection[]>(allBooksForSelection);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState<{ bookId: string; totalCount: number; availableCount: number }>({
    bookId: availableBooks.length > 0 ? availableBooks[0].id : '',
    totalCount: 1,
    availableCount: 1,
  });

  const [editingRecord, setEditingRecord] = useState<LibraryBookItem | null>(null);

  // Form input değişikliklerini yönetme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseInt(value, 10) : value;

    if (editingRecord) {
      setEditingRecord(prev => prev ? { ...prev, [name]: val } : null);
    } else {
      setNewRecord(prev => ({ ...prev, [name]: val }));
    }
  };

  // Yeni kitap kaydı ekleme
  const handleAddLibraryBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.bookId || newRecord.totalCount < 0 || newRecord.availableCount < 0) {
      alert('Lütfen geçerli kitap seçin ve adetleri doğru girin.');
      return;
    }
    if (newRecord.availableCount > newRecord.totalCount) {
      alert('Mevcut adet, toplam adetten fazla olamaz.');
      return;
    }
    // Kütüphanede bu kitap zaten var mı kontrolü (bookId ile)
    if (libraryBooks.some(lb => lb.bookId === newRecord.bookId)) {
      alert('Bu kitap zaten kütüphane envanterinizde mevcut. Mevcut kaydı güncelleyebilirsiniz.');
      return;
    }

    const selectedBook = availableBooks.find(b => b.id === newRecord.bookId);
    if (!selectedBook) {
        alert('Seçilen kitap bulunamadı.');
        return;
    }

    const bookToAdd: LibraryBookItem = {
      id: `lib-book-guid-${Date.now()}`, // Geçici ID
      bookId: newRecord.bookId,
      bookTitle: selectedBook.title,
      totalCount: newRecord.totalCount,
      availableCount: newRecord.availableCount,
    };
    setLibraryBooks(prev => [...prev, bookToAdd]);
    setNewRecord({ bookId: availableBooks.length > 0 ? availableBooks[0].id : '', totalCount: 1, availableCount: 1 });
    setShowAddForm(false);
    alert('Kitap kaydı başarıyla eklendi.');
  };

  // Kitap kaydını güncelleme
  const handleUpdateLibraryBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || editingRecord.totalCount < 0 || editingRecord.availableCount < 0) {
      alert('Lütfen adetleri doğru girin.');
      return;
    }
    if (editingRecord.availableCount > editingRecord.totalCount) {
      alert('Mevcut adet, toplam adetten fazla olamaz.');
      return;
    }

    setLibraryBooks(prev => prev.map(lb => lb.id === editingRecord.id ? editingRecord : lb));
    setEditingRecord(null);
    alert('Kitap kaydı başarıyla güncellendi.');
  };

  // Silme işlemi (isteğe bağlı, backend'de DeleteLibraryBookCommand olmalı)
  const handleDeleteLibraryBook = (id: string) => {
    if (window.confirm('Bu kitap kaydını silmek istediğinizden emin misiniz?')) {
      setLibraryBooks(prev => prev.filter(lb => lb.id !== id));
      alert('Kitap kaydı silindi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/librarypage" className="flex items-center"> {/* Kütüphane ana sayfasına link */}
            <LibraryIcon size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Kütüphane</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/librarybooklist" className="text-white hover:text-gray-300 font-medium">
              Kitap Listesi {/* Bu sayfanın kendisi olabilir veya farklı bir görünüm */}
            </Link>
            <Link to="/libraryborrowpage" className="text-white hover:text-gray-300 font-medium">
              Ödünç Kitaplar {/* Ödünç verilenlerin listesi */}
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/loginpage" className="p-2 text-white hover:text-gray-300 rounded-full">
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425]">
            <Archive size={30} className="inline-block mr-2 align-middle" />
            Kütüphane Kitap Yönetimi
          </h1>
          <button
            onClick={() => { setShowAddForm(true); setEditingRecord(null); }}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Yeni Kitap Kaydı Ekle
          </button>
        </div>

        {/* Yeni Kitap Kaydı Ekleme Formu veya Düzenleme Formu */}
        {(showAddForm || editingRecord) && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-[#472425] mb-4">
              {editingRecord ? 'Kitap Kaydını Düzenle' : 'Yeni Kitap Kaydı'}
            </h2>
            <form onSubmit={editingRecord ? handleUpdateLibraryBook : handleAddLibraryBook} className="space-y-4">
              {!editingRecord && (
                <div>
                  <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">Kitap Seçin</label>
                  <select
                    name="bookId"
                    id="bookId"
                    value={newRecord.bookId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                    required
                  >
                    {availableBooks.length === 0 && <option value="" disabled>Uygun kitap bulunamadı</option>}
                    {availableBooks.map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>
                </div>
              )}
              {editingRecord && (
                 <div>
                    <p className="block text-sm font-medium text-gray-700">Kitap Adı</p>
                    <p className="mt-1 text-lg text-[#472425]">{editingRecord.bookTitle}</p>
                 </div>
              )}
              <div>
                <label htmlFor="totalCount" className="block text-sm font-medium text-gray-700">Toplam Adet</label>
                <input
                  type="number"
                  name="totalCount"
                  id="totalCount"
                  value={editingRecord ? editingRecord.totalCount : newRecord.totalCount}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="availableCount" className="block text-sm font-medium text-gray-700">Mevcut Adet</label>
                <input
                  type="number"
                  name="availableCount"
                  id="availableCount"
                  value={editingRecord ? editingRecord.availableCount : newRecord.availableCount}
                  onChange={handleInputChange}
                  min="0"
                  max={editingRecord ? editingRecord.totalCount : newRecord.totalCount}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setEditingRecord(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660000] hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  {editingRecord ? 'Kaydı Güncelle' : 'Kaydı Ekle'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Kütüphane Kitap Listesi Tablosu */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Adet</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mevcut Adet</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {libraryBooks.length > 0 ? (
                libraryBooks.map((lb) => (
                  <tr key={lb.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lb.bookTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lb.totalCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lb.availableCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                      <button
                        onClick={() => { setEditingRecord(lb); setShowAddForm(false); }}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                        title="Düzenle"
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteLibraryBook(lb.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-150"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Kütüphanenizde henüz kayıtlı kitap bulunmamaktadır.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen size={24} className="text-[#660000] mr-2" />
              <span className="text-lg font-bold text-[#472425]">BookGuide</span>
            </div>
            {/* Footer linkleri isteğe bağlı olarak eklenebilir veya kaldırılabilir */}
          </div>
          <div className="mt-4 text-center text-[#5f4b44]/80 text-sm">
            &copy; {new Date().getFullYear()} BookGuide. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryBorrowPage;