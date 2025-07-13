# Mailgun Quick Setup Guide

A simplified guide to get Mailgun working with the Intelligence Academy form submissions.

## 📧 Mailgun Side (10 minutes)

### 1. Create Account
- Go to [Mailgun.com](https://www.mailgun.com) → Sign up
- Verify your email address
- **Free tier**: 1,000 emails/month included

### 2. Get Your API Key
- Dashboard → **Settings** → **API Keys**
- Copy your **Private API Key** (starts with `key-`)
- Save it somewhere safe

### 3. Add Your Domain (Optional but recommended)
- Dashboard → **Sending** → **Domains** → **Add New Domain**
- Enter: `iamunicorn.org`
- **OR** use Mailgun's sandbox domain for testing (limited to 5 authorized recipients)

#### For Sandbox (Quick Testing):
- Go to **Sending** → **Domain Settings**
- Find your sandbox domain (like `sandbox123abc.mailgun.org`)
- Add authorized recipients in **Authorized Recipients** section
- Add your admin email addresses here

#### For Custom Domain (Production):
- Follow Mailgun's DNS setup instructions
- Add the provided DNS records to your domain
- Wait 24-48 hours for DNS propagation
- Click **Verify DNS Settings**

## 💻 Website Side (5 minutes)

### 1. Create Environment File
Create `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

### 2. Add Your Credentials
Edit `.env` and add:

```env
# Mailgun Configuration
MAILGUN_API_KEY=key-YOUR-ACTUAL-KEY-HERE
MAILGUN_DOMAIN=iamunicorn.org
# OR for sandbox testing:
# MAILGUN_DOMAIN=sandbox123abc.mailgun.org

# Admin email(s) - comma separated for multiple
ADMIN_EMAIL=your-email@example.com
```

### 3. Update Frontend Code
In `src/pages/ApplyPage.jsx`, change line 106:

```javascript
// Change from:
const response = await fetch('/api/submit-application-simple', {

// To:
const response = await fetch('/api/submit-application-mailgun', {
```

### 4. Install Dependencies
```bash
npm install
```

## ✅ Testing

1. **Submit a test application** through your form
2. **Check your email** for both applicant and admin emails
3. **Check Mailgun dashboard** → **Sending** → **Logs** to see sent emails

## 🚀 That's It!

Your form will now:
- Send a detailed confirmation email to applicants with all their submitted info
- Send a beautifully formatted admin email for easy review
- Save a backup copy locally in `/applications/` directory

## 🔧 Troubleshooting

### Emails not sending?
1. **Check API key** is correct (no extra spaces)
2. **Sandbox domain?** Make sure recipient emails are authorized
3. **Check logs** in Mailgun dashboard for errors

### Using sandbox domain?
- Limited to 5 authorized recipients
- Must add each email in Mailgun dashboard first
- Emails will have "sent from sandbox" warning

### Want custom domain?
- Add DNS records as instructed by Mailgun
- Wait for verification (usually 24-48 hours)
- Better deliverability and no recipient limits

## 📞 Need Help?

- **Mailgun Docs**: [documentation.mailgun.com](https://documentation.mailgun.com)
- **Check logs**: Mailgun Dashboard → Sending → Logs
- **Test mode**: Use sandbox domain first, upgrade to custom domain later