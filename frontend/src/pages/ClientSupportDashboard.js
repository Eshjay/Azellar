import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  Plus, 
  User,
  Building2,
  Clock,
  CheckCircle,
  Send,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const ClientSupportDashboard = () => {
  const { userProfile, user } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Support request form
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCompanyInfo();
  }, [userProfile]);

  const loadCompanyInfo = async () => {
    try {
      setLoading(true);
      if (userProfile?.company_id) {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', userProfile.company_id)
          .single();
        
        if (!error) {
          setCompany(data);
        }
      }
    } catch (error) {
      console.error('Error loading company info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSupportRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the contact form API for support requests
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userProfile?.full_name || user?.email,
          email: user?.email,
          message: `CLIENT SUPPORT REQUEST\n\nCompany: ${company?.name || 'Unknown'}\nClient: ${userProfile?.full_name}\nCategory: ${supportForm.category}\nPriority: ${supportForm.priority}\nSubject: ${supportForm.subject}\n\nMessage:\n${supportForm.message}`,
          inquiry_type: 'client_support'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Support request submitted successfully!');
        setSupportForm({
          subject: '',
          message: '',
          priority: 'medium',
          category: 'general'
        });
        setActiveTab('overview');
      } else {
        throw new Error(data.message || 'Failed to submit support request');
      }
    } catch (error) {
      console.error('Support request error:', error);
      toast.error('Failed to submit support request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your support dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Support Portal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Welcome, {userProfile?.full_name} from {company?.name || 'Your Company'}
          </p>
        </motion.div>

        {/* Support Plan Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Support Plan</h2>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Building2 className="w-8 h-8 text-azellar-teal mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Company</h3>
              <p className="text-gray-600 dark:text-gray-300">{company?.name || 'Your Company'}</p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <User className="w-8 h-8 text-azellar-teal mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Support Users</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {company?.current_support_users || 1}/{company?.max_support_users || 5} Used
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CheckCircle className="w-8 h-8 text-azellar-teal mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Status</h3>
              <p className="text-green-600 dark:text-green-400 font-medium">Premium Support</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Ticket },
                { id: 'create', name: 'Create Request', icon: Plus }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-azellar-teal text-azellar-teal'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Support Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-azellar-teal" />
                        <span className="text-gray-600 dark:text-gray-300">hello@azellar.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-azellar-teal" />
                        <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-azellar-teal" />
                        <span className="text-gray-600 dark:text-gray-300">Mon-Fri 9AM-6PM EST</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support Features</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Priority Email Support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>24-hour Response Time</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Dedicated Account Manager</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Phone Support Available</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('create')}
                    className="btn-primary"
                  >
                    Create Support Request
                  </button>
                  <a
                    href="mailto:hello@azellar.com"
                    className="btn-outline"
                  >
                    Email Support Directly
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create Support Request</h3>
                
                <form onSubmit={handleSupportRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={supportForm.priority}
                        onChange={(e) => setSupportForm({...supportForm, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={supportForm.category}
                        onChange={(e) => setSupportForm({...supportForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                      >
                        <option value="general">General</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing</option>
                        <option value="feature_request">Feature Request</option>
                        <option value="database">Database Support</option>
                        <option value="performance">Performance Issue</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                      placeholder="Please provide detailed information about your issue..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary inline-flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSupportDashboard;