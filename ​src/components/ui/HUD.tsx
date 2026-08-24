export default function HUD() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
      <header className="flex justify-between items-center w-full uppercase font-mono text-[10px] tracking-widest text-golden opacity-80">
        <span>Rexus // Core</span>
        <span>Sys.Online</span>
      </header>
      
      <footer className="flex flex-col items-center gap-3">
        <span className="text-golden font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 animate-pulse">
          Vision.Active
        </span>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-golden/50 to-transparent" />
      </footer>
    </div>
  );
}
