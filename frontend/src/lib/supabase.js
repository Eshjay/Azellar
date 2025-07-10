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
      .select('*, company:companies(*)')
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

  // Role and permission helpers
  getUserRole: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, company_id')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  // Companies
  getCompanies: async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true)
      .order('name');
    return { data, error };
  },

  getCompany: async (companyId) => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();
    return { data, error };
  },

  createCompany: async (companyData) => {
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select()
      .single();
    return { data, error };
  },

  updateCompany: async (companyId, updates) => {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', companyId)
      .select()
      .single();
    return { data, error };
  },

  // Support Tickets
  getTickets: async (filters = {}) => {
    let query = supabase
      .from('support_tickets')
      .select(`
        *,
        created_by_profile:profiles!support_tickets_created_by_fkey(full_name, email),
        assigned_to_profile:profiles!support_tickets_assigned_to_fkey(full_name, email),
        company:companies(name)
      `)
      .order('created_at', { ascending: false });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }
    if (filters.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getTicket: async (ticketId) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select(`
        *,
        created_by_profile:profiles!support_tickets_created_by_fkey(full_name, email),
        assigned_to_profile:profiles!support_tickets_assigned_to_fkey(full_name, email),
        company:companies(name),
        replies:ticket_replies(
          *,
          created_by_profile:profiles(full_name, email),
          attachments:ticket_attachments(*)
        ),
        attachments:ticket_attachments(*)
      `)
      .eq('id', ticketId)
      .single();
    return { data, error };
  },

  createTicket: async (ticketData) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert([ticketData])
      .select()
      .single();
    return { data, error };
  },

  updateTicket: async (ticketId, updates) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', ticketId)
      .select()
      .single();
    return { data, error };
  },

  // Ticket Replies
  getTicketReplies: async (ticketId) => {
    const { data, error } = await supabase
      .from('ticket_replies')
      .select(`
        *,
        created_by_profile:profiles(full_name, email),
        attachments:ticket_attachments(*)
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  createTicketReply: async (replyData) => {
    const { data, error } = await supabase
      .from('ticket_replies')
      .insert([replyData])
      .select()
      .single();
    return { data, error };
  },

  // Ticket Attachments
  uploadTicketAttachment: async (attachmentData) => {
    const { data, error } = await supabase
      .from('ticket_attachments')
      .insert([attachmentData])
      .select()
      .single();
    return { data, error };
  },

  // Public Support Inquiries
  createPublicInquiry: async (inquiryData) => {
    const { data, error } = await supabase
      .from('public_support_inquiries')
      .insert([inquiryData])
      .select()
      .single();
    return { data, error };
  },

  getPublicInquiries: async (filters = {}) => {
    let query = supabase
      .from('public_support_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    return { data, error };
  },

  updatePublicInquiry: async (inquiryId, updates) => {
    const { data, error } = await supabase
      .from('public_support_inquiries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', inquiryId)
      .select()
      .single();
    return { data, error };
  },

  // Admin functions for creating client accounts
  createClientAccount: async (userData, companyId) => {
    // First create the auth user, then the profile
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password || 'TempPassword123!', // Temporary password
      user_metadata: {
        full_name: userData.full_name
      }
    });

    if (authError) return { data: null, error: authError };

    // Create profile with client role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: authData.user.id,
        email: userData.email,
        full_name: userData.full_name,
        role: 'client',
        company_id: companyId,
        is_active: true
      }])
      .select()
      .single();

    return { data: profileData, error: profileError };
  },

  // Courses (existing)
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

  // Enrollments (existing)
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

  // Contact submissions (existing)
  submitContactForm: async (formData) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select()
      .single();
    return { data, error };
  }
};