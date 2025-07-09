from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import resend
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://b91c0085-1ba6-4299-81dc-78e421887aa4.preview.emergentagent.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Resend
resend_api_key = os.environ.get("RESEND_API_KEY")
if not resend_api_key:
    logger.error("RESEND_API_KEY environment variable is not set")
else:
    resend.api_key = resend_api_key

# Pydantic models
class ContactEmailRequest(BaseModel):
    name: str
    email: str
    message: str
    inquiry_type: str

class EnrollmentEmailRequest(BaseModel):
    student_name: str
    student_email: str
    course_name: str
    course_details: dict

@app.get("/")
async def root():
    return {"message": "Azellar Backend API"}

@app.post("/api/send-contact-email")
async def send_contact_email(request: ContactEmailRequest):
    """Send confirmation email for contact form submission"""
    try:
        # Send confirmation to user
        user_email = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": request.email,
            "subject": "Thank you for contacting Azellar",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Thank You for Contacting Us</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1e3a8a, #22d3ee); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">Thank You for Contacting Azellar</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <p>Dear {request.name},</p>
                    
                    <p>Thank you for reaching out to Azellar! We have received your message regarding <strong>{request.inquiry_type}</strong>.</p>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your Message:</strong></p>
                        <p style="font-style: italic;">{request.message}</p>
                    </div>
                    
                    <p>Our team will review your message and get back to you within 24 hours.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://azellar.com" style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Visit Our Website</a>
                    </div>
                    
                    <p>Best regards,<br>
                    The Azellar Team</p>
                </div>
            </body>
            </html>
            """
        })
        
        # Send notification to admin
        admin_email = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": "delivered@resend.dev",
            "subject": f"New Contact Form Submission - {request.inquiry_type}",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Contact Form Submission</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1e3a8a, #22d3ee); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2>Contact Details:</h2>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 10px 0;"><strong>Name:</strong> {request.name}</li>
                        <li style="margin: 10px 0;"><strong>Email:</strong> {request.email}</li>
                        <li style="margin: 10px 0;"><strong>Inquiry Type:</strong> {request.inquiry_type}</li>
                        <li style="margin: 10px 0;"><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
                    </ul>
                    
                    <h3>Message:</h3>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #22d3ee;">
                        <p>{request.message}</p>
                    </div>
                </div>
            </body>
            </html>
            """
        })
        
        logger.info(f"Contact emails sent successfully for {request.email}")
        return {"status": "success", "message": "Emails sent successfully"}
        
    except Exception as e:
        logger.error(f"Error sending contact emails: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send emails")

@app.post("/api/send-enrollment-email")
async def send_enrollment_email(request: EnrollmentEmailRequest):
    """Send confirmation email when student enrolls in a course"""
    try:
        enrollment_email = resend.Emails.send({
            "from": "courses@azellar.com",
            "to": request.student_email,
            "subject": f"Enrollment Confirmation - {request.course_name}",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Course Enrollment Confirmation</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1e3a8a, #22d3ee); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">Welcome to Azellar Academy!</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2>Enrollment Confirmed!</h2>
                    <p>Dear {request.student_name},</p>
                    
                    <p>Congratulations! You have successfully enrolled in <strong>{request.course_name}</strong>.</p>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22d3ee;">
                        <h3>Course Details:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin: 8px 0;"><strong>Course Name:</strong> {request.course_name}</li>
                            <li style="margin: 8px 0;"><strong>Duration:</strong> {request.course_details.get('duration', 'TBD')}</li>
                            <li style="margin: 8px 0;"><strong>Instructor:</strong> {request.course_details.get('instructor', 'TBD')}</li>
                            <li style="margin: 8px 0;"><strong>Start Date:</strong> {request.course_details.get('start_date', 'TBD')}</li>
                        </ul>
                    </div>
                    
                    <p>You will receive course materials and joining instructions 1 week before the start date.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://azellar.com/dashboard" style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Your Dashboard</a>
                    </div>
                    
                    <p>If you have any questions, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>
                    The Azellar Academy Team</p>
                </div>
            </body>
            </html>
            """
        })
        
        logger.info(f"Enrollment email sent successfully for {request.student_email}")
        return {"status": "success", "message": "Enrollment email sent successfully"}
        
    except Exception as e:
        logger.error(f"Error sending enrollment email: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send enrollment email")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
