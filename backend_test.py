#!/usr/bin/env python3
import requests
import json
import sys
import time
import logging
import subprocess
import os
import dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://b91c0085-1ba6-4299-81dc-78e421887aa4.preview.emergentagent.com"

# Load Supabase credentials from frontend .env file
def load_supabase_credentials():
    """Load Supabase credentials from frontend .env file"""
    try:
        # Try to load from frontend .env file
        frontend_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend', '.env')
        if os.path.exists(frontend_env_path):
            dotenv.load_dotenv(frontend_env_path)
            
        supabase_url = os.environ.get('REACT_APP_SUPABASE_URL')
        supabase_anon_key = os.environ.get('REACT_APP_SUPABASE_ANON_KEY')
        
        if not supabase_url or not supabase_anon_key:
            # If not found in environment, try to parse the .env file manually
            with open(frontend_env_path, 'r') as f:
                env_content = f.read()
                
            # Extract values using simple parsing
            for line in env_content.splitlines():
                if line.startswith('REACT_APP_SUPABASE_URL='):
                    supabase_url = line.split('=', 1)[1].strip().strip('"\'')
                elif line.startswith('REACT_APP_SUPABASE_ANON_KEY='):
                    supabase_anon_key = line.split('=', 1)[1].strip().strip('"\'')
        
        if not supabase_url or not supabase_anon_key:
            logger.error("Failed to load Supabase credentials from environment or .env file")
            return None, None
            
        return supabase_url, supabase_anon_key
    except Exception as e:
        logger.error(f"Error loading Supabase credentials: {str(e)}")
        return None, None

def test_health_endpoint():
    """Test the health check endpoint"""
    logger.info("Testing health endpoint...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/health")
        
        # Log the response
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        # Verify response
        if response.status_code == 200:
            try:
                data = response.json()
                if "status" in data and data["status"] == "healthy":
                    logger.info("✅ Health endpoint test PASSED")
                    return True
                else:
                    logger.error("❌ Health endpoint test FAILED: Invalid response format")
                    return False
            except json.JSONDecodeError:
                logger.error("❌ Health endpoint test FAILED: Response is not valid JSON")
                return False
        else:
            logger.error(f"❌ Health endpoint test FAILED: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Health endpoint test FAILED: {str(e)}")
        return False

def test_contact_email_endpoint():
    """Test the contact email endpoint"""
    logger.info("Testing contact email endpoint...")
    
    # Test data
    payload = {
        "name": "Test User",
        "email": "delivered@resend.dev",
        "message": "This is a test message",
        "inquiry_type": "general"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/send-contact-email",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Log the response
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        # Verify response
        if response.status_code == 200:
            data = response.json()
            if "status" in data and data["status"] == "success":
                logger.info("✅ Contact email endpoint test PASSED")
                return True
            else:
                logger.error("❌ Contact email endpoint test FAILED: Invalid response format")
                return False
        else:
            logger.error(f"❌ Contact email endpoint test FAILED: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Contact email endpoint test FAILED: {str(e)}")
        return False

def test_enrollment_email_endpoint():
    """Test the enrollment email endpoint"""
    logger.info("Testing enrollment email endpoint...")
    
    # Test data
    payload = {
        "student_name": "John Doe",
        "student_email": "delivered@resend.dev",
        "course_name": "Database Fundamentals",
        "course_details": {
            "duration": "2 days",
            "instructor": "Expert Teacher",
            "start_date": "2024-01-15"
        }
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/send-enrollment-email",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Log the response
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        # Verify response
        if response.status_code == 200:
            data = response.json()
            if "status" in data and data["status"] == "success":
                logger.info("✅ Enrollment email endpoint test PASSED")
                return True
            else:
                logger.error("❌ Enrollment email endpoint test FAILED: Invalid response format")
                return False
        else:
            logger.error(f"❌ Enrollment email endpoint test FAILED: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Enrollment email endpoint test FAILED: {str(e)}")
        return False

def test_cors_configuration():
    """Test CORS configuration by sending an OPTIONS request"""
    logger.info("Testing CORS configuration...")
    
    try:
        # Send OPTIONS request to simulate CORS preflight
        response = requests.options(
            f"{BACKEND_URL}/api/send-contact-email",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        # Log the response headers
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response Headers: {dict(response.headers)}")
        
        # Verify CORS headers
        if response.status_code in [200, 204]:
            cors_headers = [
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Methods",
                "Access-Control-Allow-Headers"
            ]
            
            missing_headers = [header for header in cors_headers if header not in response.headers]
            
            if not missing_headers:
                logger.info("✅ CORS configuration test PASSED")
                return True
            else:
                logger.error(f"❌ CORS configuration test FAILED: Missing headers: {missing_headers}")
                return False
        else:
            logger.error(f"❌ CORS configuration test FAILED: Status code {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ CORS configuration test FAILED: {str(e)}")
        return False

def test_error_handling():
    """Test error handling with invalid data"""
    logger.info("Testing error handling with invalid data...")
    
    # Test with invalid payload (missing required fields)
    payload = {
        "name": "Test User",
        # Missing email field
        "message": "This is a test message"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/send-contact-email",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Log the response
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        # Verify response - should return 422 for validation error
        if response.status_code == 422:
            logger.info("✅ Error handling test PASSED")
            return True
        else:
            logger.error(f"❌ Error handling test FAILED: Expected status code 422, got {response.status_code}")
            return False
    except Exception as e:
        logger.error(f"❌ Error handling test FAILED: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall result"""
    logger.info("Starting backend API tests...")
    
    test_results = {
        "health_endpoint": test_health_endpoint(),
        "contact_email": test_contact_email_endpoint(),
        "enrollment_email": test_enrollment_email_endpoint(),
        "cors_configuration": test_cors_configuration(),
        "error_handling": test_error_handling()
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
    success = run_all_tests()
    sys.exit(0 if success else 1)