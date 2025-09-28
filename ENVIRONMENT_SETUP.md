# Environment Configuration Setup

This document explains how to configure your application's environment variables through the admin dashboard.

## Overview

The application now includes a user-friendly interface in the admin dashboard that allows you to set up essential environment variables without needing direct server access or editing configuration files manually.

## Accessing the Configuration

1. Log in to your admin dashboard at `/admin/login`
2. Navigate to **Environment Config** in the sidebar menu (under the Database section)

## Required Environment Variables

### 1. Admin Credentials
- **ADMIN_USERNAME**: Your admin login email address
- **ADMIN_PASSWORD**: Your admin password (minimum 8 characters)
- **JWT_SECRET**: Secret key for authentication tokens (minimum 16 characters)

### 2. Email Configuration
- **EMAIL_USER**: Your email address for sending notifications
- **EMAIL_PASS**: Your email password or app password

## Setup Instructions

### Step 1: Admin Credentials

1. **Admin Username**: Enter your email address (e.g., `admin@example.com`)
2. **Admin Password**: Create a secure password (minimum 8 characters)
   - Use the "Generate" button to create a strong random password
3. **JWT Secret**: Generate a secure secret key
   - Use the "Generate" button to create a cryptographically secure random string
   - This should be at least 16 characters long

### Step 2: Email Configuration

#### For Gmail Users:
1. Enable 2-Factor Authentication on your Google Account
2. Go to Google Account → Security → App Passwords
3. Generate a new App Password for "Mail" on "Other (custom name)"
4. Use this App Password in the EMAIL_PASS field

#### For Other Email Providers:
1. Use your email address and password
2. Ensure SMTP access is enabled for your account
3. Some providers may require app-specific passwords

### Step 3: Save Configuration

1. Fill in all required fields
2. Click "Save Configuration"
3. **Important**: You will need to restart the server for changes to take effect

## Security Features

### Password Visibility
- Toggle "Show passwords and secrets" to view/hide sensitive information
- Passwords are hidden by default for security

### Validation
- Email format validation
- Password strength requirements (minimum 8 characters)
- JWT secret strength requirements (minimum 16 characters)
- All fields are required

### Status Monitoring
- Real-time status display showing which variables are configured
- Visual indicators (green checkmarks for configured, red alerts for missing)

## Server Restart

After saving your configuration, you'll need to restart the server. Since you don't have direct server access, you have two options:

### Option 1: Automatic Restart (If Available)
- Some hosting platforms provide automatic restart after configuration changes
- Check if your hosting platform has this feature

### Option 2: Contact Support
- Contact your hosting provider or development team
- Request a server restart to apply the new environment variables

## Troubleshooting

### Common Issues

1. **Email Not Working**
   - Verify you're using an App Password for Gmail
   - Check that 2FA is enabled
   - Ensure the email address is correct

2. **Admin Login Not Working**
   - Verify the JWT_SECRET is properly set
   - Ensure passwords meet minimum length requirements
   - Check that the server has been restarted

3. **Configuration Not Applied**
   - Ensure all fields are filled out
   - Verify the server has been restarted
   - Check for any error messages during save

### Error Messages

- **"Missing required fields"**: All fields must be filled out
- **"Invalid email format"**: Check your email address format
- **"Password must be at least 8 characters"**: Use a longer password
- **"JWT_SECRET must be at least 16 characters"**: Use a longer secret

## Best Practices

1. **Use Strong Passwords**: Always use the generate buttons for secure random strings
2. **Regular Updates**: Periodically update your passwords and secrets
3. **Backup Configuration**: Keep a record of your configuration in a secure location
4. **Monitor Status**: Regularly check the configuration status page

## Support

If you encounter any issues with the environment configuration:
1. Check the error messages in the admin dashboard
2. Verify all fields are correctly filled
3. Ensure the server has been properly restarted
4. Contact your development team if problems persist

---

**Note**: This configuration interface is designed to be secure and user-friendly. All sensitive information is handled with appropriate security measures, and passwords are never displayed unless explicitly requested.