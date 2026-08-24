import dynamic from 'next/dynamic';
import HUD from '../components/ui/HUD';

const DynamicAIInterface = dynamic(() => import('../components/AIInterface'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background z-50">
      <span className="text-golden font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
        Initializing Engine...
      </span>
    </div>
  )
});

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-background overflow-hidden">
      <HUD />
      <DynamicAIInterface />
    </main>
  );
}
