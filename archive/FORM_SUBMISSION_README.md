# Form Submission System

The Intelligence Academy website includes a form submission system that handles applications with email notifications and local storage.

## How It Works

### 1. Simple Implementation (Default)
The default implementation (`/api/submit-application-simple.js`) is used for development and simple deployments:

- **No external dependencies** - Works out of the box
- **Saves applications locally** in two formats:
  - JSON file: `applications/applications.json` (all applications)
  - Text files: `applications/APP-[ID].txt` (individual applications in readable format)
- **Console logging** for email content (in development)

### 2. Production Implementation
The production implementation (`/api/submit-application-v2.js`) includes:

- **Email notifications** via SMTP (nodemailer)
- **YAML storage** for better readability
- **Professional HTML emails** to both applicant and admin

## Setup Instructions

### For Development (Simple Version)
1. No setup needed - it works immediately
2. Applications are saved to `/applications/` directory
3. Email content is logged to console

### For Production (Email Version)
1. Copy `.env.example` to `.env`
2. Configure your SMTP settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password
   ADMIN_EMAIL=admin@your-domain.com
   ```

3. For Gmail:
   - Enable 2-factor authentication
   - Generate an app-specific password
   - Use that password in SMTP_PASS

4. Update the API endpoint in `ApplyPage.jsx`:
   ```javascript
   // Change from:
   const response = await fetch('/api/submit-application-simple', {
   
   // To:
   const response = await fetch('/api/submit-application-v2', {
   ```

## Data Storage

### Local Storage Structure
```
applications/
├── applications.json          # All applications in JSON format
├── APP-1234567890-abc.txt    # Individual application (readable)
├── APP-1234567891-def.txt    # Individual application (readable)
└── ...
```

### Application Format (Text File)
```
Application ID: APP-1234567890-abc
Submitted: 2025-01-13T10:30:00.000Z
Status: pending

APPLICANT INFORMATION
=====================
Primary Founder: John Doe
Email: john@example.com
Phone: (555) 123-4567
Co-Founders: Jane Smith
Affiliation: rowan-student

STARTUP DETAILS
===============
AI Startup Idea:
[Full text of startup idea]

Market Opportunity:
[Full text of market opportunity]

[... etc ...]
```

## Email Templates

### Applicant Email
- Confirmation of receipt
- Application ID for reference
- Next steps in the process
- Professional HTML template with branding

### Admin Email
- Full application details
- All form fields formatted for easy reading
- Direct link to review (if implemented)

## Security Considerations

1. **Data Privacy**: Application data contains personal information
   - The `/applications/` directory is gitignored
   - Never commit application data to version control

2. **Email Security**: 
   - Use environment variables for credentials
   - Never hardcode SMTP passwords
   - Consider using API-based email services (SendGrid, Mailgun) for better security

3. **Validation**: 
   - Client-side validation in React
   - Server-side validation in API
   - Email and phone format validation

## Deployment Notes

### Vercel Deployment
1. The simple version works on Vercel but won't persist data between deployments
2. For production, use the email version with a proper database
3. Set environment variables in Vercel dashboard

### Alternative Storage Options
For production, consider:
- **Database**: Supabase, MongoDB, PostgreSQL
- **File Storage**: AWS S3, Google Cloud Storage
- **Form Services**: Formspree, Netlify Forms, FormSubmit

## Testing

1. Submit a test application
2. Check `/applications/` directory for saved data
3. Verify console logs show email content
4. For production: verify emails are received

## Troubleshooting

### Applications not saving
- Check write permissions on `/applications/` directory
- Verify the API endpoint is correct
- Check browser console for errors

### Emails not sending
- Verify SMTP credentials
- Check firewall/port restrictions
- Enable "less secure apps" for Gmail (not recommended for production)
- Use app-specific passwords

### CORS errors
- Vercel configuration includes CORS headers
- For local development, use proxy in vite.config.js