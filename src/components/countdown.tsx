"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const COUNTDOWN_FROM = `${new Date().getFullYear() + 1}-01-01`;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

const Countdown = () => {
  return (
    <div className="mx-auto flex w-full items-center gap-4 text-neutral-content">
      <CountdownItem unit="Day" text="days" />
      <CountdownItem unit="Hour" text="hours" />
      <CountdownItem unit="Minute" text="minutes" />
      <CountdownItem unit="Second" text="seconds" />
    </div>
  );
};

const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral p-4 shadow-md">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-5xl font-montserrat tabular-nums font-semibold md:text-7xl lg:text-8xl"
        >
          {time}
        </span>
      </div>
      <span className="text-sm font-poppins font-medium uppercase tracking-wide">
        {text}
      </span>
    </div>

  );
};

export default Countdown;

const useTimer = (unit: Units) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef<string>("000");

  const [time, setTime] = useState<string>("000");

  const calculateInitialTime = useCallback((): string => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

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

    return unit === "Day" ? `${newTime}`.padStart(3, "0") : `${newTime}`.padStart(2, "0");
  }, [unit]);

  const handleCountdown = useCallback(async () => {
    const formattedTime = calculateInitialTime();

    if (formattedTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = formattedTime;
      setTime(formattedTime);

      await animate(
        ref.current,
        { y: ["-50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
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

