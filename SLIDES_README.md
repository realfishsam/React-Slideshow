# Slide System Documentation

## Overview

This slideshow system uses a component-based architecture where each slide is its own React component. This approach provides maximum flexibility for creating custom layouts, interactive elements, and unique designs for each slide.

## Architecture

### Current Structure
```
slides/
├── 0/
│   └── slide.tsx    # Title slide
├── 1/
│   └── slide.tsx    # Problem slide
├── 2/
│   └── slide.tsx    # Solution slide
└── ...
```

### How It Works

1. **Component-Based**: Each slide is a React component in `slides/n/slide.tsx`
2. **Dynamic Loading**: The slideshow dynamically imports slide components using Next.js dynamic imports
3. **Fallback Handling**: If a slide component doesn't exist, a fallback message is shown
4. **Navigation**: Use arrow keys, space bar, or navigation controls to move between slides

## Creating New Slides

### Method 1: Using the Helper Script (Recommended)

```bash
# Create a basic content slide
node scripts/create-slide.js 3

# Create a slide with custom title
node scripts/create-slide.js 4 "Market Analysis"

# Create a slide with specific layout
node scripts/create-slide.js 5 "Our Solution" split
```

Available layouts:
- `title`: Large centered title with subtitle
- `content`: Two-column layout with content and bullet points
- `split`: Side-by-side layout with content and feature box

### Method 2: Manual Creation

1. Create a new directory: `slides/n/` (where n is the slide number)
2. Create `slide.tsx` in that directory
3. Export a default React component

Example:
```tsx
export default function Slide3() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl font-bold">Your Title</h1>
        <p className="text-xl">Your content here</p>
      </div>
    </div>
  );
}
```

## Updating the Slideshow

After creating new slides, update the `totalSlides` prop in `src/app/page.tsx`:

```tsx
<ComponentSlideshow 
  totalSlides={6}  // Update this number
  title="Your Presentation Title"
  description="Your presentation description"
/>
```

## Styling Guidelines

### Layout Classes
- Use `w-full h-full` for the container
- Use `flex flex-col justify-center items-center` for centering
- Use `p-12` for consistent padding

### Background Gradients
- Title slides: `bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800`
- Problem slides: `bg-gradient-to-br from-red-50 to-orange-50`
- Solution slides: `bg-gradient-to-br from-green-50 to-emerald-50`
- Custom: Use any Tailwind gradient classes

### Typography
- Main titles: `text-5xl md:text-6xl font-bold`
- Large titles: `text-6xl md:text-7xl font-bold`
- Subtitles: `text-2xl md:text-3xl font-light opacity-80`
- Body text: `text-xl leading-relaxed`

### Responsive Design
- Use `md:` prefixes for desktop layouts
- Use `grid md:grid-cols-2` for responsive columns
- Use `space-y-*` for consistent vertical spacing

## Navigation Controls

### Keyboard Shortcuts
- `→` or `Space`: Next slide
- `←`: Previous slide
- `Home`: First slide
- `End`: Last slide
- `F` or `F11`: Toggle fullscreen
- `Escape`: Exit fullscreen

### Mouse/Touch
- Click navigation dots to jump to specific slides
- Use previous/next buttons
- Click fullscreen button in header

## Advanced Features

### Interactive Elements
Since each slide is a React component, you can add:
- State management with `useState`
- Animations with Framer Motion
- Charts with libraries like Chart.js
- Forms and user input
- API calls and data fetching

### Custom Layouts
Create completely custom layouts by modifying the slide component structure. You're not limited to the preset layouts.

### Shared Components
Create reusable components in `src/components/slides/` for common slide elements like charts, bullet lists, or call-to-action sections.

## Tips

1. **Consistent Styling**: Use the same color schemes and typography across slides for a cohesive look
2. **Performance**: Large images should be optimized and placed in the `public/` directory
3. **Accessibility**: Include proper alt text for images and semantic HTML structure
4. **Testing**: Test your slides in fullscreen mode and on different screen sizes
5. **Version Control**: Each slide is a separate file, making it easy to track changes and collaborate

## Troubleshooting

### Slide Not Showing
- Check that the file is named `slide.tsx` (not `slide.ts`)
- Ensure the component is exported as default
- Verify the slide number matches the directory name
- Check for TypeScript/syntax errors in the component

### Styling Issues
- Ensure Tailwind classes are spelled correctly
- Check that custom classes are included in the safelist in `tailwind.config.js`
- Use browser dev tools to inspect applied styles

### Navigation Issues
- Verify `totalSlides` prop matches the number of slide components
- Check browser console for any JavaScript errors 