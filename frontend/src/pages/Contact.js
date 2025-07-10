import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', description: 'General questions about our services' },
    { value: 'sales', label: 'Sales', description: 'Pricing and service information' },
    { value: 'training', label: 'Training', description: 'Academy courses and workshops' },
    { value: 'support', label: 'Support', description: 'Technical support and help' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email domain before submission
      const emailDomain = formData.email.split('@')[1];
      const testDomains = ['example.com', 'test.com', 'sample.com'];
      
      if (testDomains.includes(emailDomain)) {
        toast.error('Please use a valid email address. Test domains like example.com are not allowed.');
        setIsSubmitting(false);
        return;
      }

      // Send email directly through backend API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          inquiry_type: formData.inquiry_type
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Show success
        setSubmitted(true);
        toast.success('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          inquiry_type: 'general'
        });
      } else {
        if (response.status === 500) {
          toast.error('Invalid email domain. Please use a valid business email address.');
        } else {
          toast.error(data.message || 'Failed to submit your message. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
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
      link: 'mailto:hello@azellar.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Database Street, Tech City, TC 12345',
      link: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM EST',
      link: null,
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
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-r from-azellar-navy to-azellar-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Get in <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Ready to transform your database infrastructure? Let's discuss your project and explore how we can help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Send us a <span className="gradient-text">Message</span>
              </h2>
              
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.inquiry_type === type.value
                              ? 'border-azellar-teal bg-azellar-teal/5 dark:bg-azellar-teal/10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-azellar-teal/50 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="inquiry_type"
                            value={type.value}
                            checked={formData.inquiry_type === type.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {type.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {type.description}
                            </div>
                          </div>
                          {formData.inquiry_type === type.value && (
                            <CheckCircle className="w-5 h-5 text-azellar-teal flex-shrink-0" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                      placeholder="Tell us about your project, challenges, or questions..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'btn-primary hover:transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact <span className="gradient-text">Information</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We're here to help! Reach out through any of these channels and we'll respond quickly.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-azellar-teal hover:text-azellar-navy transition-colors"
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.details}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{info.details}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="/akademy/courses"
                    className="block text-azellar-teal hover:text-azellar-navy transition-colors"
                  >
                    → Browse Training Courses
                  </a>
                  <a
                    href="/support"
                    className="block text-azellar-teal hover:text-azellar-navy transition-colors"
                  >
                    → View Support Plans
                  </a>
                  <a
                    href="/services"
                    className="block text-azellar-teal hover:text-azellar-navy transition-colors"
                  >
                    → Our Services
                  </a>
                  <a
                    href="/faq"
                    className="block text-azellar-teal hover:text-azellar-navy transition-colors"
                  >
                    → Frequently Asked Questions
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join hundreds of companies that trust Azellar for their database consulting needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/services"
                className="btn-primary text-lg px-8 py-4"
              >
                Explore Our Services
              </a>
              <a
                href="/akademy/courses"
                className="btn-outline text-lg px-8 py-4"
              >
                Browse Training Courses
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;