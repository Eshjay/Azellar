import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

export const FloatingElements = ({ children, className = '' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CountingNumber = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const [props, api] = useSpring(() => ({
    number: 0,
    config: { duration: duration * 1000, tension: 300, friction: 40 }
  }));

  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      api.start({ number: end });
    }
  }, [inView, end, api]);

  return (
    <span ref={ref}>
      <animated.span>
        {props.number.to(n => `${prefix}${Math.floor(n).toLocaleString()}${suffix}`)}
      </animated.span>
    </span>
  );
};

export const TypewriterText = ({ text, speed = 50, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isVisible]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {isVisible && currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

export const PulsingDot = ({ size = 'w-4 h-4', color = 'bg-azellar-teal' }) => {
  return (
    <div className={`relative ${size}`}>
      <div className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75`}></div>
      <div className={`relative ${size} ${color} rounded-full`}></div>
    </div>
  );
};

export const SlideInElements = ({ children, direction = 'left', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return { x: -50, opacity: 0 };
      case 'right': return { x: 50, opacity: 0 };
      case 'up': return { y: -50, opacity: 0 };
      case 'down': return { y: 50, opacity: 0 };
      default: return { x: -50, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialTransform()}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : getInitialTransform()}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export const InteractiveHoverCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative transform transition-all duration-200 ${className}`}
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default {
  FloatingElements,
  CountingNumber,
  TypewriterText,
  PulsingDot,
  SlideInElements,
  InteractiveHoverCard
};