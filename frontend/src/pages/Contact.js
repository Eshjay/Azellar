import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import AdvancedContactForm from '../components/AdvancedContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@azellar.com',
      subtext: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtext: 'Mon-Fri 9AM-6PM PST',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+1 (555) 123-4567',
      subtext: 'Quick support & questions',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri 9AM-6PM PST',
      subtext: 'Saturday 10AM-2PM PST',
    },
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 456',
      postal: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      primary: true,
    },
    {
      city: 'New York',
      address: '789 Broadway, Floor 12',
      postal: 'New York, NY 10003',
      phone: '+1 (555) 987-6543',
      primary: false,
    },
    {
      city: 'Austin',
      address: '456 South Congress Ave',
      postal: 'Austin, TX 78704',
      phone: '+1 (555) 456-7890',
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-r from-azellar-navy to-azellar-blue">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Contact <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Ready to transform your database infrastructure? Get in touch with our experts today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              We're here to help you succeed. Choose the best way to reach us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-xl flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{info.title}</h3>
                <p className="text-azellar-teal font-semibold mb-1">{info.details}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">{info.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Advanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <AdvancedContactForm />
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have offices across the United States to better serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  office.primary
                    ? 'border-azellar-teal bg-gradient-to-br from-azellar-teal/5 to-azellar-cyan/5'
                    : 'border-gray-200 bg-white hover:border-azellar-teal/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{office.city}</h4>
                      {office.primary && (
                        <span className="bg-azellar-teal text-white px-2 py-1 rounded-full text-xs font-medium">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{office.address}</p>
                    <p className="text-gray-600 mb-2">{office.postal}</p>
                    <p className="text-azellar-teal font-semibold">{office.phone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Response Time Guarantee</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">General Inquiries</span>
                <span className="text-azellar-teal font-semibold">24 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sales Questions</span>
                <span className="text-azellar-teal font-semibold">4 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Support Tickets</span>
                <span className="text-azellar-teal font-semibold">2 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Emergency Support</span>
                <span className="text-azellar-teal font-semibold">15 minutes</span>
              </div>
            </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Let's discuss how we can help you build a robust, scalable database infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="tel:+15551234567"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Call Now
              </a>
              <a
                href="mailto:hello@azellar.com"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;