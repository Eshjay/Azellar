-- Simplified Phase 3 Schema - Apply this in Supabase SQL Editor
-- This creates the essential role-based system with minimal dependencies

-- 1. Add role column to existing profiles table
DO $$ 
BEGIN
    -- Add role column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE profiles ADD COLUMN role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'client', 'admin'));
    END IF;
    
    -- Add company_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='company_id') THEN
        ALTER TABLE profiles ADD COLUMN company_id UUID;
    END IF;
    
    -- Add is_active column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_active') THEN
        ALTER TABLE profiles ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- 2. Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    max_support_users INTEGER DEFAULT 5,
    current_support_users INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create public support inquiries table (simple version)
CREATE TABLE IF NOT EXISTS public_support_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'converted', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable RLS on new tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_support_inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Create basic RLS policies
-- Companies policies
DROP POLICY IF EXISTS "Anyone can view companies" ON companies;
CREATE POLICY "Anyone can view companies" ON companies FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Admins can manage companies" ON companies;
CREATE POLICY "Admins can manage companies" ON companies FOR ALL TO public USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);

-- Public inquiries policies  
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public_support_inquiries;
CREATE POLICY "Anyone can create inquiries" ON public_support_inquiries FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view inquiries" ON public_support_inquiries;
CREATE POLICY "Anyone can view inquiries" ON public_support_inquiries FOR SELECT TO public USING (true);

-- 6. Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_companies_is_active ON companies(is_active);
CREATE INDEX IF NOT EXISTS idx_public_support_inquiries_status ON public_support_inquiries(status);

-- 7. Set existing users to student role
UPDATE profiles SET role = 'student' WHERE role IS NULL;

-- 8. Insert sample data
INSERT INTO companies (name, email, phone, address, max_support_users, current_support_users, is_active) 
VALUES (
    'TechCorp Solutions',
    'contact@techcorp.com',
    '+1-555-0123',
    '123 Tech Street, San Francisco, CA 94105',
    5,
    0,
    true
) ON CONFLICT DO NOTHING;

INSERT INTO public_support_inquiries (name, email, company_name, phone, subject, message, priority, status)
VALUES (
    'Sarah Johnson',
    'sarah@newcompany.com',
    'New Company Inc',
    '+1-555-0199',
    'Interested in database consulting services',
    'Hi, we are a growing company and need help optimizing our database performance. Could we schedule a consultation?',
    'medium',
    'pending'
) ON CONFLICT DO NOTHING;