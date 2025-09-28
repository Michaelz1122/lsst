'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Globe, 
  Calendar, 
  Shield, 
  Settings,
  Bell,
  Lock,
  Key,
  Camera,
  Edit,
  Save,
  Activity,
  CheckCircle,
  Clock,
  Database,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'viewer' | 'user'
  avatar?: string
  phone?: string
  location?: string
  company?: string
  website?: string
  bio?: string
  joinDate: string
  lastLogin: string
  settings: {
    emailNotifications: boolean
    twoFactorAuth: boolean
    language: string
    timezone: string
    theme: 'light' | 'dark' | 'auto'
  }
  security: {
    passwordLastChanged: string
    twoFactorEnabled: boolean
    loginAttempts: number
    lastPasswordChange: string
  }
  activity: {
    totalLogins: number
    thisMonthLogins: number
    lastActivity: string
    devices: Array<{
      id: string
      name: string
      type: string
      lastActive: string
      location: string
    }>
  }
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)

  // Mock data for demonstration
  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      email: 'Michaelzahy1@gmail.com',
      firstName: 'Michael',
      lastName: 'Zahy',
      role: 'admin',
      avatar: '/avatars/admin.jpg',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      company: 'Tech Solutions',
      website: 'https://techsolutions.com',
      bio: 'Experienced system administrator and full-stack developer with expertise in web technologies, security, and team leadership.',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20 14:30:25',
      settings: {
        emailNotifications: true,
        twoFactorAuth: true,
        language: 'en',
        timezone: 'America/New_York',
        theme: 'dark'
      },
      security: {
        passwordLastChanged: '2024-01-10',
        twoFactorEnabled: true,
        loginAttempts: 0,
        lastPasswordChange: '2024-01-10'
      },
      activity: {
        totalLogins: 1247,
        thisMonthLogins: 45,
        lastActivity: '2024-01-20 14:30:25',
        devices: [
          {
            id: '1',
            name: 'Chrome on Windows',
            type: 'desktop',
            lastActive: '2024-01-20 14:30:25',
            location: 'New York, USA'
          },
          {
            id: '2',
            name: 'Safari on iPhone',
            type: 'mobile',
            lastActive: '2024-01-19 18:45:10',
            location: 'New York, USA'
          },
          {
            id: '3',
            name: 'Chrome on MacBook',
            type: 'desktop',
            lastActive: '2024-01-18 09:20:15',
            location: 'Home Office'
          }
        ]
      }
    }

    setProfile(mockProfile)
    setEditedProfile(mockProfile)
  }, [])

  const saveProfile = () => {
    if (editedProfile) {
      setProfile(editedProfile)
      setIsEditing(false)
    }
  }

  const cancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500 text-white'
      case 'editor': return 'bg-blue-500 text-white'
      case 'viewer': return 'bg-green-500 text-white'
      case 'user': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      default: return <Monitor className="w-4 h-4" />
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Profile Settings
              </h1>
              <p className="text-gray-200 mt-2">Manage your account settings and preferences</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={cancelEdit}
                    variant="outline"
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveProfile}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Overview */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} alt={profile.firstName} />
                  <AvatarFallback className="bg-purple-600 text-white text-2xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex gap-3">
                      <Input
                        value={editedProfile?.firstName || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, firstName: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="First name"
                      />
                      <Input
                        value={editedProfile?.lastName || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, lastName: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Last name"
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                  )}
                  <Badge className={getRoleColor(profile.role)}>
                    {profile.role}
                  </Badge>
                </div>
                
                {isEditing ? (
                  <Input
                    value={editedProfile?.email || ''}
                    onChange={(e) => setEditedProfile(prev => prev ? {...prev, email: e.target.value} : null)}
                    className="bg-gray-700 border-gray-600 text-white mb-3"
                    placeholder="Email"
                  />
                ) : (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-200 mb-3">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                )}
                
                {isEditing ? (
                  <Textarea
                    value={editedProfile?.bio || ''}
                    onChange={(e) => setEditedProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Bio"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-200 mb-4">{profile.bio}</p>
                )}
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined: {profile.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Last login: {profile.lastLogin}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile?.phone || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, phone: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-200">
                        <Phone className="w-4 h-4" />
                        {profile.phone || 'Not provided'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile?.location || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, location: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Location"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-200">
                        <MapPin className="w-4 h-4" />
                        {profile.location || 'Not provided'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile?.company || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, company: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Company"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-200">
                        <Building className="w-4 h-4" />
                        {profile.company || 'Not provided'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile?.website || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, website: e.target.value} : null)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Website URL"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-gray-200">
                        <Globe className="w-4 h-4" />
                        {profile.website ? (
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-400">
                            {profile.website}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Account Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Total Logins</span>
                    <span className="text-lg font-semibold text-white">{profile.activity.totalLogins}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">This Month</span>
                    <span className="text-lg font-semibold text-white">{profile.activity.thisMonthLogins}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Member Since</span>
                    <span className="text-sm text-gray-200">{profile.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Account Status</span>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Security Settings */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">Two-Factor Authentication</span>
                      <p className="text-xs text-gray-200">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={editedProfile?.settings.twoFactorAuth || false}
                      onCheckedChange={(checked) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, twoFactorAuth: checked}
                      } : null)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">Email Notifications</span>
                      <p className="text-xs text-gray-200">Receive security alerts</p>
                    </div>
                    <Switch
                      checked={editedProfile?.settings.emailNotifications || false}
                      onCheckedChange={(checked) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, emailNotifications: checked}
                      } : null)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600"
                      disabled={!isEditing}
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Information */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Password Last Changed</span>
                    <span className="text-sm text-gray-200">{profile.security.passwordLastChanged}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Two-Factor Status</span>
                    <Badge className={profile.security.twoFactorEnabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                      {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Failed Login Attempts</span>
                    <span className="text-sm text-gray-200">{profile.security.loginAttempts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Account Security</span>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Good
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Sessions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Active Sessions
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Devices currently logged into your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.activity.devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{device.name}</div>
                          <div className="text-sm text-gray-200">{device.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-200">Last active</div>
                        <div className="text-sm text-gray-200">{device.lastActive}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400"
                    disabled={!isEditing}
                  >
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Preferences */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <Select
                      value={editedProfile?.settings.language || 'en'}
                      onValueChange={(value) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, language: value}
                      } : null)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <Select
                      value={editedProfile?.settings.timezone || 'America/New_York'}
                      onValueChange={(value) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, timezone: value}
                      } : null)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                        <SelectItem value="Europe/Paris">CET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <Select
                      value={editedProfile?.settings.theme || 'dark'}
                      onValueChange={(value: any) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, theme: value}
                      } : null)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">Email Notifications</span>
                      <p className="text-xs text-gray-200">Receive email updates</p>
                    </div>
                    <Switch
                      checked={editedProfile?.settings.emailNotifications || false}
                      onCheckedChange={(checked) => setEditedProfile(prev => prev ? {
                        ...prev,
                        settings: {...prev.settings, emailNotifications: checked}
                      } : null)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">Security Alerts</span>
                      <p className="text-xs text-gray-200">Important security notifications</p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">System Updates</span>
                      <p className="text-xs text-gray-200">Platform update notifications</p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-200">Marketing Emails</span>
                      <p className="text-xs text-gray-200">Product updates and news</p>
                    </div>
                    <Switch disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Your recent account activity and login history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      action: 'Profile updated',
                      timestamp: '2024-01-20 14:30:25',
                      device: 'Chrome on Windows',
                      location: 'New York, USA'
                    },
                    {
                      action: 'Password changed',
                      timestamp: '2024-01-10 09:15:30',
                      device: 'Chrome on Windows',
                      location: 'New York, USA'
                    },
                    {
                      action: 'Two-factor enabled',
                      timestamp: '2024-01-05 16:45:12',
                      device: 'Safari on iPhone',
                      location: 'New York, USA'
                    },
                    {
                      action: 'Security settings updated',
                      timestamp: '2024-01-01 11:20:45',
                      device: 'Chrome on MacBook',
                      location: 'Home Office'
                    },
                    {
                      action: 'Account created',
                      timestamp: '2023-01-15 10:00:00',
                      device: 'Chrome on Windows',
                      location: 'New York, USA'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{activity.action}</div>
                          <div className="text-sm text-gray-200">{activity.device} • {activity.location}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-200">
                        {activity.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}