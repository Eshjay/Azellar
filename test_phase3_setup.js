const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://aiskcpmikgoprxdbqbhc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDk0OTAsImV4cCI6MjA2NzYyNTQ5MH0.R0ChAkrcexXwfUoH7aYjZcpbRO8GShPoAQ3aO6KMg-4';

// Create Supabase clients
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

console.log('Testing Phase 3 Database Schema...');

async function testDatabaseSchema() {
  console.log('\n=== Testing Phase 3 Tables ===');
  
  const tables = ['companies', 'support_tickets', 'ticket_replies', 'ticket_attachments', 'public_support_inquiries'];
  const results = {};
  
  for (const table of tables) {
    try {
      const { data, error } = await supabaseAnon
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`);
        results[table] = false;
      } else {
        console.log(`✅ Table '${table}': accessible`);
        results[table] = true;
      }
    } catch (err) {
      console.log(`❌ Table '${table}': ${err.message}`);
      results[table] = false;
    }
  }
  
  // Test profiles table for role column
  try {
    const { data, error } = await supabaseAnon
      .from('profiles')
      .select('role, company_id, is_active')
      .limit(1);
    
    if (error) {
      console.log(`❌ Profiles role column: ${error.message}`);
      results['profiles_role'] = false;
    } else {
      console.log(`✅ Profiles role column: accessible`);
      results['profiles_role'] = true;
    }
  } catch (err) {
    console.log(`❌ Profiles role column: ${err.message}`);
    results['profiles_role'] = false;
  }
  
  return results;
}

async function createSampleData() {
  console.log('\n=== Creating Sample Data ===');
  
  try {
    // 1. Create a sample company
    const { data: companyData, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert([{
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        phone: '+1-555-0123',
        address: '123 Tech Street, San Francisco, CA 94105',
        max_support_users: 5,
        current_support_users: 0,
        is_active: true
      }])
      .select()
      .single();
    
    if (companyError) {
      console.log('Company creation error:', companyError.message);
    } else {
      console.log('✅ Sample company created:', companyData.name);
    }
    
    // 2. Create admin user if it doesn't exist
    try {
      const { data: existingAdmin } = await supabaseAnon
        .from('profiles')
        .select('*')
        .eq('email', 'admin@azellar.com')
        .single();
      
      if (!existingAdmin) {
        // Create admin user
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: 'admin@azellar.com',
          password: 'AdminPassword123!',
          user_metadata: {
            full_name: 'System Administrator'
          }
        });
        
        if (authError && !authError.message.includes('already registered')) {
          console.log('Admin auth creation warning:', authError.message);
        }
        
        // Create admin profile
        const { data: profileData, error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert([{
            user_id: authData?.user?.id || '00000000-0000-0000-0000-000000000000',
            email: 'admin@azellar.com',
            full_name: 'System Administrator',
            role: 'admin',
            is_active: true
          }])
          .select();
        
        if (profileError) {
          console.log('Admin profile error:', profileError.message);
        } else {
          console.log('✅ Admin user created: admin@azellar.com');
        }
      } else {
        console.log('✅ Admin user already exists');
      }
    } catch (error) {
      console.log('Admin user setup error:', error.message);
    }
    
    // 3. Create a sample client user for the company
    if (companyData) {
      try {
        const { data: clientAuthData, error: clientAuthError } = await supabaseAdmin.auth.admin.createUser({
          email: 'client@techcorp.com',
          password: 'ClientPassword123!',
          user_metadata: {
            full_name: 'John Smith'
          }
        });
        
        if (clientAuthError && !clientAuthError.message.includes('already registered')) {
          console.log('Client auth creation warning:', clientAuthError.message);
        }
        
        // Create client profile
        const { data: clientProfileData, error: clientProfileError } = await supabaseAdmin
          .from('profiles')
          .insert([{
            user_id: clientAuthData?.user?.id || '11111111-1111-1111-1111-111111111111',
            email: 'client@techcorp.com',
            full_name: 'John Smith',
            role: 'client',
            company_id: companyData.id,
            is_active: true
          }])
          .select();
        
        if (clientProfileError) {
          console.log('Client profile error:', clientProfileError.message);
        } else {
          console.log('✅ Sample client user created: client@techcorp.com');
        }
      } catch (error) {
        console.log('Client user setup error:', error.message);
      }
    }
    
    // 4. Create a sample student user
    try {
      const { data: studentAuthData, error: studentAuthError } = await supabaseAdmin.auth.admin.createUser({
        email: 'student@example.com',
        password: 'StudentPassword123!',
        user_metadata: {
          full_name: 'Jane Doe'
        }
      });
      
      if (studentAuthError && !studentAuthError.message.includes('already registered')) {
        console.log('Student auth creation warning:', studentAuthError.message);
      }
      
      // Create student profile
      const { data: studentProfileData, error: studentProfileError } = await supabaseAdmin
        .from('profiles')
        .insert([{
          user_id: studentAuthData?.user?.id || '22222222-2222-2222-2222-222222222222',
          email: 'student@example.com',
          full_name: 'Jane Doe',
          role: 'student',
          is_active: true
        }])
        .select();
      
      if (studentProfileError) {
        console.log('Student profile error:', studentProfileError.message);
      } else {
        console.log('✅ Sample student user created: student@example.com');
      }
    } catch (error) {
      console.log('Student user setup error:', error.message);
    }
    
    // 5. Create a sample public inquiry
    const { data: inquiryData, error: inquiryError } = await supabaseAnon
      .from('public_support_inquiries')
      .insert([{
        name: 'Sarah Johnson',
        email: 'sarah@newcompany.com',
        company_name: 'New Company Inc',
        phone: '+1-555-0199',
        subject: 'Interested in database consulting services',
        message: 'Hi, we are a growing company and need help optimizing our database performance. Could we schedule a consultation?',
        priority: 'medium',
        status: 'pending'
      }])
      .select();
    
    if (inquiryError) {
      console.log('Public inquiry error:', inquiryError.message);
    } else {
      console.log('✅ Sample public inquiry created');
    }
    
    console.log('\n🎉 Sample data creation completed!');
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

async function displayTestCredentials() {
  console.log('\n=== TEST CREDENTIALS ===');
  console.log('👨‍💼 Admin User:');
  console.log('  Email: admin@azellar.com');
  console.log('  Password: AdminPassword123!');
  console.log('  Access: /admin dashboard');
  console.log('');
  console.log('👩‍💼 Client User:');
  console.log('  Email: client@techcorp.com');
  console.log('  Password: ClientPassword123!');
  console.log('  Access: /support portal');
  console.log('');
  console.log('🎓 Student User:');
  console.log('  Email: student@example.com');
  console.log('  Password: StudentPassword123!');
  console.log('  Access: /dashboard and /akademy/courses');
  console.log('');
  console.log('🌐 Frontend URL: https://b91c0085-1ba6-4299-81dc-78e421887aa4.preview.emergentagent.com');
}

// Run the tests
async function main() {
  const testResults = await testDatabaseSchema();
  
  const allTablesWorking = Object.values(testResults).every(result => result === true);
  
  if (allTablesWorking) {
    console.log('\n✅ All Phase 3 tables are working correctly!');
    await createSampleData();
    await displayTestCredentials();
  } else {
    console.log('\n❌ Some tables are missing. Please check the schema application.');
    return;
  }
  
  console.log('\n🚀 Phase 3 Role-Based System is ready for testing!');
}

main().catch(console.error);