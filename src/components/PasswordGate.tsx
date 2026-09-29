import { useState, useRef, FormEvent } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const PASSWORD = 'Leia';
const HINT = 'What will our daughter be named?';
const SESSION_KEY = 'anniversary_unlocked';

export function isUnlockedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // sessionStorage may be unavailable; continue anyway
      }
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setValue('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream-100 px-6 overflow-hidden">
      {/* Layered soft glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-100 opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-0 left-0 h-[300px] w-[300px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-cream-300/40 blur-3xl" />

      <div
        className="relative w-full max-w-sm animate-fade-in-up text-center"
        style={
          shake
            ? { animation: 'fadeInUp 1s ease-out forwards, shake 0.5s ease' }
            : undefined
        }
      >
        {/* Heart icon with gentle pulse */}
        <div className="mx-auto mb-10 flex h-14 w-14 items-center justify-center">
          <Heart
            className="h-7 w-7 text-blush-400 animate-breathe"
            strokeWidth={1.2}
            fill="currentColor"
          />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-light tracking-wide text-ink-800 sm:text-5xl">
          For you
        </h1>

        {/* Subtitle */}
        <p className="mt-4 font-sans text-sm font-light tracking-[0.15em] text-ink-600/80">
          A little something private, just for us
        </p>

        {/* Decorative divider */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-blush-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-blush-300" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-blush-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Type your answer…"
              autoFocus
              className={`w-full rounded-full border bg-cream-50/80 px-6 py-4 text-center font-serif text-lg font-light tracking-wide text-ink-800 placeholder:text-ink-600/30 focus:outline-none focus:ring-2 transition-all duration-500 ${
                error
                  ? 'border-blush-400 focus:ring-blush-300/60'
                  : 'border-blush-200 focus:border-blush-300 focus:ring-blush-200/40'
              }`}
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-2.5 rounded-full border border-blush-300 bg-blush-50 px-9 py-3.5 font-sans text-sm font-medium tracking-wide text-blush-600 transition-all duration-500 hover:bg-blush-100 hover:border-blush-400 active:scale-95"
          >
            Enter
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </button>
        </form>

        {/* Hint */}
        <div className="mt-12">
          <p className="font-script text-2xl text-blush-500 leading-relaxed">
            {HINT}
          </p>
        </div>

        {/* Error message */}
        <p
          className={`mt-4 font-sans text-xs tracking-wide text-blush-500 transition-opacity duration-400 ${
            error ? 'opacity-100' : 'opacity-0'
          }`}
        >
          That's not quite it. Try again, my love.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
