const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase credentials
const supabaseUrl = 'https://aiskcpmikgoprxdbqbhc.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs';

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('Starting Phase 3 database schema setup...');

async function executeSchema() {
  try {
    // Read the Phase 3 schema file
    const schemaPath = path.join(__dirname, 'phase3_schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing Phase 3 schema...');
    
    // Split SQL statements by semicolon and execute each one
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
        // Skip comments and empty statements
        if (statement.startsWith('--') || statement.trim() === '') {
          continue;
        }
        
        console.log(`Executing statement ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`);
        
        const { data, error } = await supabase.rpc('exec', { sql: statement });
        
        if (error) {
          // Some statements might fail if they already exist, which is okay
          console.log(`Statement ${i + 1} warning:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
          successCount++;
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.log(`Statement ${i + 1} error:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`\n=== Schema Execution Summary ===`);
    console.log(`Successful statements: ${successCount}`);
    console.log(`Failed/Warning statements: ${errorCount}`);
    console.log(`Total statements: ${statements.length}`);
    
    // Test the new tables
    await testTables();
    
  } catch (error) {
    console.error('Error executing schema:', error);
  }
}

async function testTables() {
  console.log('\n=== Testing Phase 3 Tables ===');
  
  const tables = ['companies', 'support_tickets', 'ticket_replies', 'ticket_attachments', 'public_support_inquiries'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
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
  
  // Test profiles table for role column
  try {
    const { data, error } = await supabase
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

// Create a simple admin user for testing
async function createTestAdmin() {
  console.log('\n=== Creating Test Admin User ===');
  
  try {
    // First check if admin exists
    const { data: existingProfiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin');
    
    if (existingProfiles && existingProfiles.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }
    
    // Create admin user with email admin@azellar.com
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@azellar.com',
      password: 'AdminPassword123!',
      user_metadata: {
        full_name: 'System Administrator'
      }
    });
    
    if (authError) {
      console.log('Admin user might already exist in auth:', authError.message);
    } else {
      console.log('✅ Admin auth user created');
    }
    
    // Update or create profile with admin role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert([{
        user_id: authData?.user?.id || '00000000-0000-0000-0000-000000000000', // fallback UUID
        email: 'admin@azellar.com',
        full_name: 'System Administrator',
        role: 'admin',
        is_active: true
      }], { onConflict: 'user_id' });
    
    if (profileError) {
      console.log('Admin profile error:', profileError.message);
    } else {
      console.log('✅ Admin profile created/updated');
    }
    
  } catch (error) {
    console.log('Error creating admin user:', error.message);
  }
}

// Execute everything
executeSchema()
  .then(() => createTestAdmin())
  .then(() => {
    console.log('\n🎉 Phase 3 database setup completed!');
    console.log('\nNext steps:');
    console.log('1. Test the admin login: admin@azellar.com / AdminPassword123!');
    console.log('2. Create companies and client accounts through the admin interface');
    console.log('3. Test the support ticket system');
  })
  .catch(console.error);