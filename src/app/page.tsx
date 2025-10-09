import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-900">
      <ParticleBackground />
      <Navigation />
    </main>
  );
}