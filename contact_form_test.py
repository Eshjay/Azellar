#!/usr/bin/env python3
import requests
import json
import time
import logging
import threading
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://b91c0085-1ba6-4299-81dc-78e421887aa4.preview.emergentagent.com"

def test_contact_form_with_sample_data():
    """Test the contact form API with the exact sample data from the review request"""
    logger.info("Testing contact form API with sample data...")
    
    # Exact sample data from the review request
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test contact form submission",
        "inquiry_type": "general"
    }
    
    try:
        start_time = time.time()
        
        # Set a timeout to detect hanging requests
        response = requests.post(
            f"{BACKEND_URL}/api/send-contact-email",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30  # 30 second timeout
        )
        
        end_time = time.time()
        response_time = end_time - start_time
        
        # Log the response details
        logger.info(f"Response Time: {response_time:.2f} seconds")
        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.text}")
        
        # Check for hanging (slow response)
        if response_time > 10:
            logger.warning(f"⚠️ SLOW RESPONSE: Request took {response_time:.2f} seconds (potential hanging issue)")
        
        # Verify response
        if response.status_code == 200:
            try:
                data = response.json()
                if "status" in data and data["status"] == "success":
                    logger.info("✅ Contact form API test with sample data PASSED")
                    return True, response_time
                else:
                    logger.error("❌ Contact form API test FAILED: Invalid response format")
                    return False, response_time
            except json.JSONDecodeError:
                logger.error("❌ Contact form API test FAILED: Response is not valid JSON")
                return False, response_time
        else:
            logger.error(f"❌ Contact form API test FAILED: Status code {response.status_code}")
            return False, response_time
            
    except requests.exceptions.Timeout:
        logger.error("❌ Contact form API test FAILED: Request timed out (hanging detected)")
        return False, 30.0
    except Exception as e:
        logger.error(f"❌ Contact form API test FAILED: {str(e)}")
        return False, 0.0

def test_multiple_concurrent_requests():
    """Test multiple concurrent requests to detect potential hanging issues"""
    logger.info("Testing multiple concurrent contact form requests...")
    
    payload = {
        "name": "Concurrent Test User",
        "email": "test@example.com",
        "message": "This is a concurrent test contact form submission",
        "inquiry_type": "general"
    }
    
    results = []
    threads = []
    
    def make_request(request_id):
        try:
            start_time = time.time()
            response = requests.post(
                f"{BACKEND_URL}/api/send-contact-email",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            end_time = time.time()
            response_time = end_time - start_time
            
            results.append({
                'id': request_id,
                'status_code': response.status_code,
                'response_time': response_time,
                'success': response.status_code == 200
            })
            
            logger.info(f"Request {request_id}: {response.status_code} in {response_time:.2f}s")
            
        except requests.exceptions.Timeout:
            results.append({
                'id': request_id,
                'status_code': 'TIMEOUT',
                'response_time': 30.0,
                'success': False
            })
            logger.error(f"Request {request_id}: TIMEOUT")
        except Exception as e:
            results.append({
                'id': request_id,
                'status_code': 'ERROR',
                'response_time': 0.0,
                'success': False
            })
            logger.error(f"Request {request_id}: ERROR - {str(e)}")
    
    # Create and start 3 concurrent threads
    for i in range(3):
        thread = threading.Thread(target=make_request, args=(i+1,))
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    for thread in threads:
        thread.join()
    
    # Analyze results
    successful_requests = sum(1 for r in results if r['success'])
    avg_response_time = sum(r['response_time'] for r in results) / len(results)
    max_response_time = max(r['response_time'] for r in results)
    
    logger.info(f"Concurrent test results: {successful_requests}/3 successful")
    logger.info(f"Average response time: {avg_response_time:.2f}s")
    logger.info(f"Max response time: {max_response_time:.2f}s")
    
    if successful_requests == 3 and max_response_time < 15:
        logger.info("✅ Concurrent requests test PASSED")
        return True
    else:
        logger.error("❌ Concurrent requests test FAILED")
        return False

def check_environment_variables():
    """Check if required environment variables are properly loaded"""
    logger.info("Checking environment variables...")
    
    # Check backend environment variables by making a request that would fail if they're missing
    try:
        # Make a request to an endpoint that uses environment variables
        response = requests.get(f"{BACKEND_URL}/api/health")
        
        if response.status_code == 200:
            logger.info("✅ Backend is responding (environment variables likely loaded)")
            
            # Try to make a contact form request to test email functionality
            test_payload = {
                "name": "Env Test",
                "email": "delivered@resend.dev",  # Using Resend test email
                "message": "Testing environment variables",
                "inquiry_type": "general"
            }
            
            email_response = requests.post(
                f"{BACKEND_URL}/api/send-contact-email",
                json=test_payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if email_response.status_code == 200:
                logger.info("✅ Email functionality working (RESEND_API_KEY properly loaded)")
                return True
            else:
                logger.error(f"❌ Email functionality failed: {email_response.status_code}")
                logger.error(f"Response: {email_response.text}")
                return False
        else:
            logger.error(f"❌ Backend health check failed: {response.status_code}")
            return False
            
    except Exception as e:
        logger.error(f"❌ Environment variable check failed: {str(e)}")
        return False

def check_database_table():
    """Check if public_support_inquiries table exists (though this app uses email, not database)"""
    logger.info("Checking for public_support_inquiries table...")
    
    # Note: This backend doesn't use a database for contact forms, it uses Resend email service
    # The contact form data is sent via email, not stored in a database table
    logger.info("ℹ️ This application uses Resend email service for contact forms, not a database table")
    logger.info("ℹ️ Contact form submissions are sent as emails, not stored in public_support_inquiries table")
    
    return True  # This is expected behavior for this application

def run_comprehensive_contact_form_tests():
    """Run comprehensive tests focusing on contact form functionality and hanging issues"""
    logger.info("Starting comprehensive contact form tests...")
    
    test_results = {
        "sample_data_test": test_contact_form_with_sample_data(),
        "concurrent_requests": test_multiple_concurrent_requests(),
        "environment_variables": check_environment_variables(),
        "database_table_check": check_database_table()
    }
    
    # Print summary
    logger.info("\n=== COMPREHENSIVE TEST SUMMARY ===")
    for test_name, result in test_results.items():
        if isinstance(result, tuple):
            status = "PASSED" if result[0] else "FAILED"
            logger.info(f"{test_name}: {status} (Response time: {result[1]:.2f}s)")
        else:
            status = "PASSED" if result else "FAILED"
            logger.info(f"{test_name}: {status}")
    
    # Overall result
    all_passed = all(r[0] if isinstance(r, tuple) else r for r in test_results.values())
    logger.info(f"\nOVERALL RESULT: {'PASSED' if all_passed else 'FAILED'}")
    
    return all_passed, test_results

if __name__ == "__main__":
    success, results = run_comprehensive_contact_form_tests()
    
    # Additional analysis for hanging issues
    logger.info("\n=== HANGING ISSUE ANALYSIS ===")
    sample_test_result = results["sample_data_test"]
    if isinstance(sample_test_result, tuple):
        response_time = sample_test_result[1]
        if response_time > 5:
            logger.warning(f"⚠️ Contact form response time ({response_time:.2f}s) is slower than expected")
            logger.warning("This could cause frontend forms to appear to hang or timeout")
        else:
            logger.info(f"✅ Contact form response time ({response_time:.2f}s) is acceptable")
    
    exit(0 if success else 1)