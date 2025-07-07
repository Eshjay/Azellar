import { motion } from 'framer-motion';
import { Database, Zap, Shield, Cloud, Users, BookOpen, HardDrive, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatabaseVisualization from '../components/DatabaseVisualization';
import ServiceCalculator from '../components/ServiceCalculator';

const Services = () => {
  const services = [
    {
      icon: Database,
      title: 'Database Consulting',
      description: 'Expert guidance on database architecture, design patterns, and best practices for scalable, maintainable systems.',
      features: [
        'Database Architecture Design',
        'Technology Stack Selection',
        'Scalability Planning',
        'Best Practices Implementation',
        'Code Reviews & Audits',
      ],
      pricing: 'Starting at $5,000',
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      description: 'Optimize your database performance with advanced techniques and proven methodologies.',
      features: [
        'Query Optimization',
        'Index Strategy Development',
        'Resource Utilization Analysis',
        'Bottleneck Identification',
        'Performance Monitoring Setup',
      ],
      pricing: 'Starting at $3,000',
    },
    {
      icon: HardDrive,
      title: 'Database Migrations & Upgrades',
      description: 'Seamless database migrations and version upgrades with zero-downtime strategies.',
      features: [
        'Migration Planning & Strategy',
        'Data Integrity Validation',
        'Rollback Procedures',
        'Minimal Downtime Execution',
        'Post-Migration Support',
      ],
      pricing: 'Starting at $7,500',
    },
    {
      icon: Cloud,
      title: 'DevOps & Automation',
      description: 'Streamline your development workflow with CI/CD pipelines and infrastructure automation.',
      features: [
        'CI/CD Pipeline Setup',
        'Infrastructure as Code',
        'Automated Testing',
        'Deployment Automation',
        'Monitoring & Alerting',
      ],
      pricing: 'Starting at $6,000',
    },
    {
      icon: Users,
      title: 'Ongoing Support & Maintenance',
      description: '24/7 support and proactive maintenance to ensure your database systems run smoothly.',
      features: [
        '24/7 Monitoring',
        'Proactive Maintenance',
        'Performance Optimization',
        'Security Updates',
        'Capacity Planning',
      ],
      pricing: 'From $2,500/month',
    },
    {
      icon: BookOpen,
      title: 'Training & Workshops',
      description: 'Comprehensive training programs to upskill your team on database technologies and best practices.',
      features: [
        'Custom Training Programs',
        'Hands-on Workshops',
        'Best Practices Sessions',
        'Team Skill Assessment',
        'Certification Programs',
      ],
      pricing: 'Starting at $2,000',
    },
    {
      icon: HardDrive,
      title: 'Backup & Recovery',
      description: 'Robust backup strategies and disaster recovery planning to protect your critical data.',
      features: [
        'Backup Strategy Design',
        'Disaster Recovery Planning',
        'Recovery Testing',
        'Automated Backup Solutions',
        'Cross-Region Replication',
      ],
      pricing: 'Starting at $4,000',
    },
    {
      icon: Shield,
      title: 'Compliance & Security Audits',
      description: 'Comprehensive security assessments and compliance validation for your database systems.',
      features: [
        'Security Vulnerability Assessment',
        'Compliance Auditing',
        'Access Control Reviews',
        'Data Encryption Implementation',
        'Security Policy Development',
      ],
      pricing: 'Starting at $8,000',
    },
  ];

  const industries = [
    {
      name: 'Financial Services',
      description: 'High-performance, secure database solutions for banking, fintech, and financial institutions.',
      icon: '🏦',
    },
    {
      name: 'Healthcare',
      description: 'HIPAA-compliant database systems for healthcare providers and medical technology companies.',
      icon: '⚕️',
    },
    {
      name: 'E-commerce',
      description: 'Scalable database architectures for online retailers and marketplace platforms.',
      icon: '🛒',
    },
    {
      name: 'Technology',
      description: 'Advanced database solutions for SaaS companies, startups, and tech enterprises.',
      icon: '💻',
    },
    {
      name: 'Manufacturing',
      description: 'Industrial-grade database systems for manufacturing and supply chain management.',
      icon: '🏭',
    },
    {
      name: 'Government',
      description: 'Secure, compliant database solutions for government agencies and public sector organizations.',
      icon: '🏛️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5475811/pexels-photo-5475811.jpeg?w=1920&h=1080&fit=crop')`,
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
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Our <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive database consulting and DevOps solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From database architecture to DevOps automation, we provide end-to-end solutions for your data infrastructure needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-azellar-teal rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-text">{service.pricing}</span>
                  <Link
                    to="/contact"
                    className="btn-secondary px-6 py-2 text-sm"
                  >
                    Get Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have deep expertise across various industries, delivering tailored solutions that meet specific regulatory and business requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Let's discuss your database challenges and create a customized solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Schedule Consultation
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

export default Services;