-- Supabase Database Schema for Azellar Academy
-- This file contains the SQL schema to create the required tables

-- 1. Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    duration VARCHAR(100),
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0.00,
    max_students INTEGER DEFAULT 20,
    current_students INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    requirements TEXT, -- Comma-separated prerequisites
    benefits TEXT, -- Comma-separated learning outcomes
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Enrollments Table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'cancelled')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- 4. Contact Submissions Table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    inquiry_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'responded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_courses_is_active ON courses(is_active);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_inquiry_type ON contact_submissions(inquiry_type);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Courses policies (public read access)
CREATE POLICY "Anyone can view active courses" ON courses FOR SELECT USING (is_active = true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can create their own enrollments" ON enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update their own enrollments" ON enrollments FOR UPDATE USING (auth.uid() = student_id);

-- Contact submissions policies
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Insert sample course data
INSERT INTO courses (title, description, instructor, duration, level, category, price, max_students, start_date, requirements, benefits) VALUES
('Database Fundamentals', 'Learn the basics of database design, normalization, and SQL fundamentals.', 'John Smith', '2 days', 'beginner', 'Database', 1200.00, 12, '2024-02-15', 'Basic computer knowledge, Basic understanding of data concepts', 'Understand database fundamentals, Write efficient SQL queries, Design normalized databases, Implement basic optimization'),
('Performance Optimization Masterclass', 'Deep dive into database performance tuning and optimization techniques.', 'Sarah Johnson', '3 days', 'advanced', 'Database', 2500.00, 10, '2024-02-20', 'Strong SQL knowledge, Database administration experience, Understanding of database internals', 'Master query optimization, Implement effective indexing, Analyze performance metrics, Resolve complex issues'),
('Database Security & Compliance', 'Comprehensive security practices and compliance requirements for databases.', 'Mike Davis', '2 days', 'intermediate', 'Security', 1800.00, 12, '2024-02-25', 'Database fundamentals, Basic security concepts, Understanding of compliance requirements', 'Implement security controls, Ensure compliance requirements, Conduct security audits, Manage access permissions'),
('Cloud Database Migration', 'Learn to migrate databases to cloud platforms with zero downtime.', 'Lisa Chen', '4 days', 'advanced', 'Cloud', 3200.00, 8, '2024-03-01', 'Strong database knowledge, Cloud platform familiarity, Migration experience preferred', 'Plan migration strategies, Execute seamless migrations, Validate data integrity, Minimize downtime risks'),
('DevOps for Database Teams', 'Integrate DevOps practices into database development and operations.', 'Robert Wilson', '3 days', 'intermediate', 'DevOps', 2200.00, 12, '2024-03-05', 'Database knowledge, Basic DevOps concepts, CI/CD familiarity', 'Implement database CI/CD, Automate deployments, Set up monitoring systems, Manage database releases'),
('NoSQL Database Design', 'Master NoSQL database design patterns and best practices.', 'Anna Martinez', '2 days', 'intermediate', 'NoSQL', 1600.00, 12, '2024-03-10', 'Database fundamentals, Understanding of data modeling, Basic NoSQL knowledge', 'Choose appropriate NoSQL solutions, Design efficient document models, Implement scaling strategies, Handle consistency challenges');

-- Update course current_students count (optional)
UPDATE courses SET current_students = 0 WHERE current_students IS NULL;