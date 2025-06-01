'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import SlideNavigation from './SlideNavigation';

interface ComponentSlideshowProps {
  totalSlides: number;
  title?: string;
  description?: string;
}

export default function ComponentSlideshow({ 
  totalSlides, 
  title = "Pitch Deck Presentation",
  description = "Navigate through slides using arrow keys or controls"
}: ComponentSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideComponents, setSlideComponents] = useState<any[]>([]);
  const [showControls, setShowControls] = useState(true);
  let inactivityTimer: NodeJS.Timeout;

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    // Initial timer to hide controls
    inactivityTimer = setTimeout(() => {
      setShowControls(false);
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(inactivityTimer);
    };
  }, [handleMouseMove, isFullscreen]); // Add isFullscreen to re-evaluate when it changes

  // Dynamically load slide components
  useEffect(() => {
    const loadSlides = async () => {
      const components = [];
      for (let i = 0; i < totalSlides; i++) {
        try {
          const SlideComponent = dynamic(() => import(`../../slides/${i}/slide`), {
            loading: () => (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-2xl text-gray-600">Loading slide {i + 1}...</div>
              </div>
            ),
            ssr: false
          });
          components.push(SlideComponent);
        } catch (error) {
          console.warn(`Could not load slide ${i}:`, error);
          // Create a fallback component
          const FallbackSlide = () => (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-700 mb-4">Slide {i + 1}</h1>
                <p className="text-gray-600">Slide component not found</p>
                <p className="text-sm text-gray-500 mt-2">
                  Create slides/{i}/slide.tsx to add content
                </p>
              </div>
            </div>
          );
          components.push(FallbackSlide);
        }
      }
      setSlideComponents(components);
    };

    loadSlides();
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev < totalSlides - 1 ? prev + 1 : prev
    );
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => prev > 0 ? prev - 1 : prev);
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousSlide();
          break;
        case 'Home':
          event.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          event.preventDefault();
          setCurrentSlide(totalSlides - 1);
          break;
        case 'f':
        case 'F11':
          event.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            event.preventDefault();
            exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, previousSlide, totalSlides, isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // When fullscreen changes, reset controls visibility
      setShowControls(true);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900" onMouseMove={handleMouseMove}>
      {/* Header with preset info and controls */}
      {!isFullscreen && (
        <div 
          className={`absolute top-4 left-4 right-4 z-40 flex justify-between items-center transition-opacity duration-500 ease-in-out ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: showControls ? 'auto' : 'none' }}
        >
          <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 py-2">
            <h1 className="text-white font-semibold">{title}</h1>
            <p className="text-white/70 text-sm">{description}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/20 backdrop-blur-md rounded-lg text-white hover:bg-black/30 transition-colors"
              aria-label="Toggle fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Slide Container */}
      <div className="relative w-full h-full">
        {slideComponents.map((SlideComponent, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-2xl text-gray-600">Loading slide {index + 1}...</div>
              </div>
            }>
              <SlideComponent />
            </Suspense>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div 
        className={`transition-opacity duration-500 ease-in-out ${showControls ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
      >
        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrevious={previousSlide}
          onNext={nextSlide}
          onSlideSelect={goToSlide}
        />
      </div>

      {/* Keyboard shortcuts help */}
      {!isFullscreen && (
        <div 
          className={`absolute bottom-4 right-4 bg-black/20 backdrop-blur-md rounded-lg p-3 text-white/70 text-xs transition-opacity duration-500 ease-in-out ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: showControls ? 'auto' : 'none' }}
        >
          <div className="space-y-1">
            <div>← → : Navigate slides</div>
            <div>Space : Next slide</div>
            <div>F : Fullscreen</div>
          </div>
        </div>
      )}
    </div>
  );
} 