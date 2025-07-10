const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://aiskcpmikgoprxdbqbhc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs';

// Create Supabase client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

console.log('Creating Test Users for Phase 3...');

async function createTestUsers() {
  console.log('\n=== Creating Test Users ===');
  
  try {
    // 1. Create Admin User
    console.log('Creating admin user...');
    const { data: adminAuthData, error: adminAuthError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@azellar.com',
      password: 'AdminPassword123!',
      user_metadata: {
        full_name: 'System Administrator'
      },
      email_confirm: true // Skip email confirmation
    });
    
    if (adminAuthError && !adminAuthError.message.includes('already registered')) {
      console.log('Admin auth error:', adminAuthError.message);
    } else {
      console.log('✅ Admin auth user created/exists');
      
      // Create admin profile
      if (adminAuthData?.user) {
        const { data: adminProfileData, error: adminProfileError } = await supabaseAdmin
          .from('profiles')
          .upsert([{
            user_id: adminAuthData.user.id,
            email: 'admin@azellar.com',
            full_name: 'System Administrator',
            role: 'admin',
            is_active: true
          }], { onConflict: 'user_id' })
          .select();
        
        if (adminProfileError) {
          console.log('Admin profile error:', adminProfileError.message);
        } else {
          console.log('✅ Admin profile created');
        }
      }
    }
    
    // 2. Create Student User
    console.log('Creating student user...');
    const { data: studentAuthData, error: studentAuthError } = await supabaseAdmin.auth.admin.createUser({
      email: 'student@example.com',
      password: 'StudentPassword123!',
      user_metadata: {
        full_name: 'Jane Doe'
      },
      email_confirm: true
    });
    
    if (studentAuthError && !studentAuthError.message.includes('already registered')) {
      console.log('Student auth error:', studentAuthError.message);
    } else {
      console.log('✅ Student auth user created/exists');
      
      if (studentAuthData?.user) {
        const { data: studentProfileData, error: studentProfileError } = await supabaseAdmin
          .from('profiles')
          .upsert([{
            user_id: studentAuthData.user.id,
            email: 'student@example.com',
            full_name: 'Jane Doe',
            role: 'student',
            is_active: true
          }], { onConflict: 'user_id' })
          .select();
        
        if (studentProfileError) {
          console.log('Student profile error:', studentProfileError.message);
        } else {
          console.log('✅ Student profile created');
        }
      }
    }
    
    // 3. Create Sample Company
    console.log('Creating sample company...');
    const { data: companyData, error: companyError } = await supabaseAdmin
      .from('companies')
      .upsert([{
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        phone: '+1-555-0123',
        address: '123 Tech Street, San Francisco, CA 94105',
        max_support_users: 5,
        current_support_users: 0,
        is_active: true
      }], { onConflict: 'name' })
      .select()
      .single();
    
    if (companyError) {
      console.log('Company creation error:', companyError.message);
    } else {
      console.log('✅ Sample company created');
      
      // 4. Create Client User for the company
      console.log('Creating client user...');
      const { data: clientAuthData, error: clientAuthError } = await supabaseAdmin.auth.admin.createUser({
        email: 'client@techcorp.com',
        password: 'ClientPassword123!',
        user_metadata: {
          full_name: 'John Smith'
        },
        email_confirm: true
      });
      
      if (clientAuthError && !clientAuthError.message.includes('already registered')) {
        console.log('Client auth error:', clientAuthError.message);
      } else {
        console.log('✅ Client auth user created/exists');
        
        if (clientAuthData?.user) {
          const { data: clientProfileData, error: clientProfileError } = await supabaseAdmin
            .from('profiles')
            .upsert([{
              user_id: clientAuthData.user.id,
              email: 'client@techcorp.com',
              full_name: 'John Smith',
              role: 'client',
              company_id: companyData.id,
              is_active: true
            }], { onConflict: 'user_id' })
            .select();
          
          if (clientProfileError) {
            console.log('Client profile error:', clientProfileError.message);
          } else {
            console.log('✅ Client profile created');
          }
        }
      }
    }
    
    // 5. Test public inquiry creation
    console.log('Testing public inquiry creation...');
    const { data: inquiryData, error: inquiryError } = await supabaseAdmin
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
    
    console.log('\n🎉 Test users and data created successfully!');
    
  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

async function testDatabase() {
  console.log('\n=== Testing Database Tables ===');
  
  const tables = ['profiles', 'companies', 'public_support_inquiries'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`);
      } else {
        console.log(`✅ Table '${table}': accessible`);
      }
    } catch (err) {
      console.log(`❌ Table '${table}': ${err.message}`);
    }
  }
  
  // Test the role column specifically
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .limit(1);
    
    if (error) {
      console.log(`❌ Profiles 'role' column: ${error.message}`);
    } else {
      console.log(`✅ Profiles 'role' column: accessible`);
    }
  } catch (err) {
    console.log(`❌ Profiles 'role' column: ${err.message}`);
  }
}

async function displayCredentials() {
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
  console.log('');
  console.log('📝 Public Support Inquiry: /support/inquiry (no login required)');
}

// Run everything
async function main() {
  await testDatabase();
  await createTestUsers();
  await displayCredentials();
}

main().catch(console.error);