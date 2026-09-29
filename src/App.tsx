import { useState, useEffect } from 'react';
import { PasswordGate, isUnlockedThisSession } from '@/components/PasswordGate';
import { MemoryJourney } from '@/components/MemoryJourney';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setUnlocked(isUnlockedThisSession());
  }, []);

  const handleUnlock = () => {
    setTransitioning(true);
    setTimeout(() => {
      setUnlocked(true);
      setTransitioning(false);
    }, 1200);
  };

  const handleExit = () => {
    setUnlocked(false);
    try {
      sessionStorage.removeItem('anniversary_unlocked');
    } catch {
      // ignore
    }
  };

  if (transitioning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream-100 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-100 opacity-50 blur-3xl" />
        <div className="relative animate-fade-in text-center">
          <p className="font-script text-4xl text-blush-500 sm:text-5xl">
            Welcome back
          </p>
          <p className="mt-4 font-sans text-xs tracking-[0.3em] text-blush-400">
            <span className="animate-pulse-soft">…</span>
          </p>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  return <MemoryJourney onExit={handleExit} />;
}
