import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Discover Premium Fragrances',
    subtitle: 'Handpicked scents crafted for unforgettable moments',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&q=80',
  },
  {
    id: 2,
    title: 'Timeless Clothing Collections',
    subtitle: 'Elevate your wardrobe with classic silhouettes',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
  },
  {
    id: 3,
    title: 'Limited Edition Releases',
    subtitle: 'Shop exclusive drops before they sell out',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80',
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="relative w-full">
      <div className="h-[480px] w-full rounded-lg overflow-hidden bg-black">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 ${i === index ? 'scale-100' : 'scale-105'}" />
            <div className={`absolute left-8 bottom-10 max-w-lg ${i === index ? 'animate-fade-in-up' : ''}`}>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-3">{s.title}</h2>
              <p className="text-text-secondary mb-4">{s.subtitle}</p>
              <div className="flex gap-3">
                <a href="/products" className="px-5 py-3 bg-white text-black rounded-md font-semibold">Shop Now</a>
                <a href="/about" className="px-5 py-3 bg-dark-card border border-white/20 text-white rounded-md">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HeroCarousel;
