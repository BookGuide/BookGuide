import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Loader2,
  Settings,
  LogOut,
  ClipboardList, // Ödünç alma listesi başlığı için ikon
} from 'lucide-react';

// Backend BorrowingRecordViewModel yapısına karşılık gelen interface
interface BorrowingRecord {
  username: string;
  bookName: string;
  startDate: string; // ISO 8601 string formatında bekliyoruz
  endDate: string;   // ISO 8601 string formatında bekliyoruz
  status: string;    // Backend'deki Borrowing_Status enum isimlerinden biri (string olarak)
  libraryName: string;
}

const BorrowList = () => {
  const [borrowings, setBorrowings] = useState<BorrowingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call to fetch borrowing records
    const fetchBorrowings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Gerçek API çağrısı burada yapılacak:
        // const response = await fetch('/api/borrowings'); // API endpoint'inize göre güncelleyin
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data: BorrowingRecord[] = await response.json();
        // setBorrowings(data);

        // Simüle edilmiş veri
        const simulatedData: BorrowingRecord[] = [
          {
            username: "ugurd",
            bookName: "Sefiller",
            startDate: "2023-10-26T10:00:00Z",
            endDate: "2023-11-26T10:00:00Z",
            status: "Active",
            libraryName: "Merkez Kütüphane"
          },
          {
            username: "ayse_k",
            bookName: "Suç ve Ceza",
            startDate: "2023-09-15T09:30:00Z",
            endDate: "2023-10-15T09:30:00Z",
            status: "Completed",
            libraryName: "Şube Kütüphane A"
          },
          {
            username: "mehmet_a",
            bookName: "Dönüşüm",
            startDate: "2023-10-20T14:00:00Z",
            endDate: "2023-11-20T14:00:00Z",
            status: "Overdue",
            libraryName: "Merkez Kütüphane"
          },
          {
            username: "fatma_y",
            bookName: "Küçük Prens",
            startDate: "2023-11-01T11:00:00Z",
            endDate: "2023-12-01T11:00:00Z",
            status: "Pending",
            libraryName: "Şube Kütüphane B"
          },
        ];

        setTimeout(() => {
          setBorrowings(simulatedData);
          setIsLoading(false);
        }, 1000); // Simüle edilmiş gecikme

      } catch (err) {
        console.error("Error fetching borrowings:", err);
        setError("Ödünç alma kayıtları yüklenirken bir hata oluştu.");
        setIsLoading(false);
      }
    };

    fetchBorrowings();
  }, []); // Boş dependency array, component mount edildiğinde bir kere çalışmasını sağlar

  // Tarih formatlama fonksiyonu (isteğe bağlı)
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('tr-TR', options);
    } catch (e) {
      console.error("Invalid date string:", dateString, e);
      return dateString; // Hata durumunda orijinal stringi göster
    }
  };

  // Durum metnini almak için yardımcı fonksiyon
  const getStatusText = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      Pending: 'Beklemede',
      Active: 'Aktif',
      Completed: 'Tamamlandı',
      Overdue: 'Süresi Geçmiş',
      Canceled: 'İptal Edildi',
      Lost: 'Kayboldu',
    };
    return statusMap[status] || status; // Eşleşme bulunamazsa orijinal durumu döndür
  };
  // Durum için renk belirleme (isteğe bağlı)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Completed':
        return 'text-blue-600';
      case 'Overdue':
        return 'text-red-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Canceled':
        return 'text-gray-600';
      case 'Lost':
        return 'text-purple-600';
      default:
        return 'text-gray-800';
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
            <ClipboardList size={30} className="inline-block mr-2 align-middle" />
            Ödünç Alma Kayıtları
          </h1>
          {/* Bu sayfada "Yeni Ekle" butonu olmayacaksa bu kısım boş kalabilir veya kaldırılabilir */}
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Yükleniyor Durumu */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={48} className="animate-spin text-[#660000]" />
            <span className="ml-3 text-lg text-[#472425]">Kayıtlar Yükleniyor...</span>
          </div>
        ) : borrowings.length === 0 && !error ? (
          // Kayıt Yok Durumu
          <div className="bg-white shadow-xl rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">Henüz ödünç alma kaydı bulunmamaktadır.</p>
          </div>
        ) : !error && borrowings.length > 0 ? (
          /* Kayıt Listesi (Tablo) */
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı Adı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kütüphane</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlangıç Tarihi</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bitiş Tarihi</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowings.map((borrowing, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{borrowing.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{borrowing.bookName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{borrowing.libraryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(borrowing.startDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(borrowing.endDate)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(borrowing.status)}`}>
                      {getStatusText(borrowing.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
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

export default BorrowList;