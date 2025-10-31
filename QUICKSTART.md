# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
# Windows (PowerShell)
.\setup.ps1

# Windows (Command Prompt)
setup.bat

# Manual installation
npm install
cd client && npm install && cd ..
```

### 2. Configure Email Settings
1. Copy the environment template:
   ```bash
   copy env.example .env
   ```

2. Edit `.env` file with your email provider settings:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   ```

3. **For Gmail users**: Enable 2FA and generate an App Password

### 3. Start the Application
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📧 Using the Application

1. **Enter your email credentials** and test the connection
2. **Fill in the email details**:
   - Recipient(s): `recipient@example.com` (multiple emails separated by commas)
   - Subject: Your email subject
   - HTML Content: Your email in HTML format
   - Attachments: Select files (optional)
3. **Click "Send Email"**

## 🎨 HTML Email Examples

### Simple HTML
```html
<h1>Hello World</h1>
<p>This is a <strong>bold</strong> email with <em>italics</em>.</p>
```

### Styled Email
```html
<div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
    <h1 style="color: #333;">Welcome!</h1>
    <p style="color: #666;">Thank you for using our service.</p>
    <a href="#" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Click Here</a>
</div>
```

## 🔧 Troubleshooting

### Common Issues
- **Connection failed**: Check credentials and use App Password for Gmail
- **Email not sent**: Verify recipient email format
- **File upload failed**: Check file size (max 10MB) and type

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the App Password instead of your regular password

## 📁 Project Structure
```
├── src/                    # Backend (TypeScript)
├── client/                 # Frontend (React)
├── examples/               # Email templates
├── setup.ps1              # PowerShell setup script
├── setup.bat              # Windows setup script
└── README.md              # Full documentation
```

## 🆘 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Review the [examples/](examples/) folder for email templates
- Ensure your email provider allows SMTP access

---

**Happy Email Sending! 📧** 