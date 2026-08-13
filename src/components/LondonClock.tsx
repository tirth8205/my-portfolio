import { useEffect, useState } from 'react';

export default function LondonClock() {
  const [time, setTime] = useState('');
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(str);
      const [h, m] = str.split(':').map(Number);
      setHourAngle(((h % 12) + m / 60) * 30);
      setMinuteAngle(m * 6);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-2.5">
      <svg width={24} height={24} viewBox="0 0 24 24" className="text-neutral-500">
        <circle
          cx={12} cy={12} r={10}
          fill="none" stroke="currentColor"
          strokeWidth={0.75} opacity={0.35}
        />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1={12 + 8.5 * Math.sin((a * Math.PI) / 180)}
            y1={12 - 8.5 * Math.cos((a * Math.PI) / 180)}
            x2={12 + 10 * Math.sin((a * Math.PI) / 180)}
            y2={12 - 10 * Math.cos((a * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth={0.75}
            opacity={0.35}
          />
        ))}
        <line
          x1={12} y1={12}
          x2={12 + 5 * Math.sin((hourAngle * Math.PI) / 180)}
          y2={12 - 5 * Math.cos((hourAngle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        />
        <line
          x1={12} y1={12}
          x2={12 + 7 * Math.sin((minuteAngle * Math.PI) / 180)}
          y2={12 - 7 * Math.cos((minuteAngle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth={1} strokeLinecap="round"
        />
        <circle cx={12} cy={12} r={1} fill="currentColor" />
      </svg>
      <span className="font-mono tabular-nums">{time} London</span>
    </div>
  );
}
