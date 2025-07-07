import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechCorp Solutions',
      content: 'Azellar transformed our database infrastructure completely. Their team identified performance bottlenecks we didn\'t even know existed and improved our query response times by 300%. The migration was seamless with zero downtime.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'Database Performance Optimization',
      results: '300% performance improvement, Zero downtime migration',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Lead Developer',
      company: 'DataFlow Analytics',
      content: 'Working with Azellar was a game-changer for our startup. They designed a scalable database architecture that grew with us from 1K to 1M users. Their expertise in both SQL and NoSQL databases helped us make the right technology choices.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'Scalable Database Architecture',
      results: 'Scaled from 1K to 1M users seamlessly',
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'VP Engineering',
      company: 'CloudTech Industries',
      content: 'The DevOps automation Azellar implemented reduced our deployment time from 4 hours to 15 minutes. Their CI/CD pipelines and monitoring setup gave us confidence to deploy multiple times per day. Absolutely professional service.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'DevOps Automation & CI/CD',
      results: 'Deployment time reduced from 4hrs to 15min',
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Database Administrator',
      company: 'FinanceFlow Corp',
      content: 'Azellar\'s security audit revealed critical vulnerabilities in our financial database. They implemented comprehensive security measures and helped us achieve SOC 2 compliance. Their ongoing support ensures we stay protected.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'Security Audit & Compliance',
      results: 'Achieved SOC 2 compliance, Enhanced security',
    },
    {
      id: 5,
      name: 'Jennifer Wu',
      role: 'CTO',
      company: 'HealthTech Solutions',
      content: 'The training program from Azellar Academy upskilled our entire team. The hands-on workshops on database optimization and DevOps practices were incredibly valuable. Our team productivity increased significantly after the training.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'Team Training & Workshops',
      results: 'Team productivity increased 40%',
    },
    {
      id: 6,
      name: 'Robert Anderson',
      role: 'Senior DevOps Engineer',
      company: 'E-commerce Plus',
      content: 'During Black Friday, our database handled 10x normal traffic without a single hiccup thanks to Azellar\'s optimization work. Their monitoring and alerting system caught and resolved issues before they affected customers.',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      project: 'High-Traffic Optimization',
      results: 'Handled 10x traffic during Black Friday',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322d3ee' fill-opacity='0.4'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by enterprises worldwide for mission-critical database solutions and transformative results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8 italic">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Project & Results */}
                <div className="bg-gradient-to-r from-azellar-teal/10 to-azellar-cyan/10 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Project:</h4>
                      <p className="text-gray-700">{currentTestimonial.project}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <p className="text-azellar-teal font-semibold">{currentTestimonial.results}</p>
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-azellar-teal/20"
                  />
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-900">{currentTestimonial.name}</div>
                    <div className="text-azellar-teal font-semibold">{currentTestimonial.role}</div>
                    <div className="text-gray-600">{currentTestimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-azellar-navy hover:text-azellar-teal z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-azellar-navy hover:text-azellar-teal z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-azellar-teal w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-16 hidden lg:block">
          <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 p-4 rounded-xl transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-azellar-teal text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs opacity-75">{testimonial.company}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;