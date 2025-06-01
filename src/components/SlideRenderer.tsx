import { Slide } from '../types/slides';

interface SlideRendererProps {
  slide: Slide;
  isActive: boolean;
}

export default function SlideRenderer({ slide, isActive }: SlideRendererProps) {
  // Build the background class more explicitly
  const backgroundClass = slide.backgroundGradient 
    ? `bg-gradient-to-br ${slide.backgroundGradient}` 
    : 'bg-white';
  
  const textColorClass = slide.textColor || 'text-gray-800';
  
  const baseClasses = `
    w-full h-full flex flex-col justify-center items-center p-12 
    transition-all duration-500 ease-in-out
    ${backgroundClass}
    ${textColorClass}
    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  `.trim().replace(/\s+/g, ' ');

  const renderTitleSlide = () => (
    <div className="text-center space-y-8 max-w-4xl">
      <h1 className="text-6xl md:text-7xl font-bold leading-tight">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <h2 className="text-2xl md:text-3xl font-light opacity-90">
          {slide.subtitle}
        </h2>
      )}
      <div className="space-y-4 text-xl md:text-2xl opacity-80">
        {slide.content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );

  const renderContentSlide = () => (
    <div className="max-w-5xl w-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            {slide.subtitle}
          </h2>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {slide.content.map((paragraph, index) => (
            <p key={index} className="text-xl leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {slide.bulletPoints && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Key Statistics</h3>
            <ul className="space-y-4">
              {slide.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-current rounded-full mt-3"></span>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderSplitSlide = () => (
    <div className="max-w-6xl w-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            {slide.subtitle}
          </h2>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          {slide.content.map((paragraph, index) => (
            <p key={index} className="text-xl leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {slide.bulletPoints && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Features</h3>
            <ul className="space-y-4">
              {slide.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-3 h-3 bg-current rounded-full mt-2"></span>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderSlideContent = () => {
    switch (slide.layout) {
      case 'title':
        return renderTitleSlide();
      case 'content':
        return renderContentSlide();
      case 'split':
        return renderSplitSlide();
      default:
        return renderContentSlide();
    }
  };

  return (
    <div className={baseClasses}>
      {renderSlideContent()}
    </div>
  );
} 