import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  Settings,
  PlusCircle,
  Trash2,
  List
} from 'lucide-react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  isOnline: boolean;
  fileName?: string | null;
  fileId?: string | null;
  fileUrl?: string | null;
}

const categoryEnumMap: Record<string, string> = {
  'Roman': 'Fiction',
  'Bilim Kurgu': 'Science',
  'Tarih': 'History',
  'Biyografi': 'Biography',
  'Fantastik': 'Fantasy',
  'Romantik': 'Romance',
  'Polisiye': 'Mystery',
  'Gerilim': 'Thriller',
  'Korku': 'Horror',
  'Kişisel Gelişim': 'SelfHelp',
  'Felsefe': 'Philosophy',
  'Sanat': 'Art',
  'Çocuk Kitapları': 'Poetry',
  'Seyahat': 'Travel',
  'Yemek': 'Cooking',
  'Sağlık': 'Health',
  'Teknoloji': 'Technology',
  'İş Dünyası': 'Business',
  'Eğitim': 'Education',
  'Diğer': 'NonFiction'
};

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState<Omit<BookItem, 'id'> & { selectedFile: File | null }>(
    {
      title: '',
      author: '',
      description: '',
      category: 'Roman',
      isOnline: false,
      fileName: null,
      selectedFile: null
    });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://localhost:7127/api/Book/GetBooks');
        const data = await res.json();
        if (data.succeeded && Array.isArray(data.books)) {
          const booksData: BookItem[] = data.books.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            category: book.category,
            isOnline: book.is_Online,
            fileId: book.fileId || null,
            fileName: null,
            fileUrl: null
          }));

          const booksWithUrls = await Promise.all(
            booksData.map(async (book) => {
              if (book.isOnline && book.fileId) {
                try {
                  const fileRes = await fetch(`https://localhost:7127/api/File/Get?id=${book.fileId}`);
                  if (!fileRes.ok) throw new Error();
                  const fileData = await fileRes.json();
                  return { ...book, fileName: fileData.fileName, fileUrl: fileData.fileUrl };
                } catch {
                  return book;
                }
              }
              return book;
            })
          );

          setBooks(booksWithUrls);
        }
      } catch (err) {
        alert('Kitaplar yüklenemedi.');
      }
    };
    fetchBooks();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewBook(prev => ({
      ...prev,
      selectedFile: file,
      fileName: file?.name || null
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNewBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isOnline' && !checked && { selectedFile: null, fileName: null })
    }));
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    let fileId = null;
    if (newBook.isOnline && newBook.selectedFile) {
      const formData = new FormData();
      formData.append('file', newBook.selectedFile);
      try {
        const uploadRes = await fetch('https://localhost:7127/api/File/Upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        fileId = uploadData.fileId;
      } catch (err) {
        alert('Dosya yüklenemedi.');
        return;
      }
    }

    const addBookBody = {
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      category: categoryEnumMap[newBook.category] || 'NonFiction',
      isOnline: newBook.isOnline,
      fileId: fileId
    };

    try {
      const res = await fetch('https://localhost:7127/api/Book/AddBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBookBody)
      });
      const data = await res.json();
      if (data.succeeded) {
        window.location.reload();
      } else {
        alert('Kitap eklenemedi.');
      }
    } catch (err) {
      alert('Kitap eklenemedi.');
    }
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      alert('Kitap başarıyla silindi.');
    }
  };

  const handleViewFile = (fileId: string | null) => {
    if (!fileId) return;
    fetch(`https://localhost:7127/api/File/Get?id=${fileId}`)
      .then(res => res.json())
      .then(data => {
        if (data.fileUrl) window.open(data.fileUrl, '_blank');
      })
      .catch(() => alert('Dosya görüntülenemedi.'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#472425]">
            <List size={30} className="inline-block mr-2 align-middle" />
            Kitap Listesi
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#660000] hover:bg-[#800000] text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            {showAddForm ? 'Formu Kapat' : 'Yeni Kitap Ekle'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddBook} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
            <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Başlık" className="w-full p-2 border rounded" required />
            <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Yazar" className="w-full p-2 border rounded" required />
            <textarea name="description" value={newBook.description} onChange={handleInputChange} placeholder="Açıklama" className="w-full p-2 border rounded" rows={3} required />
            <select name="category" value={newBook.category} onChange={handleInputChange} className="w-full p-2 border rounded" required>
              {Object.keys(categoryEnumMap).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isOnline" checked={newBook.isOnline} onChange={handleInputChange} />
              <span>Online Kitap mı?</span>
            </label>
            {newBook.isOnline && (
              <input type="file" accept=".pdf,.epub,.mobi,.txt" onChange={handleFileChange} className="w-full" />
            )}
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Kitabı Kaydet
            </button>
          </form>
        )}

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yazar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosya</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{book.category}</td>
                    <td className="px-6 py-4 text-sm">
                      {book.isOnline && book.fileId ? (
                        <button onClick={() => handleViewFile(book.fileId!)} className="text-blue-600 hover:underline">
                          Görüntüle
                        </button>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">Henüz kitap bulunmamaktadır.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BookList;
