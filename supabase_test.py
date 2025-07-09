#!/usr/bin/env python3
import requests
import json
import sys
import time
import logging
import subprocess
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load Supabase credentials from frontend .env file
def load_supabase_credentials():
    """Load Supabase credentials from frontend .env file"""
    try:
        # Try to load from frontend .env file
        frontend_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend', '.env')
        if os.path.exists(frontend_env_path):
            # Parse the .env file manually
            with open(frontend_env_path, 'r') as f:
                env_content = f.read()
                
            # Extract values using simple parsing
            supabase_url = None
            supabase_anon_key = None
            
            for line in env_content.splitlines():
                if line.startswith('REACT_APP_SUPABASE_URL='):
                    supabase_url = line.split('=', 1)[1].strip().strip('"\'')
                elif line.startswith('REACT_APP_SUPABASE_ANON_KEY='):
                    supabase_anon_key = line.split('=', 1)[1].strip().strip('"\'')
        
        if not supabase_url or not supabase_anon_key:
            # Hardcoded values from the review request if parsing fails
            supabase_url = "https://aiskcpmikgoprxdbqbhc.supabase.co"
            supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDk0OTAsImV4cCI6MjA2NzYyNTQ5MH0.R0ChAkrcexXwfUoH7aYjZcpbRO8GShPoAQ3aO6KMg-4"
            
        return supabase_url, supabase_anon_key
    except Exception as e:
        logger.error(f"Error loading Supabase credentials: {str(e)}")
        # Fallback to hardcoded values from the review request
        return "https://aiskcpmikgoprxdbqbhc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDk0OTAsImV4cCI6MjA2NzYyNTQ5MH0.R0ChAkrcexXwfUoH7aYjZcpbRO8GShPoAQ3aO6KMg-4"

def test_supabase_connection():
    """Test connection to Supabase database"""
    logger.info("Testing Supabase database connection...")
    
    # Load Supabase credentials
    supabase_url, supabase_anon_key = load_supabase_credentials()
    if not supabase_url or not supabase_anon_key:
        logger.error("❌ Supabase connection test FAILED: Missing credentials")
        return False
    
    try:
        # Run the Node.js script to test Supabase connection
        logger.info("Running Supabase connection test script...")
        result = subprocess.run(
            ["node", "/app/supabase_test.js", supabase_url, supabase_anon_key],
            capture_output=True,
            text=True,
            check=False
        )
        
        # Log the output
        logger.info(f"Supabase test script output:\n{result.stdout}")
        if result.stderr:
            logger.error(f"Supabase test script errors:\n{result.stderr}")
        
        # Check if the test was successful
        if result.returncode == 0 and "OVERALL RESULT: PASSED" in result.stdout:
            logger.info("✅ Supabase connection test PASSED")
            return True
        else:
            logger.error("❌ Supabase connection test FAILED")
            return False
    except Exception as e:
        logger.error(f"❌ Supabase connection test FAILED: {str(e)}")
        return False

def run_supabase_tests():
    """Run Supabase tests and return overall result"""
    logger.info("Starting Supabase database tests...")
    
    test_results = {
        "supabase_connection": test_supabase_connection()
    }
    
    # Print summary
    logger.info("\n=== TEST SUMMARY ===")
    for test_name, result in test_results.items():
        status = "PASSED" if result else "FAILED"
        logger.info(f"{test_name}: {status}")
    
    # Overall result
    all_passed = all(test_results.values())
    logger.info(f"\nOVERALL RESULT: {'PASSED' if all_passed else 'FAILED'}")
    
    return all_passed

if __name__ == "__main__":
    success = run_supabase_tests()
    sys.exit(0 if success else 1)