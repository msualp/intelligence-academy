# Mailgun Email Setup Guide

This guide will help you set up Mailgun for sending application emails.

## 1. Create a Mailgun Account

1. Go to [Mailgun.com](https://www.mailgun.com)
2. Sign up for a free account (includes 1,000 emails/month free)
3. Verify your email address

## 2. Add Your Domain

1. In Mailgun dashboard, go to **Sending → Domains**
2. Click **Add New Domain**
3. Enter your domain: `iamunicorn.org`
4. Choose region (US or EU)
5. Follow the DNS setup instructions

### DNS Records to Add

Mailgun will provide you with records like:

```
Type: TXT
Name: iamunicorn.org
Value: v=spf1 include:mailgun.org ~all

Type: TXT  
Name: k1._domainkey.iamunicorn.org
Value: k=rsa; p=MIGfMA0GCSq...

Type: CNAME
Name: email.iamunicorn.org
Value: mailgun.org

Type: MX (Priority 10)
Name: iamunicorn.org
Value: mxa.mailgun.org

Type: MX (Priority 10)
Name: iamunicorn.org
Value: mxb.mailgun.org
```

## 3. Verify Domain

1. After adding DNS records, wait 24-48 hours
2. Click **Verify DNS Settings** in Mailgun
3. All records should show green checkmarks

## 4. Get API Credentials

1. Go to **Settings → API Keys**
2. Copy your **Private API Key** (starts with `key-`)
3. Note your domain name (e.g., `iamunicorn.org`)

## 5. Configure Environment

Create a `.env` file in your project root:

```bash
# Mailgun Configuration
MAILGUN_API_KEY=key-your-actual-api-key-here
MAILGUN_DOMAIN=iamunicorn.org
MAILGUN_API_URL=https://api.mailgun.net

# Admin email(s) - comma separated for multiple
ADMIN_EMAIL=admin@iamunicorn.org,admissions@iamunicorn.org
```

## 6. Update Your Code

In `src/pages/ApplyPage.jsx`, change the API endpoint:

```javascript
// Change from:
const response = await fetch('/api/submit-application-simple', {

// To:
const response = await fetch('/api/submit-application-mailgun', {
```

## 7. Test Email Sending

1. Submit a test application through the form
2. Check both applicant and admin emails
3. Check Mailgun logs at **Sending → Logs**

## 8. Mailgun Dashboard Features

- **Logs**: See all sent emails and their status
- **Analytics**: Track open rates and clicks
- **Suppressions**: Manage bounces and unsubscribes
- **Templates**: Create reusable email templates

## Production Checklist

- [ ] Domain verified with proper DNS records
- [ ] SPF, DKIM, and DMARC configured
- [ ] API key stored securely in environment variables
- [ ] Email templates tested and formatted correctly
- [ ] Admin email addresses confirmed
- [ ] Bounce handling configured
- [ ] Monthly email volume within plan limits

## Troubleshooting

### Emails not sending
- Check API key is correct
- Verify domain is active in Mailgun
- Check logs for error messages
- Ensure you're not in sandbox mode

### Going to spam
- Complete domain verification
- Add SPF and DKIM records
- Use a subdomain for transactional emails (e.g., mail.iamunicorn.org)
- Avoid spam trigger words

### Rate limits
- Free tier: 1,000 emails/month
- Flex tier: Pay as you go ($0.80/1,000 emails)
- Check current usage in dashboard

## Email Best Practices

1. **From Address**: Use `noreply@iamunicorn.org` or `applications@iamunicorn.org`
2. **Reply-To**: Set to a monitored email if you want replies
3. **Subject Lines**: Keep clear and relevant
4. **Content**: Balance text and HTML, avoid spam triggers
5. **Testing**: Always test with multiple email providers

## Support

- Mailgun Documentation: https://documentation.mailgun.com
- API Reference: https://documentation.mailgun.com/en/latest/api_reference.html
- Support: support@mailgun.com