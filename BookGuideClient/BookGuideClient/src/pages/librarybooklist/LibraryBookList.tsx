import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  libraryBookId: string; // This should always be a valid string for React keys
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
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{ totalCount: string; availableCount: string }>({
    totalCount: '',
    availableCount: '',
  });
  const navigate = useNavigate();

  const getLibraryIdFromToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decoded: any = jwtDecode(token);
      const libraryIdClaim = decoded['library_id'];
      if (libraryIdClaim) {
        return libraryIdClaim;
      } else {
        return null;
      }
    } catch (error) {
      console.error('[Debug] Token çözümlenirken hata oluştu:', error);
      return null;
    }
  };

  useEffect(() => {
    const libraryId = getLibraryIdFromToken();

    const fetchBooksAndInventory = async () => {
      try {
        const booksRes = await fetch('https://localhost:7127/api/Book/GetBooks');
        const booksData = await booksRes.json();

        const inventoryRes = await fetch(`https://localhost:7127/api/LibraryBook/GetLibraryBooks?LibraryId=${libraryId}`);
        const inventoryData = await inventoryRes.json();

        if (!booksRes.ok) {
          console.error("Error fetching books:", booksData);
          alert(`Kitap listesi yüklenirken hata oluştu: ${booksData.message || 'Sunucu hatası'}`);
          return;
        }
        if (!inventoryRes.ok) {
          console.error("Error fetching inventory data:", inventoryData);
          alert(`Kütüphane envanteri yüklenirken hata oluştu: ${inventoryData.message || 'Sunucu hatası'}`);
          return;
        }

        if (booksData.succeeded && inventoryData.succeeded && booksData.books && inventoryData.books) {
          const books: BookDetails[] = booksData.books;
          setAllSystemBooks(books);
          // Define type for library book data coming from the API
          type ApiLibraryBook = { id?: string; libraryBookId?: string; bookId: string; totalCount: number; availableCount: number };
          const libraryBooks = inventoryData.books.map((libBook: ApiLibraryBook) => {
            let currentLibraryBookId = libBook.id; // Prefer 'id'
            if (!currentLibraryBookId && libBook.libraryBookId) {
              // Fallback to 'libraryBookId' if 'id' is missing but 'libraryBookId' exists
              console.warn(
                "[Warning] Kütüphane kitap verisi 'id' alanı olmadan geldi, ancak 'libraryBookId' alanı bulundu ve kullanılıyor. Lütfen backend API'nin (/api/LibraryBook/GetLibraryBooks) veri yapısını kontrol ederek 'id' alanının tutarlı bir şekilde gönderildiğinden emin olun. Gelen veri:",
                libBook
              );
              currentLibraryBookId = libBook.libraryBookId;
            } else if (!currentLibraryBookId) {
              // If no usable ID is found
              console.error(
                "[ERROR] Kütüphane kitap verisi için geçerli bir ID ('id' veya 'libraryBookId') bulunamadı. Bu kayıt listelemede sorunlara veya hatalara neden olabilir. Gelen veri:",
                libBook
              );
              // To prevent errors, you might want to assign a temporary unique ID or filter out this record.
              // For now, we'll let it pass, but it will likely cause key warnings if currentLibraryBookId remains undefined.
              // A better approach for production would be to filter it or assign a placeholder if absolutely necessary.
            }

            const bookDetail = books.find(b => b.id === libBook.bookId);
            return {
              libraryBookId: currentLibraryBookId || `fallback-${Math.random().toString(36).substr(2, 9)}`, // Ensure libraryBookId is always a string
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
          }).filter(book => book.libraryBookId && !book.libraryBookId.startsWith('fallback-')); // Filter out items where a proper ID couldn't be established

          setDisplayBooks(libraryBooks as DisplayLibraryBook[]);
          if (books.length > 0 && newRecord.bookId === '') {
            setNewRecord(prev => ({ ...prev, bookId: books[0].id }));
          }
        } else {
          alert('Veri alınırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      } catch (err) {
        console.error("Network or other error in fetchBooksAndInventory:", err);
        alert('Veriler yüklenirken bir ağ hatası veya başka bir sorun oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    if (libraryId) {
      setIsLoading(true);
      fetchBooksAndInventory();
    } else {
      setIsLoading(false);
      alert('Kütüphane bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
      navigate('/login');
    }
  }, [navigate]);

  const handleAddLibraryBookRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const libraryId = getLibraryIdFromToken();
    if (!libraryId) {
      alert('Oturumunuz sonlanmış veya kütüphane bilgisi eksik. Lütfen tekrar giriş yapın.');
      navigate('/login');
      return;
    }
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
        alert(`Ekleme işlemi başarısız: ${data.message || 'Bilinmeyen bir hata oluştu.'}`);
      }
    } catch (error) {
      console.error('Kitap ekleme hatası:', error);
      alert('Sunucu hatası oluştu veya ağ bağlantısı sorunu.');
    }
  };

  const handleEdit = (book: DisplayLibraryBook): void => {
    setEditingBookId(book.libraryBookId);
    setEditFormData({
      totalCount: book.totalCount.toString(),
      availableCount: book.availableCount.toString(),
    });
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateStock = async (libraryBookId: string) => {
    if (!libraryBookId) {
        alert('Güncellenecek kitap için geçerli bir ID bulunamadı.');
        console.error("handleUpdateStock called with invalid libraryBookId:", libraryBookId);
        return;
    }
    const totalCount = parseInt(editFormData.totalCount, 10);
    const availableCount = parseInt(editFormData.availableCount, 10);

    if (isNaN(totalCount) || isNaN(availableCount)) {
      alert('Lütfen geçerli stok miktarları girin.');
      return;
    }
    if (totalCount < 0 || availableCount < 0) {
      alert('Stok miktarları negatif olamaz.');
      return;
    }
    if (availableCount > totalCount) {
      alert('Mevcut stok adedi, toplam stok adedinden fazla olamaz.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Oturumunuz sonlanmış. Lütfen tekrar giriş yapın.');
        navigate('/login');
        return;
      }

      const response = await fetch('https://localhost:7127/api/LibraryBook/UpdateLibraryBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: libraryBookId,
          totalCount: totalCount,
          availableCount: availableCount,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Sunucu yanıtı JSON olarak parse edilemedi:', jsonError);
        console.error('Yanıt durumu:', response.status, 'Durum metni:', response.statusText);
        const textResponse = await response.text().catch(() => 'Yanıt metni okunamadı.');
        console.error('Ham yanıt metni:', textResponse);
        alert(`Stok güncellenemedi: Sunucudan beklenmedik yanıt (HTTP ${response.status}). Detaylar için konsolu kontrol edin.`);
        return;
      }

      if (response.ok && data.succeeded) {
        alert('Stok başarıyla güncellendi.');
        setDisplayBooks(prevBooks =>
          prevBooks.map(b =>
            b.libraryBookId === libraryBookId
              ? { ...b, totalCount: totalCount, availableCount: availableCount }
              : b
          ));
        setEditingBookId(null);
      } else {
        console.error('Stok güncelleme başarısız. Sunucu yanıtı:', data);
        console.error('Yanıt durumu:', response.status, 'Durum metni:', response.statusText);
        alert(`Stok güncellenemedi: ${data.message || response.statusText || `Sunucu hatası (HTTP ${response.status})`}`);
      }
    } catch (error) {
      console.error('Stok güncelleme sırasında genel hata:', error);
      alert('Stok güncellenirken bir ağ hatası veya başka bir sorun oluştu. Detaylar için konsolu kontrol edin.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
            <div onClick={handleLogout} className="p-2 text-white hover:text-gray-300 rounded-full cursor-pointer" title="Çıkış Yap">
              <LogOut size={20} />
            </div>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000]"
                required
              >
                {allSystemBooks.map((book: BookDetails) => (
                  <option key={book.id} value={book.id}>{book.title} - ({book.author})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Toplam Stok Adedi</label>
              <input
                type="number"
                value={newRecord.totalCount}
                onChange={(e) => setNewRecord({ ...newRecord, totalCount: parseInt(e.target.value) || 0 })}
                min={1}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mevcut Stok Adedi</label>
              <input
                type="number"
                value={newRecord.availableCount}
                onChange={(e) => setNewRecord({ ...newRecord, availableCount: parseInt(e.target.value) || 0 })}
                min={0}
                max={newRecord.totalCount}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000]"
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayBooks.map((book: DisplayLibraryBook) => (
                  <tr key={book.libraryBookId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookInfo.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.bookInfo.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.bookInfo.category}</td>
                    {editingBookId === book.libraryBookId ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <input
                            type="number"
                            name="totalCount"
                            value={editFormData.totalCount}
                            onChange={handleEditFormChange}
                            className="w-20 p-1 border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-1 focus:ring-[#660000] focus:border-[#660000]"
                            min="0"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <input
                            type="number"
                            name="availableCount"
                            value={editFormData.availableCount}
                            onChange={handleEditFormChange}
                            className="w-20 p-1 border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-1 focus:ring-[#660000] focus:border-[#660000]"
                            min="0"
                            max={editFormData.totalCount}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                          <button onClick={() => handleUpdateStock(book.libraryBookId)} className="text-green-600 hover:text-green-700 p-1" title="Kaydet">
                            <CheckCircle2 size={20} />
                          </button>
                          <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-700 p-1" title="İptal">
                            <XCircle size={20} />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{book.totalCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{book.availableCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <button onClick={() => handleEdit(book)} className="text-blue-600 hover:text-blue-700 p-1" title="Düzenle">
                            <Edit3 size={20} />
                          </button>
                        </td>
                      </>
                    )}
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
