@echo off
echo 🚀 Setting up Email Sender Application...

echo 📦 Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo 📦 Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy "env.example" ".env"
    echo ✅ .env file created. Please edit it with your email configuration.
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit the .env file with your email configuration
echo 2. For Gmail users: Enable 2FA and generate an App Password
echo 3. Run 'npm run dev' to start the application
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
pause 