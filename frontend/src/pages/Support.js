import { motion } from 'framer-motion';
import { Check, Star, Clock, Users, Shield, Zap, HeadphonesIcon } from 'lucide-react';
import { useState } from 'react';

const Support = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  
  const plans = [
    {
      id: 'standard',
      name: 'Standard',
      price: '$2,500',
      period: '/month',
      description: 'Perfect for small to medium businesses',
      features: [
        'Business hours support (9AM-5PM)',
        'Email support with 24hr response',
        'Basic monitoring & alerts',
        'Monthly health checks',
        'Database backup verification',
        'Access to knowledge base',
        'Standard SLA (99.5% uptime)',
      ],
      recommended: false,
      color: 'from-gray-500 to-gray-600',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$5,000',
      period: '/month',
      description: 'Most popular for growing companies',
      features: [
        'Extended support (7AM-9PM)',
        'Priority email & phone support',
        'Advanced monitoring & alerting',
        'Weekly health checks',
        'Automated backup solutions',
        'Performance optimization',
        'Enhanced SLA (99.9% uptime)',
        'Dedicated account manager',
      ],
      recommended: true,
      color: 'from-azellar-navy to-azellar-teal',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$10,000',
      period: '/month',
      description: 'For mission-critical applications',
      features: [
        '24/7 support & monitoring',
        'Dedicated support team',
        'Real-time monitoring & alerts',
        'Daily health checks',
        'Automated failover systems',
        'Custom optimization plans',
        'Premium SLA (99.99% uptime)',
        'On-site support available',
        'Custom integrations',
      ],
      recommended: false,
      color: 'from-azellar-teal to-azellar-cyan',
    },
  ];

  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    severity: 'medium',
    component: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support ticket submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg?w=1920&h=1080&fit=crop')`,
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
              Support <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Plans</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Choose the perfect support level for your business needs with our comprehensive maintenance and monitoring services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Plans */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your <span className="gradient-text">Support Level</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our support plans ensure your database systems run smoothly with proactive monitoring and expert assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${
                  plan.recommended ? 'border-azellar-teal' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-azellar-navy to-azellar-teal text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-azellar-teal mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.recommended
                      ? 'btn-primary'
                      : 'btn-outline hover:bg-azellar-teal hover:text-white'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Form */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get <span className="gradient-text">Support</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Need immediate help? Submit a support ticket and our team will get back to you promptly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Summary
                </label>
                <input
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Severity
                  </label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Component
                  </label>
                  <select
                    name="component"
                    value={formData.component}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  >
                    <option value="">Select Component</option>
                    <option value="database">Database</option>
                    <option value="performance">Performance</option>
                    <option value="backup">Backup & Recovery</option>
                    <option value="security">Security</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                  placeholder="Please provide detailed information about your issue, including error messages, steps to reproduce, and any relevant context..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Submit Support Ticket
                </button>
              </div>
            </form>
          </motion.div>
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
              Need Help Choosing?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Contact our sales team for a personalized consultation and support plan recommendation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Contact Sales
              </a>
              <a
                href="/faq"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                View FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;