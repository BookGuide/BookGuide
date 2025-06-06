import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Loader2 } from 'lucide-react';

interface Borrowing {
  bookName: string;
  libraryName: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Overdue' | 'Canceled' | 'Lost';
}

const HistoryPage: React.FC = () => {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://localhost:7127/api/Borrowing/GetUsersBorrowing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.succeeded) {
          setBorrowings(data.borrowings);
        } else {
          alert('Veri alınamadı.');
        }
      } catch (error) {
        alert('Bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <nav className="bg-[#660000] shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <Link to="/mainmenu" className="text-2xl font-bold text-white">
              BookGuide
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/mainmenu" className="text-white hover:text-gray-300 font-medium">Kitap Listesi</Link>
            <Link to="/history" className="text-white hover:text-gray-300 font-medium">Geçmişim</Link>
            <Link to="/recommendation" className="text-white hover:text-gray-300 font-medium">Öneriler</Link>
            <Link to="/myprofile" className="text-white hover:text-gray-300 font-medium">Profilim</Link>
            <Link to="/login" className="text-white hover:text-gray-300 font-medium">Çıkış Yap</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-[#660000] mb-6">
              Ödünç Kitaplarınız
            </h1>

            {isLoading ? (
              <div className="flex justify-center items-center text-gray-700">
                <Loader2 className="animate-spin mr-2" /> Yükleniyor...
              </div>
            ) : borrowings.length === 0 ? (
              <p className="text-center text-gray-600">Henüz geçmiş ödünç alma kaydınız yok.</p>
            ) : (
              <ul className="space-y-4">
                {borrowings.map((borrowing, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-[#660000]/30 rounded-lg bg-white/80"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-[#472425]">{borrowing.bookName}</h2>
                      <p className="text-[#5f4b44] text-sm">{borrowing.libraryName}</p>
                      <p className="text-gray-600 text-sm">
                        {new Date(borrowing.startDate).toLocaleDateString()} - {new Date(borrowing.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`mt-2 sm:mt-0 font-medium text-sm px-3 py-1 rounded-full ${getStatusColor(borrowing.status)}`}>
                      {borrowing.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// 🔵 Renk kodları (opsiyonel görsellik için)
function getStatusColor(status: string) {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    case 'Canceled':
    case 'Lost':
      return 'bg-gray-200 text-gray-600';
    default:
      return 'bg-white text-black';
  }
}

export default HistoryPage;
