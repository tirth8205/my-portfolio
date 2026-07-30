import { useEffect, useState, useCallback, useRef } from 'react';

type Mood = 'sleeping' | 'coffee' | 'gym' | 'coding' | 'eating' | 'gaming' | 'music' | 'sleepy' | 'idle';

function getLondonHour(): number {
  return parseInt(
    new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }),
    10,
  );
}

function getMood(hour: number): Mood {
  if (hour >= 0 && hour < 6) return 'sleeping';
  if (hour === 6) return 'coffee';
  if (hour === 7) return 'gym';
  if (hour === 8) return 'idle';
  if (hour >= 9 && hour < 12) return 'coding';
  if (hour === 12) return 'eating';
  if (hour === 13) return 'coffee';
  if (hour >= 14 && hour < 18) return 'coding';
  if (hour === 18) return 'gym';
  if (hour >= 19 && hour < 21) return 'gaming';
  if (hour === 21) return 'music';
  return 'sleepy';
}

function faceFor(mood: Mood, blink: boolean): string {
  if (mood === 'sleeping') return '(- -)';
  if (mood === 'sleepy') return '(u u)';
  if (blink) return '(- -)';
  if (mood === 'coffee' || mood === 'eating' || mood === 'music') return '(^ ^)';
  return '(. .)';
}

export default function Kodama() {
  const [timeMood, setTimeMood] = useState<Mood>('idle');
  const [override, setOverride] = useState<Mood | null>(null);
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout>>();

  const updateMood = useCallback(() => setTimeMood(getMood(getLondonHour())), []);

  useEffect(() => {
    updateMood();
    const iv = setInterval(updateMood, 60000);
    return () => clearInterval(iv);
  }, [updateMood]);

  useEffect(() => {
    const iv = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const handleClick = () => {
    const current = override ?? timeMood;
    if (current === 'sleeping') {
      setOverride('idle');
      if (revertTimer.current) clearTimeout(revertTimer.current);
      revertTimer.current = setTimeout(() => setOverride(null), 6000);
    }
  };

  const mood = override ?? timeMood;

  return (
    <>
      <style jsx global>{`
        @keyframes bunny-breathe { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1.5px)} }
        @keyframes bunny-ear { 0%,92%,100%{transform:rotate(0)} 94%{transform:rotate(-4deg)} 97%{transform:rotate(2deg)} }
        @keyframes bunny-z1 { 0%{transform:translate(0,0);opacity:0} 15%{opacity:.5} 100%{transform:translate(4px,-10px);opacity:0} }
        @keyframes bunny-z2 { 0%{transform:translate(0,0);opacity:0} 15%{opacity:.35} 100%{transform:translate(7px,-14px);opacity:0} }
        @keyframes bunny-note { 0%{transform:translate(0,0) rotate(0);opacity:0} 20%{opacity:.5} 100%{transform:translate(3px,-11px) rotate(12deg);opacity:0} }

        .bunny-float{animation:bunny-breathe 4s ease-in-out infinite}
        .bunny-float.sleeping,.bunny-float.sleepy{animation:bunny-breathe 6s ease-in-out infinite}
        .bunny-ears{display:inline-block;transform-origin:50% 100%;animation:bunny-ear 9s ease-in-out infinite}
        .bunny-z-1{animation:bunny-z1 3s ease-out infinite}
        .bunny-z-2{animation:bunny-z2 3s ease-out 1.5s infinite}
        .bunny-note-1{animation:bunny-note 2.8s ease-out infinite}
      `}</style>

      <div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 cursor-pointer select-none transition-transform duration-300 ease-out"
        style={{ transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="img"
        aria-label={`Rabbit, ${mood}`}
      >
        <div
          className={`bunny-float ${mood} relative font-mono font-bold text-[13px] leading-[1.15] whitespace-pre text-center transition-colors duration-300 ${
            hovered ? 'text-neutral-800' : 'text-neutral-600'
          }`}
        >
          {mood === 'sleeping' && (
            <>
              <span className="bunny-z-1 absolute -top-3 right-0" aria-hidden="true">z</span>
              <span className="bunny-z-2 absolute -top-3 right-1" aria-hidden="true">z</span>
            </>
          )}
          {mood === 'music' && (
            <span className="bunny-note-1 absolute -top-3 right-0" aria-hidden="true">♪</span>
          )}
          <div>
            <span className="bunny-ears">{'(\\ /)'}</span>
          </div>
          <div>{faceFor(mood, blink)}</div>
        </div>
      </div>
    </>
  );
}
