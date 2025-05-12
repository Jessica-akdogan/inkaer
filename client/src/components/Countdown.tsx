import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (endTime: Date): TimeLeft => {
  const total = endTime.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
};

const Countdown: React.FC = () => {
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'countdown'), (docSnap) => {
      const data = docSnap.data();
      if (data?.endTime?.toDate) {
        setEndTime(data.endTime.toDate());
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft(endTime);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

 
  return (
<div className="flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg">
  <h1 className="text-2xl sm:text-4xl font-bold mb-4">Countdown Timer</h1>
  
  <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 sm:gap-6 text-lg sm:text-2xl font-medium">
    <div className="text-center">
      <span className="block text-3xl sm:text-5xl font-bold">{timeLeft.days}d</span>
      {/* <span>Days</span> */}
    </div>
    <div className="text-center">
      <span className="block text-3xl sm:text-5xl font-bold">{timeLeft.hours}h</span>
      {/* <span>Hours</span> */}
    </div>
    <div className="text-center">
      <span className="block text-3xl sm:text-5xl font-bold">{timeLeft.minutes}m</span>
      {/* <span>Minutes</span> */}
    </div>
    <div className="text-center">
      <span className="block text-3xl sm:text-5xl font-bold">{timeLeft.seconds}s</span>
      {/* <span>Seconds</span> */}
    </div>
  </div>
</div>

  );
};

export default Countdown;
