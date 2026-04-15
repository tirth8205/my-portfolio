import { useEffect, useState, useCallback, useRef } from 'react';

type FoxMood = 'sleeping' | 'coffee' | 'gym' | 'coding' | 'eating' | 'gaming' | 'music' | 'sleepy' | 'idle';

function getLondonHour(): number {
  return parseInt(
    new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }),
    10,
  );
}

function getFoxMood(hour: number): FoxMood {
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

export default function Kodama() {
  const [timeMood, setTimeMood] = useState<FoxMood>('idle');
  const [override, setOverride] = useState<FoxMood | null>(null);
  const [hovered, setHovered] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout>>();

  const updateMood = useCallback(() => setTimeMood(getFoxMood(getLondonHour())), []);

  useEffect(() => {
    updateMood();
    const iv = setInterval(updateMood, 60000);
    return () => clearInterval(iv);
  }, [updateMood]);

  const handleClick = () => {
    const current = override ?? timeMood;
    if (current === 'sleeping') {
      setOverride('idle');
      if (revertTimer.current) clearTimeout(revertTimer.current);
      revertTimer.current = setTimeout(() => setOverride(null), 6000);
    }
  };

  const mood = override ?? timeMood;
  const happyEyes = mood === 'eating' || mood === 'coffee' || mood === 'music';
  const openEyes = mood === 'idle' || mood === 'coding' || mood === 'gaming' || mood === 'gym';
  const tailStill = mood === 'sleeping' || mood === 'coding' || mood === 'gym' || mood === 'sleepy';

  return (
    <>
      <style jsx global>{`
        @keyframes fox-breathe { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2.5px)} }
        @keyframes fox-breathe-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1px)} }
        @keyframes fox-blink { 0%,90%,94%,100%{transform:scaleY(1)} 92%{transform:scaleY(.05)} }
        @keyframes fox-ear { 0%,88%,100%{transform:rotate(0)} 90%{transform:rotate(-6deg)} 93%{transform:rotate(2deg)} }
        @keyframes fox-tail { 0%,100%{transform:rotate(0)} 30%{transform:rotate(3deg)} 70%{transform:rotate(-3deg)} }
        @keyframes fox-z1 { 0%{transform:translate(0,0);opacity:0} 15%{opacity:.4} 100%{transform:translate(4px,-12px);opacity:0} }
        @keyframes fox-z2 { 0%{transform:translate(0,0);opacity:0} 15%{opacity:.25} 100%{transform:translate(7px,-16px);opacity:0} }
        @keyframes fox-type-l { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-.8px)} }
        @keyframes fox-type-r { 0%,100%{transform:translateY(-.8px)} 50%{transform:translateY(0)} }
        @keyframes cursor-blink { 0%,49%{opacity:.8} 50%,100%{opacity:0} }
        @keyframes screen-flicker { 0%,100%{opacity:.03} 50%{opacity:.06} }
        @keyframes fish-bob { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-1px) rotate(3deg)} }
        @keyframes heart-float { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{transform:translate(0,-2px) scale(1);opacity:.5} 100%{transform:translate(3px,-14px) scale(.5);opacity:0} }
        @keyframes steam-rise { 0%{transform:translateY(0) scaleX(1);opacity:0} 30%{opacity:.35} 100%{transform:translateY(-9px) scaleX(1.3);opacity:0} }
        @keyframes dumbbell-lift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3.5px)} }
        @keyframes sweat-fly { 0%{transform:translate(0,0);opacity:0} 20%{opacity:.45} 100%{transform:translate(5px,-8px);opacity:0} }
        @keyframes note-float { 0%{transform:translate(0,0) rotate(0);opacity:0} 20%{opacity:.45} 100%{transform:translate(4px,-14px) rotate(15deg);opacity:0} }
        @keyframes pad-press { 0%,40%,100%{transform:scale(1)} 20%{transform:scale(.8)} }
        @keyframes joy-wobble { 0%,100%{transform:translate(0,0)} 25%{transform:translate(.5px,-.3px)} 75%{transform:translate(-.5px,.3px)} }

        .fox-float{animation:fox-breathe 4s ease-in-out infinite}
        .fox-float.sleeping,.fox-float.sleepy{animation:fox-breathe-slow 6s ease-in-out infinite}
        .fox-eye-g{transform-origin:center;animation:fox-blink 5s ease-in-out infinite}
        .fox-eye-g-r{animation-delay:.05s}
        .fox-ear-l{transform-origin:9px 10px;animation:fox-ear 10s ease-in-out infinite}
        .fox-tail-g{transform-origin:38px 30px;animation:fox-tail 4s ease-in-out infinite}
        .tail-still .fox-tail-g{animation:none}
        .fox-z1{animation:fox-z1 3s ease-out infinite}
        .fox-z2{animation:fox-z2 3s ease-out 1.5s infinite}
        .fox-paw-l{animation:fox-type-l .35s ease-in-out infinite}
        .fox-paw-r{animation:fox-type-r .35s ease-in-out infinite}
        .fox-cursor{animation:cursor-blink .8s step-end infinite}
        .fox-screen-glow{animation:screen-flicker 3s ease-in-out infinite}
        .fox-fish{animation:fish-bob 2s ease-in-out infinite}
        .fox-heart{animation:heart-float 2.5s ease-out infinite}
        .fox-heart-2{animation:heart-float 2.5s ease-out 1.2s infinite}
        .fox-steam-1{animation:steam-rise 2.2s ease-out infinite}
        .fox-steam-2{animation:steam-rise 2.2s ease-out .7s infinite}
        .fox-steam-3{animation:steam-rise 2.2s ease-out 1.4s infinite}
        .fox-dumbbell{animation:dumbbell-lift 1s ease-in-out infinite}
        .fox-sweat-1{animation:sweat-fly 1.5s ease-out infinite}
        .fox-sweat-2{animation:sweat-fly 1.5s ease-out .6s infinite}
        .fox-note-1{animation:note-float 2.8s ease-out infinite}
        .fox-note-2{animation:note-float 2.8s ease-out 1.1s infinite}
        .fox-pad-a{animation:pad-press 1.2s ease-in-out infinite}
        .fox-pad-b{animation:pad-press 1.2s ease-in-out .4s infinite}
        .fox-joy{animation:joy-wobble .6s ease-in-out infinite}
      `}</style>

      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer select-none transition-transform duration-300 ease-out"
        style={{ transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="img"
        aria-label={`Fox — ${mood}`}
      >
        <div className={`fox-float ${mood} ${tailStill ? 'tail-still' : ''}`}>
          <svg width="56" height="52" viewBox="0 0 56 52" fill="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="ff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8873c" /><stop offset="100%" stopColor="#d06a28" />
              </linearGradient>
              <linearGradient id="ffl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0a050" /><stop offset="100%" stopColor="#e08838" />
              </linearGradient>
              <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef5e7" /><stop offset="100%" stopColor="#fce4c0" />
              </linearGradient>
              <radialGradient id="fe"><stop offset="0%" stopColor="#3d2010" /><stop offset="100%" stopColor="#1c0d05" /></radialGradient>
              <linearGradient id="mug-g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b6240" /><stop offset="100%" stopColor="#6b4226" />
              </linearGradient>
              <linearGradient id="db-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#777" /><stop offset="100%" stopColor="#555" />
              </linearGradient>
              <filter id="fs"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity=".07" /></filter>
              <filter id="sg"><feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#60a5fa" floodOpacity=".15" /></filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="28" cy="50" rx={hovered?14:16} ry={hovered?2:2.5} fill="rgba(0,0,0,.05)" style={{transition:'all .3s'}} />

            {/* Tail */}
            <g className="fox-tail-g">
              <path d="M38 30C46 24,52 16,48 8C46 4,40 6,38 12C36 18,37 24,38 28" fill="url(#ff)" filter="url(#fs)" />
              <path d="M48 8C46 5,42 6,40 10C43 6,46 5.5,47 8" fill="url(#fc)" />
            </g>

            {/* Body */}
            <ellipse cx="28" cy="32" rx="15" ry="11" fill="url(#ff)" filter="url(#fs)" />
            <ellipse cx="26" cy="34" rx="9" ry="6.5" fill="url(#fc)" />

            {/* Head */}
            <circle cx="18" cy="20" r="13" fill="url(#ff)" filter="url(#fs)" />
            <circle cx="18" cy="20" r="9" fill="url(#ffl)" />
            <ellipse cx="15" cy="24" rx="6" ry="4.5" fill="url(#fc)" />

            {/* Left ear */}
            <g className="fox-ear-l">
              <path d="M8 12L3 0L14 8Z" fill="url(#ff)" />
              <path d="M8.5 10L5 3L12 8Z" fill="#f0a868" />
              <path d="M3 0L5.5 4.5L7 1.5Z" fill="#3d2515" />
            </g>
            {/* Right ear */}
            <path d="M25 9L32 0L29 12Z" fill="url(#ff)" />
            <path d="M26 9L30 3L28.5 11Z" fill="#f0a868" />
            <path d="M32 0L29.5 4L27.5 1Z" fill="#3d2515" />

            {/* ── Music: headphones on head ── */}
            {mood === 'music' && (
              <>
                <path d="M6 17Q18 5,30 17" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M7.5 17Q18 7,28.5 17" stroke="#444" strokeWidth=".8" fill="none" />
                <rect x="3" y="15" width="6" height="7" rx="3" fill="#333" stroke="#222" strokeWidth=".3" />
                <rect x="4.2" y="16.2" width="3.6" height="4.6" rx="1.8" fill="#4a4a4a" />
                <ellipse cx="6" cy="18.5" rx="1" ry="1.3" fill="#2a2a2a" />
                <rect x="27" y="15" width="6" height="7" rx="3" fill="#333" stroke="#222" strokeWidth=".3" />
                <rect x="28.2" y="16.2" width="3.6" height="4.6" rx="1.8" fill="#4a4a4a" />
                <ellipse cx="30" cy="18.5" rx="1" ry="1.3" fill="#2a2a2a" />
              </>
            )}

            {/* ── Eyes ── */}
            {mood === 'sleeping' ? (
              <>
                <path d="M11 18.5Q14 16.5,17 18.5" stroke="#3d2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M19 18.5Q22 16.5,25 18.5" stroke="#3d2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </>
            ) : happyEyes ? (
              <>
                <path d="M11 17.5Q14 19.5,17 17.5" stroke="#3d2010" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M19 17.5Q22 19.5,25 17.5" stroke="#3d2010" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              </>
            ) : mood === 'sleepy' ? (
              <>
                <circle cx="14" cy="18" r="2.2" fill="url(#fe)" />
                <path d="M11 17Q14 15,17 17" fill="url(#ffl)" />
                <circle cx="14.5" cy="17.5" r=".6" fill="white" opacity=".5" />
                <circle cx="22" cy="18" r="2.2" fill="url(#fe)" />
                <path d="M19 17Q22 15,25 17" fill="url(#ffl)" />
                <circle cx="22.5" cy="17.5" r=".6" fill="white" opacity=".5" />
              </>
            ) : openEyes ? (
              <>
                <g className="fox-eye-g">
                  <circle cx="14" cy="18" r={mood==='gaming'?2.8:hovered?2.8:2.4} fill="url(#fe)" style={{transition:'r .2s'}} />
                  <circle cx="14.8" cy="17" r=".9" fill="white" opacity=".85" />
                  {mood==='coding'?<circle cx="13.5" cy="19" r=".35" fill="#60a5fa" opacity=".3"/>:<circle cx="13.2" cy="19" r=".4" fill="white" opacity=".35"/>}
                </g>
                <g className="fox-eye-g fox-eye-g-r">
                  <circle cx="22" cy="18" r={mood==='gaming'?2.8:hovered?2.8:2.4} fill="url(#fe)" style={{transition:'r .2s'}} />
                  <circle cx="22.8" cy="17" r=".9" fill="white" opacity=".85" />
                  {mood==='coding'?<circle cx="21.5" cy="19" r=".35" fill="#60a5fa" opacity=".3"/>:<circle cx="21.2" cy="19" r=".4" fill="white" opacity=".35"/>}
                </g>
              </>
            ) : null}

            {/* Nose */}
            <ellipse cx="15" cy="22.5" rx="2" ry="1.4" fill="#2d1810" />
            <ellipse cx="15.5" cy="22" rx=".7" ry=".4" fill="white" opacity=".18" />

            {/* Mouth */}
            {mood === 'sleepy' ? (
              <ellipse cx="15" cy="24.5" rx="1.5" ry="2" fill="#2d1810" opacity=".12" stroke="#8b5e3c" strokeWidth=".4" />
            ) : mood === 'eating' ? (
              <path d="M15 23.8Q12.5 26,11 25.2M15 23.8Q17.5 26,19 25.2" stroke="#8b5e3c" strokeWidth=".6" fill="none" strokeLinecap="round" opacity=".4" />
            ) : (
              <path d="M15 23.8Q13 25.2,11.5 24.8M15 23.8Q17 25.2,18.5 24.8" stroke="#8b5e3c" strokeWidth=".5" fill="none" strokeLinecap="round" opacity=".35" />
            )}

            {/* Cheeks */}
            <circle cx="9" cy="22" r="2.8" fill="#f0885a" opacity={hovered||mood==='eating'||mood==='coffee'||mood==='music'?.2:.1} style={{transition:'opacity .3s'}} />
            <circle cx="25" cy="22" r="2.8" fill="#f0885a" opacity={hovered||mood==='eating'||mood==='coffee'||mood==='music'?.2:.1} style={{transition:'opacity .3s'}} />

            {/* Whiskers */}
            <line x1="8" y1="23" x2="2" y2="22" stroke="#c4895a" strokeWidth=".4" opacity=".25" strokeLinecap="round" />
            <line x1="8" y1="25" x2="2" y2="26" stroke="#c4895a" strokeWidth=".4" opacity=".25" strokeLinecap="round" />
            <line x1="25" y1="23" x2="31" y2="22" stroke="#c4895a" strokeWidth=".4" opacity=".25" strokeLinecap="round" />
            <line x1="25" y1="25" x2="31" y2="26" stroke="#c4895a" strokeWidth=".4" opacity=".25" strokeLinecap="round" />

            {/* ══════ Props ══════ */}

            {/* ── Coding: laptop ── */}
            {mood === 'coding' && (
              <g>
                <circle className="fox-screen-glow" cx="18" cy="24" r="8" fill="#60a5fa" opacity=".03" />
                {/* Screen */}
                <rect x="18" y="34" width="16" height="9.5" rx="1.2" fill="#1a1a24" stroke="#2a2a36" strokeWidth=".4" filter="url(#sg)" />
                <rect x="19.5" y="35.5" width="13" height="6.5" rx=".6" fill="#1e2130" />
                {/* Editor gutter */}
                <rect x="19.5" y="35.5" width="2.2" height="6.5" fill="#181a24" rx=".3" />
                {/* Code lines */}
                <line x1="22.5" y1="37" x2="27" y2="37" stroke="#4ade80" strokeWidth=".5" opacity=".8" />
                <line x1="23.5" y1="38.5" x2="30" y2="38.5" stroke="#60a5fa" strokeWidth=".5" opacity=".7" />
                <line x1="23.5" y1="40" x2="26" y2="40" stroke="#fbbf24" strokeWidth=".5" opacity=".7" />
                <rect className="fox-cursor" x="26.5" y="39.5" width=".5" height="1.2" fill="#60a5fa" rx=".1" />
                {/* Hinge */}
                <rect x="18" y="43.2" width="16" height=".6" rx=".2" fill="#2a2a36" />
                {/* Keyboard */}
                <rect x="16.5" y="43.8" width="19" height="1.8" rx=".6" fill="#3a3a44" stroke="#2a2a34" strokeWidth=".2" />
                {/* Key row */}
                {[0,1,2,3,4,5,6].map(i => (
                  <rect key={i} x={17.8+i*2.3} y="44.2" width="1.6" height=".8" rx=".2" fill="#4a4a54" />
                ))}
              </g>
            )}

            {/* ── Coffee: mug + steam ── */}
            {mood === 'coffee' && (
              <g>
                {/* Mug body */}
                <path d="M1.5 25.5L1.5 30.5Q1.5 31.5,2.5 31.5L7.5 31.5Q8.5 31.5,8.5 30.5L8.5 25.5Z" fill="url(#mug-g)" />
                {/* Mug rim */}
                <ellipse cx="5" cy="25.5" rx="3.5" ry="1" fill="#9b7050" stroke="#7c5535" strokeWidth=".3" />
                {/* Coffee surface */}
                <ellipse cx="5" cy="25.8" rx="2.8" ry=".7" fill="#3a1e0a" />
                {/* Coffee highlight */}
                <ellipse cx="4.2" cy="25.6" rx="1" ry=".3" fill="#5a3018" opacity=".6" />
                {/* Handle */}
                <path d="M8.5 26.8C10.5 26.8,10.8 29,9.5 29.8C8.8 30.2,8.5 29.8,8.5 29.3" stroke="#7c5535" strokeWidth=".9" fill="none" strokeLinecap="round" />
                {/* Mug highlight stripe */}
                <line x1="2.8" y1="26.5" x2="2.8" y2="30.5" stroke="white" strokeWidth=".3" opacity=".1" strokeLinecap="round" />
                {/* Steam */}
                <path className="fox-steam-1" d="M3.5 24.5Q3 22,3.8 19.5" stroke="rgba(170,170,170,.3)" strokeWidth=".5" fill="none" strokeLinecap="round" />
                <path className="fox-steam-2" d="M5 24.5Q5.5 22,4.8 19.5" stroke="rgba(170,170,170,.25)" strokeWidth=".45" fill="none" strokeLinecap="round" />
                <path className="fox-steam-3" d="M6.5 24.8Q6 22.5,6.5 20" stroke="rgba(170,170,170,.2)" strokeWidth=".4" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* ── Gym: dumbbell + sweat ── */}
            {mood === 'gym' && (
              <g>
                <g className="fox-dumbbell">
                  {/* Left plate */}
                  <rect x=".5" y="13.5" width="3" height="6" rx=".7" fill="url(#db-g)" stroke="#444" strokeWidth=".3" />
                  <rect x="1" y="14.2" width="2" height="4.6" rx=".4" fill="#6a6a6a" />
                  {/* Bar */}
                  <rect x="3.5" y="15.5" width="8" height="2" rx=".4" fill="#aaa" />
                  {/* Grip lines */}
                  {[0,1,2,3,4].map(i => (
                    <line key={i} x1={5+i*1.3} y1="15.8" x2={5+i*1.3} y2="17.2" stroke="#888" strokeWidth=".25" />
                  ))}
                  {/* Right plate */}
                  <rect x="11.5" y="13.5" width="3" height="6" rx=".7" fill="url(#db-g)" stroke="#444" strokeWidth=".3" />
                  <rect x="12" y="14.2" width="2" height="4.6" rx=".4" fill="#6a6a6a" />
                </g>
                {/* Sweat drops */}
                <circle className="fox-sweat-1" cx="28" cy="14" r="1.1" fill="#60a5fa" opacity=".3" />
                <circle className="fox-sweat-2" cx="30" cy="12" r=".8" fill="#60a5fa" opacity=".25" />
                {/* Effort lines */}
                <line x1="29" y1="10" x2="30" y2="8" stroke="#d97706" strokeWidth=".4" opacity=".2" strokeLinecap="round" />
                <line x1="31" y1="11" x2="32.5" y2="9.5" stroke="#d97706" strokeWidth=".3" opacity=".15" strokeLinecap="round" />
              </g>
            )}

            {/* ── Eating: fish + hearts ── */}
            {mood === 'eating' && (
              <>
                <g className="fox-fish">
                  {/* Fish body */}
                  <ellipse cx="5" cy="26" rx="4" ry="2" fill="#7eb8d8" />
                  {/* Belly */}
                  <ellipse cx="5.5" cy="26.8" rx="2.5" ry=".8" fill="#a8d8ea" opacity=".5" />
                  {/* Tail fin */}
                  <path d="M1 26L-1.5 24L-.8 26L-1.5 28Z" fill="#6aa8c8" />
                  {/* Dorsal fin */}
                  <path d="M5 24L6.5 22.5L8 24" fill="#6aa8c8" opacity=".8" />
                  {/* Eye */}
                  <circle cx="7.5" cy="25.3" r=".8" fill="white" opacity=".9" />
                  <circle cx="7.8" cy="25.3" r=".45" fill="#1a3050" />
                  {/* Scales hint */}
                  <path d="M3.5 25.5Q4.5 25,3.5 26.5" stroke="#5a9ab8" strokeWidth=".25" fill="none" opacity=".4" />
                  <path d="M5.5 25.3Q6.5 24.8,5.5 26.3" stroke="#5a9ab8" strokeWidth=".25" fill="none" opacity=".3" />
                </g>
                <text className="fox-heart" x="28" y="12" fontSize="5" fill="#e8607a">♥</text>
                <text className="fox-heart-2" x="32" y="8" fontSize="4" fill="#e8607a">♥</text>
              </>
            )}

            {/* ── Gaming: controller ── */}
            {mood === 'gaming' && (
              <g>
                {/* Body */}
                <rect x="15.5" y="37" width="17" height="7.5" rx="3.5" fill="#38383f" stroke="#2a2a30" strokeWidth=".3" />
                {/* Left grip */}
                <path d="M15.5 41Q13.5 42,13.5 44Q13.5 45.5,15.5 45.5L17.5 45.5L17.5 41" fill="#38383f" stroke="#2a2a30" strokeWidth=".3" />
                {/* Right grip */}
                <path d="M32.5 41Q34.5 42,34.5 44Q34.5 45.5,32.5 45.5L30.5 45.5L30.5 41" fill="#38383f" stroke="#2a2a30" strokeWidth=".3" />
                {/* D-pad */}
                <rect x="18" y="39.8" width="3.5" height="1.2" rx=".3" fill="#505058" />
                <rect x="19.2" y="38.8" width="1.2" height="3.2" rx=".3" fill="#505058" />
                {/* Action buttons */}
                <circle className="fox-pad-a" cx="28.5" cy="39.5" r=".85" fill="#ef4444" opacity=".7" />
                <circle className="fox-pad-b" cx="30.5" cy="40.8" r=".85" fill="#3b82f6" opacity=".7" />
                <circle cx="28.5" cy="42" r=".85" fill="#22c55e" opacity=".6" />
                <circle cx="30.5" cy="39.5" r=".85" fill="#eab308" opacity=".6" />
                {/* Left joystick */}
                <circle cx="20" cy="43" r="1.4" fill="#4a4a52" stroke="#3a3a42" strokeWidth=".3" />
                <circle className="fox-joy" cx="20" cy="43" r=".6" fill="#5a5a62" />
                {/* Center line */}
                <rect x="23" y="40.5" width="2" height=".4" rx=".2" fill="#4a4a52" />
              </g>
            )}

            {/* ── Music: floating notes ── */}
            {mood === 'music' && (
              <>
                <text className="fox-note-1" x="33" y="10" fontSize="7" fill="#777">♪</text>
                <text className="fox-note-2" x="37" y="5" fontSize="5.5" fill="#888">♫</text>
              </>
            )}

            {/* ── Sleepy: moon + stars ── */}
            {mood === 'sleepy' && (
              <>
                <circle cx="34" cy="8" r="3.8" fill="#fbbf24" opacity=".2" />
                <circle cx="35.8" cy="6.8" r="3.2" fill="white" />
                <circle cx="28" cy="3.5" r=".6" fill="#fbbf24" opacity=".25" />
                <circle cx="40" cy="4.5" r=".5" fill="#fbbf24" opacity=".2" />
                <circle cx="38" cy="11" r=".35" fill="#fbbf24" opacity=".18" />
                <circle cx="30" cy="7" r=".25" fill="#fbbf24" opacity=".15" />
              </>
            )}

            {/* ── Paws ── */}
            {mood === 'coding' ? (
              <>
                <ellipse className="fox-paw-l" cx="22" cy="44.5" rx="3" ry="1.8" fill="#c06828" />
                <ellipse className="fox-paw-l" cx="22" cy="44.8" rx="1.8" ry="1" fill="#d4883e" />
                <ellipse className="fox-paw-r" cx="30" cy="44.5" rx="3" ry="1.8" fill="#c06828" />
                <ellipse className="fox-paw-r" cx="30" cy="44.8" rx="1.8" ry="1" fill="#d4883e" />
              </>
            ) : mood === 'gaming' ? (
              <>
                <ellipse cx="17" cy="43.5" rx="2.5" ry="1.6" fill="#c06828" />
                <ellipse cx="17" cy="43.8" rx="1.5" ry=".9" fill="#d4883e" />
                <ellipse cx="31" cy="43.5" rx="2.5" ry="1.6" fill="#c06828" />
                <ellipse cx="31" cy="43.8" rx="1.5" ry=".9" fill="#d4883e" />
              </>
            ) : (
              <>
                <ellipse cx="20" cy="41" rx="3.5" ry="2.2" fill="#c06828" />
                <ellipse cx="20" cy="41.5" rx="2.2" ry="1.3" fill="#d4883e" />
                <ellipse cx="32" cy="41" rx="3.5" ry="2.2" fill="#c06828" />
                <ellipse cx="32" cy="41.5" rx="2.2" ry="1.3" fill="#d4883e" />
              </>
            )}

            {/* ── Sleep z's ── */}
            {mood === 'sleeping' && (
              <>
                <text className="fox-z1" x="30" y="10" fontSize="7" fill="#d08040" fontWeight="600" fontStyle="italic">z</text>
                <text className="fox-z2" x="34" y="4" fontSize="5.5" fill="#d08040" fontWeight="600" fontStyle="italic">z</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </>
  );
}
