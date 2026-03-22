"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAnimate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = `${new Date().getFullYear() + 1}-01-01`;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

export const Countdown = () => {
  return (
    <div className="mx-auto w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
      <CountdownItem unit="Day" label="Days" />
      <CountdownItem unit="Hour" label="Hours" />
      <CountdownItem unit="Minute" label="Minutes" />
      <CountdownItem unit="Second" label="Seconds" />
    </div>
  );
};

const CountdownItem = ({ unit, label }: { unit: Units; label: string }) => {
  const { ref, time } = useTimer(unit);

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-10 md:py-14">
        <span
          ref={ref}
          className="block text-6xl md:text-7xl font-bold tabular-nums leading-none"
        >
          {time}
        </span>
        <span className="text-lg md:text-xl text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  );
};

const useTimer = (unit: Units) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef<string>("00");
  const [time, setTime] = useState<string>("00");

  const calculateInitialTime = useCallback((): string => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    if (distance <= 0) return "00";

    let newTime = 0;
    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    return `${newTime}`.padStart(2, "0");
  }, [unit]);

  const handleCountdown = useCallback(async () => {
    const formattedTime = calculateInitialTime();

    if (formattedTime !== timeRef.current) {
      await animate(
        ref.current,
        { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
        { duration: 0.3 },
      );

      timeRef.current = formattedTime;
      setTime(formattedTime);
    }
  }, [animate, calculateInitialTime, ref]);

  useEffect(() => {
    const initialTime = calculateInitialTime();
    timeRef.current = initialTime;
    setTime(initialTime);

    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current || undefined);
  }, [calculateInitialTime, handleCountdown]);

  return { ref, time };
};
