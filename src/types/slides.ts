export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  backgroundGradient?: string;
  textColor?: string;
  layout: 'title' | 'content' | 'split' | 'image-text';
  imageUrl?: string;
  bulletPoints?: string[];
}

export interface SlidePreset {
  id: string;
  name: string;
  description: string;
  slides: Slide[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
} 