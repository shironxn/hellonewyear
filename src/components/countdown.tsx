"use client";

import { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const targetDate = new Date(
      `January 1, ${new Date().getFullYear() + 1} 00:00:00`,
    ).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const formatTime = (time: number) => String(time).padStart(2, "0");

      setTimeLeft({
        days: formatTime(Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: formatTime(Math.floor((difference / (1000 * 60)) % 60)),
        seconds: formatTime(Math.floor((difference / 1000) % 60)),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col gap-4 text-center items-center justify-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl md:text-8xl">
          <span style={{ "--value": timeLeft.days } as React.CSSProperties}>
            {timeLeft.days}
          </span>
        </span>
        <span>days</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl md:text-8xl">
          <span style={{ "--value": timeLeft.hours } as React.CSSProperties}>
            {timeLeft.hours}
          </span>
        </span>
        <span>hours</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl md:text-8xl">
          <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}>
            {timeLeft.minutes}
          </span>
        </span>
        <span>min</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl md:text-8xl">
          <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}>
            {timeLeft.seconds}
          </span>
        </span>
        <span>sec</span>
      </div>
    </div>
  );
}
