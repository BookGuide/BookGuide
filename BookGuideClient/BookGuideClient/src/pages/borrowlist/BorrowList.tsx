import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Loader2, Settings, LogOut, ClipboardList } from 'lucide-react';

interface BorrowingRecord {
  username: string;
  bookName: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Overdue' | 'Canceled' | 'Lost';
  libraryName: string;
}

const BorrowList = () => {
  const [borrowings, setBorrowings] = useState<BorrowingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://localhost:7127/api/Borrowing/GetAllBorrowings');
        const data = await response.json();
        if (data.succeeded && Array.isArray(data.borrowings)) {
          setBorrowings(data.borrowings);
        } else {
          setError('Kayıtlar alınamadı.');
        }
      } catch (err) {
        setError('Veri yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusText = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      Pending: 'Beklemede',
      Active: 'Aktif',
      Completed: 'Tamamlandı',
      Overdue: 'Süresi Geçmiş',
      Canceled: 'İptal Edildi',
      Lost: 'Kayboldu',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Completed': return 'text-blue-600';
      case 'Overdue': return 'text-red-600';
      case 'Pending': return 'text-yellow-600';
      case 'Canceled': return 'text-gray-600';
      case 'Lost': return 'text-purple-600';
      default: return 'text-gray-800';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı sil
    navigate('/login'); // Giriş sayfasına yönlendir
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/adminpage" className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Admin</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/librarylist" className="text-white hover:text-gray-300 font-medium">Kütüphaneler</Link>
            <Link to="/booklist" className="text-white hover:text-gray-300 font-medium">Kitaplar</Link>
            <Link to="/borrowlist" className="text-white hover:text-gray-300 font-medium">Ödünç Kitaplar</Link>
          </nav>
          <div className="flex items-center space-x-4"> {/* onClick eklendi ve Link div ile değiştirildi */}
            <div onClick={handleLogout} className="p-2 text-white hover:text-gray-300 rounded-full cursor-pointer">
              <LogOut size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425]">
            <ClipboardList size={30} className="inline-block mr-2 align-middle" />
            Ödünç Alma Kayıtları
          </h1>
        </div>

        {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 size={48} className="animate-spin text-[#660000] mx-auto" />
            <p className="mt-4 text-lg">Kayıtlar Yükleniyor...</p>
          </div>
        ) : borrowings.length === 0 ? (
          <div className="text-center text-gray-600">Henüz ödünç alma kaydı bulunmamaktadır.</div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kitap Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kütüphane</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlangıç</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bitiş</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowings.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{b.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{b.bookName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{b.libraryName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(b.startDate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(b.endDate)}</td>
                    <td className={`px-6 py-4 text-sm font-semibold ${getStatusColor(b.status)}`}>{getStatusText(b.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 text-center text-[#5f4b44]/80 text-sm">
          &copy; {new Date().getFullYear()} BookGuide. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
};

export default BorrowList;
