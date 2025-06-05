import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Library as LibraryIcon,
  ListChecks, // Sayfa başlığı için ikon
  Info,       // Detaylar butonu için ikon
  X,          // Modal kapatma ikonu
  BookUp,     // Ödünç alma ikonu
  AlertCircle, // Uyarılar için
} from 'lucide-react';

// Backend'den gelen GetLibraryBooksQueryResponse.Books içindeki model
interface LibraryBookInventoryViewModel {
  libraryBookId: string; // LibraryBook entity'sinin Id'si
  bookId: string;        // Book entity'sinin Id'si
  title: string;
  author: string;
  category: string;
  totalCount: number;
  availableCount: number;
}

// Backend'den gelen GetLibraryBookQueryResponse.Book içindeki model
interface LibraryStockViewModel {
  libraryId: string;
  libraryName: string;
  totalCount: number;
  availableCount: number;
}

interface BookBorrowingRecordViewModel {
  username: string;
  startDate: string; // Tarihleri string olarak alıp formatlayabiliriz
  endDate: string;
  status: string;
  libraryName: string;
}

interface LibraryBookWithBorrowingsViewModel {
  bookId: string;
  title: string;
  author: string;
  description: string;
  category: string;
  isOnline: boolean;
  fileId?: string;
  stock: LibraryStockViewModel;
  borrowings: BookBorrowingRecordViewModel[];
}

// Örnek Kütüphane Envanter Verileri (GetLibraryBooksQuery simülasyonu)
// Bu veriler, belirli bir kütüphaneye ait olmalıdır.
const mockLibraryId = 'library-guid-1'; // Simülasyon için sabit bir kütüphane ID'si

