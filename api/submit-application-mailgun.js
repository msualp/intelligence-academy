import formData from 'form-data';
import Mailgun from 'mailgun.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Mailgun
const mailgun = new Mailgun(formData);

// Vercel Function with Mailgun email sending
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const {
      primaryFounder,
      email,
      phone,
      coFounders,
      affiliation,
      startupIdea,
      marketOpportunity,
      unicornPotential,
      whyIA,
      technicalExpertise,
      businessExperience,
      previousAchievements
    } = req.body;

    // Basic validation
    if (!primaryFounder || !email || !phone || !affiliation || !startupIdea || !marketOpportunity || !unicornPotential || !whyIA) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Please fill in all required fields marked with *'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email address',
        details: 'Please provide a valid email address'
      });
    }

    // Create application object
    const timestamp = new Date();
    const application = {
      id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: timestamp.toISOString(),
      submittedDate: timestamp.toLocaleDateString(),
      submittedTime: timestamp.toLocaleTimeString(),
      status: 'pending',
      // Form data
      primaryFounder,
      email,
      phone,
      coFounders: coFounders || 'None',
      affiliation,
      startupIdea,
      marketOpportunity,
      unicornPotential,
      whyIA,
      technicalExpertise: technicalExpertise || 'Not provided',
      businessExperience: businessExperience || 'Not provided',
      previousAchievements: previousAchievements || 'Not provided'
    };

    // Save to local file
    await saveToLocalFile(application);

    // Send emails via Mailgun
    await sendMailgunEmails(application);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
      nextSteps: 'We will review your application within 2 weeks and contact qualified candidates.'
    });

  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: 'An error occurred while processing your application. Please try again later.'
    });
  }
}

// Save to local file
async function saveToLocalFile(application) {
  try {
    const applicationsDir = path.join(process.cwd(), 'applications');
    if (!fs.existsSync(applicationsDir)) {
      fs.mkdirSync(applicationsDir, { recursive: true });
    }

    // Save as individual text file
    const fileName = path.join(applicationsDir, `${application.id}.txt`);
    const content = `Application ID: ${application.id}
Submitted: ${application.submittedAt}
Status: ${application.status}

APPLICANT INFORMATION
=====================
Primary Founder: ${application.primaryFounder}
Email: ${application.email}
Phone: ${application.phone}
Co-Founders: ${application.coFounders}
Affiliation: ${application.affiliation}

DATA PROTECTION CONSENT
=======================
GDPR Consent Given: ${application.gdprConsent ? 'YES' : 'NO'}
Consent Timestamp: ${application.consentTimestamp}
Data Retention: ${application.dataRetentionNotice}

STARTUP DETAILS
===============
AI Startup Idea:
${application.startupIdea}

Market Opportunity:
${application.marketOpportunity}

Unicorn Potential:
${application.unicornPotential}

Why Intelligence Academy:
${application.whyIA}

TEAM BACKGROUND
===============
Technical Expertise:
${application.technicalExpertise}

Business Experience:
${application.businessExperience}

Previous Achievements:
${application.previousAchievements}
`;
    
    fs.writeFileSync(fileName, content, 'utf-8');
    console.log(`Application saved to ${fileName}`);
  } catch (error) {
    console.error('Error saving to file:', error);
  }
}

