// Optimized background images for hero sections
export const heroImages = {
  home: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=80&auto=format',
  about: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1920&h=1080&fit=crop&q=80&auto=format', 
  services: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?w=1920&h=1080&fit=crop&q=80&auto=format',
  support: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=1920&h=1080&fit=crop&q=80&auto=format',
  academy: 'https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=1920&h=1080&fit=crop&q=80&auto=format'
};

// Preload critical hero images
export const preloadHeroImages = () => {
  Object.values(heroImages).forEach(imageUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl;
    document.head.appendChild(link);
  });
};

// Image optimization component with loading states
export const OptimizedHeroSection = ({ 
  imageUrl, 
  children, 
  className = "",
  overlay = "bg-gradient-to-r from-azellar-navy/90 to-azellar-blue/80" 
}) => {
  return (
    <section 
      className={`relative py-32 overflow-hidden ${className}`}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`absolute inset-0 ${overlay}`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};