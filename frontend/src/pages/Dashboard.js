import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { db } from '../lib/supabase';
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  Mail, 
  Edit3, 
  LogOut,
  Clock,
  CheckCircle,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, signOut, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    email: ''
  });

  // Redirect if not authenticated
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Load profile
      const { data: profileData, error: profileError } = await db.getProfile(user.id);
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
      } else if (profileData) {
        setProfile(profileData);
        setProfileForm({
          full_name: profileData.full_name || '',
          email: profileData.email || user.email || ''
        });
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          full_name: user.user_metadata?.full_name || '',
          email: user.email
        };
        setProfile(newProfile);
        setProfileForm(newProfile);
      }

      // Load enrollments
      const { data: enrollmentData, error: enrollmentError } = await db.getStudentEnrollments(user.id);
      if (enrollmentError) {
        console.error('Enrollment error:', enrollmentError);
      } else {
        setEnrollments(enrollmentData || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await db.updateProfile(user.id, {
        full_name: profileForm.full_name,
        email: profileForm.email
      });

      if (error) {
        toast.error('Failed to update profile');
        console.error('Update error:', error);
      } else {
        setProfile(data);
        setEditingProfile(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'enrolled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome back, {profile?.full_name || 'Student'}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Track your learning progress and manage your courses
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link
                to="/akademy/courses"
                className="btn-primary inline-flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Courses
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-outline inline-flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="text-azellar-teal hover:text-azellar-navy transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex-1">
                      Save
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingProfile(false)}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {profile?.full_name || 'No name set'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Student</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Mail className="w-5 h-5" />
                    <span>{profile?.email || user?.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span>Joined {formatDate(user?.created_at)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{enrollments.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {enrollments.filter(e => e.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </motion.div>

          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  My Enrolled Courses
                </h2>
                <Link
                  to="/akademy/courses"
                  className="text-azellar-teal hover:text-azellar-navy font-medium transition-colors inline-flex items-center"
                >
                  Browse More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No courses enrolled yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start your learning journey by enrolling in your first course!
                  </p>
                  <Link to="/akademy/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment, index) => (
                    <motion.div
                      key={enrollment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {enrollment.course?.title || 'Course Title'}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                              {enrollment.status}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {enrollment.course?.description || 'Course description'}
                          </p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{enrollment.course?.duration || 'Duration TBD'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{enrollment.course?.instructor || 'Instructor TBD'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Enrolled {formatDate(enrollment.enrolled_at)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          {enrollment.status === 'enrolled' && (
                            <Link
                              to={`/akademy/course/${enrollment.course_id}`}
                              className="btn-outline"
                            >
                              View Course
                            </Link>
                          )}
                          {enrollment.status === 'completed' && (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;