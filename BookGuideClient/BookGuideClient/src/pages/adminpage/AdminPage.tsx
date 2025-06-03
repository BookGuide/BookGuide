import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, // Added BookOpen
  List,
  LogOut,
  Settings
} from 'lucide-react';
const AdminPage: React.FC = () => {
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
            {/* Kütüphane Listesi Linki */}
            <Link to="/librarylist" className="text-white hover:text-gray-300 font-medium">
              Kütüphaneler
            </Link>

            {/* Kitap Listesi Linki */}
            <Link to="/booklist" className="text-white hover:text-gray-300 font-medium">
              Kitaplar
            </Link>
            {/* Ödünç Kitaplar Listesi Linki */}
            <Link to="/borrowlist" className="text-white hover:text-gray-300 font-medium">Ödünç Kitaplar</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Admin ayarları veya çıkış */}
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
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Ana içerik buraya gelecek, şimdilik boş */}
          <p className="text-center text-gray-500 mt-10">
            Admin paneline hoş geldiniz. Yönetim işlemlerinizi yukarıdaki menüden seçebilirsiniz.
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

export default AdminPage;