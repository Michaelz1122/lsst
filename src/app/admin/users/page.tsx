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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Globe,
  Lock,
  Key,
  Bell,
  Database
} from 'lucide-react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'viewer' | 'user'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  avatar?: string
  phone?: string
  location?: string
  company?: string
  website?: string
  bio?: string
  lastLogin?: string
  createdAt: string
  updatedAt: string
  permissions: string[]
  settings: {
    emailNotifications: boolean
    twoFactorAuth: boolean
    language: string
    timezone: string
  }
}

interface UserActivity {
  id: string
  userId: string
  action: string
  timestamp: string
  ip: string
  device: string
  location: string
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('users')
  
  // Create user form state
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user' as const,
    password: ''
  })

  // Load users from API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (response.ok) {
          const apiUsers = await response.json()
          
          // Transform API users to match the interface
          const transformedUsers: User[] = apiUsers.map((apiUser: any) => ({
            id: apiUser.id,
            email: apiUser.email,
            firstName: apiUser.name.split(' ')[0] || '',
            lastName: apiUser.name.split(' ').slice(1).join(' ') || '',
            role: apiUser.role,
            status: apiUser.isActive ? 'active' : 'inactive',
            lastLogin: apiUser.lastLoginAt,
            createdAt: apiUser.createdAt,
            updatedAt: apiUser.updatedAt,
            permissions: getPermissionsForRole(apiUser.role),
            settings: {
              emailNotifications: true,
              twoFactorAuth: false,
              language: 'en',
              timezone: 'UTC'
            }
          }))
          
          setUsers(transformedUsers)
        } else {
          console.error('Failed to fetch users')
          // Fallback to mock data
          setUsers(mockUsers)
          setActivities(mockActivities)
        }
      } catch (error) {
        console.error('Error loading users:', error)
        // Fallback to mock data
        setUsers(mockUsers)
        setActivities(mockActivities)
      }
    }
    
    loadUsers()
  }, [])

  // Helper function to get permissions based on role
  const getPermissionsForRole = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ['manage_users', 'manage_content', 'manage_settings', 'view_analytics']
      case 'editor':
        return ['manage_content', 'edit_pages', 'upload_media']
      case 'viewer':
        return ['view_content']
      default:
        return ['view_content']
    }
  }

  // Mock data for fallback
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      status: 'active',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      company: 'Tech Corp',
      website: 'https://techcorp.com',
      bio: 'System administrator with 10+ years of experience',
      lastLogin: '2024-01-20 14:30:25',
      createdAt: '2023-01-15',
      updatedAt: '2024-01-20',
      permissions: ['manage_users', 'manage_content', 'manage_settings', 'view_analytics'],
      settings: {
        emailNotifications: true,
        twoFactorAuth: true,
        language: 'en',
        timezone: 'America/New_York'
      }
    },
    {
      id: '2',
      email: 'editor@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'editor',
      status: 'active',
      phone: '+1 234 567 8901',
      location: 'Los Angeles, USA',
      company: 'Media Co',
      website: 'https://mediaco.com',
      bio: 'Content editor and writer',
      lastLogin: '2024-01-20 12:15:10',
      createdAt: '2023-03-20',
      updatedAt: '2024-01-18',
      permissions: ['manage_content', 'edit_pages', 'upload_media'],
      settings: {
        emailNotifications: true,
        twoFactorAuth: false,
        language: 'en',
        timezone: 'America/Los_Angeles'
      }
    },
    {
      id: '3',
      email: 'viewer@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      role: 'viewer',
      status: 'inactive',
      phone: '+1 234 567 8902',
      location: 'Chicago, USA',
      company: 'Consulting Ltd',
      createdAt: '2023-06-10',
      updatedAt: '2024-01-10',
      permissions: ['view_content'],
      settings: {
        emailNotifications: false,
        twoFactorAuth: false,
        language: 'en',
        timezone: 'America/Chicago'
      }
    },
    {
      id: '4',
      email: 'user@example.com',
      firstName: 'Alice',
      lastName: 'Brown',
      role: 'user',
      status: 'pending',
      phone: '+1 234 567 8903',
      location: 'Houston, USA',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      permissions: ['view_content'],
      settings: {
        emailNotifications: true,
        twoFactorAuth: false,
        language: 'en',
        timezone: 'America/Houston'
      }
    }
  ]

  const mockActivities: UserActivity[] = [
    {
      id: '1',
      userId: '1',
      action: 'User login',
      timestamp: '2024-01-20 14:30:25',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'New York, USA'
    },
    {
      id: '2',
      userId: '2',
      action: 'Updated content',
      timestamp: '2024-01-20 12:15:10',
      ip: '192.168.1.101',
      device: 'Safari on macOS',
      location: 'Los Angeles, USA'
    },
    {
      id: '3',
      userId: '1',
      action: 'Changed user settings',
      timestamp: '2024-01-20 10:45:30',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'New York, USA'
    },
    {
      id: '4',
      userId: '3',
      action: 'Failed login attempt',
      timestamp: '2024-01-19 18:20:15',
      ip: '192.168.1.102',
      device: 'Firefox on Linux',
      location: 'Chicago, USA'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white'
      case 'inactive': return 'bg-gray-500 text-white'
      case 'pending': return 'bg-yellow-500 text-white'
      case 'suspended': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
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

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/admin/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: updatedUser.email,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          role: updatedUser.role,
          isActive: updatedUser.status === 'active'
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Update the user in the local state
          setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
          setSelectedUser(updatedUser)
          setIsEditing(false)
          // Show success message
          alert('User updated successfully!')
        } else {
          alert('Failed to update user: ' + result.message)
        }
      } else {
        alert('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user. Please try again.')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Remove the user from local state
          setUsers(users.filter(user => user.id !== userId))
          if (selectedUser?.id === userId) {
            setSelectedUser(null)
          }
          // Show success message
          alert('User deleted successfully!')
        } else {
          alert('Failed to delete user: ' + result.message)
        }
      } else {
        alert('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user. Please try again.')
    }
  }

  const toggleUserStatus = async (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          isActive: newStatus === 'active'
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Update the user in local state
          setUsers(users.map(u => 
            u.id === userId 
              ? { ...u, status: newStatus as const }
              : u
          ))
        } else {
          alert('Failed to update user status: ' + result.message)
        }
      } else {
        alert('Failed to update user status')
      }
    } catch (error) {
      console.error('Error updating user status:', error)
      alert('Error updating user status. Please try again.')
    }
  }

  const createUser = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          name: `${newUser.firstName} ${newUser.lastName}`,
          role: newUser.role
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Add the new user to local state
          const createdUser: User = {
            id: result.user.id,
            email: result.user.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: result.user.role,
            status: 'active',
            createdAt: result.user.createdAt,
            updatedAt: result.user.updatedAt,
            permissions: getPermissionsForRole(result.user.role),
            settings: {
              emailNotifications: true,
              twoFactorAuth: false,
              language: 'en',
              timezone: 'UTC'
            }
          }
          
          setUsers([...users, createdUser])
          // Reset form and hide modal
          setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            role: 'user',
            password: ''
          })
          const modal = document.getElementById('createUserModal')
          if (modal) modal.classList.add('hidden')
          // Show success message
          alert('User created successfully!')
        } else {
          alert('Failed to create user: ' + result.message)
        }
      } else {
        const errorData = await response.json()
        alert('Failed to create user: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Error creating user. Please try again.')
    }
  }

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length
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
                User Management
              </h1>
              <p className="text-gray-200 mt-2">Manage users, roles, permissions, and monitor activity</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                className="border-gray-600"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button
                onClick={() => {
                  const modal = document.getElementById('createUserModal')
                  if (modal) modal.classList.remove('hidden')
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </motion.div>

        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.total}</div>
              <p className="text-xs text-gray-200">
                Registered users
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.active}</div>
              <p className="text-xs text-gray-200">
                Currently active
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Inactive Users</CardTitle>
              <XCircle className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.inactive}</div>
              <p className="text-xs text-gray-200">
                Not active
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Pending Users</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.pending}</div>
              <p className="text-xs text-gray-200">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Roles & Permissions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Users ({filteredUsers.length})
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Manage and monitor all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.firstName} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-medium">{user.firstName} {user.lastName}</h3>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-200">
                            {user.email} • {user.company || 'No company'} • Last login: {user.lastLogin || 'Never'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsEditing(true)
                          }}
                          className="border-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                          className="border-gray-600"
                        >
                          {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                          className="border-red-600 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  User Activity Log
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Monitor user actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => {
                    const user = users.find(u => u.id === activity.userId)
                    return (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.avatar} alt={user?.firstName} />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {user?.firstName[0]}{user?.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{user?.firstName} {user?.lastName}</span>
                              <Badge variant="outline" className="border-gray-600 text-gray-200">
                                {activity.action}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-200">
                              {activity.device} • {activity.location} • {activity.ip}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-200">
                          {activity.timestamp}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Roles & Permissions
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Configure user roles and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {[
                    {
                      role: 'admin',
                      title: 'Administrator',
                      description: 'Full access to all system features and settings',
                      permissions: ['manage_users', 'manage_content', 'manage_settings', 'view_analytics', 'system_admin'],
                      color: 'bg-purple-600'
                    },
                    {
                      role: 'editor',
                      title: 'Editor',
                      description: 'Can create, edit, and manage content',
                      permissions: ['manage_content', 'edit_pages', 'upload_media', 'publish_content'],
                      color: 'bg-blue-600'
                    },
                    {
                      role: 'viewer',
                      title: 'Viewer',
                      description: 'Can view content and basic analytics',
                      permissions: ['view_content', 'view_analytics'],
                      color: 'bg-green-600'
                    },
                    {
                      role: 'user',
                      title: 'User',
                      description: 'Basic access to view public content',
                      permissions: ['view_content'],
                      color: 'bg-gray-600'
                    }
                  ].map((roleConfig) => (
                    <div key={roleConfig.role} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${roleConfig.color} rounded-lg flex items-center justify-center`}>
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{roleConfig.title}</h3>
                            <p className="text-sm text-gray-200">{roleConfig.description}</p>
                          </div>
                        </div>
                        <Badge className={roleConfig.color}>
                          {roleConfig.role}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {roleConfig.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="border-gray-600 text-gray-200">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    User Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Email Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Two-Factor Authentication</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">User Registration</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Email Verification</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Password Strength</span>
                    <Select defaultValue="high">
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Data Retention (days)</span>
                    <Input
                      type="number"
                      defaultValue="365"
                      className="bg-gray-700 border-gray-600 text-white w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Activity Log Retention</span>
                    <Input
                      type="number"
                      defaultValue="90"
                      className="bg-gray-700 border-gray-600 text-white w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Auto-delete Inactive Users</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">GDPR Compliance</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Data Export Format</span>
                    <Select defaultValue="json">
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create User Modal */}
        <div id="createUserModal" className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New User</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    placeholder="First name"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    placeholder="Last name"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="user@example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value as any})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Password"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={createUser}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Create User
              </Button>
              <Button
                onClick={() => {
                  setNewUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: 'user',
                    password: ''
                  })
                  const modal = document.getElementById('createUserModal')
                  if (modal) modal.classList.add('hidden')
                }}
                variant="outline"
                className="border-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Edit User Modal */}
        {selectedUser && (
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit User: {selectedUser.firstName} {selectedUser.lastName}</DialogTitle>
                <DialogDescription>
                  Update user information, settings, and permissions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input
                        value={selectedUser.firstName}
                        onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input
                        value={selectedUser.lastName}
                        onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        value={selectedUser.phone || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input
                        value={selectedUser.location || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, location: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        value={selectedUser.company || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, company: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <Input
                        value={selectedUser.website || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, website: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <Textarea
                      value={selectedUser.bio || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, bio: e.target.value})}
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Role and Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Role & Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <Select value={selectedUser.role} onValueChange={(value: any) => setSelectedUser({...selectedUser, role: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select value={selectedUser.status} onValueChange={(value: any) => setSelectedUser({...selectedUser, status: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* User Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">Email Notifications</span>
                      <Switch
                        checked={selectedUser.settings.emailNotifications}
                        onCheckedChange={(checked) => setSelectedUser({
                          ...selectedUser,
                          settings: {...selectedUser.settings, emailNotifications: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">Two-Factor Authentication</span>
                      <Switch
                        checked={selectedUser.settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSelectedUser({
                          ...selectedUser,
                          settings: {...selectedUser.settings, twoFactorAuth: checked}
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <Select value={selectedUser.settings.language} onValueChange={(value) => setSelectedUser({
                          ...selectedUser,
                          settings: {...selectedUser.settings, language: value}
                        })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <Select value={selectedUser.settings.timezone} onValueChange={(value) => setSelectedUser({
                          ...selectedUser,
                          settings: {...selectedUser.settings, timezone: value}
                        })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permissions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'manage_users',
                      'manage_content',
                      'manage_settings',
                      'view_analytics',
                      'edit_pages',
                      'upload_media',
                      'publish_content',
                      'system_admin'
                    ].map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedUser.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUser({
                                ...selectedUser,
                                permissions: [...selectedUser.permissions, permission]
                              })
                            } else {
                              setSelectedUser({
                                ...selectedUser,
                                permissions: selectedUser.permissions.filter(p => p !== permission)
                              })
                            }
                          }}
                          className="rounded border-gray-600 bg-gray-700 text-purple-600"
                        />
                        <span className="text-sm text-gray-200">
                          {permission.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => updateUser(selectedUser)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}