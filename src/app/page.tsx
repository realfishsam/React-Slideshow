import ComponentSlideshow from '../components/ComponentSlideshow';

export default function Home() {
  return (
    <main className="w-full h-screen">
      <ComponentSlideshow 
        totalSlides={3}
        title="AI Platform Pitch Deck"
        description="Revolutionary AI-powered business intelligence solution"
      />
    </main>
  );
}
