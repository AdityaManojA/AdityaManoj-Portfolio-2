import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // How much of the element must be visible (0 to 1)
  delay?: number; // Delay in seconds
  style?: CSSProperties;
}

const ScrollReveal = ({ children, className = "", threshold = 0.1, delay = 0, style }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;