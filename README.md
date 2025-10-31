# Forou Mailer

A full-stack email sending application built with React (frontend) and TypeScript/Node.js (backend) using Nodemailer for sending HTML emails with attachments. Powered by letterly LM.

## Features

- ✉️ Send HTML emails with rich formatting
- 📎 Attach multiple files (images, PDFs, documents, etc.)
- 🔐 Secure email authentication
- 🧪 Test email connection before sending
- 📱 Responsive modern UI with Tailwind CSS
- 🔒 Rate limiting and security features
- 📊 Real-time feedback with toast notifications

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for API server
- **Nodemailer** for email sending
- **Multer** for file uploads
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate limiting** for API protection

### Frontend
- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Email account with SMTP access (Gmail, Outlook, etc.)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Email Provider Setup

#### For Gmail Users:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated app password instead of your regular password

#### For Other Providers:
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` on port 587
- **Yahoo**: Use `smtp.mail.yahoo.com` on port 587
- **Custom SMTP**: Configure according to your provider's settings

### 4. Running the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Separate Development Servers
```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run client:dev
```

#### Production Build
```bash
# Build both frontend and backend
npm run build

# Start production server
npm run server:start
```

## Usage

1. **Open the application** in your browser at `http://localhost:3000`

2. **Enter your email credentials**:
   - Email address
   - Password or App Password
   - Click "Test Connection" to verify your credentials

3. **Compose your email**:
   - **To**: Enter recipient email(s) (multiple emails separated by commas)
   - **Subject**: Email subject line
   - **HTML Content**: Write your email in HTML format
   - **Attachments**: Select files to attach (optional)

4. **Send the email** by clicking the "Send Email" button

## API Endpoints

### Email Routes (`/api/email`)

- `POST /test-connection` - Test email credentials
- `POST /send` - Send email with attachments
- `GET /config` - Get email configuration

### Health Check
- `GET /health` - Server health status

## File Upload Support

The application supports the following file types:
- **Images**: JPEG, PNG, GIF
- **Documents**: PDF, TXT, DOC, DOCX
- **Spreadsheets**: XLS, XLSX
- **Maximum file size**: 10MB per file
- **Maximum files**: 10 attachments per email

## Security Features

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **CORS** configuration
- **Input validation** and sanitization
- **File type validation**
- **File size limits**

## Troubleshooting

### Common Issues

1. **"Connection test failed"**
   - Verify your email and password are correct
   - For Gmail, ensure you're using an App Password
   - Check if 2FA is enabled (required for App Passwords)

2. **"Failed to send email"**
   - Check your internet connection
   - Verify recipient email addresses are valid
   - Ensure HTML content is properly formatted

3. **"File upload failed"**
   - Check file size (max 10MB)
   - Verify file type is supported
   - Ensure file is not corrupted

### Gmail Specific Issues

- **"Username and Password not accepted"**: Use App Password instead of regular password
- **"Less secure app access"**: Enable 2FA and use App Password
- **"SMTP authentication failed"**: Check if SMTP is enabled in Gmail settings

## Development

### Project Structure
```
├── src/                    # Backend source code
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript interfaces
│   └── server.ts          # Main server file
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript interfaces
│   │   └── App.tsx        # Main app component
│   └── public/            # Static files
├── dist/                  # Compiled backend code
└── package.json           # Backend dependencies
```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run server:dev` - Start backend in development mode
- `npm run client:dev` - Start frontend in development mode
- `npm run build` - Build both frontend and backend
- `npm run server:build` - Build backend only
- `npm run client:build` - Build frontend only
- `npm run server:start` - Start production backend server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub

---

**Note**: This application is for educational and personal use. For production use, consider additional security measures and email service providers like SendGrid, Mailgun, or AWS SES. 
