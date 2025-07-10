import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  Paperclip,
  Send,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

const SupportPortal = () => {
  const { userProfile, user } = useAuth();
  const [activeView, setActiveView] = useState('tickets'); // 'tickets', 'create', 'view'
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketReplies, setTicketReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Create ticket form
  const [createTicketForm, setCreateTicketForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (userProfile?.company_id) {
        filters.company_id = userProfile.company_id;
      }

      const { data, error } = await db.getTickets(filters);
      if (error) {
        toast.error('Failed to load tickets');
        console.error('Ticket loading error:', error);
      } else {
        setTickets(data || []);
      }
    } catch (error) {
      console.error('Ticket loading error:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const ticketData = {
        ...createTicketForm,
        created_by: user.id,
        company_id: userProfile?.company_id
      };

      const { data, error } = await db.createTicket(ticketData);
      if (error) {
        toast.error('Failed to create ticket');
        console.error('Ticket creation error:', error);
      } else {
        toast.success('Ticket created successfully!');
        setCreateTicketForm({
          title: '',
          description: '',
          priority: 'medium',
          category: 'general'
        });
        setActiveView('tickets');
        loadTickets();
      }
    } catch (error) {
      console.error('Ticket creation error:', error);
      toast.error('Failed to create ticket');
    }
  };

  const handleViewTicket = async (ticket) => {
    try {
      setSelectedTicket(ticket);
      
      const { data, error } = await db.getTicketReplies(ticket.id);
      if (error) {
        console.error('Error loading replies:', error);
      } else {
        setTicketReplies(data || []);
      }
      
      setActiveView('view');
    } catch (error) {
      console.error('Error viewing ticket:', error);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSendingReply(true);
      
      const replyData = {
        ticket_id: selectedTicket.id,
        reply_text: replyText,
        created_by: user.id,
        is_internal: false
      };

      const { data, error } = await db.createTicketReply(replyData);
      if (error) {
        toast.error('Failed to send reply');
        console.error('Reply error:', error);
      } else {
        setReplyText('');
        // Reload replies
        const { data: repliesData } = await db.getTicketReplies(selectedTicket.id);
        setTicketReplies(repliesData || []);
        toast.success('Reply sent successfully!');
      }
    } catch (error) {
      console.error('Reply error:', error);
      toast.error('Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading support portal...</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Support Portal
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Manage your support tickets and get help from our team
              </p>
            </div>
            {activeView === 'tickets' && (
              <button
                onClick={() => setActiveView('create')}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </button>
            )}
            {activeView !== 'tickets' && (
              <button
                onClick={() => setActiveView('tickets')}
                className="btn-outline inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tickets
              </button>
            )}
          </div>
        </motion.div>

        {/* Tickets List View */}
        {activeView === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Support Tickets
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                  />
                </div>
              </div>
            </div>

            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No support tickets yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Create your first support ticket to get help from our team.
                </p>
                <button
                  onClick={() => setActiveView('create')}
                  className="btn-primary"
                >
                  Create Your First Ticket
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handleViewTicket(ticket)}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {ticket.ticket_number}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {ticket.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Created {new Date(ticket.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(ticket.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Create Ticket View */}
        {activeView === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Create New Support Ticket
            </h2>
            
            <form onSubmit={handleCreateTicket} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={createTicketForm.priority}
                    onChange={(e) => setCreateTicketForm({...createTicketForm, priority: e.target.value})}
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
                    value={createTicketForm.category}
                    onChange={(e) => setCreateTicketForm({...createTicketForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="feature_request">Feature Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={createTicketForm.title}
                  onChange={(e) => setCreateTicketForm({...createTicketForm, title: e.target.value})}
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
                  value={createTicketForm.description}
                  onChange={(e) => setCreateTicketForm({...createTicketForm, description: e.target.value})}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                  placeholder="Please provide as much detail as possible about your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachments (optional)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                />
                {selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selected files: {selectedFiles.map(f => f.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">
                  Create Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('tickets')}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* View Ticket Detail */}
        {activeView === 'view' && selectedTicket && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            {/* Ticket Header */}
            <div className="border-b border-gray-200 dark:border-gray-600 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTicket.ticket_number}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {selectedTicket.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedTicket.description}
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Created {new Date(selectedTicket.created_at).toLocaleString()}
              </div>
            </div>

            {/* Ticket Replies */}
            <div className="space-y-4 mb-6">
              {ticketReplies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {reply.created_by_profile?.full_name || 'Unknown User'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(reply.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {reply.reply_text}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            {['open', 'in_progress', 'pending'].includes(selectedTicket.status) && (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-azellar-teal"
                    placeholder="Type your reply here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sendingReply || !replyText.trim()}
                  className="btn-primary inline-flex items-center"
                >
                  {sendingReply ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupportPortal;