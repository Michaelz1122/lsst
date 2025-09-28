'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Clock, 
  HardDrive, 
  Cloud,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Settings,
  Play,
  Pause,
  Trash2,
  Archive
} from 'lucide-react'

interface Backup {
  id: string
  name: string
  type: 'full' | 'incremental' | 'database' | 'files'
  size: string
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled'
  createdAt: string
  description: string
  location: string
}

interface BackupSchedule {
  id: string
  name: string
  frequency: 'daily' | 'weekly' | 'monthly'
  time: string
  enabled: boolean
  type: 'full' | 'incremental'
  nextRun: string
  retention: number
}

export default function BackupPage() {
  const [backups, setBackups] = useState<Backup[]>([])
  const [schedules, setSchedules] = useState<BackupSchedule[]>([])
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBackups()
    fetchSchedules()
  }, [])

  const fetchBackups = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/backup')
      if (!response.ok) throw new Error('Failed to fetch backups')
      
      const data = await response.json()
      setBackups(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch backups')
    } finally {
      setLoading(false)
    }
  }

  const fetchSchedules = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/backup/schedules')
      if (!response.ok) throw new Error('Failed to fetch backup schedules')
      
      const data = await response.json()
      setSchedules(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch backup schedules')
    } finally {
      setLoading(false)
    }
  }

  const createBackup = async (type: 'full' | 'incremental' | 'database' | 'files') => {
    try {
      setIsCreatingBackup(true)
      setBackupProgress(0)
      
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })

      if (!response.ok) throw new Error('Failed to create backup')

      // Simulate progress
      const interval = setInterval(() => {
        setBackupProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsCreatingBackup(false)
            fetchBackups() // Refresh the list
            return 100
          }
          return prev + 10
        })
      }, 200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create backup')
      setIsCreatingBackup(false)
      setBackupProgress(0)
    }
  }

  const deleteBackup = async (backupId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/backup/${backupId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete backup')

      setBackups(backups.filter(b => b.id !== backupId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete backup')
    } finally {
      setLoading(false)
    }
  }

  const downloadBackup = (backupId: string) => {
    window.open(`/api/admin/backup/${backupId}`, '_blank')
  }

  const toggleSchedule = (scheduleId: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, enabled: !schedule.enabled }
        : schedule
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white'
      case 'in_progress': return 'bg-blue-500 text-white'
      case 'failed': return 'bg-red-500 text-white'
      case 'scheduled': return 'bg-yellow-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in_progress': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return <Database className="w-5 h-5" />
      case 'incremental': return <Archive className="w-5 h-5" />
      case 'database': return <HardDrive className="w-5 h-5" />
      case 'files': return <FileText className="w-5 h-5" />
      default: return <Database className="w-5 h-5" />
    }
  }

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily'
      case 'weekly': return 'Weekly'
      case 'monthly': return 'Monthly'
      default: return frequency
    }
  }

  const backupStats = {
    totalBackups: backups.length,
    successfulBackups: backups.filter(b => b.status === 'completed').length,
    failedBackups: backups.filter(b => b.status === 'failed').length,
    totalSize: backups.reduce((total, backup) => {
      const size = parseFloat(backup.size)
      const unit = backup.size.match(/[A-Za-z]+$/)?.[0] || 'MB'
      return total + size
    }, 0).toFixed(1) + ' GB'
  }

  if (loading && backups.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading backups...</p>
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
                Backup Manager
              </h1>
              <p className="text-gray-200 mt-2">Create, schedule, and manage system backups</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => createBackup('full')}
                disabled={isCreatingBackup}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Database className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Backup Progress */}
        {isCreatingBackup && (
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Creating Backup...</h3>
                <span className="text-sm text-gray-200">{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2 bg-gray-700" />
              <p className="text-sm text-gray-200 mt-2">Please wait while your backup is being created...</p>
            </CardContent>
          </Card>
        )}

        {/* Backup Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Backups</CardTitle>
              <Database className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.totalBackups}</div>
              <p className="text-xs text-gray-200">
                Backup files created
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Successful</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.successfulBackups}</div>
              <p className="text-xs text-gray-200">
                Completed backups
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.failedBackups}</div>
              <p className="text-xs text-gray-200">
                Failed backups
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Size</CardTitle>
              <HardDrive className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.totalSize}</div>
              <p className="text-xs text-gray-200">
                Storage used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Backups */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Recent Backups
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Latest backup operations and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400">
                          {getTypeIcon(backup.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{backup.name}</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-200">
                              {backup.type}
                            </Badge>
                            <Badge className={getStatusColor(backup.status)}>
                              {backup.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-200">
                            {backup.size} • {backup.location} • {new Date(backup.createdAt).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {backup.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {backup.status === 'completed' && (
                          <Button 
                            onClick={() => downloadBackup(backup.id)}
                            variant="outline" 
                            size="sm" 
                            className="border-gray-600"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          onClick={() => deleteBackup(backup.id)}
                          disabled={loading}
                          variant="outline" 
                          size="sm" 
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backup Schedules */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Backup Schedules
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Automated backup schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{schedule.name}</h4>
                        <div className="text-xs text-gray-200">
                          {getFrequencyText(schedule.frequency)} at {schedule.time}
                        </div>
                        <div className="text-xs text-gray-500">
                          Next: {schedule.nextRun} • Retention: {schedule.retention} days
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={schedule.enabled}
                          onCheckedChange={() => toggleSchedule(schedule.id)}
                        />
                        <Button variant="outline" size="sm" className="border-gray-600">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Button
            onClick={() => createBackup('full')}
            disabled={isCreatingBackup}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <Database className="w-6 h-6" />
              <span>Full Backup</span>
            </div>
          </Button>
          <Button
            onClick={() => createBackup('database')}
            disabled={isCreatingBackup}
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <HardDrive className="w-6 h-6" />
              <span>Database</span>
            </div>
          </Button>
          <Button
            onClick={() => createBackup('files')}
            disabled={isCreatingBackup}
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span>Files</span>
            </div>
          </Button>
          <Button
            onClick={() => createBackup('incremental')}
            disabled={isCreatingBackup}
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <Archive className="w-6 h-6" />
              <span>Incremental</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}