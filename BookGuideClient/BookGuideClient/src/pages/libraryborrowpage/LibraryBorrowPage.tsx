import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Library as LibraryIcon,
  ClipboardList,
} from 'lucide-react';

interface BorrowingRecord {
  id: string;
  bookName: string;
  username: string;
  borrowDate: string;
  borrowEndDate: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Overdue' | 'Canceled' | 'Lost';
  libraryName: string;
}

const LibraryBorrowPage: React.FC = () => {
  const [borrowingRecords, setBorrowingRecords] = useState<BorrowingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowingRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:7127/api/Borrowing/GetLibrariesBorrowing', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Veri alınamadı');
        }

        const data = await response.json();

        if (data.succeded) {
          const mapped: BorrowingRecord[] = data.borrowings.map((item: any, i: number) => ({
            id: `rec-${i}`,
            bookName: item.bookName,
            username: item.username,
            borrowDate: item.startDate,
            borrowEndDate: item.endDate,
            status: item.status,
            libraryName: item.libraryName,
          }));

          setBorrowingRecords(mapped);
        }
      } catch (err) {
        console.error('Veri çekme hatası:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBorrowingRecords();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getStatusBadgeColor = (status: BorrowingRecord["status"]) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-200 text-yellow-800';
      case 'Active': return 'bg-blue-200 text-blue-800';
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'Overdue': return 'bg-red-200 text-red-800';
      case 'Canceled': return 'bg-gray-300 text-gray-800';
      case 'Lost': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
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
            <Link to="/librarybooklist" className="text-white hover:text-gray-300 font-medium">
              Kitap Listesi
            </Link>
            <Link to="/libraryborrowpage" className="text-white hover:text-gray-300 font-medium">
              Ödünç Kitaplar
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div onClick={handleLogout} className="p-2 text-white hover:text-gray-300 rounded-full cursor-pointer">
              <LogOut size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425] flex items-center">
            <ClipboardList size={30} className="mr-2" />
            Ödünç Verilen Kitaplar
          </h1>
        </div>

        {/* Table */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kitap Adı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ödünç Alan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alma Tarihi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bitiş Tarihi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statü</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kütüphane</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-500">Yükleniyor...</td></tr>
              ) : borrowingRecords.length > 0 ? (
                borrowingRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{record.bookName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {record.borrowEndDate ? new Date(record.borrowEndDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.libraryName}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Hiç kayıt yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 text-center text-[#5f4b44]/80 text-sm">
          &copy; {new Date().getFullYear()} BookGuide. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
};

export default LibraryBorrowPage;
