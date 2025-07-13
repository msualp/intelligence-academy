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
    const application = {
      ...req.body,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    // TODO: In production, you would:
    // 1. Save to database (Supabase, MongoDB, etc.)
    // 2. Send confirmation email to applicant
    // 3. Notify admin team
    // 4. Create calendar event for review
    
    // For now, we'll simulate success
    console.log('New application received:', application);

    // Send email notification (example with SendGrid)
    // await sendEmailNotification(application);

    // Save to database (example with Supabase)
    // await saveToDatabase(application);

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

// Helper function to send email notifications (implement with your email service)
async function sendEmailNotification(application) {
  // Example implementation with SendGrid
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  // const msg = {
  //   to: application.email,
  //   from: 'apply@intelligence-academy.rowan.edu',
  //   subject: 'Application Received - Intelligence Academy',
  //   html: `
  //     <h1>Thank you for applying!</h1>
  //     <p>Dear ${application.primaryFounder},</p>
  //     <p>We've received your application to Intelligence Academy's Spring 2026 cohort.</p>
  //     <p>Application ID: ${application.id}</p>
  //     <p>We'll review your submission within 2 weeks.</p>
  //   `
  // };
  
  // await sgMail.send(msg);
}

// Helper function to save to database (implement with your database)
async function saveToDatabase(application) {
  // Example implementation with Supabase
  // const { createClient } = require('@supabase/supabase-js');
  // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  
  // const { data, error } = await supabase
  //   .from('applications')
  //   .insert([application]);
  
  // if (error) throw error;
  // return data;
}