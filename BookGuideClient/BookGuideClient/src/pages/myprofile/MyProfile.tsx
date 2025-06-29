import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Book,
  BookMarked,
  Clock,
  Settings,
  LogOut
} from 'lucide-react';

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    address: 'Kadıköy, İstanbul',
    birthDate: '15.05.1990',
    memberSince: '12.03.2023',
    bio: 'Tarih ve bilim kurgu kitapları okumayı seviyorum. Haftada en az 2 kitap bitirmeyi hedefliyorum.',
    profileImage: '/src/images/profile.jpg'
  });

  const [readingStats, setReadingStats] = useState({
    booksRead: 42,
    currentlyReading: 3,
    favoriteBooks: 12,
    readingGoal: 50,
    progress: 84
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'read', bookTitle: '1984', date: '10.05.2025', status: 'tamamlandı' },
    { id: 2, type: 'borrowed', bookTitle: 'Dune', date: '05.05.2025', status: 'iade tarihi: 05.06.2025' },
    { id: 3, type: 'review', bookTitle: 'Suç ve Ceza', date: '01.05.2025', status: '4.8/5 puan' },
    { id: 4, type: 'wishlist', bookTitle: 'Bülbülü Öldürmek', date: '28.04.2025', status: 'istek listesine eklendi' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const navigate = useNavigate();

  const toggleEditMode = () => {
    if (isEditing) {
      setEditedProfile({ ...profile });
    } else {
      setEditedProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const saveProfile = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    alert('Profil bilgileriniz başarıyla güncellendi!');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı sil
    navigate('/login'); // Giriş sayfasına yönlendir
  };

  const placeholderImage = 'https://via.placeholder.com/150';

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
            
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div
              className="h-32 w-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(102,0,0,0.8), rgba(102,0,0,0.9))`
              }}
            />
            <div className="px-4 py-6 relative">
              <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden shadow-lg">
                <img
                  src={placeholderImage}
                  alt="Profil Fotoğrafı"
                  className="w-24 h-24 object-cover"
                />
              </div>
              <div className="mt-8 md:flex md:justify-between md:items-center md:mt-0">
                <div>
                  <h1 className="text-2xl font-bold text-[#472425]">{profile.fullName}</h1>
                  <p className="text-[#5f4b44]">Üyelik Tarihi: {profile.memberSince}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <button
                    onClick={toggleEditMode}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isEditing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-[#660000] text-white hover:bg-[#4a0000]'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <X size={18} className="mr-1" />
                        İptal
                      </>
                    ) : (
                      <>
                        <Edit size={18} className="mr-1" />
                        Profili Düzenle
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      onClick={saveProfile}
                      className="flex items-center px-4 py-2 bg-[#660000] text-white rounded-md hover:bg-[#4a0000] transition-colors ml-2"
                    >
                      <Save size={18} className="mr-1" />
                      Kaydet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-[#660000] text-white">
                  <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
                </div>
                <div className="p-6">
                  {!isEditing ? (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail size={18} className="text-[#660000] mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-[#5f4b44]">E-posta</p>
                          <p className="text-[#472425]">{profile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone size={18} className="text-[#660000] mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-[#5f4b44]">Telefon</p>
                          <p className="text-[#472425]">{profile.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={18} className="text-[#660000] mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-[#5f4b44]">Adres</p>
                          <p className="text-[#472425]">{profile.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar size={18} className="text-[#660000] mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-[#5f4b44]">Doğum Tarihi</p>
                          <p className="text-[#472425]">{profile.birthDate}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-[#5f4b44] mb-2">Hakkımda</p>
                        <p className="text-[#472425]">{profile.bio}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Editable Fields */}
                      <div>
                        <label htmlFor="email" className="block text-sm text-[#5f4b44] mb-1">
                          E-posta
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#660000] focus:border-[#660000]"
                        />
                      </div>
                      {/* ...other fields similarly styled */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats & Activities */}
            <div className="md:col-span-2 space-y-6">
              {/* Reading Stats */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-[#660000] text-white">
                  <h2 className="text-lg font-semibold">Okuma İstatistiklerim</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-[#f4efe8] p-4 rounded-lg flex items-center">
                      <div className="bg-[#660000]/10 p-3 rounded-full mr-4">
                        <Book size={24} className="text-[#660000]" />
                      </div>
                      <div>
                        <p className="text-[#5f4b44] text-sm">Okunan Kitaplar</p>
                        <p className="text-2xl font-bold text-[#472425]">
                          {readingStats.booksRead}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#f4efe8] p-4 rounded-lg flex items-center">
                      <div className="bg-[#660000]/10 p-3 rounded-full mr-4">
                        <BookMarked size={24} className="text-[#660000]" />
                      </div>
                      <div>
                        <p className="text-[#5f4b44] text-sm">Şu Anda Okunan</p>
                        <p className="text-2xl font-bold text-[#472425]">
                          {readingStats.currentlyReading}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#f4efe8] p-4 rounded-lg flex items-center">
                      <div className="bg-[#660000]/10 p-3 rounded-full mr-4">
                        <Clock size={24} className="text-[#660000]" />
                      </div>
                      <div>
                        <p className="text-[#5f4b44] text-sm">Favori Kitaplar</p>
                        <p className="text-2xl font-bold text-[#472425]">
                          {readingStats.favoriteBooks}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#472425] font-medium">Yıllık Okuma Hedefi</p>
                      <p className="text-[#5f4b44]">
                        {readingStats.booksRead} / {readingStats.readingGoal} kitap
                      </p>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#660000]"
                        style={{ width: `${readingStats.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-[#5f4b44] mt-2">
                      Yıllık hedefinize ulaşmak için{' '}
                      {readingStats.readingGoal - readingStats.booksRead} kitap daha
                      okumanız gerekiyor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-[#660000] text-white">
                  <h2 className="text-lg font-semibold">Son Aktivitelerim</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 flex items-start">
                      {activity.type === 'read' && (
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <Book size={18} className="text-green-600" />
                        </div>
                      )}
                      {activity.type === 'borrowed' && (
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                          <BookOpen size={18} className="text-blue-600" />
                        </div>
                      )}
                      {activity.type === 'wishlist' && (
                        <div className="bg-purple-100 p-2 rounded-full mr-4">
                          <BookMarked size={18} className="text-purple-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-[#472425] font-medium">
                          {activity.bookTitle}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-[#5f4b44]">{activity.status}</p>
                          <p className="text-xs text-[#5f4b44]">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 text-center">
                  <Link to="/activities" className="text-[#660000] hover:text-[#4a0000] font-medium">
                    Tüm Aktiviteleri Görüntüle
                  </Link>
                </div>
              </div>
            </div>
          </div>
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

export default MyProfile;
