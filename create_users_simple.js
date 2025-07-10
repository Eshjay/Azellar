const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://aiskcpmikgoprxdbqbhc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function createUsersSimple() {
  console.log('Creating users with simple approach...');
  
  try {
    // 1. Create company first
    const { data: companyData, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert([{
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        phone: '+1-555-0123',
        max_support_users: 5,
        current_support_users: 0,
        is_active: true
      }])
      .select()
      .single();
    
    if (companyError) {
      if (companyError.code === '23505') { // Unique constraint violation
        console.log('✅ Company already exists');
        // Get the existing company
        const { data: existingCompany } = await supabaseAdmin
          .from('companies')
          .select('*')
          .eq('name', 'TechCorp Solutions')
          .single();
        var companyId = existingCompany?.id;
      } else {
        console.log('Company error:', companyError.message);
      }
    } else {
      console.log('✅ Company created');
      var companyId = companyData.id;
    }
    
    // 2. Create admin user
    const adminUsers = [
      {
        email: 'admin@azellar.com',
        password: 'AdminPassword123!',
        user_metadata: { full_name: 'System Administrator' }
      }
    ];
    
    for (const userData of adminUsers) {
      try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          ...userData,
          email_confirm: true
        });
        
        if (authError && !authError.message.includes('already registered')) {
          console.log(`Auth error for ${userData.email}:`, authError.message);
          continue;
        }
        
        if (authData?.user) {
          // Insert or update profile
          const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert([{
              user_id: authData.user.id,
              email: userData.email,
              full_name: userData.user_metadata.full_name,
              role: 'admin',
              is_active: true
            }]);
          
          if (profileError && profileError.code !== '23505') {
            console.log(`Profile error for ${userData.email}:`, profileError.message);
          } else {
            console.log(`✅ Admin user created: ${userData.email}`);
          }
        }
      } catch (error) {
        console.log(`Error creating ${userData.email}:`, error.message);
      }
    }
    
    // 3. Create student user
    try {
      const { data: studentAuthData, error: studentAuthError } = await supabaseAdmin.auth.admin.createUser({
        email: 'student@example.com',
        password: 'StudentPassword123!',
        user_metadata: { full_name: 'Jane Doe' },
        email_confirm: true
      });
      
      if (studentAuthError && !studentAuthError.message.includes('already registered')) {
        console.log('Student auth error:', studentAuthError.message);
      } else if (studentAuthData?.user) {
        const { error: studentProfileError } = await supabaseAdmin
          .from('profiles')
          .insert([{
            user_id: studentAuthData.user.id,
            email: 'student@example.com',
            full_name: 'Jane Doe',
            role: 'student',
            is_active: true
          }]);
        
        if (studentProfileError && studentProfileError.code !== '23505') {
          console.log('Student profile error:', studentProfileError.message);
        } else {
          console.log('✅ Student user created: student@example.com');
        }
      }
    } catch (error) {
      console.log('Student creation error:', error.message);
    }
    
    // 4. Create client user if we have a company
    if (companyId) {
      try {
        const { data: clientAuthData, error: clientAuthError } = await supabaseAdmin.auth.admin.createUser({
          email: 'client@techcorp.com',
          password: 'ClientPassword123!',
          user_metadata: { full_name: 'John Smith' },
          email_confirm: true
        });
        
        if (clientAuthError && !clientAuthError.message.includes('already registered')) {
          console.log('Client auth error:', clientAuthError.message);
        } else if (clientAuthData?.user) {
          const { error: clientProfileError } = await supabaseAdmin
            .from('profiles')
            .insert([{
              user_id: clientAuthData.user.id,
              email: 'client@techcorp.com',
              full_name: 'John Smith',
              role: 'client',
              company_id: companyId,
              is_active: true
            }]);
          
          if (clientProfileError && clientProfileError.code !== '23505') {
            console.log('Client profile error:', clientProfileError.message);
          } else {
            console.log('✅ Client user created: client@techcorp.com');
          }
        }
      } catch (error) {
        console.log('Client creation error:', error.message);
      }
    }
    
    console.log('\n🎉 User creation completed!');
    console.log('\n=== TEST CREDENTIALS ===');
    console.log('👨‍💼 Admin: admin@azellar.com / AdminPassword123!');
    console.log('🎓 Student: student@example.com / StudentPassword123!');
    console.log('👩‍💼 Client: client@techcorp.com / ClientPassword123!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createUsersSimple();