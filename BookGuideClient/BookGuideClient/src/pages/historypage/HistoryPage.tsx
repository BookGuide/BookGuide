// src/pages/history/HistoryPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  readDate: string;
}

const HistoryPage: React.FC = () => {
  const [books] = useState<Book[]>([
    { id: 1, title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', readDate: '10 Mart 2025' },
    { id: 2, title: 'Sefiller', author: 'Victor Hugo', readDate: '05 Nisan 2025' },
    { id: 3, title: 'Bülbülü Öldürmek', author: 'Harper Lee', readDate: '20 Şubat 2025' },
    { id: 4, title: '1984', author: 'George Orwell', readDate: '15 Ocak 2025' },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <nav className="bg-[#660000]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/mainmenu" className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/profile" className="text-white hover:text-gray-300 font-medium">
              Profilim
            </Link>
            <Link to="/logout" className="text-white hover:text-gray-300 font-medium">
              Çıkış Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-[#660000] mb-6">
              Geçmişte Okuduğunuz Kitaplar
            </h1>
            <ul className="space-y-4">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="flex justify-between items-center p-4 border border-[#660000]/30 rounded-lg bg-white/80"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-[#472425]">
                      {book.title}
                    </h2>
                    <p className="text-[#5f4b44]">{book.author}</p>
                  </div>
                  <span className="text-[#660000] font-medium">
                    {book.readDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
