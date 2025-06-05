import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  Library
} from 'lucide-react';

const LibraryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <header className="bg-[#660000] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="" className="flex items-center"> {/* Ana sayfa linki boş bırakıldı */}
            <Library size={32} className="text-white mr-2" />
            <span className="text-xl font-bold text-white">BookGuide Kütüphane</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {/* Kitap Listesi Linki */}
            <Link to="/librarybooklist" className="text-white hover:text-gray-300 font-medium">
              Kitap Listesi
            </Link>

            {/* Ödünç Kitaplar Listesi Linki */}
            <Link to="/libraryborrowpage" className="text-white hover:text-gray-300 font-medium">
              Ödünç Kitaplar
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Kullanıcı ayarları veya çıkış */}
            <Link to="/loginpage" className="p-2 text-white hover:text-gray-300 rounded-full">
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Ana içerik buraya gelecek, şimdilik boş */}
          <p className="text-center text-gray-500 mt-10">
            Kütüphane paneline hoş geldiniz. İşlemlerinizi yukarıdaki menüden seçebilirsiniz.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-8">
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

export default LibraryPage;