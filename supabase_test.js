// Supabase connection and database structure test
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseAnonKey = process.argv[3];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase credentials');
  console.error('Usage: node supabase_test.js <supabaseUrl> <supabaseAnonKey>');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Anon Key:', supabaseAnonKey.substring(0, 10) + '...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test functions
async function testConnection() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Simple query to test connection
    const { data, error } = await supabase.from('courses').select('count()', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection test failed:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log('Connection test successful');
    return true;
  } catch (err) {
    console.error('Connection test failed with exception:', err.message);
    console.error('Exception stack:', err.stack);
    return false;
  }
}

async function verifyTableExists(tableName) {
  try {
    console.log(`Checking if table '${tableName}' exists...`);
    
    // Try to select from the table
    const { data, error } = await supabase.from(tableName).select('count()', { count: 'exact', head: true });
    
    if (error) {
      if (error.code === '42P01') { // Table does not exist
        console.error(`Table '${tableName}' does not exist`);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return false;
      } else {
        console.error(`Error checking table '${tableName}':`, error.message);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return false;
      }
    }
    
    console.log(`Table '${tableName}' exists`);
    return true;
  } catch (err) {
    console.error(`Error checking table '${tableName}':`, err.message);
    console.error('Exception stack:', err.stack);
    return false;
  }
}

async function testCourseData() {
  try {
    console.log('Testing course data retrieval...');
    
    // Get courses
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Course data test failed:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return false;
    }
    
    if (!data || data.length === 0) {
      console.log('No courses found in the database');
      return false;
    }
    
    console.log(`Found ${data.length} courses in the database`);
    console.log('Sample course:', JSON.stringify(data[0], null, 2));
    return true;
  } catch (err) {
    console.error('Course data test failed with exception:', err.message);
    console.error('Exception stack:', err.stack);
    return false;
  }
}

async function testProfileAndEnrollment() {
  try {
    console.log('Testing profile and enrollment tables...');
    
    // Check if profiles table has any data
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (profileError) {
      console.error('Profile test failed:', profileError.message);
      console.error('Error details:', JSON.stringify(profileError, null, 2));
      return false;
    }
    
    if (!profiles || profiles.length === 0) {
      console.log('No profiles found in the database');
      return false;
    }
    
    // Check if enrollments table exists and has proper structure
    const { data: enrollments, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('count()', { count: 'exact', head: true });
    
    if (enrollmentError) {
      console.error('Enrollment test failed:', enrollmentError.message);
      console.error('Error details:', JSON.stringify(enrollmentError, null, 2));
      return false;
    }
    
    console.log('Profile and enrollment tables exist and are accessible');
    return true;
  } catch (err) {
    console.error('Profile and enrollment test failed with exception:', err.message);
    console.error('Exception stack:', err.stack);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('=== Supabase Database Tests ===');
  
  // Test connection
  const connectionResult = await testConnection();
  console.log(`Connection test: ${connectionResult ? 'PASSED' : 'FAILED'}`);
  
  if (!connectionResult) {
    console.error('Cannot continue tests due to connection failure');
    process.exit(1);
  }
  
  // Verify required tables
  const requiredTables = ['courses', 'enrollments', 'profiles', 'contact_submissions'];
  const tableResults = {};
  
  for (const table of requiredTables) {
    tableResults[table] = await verifyTableExists(table);
    console.log(`Table '${table}' verification: ${tableResults[table] ? 'PASSED' : 'FAILED'}`);
  }
  
  // Test course data
  const courseDataResult = await testCourseData();
  console.log(`Course data test: ${courseDataResult ? 'PASSED' : 'FAILED'}`);
  
  // Test profile and enrollment
  const profileEnrollmentResult = await testProfileAndEnrollment();
  console.log(`Profile and enrollment test: ${profileEnrollmentResult ? 'PASSED' : 'FAILED'}`);
  
  // Overall result
  const allPassed = connectionResult && 
                   Object.values(tableResults).every(result => result) && 
                   courseDataResult && 
                   profileEnrollmentResult;
  
  console.log('\n=== TEST SUMMARY ===');
  console.log(`Connection test: ${connectionResult ? 'PASSED' : 'FAILED'}`);
  for (const table of requiredTables) {
    console.log(`Table '${table}' verification: ${tableResults[table] ? 'PASSED' : 'FAILED'}`);
  }
  console.log(`Course data test: ${courseDataResult ? 'PASSED' : 'FAILED'}`);
  console.log(`Profile and enrollment test: ${profileEnrollmentResult ? 'PASSED' : 'FAILED'}`);
  console.log(`\nOVERALL RESULT: ${allPassed ? 'PASSED' : 'FAILED'}`);
  
  // Exit with appropriate code
  process.exit(allPassed ? 0 : 1);
}

// Run the tests
runTests();

// Run the tests
runTests();