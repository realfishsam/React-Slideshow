#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createSlide(slideNumber, title = 'New Slide', layout = 'content') {
  const slideDir = path.join(process.cwd(), 'slides', slideNumber.toString());
  const slideFile = path.join(slideDir, 'slide.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(slideDir)) {
    fs.mkdirSync(slideDir, { recursive: true });
  }

  // Check if slide already exists
  if (fs.existsSync(slideFile)) {
    console.log(`Slide ${slideNumber} already exists at ${slideFile}`);
    return;
  }

  // Template based on layout
  const templates = {
    title: `export default function Slide${slideNumber}() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          ${title}
        </h1>
        <h2 className="text-2xl md:text-3xl font-light opacity-90">
          Subtitle goes here
        </h2>
        <div className="space-y-4 text-xl md:text-2xl opacity-80">
          <p>Your content goes here</p>
          <p>Add more paragraphs as needed</p>
        </div>
      </div>
    </div>
  );
}`,

    content: `export default function Slide${slideNumber}() {
  const bulletPoints = [
    'First key point',
    'Second key point',
    'Third key point',
    'Fourth key point'
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            ${title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            Subtitle goes here
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">
              Your main content goes here. Explain your key points and provide context.
            </p>
            <p className="text-xl leading-relaxed">
              Add additional paragraphs to elaborate on your topic.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Key Points</h3>
            <ul className="space-y-4">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-current rounded-full mt-3"></span>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}`,

    split: `export default function Slide${slideNumber}() {
  const features = [
    'Feature one',
    'Feature two',
    'Feature three',
    'Feature four'
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-green-50 to-emerald-50 text-gray-800">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            ${title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light opacity-80">
            Subtitle goes here
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">
              Your main content goes here. This layout works well for solutions, features, or comparisons.
            </p>
            <p className="text-xl leading-relaxed">
              Add more context and details about your topic.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Features</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-3 h-3 bg-current rounded-full mt-2"></span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}`
  };

  const template = templates[layout] || templates.content;

  // Write the file
  fs.writeFileSync(slideFile, template);
  console.log(`✅ Created slide ${slideNumber} at ${slideFile}`);
  console.log(`📝 Layout: ${layout}`);
  console.log(`🎯 Title: ${title}`);
  console.log(`\n💡 To use this slide, update your slideshow totalSlides prop to include slide ${slideNumber}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const slideNumber = args[0];
const title = args[1] || 'New Slide';
const layout = args[2] || 'content';

if (!slideNumber) {
  console.log('Usage: node scripts/create-slide.js <slideNumber> [title] [layout]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/create-slide.js 3');
  console.log('  node scripts/create-slide.js 4 "Market Analysis"');
  console.log('  node scripts/create-slide.js 5 "Our Solution" split');
  console.log('');
  console.log('Available layouts: title, content, split');
  process.exit(1);
}

createSlide(slideNumber, title, layout); 