import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-azellar-teal font-semibold mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="consulting">Database Consulting</option>
                      <option value="support">Support Plans</option>
                      <option value="training">Training Programs</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
                <p className="text-gray-600 mb-8">
                  We have offices across the United States to better serve our clients.
                </p>
              </div>

              <div className="space-y-6">
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

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Response Time</h4>
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
              </div>
            </motion.div>
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