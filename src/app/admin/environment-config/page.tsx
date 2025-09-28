'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Key, Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

interface EnvConfig {
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
  JWT_SECRET: string
  EMAIL_USER: string
  EMAIL_PASS: string
}

interface ConfigStatus {
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
  JWT_SECRET: string
  EMAIL_USER: string
  EMAIL_PASS: string
}

export default function EnvironmentConfigPage() {
  const [config, setConfig] = useState<EnvConfig>({
    ADMIN_USERNAME: '',
    ADMIN_PASSWORD: '',
    JWT_SECRET: '',
    EMAIL_USER: '',
    EMAIL_PASS: ''
  })
  
  const [status, setStatus] = useState<ConfigStatus>({
    ADMIN_USERNAME: '[NOT SET]',
    ADMIN_PASSWORD: '[NOT SET]',
    JWT_SECRET: '[NOT SET]',
    EMAIL_USER: '[NOT SET]',
    EMAIL_PASS: '[NOT SET]'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  // Fetch current configuration status
  const fetchConfigStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/config')
      if (response.ok) {
        const data = await response.json()
        setStatus(data.config)
      } else {
        toast.error('Failed to fetch configuration status')
      }
    } catch (error) {
      console.error('Error fetching config:', error)
      toast.error('Failed to fetch configuration status')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigStatus()
  }, [])

  const handleInputChange = (field: keyof EnvConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates: config })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        
        if (data.requiresRestart) {
          toast.info('Please restart the server for changes to take effect', {
            duration: 5000
          })
        }
        
        // Refresh status after save
        await fetchConfigStatus()
      } else {
        toast.error(data.error || 'Failed to save configuration')
      }
    } catch (error) {
      console.error('Error saving config:', error)
      toast.error('Failed to save configuration')
    } finally {
      setIsSaving(false)
    }
  }

  const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateSecurePassword = () => {
    return generateRandomString(16)
  }

  const generateJWTSecret = () => {
    return generateRandomString(32)
  }

  const isConfigured = (field: string) => {
    return status[field as keyof ConfigStatus] === '[SET]'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Environment Configuration
          </h1>
          <p className="text-gray-400 mt-2">
            Configure essential environment variables for your application
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchConfigStatus}
          disabled={isLoading}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Status
        </Button>
      </div>

      {/* Configuration Status */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-purple-400" />
            Current Configuration Status
          </CardTitle>
          <CardDescription className="text-gray-400">
            Overview of your current environment variable settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(status).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-sm font-medium text-gray-300">
                  {key.replace(/_/g, ' ')}
                </span>
                <Badge variant={value === '[SET]' ? 'default' : 'secondary'}>
                  {value === '[SET]' ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Configured
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not Set
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Form */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Environment Variables</CardTitle>
          <CardDescription className="text-gray-400">
            Set up your application configuration. All fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-gray-300">
              <strong>Important:</strong> After saving these values, you will need to restart the server for the changes to take effect.
            </AlertDescription>
          </Alert>

          {/* Admin Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Admin Credentials</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminUsername" className="text-gray-300">
                  Admin Username (Email)
                </Label>
                <Input
                  id="adminUsername"
                  type="email"
                  value={config.ADMIN_USERNAME}
                  onChange={(e) => handleInputChange('ADMIN_USERNAME', e.target.value)}
                  placeholder="admin@example.com"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword" className="text-gray-300">
                  Admin Password
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="adminPassword"
                    type={showPasswords ? 'text' : 'password'}
                    value={config.ADMIN_PASSWORD}
                    onChange={(e) => handleInputChange('ADMIN_PASSWORD', e.target.value)}
                    placeholder="Enter secure password"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('ADMIN_PASSWORD', generateSecurePassword())}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white whitespace-nowrap"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* JWT Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Security Configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="jwtSecret" className="text-gray-300">
                JWT Secret
              </Label>
              <div className="flex gap-2">
                <Input
                  id="jwtSecret"
                  type={showPasswords ? 'text' : 'password'}
                  value={config.JWT_SECRET}
                  onChange={(e) => handleInputChange('JWT_SECRET', e.target.value)}
                  placeholder="Enter JWT secret"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('JWT_SECRET', generateJWTSecret())}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white whitespace-nowrap"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>

          {/* Email Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Email Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emailUser" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="emailUser"
                  type="email"
                  value={config.EMAIL_USER}
                  onChange={(e) => handleInputChange('EMAIL_USER', e.target.value)}
                  placeholder="your-email@gmail.com"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailPass" className="text-gray-300">
                  Email Password / App Password
                </Label>
                <Input
                  id="emailPass"
                  type={showPasswords ? 'text' : 'password'}
                  value={config.EMAIL_PASS}
                  onChange={(e) => handleInputChange('EMAIL_PASS', e.target.value)}
                  placeholder="Enter email password"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-gray-300">
                <strong>Gmail Users:</strong> You need to use an App Password instead of your regular password. 
                Enable 2FA and generate an App Password in your Google Account settings.
              </AlertDescription>
            </Alert>
          </div>

          {/* Show Passwords Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
            />
            <Label htmlFor="showPasswords" className="text-gray-300">
              Show passwords and secrets
            </Label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving || !Object.values(config).every(value => value.trim() !== '')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}