#!/usr/bin/env python3
import requests
import json
import sys
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase credentials
SUPABASE_URL = "https://aiskcpmikgoprxdbqbhc.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDk0OTAsImV4cCI6MjA2NzYyNTQ5MH0.R0ChAkrcexXwfUoH7aYjZcpbRO8GShPoAQ3aO6KMg-4"

def test_supabase_connection():
    """Test connection to Supabase database using REST API"""
    logger.info("Testing Supabase connection using REST API...")
    
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        # Try to get the health status
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/",
            headers=headers
        )
        
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        if response.status_code in [200, 204]:
            logger.info("✅ Supabase connection test PASSED")
            return True
        else:
            logger.error(f"❌ Supabase connection test FAILED: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Supabase connection test FAILED: {str(e)}")
        return False

def test_table_exists(table_name):
    """Test if a table exists in Supabase database"""
    logger.info(f"Testing if table '{table_name}' exists...")
    
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Range": "0-0" # Just get the first row to check if table exists
    }
    
    try:
        # Try to get a row from the table
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/{table_name}",
            headers=headers
        )
        
        logger.info(f"Status Code: {response.status_code}")
        
        if response.status_code in [200, 206]:
            logger.info(f"✅ Table '{table_name}' exists")
            return True
        elif response.status_code == 404:
            logger.error(f"❌ Table '{table_name}' does not exist")
            return False
        else:
            logger.error(f"❌ Error checking table '{table_name}': Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Error checking table '{table_name}': {str(e)}")
        return False

def test_course_data():
    """Test if courses exist in Supabase database"""
    logger.info("Testing course data...")
    
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        # Try to get courses
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/courses?select=*&limit=5",
            headers=headers
        )
        
        logger.info(f"Status Code: {response.status_code}")
        
        if response.status_code in [200, 206]:
            data = response.json()
            if data and len(data) > 0:
                logger.info(f"✅ Found {len(data)} courses")
                logger.info(f"Sample course: {json.dumps(data[0], indent=2)}")
                return True
            else:
                logger.error("❌ No courses found in the database")
                return False
        else:
            logger.error(f"❌ Error getting courses: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Error getting courses: {str(e)}")
        return False

def test_profile_and_enrollment():
    """Test if profiles and enrollments exist in Supabase database"""
    logger.info("Testing profiles and enrollments...")
    
    # First check if profiles table exists and has data
    profiles_result = test_table_exists("profiles")
    
    # Then check if enrollments table exists
    enrollments_result = test_table_exists("enrollments")
    
    return profiles_result and enrollments_result

def run_all_tests():
    """Run all Supabase tests"""
    logger.info("Starting Supabase tests...")
    
    # Test connection
    connection_result = test_supabase_connection()
    if not connection_result:
        logger.error("Cannot continue tests due to connection failure")
        return False
    
    # Test required tables
    required_tables = ["courses", "enrollments", "profiles", "contact_submissions"]
    table_results = {}
    
    for table in required_tables:
        table_results[table] = test_table_exists(table)
    
    # Test course data
    course_data_result = test_course_data()
    
    # Test profile and enrollment
    profile_enrollment_result = test_profile_and_enrollment()
    
    # Print summary
    logger.info("\n=== TEST SUMMARY ===")
    logger.info(f"Connection test: {'PASSED' if connection_result else 'FAILED'}")
    
    for table, result in table_results.items():
        logger.info(f"Table '{table}' verification: {'PASSED' if result else 'FAILED'}")
    
    logger.info(f"Course data test: {'PASSED' if course_data_result else 'FAILED'}")
    logger.info(f"Profile and enrollment test: {'PASSED' if profile_enrollment_result else 'FAILED'}")
    
    # Overall result
    all_passed = connection_result and all(table_results.values()) and course_data_result and profile_enrollment_result
    logger.info(f"\nOVERALL RESULT: {'PASSED' if all_passed else 'FAILED'}")
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)