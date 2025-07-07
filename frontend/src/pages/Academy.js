import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Award, CheckCircle, Star } from 'lucide-react';

const Academy = () => {
  const workshops = [
    {
      title: 'Database Fundamentals',
      duration: '2 days',
      level: 'Beginner',
      participants: '8-12',
      price: '$1,200',
      description: 'Learn the basics of database design, normalization, and SQL fundamentals.',
      topics: [
        'Database Design Principles',
        'SQL Basics & Advanced Queries',
        'Data Modeling',
        'Index Optimization',
        'Backup & Recovery Basics',
      ],
      outcomes: [
        'Understand database fundamentals',
        'Write efficient SQL queries',
        'Design normalized databases',
        'Implement basic optimization',
      ],
    },
    {
      title: 'Performance Optimization Masterclass',
      duration: '3 days',
      level: 'Advanced',
      participants: '6-10',
      price: '$2,500',
      description: 'Deep dive into database performance tuning and optimization techniques.',
      topics: [
        'Query Optimization Strategies',
        'Index Strategy & Management',
        'Execution Plan Analysis',
        'Performance Monitoring',
        'Troubleshooting Bottlenecks',
      ],
      outcomes: [
        'Master query optimization',
        'Implement effective indexing',
        'Analyze performance metrics',
        'Resolve complex issues',
      ],
    },
    {
      title: 'Database Security & Compliance',
      duration: '2 days',
      level: 'Intermediate',
      participants: '8-12',
      price: '$1,800',
      description: 'Comprehensive security practices and compliance requirements for databases.',
      topics: [
        'Access Control & Authentication',
        'Data Encryption Techniques',
        'Audit & Compliance',
        'Vulnerability Assessment',
        'Security Best Practices',
      ],
      outcomes: [
        'Implement security controls',
        'Ensure compliance requirements',
        'Conduct security audits',
        'Manage access permissions',
      ],
    },
    {
      title: 'Cloud Database Migration',
      duration: '4 days',
      level: 'Advanced',
      participants: '6-8',
      price: '$3,200',
      description: 'Learn to migrate databases to cloud platforms with zero downtime.',
      topics: [
        'Migration Strategy & Planning',
        'Cloud Platform Selection',
        'Data Transfer Methods',
        'Validation & Testing',
        'Rollback Procedures',
      ],
      outcomes: [
        'Plan migration strategies',
        'Execute seamless migrations',
        'Validate data integrity',
        'Minimize downtime risks',
      ],
    },
    {
      title: 'DevOps for Database Teams',
      duration: '3 days',
      level: 'Intermediate',
      participants: '8-12',
      price: '$2,200',
      description: 'Integrate DevOps practices into database development and operations.',
      topics: [
        'CI/CD for Databases',
        'Infrastructure as Code',
        'Automated Testing',
        'Monitoring & Alerting',
        'Release Management',
      ],
      outcomes: [
        'Implement database CI/CD',
        'Automate deployments',
        'Set up monitoring systems',
        'Manage database releases',
      ],
    },
    {
      title: 'NoSQL Database Design',
      duration: '2 days',
      level: 'Intermediate',
      participants: '8-12',
      price: '$1,600',
      description: 'Master NoSQL database design patterns and best practices.',
      topics: [
        'NoSQL Database Types',
        'Document Database Design',
        'Graph Database Modeling',
        'Scaling Strategies',
        'Consistency Models',
      ],
      outcomes: [
        'Choose appropriate NoSQL solutions',
        'Design efficient document models',
        'Implement scaling strategies',
        'Handle consistency challenges',
      ],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with decades of real-world experience.',
    },
    {
      icon: BookOpen,
      title: 'Hands-on Learning',
      description: 'Practical exercises and real-world scenarios to reinforce concepts.',
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Receive industry-recognized certificates upon completion.',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Multiple session times to accommodate your team\'s schedule.',
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Database Administrator, TechCorp',
      content: 'The performance optimization workshop transformed how our team approaches database tuning. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'DevOps Engineer, CloudTech',
      content: 'Excellent training program. The instructors were knowledgeable and the hands-on exercises were incredibly valuable.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer, DataFlow',
      content: 'Best database training I\'ve attended. The real-world examples and case studies made all the difference.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1606588984221-7ab3e2bb038a?w=1920&h=1080&fit=crop')`,
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
              Azellar <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Academy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Elevate your team's database skills with our comprehensive training programs and hands-on workshops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="gradient-text">Azellar Academy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our training programs are designed by industry experts to provide practical, real-world knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Available <span className="gradient-text">Workshops</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive catalog of database and DevOps training programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4">{workshop.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {workshop.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {workshop.participants}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workshop.level}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Topics Covered:</h4>
                  <ul className="space-y-2">
                    {workshop.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-azellar-teal mr-2 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Learning Outcomes:</h4>
                  <ul className="space-y-2">
                    {workshop.outcomes.map((outcome, outcomeIndex) => (
                      <li key={outcomeIndex} className="flex items-center text-sm text-gray-600">
                        <Award className="w-4 h-4 text-azellar-teal mr-2 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-text">{workshop.price}</span>
                  <button className="btn-primary px-6 py-2 text-sm">
                    Book Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who have transformed their careers with our training programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
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
              Ready to Upskill Your Team?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Contact our training team to discuss custom workshops tailored to your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Schedule Consultation
              </a>
              <a
                href="/contact"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                Request Custom Training
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academy;