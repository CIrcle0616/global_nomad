'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-6 z-50 w-10 h-10 bg-green-500 transition-all duration-300 rounded-full flex items-center justify-center ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'
      }`}
    >
      <Image src="/ic_scroll_top.svg" alt="맨 위로" width={24} height={24} />
    </button>
  );
}
