import { SlidePreset } from '../types/slides';

export const pitchDeckPreset: SlidePreset = {
  id: 'pitch-deck-startup',
  name: 'Startup Pitch Deck',
  description: 'A comprehensive pitch deck template for startups',
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    backgroundColor: '#F8FAFC',
    textColor: '#1F2937',
  },
  slides: [
    {
      id: 0,
      title: 'Revolutionary AI Platform',
      subtitle: 'Transforming the Future of Business Intelligence',
      content: [
        'Welcome to the next generation of AI-powered solutions',
        'Empowering businesses with intelligent automation'
      ],
      layout: 'title',
      backgroundGradient: 'from-blue-600 via-purple-600 to-indigo-800',
      textColor: 'text-white',
    },
    {
      id: 1,
      title: 'The Problem',
      subtitle: 'Current Market Challenges',
      content: [
        'Businesses struggle with data overload and inefficient processes',
        'Manual analysis leads to delayed decision-making',
        'Lack of real-time insights costs companies millions annually'
      ],
      layout: 'content',
      backgroundGradient: 'from-red-50 to-orange-50',
      textColor: 'text-gray-800',
      bulletPoints: [
        '73% of businesses report data analysis bottlenecks',
        'Average decision delay: 2.5 weeks',
        '$2.3M average annual loss due to slow insights',
        'Manual processes consume 40% of analyst time'
      ]
    },
    {
      id: 2,
      title: 'Our Solution',
      subtitle: 'AI-Powered Business Intelligence',
      content: [
        'Introducing our revolutionary AI platform that transforms raw data into actionable insights',
        'Real-time analysis with predictive capabilities'
      ],
      layout: 'split',
      backgroundGradient: 'from-green-50 to-emerald-50',
      textColor: 'text-gray-800',
      bulletPoints: [
        'Instant data processing and analysis',
        'Predictive analytics with 95% accuracy',
        'Automated report generation',
        'Real-time dashboard updates',
        'Natural language query interface'
      ]
    }
  ]
};

export const slidePresets = [pitchDeckPreset]; 