# Temporary Email Setup Using sociail.com

This is a temporary configuration using the sociail.com domain until iamunicorn.org is set up in Mailgun.

## Current Configuration

The system is configured to use:
- **Domain**: sociail.com (temporarily)
- **From Addresses**: 
  - `noreply@sociail.com` (for applicant emails)
  - `applications@sociail.com` (for admin notifications)

## What You Need to Do

1. **Edit the .env file** and add your actual Mailgun API key:
   ```bash
   # Open .env file
   nano .env
   # or
   code .env
   ```

2. **Update these values**:
   ```env
   MAILGUN_API_KEY=key-YOUR-ACTUAL-MAILGUN-KEY-HERE
   MAILGUN_DOMAIN=sociail.com
   ADMIN_EMAIL=your-actual-email@example.com
   ```

3. **Save the file**

## How It Works

- When someone submits an application, they'll receive a confirmation from `noreply@sociail.com`
- You'll receive the admin notification from `applications@sociail.com`
- The emails will clearly show "Intelligence Academy" in the sender name
- All email content remains the same, just the domain is different

## When to Switch to iamunicorn.org

Once iamunicorn.org is configured in Mailgun:

1. Update `.env`:
   ```env
   MAILGUN_DOMAIN=iamunicorn.org
   ```

2. The code will automatically use the new domain for all emails

## Testing

1. Submit a test application
2. Check that you receive both:
   - Applicant confirmation email
   - Admin notification email
3. Check Mailgun logs if there are issues

## Note

This temporary setup allows you to test and use the form immediately while waiting for the iamunicorn.org domain to be configured in Mailgun.