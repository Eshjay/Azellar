import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const auth = {
  signUp: async (email, password, options = {}) => {
    return await supabase.auth.signUp({
      email,
      password,
      options
    });
  },

  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};

// Database helper functions
export const db = {
  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Courses
  getCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getCourse: async (courseId) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
    return { data, error };
  },

  // Enrollments
  enrollInCourse: async (studentId, courseId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        {
          student_id: studentId,
          course_id: courseId,
          status: 'enrolled'
        }
      ])
      .select()
      .single();
    return { data, error };
  },

  getStudentEnrollments: async (studentId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('student_id', studentId)
      .order('enrolled_at', { ascending: false });
    return { data, error };
  },

  checkEnrollment: async (studentId, courseId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('student_id', studentId)
      .eq('course_id', courseId)
      .single();
    return { data, error };
  },

  // Contact submissions
  submitContactForm: async (formData) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select()
      .single();
    return { data, error };
  }
};