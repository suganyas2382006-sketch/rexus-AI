'use client';

interface AudioVisualizerProps {
  isActive?: boolean;
}

export default function AudioVisualizer({ isActive = true }: AudioVisualizerProps) {
  return (
    <div className="flex items-center gap-1.5 h-6">
      {[40, 70, 100, 60, 85, 45, 95, 30].map((height, index) => (
        <div
          key={index}
          className={`w-[2px] bg-golden transition-all duration-300 rounded-full ${
            isActive ? 'animate-pulse' : 'opacity-20'
          }`}
          style={{
            height: isActive ? `${height}%` : '20%',
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}