// Send emails via Mailgun
async function sendMailgunEmails(application) {
  try {
    // Check if we have Mailgun credentials
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.log('Mailgun credentials not found. Skipping email send.');
      console.log('To enable emails, set MAILGUN_API_KEY and MAILGUN_DOMAIN in .env');
      return;
    }

    // Initialize Mailgun client
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net'
    });

    // Email to applicant
    const applicantEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .header { 
      background: linear-gradient(135deg, #007AFF, #FF9500); 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
      border-radius: 10px 10px 0 0; 
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      font-weight: 800;
    }
    .header p {
      margin: 0;
      font-size: 18px;
      opacity: 0.9;
    }
    .content { 
      background: #f5f5f7; 
      padding: 40px 30px; 
      border-radius: 0 0 10px 10px; 
    }
    .info-box { 
      background: white; 
      padding: 25px; 
      margin: 25px 0; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
    }
    .info-box h3 {
      margin: 0 0 15px 0;
      color: #007AFF;
      font-size: 20px;
    }
    .info-box p {
      margin: 8px 0;
    }
    .app-id { 
      font-family: 'Courier New', monospace; 
      background: #e0e0e0; 
      padding: 5px 10px; 
      border-radius: 4px; 
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: #007AFF;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      margin-top: 20px;
    }
    .footer { 
      text-align: center; 
      margin-top: 40px; 
      color: #666; 
      font-size: 14px; 
    }
    .timeline {
      margin: 25px 0;
    }
    .timeline-item {
      padding: 10px 0;
      border-left: 3px solid #007AFF;
      margin-left: 10px;
      padding-left: 20px;
    }
    .timeline-item strong {
      color: #007AFF;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Received! 🚀</h1>
      <p>Intelligence Academy @ Rowan</p>
    </div>
    <div class="content">
      <p style="font-size: 18px;">Dear ${application.primaryFounder},</p>
      
      <p>Thank you for applying to Intelligence Academy's Spring 2026 cohort! We're excited to review your AI startup idea and learn more about your vision for building the next unicorn.</p>
      
      <div class="info-box">
        <h3>📋 Application Details</h3>
        <p><strong>Application ID:</strong> <span class="app-id">${application.id}</span></p>
        <p><strong>Submitted:</strong> ${application.submittedDate} at ${application.submittedTime}</p>
        <p><strong>Status:</strong> Under Review</p>
        <p><strong>Email:</strong> ${application.email}</p>
      </div>
      
      <h3 style="color: #333; margin-top: 35px;">📄 Your Submitted Information</h3>
      <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Keep this for your records</p>
      
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Applicant Information</h4>
        <p><strong>Primary Founder:</strong> ${application.primaryFounder}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Co-Founders:</strong> ${application.coFounders}</p>
        <p><strong>Affiliation:</strong> ${application.affiliation}</p>
      </div>
      
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Your AI Startup Idea</h4>
        <p style="white-space: pre-wrap; line-height: 1.6;">${application.startupIdea}</p>
      </div>
      
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Market Opportunity</h4>
        <p style="white-space: pre-wrap; line-height: 1.6;">${application.marketOpportunity}</p>
      </div>
      
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Unicorn Potential</h4>
        <p style="white-space: pre-wrap; line-height: 1.6;">${application.unicornPotential}</p>
      </div>
      
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Why Intelligence Academy</h4>
        <p style="white-space: pre-wrap; line-height: 1.6;">${application.whyIA}</p>
      </div>
      
      ${(application.technicalExpertise && application.technicalExpertise !== 'Not provided') || 
        (application.businessExperience && application.businessExperience !== 'Not provided') || 
        (application.previousAchievements && application.previousAchievements !== 'Not provided') ? `
      <div class="info-box">
        <h4 style="color: #007AFF; margin-bottom: 15px;">Team Background</h4>
        ${application.technicalExpertise && application.technicalExpertise !== 'Not provided' ? 
          `<p><strong>Technical Expertise:</strong><br>${application.technicalExpertise}</p>` : ''}
        ${application.businessExperience && application.businessExperience !== 'Not provided' ? 
          `<p style="margin-top: 10px;"><strong>Business Experience:</strong><br>${application.businessExperience}</p>` : ''}
        ${application.previousAchievements && application.previousAchievements !== 'Not provided' ? 
          `<p style="margin-top: 10px;"><strong>Previous Achievements:</strong><br>${application.previousAchievements}</p>` : ''}
      </div>
      ` : ''}
      
      <h3 style="color: #333; margin-top: 35px;">⏱️ What Happens Next?</h3>
      <div class="timeline">
        <div class="timeline-item">
          <strong>Within 2 Weeks:</strong> Our team reviews your application
        </div>
        <div class="timeline-item">
          <strong>Week 3:</strong> Qualified candidates invited for interviews
        </div>
        <div class="timeline-item">
          <strong>January 15, 2026:</strong> Final admission decisions
        </div>
        <div class="timeline-item">
          <strong>February 2026:</strong> Program begins!
        </div>
      </div>
      
      <p style="margin-top: 30px;">Keep this email for your records. Your application ID will be needed for any future correspondence.</p>
      
      <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:apply@iamunicorn.org">apply@iamunicorn.org</a></p>
      
      <div class="footer">
        <p><strong>Best regards,</strong><br>The Intelligence Academy Team</p>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          Intelligence Academy @ Rowan University<br>
          AI Startup Accelerator & Unicorn Factory*<br>
          <br>
          <em>This is an automated email. Please do not reply directly to this message.</em>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const applicantEmailText = `
Dear ${application.primaryFounder},

Thank you for applying to Intelligence Academy's Spring 2026 cohort!

APPLICATION DETAILS
===================
Application ID: ${application.id}
Submitted: ${application.submittedDate} at ${application.submittedTime}
Status: Under Review

YOUR SUBMITTED INFORMATION (For Your Records)
============================================

APPLICANT INFORMATION
--------------------
Primary Founder: ${application.primaryFounder}
Email: ${application.email}
Phone: ${application.phone}
Co-Founders: ${application.coFounders}
Affiliation: ${application.affiliation}

YOUR AI STARTUP IDEA
-------------------
${application.startupIdea}

MARKET OPPORTUNITY
-----------------
${application.marketOpportunity}

UNICORN POTENTIAL
----------------
${application.unicornPotential}

WHY INTELLIGENCE ACADEMY
-----------------------
${application.whyIA}

${application.technicalExpertise && application.technicalExpertise !== 'Not provided' ? `TECHNICAL EXPERTISE
------------------
${application.technicalExpertise}

` : ''}${application.businessExperience && application.businessExperience !== 'Not provided' ? `BUSINESS EXPERIENCE
------------------
${application.businessExperience}

` : ''}${application.previousAchievements && application.previousAchievements !== 'Not provided' ? `PREVIOUS ACHIEVEMENTS
--------------------
${application.previousAchievements}

` : ''}
WHAT HAPPENS NEXT
================
- Within 2 Weeks: Our team reviews your application
- Week 3: Qualified candidates invited for interviews
- January 15, 2026: Final admission decisions
- February 2026: Program begins!

If you have any questions, contact us at apply@iamunicorn.org

Best regards,
The Intelligence Academy Team
    `;

    // Send applicant email
    // Temporarily using sociail.com domain until iamunicorn.org is set up
    const fromDomain = process.env.MAILGUN_DOMAIN || 'sociail.com';
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Intelligence Academy <noreply@${fromDomain}>`,
      to: [application.email],
      subject: '✅ Application Received - Intelligence Academy Spring 2026',
      text: applicantEmailText,
      html: applicantEmailHtml
    });

    console.log(`Confirmation email sent to ${application.email}`);

    // Email to admin with enhanced formatting
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@intelligence-academy.com';
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
      line-height: 1.6; 
      color: #1D1D1F; 
      margin: 0;
      padding: 0;
      background: #f5f5f7;
    }
    .container { 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px; 
      background: white;
    }
    .header { 
      background: linear-gradient(135deg, #007AFF 0%, #0051A2 100%); 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 5px 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .quick-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    .info-card {
      background: #f5f5f7;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      border: 1px solid #e0e0e0;
    }
    .info-card .label {
      font-size: 12px;
      color: #86868B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .info-card .value {
      font-size: 16px;
      font-weight: 600;
      color: #1D1D1F;
    }
    .section { 
      background: #FFFFFF; 
      padding: 30px; 
      margin: 20px 0; 
      border-radius: 12px; 
      border: 1px solid #E5E5E7;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .section h2 {
      color: #1D1D1F;
      font-size: 22px;
      margin: 0 0 20px 0;
      padding-bottom: 15px;
      border-bottom: 2px solid #F5F5F7;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .field { 
      margin: 20px 0; 
    }
    .label { 
      font-weight: 600; 
      color: #007AFF; 
      margin-bottom: 8px; 
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .value { 
      margin-top: 8px; 
      padding: 15px; 
      background: #F5F5F7; 
      border-radius: 8px; 
      white-space: pre-wrap; 
      line-height: 1.7;
      color: #1D1D1F;
      border: 1px solid #E5E5E7;
    }
    .value a {
      color: #007AFF;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #007AFF;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    .badge.orange {
      background: #FF9500;
    }
    .badge.green {
      background: #30D158;
    }
    .actions {
      background: #F5F5F7;
      padding: 25px;
      border-radius: 12px;
      margin: 30px 0;
      text-align: center;
      border: 1px solid #E5E5E7;
    }
    .actions h3 {
      margin: 0 0 15px 0;
      color: #1D1D1F;
      font-size: 18px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #007AFF;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      margin: 5px;
      font-size: 14px;
    }
    .button:hover {
      background: #0051A2;
    }
    .button.secondary {
      background: #86868B;
    }
    .button.secondary:hover {
      background: #636366;
    }
    .meta { 
      background: #F5F5F7; 
      padding: 20px; 
      border-radius: 12px;
      text-align: center;
      font-size: 14px;
      color: #86868B;
      margin-top: 30px;
      border: 1px solid #E5E5E7;
    }
    .meta strong {
      color: #1D1D1F;
    }
    .highlight-box {
      background: linear-gradient(135deg, rgba(0, 122, 255, 0.05), rgba(255, 149, 0, 0.05));
      border: 1px solid rgba(0, 122, 255, 0.2);
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .score {
      display: inline-block;
      font-size: 24px;
      font-weight: 700;
      color: #007AFF;
      margin-right: 10px;
    }
    .char-count {
      font-size: 12px;
      color: #86868B;
      margin-left: 5px;
    }
    /* Print styles */
    @media print {
      body { background: white; }
      .container { padding: 10px; }
      .actions { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Application Received</h1>
      <p><strong>${application.primaryFounder}</strong></p>
      <p>Application ID: ${application.id}</p>
    </div>
    
    <!-- Quick Overview Cards -->
    <div class="quick-info">
      <div class="info-card">
        <div class="label">Submitted</div>
        <div class="value">${application.submittedDate}</div>
      </div>
      <div class="info-card">
        <div class="label">Affiliation</div>
        <div class="value">${application.affiliation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
      </div>
      <div class="info-card">
        <div class="label">Status</div>
        <div class="value" style="color: #FF9500;">Pending Review</div>
      </div>
    </div>
    
    <!-- Applicant Information -->
    <div class="section">
      <h2>👤 Applicant Information</h2>
      <div class="field">
        <div class="label">Primary Founder</div>
        <div class="value">${application.primaryFounder}</div>
      </div>
      <div class="field">
        <div class="label">Contact Information</div>
        <div class="value">
          📧 Email: <a href="mailto:${application.email}">${application.email}</a><br>
          📱 Phone: <a href="tel:${application.phone}">${application.phone}</a>
        </div>
      </div>
      ${application.coFounders && application.coFounders !== 'None' ? `
      <div class="field">
        <div class="label">Co-Founders <span class="badge green">${application.coFounders.split(',').length} Total</span></div>
        <div class="value">${application.coFounders}</div>
      </div>
      ` : ''}
    </div>
    
    <!-- Startup Vision -->
    <div class="section">
      <h2>💡 Startup Vision</h2>
      <div class="field">
        <div class="label">AI Startup Idea <span class="char-count">(${application.startupIdea.length} / 500 characters)</span></div>
        <div class="value highlight-box">${application.startupIdea}</div>
      </div>
      <div class="field">
        <div class="label">Market Opportunity <span class="char-count">(${application.marketOpportunity.length} / 300 characters)</span></div>
        <div class="value">${application.marketOpportunity}</div>
      </div>
      <div class="field">
        <div class="label">🦄 Unicorn Potential <span class="char-count">(${application.unicornPotential.length} / 300 characters)</span></div>
        <div class="value highlight-box">${application.unicornPotential}</div>
      </div>
      <div class="field">
        <div class="label">Why Intelligence Academy <span class="char-count">(${application.whyIA.length} / 300 characters)</span></div>
        <div class="value">${application.whyIA}</div>
      </div>
    </div>
    
    <!-- Team Background -->
    <div class="section">
      <h2>🎯 Team Background & Experience</h2>
      ${application.technicalExpertise && application.technicalExpertise !== 'Not provided' ? `
      <div class="field">
        <div class="label">Technical Expertise <span class="badge">AI/Tech</span></div>
        <div class="value">${application.technicalExpertise}</div>
      </div>
      ` : '<p style="color: #86868B; font-style: italic;">No technical expertise provided</p>'}
      
      ${application.businessExperience && application.businessExperience !== 'Not provided' ? `
      <div class="field">
        <div class="label">Business Experience <span class="badge orange">Business</span></div>
        <div class="value">${application.businessExperience}</div>
      </div>
      ` : '<p style="color: #86868B; font-style: italic;">No business experience provided</p>'}
      
      ${application.previousAchievements && application.previousAchievements !== 'Not provided' ? `
      <div class="field">
        <div class="label">Previous Achievements <span class="badge green">Track Record</span></div>
        <div class="value">${application.previousAchievements}</div>
      </div>
      ` : '<p style="color: #86868B; font-style: italic;">No previous achievements provided</p>'}
    </div>
    
    <!-- Review Actions -->
    <div class="actions">
      <h3>🎬 Review Actions</h3>
      <p style="margin-bottom: 20px; color: #86868B;">Quick actions for the review team</p>
      <a href="mailto:${application.email}?subject=Re: Intelligence Academy Application - ${application.id}" class="button">
        📧 Email Applicant
      </a>
      <a href="#" class="button secondary" onclick="window.print(); return false;">
        🖨️ Print Application
      </a>
    </div>
    
    <!-- Metadata -->
    <div class="meta">
      <p><strong>Submission Details</strong></p>
      <p>
        Application ID: <strong>${application.id}</strong><br>
        Submitted: ${application.submittedAt}<br>
        GDPR Consent: <strong>${application.gdprConsent ? '✅ Given' : '❌ Not Given'}</strong> at ${application.consentTimestamp}<br>
        Saved to: applications/${application.id}.txt
      </p>
      <p style="margin-top: 15px; font-size: 12px;">
        This email was sent to: ${adminEmail}<br>
        Forward to review team as needed<br>
        <em>Data retention: 2 years per program policy</em>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Send admin email
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `IA Application System <applications@${fromDomain}>`,
      to: adminEmail.split(',').map(email => email.trim()), // Support multiple recipients
      subject: `New Application: ${application.primaryFounder} - ${application.affiliation}`,
      html: adminEmailHtml
    });

    console.log(`Admin notification sent to ${adminEmail}`);

  } catch (error) {
    console.error('Error sending Mailgun emails:', error);
    // Don't throw - we don't want to fail the submission if email fails
    // In production, you might want to queue failed emails for retry
  }
}