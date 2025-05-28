import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const RecommendationPage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [useHistory, setUseHistory] = useState<boolean>(false);

  const handleRecommend = () => {
    // AI API isteği burada yapılacak
    console.log('Tavsiye istendi:', { prompt, useHistory });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4efe8]">
      {/* Navbar */}
      <nav className="bg-[#660000]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen size={32} className="text-white mr-2" />
            <Link to="/mainmenu" className="text-2xl font-bold text-white">
              BookGuide
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/profile"
              className="text-white hover:text-gray-300 font-medium"
            >
              Profilim
            </Link>
            <Link
              to="/logout"
              className="text-white hover:text-gray-300 font-medium"
            >
              Çıkış Yap
            </Link>
          </div>
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-[#660000] mb-6 text-center">
            Kitap Tavsiye Al
          </h1>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ne tür kitaplar seviyorsunuz? Örneğin: bilim kurgu, tarih..."
            rows={6}
            className="w-full px-4 py-3 border border-[#660000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660000] focus:border-transparent mb-6 resize-none"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleRecommend}
              className="px-6 py-3 bg-[#660000] text-white rounded-full font-semibold hover:bg-[#4a0000] transition-colors"
            >
              Tavsiye Al
            </button>
            <button
              onClick={() => setUseHistory(!useHistory)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                useHistory
                  ? 'bg-[#660000] text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              Geçmişi Kullan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationPage;
