// Simple Supabase connection test
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseAnonKey = process.argv[3];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase credentials');
  console.error('Usage: node simple_supabase_test.js <supabaseUrl> <supabaseAnonKey>');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Anon Key:', supabaseAnonKey.substring(0, 10) + '...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection by getting the current user
async function testConnection() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Try to get the current user (should work even if not authenticated)
    const { data, error } = await supabase.auth.getUser();
    
    console.log('Response:', JSON.stringify(data, null, 2));
    
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

// Run the test
testConnection()
  .then(result => {
    console.log(`Connection test: ${result ? 'PASSED' : 'FAILED'}`);
    process.exit(result ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });