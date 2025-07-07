import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FloatingElements = ({ children, className = '' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
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

export const ParallaxContainer = ({ children, speed = 0.5 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
};

export const MorphingShape = ({ className = '' }) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    gsap.to(shape, {
      morphSVG: {
        shape: "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
      },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      gsap.killTweensOf(shape);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-0">
        <path
          ref={shapeRef}
          d="M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z"
          fill="url(#gradient)"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const CountingNumber = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const [props, api] = useSpring(() => ({
    number: 0,
    config: { duration: duration * 1000 }
  }));

  const inView = useInView(ref);

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

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const GlowingCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(card, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), #22d3ee 0%, transparent 50%)'
        }}
      />
      {children}
    </div>
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
  const inView = useInView(ref);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return { x: -100, opacity: 0 };
      case 'right': return { x: 100, opacity: 0 };
      case 'up': return { y: -100, opacity: 0 };
      case 'down': return { y: 100, opacity: 0 };
      default: return { x: -100, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialTransform()}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : getInitialTransform()}
      transition={{
        duration: 0.8,
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
      className={`relative transform transition-all duration-300 ${className}`}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

export default {
  FloatingElements,
  ParallaxContainer,
  MorphingShape,
  CountingNumber,
  TypewriterText,
  GlowingCard,
  PulsingDot,
  SlideInElements,
  InteractiveHoverCard
};