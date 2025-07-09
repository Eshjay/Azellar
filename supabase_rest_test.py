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

def list_all_tables():
    """List all tables in Supabase database"""
    logger.info("Listing all tables in Supabase database...")
    
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        # Try to get the list of tables from the information schema
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/rpc/list_tables",
            headers=headers
        )
        
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data:
                logger.info(f"Found tables: {json.dumps(data, indent=2)}")
                return True
            else:
                logger.error("No tables found")
                return False
        else:
            # Try another approach - query the information schema directly
            response = requests.get(
                f"{SUPABASE_URL}/rest/v1/information_schema/tables?select=table_name&limit=100",
                headers=headers
            )
            
            logger.info(f"Information schema query status code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                if data:
                    logger.info(f"Found tables from information schema: {json.dumps(data, indent=2)}")
                    return True
                else:
                    logger.error("No tables found in information schema")
                    return False
            else:
                logger.error(f"Error listing tables: Status code {response.status_code}")
                return False
    except Exception as e:
        logger.error(f"Error listing tables: {str(e)}")
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
    
    # Try different schemas
    schemas = ["public", "auth", "storage"]
    
    for schema in schemas:
        try:
            # Try to get a row from the table
            response = requests.get(
                f"{SUPABASE_URL}/rest/v1/{table_name}?schema={schema}",
                headers=headers
            )
            
            logger.info(f"Status Code for schema '{schema}': {response.status_code}")
            
            if response.status_code in [200, 206]:
                logger.info(f"✅ Table '{table_name}' exists in schema '{schema}'")
                return True
        except Exception as e:
            logger.error(f"❌ Error checking table '{table_name}' in schema '{schema}': {str(e)}")
    
    logger.error(f"❌ Table '{table_name}' does not exist in any schema")
    return False

def run_all_tests():
    """Run all Supabase tests"""
    logger.info("Starting Supabase tests...")
    
    # Test connection
    connection_result = test_supabase_connection()
    if not connection_result:
        logger.error("Cannot continue tests due to connection failure")
        return False
    
    # List all tables
    list_all_tables()
    
    # Test required tables
    required_tables = ["courses", "enrollments", "profiles", "contact_submissions"]
    table_results = {}
    
    for table in required_tables:
        table_results[table] = test_table_exists(table)
    
    # Print summary
    logger.info("\n=== TEST SUMMARY ===")
    logger.info(f"Connection test: {'PASSED' if connection_result else 'FAILED'}")
    
    for table, result in table_results.items():
        logger.info(f"Table '{table}' verification: {'PASSED' if result else 'FAILED'}")
    
    # Overall result
    all_tables_exist = all(table_results.values())
    logger.info(f"\nOVERALL RESULT: {'PASSED' if connection_result else 'FAILED'}")
    
    if not all_tables_exist:
        logger.error("Required tables do not exist in the Supabase database.")
        logger.error("This is likely the cause of the 'Failed to load courses' error.")
        logger.error("The database structure needs to be created before the application can work properly.")
    
    return connection_result

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)