import React, { useState, useEffect } from 'react';

const BackgroundCarousel = () => {
  const images = Array.from({ length: 14 }, (_, i) => `/backgrounds/${i + 1}.jpg`);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 -z-20 w-full h-full bg-slate-100 transition-colors duration-1000 dark:bg-slate-900">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/80 backdrop-blur-sm transition-colors duration-1000"></div>
    </div>
  );
};

export default BackgroundCarousel;
