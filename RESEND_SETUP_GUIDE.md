# 📧 RESEND SETUP GUIDE - Get Your Email API Key

## Step 1: Create Resend Account

### 1.1 Sign Up
1. Go to **https://resend.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up using:
   - GitHub account (recommended)
   - Google account
   - Or email/password

### 1.2 Verify Email
1. Check your email for verification link
2. Click the verification link to activate your account

## Step 2: Get Your API Key

### 2.1 Access API Keys
1. After signing in, go to **API Keys** in the sidebar
2. Or visit: https://resend.com/api-keys

### 2.2 Create New API Key
1. Click **"Create API Key"**
2. Give it a name: `Azellar Academy`
3. Choose permissions:
   - **Sending access**: ✅ Enabled (required)
   - **Domains access**: ✅ Enabled (recommended)
4. Click **"Add"**

### 2.3 Copy Your Key
You'll see your API key: `re_123abc...`
**⚠️ IMPORTANT: Copy this immediately - you won't see it again!**

```
RESEND_API_KEY=re_123abc...
```

## Step 3: Domain Setup (Recommended)

### Option A: Use Resend's Shared Domain (Quick Start)
- You can start immediately with: `onboarding@resend.dev`
- This works for testing but not recommended for production
- **Skip to Step 4** if using this option

### Option B: Set Up Your Own Domain (Production Ready)

#### 3.1 Add Your Domain
1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain: `azellar.com` (or your actual domain)
4. Click **"Add"**

#### 3.2 Configure DNS Records
Resend will show you DNS records to add. You need to add these to your domain registrar:

**Example DNS Records:**
```
Type: TXT
Name: @
Value: resend-domain-verification=abc123...

Type: MX
Name: @
Value: feedback-smtp.resend.com
Priority: 10

Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"

Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

#### 3.3 Verify Domain
1. After adding DNS records (wait 5-60 minutes)
2. Click **"Verify"** in Resend dashboard
3. Status should change to **"Verified"** ✅

## Step 4: Test Your Setup

### 4.1 Send Test Email
1. Go to **"Logs"** in Resend dashboard
2. Try the API test in their docs: https://resend.com/docs/send-with-curl

```bash
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "test@resend.dev",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<p>Hello from Resend!</p>"
  }'
```

### 4.2 Check Email Delivery
- Check your inbox for the test email
- Check spam folder if not received
- Verify in Resend **"Logs"** that email was sent

## Step 5: Your Email Configuration

Add this to your `.env.local` file:

```bash
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_key_here

# Email settings
FROM_EMAIL=noreply@azellar.com  # Use your verified domain
ADMIN_EMAIL=admin@azellar.com   # Where contact forms go
```

## Step 6: Email Templates for Your App

### 6.1 Course Enrollment Confirmation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Course Enrollment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #1e3a8a, #22d3ee); padding: 40px; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome to Azellar Academy!</h1>
    </div>
    
    <div style="padding: 30px;">
        <h2>Enrollment Confirmed</h2>
        <p>Dear {{student_name}},</p>
        
        <p>Congratulations! You have successfully enrolled in <strong>{{course_name}}</strong>.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Course Details:</h3>
            <ul>
                <li><strong>Course:</strong> {{course_name}}</li>
                <li><strong>Duration:</strong> {{duration}}</li>
                <li><strong>Instructor:</strong> {{instructor}}</li>
                <li><strong>Start Date:</strong> {{start_date}}</li>
            </ul>
        </div>
        
        <p>You will receive course materials and joining instructions 1 week before the start date.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboard_url}}" style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Dashboard</a>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>
        The Azellar Academy Team</p>
    </div>
</body>
</html>
```

### 6.2 Contact Form Confirmation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Message Received</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #1e3a8a, #22d3ee); padding: 40px; text-align: center;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
    </div>
    
    <div style="padding: 30px;">
        <p>Dear {{name}},</p>
        
        <p>Thank you for reaching out to Azellar! We have received your message:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Inquiry Type:</strong> {{inquiry_type}}</p>
            <p><strong>Message:</strong></p>
            <p>{{message}}</p>
        </div>
        
        <p>Our team will review your message and get back to you within 24 hours.</p>
        
        <p>Best regards,<br>
        The Azellar Team</p>
    </div>
</body>
</html>
```

## Pricing & Limits

### Free Tier
- **3,000 emails/month** - Perfect for development and small projects
- All features included
- No credit card required

### Paid Plans
- Start at $20/month for 50,000 emails
- Higher deliverability
- Priority support

## Common Issues & Solutions

### Issue: "Invalid API Key"
**Solution**: 
- Double-check you copied the complete key
- Make sure it starts with `re_`
- Verify there are no extra spaces

### Issue: "Domain not verified"
**Solution**:
- Wait up to 60 minutes for DNS propagation
- Double-check DNS records in your domain registrar
- Use a DNS checker tool to verify records

### Issue: "Emails going to spam"
**Solution**:
- Set up your own domain (don't use resend.dev)
- Add all required DNS records (SPF, DKIM, DMARC)
- Start with low volume and gradually increase

### Issue: "Rate limit exceeded"
**Solution**:
- Free tier: 3,000 emails/month
- Check your usage in Resend dashboard
- Upgrade plan if needed

## Security Best Practices

1. **Never expose API key in frontend code**
2. **Use environment variables only**
3. **Rotate API keys regularly**
4. **Monitor email logs for suspicious activity**
5. **Set up domain authentication (SPF, DKIM)**

## Next Steps

Once you have:
✅ Resend account created
✅ API key generated
✅ Domain verified (optional but recommended)
✅ Test email sent successfully

**Send me your `RESEND_API_KEY`** and I'll integrate it into your student enrollment system!

## Quick Reference

```bash
# Your .env.local file should include:
RESEND_API_KEY=re_your_actual_key_here
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

**Need help?** Resend has excellent documentation at: https://resend.com/docs