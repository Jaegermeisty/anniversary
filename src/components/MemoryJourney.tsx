import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memories } from '@/data/memories';
import { MemoryStage } from './MemoryStage';

interface MemoryJourneyProps {
  onExit: () => void;
}

export function MemoryJourney({ onExit }: MemoryJourneyProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = memories.length;
  const isFirst = current === 0;
  const isLast = current === total - 1;

  const goTo = useCallback((target: number, dir: 'forward' | 'backward') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setCurrent(target);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    if (isAnimating || isLast) return;
    goTo(current + 1, 'forward');
  }, [isAnimating, isLast, current, goTo]);

  const goBack = useCallback(() => {
    if (isAnimating || isFirst) return;
    goTo(current - 1, 'backward');
  }, [isAnimating, isFirst, current, goTo]);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 750);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goBack();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goBack]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) goNext();
      else goBack();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const memory = memories[current];

  return (
    <div
      className="min-h-screen bg-cream-100 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Layered ambient glows */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blush-100/50 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[350px] w-[350px] translate-x-1/4 translate-y-1/4 rounded-full bg-rose-200/20 blur-3xl" />

      {/* Progress indicator */}
      <div className="fixed left-1/2 top-7 z-30 -translate-x-1/2">
        <div className="flex items-center gap-1.5">
          {memories.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                if (i === current) return;
                goTo(i, i > current ? 'forward' : 'backward');
              }}
              aria-label={`Go to memory ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                i === current
                  ? 'w-7 bg-blush-400'
                  : i < current
                    ? 'w-1.5 bg-blush-300'
                    : 'w-1.5 bg-blush-200/60 hover:bg-blush-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stage content */}
      <div className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-12 sm:py-24">
        <div
          key={memory.id}
          className={`w-full max-w-2xl ${
            direction === 'forward'
              ? 'animate-[slideForward_0.75s_cubic-bezier(0.22,1,0.36,1)]'
              : 'animate-[slideBackward_0.75s_cubic-bezier(0.22,1,0.36,1)]'
          }`}
        >
          <MemoryStage
            memory={memory}
            index={current}
            total={total}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      {!isFirst && (
        <button
          onClick={goBack}
          disabled={isAnimating}
          aria-label="Previous memory"
          className="group fixed left-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-blush-200/70 bg-cream-50/70 text-blush-500 transition-all duration-500 hover:bg-blush-100 hover:border-blush-300 disabled:opacity-25 sm:left-6 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.3} />
        </button>
      )}

      {!isLast ? (
        <button
          onClick={goNext}
          disabled={isAnimating}
          aria-label="Next memory"
          className="group fixed right-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-blush-200/70 bg-cream-50/70 text-blush-500 transition-all duration-500 hover:bg-blush-100 hover:border-blush-300 disabled:opacity-25 sm:right-6 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.3} />
        </button>
      ) : (
        <button
          onClick={onExit}
          className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.35em] text-blush-400 transition-colors duration-500 hover:text-blush-600"
        >
          Read again
        </button>
      )}

      <style>{`
        @keyframes slideForward {
          0% { opacity: 0; transform: translateX(36px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideBackward {
          0% { opacity: 0; transform: translateX(-36px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
