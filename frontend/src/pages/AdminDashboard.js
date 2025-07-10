import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Ticket, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Edit3,
  UserPlus,
  MailOpen,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [publicInquiries, setPublicInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalTickets: 0,
    openTickets: 0,
    pendingInquiries: 0
  });

  // Company creation modal state
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [createClientModal, setCreateClientModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    max_support_users: 5
  });

  const [clientForm, setClientForm] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load companies
      const { data: companiesData } = await db.getCompanies();
      setCompanies(companiesData || []);

      // Load tickets
      const { data: ticketsData } = await db.getTickets();
      setTickets(ticketsData || []);

      // Load public inquiries
      const { data: inquiriesData } = await db.getPublicInquiries();
      setPublicInquiries(inquiriesData || []);

      // Calculate stats
      const totalCompanies = companiesData?.length || 0;
      const totalTickets = ticketsData?.length || 0;
      const openTickets = ticketsData?.filter(t => ['open', 'in_progress'].includes(t.status)).length || 0;
      const pendingInquiries = inquiriesData?.filter(i => i.status === 'pending').length || 0;

      setStats({
        totalCompanies,
        totalTickets,
        openTickets,
        pendingInquiries
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await db.createCompany({
        ...companyForm,
        created_by: userProfile.user_id
      });

      if (error) {
        toast.error('Failed to create company');
        console.error('Company creation error:', error);
      } else {
        toast.success('Company created successfully!');
        setShowCreateCompany(false);
        setCompanyForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          max_support_users: 5
        });
        loadDashboardData();
      }
    } catch (error) {
      console.error('Company creation error:', error);
      toast.error('Failed to create company');
    }
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await db.createClientAccount(clientForm, selectedCompany.id);

      if (error) {
        toast.error('Failed to create client account');
        console.error('Client creation error:', error);
      } else {
        toast.success('Client account created successfully!');
        setCreateClientModal(false);
        setClientForm({ full_name: '', email: '', password: '' });
        setSelectedCompany(null);
        loadDashboardData();
      }
    } catch (error) {
      console.error('Client creation error:', error);
      toast.error('Failed to create client account');
    }
  };

  const handleConvertInquiry = async (inquiry) => {
    // Logic to convert public inquiry to company/client
    toast.info('Convert inquiry feature coming soon');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'companies', name: 'Companies', icon: Building2 },
    { id: 'tickets', name: 'Support Tickets', icon: Ticket },
    { id: 'inquiries', name: 'Public Inquiries', icon: MailOpen }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
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
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Manage companies, support tickets, and user accounts
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Companies', value: stats.totalCompanies, icon: Building2, color: 'blue' },
            { label: 'Total Tickets', value: stats.totalTickets, icon: Ticket, color: 'green' },
            { label: 'Open Tickets', value: stats.openTickets, icon: AlertTriangle, color: 'orange' },
            { label: 'Pending Inquiries', value: stats.pendingInquiries, icon: MailOpen, color: 'red' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowCreateCompany(true)}
                    className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-azellar-teal transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">Create New Company</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Companies</h3>
                  <button
                    onClick={() => setShowCreateCompany(true)}
                    className="btn-primary inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Company
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map((company) => (
                    <div key={company.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {company.name}
                        </h4>
                        <button
                          onClick={() => {
                            setSelectedCompany(company);
                            setCreateClientModal(true);
                          }}
                          className="p-2 text-azellar-teal hover:bg-azellar-teal/10 rounded-lg"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <p>Email: {company.email}</p>
                        <p>Support Users: {company.current_support_users}/{company.max_support_users}</p>
                        <p>Status: {company.is_active ? 'Active' : 'Inactive'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Support Tickets</h3>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {ticket.ticket_number} - {ticket.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {ticket.created_by_profile?.full_name} • {ticket.company?.name}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Public Inquiries</h3>
                <div className="space-y-4">
                  {publicInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {inquiry.subject}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {inquiry.name} ({inquiry.email}) • {inquiry.company_name}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            inquiry.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status}
                          </span>
                          <button
                            onClick={() => handleConvertInquiry(inquiry)}
                            className="btn-primary text-xs px-3 py-1"
                          >
                            Convert
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Company Modal */}
      {showCreateCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Company
            </h3>
            <form onSubmit={handleCreateCompany} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Support Users
                </label>
                <input
                  type="number"
                  value={companyForm.max_support_users}
                  onChange={(e) => setCompanyForm({...companyForm, max_support_users: parseInt(e.target.value)})}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Company
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateCompany(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      {createClientModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create Client Account for {selectedCompany.name}
            </h3>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={clientForm.full_name}
                  onChange={(e) => setClientForm({...clientForm, full_name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temporary Password
                </label>
                <input
                  type="password"
                  value={clientForm.password}
                  onChange={(e) => setClientForm({...clientForm, password: e.target.value})}
                  placeholder="Leave blank for auto-generated password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Client
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreateClientModal(false);
                    setSelectedCompany(null);
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;