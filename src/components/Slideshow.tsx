'use client';

import { useState, useEffect, useCallback } from 'react';
import { SlidePreset } from '../types/slides';
import SlideRenderer from './SlideRenderer';
import SlideNavigation from './SlideNavigation';

interface SlideshowProps {
  preset: SlidePreset;
}

export default function Slideshow({ preset }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev < preset.slides.length - 1 ? prev + 1 : prev
    );
  }, [preset.slides.length]);

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
          setCurrentSlide(preset.slides.length - 1);
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
  }, [nextSlide, previousSlide, preset.slides.length, isFullscreen]);

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
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Header with preset info and controls */}
      {!isFullscreen && (
        <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center">
          <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 py-2">
            <h1 className="text-white font-semibold">{preset.name}</h1>
            <p className="text-white/70 text-sm">{preset.description}</p>
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
        {preset.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <SlideRenderer slide={slide} isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={preset.slides.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
        onSlideSelect={goToSlide}
      />

      {/* Keyboard shortcuts help */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md rounded-lg p-3 text-white/70 text-xs">
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