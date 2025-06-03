import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  PlusCircle,
  Trash2,
  List // Liste başlığı için veya genel bir ikon olarak
} from 'lucide-react';

// Kitap verisi için arayüz
interface BookItem {
  id: string; // Backend'den Guid string olarak gelecek
  title: string;
  author: string;
  description: string;
  category: string; // Backend'deki enum'ı string olarak temsil ediyoruz
  isOnline: boolean;
  fileId?: string | null; // Online ise dosya ID'si
}

// Örnek Kategori seçenekleri (Backend'deki Book_Category enum'una göre düzenlenmeli)
const bookCategories = [
  "Roman",
  "Bilim Kurgu",
  "Tarih",
  "Eğitim",
  "Felsefe",
  "Polisiye",
  "Çocuk Kitapları",
  "Diğer"
];

const BookList: React.FC = () => {
  // Örnek kitap verileri (Gerçek uygulamada API'den gelecektir)
  const [books, setBooks] = useState<BookItem[]>([
    { id: '1', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', description: 'Rus edebiyatının önemli eserlerinden...', category: 'Roman', isOnline: false, fileId: null },
    { id: '2', title: '1984', author: 'George Orwell', description: 'Distopik bir gelecek tasviri...', category: 'Bilim Kurgu', isOnline: true, fileId: 'file-abc-123' },
    { id: '3', title: 'Hayvan Çiftliği', author: 'George Orwell', description: 'Politik hiciv...', category: 'Roman', isOnline: false, fileId: null },
    { id: '4', title: 'Sefiller', author: 'Victor Hugo', description: 'Fransız Devrimi sonrası yaşamlar...', category: 'Roman', isOnline: true, fileId: 'file-xyz-789' },
  ]);

  // Yeni kitap ekleme formu için state
  const [newBook, setNewBook] = useState<Omit<BookItem, 'id'>>({
    title: '',
    author: '',
    description: '',
    category: bookCategories[0], // Varsayılan kategori
    isOnline: false,
    fileId: ''
  });
  const [showAddForm, setShowAddForm] = useState(false); // Ekleme formunu gösterme/gizleme

// Form input değişikliklerini yönetme (text, number, select, textarea)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Checkbox için

    setNewBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Eğer online değilse fileId'yi temizle
      ...(name === 'isOnline' && !checked && { fileId: '' })
    }));
  };

  // Yeni kitap ekleme
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.description || !newBook.category) {
      alert('Lütfen başlık, yazar, açıklama ve kategori alanlarını doldurun.');
      return;
    }
    if (newBook.isOnline && !newBook.fileId) {
      alert('Online kitap için Dosya ID gereklidir.');
      return;
    }

    const bookToAdd: BookItem = {
      id: (Date.now() + Math.random()).toString(), // Geçici ID, backend'den gerçek ID gelecek
      ...newBook,
      fileId: newBook.isOnline ? newBook.fileId : null,
    };
    setBooks(prevBooks => [...prevBooks, bookToAdd]);
    setNewBook({ title: '', author: '', description: '', category: bookCategories[0], isOnline: false, fileId: '' }); // Formu temizle
    setShowAddForm(false); // Formu gizle
    alert('Kitap başarıyla eklendi.');
  };

  // Kitap silme
  const handleDeleteBook = (id: number) => {
    if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id.toString())); // ID string olduğu için toString()
      alert('Kitap başarıyla silindi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin" className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Admin</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/librarylist" className="text-white hover:text-gray-300 font-medium">
              Kütüphaneler
            </Link>
            <Link to="/booklist" className="text-white hover:text-gray-300 font-medium">
              Kitaplar
            </Link>
            <Link to="/borrowlist" className="text-white hover:text-gray-300 font-medium">
              Ödünç Kitaplar
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/settings" className="p-2 text-white hover:text-gray-300 rounded-full">
              <Settings size={20} />
            </Link>
            <Link to="/logout" className="p-2 text-white hover:text-gray-300 rounded-full">
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425]">
            <List size={30} className="inline-block mr-2 align-middle" />
            Kitap Listesi
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            {showAddForm ? 'Formu Kapat' : 'Yeni Kitap Ekle'}
          </button>
        </div>

        {/* Yeni Kitap Ekleme Formu */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-[#472425] mb-4">Yeni Kitap Bilgileri</h2>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlık</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Yazar</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  name="description"
                  id="description"
                  value={newBook.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  name="category"
                  id="category"
                  value={newBook.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                >
                  {bookCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="isOnline"
                  name="isOnline"
                  type="checkbox"
                  checked={newBook.isOnline}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#660000] focus:ring-[#660000] border-gray-300 rounded"
                />
                <label htmlFor="isOnline" className="ml-2 block text-sm text-gray-900">
                  Online Kitap mı?
                </label>
              </div>
              {newBook.isOnline && (
                <div>
                  <label htmlFor="fileId" className="block text-sm font-medium text-gray-700">Dosya ID</label>
                  <input
                    type="text"
                    name="fileId"
                    id="fileId"
                    value={newBook.fileId || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                    placeholder="Online kitap için dosya ID'si"
                    required={newBook.isOnline}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewBook({ // Formu iptal edince temizle
                      title: '',
                      author: '',
                      description: '',
                      category: bookCategories[0],
                      isOnline: false,
                      fileId: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660000] hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  Kitabı Kaydet
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Kitap Listesi Tablosu */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Online Durumu
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosya ID
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{book.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {book.isOnline ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{book.fileId || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleDeleteBook(parseInt(book.id))} // handleDeleteBook number bekliyor, düzeltilmeli veya id string olmalı
                        className="text-red-600 hover:text-red-800 transition-colors duration-150"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                      {/* Düzenleme butonu da buraya eklenebilir */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Henüz hiç kitap eklenmemiş.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto"> {/* mt-auto ile footer'ı aşağıya sabitler */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen size={24} className="text-[#660000] mr-2" />
              <span className="text-lg font-bold text-[#472425]">BookGuide</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/help" className="text-[#5f4b44] hover:text-[#660000]">Yardım</Link>
              <Link to="/contact" className="text-[#5f4b44] hover:text-[#660000]">İletişim</Link>
              <Link to="/privacy" className="text-[#5f4b44] hover:text-[#660000]">Gizlilik</Link>
              <Link to="/terms" className="text-[#5f4b44] hover:text-[#660000]">Kullanım Şartları</Link>
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

export default BookList;
