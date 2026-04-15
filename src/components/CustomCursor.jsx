'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [visible,   setVisible]   = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const rafRef   = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });

  /* Direct DOM manipulation — avoid React state/re-renders on every mousemove */
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Move dot immediately (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Detect interactive elements
      const path = e.composedPath();
      const ptr  = path.some((el) =>
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ||
        el.getAttribute?.('role') === 'button'
      );
      setIsPointer(ptr);
    };

    const onClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 180);
    };

    // Ring lerps toward mouse via rAF — smooth without springs
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ringPos.current.x = lerp(ringPos.current.x, mx, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, my, 0.14);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed z-[9999] top-0 left-0"
        style={{
          width: 32, height: 32,
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-150 ${
            isPointer
              ? 'border-[#DC143C] scale-150 bg-[#DC143C]/10'
              : isClicked
              ? 'border-white scale-75'
              : 'border-[#DC143C]'
          }`}
        />
      </div>

      {/* Instant dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9998] top-0 left-0 w-2 h-2 rounded-full bg-[#DC143C]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;