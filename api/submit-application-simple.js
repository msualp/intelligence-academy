import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple Vercel Function that saves to JSON file and logs email content
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
      previousAchievements,
      gdprConsent,
      consentTimestamp
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
      previousAchievements: previousAchievements || 'Not provided',
      // GDPR consent
      gdprConsent: gdprConsent || false,
      consentTimestamp: consentTimestamp || timestamp.toISOString(),
      dataRetentionNotice: 'Data will be retained for 2 years per program policy'
    };

    // Save to local file (for development)
    await saveToLocalFile(application);

    // Log email content (in production, this would actually send emails)
    logEmailContent(application);

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

// Save to local JSON file
async function saveToLocalFile(application) {
  try {
    // Create applications directory if it doesn't exist
    const applicationsDir = path.join(process.cwd(), 'applications');
    if (!fs.existsSync(applicationsDir)) {
      fs.mkdirSync(applicationsDir, { recursive: true });
    }

    // Read existing applications or create new file
    const jsonFile = path.join(applicationsDir, 'applications.json');
    let applications = [];
    
    if (fs.existsSync(jsonFile)) {
      const data = fs.readFileSync(jsonFile, 'utf-8');
      applications = JSON.parse(data).applications || [];
    }

    // Add new application
    applications.push(application);

    // Write back to file
    const jsonContent = JSON.stringify({
      applications,
      totalCount: applications.length,
      lastUpdated: new Date().toISOString()
    }, null, 2);
    
    fs.writeFileSync(jsonFile, jsonContent, 'utf-8');

    // Also save as individual YAML-like file for easy reading
    const yamlLikeFile = path.join(applicationsDir, `${application.id}.txt`);
    const yamlLikeContent = `Application ID: ${application.id}
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
    
    fs.writeFileSync(yamlLikeFile, yamlLikeContent, 'utf-8');
    
    console.log(`Application saved to ${jsonFile} and ${yamlLikeFile}`);
  } catch (error) {
    console.error('Error saving to file:', error);
    // Don't throw - we don't want to fail the submission if file save fails
  }
}

// Log email content to console (in development)
function logEmailContent(application) {
  console.log('\n=== EMAIL TO APPLICANT ===');
  console.log(`TO: ${application.email}`);
  console.log('SUBJECT: Application Received - Intelligence Academy Spring 2026');
  console.log(`
Dear ${application.primaryFounder},

Thank you for applying to Intelligence Academy's Spring 2026 cohort!

APPLICATION DETAILS
===================
Application ID: ${application.id}
Submitted: ${application.submittedDate} at ${application.submittedTime}

YOUR SUBMITTED INFORMATION (For Your Records)
============================================
Primary Founder: ${application.primaryFounder}
Email: ${application.email}
Phone: ${application.phone}
Co-Founders: ${application.coFounders}
Affiliation: ${application.affiliation}

AI Startup Idea:
${application.startupIdea}

Market Opportunity:
${application.marketOpportunity}

Unicorn Potential:
${application.unicornPotential}

Why Intelligence Academy:
${application.whyIA}

Technical Expertise: ${application.technicalExpertise}
Business Experience: ${application.businessExperience}
Previous Achievements: ${application.previousAchievements}

We'll review your application within 2 weeks and contact qualified candidates.

Best regards,
The Intelligence Academy Team
`);

  console.log('\n=== EMAIL TO ADMIN ===');
  console.log('TO: admin@iamunicorn.org');
  console.log(`SUBJECT: New Application: ${application.primaryFounder} - ${application.id}`);
  console.log('CONTENT: [Full application details included in admin email]');
  console.log('=== END EMAIL LOGS ===\n');
}