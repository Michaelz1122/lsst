import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, budget, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }

    // Get email configuration from environment variables
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error('Email configuration missing:', { EMAIL_USER: !!EMAIL_USER, EMAIL_PASS: !!EMAIL_PASS })
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    // Create transporter with better configuration
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('Transporter verified successfully')
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service configuration error. Please check email settings.' },
        { status: 500 }
      )
    }

    // Email content with better styling
    const mailOptions = {
      from: `"Michael Zahy Portfolio" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Portfolio Website Contact</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h2>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px;">Name:</span>
                    <span style="color: #1e293b;">${name}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px;">Email:</span>
                    <span style="color: #1e293b;">${email}</span>
                  </div>
                  
                  ${phone ? `
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px;">Phone:</span>
                    <span style="color: #1e293b;">${phone}</span>
                  </div>
                  ` : ''}
                  
                  ${company ? `
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px;">Company:</span>
                    <span style="color: #1e293b;">${company}</span>
                  </div>
                  ` : ''}
                  
                  ${budget ? `
                  <div style="display: flex; align-items: center;">
                    <span style="font-weight: 600; color: #475569; min-width: 80px;">Budget:</span>
                    <span style="color: #1e293b;">${budget}</span>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px;">
                <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message</h2>
                <p style="color: #475569; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 14px;">
                This message was sent from your portfolio website contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.
              </p>
              <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
                Click "Reply" to respond directly to ${email}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Auto-reply email with better styling
    const autoReplyOptions = {
      from: `"Michael Zahy" <${EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Contacting Michael Zahy - Performance Marketing Expert',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Thank You for Contacting Michael Zahy</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Reaching Out!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">I've received your message and will be in touch soon</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px; text-align: center;">Hello ${name},</h2>
                <p style="color: #475569; line-height: 1.7; margin: 0 0 20px 0; font-size: 16px;">
                  Thank you for contacting me! I appreciate you taking the time to reach out and I'm excited to learn more about your project.
                </p>
                <p style="color: #475569; line-height: 1.7; margin: 0 0 20px 0; font-size: 16px;">
                  I typically respond to all inquiries within <strong>24-48 hours</strong> during business days. If your matter is urgent, please feel free to follow up with a phone call.
                </p>
                <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 16px;">
                  In the meantime, feel free to browse my portfolio and learn more about the services I offer:
                </p>
              </div>
              
              <!-- Services Preview -->
              <div style="background-color: #f1f5f9; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; text-align: center;">My Services Include:</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                  <div style="text-align: center; padding: 15px; background-color: white; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: 600; margin-bottom: 5px;">Meta Ads</div>
                    <div style="color: #64748b; font-size: 14px;">Facebook & Instagram</div>
                  </div>
                  <div style="text-align: center; padding: 15px; background-color: white; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: 600; margin-bottom: 5px;">Performance Marketing</div>
                    <div style="color: #64748b; font-size: 14px;">ROI-Focused Campaigns</div>
                  </div>
                  <div style="text-align: center; padding: 15px; background-color: white; border-radius: 8px;">
                    <div style="color: #667eea; font-weight: 600; margin-bottom: 5px;">Growth Hacking</div>
                    <div style="color: #64748b; font-size: 14px;">Scalable Strategies</div>
                  </div>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
                <h3 style="margin: 0 0 15px 0; font-size: 20px;">Get in Touch</h3>
                <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Email:</strong> ${EMAIL_USER}</p>
                ${phone ? `<p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Phone:</strong> Available upon request</p>` : ''}
                <p style="margin: 0; font-size: 16px;"><strong>Response Time:</strong> 24-48 hours</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #1e293b; font-size: 16px;">Michael Zahy</strong>
              </p>
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                Performance Marketing Expert | Media Buyer | Growth Strategist
              </p>
              <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 11px;">
                This is an automated response. Your original message has been received and will be reviewed shortly.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send both emails with error handling
    try {
      // Send main email to admin
      await transporter.sendMail(mailOptions)
      console.log('Main email sent successfully')

      // Send auto-reply to sender
      await transporter.sendMail(autoReplyOptions)
      console.log('Auto-reply email sent successfully')

      return NextResponse.json(
        { 
          message: 'Email sent successfully! You will receive an auto-reply confirmation shortly.',
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later or contact directly via email.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}