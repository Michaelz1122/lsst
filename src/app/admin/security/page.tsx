'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Users,
  Database,
  Network,
  FileText,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react'

interface SecurityLog {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  user: string
  ip: string
  action: string
}

interface SecuritySetting {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'authentication' | 'data' | 'network' | 'general'
  value?: string | number | boolean
}

interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  expiryDays: number
}

interface SecurityStats {
  totalEvents: number
  successfulLogins: number
  failedAttempts: number
  securityScore: number
}

export default function SecurityPage() {
  const [logs, setLogs] = useState<SecurityLog[]>([])
  const [settings, setSettings] = useState<SecuritySetting[]>([])
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>({
    minLength: 12,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90
  })
  const [securityStats, setSecurityStats] = useState<SecurityStats>({
    totalEvents: 0,
    successfulLogins: 0,
    failedAttempts: 0,
    securityScore: 0
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [filterLevel, setFilterLevel] = useState<string>('')
  const [filterAction, setFilterAction] = useState<string>('')
  const [scanResults, setScanResults] = useState<any>(null)
  const [scanning, setScanning] = useState(false)

  // Fetch security data
  useEffect(() => {
    fetchSecurityData()
  }, [filterLevel, filterAction])

  const fetchSecurityData = async () => {
    try {
      setLoading(true)
      
      // Fetch security settings
      const settingsResponse = await fetch('/api/admin/security/settings')
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json()
        setSettings(settingsData.settings)
        setPasswordPolicy(settingsData.passwordPolicy)
      }

      // Fetch security logs
      const logsParams = new URLSearchParams()
      if (filterLevel) logsParams.append('level', filterLevel)
      if (filterAction) logsParams.append('action', filterAction)
      
      const logsResponse = await fetch(`/api/admin/security/logs?${logsParams}`)
      if (logsResponse.ok) {
        const logsData = await logsResponse.json()
        setLogs(logsData.logs)
        setSecurityStats(logsData.stats)
      }
    } catch (error) {
      console.error('Error fetching security data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSetting = async (settingId: string) => {
    try {
      setSaving(true)
      
      const updatedSettings = settings.map(setting => 
        setting.id === settingId 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
      
      setSettings(updatedSettings)
      
      // Save to API
      const response = await fetch('/api/admin/security/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          settings: updatedSettings,
          passwordPolicy 
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving security settings:', error)
      // Revert on error
      setSettings(settings)
    } finally {
      setSaving(false)
    }
  }

  const updatePasswordPolicy = async (field: keyof PasswordPolicy, value: any) => {
    try {
      setSaving(true)
      
      const updatedPolicy = { ...passwordPolicy, [field]: value }
      setPasswordPolicy(updatedPolicy)
      
      // Save to API
      const response = await fetch('/api/admin/security/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          settings,
          passwordPolicy: updatedPolicy 
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save password policy')
      }
    } catch (error) {
      console.error('Error saving password policy:', error)
      // Revert on error
      setPasswordPolicy(passwordPolicy)
    } finally {
      setSaving(false)
    }
  }

  const runSecurityScan = async () => {
    try {
      setScanning(true)
      
      const response = await fetch('/api/admin/security/scan', {
        method: 'POST'
      })
      
      if (response.ok) {
        const scanData = await response.json()
        setScanResults(scanData)
        setActiveTab('scan')
        
        // Refresh data after scan
        fetchSecurityData()
      } else {
        throw new Error('Failed to run security scan')
      }
    } catch (error) {
      console.error('Error running security scan:', error)
    } finally {
      setScanning(false)
    }
  }

  const exportLogs = async () => {
    try {
      const response = await fetch('/api/admin/security/logs')
      if (response.ok) {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `security-logs-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error exporting logs:', error)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-500 text-white'
      case 'warning': return 'bg-yellow-500 text-white'
      case 'error': return 'bg-red-500 text-white'
      case 'info': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'info': return <Eye className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Key className="w-5 h-5" />
      case 'data': return <Database className="w-5 h-5" />
      case 'network': return <Network className="w-5 h-5" />
      case 'general': return <Settings className="w-5 h-5" />
      default: return <Shield className="w-5 h-5" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading security data...</p>
        </div>
      </div>
    )
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
                Security Center
              </h1>
              <p className="text-gray-200 mt-2">Monitor and manage your website security settings and logs</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-600"
                onClick={fetchSecurityData}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="border-gray-600"
                onClick={exportLogs}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
              <Button
                onClick={runSecurityScan}
                disabled={scanning}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Shield className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
                {scanning ? 'Scanning...' : 'Run Scan'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Security Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(securityStats.securityScore)}`}>
                {securityStats.securityScore}%
              </div>
              <p className="text-xs text-gray-200">
                Overall security health
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Events</CardTitle>
              <FileText className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.totalEvents}</div>
              <p className="text-xs text-gray-200">
                Security events logged
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Successful Logins</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.successfulLogins}</div>
              <p className="text-xs text-gray-200">
                Authentication successes
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Failed Attempts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.failedAttempts}</div>
              <p className="text-xs text-gray-200">
                Blocked attempts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="scan">Security Scan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Security Logs */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Recent Security Events
                    </CardTitle>
                    <CardDescription className="text-gray-200">
                      Latest security activities and events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {logs.slice(0, 10).map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={getLevelColor(log.level)}>
                              {getLevelIcon(log.level)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{log.message}</span>
                                <Badge variant="outline" className="border-gray-600 text-gray-200">
                                  {log.action}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-200">
                                {log.user} • {log.ip} • {log.timestamp}
                              </div>
                            </div>
                          </div>
                          <Badge className={getLevelColor(log.level)}>
                            {log.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Settings */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Quick Settings
                    </CardTitle>
                    <CardDescription className="text-gray-200">
                      Key security controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.slice(0, 6).map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-purple-400">
                              {getCategoryIcon(setting.category)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm">{setting.name}</h4>
                              <p className="text-xs text-gray-200">{setting.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={() => toggleSetting(setting.id)}
                            disabled={saving}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Security Logs
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Comprehensive security event logging
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <select
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white"
                    >
                      <option value="">All Levels</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <select
                      value={filterAction}
                      onChange={(e) => setFilterAction(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white"
                    >
                      <option value="">All Actions</option>
                      <option value="login">Login</option>
                      <option value="failed_login">Failed Login</option>
                      <option value="password_change">Password Change</option>
                      <option value="settings_update">Settings Update</option>
                      <option value="security_scan">Security Scan</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={getLevelColor(log.level)}>
                          {getLevelIcon(log.level)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{log.message}</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-200">
                              {log.action}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-200">
                            {log.user} • {log.ip} • {log.timestamp}
                          </div>
                        </div>
                      </div>
                      <Badge className={getLevelColor(log.level)}>
                        {log.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Configure security options and protections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {settings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-purple-400">
                            {getCategoryIcon(setting.category)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">{setting.name}</h4>
                            <p className="text-xs text-gray-200">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={() => toggleSetting(setting.id)}
                          disabled={saving}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Password Policy */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Password Policy
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Configure password requirements and policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Minimum Length</span>
                    <Input
                      type="number"
                      value={passwordPolicy.minLength}
                      onChange={(e) => updatePasswordPolicy('minLength', parseInt(e.target.value))}
                      className="w-20 bg-gray-700 border-gray-600 text-white"
                      disabled={saving}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Require Uppercase</span>
                    <Switch
                      checked={passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) => updatePasswordPolicy('requireUppercase', checked)}
                      disabled={saving}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Require Numbers</span>
                    <Switch
                      checked={passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) => updatePasswordPolicy('requireNumbers', checked)}
                      disabled={saving}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Require Special Characters</span>
                    <Switch
                      checked={passwordPolicy.requireSpecialChars}
                      onCheckedChange={(checked) => updatePasswordPolicy('requireSpecialChars', checked)}
                      disabled={saving}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">Password Expiry (days)</span>
                    <Input
                      type="number"
                      value={passwordPolicy.expiryDays}
                      onChange={(e) => updatePasswordPolicy('expiryDays', parseInt(e.target.value))}
                      className="w-20 bg-gray-700 border-gray-600 text-white"
                      disabled={saving}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Scan Results
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Comprehensive security analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scanResults ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(scanResults.overallScore)}`}>
                        {scanResults.overallScore}%
                      </div>
                      <p className="text-gray-200 mt-2">Overall Security Score</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Scanned by {scanResults.scannedBy} on {new Date(scanResults.timestamp).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid gap-6">
                      {scanResults.results.map((category: any, index: number) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">{category.category}</h3>
                          <div className="space-y-3">
                            {category.checks.map((check: any, checkIndex: number) => (
                              <div key={checkIndex} className="flex items-start justify-between p-3 bg-gray-600/50 rounded">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                    {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                                    {check.status === 'fail' && <XCircle className="w-4 h-4 text-red-400" />}
                                    <span className="text-white font-medium">{check.name}</span>
                                  </div>
                                  <p className="text-sm text-gray-200">{check.message}</p>
                                  {check.recommendation && (
                                    <p className="text-xs text-gray-400 mt-1">
                                      💡 {check.recommendation}
                                    </p>
                                  )}
                                </div>
                                <Badge className={
                                  check.status === 'pass' ? 'bg-green-500' :
                                  check.status === 'warning' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }>
                                  {check.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-200 mb-4">No security scan results available</p>
                    <Button onClick={runSecurityScan} disabled={scanning}>
                      <Shield className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
                      {scanning ? 'Scanning...' : 'Run Security Scan'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}