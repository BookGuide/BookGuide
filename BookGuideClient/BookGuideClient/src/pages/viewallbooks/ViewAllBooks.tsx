import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  Library as LibraryIcon, // Kütüphane ana ikonu
  BookMarked, // Sayfa başlığı için ikon
  Info, // Detaylar için ikon (opsiyonel)
  PlusCircle, // Yeni kayıt ekleme butonu için ikon
  Edit3, // Düzenleme butonu için ikon
  CheckCircle2, // Kaydetme butonu için ikon
  XCircle, // İptal butonu için ikon
} from 'lucide-react';

// Genel Kitap Bilgileri (BookList.tsx'deki BookItem'a benzer)
interface BookDetails {
  id: string; // BookId (Guid)
  title: string;
  author: string;
  description: string;
  category: string;
}

// Kütüphanenin sahip olduğu kitapların listelenmesi için arayüz
// LibraryBook entity'si ve ilişkili Book entity'sinden gelen bilgileri birleştirir
interface DisplayLibraryBook {
  libraryBookId: string; // LibraryBook entity'sinin Id'si (Guid)
  bookInfo: BookDetails; // Kitabın genel detayları
  totalCount: number;    // Kütüphanedeki toplam kopya sayısı
  availableCount: number; // Ödünç verilebilir kopya sayısı
}

