
import React, { useState, useEffect } from 'react';
import { createFollowElement } from '@/utils/animations';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Mouse move event for floating hearts and sparkles
    const handleMouseMove = (e: MouseEvent) => {
      // Only create elements occasionally
      if (Math.random() > 0.9) {
        const type = Math.random() > 0.5 ? 'heart' : 'sparkle';
        createFollowElement(e, type);
      }
    };

    // Touch move event for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (Math.random() > 0.7) {
        const type = Math.random() > 0.5 ? 'heart' : 'sparkle';
        createFollowElement(e, type);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        onComplete();
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`flex items-center justify-center space-x-4 md:space-x-8 ${isComplete ? 'opacity-0 transition-opacity duration-1000' : 'animate-heartbeat'}`}>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-theme-white">{formatNumber(timeLeft.days)}</div>
          <div className="text-xs md:text-sm mt-1 text-theme-white opacity-80">Days</div>
        </div>
        <div className="text-4xl md:text-6xl font-bold text-theme-red">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-theme-white">{formatNumber(timeLeft.hours)}</div>
          <div className="text-xs md:text-sm mt-1 text-theme-white opacity-80">Hours</div>
        </div>
        <div className="text-4xl md:text-6xl font-bold text-theme-red">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-theme-white">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-xs md:text-sm mt-1 text-theme-white opacity-80">Minutes</div>
        </div>
        <div className="text-4xl md:text-6xl font-bold text-theme-red">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-theme-white">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-xs md:text-sm mt-1 text-theme-white opacity-80">Seconds</div>
        </div>
      </div>
      
      <p className="text-theme-white opacity-80 mt-6 text-center max-w-md mx-auto font-serif italic text-sm md:text-base">
        "Some moments are just meant to be celebrated… Some names are meant to be remembered…"
      </p>
    </div>
  );
};

export default CountdownTimer;
