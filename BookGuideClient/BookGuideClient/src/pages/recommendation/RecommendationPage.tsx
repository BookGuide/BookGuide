import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const RecommendationPage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRecommend = async () => {
    if (!prompt.trim()) {
      setError('Lütfen bir metin girin.');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      const response = await fetch('http://localhost:7127/api/AIConroller/PostResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setRecommendation(data.message);
    } catch (err: any) {
      setError(err.message || 'Bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
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
        <div className="w-full max-w-2xl bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-[#660000] mb-6 text-center">
            Kitap Tavsiye Al
          </h1>
          
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ne tür kitaplar seviyorsunuz? Örneğin: bilim kurgu, tarih..."
            rows={6}
            className="w-full px-4 py-3 border border-[#660000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660000] focus:border-transparent mb-6 resize-none"
            disabled={loading}
          />
          
          <div className="flex justify-center mb-6">
            <button
              onClick={handleRecommend}
              disabled={loading || !prompt.trim()}
              className="px-8 py-3 bg-[#660000] text-white rounded-full font-semibold hover:bg-[#4a0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Tavsiye Alınıyor...' : 'Tavsiye Al'}
            </button>
          </div>

          {/* Hata mesajı */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Tavsiye sonucu */}
          {recommendation && (
            <div className="mt-6 p-6 bg-white bg-opacity-50 rounded-lg border border-[#660000]/20">
              <h3 className="text-lg font-semibold text-[#660000] mb-3">
                Kitap Tavsiyeleri:
              </h3>
              <div className="text-gray-800 whitespace-pre-wrap">
                {recommendation}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecommendationPage;