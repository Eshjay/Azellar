-- Phase 3: Role-Based System and Support Portal Database Schema
-- This extends the existing schema with roles, companies, and ticket system

-- 1. Add role column to profiles table and create companies table
ALTER TABLE profiles ADD COLUMN role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'client', 'admin'));
ALTER TABLE profiles ADD COLUMN company_id UUID REFERENCES companies(id);
ALTER TABLE profiles ADD COLUMN is_active BOOLEAN DEFAULT true;

-- Create companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    max_support_users INTEGER DEFAULT 5,
    current_support_users INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Support Tickets System
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'pending', 'resolved', 'closed')),
    category VARCHAR(50),
    created_by UUID REFERENCES auth.users(id) NOT NULL,
    assigned_to UUID REFERENCES auth.users(id),
    company_id UUID REFERENCES companies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 3. Ticket Replies
CREATE TABLE ticket_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
    reply_text TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. File Attachments
CREATE TABLE ticket_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    reply_id UUID REFERENCES ticket_replies(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(100),
    file_data TEXT NOT NULL, -- Base64 encoded file data
    uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Public Support Inquiries (for non-registered clients)
CREATE TABLE public_support_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'converted', 'dismissed')),
    reviewed_by UUID REFERENCES auth.users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_company_id ON profiles(company_id);
CREATE INDEX idx_companies_is_active ON companies(is_active);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_created_by ON support_tickets(created_by);
CREATE INDEX idx_support_tickets_company_id ON support_tickets(company_id);
CREATE INDEX idx_support_tickets_ticket_number ON support_tickets(ticket_number);
CREATE INDEX idx_ticket_replies_ticket_id ON ticket_replies(ticket_id);
CREATE INDEX idx_ticket_attachments_ticket_id ON ticket_attachments(ticket_id);
CREATE INDEX idx_public_support_inquiries_status ON public_support_inquiries(status);

-- Create sequence for ticket numbers
CREATE SEQUENCE ticket_number_seq START 1000;

-- Function to generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'TKT-' || LPAD(nextval('ticket_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ticket_number IS NULL THEN
        NEW.ticket_number := generate_ticket_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_number
    BEFORE INSERT ON support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION set_ticket_number();

-- Update RLS policies for new tables

-- Companies policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage companies" ON companies FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Users can view their company" ON companies FOR SELECT USING (
    id IN (SELECT company_id FROM profiles WHERE user_id = auth.uid())
);

-- Support tickets policies
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their tickets" ON support_tickets FOR SELECT USING (
    created_by = auth.uid() OR 
    assigned_to = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin') OR
    (company_id IS NOT NULL AND company_id IN (SELECT company_id FROM profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Users can create tickets" ON support_tickets FOR INSERT WITH CHECK (
    created_by = auth.uid()
);
CREATE POLICY "Admins can update tickets" ON support_tickets FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);

-- Ticket replies policies
ALTER TABLE ticket_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view ticket replies" ON ticket_replies FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM support_tickets 
        WHERE support_tickets.id = ticket_replies.ticket_id 
        AND (
            support_tickets.created_by = auth.uid() OR 
            support_tickets.assigned_to = auth.uid() OR
            EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin') OR
            (support_tickets.company_id IS NOT NULL AND support_tickets.company_id IN (SELECT company_id FROM profiles WHERE user_id = auth.uid()))
        )
    )
);
CREATE POLICY "Users can create replies" ON ticket_replies FOR INSERT WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
        SELECT 1 FROM support_tickets 
        WHERE support_tickets.id = ticket_replies.ticket_id 
        AND (
            support_tickets.created_by = auth.uid() OR 
            support_tickets.assigned_to = auth.uid() OR
            EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin') OR
            (support_tickets.company_id IS NOT NULL AND support_tickets.company_id IN (SELECT company_id FROM profiles WHERE user_id = auth.uid()))
        )
    )
);

-- Ticket attachments policies
ALTER TABLE ticket_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view ticket attachments" ON ticket_attachments FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM support_tickets 
        WHERE support_tickets.id = ticket_attachments.ticket_id 
        AND (
            support_tickets.created_by = auth.uid() OR 
            support_tickets.assigned_to = auth.uid() OR
            EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin') OR
            (support_tickets.company_id IS NOT NULL AND support_tickets.company_id IN (SELECT company_id FROM profiles WHERE user_id = auth.uid()))
        )
    )
);
CREATE POLICY "Users can upload attachments" ON ticket_attachments FOR INSERT WITH CHECK (
    uploaded_by = auth.uid()
);

-- Public support inquiries policies
ALTER TABLE public_support_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create public inquiries" ON public_support_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view public inquiries" ON public_support_inquiries FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can update public inquiries" ON public_support_inquiries FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);

-- Create default admin user (update this with actual admin email)
-- INSERT INTO profiles (user_id, email, full_name, role) 
-- VALUES (
--     (SELECT id FROM auth.users WHERE email = 'admin@azellar.com' LIMIT 1),
--     'admin@azellar.com',
--     'Admin User',
--     'admin'
-- ) ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Migrate existing users to student role (they're already students by default)
UPDATE profiles SET role = 'student' WHERE role IS NULL;