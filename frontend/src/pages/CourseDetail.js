import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate, Link } from 'react-router-dom';
import { db } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Calendar,
  DollarSign,
  GraduationCap,
  CheckCircle,
  Star,
  Award,
  BookOpen,
  Target,
  Shield,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState(null);

  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [id]);

  useEffect(() => {
    if (course && user && isAuthenticated) {
      checkEnrollmentStatus();
    }
  }, [course, user, isAuthenticated]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const { data, error } = await db.getCourse(id);
      
      if (error) {
        console.error('Error loading course:', error);
        toast.error('Course not found');
      } else {
        setCourse(data);
      }
    } catch (error) {
      console.error('Error loading course:', error);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const { data, error } = await db.checkEnrollment(user.id, id);
      if (data && !error) {
        setIsEnrolled(true);
        setEnrollment(data);
      }
    } catch (error) {
      // Enrollment doesn't exist, which is fine
      console.log('No enrollment found');
    }
  };

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to enroll in courses');
      return;
    }

    setEnrolling(true);
    try {
      const { data, error } = await db.enrollInCourse(user.id, id);
      
      if (error) {
        if (error.code === '23505') {
          toast.error('You are already enrolled in this course');
        } else {
          toast.error('Failed to enroll in course');
        }
        console.error('Enrollment error:', error);
      } else {
        setIsEnrolled(true);
        setEnrollment(data);
        toast.success('Successfully enrolled! Welcome to the course.');
        
        // Send enrollment confirmation email
        await sendEnrollmentEmail(data);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const sendEnrollmentEmail = async (enrollmentData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-enrollment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_name: user.user_metadata?.full_name || user.email,
          student_email: user.email,
          course_name: course.title,
          course_details: {
            duration: course.duration,
            instructor: course.instructor,
            start_date: course.start_date
          }
        }),
      });

      if (!response.ok) {
        console.error('Failed to send enrollment email');
      }
    } catch (error) {
      console.error('Error sending enrollment email:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const parseListItems = (text) => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-azellar-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/akademy/courses" className="btn-primary">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/akademy/courses"
            className="inline-flex items-center text-azellar-teal hover:text-azellar-navy transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              {/* Course Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {course.title}
                    </h1>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {course.category}
                      </span>
                      {isEnrolled && (
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          ✓ Enrolled
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Course Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Clock className="w-6 h-6 text-azellar-teal mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{course.duration}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-azellar-teal mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Instructor</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{course.instructor}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Calendar className="w-6 h-6 text-azellar-teal mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(course.start_date)}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Users className="w-6 h-6 text-azellar-teal mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Students</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.current_students || 0}/{course.max_students}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Content Sections */}
              <div className="space-y-8">
                {/* Requirements */}
                {course.requirements && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Shield className="w-6 h-6 text-azellar-teal mr-3" />
                      Prerequisites
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                      <ul className="space-y-2">
                        {parseListItems(course.requirements).map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {course.benefits && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Target className="w-6 h-6 text-azellar-teal mr-3" />
                      What You'll Learn
                    </h3>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                      <ul className="space-y-2">
                        {parseListItems(course.benefits).map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              {/* Enrollment Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8 text-azellar-teal mr-2" />
                    <span className="text-4xl font-bold gradient-text">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">One-time payment</p>
                </div>

                {isAuthenticated ? (
                  isEnrolled ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        You're Enrolled!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Course materials will be available on the start date.
                      </p>
                      <Link to="/dashboard" className="btn-primary w-full">
                        Go to Dashboard
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleEnrollment}
                      disabled={enrolling}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        enrolling
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'btn-primary hover:transform hover:scale-105'
                      }`}
                    >
                      {enrolling ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Enrolling...
                        </div>
                      ) : (
                        <>
                          <BookOpen className="w-5 h-5 mr-2 inline" />
                          Enroll Now
                        </>
                      )}
                    </button>
                  )
                ) : (
                  <div className="space-y-4">
                    <Link to="/auth/signup" className="btn-primary w-full text-center block">
                      Sign Up to Enroll
                    </Link>
                    <Link to="/auth/login" className="btn-outline w-full text-center block">
                      Already have an account?
                    </Link>
                  </div>
                )}

                {/* Course Features */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Expert instruction
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Hands-on exercises
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Course materials
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-azellar-navy to-azellar-blue rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-2">Questions about this course?</h4>
                <p className="text-azellar-aqua text-sm mb-4">
                  Get in touch with our training team for more information.
                </p>
                <Link 
                  to="/contact"
                  className="btn-secondary w-full text-center block"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;