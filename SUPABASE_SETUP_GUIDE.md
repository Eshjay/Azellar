# 🚀 SUPABASE SETUP GUIDE - Get Your API Keys

## Step 1: Create Supabase Account & Project

### 1.1 Sign Up for Supabase
1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up using:
   - GitHub account (recommended)
   - Or email/password

### 1.2 Create New Project
1. After signing in, click **"New Project"**
2. Choose your organization (or create new one)
3. Fill in project details:
   - **Project Name**: `azellar-academy` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Start with **Free tier** (perfect for development)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project setup to complete

## Step 2: Get Your API Keys

### 2.1 Access Project Settings
1. In your Supabase dashboard, click on your project
2. Go to **Settings** (gear icon in sidebar)
3. Click **"API"** in the settings menu

### 2.2 Copy Your Keys
You'll see this information - **COPY AND SAVE THESE**:

```
Project URL: https://[your-project-id].supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (very long string)
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (different long string)
```

**Important Notes:**
- **Anon Key**: Safe to use in frontend code (public)
- **Service Role Key**: Keep secret! Only use in backend/server code
- **Project URL**: Your database endpoint

## Step 3: Set Up Database Tables

### 3.1 Access SQL Editor
1. In Supabase dashboard, click **"SQL Editor"** in sidebar
2. Click **"New query"**

### 3.2 Create Tables
Copy and paste this SQL code to create all needed tables:

```sql
-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  duration TEXT,
  price DECIMAL(10,2),
  instructor TEXT,
  image_url TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  max_students INTEGER,
  current_students INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('enrolled', 'completed', 'cancelled')) DEFAULT 'enrolled',
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(student_id, course_id)
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT CHECK (inquiry_type IN ('sales', 'training', 'support', 'general')),
  status TEXT CHECK (status IN ('pending', 'processed', 'replied')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Courses policies (public read)
CREATE POLICY "Courses are viewable by everyone" ON public.courses
  FOR SELECT USING (is_active = true);

-- Enrollments policies
CREATE POLICY "Students can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can enroll themselves" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = student_id);

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Click **"Run"** to execute the SQL
4. You should see "Success. No rows returned" message

### 3.3 Add Sample Courses
Run this SQL to add some sample courses:

```sql
INSERT INTO public.courses (title, description, requirements, benefits, duration, price, instructor, level, category, max_students, start_date) VALUES
(
  'Database Fundamentals',
  'Learn the basics of database design, normalization, and SQL fundamentals. Perfect for beginners who want to understand how databases work.',
  'Basic computer knowledge, No prior database experience required',
  'Understand database concepts, Write SQL queries, Design normalized databases, Optimize basic queries',
  '2 days',
  1200.00,
  'Sarah Johnson',
  'beginner',
  'Database',
  12,
  '2025-02-15'
),
(
  'Performance Optimization Masterclass',
  'Deep dive into database performance tuning and optimization techniques. Learn advanced concepts for scaling databases.',
  'Basic SQL knowledge, Understanding of database concepts, 1+ years experience recommended',
  'Master query optimization, Implement effective indexing, Analyze performance metrics, Resolve complex bottlenecks',
  '3 days',
  2500.00,
  'Michael Chen',
  'advanced',
  'Performance',
  8,
  '2025-03-01'
),
(
  'Database Security & Compliance',
  'Comprehensive security practices and compliance requirements for databases. Learn to secure your data infrastructure.',
  'Basic database knowledge, Understanding of network security concepts',
  'Implement security controls, Ensure compliance requirements, Conduct security audits, Manage access permissions',
  '2 days',
  1800.00,
  'David Rodriguez',
  'intermediate',
  'Security',
  10,
  '2025-02-28'
);
```

## Step 4: Configure Authentication

### 4.1 Set Up Authentication Settings
1. Go to **Authentication** in Supabase sidebar
2. Click **"Settings"**
3. Configure:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`
   - Later add your production URLs

### 4.2 Email Templates (Optional)
1. In Authentication settings, click **"Email Templates"**
2. Customize signup confirmation email if needed

## Step 5: Your Environment Variables

After completing the setup, you'll have these values for your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# For email functionality (we'll set up next)
RESEND_API_KEY=re_...
```

## Step 6: Verify Setup

### 6.1 Test Database Connection
1. Go to **Table Editor** in Supabase
2. You should see your tables: `profiles`, `courses`, `enrollments`, `contact_submissions`
3. Click on `courses` - you should see your sample courses

### 6.2 Test Authentication
1. Go to **Authentication** > **Users**
2. This should be empty (no users yet)
3. We'll test user registration when we build the app

## Common Issues & Solutions

### Issue: "Cannot execute SQL"
**Solution**: Make sure you're in the SQL Editor and the query is properly formatted

### Issue: "RLS is enabled but no policies exist"
**Solution**: The policies are created in the SQL above. Make sure you ran the complete script.

### Issue: "API key not working"
**Solution**: 
- Double-check you copied the complete key
- Make sure there are no extra spaces
- Use Anon key for frontend, Service Role for backend only

## Next Steps

Once you have:
✅ Supabase project created
✅ API keys copied
✅ Database tables created
✅ Sample courses added

**Send me your:**
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `SUPABASE_SERVICE_ROLE_KEY`

And I'll start building your complete student enrollment system! 🚀

## Security Notes

- **Never share your Service Role Key publicly**
- **Only use Anon Key in frontend code**
- **Add your production URLs to Supabase settings before deploying**
- **Consider enabling 2FA on your Supabase account**