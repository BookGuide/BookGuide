import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, MapPin, Eye } from 'lucide-react';

interface LibraryInfo {
  libraryId: string;
  libraryName: string;
  libraryAddress: string;
  availableCount: number;
}

interface BookDetail {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  isOnline: boolean;
  fileId?: string | null;
  libraries: LibraryInfo[];
}

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:7127/api/Book/GetBook?BookId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.succeeded) {
          setBook(data.bookInfo);
        } else {
          console.warn('Kitap bilgisi alınamadı');
        }
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleViewFile = async (fileId: string | null) => {
    if (!fileId) return;
    try {
      const response = await fetch(`http://localhost:7127/api/File/Get?id=${fileId}`);
      const data = await response.json();
      if (data.fileUrl) {
        window.open(data.fileUrl, '_blank');
      } else {
        alert('Dosya bağlantısı alınamadı.');
      }
    } catch {
      alert('Dosya görüntülenemedi.');
    }
  };

  const handleBorrowBook = async (libraryId: string) => {
    if (!book || !selectedEndDate || selectedLibraryId !== libraryId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:7127/api/Borrowing/AddBorrowing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book.id,
          libraryId,
          endDate: selectedEndDate,
        }),
      });

      const data = await response.json();
      if (data.succeeded) {
        alert('Kitap başarıyla ödünç alındı.');
        setSelectedEndDate('');
        setSelectedLibraryId(null);
      } else {
        alert('Ödünç alma işlemi başarısız.');
      }
    } catch {
      alert('Bir hata oluştu.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <Loader2 className="animate-spin mr-2" /> Yükleniyor...
      </div>
    );
  }

  if (!book) {
    return <p className="text-center text-red-600">Kitap bilgisi bulunamadı.</p>;
  }

  return (
    <div className="min-h-screen bg-[#f4efe8] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white/80 shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <BookOpen size={28} className="text-[#660000] mr-2" />
          <h1 className="text-2xl font-bold text-[#660000]">{book.title}</h1>
        </div>

        <p className="text-gray-700 mb-2"><strong>Yazar:</strong> {book.author}</p>
        <p className="text-gray-700 mb-2"><strong>Kategori:</strong> {book.category}</p>
        <p className="text-gray-700 mb-4"><strong>Açıklama:</strong> {book.description}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-[#472425] mb-2">Kütüphane Bilgileri</h2>
          {book.libraries.length === 0 ? (
            <p className="text-gray-500 italic">Bu kitap şu anda hiçbir kütüphanede mevcut değil.</p>
          ) : (
            <ul className="space-y-4">
              {book.libraries.map((lib) => (
                <li key={lib.libraryId} className="p-3 border border-gray-300 rounded-lg bg-gray-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#5c0000] font-semibold">{lib.libraryName}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin size={14} className="mr-1" /> {lib.libraryAddress}
                      </p>
                      <p className="text-sm text-green-700 font-medium">{lib.availableCount} adet mevcut</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                    <input
                      type="date"
                      className="border p-2 rounded-md"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedLibraryId === lib.libraryId ? selectedEndDate : ''}
                      onChange={(e) => {
                        setSelectedLibraryId(lib.libraryId);
                        setSelectedEndDate(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => handleBorrowBook(lib.libraryId)}
                      disabled={!selectedEndDate || selectedLibraryId !== lib.libraryId}
                      className="bg-[#660000] hover:bg-[#800000] text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      Ödünç Al
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {book.isOnline && book.fileId && (
          <div className="mt-6">
            <button
              className="bg-[#660000] hover:bg-[#800000] text-white px-5 py-3 rounded-md flex items-center transition"
              onClick={() => handleViewFile(book.fileId ?? null)}
            >
              <Eye size={18} className="mr-2" /> Kitabı Görüntüle
            </button>
          </div>
        )}

        <div className="mt-8">
          <Link to="/mainmenu" className="text-[#660000] hover:underline">
            &larr; Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
