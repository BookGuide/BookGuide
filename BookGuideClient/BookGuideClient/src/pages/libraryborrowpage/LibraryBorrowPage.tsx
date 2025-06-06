import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Library as LibraryIcon, // Kütüphane ana ikonu
  Trash2,
  ClipboardList, // Sayfa başlığı için yeni ikon
} from 'lucide-react';

// Backend'deki BorrowingRecordViewModel'e karşılık gelen arayüz
interface BorrowingRecord {
  id: string; // Ödünç kaydının benzersiz ID'si
  bookName: string; // Kitap Adı
  username: string; // Ödünç Alan Kişi
  bookAuthor?: string; // Kitap Yazarı (Opsiyonel, backend modelinde yoksa)
  borrowDate: string; // Ödünç Alma Tarihi (Backend'den StartDate)
  borrowEndDate?: string; // Ödünç Bitiş Tarihi (Backend'den EndDate, opsiyonel)
}

// Örnek ödünç verilmiş kitap verileri (Gerçek uygulamada API'den gelecek)
const initialBorrowingData: BorrowingRecord[] = [
  { id: 'borrow-guid-1', bookName: 'Suç ve Ceza', bookAuthor: 'Fyodor Dostoyevski', username: 'Ahmet Yılmaz', borrowDate: '2023-10-15', borrowEndDate: '2023-11-15' },
  { id: 'borrow-guid-2', bookName: '1984', bookAuthor: 'George Orwell', username: 'Ayşe Kaya', borrowDate: '2023-10-20', borrowEndDate: '2023-11-20' },
  { id: 'borrow-guid-3', bookName: 'Sefiller', bookAuthor: 'Victor Hugo', username: 'Mehmet Demir', borrowDate: '2023-09-01', borrowEndDate: '2023-10-01' },
];


const LibraryBorrowPage: React.FC = () => {
  const [borrowingRecords, setBorrowingRecords] = useState<BorrowingRecord[]>(initialBorrowingData);
  const navigate = useNavigate();

  // Ödünç kaydını silme
  const handleDeleteBorrowingRecord = (id: string) => {
    if (window.confirm('Bu ödünç kaydını silmek istediğinizden emin misiniz?')) {
      setBorrowingRecords(prev => prev.filter(record => record.id !== id));
      alert('Ödünç kaydı başarıyla silindi.');
      // TODO: API çağrısı ile backend'den silme işlemi yapılmalı.
      // Örneğin: await api.delete(`/borrowings/${id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı sil
    navigate('/login'); // Giriş sayfasına yönlendir
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
          <div className="flex items-center space-x-4"> {/* onClick eklendi ve Link div ile değiştirildi */}
            <div onClick={handleLogout} className="p-2 text-white hover:text-gray-300 rounded-full cursor-pointer">
              <LogOut size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425] flex items-center">
            <ClipboardList size={30} className="mr-2" />
            Ödünç Verilen Kitaplar
          </h1>
        </div>

        {/* Ödünç Verilen Kitaplar Listesi Tablosu */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ödünç Alan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ödünç Alma Tarihi</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ödünç Bitiş Tarihi</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {borrowingRecords.length > 0 ? (
                borrowingRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.bookName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{record.bookAuthor || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{record.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{new Date(record.borrowDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{record.borrowEndDate ? new Date(record.borrowEndDate).toLocaleDateString() : '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleDeleteBorrowingRecord(record.id)}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Henüz ödünç verilmiş kitap bulunmamaktadır.
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