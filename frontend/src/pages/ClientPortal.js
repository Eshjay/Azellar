import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Ticket, 
  BarChart3, 
  Settings, 
  Bell, 
  FileText, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Database,
  Activity
} from 'lucide-react';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Performance Report Available',
      message: 'Your monthly database performance report is ready for download.',
      time: '2 hours ago',
      type: 'info',
      unread: true,
    },
    {
      id: 2,
      title: 'Maintenance Window Scheduled',
      message: 'Scheduled maintenance on Sunday, 2 AM - 4 AM EST.',
      time: '1 day ago',
      type: 'warning',
      unread: true,
    },
    {
      id: 3,
      title: 'Security Scan Completed',
      message: 'Weekly security scan completed successfully. No issues found.',
      time: '3 days ago',
      type: 'success',
      unread: false,
    },
  ]);

  const tickets = [
    {
      id: 'TK-2025-001',
      title: 'Query Performance Issue',
      status: 'open',
      priority: 'high',
      created: '2025-01-15',
      updated: '2025-01-16',
      assignee: 'Michael Kim',
    },
    {
      id: 'TK-2025-002',
      title: 'Backup Configuration Update',
      status: 'in-progress',
      priority: 'medium',
      created: '2025-01-14',
      updated: '2025-01-16',
      assignee: 'Sarah Rodriguez',
    },
    {
      id: 'TK-2025-003',
      title: 'User Access Request',
      status: 'resolved',
      priority: 'low',
      created: '2025-01-12',
      updated: '2025-01-14',
      assignee: 'David Chen',
    },
  ];

  const metrics = [
    { label: 'Database Uptime', value: '99.98%', change: '+0.02%', trend: 'up' },
    { label: 'Avg Query Time', value: '45ms', change: '-12ms', trend: 'up' },
    { label: 'Active Connections', value: '234', change: '+12', trend: 'neutral' },
    { label: 'Storage Used', value: '68%', change: '+2%', trend: 'neutral' },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Performance optimization completed',
      user: 'Michael Kim',
      time: '2 hours ago',
      icon: Database,
      color: 'text-green-600',
    },
    {
      id: 2,
      action: 'Security scan initiated',
      user: 'System',
      time: '6 hours ago',
      icon: Shield,
      color: 'text-blue-600',
    },
    {
      id: 3,
      action: 'Backup completed successfully',
      user: 'System',
      time: '12 hours ago',
      icon: Database,
      color: 'text-green-600',
    },
    {
      id: 4,
      action: 'Support ticket TK-2025-001 updated',
      user: 'Sarah Rodriguez',
      time: '1 day ago',
      icon: Ticket,
      color: 'text-orange-600',
    },
  ];

  const reports = [
    {
      id: 1,
      name: 'Monthly Performance Report - January 2025',
      type: 'PDF',
      size: '2.4 MB',
      date: '2025-01-15',
      status: 'available',
    },
    {
      id: 2,
      name: 'Security Audit Report - Q4 2024',
      type: 'PDF',
      size: '5.1 MB',
      date: '2025-01-01',
      status: 'available',
    },
    {
      id: 3,
      name: 'Database Health Report - December 2024',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-12-31',
      status: 'available',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</h3>
              <Activity className="w-5 h-5 text-azellar-teal" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className={`ml-2 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                metric.trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-azellar-teal hover:bg-azellar-teal/5 dark:hover:bg-azellar-teal/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Ticket className="w-5 h-5 text-azellar-teal" />
                <span className="font-medium text-gray-900 dark:text-white">Create Support Ticket</span>
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-azellar-teal hover:bg-azellar-teal/5 dark:hover:bg-azellar-teal/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-azellar-teal" />
                <span className="font-medium text-gray-900 dark:text-white">Download Latest Report</span>
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-azellar-teal hover:bg-azellar-teal/5 dark:hover:bg-azellar-teal/10 transition-colors">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-azellar-teal" />
                <span className="font-medium text-gray-900 dark:text-white">View Performance Metrics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Tickets</h3>
        <button className="btn-primary">Create New Ticket</button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-azellar-teal">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {ticket.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(ticket.updated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reports & Documents</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-azellar-teal/10 dark:bg-azellar-teal/20 rounded-lg">
                  <FileText className="w-6 h-6 text-azellar-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{report.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {report.type} • {report.size} • {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="btn-outline flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your projects, tickets, and reports</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'tickets', name: 'Support Tickets', icon: Ticket },
                { id: 'reports', name: 'Reports', icon: FileText },
                { id: 'settings', name: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-azellar-teal text-azellar-teal'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'tickets' && renderTickets()}
            {activeTab === 'reports' && renderReports()}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Account settings and preferences coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;