const mockLibraryBooksInventory: LibraryBookInventoryViewModel[] = [
  { libraryBookId: 'lib-book-guid-1', bookId: 'book-guid-1', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', category: 'Roman', totalCount: 10, availableCount: 7 },
  { libraryBookId: 'lib-book-guid-2', bookId: 'book-guid-2', title: '1984', author: 'George Orwell', category: 'Bilim Kurgu', totalCount: 5, availableCount: 5 },
  { libraryBookId: 'lib-book-guid-3', bookId: 'book-guid-3', title: 'Sefiller', author: 'Victor Hugo', category: 'Roman', totalCount: 8, availableCount: 0 },
  { libraryBookId: 'lib-book-guid-4', bookId: 'book-guid-4', title: 'Yüzüklerin Efendisi', author: 'J.R.R. Tolkien', category: 'Fantastik', totalCount: 3, availableCount: 1 },
  { libraryBookId: 'lib-book-guid-5', bookId: 'book-guid-5', title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry', category: 'Çocuk Kitapları', totalCount: 12, availableCount: 10 },
];

// Örnek Kitap Detay Verileri (GetLibraryBookQuery simülasyonu)
const mockBookDetailsData: { [key: string]: LibraryBookWithBorrowingsViewModel } = {
  'lib-book-guid-1': {
    bookId: 'book-guid-1', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski',
    description: 'Rus edebiyatının önemli eserlerinden biri olan Suç ve Ceza, Raskolnikov\'un iç çatışmalarını ve ahlaki sorgulamalarını konu alır.',
    category: 'Roman', isOnline: false,
    stock: { libraryId: mockLibraryId, libraryName: 'Merkez Kütüphane', totalCount: 10, availableCount: 7 },
    borrowings: [
      { username: 'ahmet_y', startDate: '2023-10-01T00:00:00Z', endDate: '2023-10-15T00:00:00Z', status: 'Returned', libraryName: 'Merkez Kütüphane' },
      { username: 'zeynep_k', startDate: '2023-11-01T00:00:00Z', endDate: '2023-11-15T00:00:00Z', status: 'Borrowed', libraryName: 'Merkez Kütüphane' },
    ]
  },
  'lib-book-guid-2': {
    bookId: 'book-guid-2', title: '1984', author: 'George Orwell',
    description: 'Distopik bir gelecekte totaliter bir rejimin baskısı altında yaşayan insanların hikayesi.',
    category: 'Bilim Kurgu', isOnline: false,
    stock: { libraryId: mockLibraryId, libraryName: 'Merkez Kütüphane', totalCount: 5, availableCount: 5 },
    borrowings: []
  },
  'lib-book-guid-3': {
    bookId: 'book-guid-3', title: 'Sefiller', author: 'Victor Hugo',
    description: 'Fransız Devrimi sonrası Paris\'in yoksul kesimlerinin ve Jean Valjean\'ın dramatik öyküsü.',
    category: 'Roman', isOnline: false,
    stock: { libraryId: mockLibraryId, libraryName: 'Merkez Kütüphane', totalCount: 8, availableCount: 0 },
    borrowings: []
  },
   'lib-book-guid-4': {
    bookId: 'book-guid-4', title: 'Yüzüklerin Efendisi', author: 'J.R.R. Tolkien',
    description: 'Orta Dünya\'da geçen epik bir fantastik macera.',
    category: 'Fantastik', isOnline: false,
    stock: { libraryId: mockLibraryId, libraryName: 'Merkez Kütüphane', totalCount: 3, availableCount: 1 },
    borrowings: [ { username: 'can_b', startDate: '2023-12-01T00:00:00Z', endDate: '2023-12-20T00:00:00Z', status: 'Borrowed', libraryName: 'Merkez Kütüphane' }]
  },
  'lib-book-guid-5': {
    bookId: 'book-guid-5', title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry',
    description: 'Bir pilotun Sahra Çölü\'nde karşılaştığı küçük bir prensle olan dostluğunu ve hayat derslerini anlatır.',
    category: 'Çocuk Kitapları', isOnline: true, fileId: "file-prince-123",
    stock: { libraryId: mockLibraryId, libraryName: 'Merkez Kütüphane', totalCount: 12, availableCount: 10 },
    borrowings: []
  },
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'Bilinmiyor';
  return new Date(dateString).toLocaleDateString('tr-TR');
};

const ViewAllBooks: React.FC = () => {
  const [books, setBooks] = useState<LibraryBookInventoryViewModel[]>([]);
  const [selectedBookDetail, setSelectedBookDetail] = useState<LibraryBookWithBorrowingsViewModel | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // GetLibraryBooksQuery simülasyonu
    const fetchBooks = async () => {
      setIsLoadingList(true);
      // Gerçek uygulamada: const response = await api.getLibraryBooks(mockLibraryId);
      // setBooks(response.books);
      await new Promise(resolve => setTimeout(resolve, 1000)); // API gecikmesi simülasyonu
      setBooks(mockLibraryBooksInventory);
      setIsLoadingList(false);
    };
    fetchBooks();
  }, []);

  const handleViewDetails = async (libraryBookId: string) => {
    setIsLoadingDetail(true);
    setIsDetailModalOpen(true);
    // GetLibraryBookQuery simülasyonu
    // Gerçek uygulamada: const response = await api.getLibraryBook(libraryBookId);
    // setSelectedBookDetail(response.book);
    await new Promise(resolve => setTimeout(resolve, 700)); // API gecikmesi simülasyonu
    const detail = mockBookDetailsData[libraryBookId];
    setSelectedBookDetail(detail || null);
    setIsLoadingDetail(false);
  };

  const handleBorrowBook = (bookId: string, libraryBookId: string) => {
    // Ödünç alma işlemi burada backend'e gönderilecek.
    // Örnek: await api.borrowBook({ userId: 'currentUserId', bookId, libraryId: selectedBookDetail?.stock.libraryId });
    alert(`'${selectedBookDetail?.title}' adlı kitabı ödünç alma isteği gönderildi (Kitap ID: ${bookId}, Kütüphane Kitap ID: ${libraryBookId}).`);
    // İdeal olarak, işlem sonrası modal kapatılabilir veya kullanıcıya geri bildirim güncellenebilir.
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBookDetail(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/librarypage" className="flex items-center">
            <LibraryIcon size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Kütüphane</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {/* Aktif sayfa linki farklı stil alabilir veya kaldırılabilir */}
            <span className="text-gray-300 font-medium">Tüm Kitaplar</span>
            <Link to="/myborrowedbooks" className="text-white hover:text-gray-300 font-medium">
              Ödünç Aldıklarım
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
            <ListChecks size={30} className="inline-block mr-2 align-middle" />
            Kütüphanedeki Kitaplar
          </h1>
        </div>

        {isLoadingList ? (
          <p className="text-center text-gray-500 mt-10">Kitaplar yükleniyor...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Kütüphanede gösterilecek kitap bulunmamaktadır.</p>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mevcut Adet</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.libraryBookId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.availableCount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {book.availableCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <button
                        onClick={() => handleViewDetails(book.libraryBookId)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center mx-auto"
                        title="Detayları Görüntüle"
                      >
                        <Info size={18} className="mr-1" /> Detaylar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Kitap Detay Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {isLoadingDetail ? (
              <p className="text-center text-gray-600">Detaylar yükleniyor...</p>
            ) : selectedBookDetail ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-[#472425]">{selectedBookDetail.title}</h2>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-1"><strong>Yazar:</strong> {selectedBookDetail.author}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Kategori:</strong> {selectedBookDetail.category}</p>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed"><strong>Açıklama:</strong> {selectedBookDetail.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <h4 className="text-md font-semibold text-[#472425] mb-1">Kütüphane Bilgileri ({selectedBookDetail.stock.libraryName})</h4>
                  <p className="text-sm text-gray-600">Toplam Kopya: {selectedBookDetail.stock.totalCount}</p>
                  <p className="text-sm text-gray-600">Ödünç Verilebilir: 
                    <span className={`font-semibold ml-1 ${selectedBookDetail.stock.availableCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedBookDetail.stock.availableCount}
                    </span>
                  </p>
                  {selectedBookDetail.isOnline && selectedBookDetail.fileId && (
                     <p className="text-sm text-blue-600 mt-1">Bu kitap online olarak da okunabilir.</p>
                  )}
                </div>

                {selectedBookDetail.borrowings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-[#472425] mb-2">Ödünç Alma Geçmişi (Bu Kütüphanede)</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                      {selectedBookDetail.borrowings.map((borrow, index) => (
                        <li key={index}>
                          {borrow.username} tarafından {formatDate(borrow.startDate)} - {formatDate(borrow.endDate)} ({borrow.status})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={() => handleBorrowBook(selectedBookDetail.bookId, selectedBookDetail.stock.libraryId)} // libraryBookId de gönderilebilir, backend'e göre
                    disabled={selectedBookDetail.stock.availableCount === 0}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660000] hover:bg-[#800000] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    <BookUp size={18} className="mr-2" />
                    {selectedBookDetail.stock.availableCount > 0 ? 'Ödünç Al' : 'Stokta Yok'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <AlertCircle size={24} className="mx-auto text-red-500 mb-2" />
                <p className="text-red-500">Kitap detayları bulunamadı.</p>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Kapat
                  </button>
              </div>
            )}
          </div>
        </div>
      )}

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

export default ViewAllBooks;