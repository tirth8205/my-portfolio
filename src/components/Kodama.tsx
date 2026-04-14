import { useEffect, useState, useCallback } from 'react';

function getLondonHour(): number {
  const h = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    hour12: false,
  });
  return parseInt(h, 10);
}

export default function Kodama() {
  const [sleeping, setSleeping] = useState(false);
  const [hovered, setHovered] = useState(false);

  const updateMood = useCallback(() => {
    const hour = getLondonHour();
    setSleeping(hour >= 0 && hour < 6);
  }, []);

  useEffect(() => {
    updateMood();
    const interval = setInterval(updateMood, 60000);
    return () => clearInterval(interval);
  }, [updateMood]);

  return (
    <>
      <style jsx global>{`
        @keyframes otter-bob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }

        @keyframes otter-bob-sleep {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(0deg); }
        }

        @keyframes otter-blink {
          0%, 43%, 47%, 100% { transform: scaleY(1); }
          45% { transform: scaleY(0.1); }
        }

        @keyframes otter-ear-twitch {
          0%, 82%, 100% { transform: rotate(0deg); }
          84% { transform: rotate(-12deg); }
          87% { transform: rotate(4deg); }
          89% { transform: rotate(-6deg); }
          91% { transform: rotate(0deg); }
        }

        @keyframes otter-tail {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }

        @keyframes otter-paws {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-5deg); }
          70% { transform: rotate(5deg); }
        }

        @keyframes puddle-ripple {
          0% { r: 28; opacity: 0.08; }
          100% { r: 38; opacity: 0; }
        }

        @keyframes puddle-ripple-2 {
          0% { r: 24; opacity: 0.06; }
          100% { r: 34; opacity: 0; }
        }

        @keyframes otter-z1 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.3; }
          100% { transform: translate(6px, -20px); opacity: 0; }
        }

        @keyframes otter-z2 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.2; }
          100% { transform: translate(10px, -16px); opacity: 0; }
        }

        @keyframes otter-z3 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.15; }
          100% { transform: translate(4px, -24px); opacity: 0; }
        }

        .otter-body {
          animation: otter-bob 3.5s ease-in-out infinite;
        }

        .otter-body.sleeping {
          animation: otter-bob-sleep 5s ease-in-out infinite;
        }

        .otter-eye {
          transform-origin: center;
          animation: otter-blink 5s ease-in-out infinite;
        }

        .otter-eye-right {
          animation-delay: 0.06s;
        }

        .otter-ear-l {
          transform-origin: 22px 10px;
          animation: otter-ear-twitch 8s ease-in-out infinite;
        }

        .otter-ear-r {
          transform-origin: 42px 10px;
          animation: otter-ear-twitch 8s ease-in-out infinite;
          animation-delay: 4s;
        }

        .otter-tail {
          transform-origin: 52px 30px;
          animation: otter-tail 3s ease-in-out infinite;
        }

        .otter-paws {
          transform-origin: 32px 26px;
          animation: otter-paws 6s ease-in-out infinite;
        }

        .puddle-ring {
          animation: puddle-ripple 4s ease-out infinite;
        }

        .puddle-ring-2 {
          animation: puddle-ripple-2 4s ease-out 2s infinite;
        }

        .otter-z1 { animation: otter-z1 3s ease-out infinite; }
        .otter-z2 { animation: otter-z2 3s ease-out 1s infinite; }
        .otter-z3 { animation: otter-z3 3s ease-out 2s infinite; }
      `}</style>

      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="img"
        aria-label="A small otter floating on a puddle"
      >
        {/* Puddle */}
        <svg
          width="80"
          height="20"
          viewBox="0 0 80 20"
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ overflow: 'visible' }}
        >
          {/* Base puddle */}
          <ellipse cx="40" cy="10" rx="30" ry="7" fill="rgba(59, 130, 246, 0.05)" />
          <ellipse cx="40" cy="10" rx="30" ry="7" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.8" fill="none" />
          {/* Ripples */}
          <circle className="puddle-ring" cx="40" cy="10" r="28" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="0.6" />
          <circle className="puddle-ring-2" cx="40" cy="10" r="24" fill="none" stroke="rgba(59, 130, 246, 0.06)" strokeWidth="0.5" />
        </svg>

        {/* Otter */}
        <div className={`otter-body ${sleeping ? 'sleeping' : ''}`} style={{ marginBottom: 6 }}>
          <svg
            width="64"
            height="44"
            viewBox="0 0 64 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            {/* Tail */}
            <path
              className="otter-tail"
              d="M50 30Q56 28 58 22Q59 18 56 20Q54 22 52 28"
              stroke="rgba(59, 130, 246, 0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="rgba(59, 130, 246, 0.03)"
            />

            {/* Body - otter lying on its back */}
            <ellipse
              cx="32" cy="28" rx="18" ry="10"
              fill={hovered ? 'rgba(59, 130, 246, 0.07)' : 'rgba(59, 130, 246, 0.04)'}
              stroke="rgba(59, 130, 246, 0.22)"
              strokeWidth="1.3"
              className="transition-all duration-300"
            />

            {/* Belly patch */}
            <ellipse
              cx="32" cy="28" rx="10" ry="6"
              fill="rgba(59, 130, 246, 0.03)"
              stroke="rgba(59, 130, 246, 0.08)"
              strokeWidth="0.6"
            />

            {/* Head */}
            <circle
              cx="16" cy="20" r="9"
              fill={hovered ? 'rgba(59, 130, 246, 0.07)' : 'rgba(59, 130, 246, 0.04)'}
              stroke="rgba(59, 130, 246, 0.22)"
              strokeWidth="1.3"
              className="transition-all duration-300"
            />

            {/* Left ear */}
            <ellipse
              className="otter-ear-l"
              cx="11" cy="13" rx="3" ry="3.5"
              fill="rgba(59, 130, 246, 0.04)"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />

            {/* Right ear */}
            <ellipse
              className="otter-ear-r"
              cx="21" cy="13" rx="3" ry="3.5"
              fill="rgba(59, 130, 246, 0.04)"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />

            {/* Cheeks */}
            <circle cx="10" cy="22" r="2.5" fill="rgba(59, 130, 246, 0.04)" />
            <circle cx="22" cy="22" r="2.5" fill="rgba(59, 130, 246, 0.04)" />

            {/* Nose */}
            <ellipse cx="16" cy="21" rx="1.5" ry="1" fill="rgba(59, 130, 246, 0.2)" />

            {/* Whiskers */}
            <line x1="8" y1="20" x2="4" y2="19" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.5" strokeLinecap="round" />
            <line x1="8" y1="22" x2="4" y2="23" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.5" strokeLinecap="round" />
            <line x1="24" y1="20" x2="28" y2="19" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.5" strokeLinecap="round" />
            <line x1="24" y1="22" x2="28" y2="23" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.5" strokeLinecap="round" />

            {/* Eyes */}
            {sleeping ? (
              <>
                <line x1="12.5" y1="18.5" x2="15.5" y2="18.5" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeLinecap="round" />
                <line x1="16.5" y1="18.5" x2="19.5" y2="18.5" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle
                  className="otter-eye"
                  cx="14" cy="18.5"
                  r={hovered ? 1.8 : 1.4}
                  fill="rgba(59, 130, 246, 0.45)"
                  style={{ transition: 'r 0.2s' }}
                />
                <circle
                  className="otter-eye otter-eye-right"
                  cx="18" cy="18.5"
                  r={hovered ? 1.8 : 1.4}
                  fill="rgba(59, 130, 246, 0.45)"
                  style={{ transition: 'r 0.2s' }}
                />
                {/* Eye highlights */}
                <circle cx="14.5" cy="17.8" r="0.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="18.5" cy="17.8" r="0.5" fill="rgba(255,255,255,0.6)" />
              </>
            )}

            {/* Paws resting on belly */}
            <g className="otter-paws">
              <ellipse cx="26" cy="24" rx="2.5" ry="1.8" fill="rgba(59, 130, 246, 0.04)" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.8" />
              <ellipse cx="38" cy="24" rx="2.5" ry="1.8" fill="rgba(59, 130, 246, 0.04)" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.8" />
            </g>

            {/* Back feet */}
            <ellipse cx="46" cy="34" rx="3" ry="2" fill="rgba(59, 130, 246, 0.03)" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.7" transform="rotate(-15, 46, 34)" />
            <ellipse cx="44" cy="37" rx="3" ry="2" fill="rgba(59, 130, 246, 0.03)" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="0.7" transform="rotate(10, 44, 37)" />

            {/* Sleep z particles */}
            {sleeping && (
              <>
                <text className="otter-z1" x="24" y="10" fontSize="7" fill="rgba(59, 130, 246, 0.35)" fontFamily="Space Grotesk, sans-serif">z</text>
                <text className="otter-z2" x="28" y="6" fontSize="5.5" fill="rgba(59, 130, 246, 0.25)" fontFamily="Space Grotesk, sans-serif">z</text>
                <text className="otter-z3" x="26" y="2" fontSize="8" fill="rgba(59, 130, 246, 0.18)" fontFamily="Space Grotesk, sans-serif">z</text>
              </>
            )}

            {/* Hovered blush */}
            {hovered && !sleeping && (
              <>
                <circle cx="10.5" cy="21" r="1.8" fill="rgba(239, 68, 68, 0.06)" />
                <circle cx="21.5" cy="21" r="1.8" fill="rgba(239, 68, 68, 0.06)" />
              </>
            )}
          </svg>
        </div>
      </div>
    </>
  );
}
