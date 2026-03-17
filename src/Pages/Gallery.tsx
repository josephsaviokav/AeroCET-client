// Gallery.tsx (Frontend)
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/AeroCET-logo.png';
import clsx from 'clsx';
import './Gallery.css';

const galleryImages = import.meta.glob('../../Data/images/gallary/*.{jpg,jpeg,png,gif}', { eager: true });
const BASE_IMAGES = Object.values(galleryImages).map((module: any) => module.default);

export default function Gallery() {
  const [isActive, setIsActive] = useState(false);
  const [displayedImages, setDisplayedImages] = useState<string[]>(BASE_IMAGES);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const goTo = () => {
    navigate('/');
  };

  // Handle infinite scroll by duplicating images
  const handleLoadMore = useCallback(() => {
    setDisplayedImages(prev => [...prev, ...BASE_IMAGES]);
  }, []);

  useEffect(() => {
    // IntersectionObserver for gallery visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      loadMoreObserver.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        loadMoreObserver.unobserve(loadMoreRef.current);
      }
    };
  }, [handleLoadMore]);


  return (
    <div className="gallery-container" ref={galleryRef}>
      <div className="p-8 flex flex-col items-center">
        <button 
          onClick={goTo} 
          className={clsx(
            "mb-4 flex justify-center items-center transform transition duration-500",
            { 'opacity-0 translate-y-8': !isActive },
            { 'opacity-100 translate-y-0 delay-300': isActive }
          )}
        >
          <img src={logo} className="h-32 w-auto transform hover:scale-110 duration-300" alt="logo"/> 
        </button>

        <h1 
          className={clsx(
            "text-2xl font-bold text-white mb-4 transition-all duration-500 ease-in-out",
            { 'opacity-0 translate-y-8': !isActive },
            { 'opacity-100 translate-y-0 delay-500': isActive }
          )}
        >
          Gallery
        </h1>
        <p 
          className={clsx(
            "text-white text-center mb-8 transition-all duration-500 ease-in-out",
            { 'opacity-0 translate-y-8': !isActive },
            { 'opacity-100 translate-y-0 delay-700': isActive }
          )}
        >
          Every picture has a story to tell..!
        </p>
      </div>

      <div className="gallery-grid">
        {displayedImages.length > 0 ? (
          displayedImages.map((imageUrl, index) => (
            <img 
              key={`${index}-${Math.random()}`}
              src={imageUrl} 
              alt={`Gallery image ${(index % BASE_IMAGES.length) + 1}`} 
              className={clsx(
                "gallery-image",
                { 'opacity-0 translate-y-8': !isActive },
                { 'opacity-100 translate-y-0': isActive },
              )}
              style={{ transitionDelay: `${(index % BASE_IMAGES.length) * 50}ms` }}
            />
          ))
        ) : (
          <p className="text-white text-center w-full">Loading gallery...</p>
        )}
      </div>

      {/* Infinite scroll trigger element */}
      <div ref={loadMoreRef} className="w-full h-10" />
    </div>
  );
}
