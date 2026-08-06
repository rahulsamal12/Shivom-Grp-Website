'use client';

import { useEffect, useState } from 'react';

interface Props {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: Props) {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/\d/g, '') || '';
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (end === 0) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