// Örnek Genel Kitap Verileri (Normalde API'den veya state management'tan gelir)
const allSystemBooks: BookDetails[] = [
  { id: 'book-guid-1', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', description: 'Rus edebiyatının önemli eserlerinden...', category: 'Roman' },
  { id: 'book-guid-2', title: '1984', author: 'George Orwell', description: 'Distopik bir gelecek tasviri...', category: 'Bilim Kurgu' },
  { id: 'book-guid-3', title: 'Sefiller', author: 'Victor Hugo', description: 'Fransız Devrimi sonrası yaşamlar...', category: 'Roman' },
  { id: 'book-guid-4', title: 'Yüzüklerin Efendisi', author: 'J.R.R. Tolkien', description: 'Fantastik bir dünya...', category: 'Fantastik' },
  { id: 'book-guid-5', title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry', description: 'Çocuklar ve yetişkinler için...', category: 'Çocuk Kitapları' },
];

// Örnek Kütüphane Envanter Verileri (LibraryBook kayıtları - Normalde API'den gelir)
// Bu veriler, giriş yapmış kütüphaneye ait olmalıdır.
const libraryInventoryData: { libraryBookId: string, bookId: string, totalCount: number, availableCount: number }[] = [
  { libraryBookId: 'lib-book-guid-1', bookId: 'book-guid-1', totalCount: 10, availableCount: 7 },
  { libraryBookId: 'lib-book-guid-2', bookId: 'book-guid-2', totalCount: 5, availableCount: 5 },
  { libraryBookId: 'lib-book-guid-4', bookId: 'book-guid-4', totalCount: 3, availableCount: 1 },
];


const LibraryBookList: React.FC = () => {
  const [displayBooks, setDisplayBooks] = useState<DisplayLibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Satır içi düzenleme için state'ler
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{ totalCount: string; availableCount: string }>({ totalCount: '', availableCount: '' });

  // Yeni kütüphane kitap kaydı formu için state
  const initialBookIdForForm = allSystemBooks.length > 0 ? allSystemBooks[0].id : '';
  const [newRecord, setNewRecord] = useState<{ bookId: string; totalCount: number; availableCount: number }>({
    bookId: initialBookIdForForm,
    totalCount: 1,
    availableCount: 1,
  });

  useEffect(() => {
    // API çağrısı simülasyonu
    // Gerçek uygulamada, kütüphanenin LibraryId'si ile LibraryBook kayıtları ve ilişkili Book detayları çekilir.
    const loadLibraryBooks = () => {
      setIsLoading(true);
      const enrichedBooks: DisplayLibraryBook[] = libraryInventoryData.map(item => {
        const bookDetail = allSystemBooks.find(b => b.id === item.bookId);
        return {
          libraryBookId: item.libraryBookId,
          bookInfo: bookDetail || { id: item.bookId, title: 'Bilinmeyen Kitap', author: 'Bilinmiyor', description: '', category: 'Bilinmiyor' },
          totalCount: item.totalCount,
          availableCount: item.availableCount,
        };
      });
      setDisplayBooks(enrichedBooks);
      setIsLoading(false);
      // Eğer form için başlangıç bookId'si boşsa ve kitaplar yüklendiyse güncelle
      if (!newRecord.bookId && allSystemBooks.length > 0) {
        setNewRecord(prev => ({ ...prev, bookId: allSystemBooks[0].id }));
      }
    };

    loadLibraryBooks();
    // Bu useEffect'in bağımlılıkları, `allSystemBooks` ve `libraryInventoryData`'nın nasıl yüklendiğine bağlı olarak değişebilir.
    // Şimdilik sadece `newRecord.bookId` bırakıyorum, çünkü `loadLibraryBooks` içindeki `newRecord` ile ilgili mantık buna bağlı.
  }, [newRecord.bookId]);

  // Form input değişikliklerini yönetme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseInt(value, 10) : value;

    setNewRecord(prev => {
      const updatedRecord = { ...prev, [name]: val };
      // Mevcut adet, toplam adetten fazla olamaz. Total count değişirse available count'u ayarla.
      if (name === 'totalCount' && updatedRecord.availableCount > updatedRecord.totalCount) {
        updatedRecord.availableCount = updatedRecord.totalCount;
      }
      return updatedRecord;
    });
  };

  // Yeni kütüphane kitap kaydı ekleme
  const handleAddLibraryBookRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.bookId || newRecord.totalCount < 0 || newRecord.availableCount < 0) {
      alert('Lütfen geçerli bir kitap seçin ve adetleri doğru girin (0 veya daha fazla).');
      return;
    }
    if (newRecord.availableCount > newRecord.totalCount) {
      alert('Mevcut adet, toplam adetten fazla olamaz.');
      return;
    }
    if (displayBooks.some(db => db.bookInfo.id === newRecord.bookId)) {
      alert('Bu kitap zaten kütüphane envanterinizde mevcut. Adetleri güncellemek için "Ödünç Kitaplar" sayfasını kullanabilirsiniz.');
      return;
    }

    const selectedBookDetails = allSystemBooks.find(b => b.id === newRecord.bookId);
    if (!selectedBookDetails) {
      alert('Seçilen kitap sistemde bulunamadı.');
      return;
    }

    const newDisplayBook: DisplayLibraryBook = {
      libraryBookId: `lib-book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Geçici benzersiz ID
      bookInfo: selectedBookDetails,
      totalCount: newRecord.totalCount,
      availableCount: newRecord.availableCount,
    };

    setDisplayBooks(prevBooks => [...prevBooks, newDisplayBook]);
    setNewRecord({ bookId: initialBookIdForForm, totalCount: 1, availableCount: 1 });
    setShowAddForm(false);
    alert('Kitap kaydı başarıyla kütüphaneye eklendi.');
  };

  // Stok güncelleme düzenlemesini başlatma
  const handleStartEdit = (book: DisplayLibraryBook) => {
    setEditingRowId(book.libraryBookId);
    setEditFormData({
      totalCount: book.totalCount.toString(),
      availableCount: book.availableCount.toString(),
    });
  };

  // Düzenleme formundaki input değişikliklerini yönetme
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Stok güncellemesini kaydetme
  const handleSaveStock = (libraryBookId: string) => {
    const totalCount = parseInt(editFormData.totalCount, 10);
    const availableCount = parseInt(editFormData.availableCount, 10);

    if (isNaN(totalCount) || isNaN(availableCount) || totalCount < 0 || availableCount < 0) {
      alert('Lütfen geçerli stok adetleri girin (0 veya daha fazla).');
      return;
    }
    if (availableCount > totalCount) {
      alert('Mevcut adet, toplam adetten fazla olamaz.');
      return;
    }

    // Backend API çağrısı burada yapılmalı (UpdateLibraryBookCommand kullanarak)
    // Örnek: await api.updateLibraryBookStock(libraryBookId, totalCount, availableCount);
    // Bu çağrı için backend'de UpdateLibraryBookCommandRequest'e uygun bir endpoint olmalı.
    // public class UpdateLibraryBookCommandRequest : IRequest<UpdateLibraryBookCommandResponse>
    // {
    //     public Guid Id { get; set; } // Bu libraryBookId'ye karşılık gelir
    //     public int TotalCount { get; set; }
    //     public int AvailableCount { get; set; }
    // }

    setDisplayBooks(prevBooks =>
      prevBooks.map(book =>
        book.libraryBookId === libraryBookId
          ? { ...book, totalCount, availableCount }
          : book
      )
    );
    setEditingRowId(null);
    alert('Stok bilgileri başarıyla güncellendi.');
  };

  // Düzenlemeyi iptal etme
  const handleCancelEdit = () => {
    setEditingRowId(null);
    // editFormData'yı sıfırlamaya gerek yok, handleStartEdit'te tekrar set edilecek.
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
              Kitap Listesi {/* Bu sayfanın kendisi */}
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
            <BookMarked size={30} className="inline-block mr-2 align-middle" />
            Kütüphanemdeki Kitaplar
          </h1>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (!showAddForm && !newRecord.bookId && allSystemBooks.length > 0) { // Form açılırken bookId boşsa ve kitap varsa ata
                setNewRecord(prev => ({ ...prev, bookId: allSystemBooks[0].id }));
              }
            }}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            {showAddForm ? 'Formu Kapat' : 'Yeni Kitap Kaydı Ekle'}
          </button>
        </div>

        {/* Yeni Kitap Kaydı Ekleme Formu */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-[#472425] mb-4">Yeni Kitap Kaydı Bilgileri</h2>
            <form onSubmit={handleAddLibraryBookRecord} className="space-y-4">
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
                  {allSystemBooks.length === 0 ? (
                    <option value="" disabled>Sistemde eklenecek kitap bulunamadı</option>
                  ) : (
                    allSystemBooks.map(book => (
                      <option key={book.id} value={book.id}>
                        {book.title} - ({book.author})
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="totalCount" className="block text-sm font-medium text-gray-700">Toplam Stok Adedi</label>
                <input
                  type="number"
                  name="totalCount"
                  id="totalCount"
                  value={newRecord.totalCount}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="availableCount" className="block text-sm font-medium text-gray-700">Mevcut (Ödünç Verilebilir) Stok Adedi</label>
                <input
                  type="number"
                  name="availableCount"
                  id="availableCount"
                  value={newRecord.availableCount}
                  onChange={handleInputChange}
                  min="0"
                  max={newRecord.totalCount} // Mevcut adet toplam adetten fazla olamaz
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewRecord({ bookId: initialBookIdForForm, totalCount: 1, availableCount: 1 });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={allSystemBooks.length === 0} // Eğer eklenecek kitap yoksa butonu devre dışı bırak
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660000] hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000] disabled:opacity-50"
                >
                  Kaydı Ekle
                </button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-gray-500 mt-10">Kitaplar yükleniyor...</p>
        ) : displayBooks.length === 0 && !showAddForm ? ( // Form açık değilken ve kitap yoksa mesaj göster
          <p className="text-center text-gray-500 mt-10">Kütüphanenizde gösterilecek kitap bulunmamaktadır.</p>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Stok</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mevcut Stok</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayBooks.map((item) => (
                  <tr key={item.libraryBookId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-middle">{item.bookInfo.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-middle">{item.bookInfo.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-middle">{item.bookInfo.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 align-middle">
                      {editingRowId === item.libraryBookId ? (
                        <input
                          type="number"
                          name="totalCount"
                          value={editFormData.totalCount}
                          onChange={handleEditFormChange}
                          min="0"
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                        />
                      ) : (
                        item.totalCount
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700 align-middle">
                      {editingRowId === item.libraryBookId ? (
                        <input
                          type="number"
                          name="availableCount"
                          value={editFormData.availableCount}
                          onChange={handleEditFormChange}
                          min="0"
                          max={parseInt(editFormData.totalCount, 10) || 0}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                        />
                      ) : (
                        item.availableCount
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm align-middle">
                      {editingRowId === item.libraryBookId ? (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleSaveStock(item.libraryBookId)}
                            className="text-green-600 hover:text-green-800 transition-colors duration-150"
                            title="Kaydet"
                          >
                            <CheckCircle2 size={20} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-800 transition-colors duration-150"
                            title="İptal"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                          title="Stok Güncelle"
                        >
                          <Edit3 size={20} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
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