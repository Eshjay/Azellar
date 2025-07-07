import { motion } from 'framer-motion';
import { ChevronRight, Database, Shield, Zap, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsSlider from '../components/TestimonialsSlider';
import ServiceCalculator from '../components/ServiceCalculator';
import DatabaseVisualizationFallback from '../components/DatabaseVisualizationFallback';
import { CountingNumber, FloatingElements } from '../components/AdvancedAnimations';

const Home = () => {
  const services = [
    {
      icon: Database,
      title: 'Database Consulting',
      description: 'Expert guidance for database architecture, optimization, and best practices.',
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      description: 'Maximize your database performance with our advanced optimization techniques.',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Ensure your data meets industry standards with comprehensive security audits.',
    },
    {
      icon: Users,
      title: 'DevOps & Automation',
      description: 'Streamline your development workflow with automated deployment pipelines.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '99.9%', label: 'Uptime Guaranteed' },
    { number: '24/7', label: 'Support Available' },
    { number: '50+', label: 'Enterprise Clients' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-azellar-navy/90 to-azellar-blue/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Scale With
              <span className="block bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">
                Confidence
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Expert database consulting and DevOps solutions for enterprises that demand precision, performance, and reliability.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/contact"
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4 shadow-glow hover:shadow-xl"
              >
                <span>Get Started</span>
                <ChevronRight size={20} />
              </Link>
              <Link
                to="/services"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-azellar-teal/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-32 h-32 bg-azellar-aqua/20 rounded-full blur-xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <CountingNumber 
                    end={parseInt(stat.number.replace(/[^\d]/g, '') || '0')} 
                    suffix={stat.number.replace(/[\d]/g, '')}
                    duration={2}
                  />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive database and DevOps solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="btn-primary text-lg px-8 py-4"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Database Architecture Visualization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingElements>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Interactive <span className="gradient-text">Architecture</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our advanced database architecture solutions with our interactive 3D visualization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <DatabaseVisualizationFallback />
            </motion.div>
          </FloatingElements>
        </div>
      </section>

      {/* Service Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get an <span className="gradient-text">Instant Estimate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to get a customized quote for your database project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ServiceCalculator />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-azellar-navy to-azellar-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Scale Your Database?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join hundreds of enterprises who trust Azellar for their mission-critical database infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4 shadow-glow"
              >
                <span>Start Your Project</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/support"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                View Support Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;