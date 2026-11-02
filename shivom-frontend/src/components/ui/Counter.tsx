'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = '', duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && active) {
          // Stop observing once visible
          observer.unobserve(element);
          
          let start = 0;
          const end = value;
          if (start === end) {
            setCount(end);
            return;
          }

          const totalMilliseconds = duration * 1000;
          const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 25);
          
          const timer = setInterval(() => {
            if (!active) {
              clearInterval(timer);
              return;
            }
            start += Math.ceil(end / (totalMilliseconds / incrementTime));
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(start);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
