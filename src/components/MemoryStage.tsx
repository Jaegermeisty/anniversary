import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import type { Memory } from '@/data/memories';

interface MemoryStageProps {
  memory: Memory;
  index: number;
  total: number;
}

export function MemoryStage({ memory, index, total }: MemoryStageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [memory.id]);

  const stageNumber = String(index + 1).padStart(2, '0');
  const isFinal = index === total - 1;

  const photoFrame = (extraClasses = '') => (
    <div className={`relative overflow-hidden rounded-sm shadow-[0_10px_50px_-15px_rgba(90,60,50,0.3)] ${extraClasses}`}>
      {imgError ? (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-cream-200">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-blush-200 bg-cream-50" />
            <p className="font-sans text-xs tracking-wide text-ink-600/40">
              add {memory.image.split('/').pop()}
            </p>
          </div>
        </div>
      ) : (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse-soft bg-cream-200" />
          )}
          <img
            src={memory.image}
            alt=""
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full object-cover transition-all duration-[1200ms] ease-out ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          />
        </>
      )}
    </div>
  );

  const textElement = (
    <div className="space-y-5">
      <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-blush-400">
        {stageNumber} <span className="text-blush-200 mx-0.5">—</span> {String(total).padStart(2, '0')}
      </span>
      <p className="font-serif text-2xl font-light leading-[1.5] text-ink-800 sm:text-[1.7rem] text-balance">
        {memory.text}
      </p>
    </div>
  );

  const overlayText = (position: 'bottom' | 'center') => (
    <div className="relative overflow-hidden rounded-sm shadow-[0_10px_50px_-15px_rgba(90,60,50,0.3)]">
      {imgError ? (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-cream-200">
          <p className="font-sans text-xs tracking-wide text-ink-600/40">
            add {memory.image.split('/').pop()}
          </p>
        </div>
      ) : (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse-soft bg-cream-200" />
          )}
          <img
            src={memory.image}
            alt=""
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full object-cover transition-all duration-[1200ms] ease-out ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/10 to-transparent ${
              position === 'center' ? 'from-ink-900/55 via-ink-900/35 to-ink-900/55' : ''
            }`}
          />
          <div
            className={`absolute inset-x-0 px-8 ${
              position === 'center'
                ? 'top-1/2 -translate-y-1/2 text-center'
                : 'bottom-0 pb-9'
            }`}
          >
            <p className="font-serif text-xl font-light leading-[1.5] text-cream-50 text-balance text-shadow-soft sm:text-2xl">
              {memory.text}
            </p>
          </div>
        </>
      )}
    </div>
  );

  const fullBleed = (
    <div className="space-y-10">
      {photoFrame()}
      <div className="text-center space-y-5">
        <p className="font-script text-3xl text-blush-500 sm:text-[2.5rem] leading-[1.4] text-balance px-2">
          {memory.text}
        </p>
        {isFinal && (
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blush-300" />
            <Heart className="h-3.5 w-3.5 text-blush-400" strokeWidth={1.5} fill="currentColor" />
            <span className="h-px w-8 bg-blush-300" />
          </div>
        )}
        {isFinal && (
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-blush-400">
            Forever yours
          </p>
        )}
      </div>
    </div>
  );

  switch (memory.layout) {
    case 'below':
      return (
        <div className="space-y-7">
          {photoFrame()}
          <div className="px-1">{textElement}</div>
        </div>
      );
    case 'above':
      return (
        <div className="space-y-7">
          <div className="px-1">{textElement}</div>
          {photoFrame()}
        </div>
      );
    case 'beside-left':
      return (
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-14">
          <div className="sm:w-[55%]">{photoFrame()}</div>
          <div className="sm:w-[45%]">{textElement}</div>
        </div>
      );
    case 'beside-right':
      return (
        <div className="flex flex-col gap-8 sm:flex-row-reverse sm:items-center sm:gap-14">
          <div className="sm:w-[55%]">{photoFrame()}</div>
          <div className="sm:w-[45%]">{textElement}</div>
        </div>
      );
    case 'overlay-bottom':
      return overlayText('bottom');
    case 'overlay-center':
      return overlayText('center');
    case 'full-bleed':
      return fullBleed;
    default:
      return (
        <div className="space-y-7">
          {photoFrame()}
          <div className="px-1">{textElement}</div>
        </div>
      );
  }
}
