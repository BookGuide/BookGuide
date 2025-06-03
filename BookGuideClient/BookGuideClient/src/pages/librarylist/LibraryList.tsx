import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  PlusCircle,
  Trash2,
  LibraryBig, // Kütüphane listesi başlığı için ikon
} from 'lucide-react';

// Kütüphane verisi için arayüz
interface LibraryItem {
  id: string; // Backend'den Guid string olarak gelecek
  name: string;
  address: string;
}

const LibraryList: React.FC = () => {
  // Örnek kütüphane verileri (Gerçek uygulamada API'den gelecektir)
  const [libraries, setLibraries] = useState<LibraryItem[]>([
    { id: 'lib1', name: 'Merkez Kütüphanesi', address: 'Ana Cadde No:123, Şehir Merkezi' },
    { id: 'lib2', name: 'Şehir Kütüphanesi', address: 'Park Sokak No:45, Şehir Kenarı' },
    { id: 'lib3', name: 'Çocuk Kütüphanesi', address: 'Okul Yolu Üzeri No:7, İlçe' },
  ]);

  // Yeni kütüphane ekleme formu için state
  const [newLibrary, setNewLibrary] = useState<Omit<LibraryItem, 'id'>>({
    name: '',
    address: '',
  });
  const [showAddForm, setShowAddForm] = useState(false); // Ekleme formunu gösterme/gizleme

  // Form input değişikliklerini yönetme (text, textarea)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewLibrary(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Yeni kütüphane ekleme
  const handleAddLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLibrary.name || !newLibrary.address) {
      alert('Lütfen kütüphane adı ve adres alanlarını doldurun.');
      return;
    }

    const libraryToAdd: LibraryItem = {
      id: (Date.now() + Math.random()).toString(), // Geçici ID, backend'den gerçek ID gelecek
      ...newLibrary,
    };
    setLibraries(prevLibraries => [...prevLibraries, libraryToAdd]);
    setNewLibrary({ name: '', address: '' }); // Formu temizle
    setShowAddForm(false); // Formu gizle
    alert('Kütüphane başarıyla eklendi.');
  };

  // Kütüphane silme
  const handleDeleteLibrary = (id: string) => {
    if (window.confirm('Bu kütüphaneyi silmek istediğinizden emin misiniz?')) {
      setLibraries(prevLibraries => prevLibraries.filter(library => library.id !== id));
      alert('Kütüphane başarıyla silindi.');
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
            <LibraryBig size={30} className="inline-block mr-2 align-middle" />
            Kütüphane Listesi
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            {showAddForm ? 'Formu Kapat' : 'Yeni Kütüphane Ekle'}
          </button>
        </div>

        {/* Yeni Kütüphane Ekleme Formu */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-[#472425] mb-4">Yeni Kütüphane Bilgileri</h2>
            <form onSubmit={handleAddLibrary} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Kütüphane Adı</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newLibrary.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres</label>
                <textarea
                  name="address"
                  id="address"
                  value={newLibrary.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#660000] focus:border-[#660000] sm:text-sm"
                  required
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewLibrary({ name: '', address: '' }); // Formu iptal edince temizle
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660000] hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660000]"
                >
                  Kütüphaneyi Kaydet
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Kütüphane Listesi Tablosu */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kütüphane Adı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adres
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {libraries.length > 0 ? (
                libraries.map((library) => (
                  <tr key={library.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{library.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-pre-wrap"> {/* Adres için pre-wrap */}
                      <div className="text-sm text-gray-700">{library.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleDeleteLibrary(library.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-150"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                      {/* Düzenleme butonu da buraya eklenebilir */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    Henüz hiç kütüphane eklenmemiş.
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

export default LibraryList;