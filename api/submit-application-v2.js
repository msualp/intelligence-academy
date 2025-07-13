import nodemailer from 'nodemailer';
import yaml from 'yaml';
import fs from 'fs/promises';
import path from 'path';

// Vercel Serverless Function for handling application submissions
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

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        error: 'Invalid phone number',
        details: 'Please provide a valid phone number'
      });
    }

    // Create application object with timestamp
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

    // Save to local YAML file (in development)
    if (process.env.NODE_ENV !== 'production') {
      await saveToYAML(application);
    }

    // Send email notifications
    await sendEmails(application);

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

// Helper function to save to YAML file
async function saveToYAML(application) {
  try {
    const yamlDir = path.join(process.cwd(), 'applications');
    const yamlFile = path.join(yamlDir, `applications-${new Date().toISOString().split('T')[0]}.yaml`);
    
    // Ensure directory exists
    try {
      await fs.mkdir(yamlDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Read existing data or create new
    let applications = [];
    try {
      const existingData = await fs.readFile(yamlFile, 'utf-8');
      const parsed = yaml.parse(existingData);
      applications = parsed.applications || [];
    } catch (err) {
      // File doesn't exist yet
    }

    // Add new application
    applications.push(application);

    // Write back to file
    const yamlContent = yaml.stringify({ 
      applications,
      totalCount: applications.length,
      lastUpdated: new Date().toISOString()
    });
    
    await fs.writeFile(yamlFile, yamlContent, 'utf-8');
    console.log(`Application saved to ${yamlFile}`);
  } catch (error) {
    console.error('Error saving to YAML:', error);
    // Don't throw - we don't want to fail the submission if YAML save fails
  }
}

// Helper function to send email notifications
async function sendEmails(application) {
  // Create transporter using SMTP
  // For production, use environment variables for credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  });

  // Email to applicant
  const applicantEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007AFF, #FF9500); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f5f5f7; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        h1 { margin: 0; }
        .app-id { font-family: monospace; background: #e0e0e0; padding: 5px 10px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received!</h1>
          <p>Intelligence Academy @ Rowan</p>
        </div>
        <div class="content">
          <p>Dear ${application.primaryFounder},</p>
          
          <p>Thank you for applying to Intelligence Academy's Spring 2026 cohort! We're excited to review your AI startup idea.</p>
          
          <div class="info-box">
            <h3>Application Details</h3>
            <p><strong>Application ID:</strong> <span class="app-id">${application.id}</span></p>
            <p><strong>Submitted:</strong> ${application.submittedDate} at ${application.submittedTime}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          
          <h3>What Happens Next?</h3>
          <ol>
            <li>Our team will review your application within 2 weeks</li>
            <li>Qualified candidates will be contacted for an interview</li>
            <li>Final decisions will be made by January 15, 2026</li>
            <li>The program begins in February 2026</li>
          </ol>
          
          <p>If you have any questions, please don't hesitate to contact us at apply@iamunicorn.org</p>
          
          <div class="footer">
            <p>Best regards,<br>The Intelligence Academy Team</p>
            <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply directly to this message.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email to admin with full application details
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #007AFF; color: white; padding: 20px; text-align: center; }
        .section { background: #f5f5f7; padding: 20px; margin: 10px 0; border-radius: 8px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #007AFF; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .long-text { white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Application Received</h1>
          <p>Application ID: ${application.id}</p>
        </div>
        
        <div class="section">
          <h2>Applicant Information</h2>
          <div class="field">
            <div class="label">Primary Founder:</div>
            <div class="value">${application.primaryFounder}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${application.email}</div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${application.phone}</div>
          </div>
          <div class="field">
            <div class="label">Co-Founders:</div>
            <div class="value">${application.coFounders}</div>
          </div>
          <div class="field">
            <div class="label">Affiliation:</div>
            <div class="value">${application.affiliation}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Startup Details</h2>
          <div class="field">
            <div class="label">AI Startup Idea:</div>
            <div class="value long-text">${application.startupIdea}</div>
          </div>
          <div class="field">
            <div class="label">Market Opportunity:</div>
            <div class="value long-text">${application.marketOpportunity}</div>
          </div>
          <div class="field">
            <div class="label">Unicorn Potential:</div>
            <div class="value long-text">${application.unicornPotential}</div>
          </div>
          <div class="field">
            <div class="label">Why Intelligence Academy:</div>
            <div class="value long-text">${application.whyIA}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Team Background</h2>
          <div class="field">
            <div class="label">Technical Expertise:</div>
            <div class="value long-text">${application.technicalExpertise}</div>
          </div>
          <div class="field">
            <div class="label">Business Experience:</div>
            <div class="value long-text">${application.businessExperience}</div>
          </div>
          <div class="field">
            <div class="label">Previous Achievements:</div>
            <div class="value long-text">${application.previousAchievements}</div>
          </div>
        </div>
        
        <div class="section">
          <p><strong>Submitted:</strong> ${application.submittedAt}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send confirmation email to applicant
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Intelligence Academy" <noreply@iamunicorn.org>',
      to: application.email,
      subject: 'Application Received - Intelligence Academy Spring 2026',
      html: applicantEmailHtml
    });

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@iamunicorn.org';
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"IA Application System" <noreply@iamunicorn.org>',
      to: adminEmail,
      subject: `New Application: ${application.primaryFounder} - ${application.id}`,
      html: adminEmailHtml
    });

    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    // Don't throw - we don't want to fail the submission if email fails
    // In production, you might want to queue failed emails for retry
  }
}