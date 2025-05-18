import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#f4efe8]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 border border-[#8c1c13]/20 text-center">
        {/* Hata Simgesi */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#8c1c13] p-3 rounded-full mb-4">
            <AlertTriangle size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#472425]">Sayfa Bulunamadı</h1>
          <p className="text-[#5f4b44] mt-2 text-center">
            {error?.statusText || error?.message || 'Üzgünüz, aradığınız sayfaya ulaşılamıyor.'}
          </p>
        </div>

        {/* Hata Detayları */}
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
          <p>Hata Kodu: {error?.status || '404'}</p>
        </div>

        {/* Yönlendirme Butonları */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={goBack}
            className="w-full bg-[#8c1c13] hover:bg-[#630000] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Geri Dön
          </button>
          
          <Link
            to="/"
            className="w-full bg-[#5f4b44] hover:bg-[#472425] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
          >
            <Home size={16} className="mr-2" />
            Ana Sayfaya Git
          </Link>
        </div>

        {/* Yardım Bilgisi */}
        <div className="mt-6 text-center">
          <p className="text-[#5f4b44]">
            Yardıma mı ihtiyacınız var?{" "}
            <a href="mailto:destek@kutuphane.com" className="text-[#8c1c13] hover:text-[#630000] font-medium">
              Destek Ekibimize Ulaşın
            </a>
          </p>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-6 text-center text-[#5f4b44]/80 text-sm">
          &copy; {new Date().getFullYear()} Kütüphane Yönetim Sistemi. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;