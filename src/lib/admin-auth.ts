import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

export interface AdminUser {
  id: string
  username: string
  role: string
}

// Admin credentials (in production, use database with hashed passwords)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin@example.com',
  // Plain text password for simple comparison (in production, use bcrypt)
  password: process.env.ADMIN_PASSWORD || 'admin123456'
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateJWT(user: AdminUser): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyJWT(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser
    return decoded
  } catch (error) {
    return null
  }
}

export async function authenticate(username: string, password: string): Promise<AdminUser | null> {
  // For now, use simple comparison (in production, use database with bcrypt)
  if (username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password) {
    return {
      id: '1',
      username: username,
      role: 'admin'
    }
  }
  return null
}

export function createAuthResponse(user: AdminUser) {
  const token = generateJWT(user)
  
  const response = new Response(JSON.stringify({ success: true, user }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    }
  })
  
  return response
}

export function clearAuthResponse() {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_token=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Path=/; Max-Age=0`
    }
  })
  
  return response
}

export function getUserFromRequest(request: Request): AdminUser | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null
  
  const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/)
  if (!tokenMatch) return null
  
  const token = tokenMatch[1]
  return verifyJWT(token)
}