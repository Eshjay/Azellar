const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://aiskcpmikgoprxdbqbhc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs';

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('Starting Supabase database setup...');

async function createTables() {
  console.log('Creating database tables...');
  
  try {
    // Create profiles table
    const { data: profilesData, error: profilesError } = await supabase.rpc('create_profiles_table');
    if (profilesError) {
      console.log('Profiles table might already exist or RPC not available. Trying direct SQL...');
    } else {
      console.log('✅ Profiles table created successfully');
    }

    // Since RPC might not be available, let's try inserting sample data to test if tables exist
    console.log('Testing table existence by trying to insert sample data...');
    
    // Test courses table by inserting sample courses
    const sampleCourses = [
      {
        title: 'Database Fundamentals',
        description: 'Learn the basics of database design, normalization, and SQL fundamentals.',
        instructor: 'John Smith',
        duration: '2 days',
        level: 'beginner',
        category: 'Database',
        price: 1200.00,
        max_students: 12,
        start_date: '2024-02-15',
        requirements: 'Basic computer knowledge, Basic understanding of data concepts',
        benefits: 'Understand database fundamentals, Write efficient SQL queries, Design normalized databases, Implement basic optimization',
        is_active: true
      },
      {
        title: 'Performance Optimization Masterclass',
        description: 'Deep dive into database performance tuning and optimization techniques.',
        instructor: 'Sarah Johnson',
        duration: '3 days',
        level: 'advanced',
        category: 'Database',
        price: 2500.00,
        max_students: 10,
        start_date: '2024-02-20',
        requirements: 'Strong SQL knowledge, Database administration experience, Understanding of database internals',
        benefits: 'Master query optimization, Implement effective indexing, Analyze performance metrics, Resolve complex issues',
        is_active: true
      },
      {
        title: 'Database Security & Compliance',
        description: 'Comprehensive security practices and compliance requirements for databases.',
        instructor: 'Mike Davis',
        duration: '2 days',
        level: 'intermediate',
        category: 'Security',
        price: 1800.00,
        max_students: 12,
        start_date: '2024-02-25',
        requirements: 'Database fundamentals, Basic security concepts, Understanding of compliance requirements',
        benefits: 'Implement security controls, Ensure compliance requirements, Conduct security audits, Manage access permissions',
        is_active: true
      }
    ];

    // Try to insert courses
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .insert(sampleCourses)
      .select();

    if (coursesError) {
      console.error('❌ Courses table does not exist or insert failed:', coursesError.message);
      console.log('Tables need to be created manually in Supabase dashboard.');
      return false;
    } else {
      console.log('✅ Sample courses inserted successfully');
      console.log(`Inserted ${coursesData.length} courses`);
      return true;
    }

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    return false;
  }
}

async function testTablesExist() {
  console.log('Testing if tables exist...');
  
  const tables = ['profiles', 'courses', 'enrollments', 'contact_submissions'];
  const results = {};
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table '${table}' does not exist or is not accessible: ${error.message}`);
        results[table] = false;
      } else {
        console.log(`✅ Table '${table}' exists and is accessible`);
        results[table] = true;
      }
    } catch (err) {
      console.log(`❌ Error testing table '${table}': ${err.message}`);
      results[table] = false;
    }
  }
  
  return results;
}

async function testCourseData() {
  console.log('Testing course data...');
  
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, instructor, price, level, category')
      .eq('is_active', true)
      .limit(10);
    
    if (error) {
      console.error('❌ Failed to retrieve courses:', error.message);
      return false;
    } else {
      console.log(`✅ Found ${data.length} active courses:`);
      data.forEach(course => {
        console.log(`  - ${course.title} by ${course.instructor} ($${course.price})`);
      });
      return true;
    }
  } catch (err) {
    console.error('❌ Error retrieving course data:', err.message);
    return false;
  }
}

async function main() {
  console.log('=== SUPABASE DATABASE SETUP ===\n');
  
  // Test if tables already exist
  const tableResults = await testTablesExist();
  
  // Check if any tables are missing
  const missingTables = Object.entries(tableResults).filter(([table, exists]) => !exists);
  
  if (missingTables.length > 0) {
    console.log('\n⚠️  Some tables are missing. Attempting to create sample data...');
    const created = await createTables();
    
    if (!created) {
      console.log('\n❌ TABLES NEED TO BE CREATED MANUALLY');
      console.log('Please go to your Supabase dashboard and run the SQL schema:');
      console.log('Dashboard URL: https://supabase.com/dashboard/project/aiskcpmikgoprxdbqbhc/sql/new');
      console.log('SQL file location: /app/supabase_schema.sql');
      return;
    }
  }
  
  // Test course data
  const courseDataExists = await testCourseData();
  
  console.log('\n=== SETUP SUMMARY ===');
  Object.entries(tableResults).forEach(([table, exists]) => {
    console.log(`Table '${table}': ${exists ? 'EXISTS' : 'MISSING'}`);
  });
  console.log(`Course data: ${courseDataExists ? 'AVAILABLE' : 'MISSING'}`);
  
  const allTablesExist = Object.values(tableResults).every(exists => exists);
  
  if (allTablesExist && courseDataExists) {
    console.log('\n🎉 Database setup is complete and ready!');
  } else {
    console.log('\n⚠️  Manual setup required - see instructions above');
  }
}

// Run the setup
main().catch(console.error);