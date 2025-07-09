#!/usr/bin/env python3
"""
Supabase Database Setup Script
This script creates the required database schema for the Azellar Academy application.
"""

import requests
import json
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase credentials
SUPABASE_URL = "https://aiskcpmikgoprxdbqbhc.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDk0OTAsImV4cCI6MjA2NzYyNTQ5MH0.R0ChAkrcexXwfUoH7aYjZcpbRO8GShPoAQ3aO6KMg-4"

# Note: For creating tables, we need the service role key, not the anon key
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc2tjcG1pa2dvcHJ4ZGJxYmhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA0OTQ5MCwiZXhwIjoyMDY3NjI1NDkwfQ.QRrSka4Xf3B-s6kH-9Y_SyW360AZfJCIgbL7MrbXJYs"

def execute_sql_query(query, use_service_key=False):
    """Execute a SQL query using Supabase REST API"""
    key = SUPABASE_SERVICE_KEY if use_service_key else SUPABASE_ANON_KEY
    
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/rpc/execute_sql",
            json={"query": query},
            headers=headers
        )
        
        logger.info(f"SQL Query Status Code: {response.status_code}")
        logger.info(f"SQL Query Response: {response.text}")
        
        if response.status_code in [200, 201]:
            return True, response.json() if response.text else {}
        else:
            return False, response.text
            
    except Exception as e:
        logger.error(f"Error executing SQL query: {str(e)}")
        return False, str(e)

def create_database_schema():
    """Create the database schema by reading the SQL file"""
    try:
        # Read the SQL schema file
        with open('/app/supabase_schema.sql', 'r') as f:
            sql_content = f.read()
        
        # Split SQL statements (basic splitting by semicolon)
        sql_statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
        
        logger.info(f"Found {len(sql_statements)} SQL statements to execute")
        
        # Execute each statement
        for i, statement in enumerate(sql_statements):
            if statement.strip():
                logger.info(f"Executing statement {i+1}: {statement[:100]}...")
                
                success, result = execute_sql_query(statement, use_service_key=True)
                
                if success:
                    logger.info(f"✅ Statement {i+1} executed successfully")
                else:
                    logger.error(f"❌ Statement {i+1} failed: {result}")
        
        logger.info("Database schema creation completed")
        return True
        
    except Exception as e:
        logger.error(f"Error creating database schema: {str(e)}")
        return False

def test_tables_exist():
    """Test if the required tables exist after schema creation"""
    required_tables = ["profiles", "courses", "enrollments", "contact_submissions"]
    
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Range": "0-0"
    }
    
    results = {}
    
    for table in required_tables:
        try:
            response = requests.get(
                f"{SUPABASE_URL}/rest/v1/{table}",
                headers=headers
            )
            
            if response.status_code in [200, 206]:
                logger.info(f"✅ Table '{table}' exists and is accessible")
                results[table] = True
            else:
                logger.error(f"❌ Table '{table}' is not accessible: {response.status_code}")
                results[table] = False
                
        except Exception as e:
            logger.error(f"❌ Error checking table '{table}': {str(e)}")
            results[table] = False
    
    return results

def test_course_data():
    """Test if course data exists"""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/courses?select=id,title,description,instructor,price&limit=10",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            logger.info(f"✅ Found {len(data)} courses in the database")
            for course in data:
                logger.info(f"  - {course.get('title', 'Unknown')} by {course.get('instructor', 'Unknown')}")
            return True
        else:
            logger.error(f"❌ Failed to retrieve courses: {response.status_code}")
            return False
            
    except Exception as e:
        logger.error(f"❌ Error retrieving course data: {str(e)}")
        return False

def main():
    """Main function to set up the database"""
    logger.info("Starting Supabase database setup...")
    
    # Create database schema
    schema_success = create_database_schema()
    
    if not schema_success:
        logger.error("Failed to create database schema. Exiting.")
        return False
    
    # Test if tables exist
    table_results = test_tables_exist()
    
    # Test course data
    course_data_success = test_course_data()
    
    # Print summary
    logger.info("\n=== SETUP SUMMARY ===")
    logger.info(f"Database schema creation: {'SUCCESS' if schema_success else 'FAILED'}")
    
    for table, result in table_results.items():
        logger.info(f"Table '{table}' verification: {'SUCCESS' if result else 'FAILED'}")
    
    logger.info(f"Course data verification: {'SUCCESS' if course_data_success else 'FAILED'}")
    
    overall_success = schema_success and all(table_results.values()) and course_data_success
    logger.info(f"Overall setup: {'SUCCESS' if overall_success else 'FAILED'}")
    
    return overall_success

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)