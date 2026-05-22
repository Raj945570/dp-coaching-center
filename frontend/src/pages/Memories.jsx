import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Memories = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  // We have 14 images in the backgrounds folder
  const images = Array.from({ length: 14 }, (_, i) => `/backgrounds/${i + 1}.jpg`);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in text-slate-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-purple">
            {i18n.language === 'hi' ? 'हमारी स्मृतियां' : 'Our Memories'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {i18n.language === 'hi' 
              ? 'डीपी कोचिंग सेंटर की यात्रा और हमारे छात्रों के कुछ यादगार पल।' 
              : 'Glimpses of our journey and memorable moments at DP Coaching Center.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl shadow-lg border border-white/20 dark:border-slate-800/50 cursor-pointer bg-white/10 glass dark:glass-dark transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-w-1 aspect-h-1 md:h-64 h-48 w-full overflow-hidden">
                <img 
                  src={img} 
                  alt={`DP Coaching Memory ${index + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium text-sm md:text-base flex items-center gap-2">
                    <ZoomIn className="w-4 h-4 text-brand-primary" />
                    DP Coaching Memories
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
            onClick={closeModal}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform scale-95 animate-scale-up"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <img 
                src={selectedImage} 
                alt="Full preview" 
                className="w-full h-full object-contain bg-black/50"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
                <p className="text-white text-center text-lg font-medium drop-shadow-md">
                  DP Coaching Center Memories
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memories;
