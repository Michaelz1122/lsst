import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// Function to update .env.local file
async function updateEnvFile(updates: Record<string, string>) {
  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    // Read existing .env.local file
    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
    } catch (error) {
      // File doesn't exist, create new one
      envContent = '';
    }

    // Parse existing content
    const existingVars: Record<string, string> = {};
    if (envContent) {
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          existingVars[match[1]] = match[2];
        }
      });
    }

    // Merge updates with existing variables
    const updatedVars = { ...existingVars, ...updates };

    // Create new content
    const newContent = Object.entries(updatedVars)
      .filter(([key]) => key !== '') // Skip empty keys
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Write back to file
    await fs.writeFile(envPath, newContent, 'utf-8');

    return true;
  } catch (error) {
    console.error('Error updating .env.local file:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(token, JWT_SECRET);

    // Get current environment variables (without sensitive values)
    const envConfig = {
      ADMIN_USERNAME: process.env.ADMIN_USERNAME ? '[SET]' : '[NOT SET]',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '[SET]' : '[NOT SET]',
      JWT_SECRET: process.env.JWT_SECRET ? '[SET]' : '[NOT SET]',
      EMAIL_USER: process.env.EMAIL_USER ? '[SET]' : '[NOT SET]',
      EMAIL_PASS: process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]',
    };

    return NextResponse.json({ config: envConfig });
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(token, JWT_SECRET);

    const { updates } = await request.json();

    // Validate required fields
    const requiredFields = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
    const missingFields = requiredFields.filter(field => !updates[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.EMAIL_USER)) {
      return NextResponse.json({ 
        error: 'Invalid email format for EMAIL_USER' 
      }, { status: 400 });
    }

    // Validate password strength
    if (updates.ADMIN_PASSWORD.length < 8) {
      return NextResponse.json({ 
        error: 'ADMIN_PASSWORD must be at least 8 characters long' 
      }, { status: 400 });
    }

    // Validate JWT secret strength
    if (updates.JWT_SECRET.length < 16) {
      return NextResponse.json({ 
        error: 'JWT_SECRET must be at least 16 characters long' 
      }, { status: 400 });
    }

    // Update environment file
    const success = await updateEnvFile(updates);

    if (!success) {
      return NextResponse.json({ 
        error: 'Failed to update environment configuration' 
      }, { status: 500 });
    }

    // Note: Environment variables won't be updated until server restart
    // We'll inform the user about this limitation
    return NextResponse.json({ 
      message: 'Configuration updated successfully. Please restart the server for changes to take effect.',
      requiresRestart: true
    });

  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}