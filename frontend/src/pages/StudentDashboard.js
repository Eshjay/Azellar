import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  User, 
  Calendar,
  Award,
  Clock,
  ChevronRight,
  PlayCircle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user, userProfile } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load student enrollments
      if (user) {
        const { data: enrollmentData, error: enrollmentError } = await db.getStudentEnrollments(user.id);
        if (!enrollmentError) {
          setEnrollments(enrollmentData || []);
        }
      }
      
      // Load available courses
      const { data: coursesData, error: coursesError } = await db.getCourses();
      if (!coursesError) {
        setCourses(coursesData || []);
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back, {userProfile?.full_name || user?.email}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Your learning journey with Azellar Academy
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Enrolled Courses', 
              value: enrollments.length, 
              icon: BookOpen, 
              color: 'blue',
              description: 'Active enrollments'
            },
            { 
              label: 'Completed', 
              value: enrollments.filter(e => e.status === 'completed').length, 
              icon: CheckCircle, 
              color: 'green',
              description: 'Finished courses'
            },
            { 
              label: 'In Progress', 
              value: enrollments.filter(e => e.status === 'enrolled').length, 
              icon: Clock, 
              color: 'orange',
              description: 'Currently studying'
            },
            { 
              label: 'Available Courses', 
              value: courses.length, 
              icon: Award, 
              color: 'purple',
              description: 'Total available'
            }
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
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
              <Link 
                to="/akademy/courses"
                className="text-azellar-teal hover:text-azellar-navy transition-colors"
              >
                View All
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No courses yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Start your learning journey by enrolling in a course.
                </p>
                <Link 
                  to="/akademy/courses"
                  className="btn-primary"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.slice(0, 3).map((enrollment) => (
                  <div key={enrollment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {enrollment.course?.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Instructor: {enrollment.course?.instructor}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            enrollment.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {enrollment.status}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Available Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Courses</h2>
              <Link 
                to="/akademy/courses"
                className="text-azellar-teal hover:text-azellar-navy transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {course.instructor} • {course.duration}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-azellar-teal">
                          ${course.price}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <Link 
                      to={`/akademy/course/${course.id}`}
                      className="ml-4 btn-outline text-sm px-3 py-1"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/akademy/courses"
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <BookOpen className="w-8 h-8 text-azellar-teal mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Browse Courses</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Explore available courses</p>
            </Link>
            
            <Link 
              to="/academy"
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-8 h-8 text-azellar-teal mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">View Training Info</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Check upcoming sessions</p>
            </Link>
            
            <Link 
              to="/support/inquiry"
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="w-8 h-8 text-azellar-teal mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Get Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Need help? Contact us</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;