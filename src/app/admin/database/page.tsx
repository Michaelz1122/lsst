'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { 
  Database, 
  Table as TableIcon, 
  Trash2, 
  Edit, 
  Eye, 
  Download, 
  Upload, 
  RefreshCw, 
  Search,
  Filter,
  BarChart3,
  Users,
  FileText,
  Settings,
  Code,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Calendar,
  Hash
} from 'lucide-react'

interface DatabaseRecord {
  id: string
  [key: string]: any
}

interface TableInfo {
  name: string
  displayName: string
  description: string
  recordCount: number
  columns: Array<{
    name: string
    type: string
    isRequired: boolean
    isUnique: boolean
  }>
  icon: React.ReactNode
  color: string
}

export default function DatabaseManagementPage() {
  const [selectedTable, setSelectedTable] = useState<string>('admins')
  const [records, setRecords] = useState<DatabaseRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const [selectedRecord, setSelectedRecord] = useState<DatabaseRecord | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState<Record<string, any>>({})

  // Mock table information based on the Prisma schema
  const tableInfo: TableInfo[] = [
    {
      name: 'admins',
      displayName: 'Admin Users',
      description: 'Administrator accounts and credentials',
      recordCount: 1,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'email', type: 'String', isRequired: true, isUnique: true },
        { name: 'password', type: 'String', isRequired: true, isUnique: false },
        { name: 'name', type: 'String', isRequired: true, isUnique: false },
        { name: 'role', type: 'String', isRequired: false, isUnique: false },
        { name: 'isActive', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'lastLoginAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      name: 'content',
      displayName: 'Content',
      description: 'Website content and text management',
      recordCount: 15,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'key', type: 'String', isRequired: true, isUnique: true },
        { name: 'title', type: 'String', isRequired: true, isUnique: false },
        { name: 'content', type: 'String', isRequired: true, isUnique: false },
        { name: 'type', type: 'String', isRequired: true, isUnique: false },
        { name: 'page', type: 'String', isRequired: false, isUnique: false },
        { name: 'section', type: 'String', isRequired: false, isUnique: false },
        { name: 'isActive', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      name: 'pages',
      displayName: 'Pages',
      description: 'Website pages and their content',
      recordCount: 8,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'title', type: 'String', isRequired: true, isUnique: false },
        { name: 'slug', type: 'String', isRequired: true, isUnique: true },
        { name: 'content', type: 'String', isRequired: true, isUnique: false },
        { name: 'seoTitle', type: 'String', isRequired: false, isUnique: false },
        { name: 'seoDescription', type: 'String', isRequired: false, isUnique: false },
        { name: 'seoKeywords', type: 'String', isRequired: false, isUnique: false },
        { name: 'isPublished', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      name: 'themes',
      displayName: 'Themes',
      description: 'Website themes and styling configurations',
      recordCount: 3,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'name', type: 'String', isRequired: true, isUnique: false },
        { name: 'description', type: 'String', isRequired: false, isUnique: false },
        { name: 'isActive', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'settings', type: 'String', isRequired: true, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <Settings className="w-5 h-5" />,
      color: 'bg-pink-500'
    },
    {
      name: 'ai_tools',
      displayName: 'AI Tools',
      description: 'AI-powered tools and configurations',
      recordCount: 12,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'name', type: 'String', isRequired: true, isUnique: false },
        { name: 'description', type: 'String', isRequired: false, isUnique: false },
        { name: 'inputFields', type: 'String', isRequired: true, isUnique: false },
        { name: 'prompt', type: 'String', isRequired: true, isUnique: false },
        { name: 'llmSettings', type: 'String', isRequired: true, isUnique: false },
        { name: 'testInterface', type: 'String', isRequired: true, isUnique: false },
        { name: 'isActive', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'bg-indigo-500'
    },
    {
      name: 'scripts',
      displayName: 'Scripts',
      description: 'Tracking scripts, pixels, and custom code',
      recordCount: 5,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'name', type: 'String', isRequired: true, isUnique: false },
        { name: 'code', type: 'String', isRequired: true, isUnique: false },
        { name: 'type', type: 'String', isRequired: true, isUnique: false },
        { name: 'placement', type: 'String', isRequired: true, isUnique: false },
        { name: 'isGlobal', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'pageId', type: 'String', isRequired: false, isUnique: false },
        { name: 'conditions', type: 'String', isRequired: false, isUnique: false },
        { name: 'isActive', type: 'Boolean', isRequired: false, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <Code className="w-5 h-5" />,
      color: 'bg-yellow-500'
    },
    {
      name: 'settings',
      displayName: 'Settings',
      description: 'Application settings and configuration',
      recordCount: 25,
      columns: [
        { name: 'id', type: 'String', isRequired: true, isUnique: true },
        { name: 'key', type: 'String', isRequired: true, isUnique: true },
        { name: 'value', type: 'String', isRequired: true, isUnique: false },
        { name: 'createdAt', type: 'DateTime', isRequired: false, isUnique: false },
        { name: 'updatedAt', type: 'DateTime', isRequired: false, isUnique: false }
      ],
      icon: <Settings className="w-5 h-5" />,
      color: 'bg-gray-500'
    }
  ]

  // Mock data for demonstration
  const mockData: Record<string, DatabaseRecord[]> = {
    admins: [
      {
        id: '1',
        email: 'Michaelzahy1@gmail.com',
        password: '********',
        name: 'Michael Zahy',
        role: 'admin',
        isActive: true,
        lastLoginAt: '2024-01-20T14:30:25Z',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ],
    content: [
      {
        id: '1',
        key: 'home_hero_title',
        title: 'Home Hero Title',
        content: 'Welcome to Our Amazing Platform',
        type: 'text',
        page: 'home',
        section: 'hero',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        key: 'home_hero_description',
        title: 'Home Hero Description',
        content: 'Discover the power of our cutting-edge solutions designed to transform your business.',
        type: 'text',
        page: 'home',
        section: 'hero',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
    ],
    pages: [
      {
        id: '1',
        title: 'Home',
        slug: '/',
        content: '{"blocks":[{"type":"heading","content":"Welcome to Our Website","props":{"level":1}}]}',
        seoTitle: 'Home - Our Website',
        seoDescription: 'Welcome to our amazing website homepage',
        seoKeywords: 'home, welcome, website',
        isPublished: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ],
    themes: [
      {
        id: '1',
        name: 'Default Theme',
        description: 'Clean and modern default theme',
        isActive: true,
        settings: '{"primaryColor":"#6366f1","secondaryColor":"#8b5cf6","font":"Inter"}',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ],
    ai_tools: [
      {
        id: '1',
        name: 'Content Generator',
        description: 'Generate high-quality content using AI',
        inputFields: '[{"name":"topic","type":"text","required":true}]',
        prompt: 'Generate a comprehensive article about {topic}',
        llmSettings: '{"model":"gpt-4","temperature":0.7}',
        testInterface: '{}',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ],
    scripts: [
      {
        id: '1',
        name: 'Google Analytics',
        code: '<!-- Google Analytics script -->',
        type: 'analytics',
        placement: 'head',
        isGlobal: true,
        pageId: null,
        conditions: null,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ],
    settings: [
      {
        id: '1',
        key: 'site_title',
        value: '"Our Amazing Website"',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      },
      {
        id: '2',
        key: 'site_description',
        value: '"Welcome to our amazing website"',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:25Z'
      }
    ]
  }

  useEffect(() => {
    loadRecords()
  }, [selectedTable])

  const loadRecords = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRecords(mockData[selectedTable] || [])
      setLoading(false)
    }, 500)
  }

  const handleViewRecord = (record: DatabaseRecord) => {
    setSelectedRecord(record)
    setIsViewDialogOpen(true)
  }

  const handleEditRecord = (record: DatabaseRecord) => {
    setSelectedRecord(record)
    setEditForm({ ...record })
    setIsEditDialogOpen(true)
  }

  const handleSaveRecord = () => {
    // In a real app, this would make an API call
    setRecords(records.map(r => r.id === selectedRecord?.id ? { ...r, ...editForm } : r))
    setIsEditDialogOpen(false)
    setSelectedRecord(null)
  }

  const handleDeleteRecord = (recordId: string) => {
    // In a real app, this would make an API call
    setRecords(records.filter(r => r.id !== recordId))
  }

  const handleExportTable = () => {
    // In a real app, this would export the table data
    const dataStr = JSON.stringify(records, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedTable}_export.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredRecords = records.filter(record =>
    Object.values(record).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const currentTable = tableInfo.find(table => table.name === selectedTable)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)

  const formatValue = (value: any, columnName: string) => {
    if (value === null || value === undefined) return '-'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (columnName.includes('password')) return '********'
    if (typeof value === 'object') return JSON.stringify(value)
    return value.toString()
  }

  const getColumnTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      'String': 'bg-blue-100 text-blue-800',
      'Boolean': 'bg-green-100 text-green-800',
      'DateTime': 'bg-purple-100 text-purple-800',
      'Int': 'bg-yellow-100 text-yellow-800'
    }
    return (
      <Badge className={typeColors[type] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
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
                Database Management
              </h1>
              <p className="text-gray-200 mt-2">Manage and monitor your database tables and records</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={loadRecords}
                className="bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={handleExportTable}
                className="bg-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Database Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Tables</CardTitle>
              <Database className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{tableInfo.length}</div>
              <p className="text-xs text-gray-200">
                Database tables
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Records</CardTitle>
              <Hash className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tableInfo.reduce((sum, table) => sum + table.recordCount, 0)}
              </div>
              <p className="text-xs text-gray-200">
                Across all tables
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Current Table</CardTitle>
              <TableIcon className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{currentTable?.recordCount || 0}</div>
              <p className="text-xs text-gray-200">
                Records in {selectedTable}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Records</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {records.filter(r => r.isActive !== false).length}
              </div>
              <p className="text-xs text-gray-200">
                Active records
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Tables
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Select a table to manage its records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tableInfo.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => {
                        setSelectedTable(table.name)
                        setCurrentPage(1)
                        setSearchTerm('')
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedTable === table.name
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-gray-700/50 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${table.color}`}>
                          {table.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{table.displayName}</div>
                          <div className="text-xs text-gray-200">{table.recordCount} records</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Content */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TableIcon className="w-5 h-5" />
                      {currentTable?.displayName}
                    </CardTitle>
                    <CardDescription className="text-gray-200">
                      {currentTable?.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-4 h-4" />
                      <Input
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 border-gray-600 text-white w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border border-gray-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-700">
                            {currentTable?.columns.slice(0, 5).map((column) => (
                              <TableHead key={column.name} className="text-gray-200">
                                {column.name}
                              </TableHead>
                            ))}
                            <TableHead className="text-gray-200 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentRecords.map((record) => (
                            <TableRow key={record.id} className="border-gray-700">
                              {currentTable?.columns.slice(0, 5).map((column) => (
                                <TableCell key={column.name} className="text-gray-200">
                                  <div className="max-w-xs truncate">
                                    {formatValue(record[column.name], column.name)}
                                  </div>
                                </TableCell>
                              ))}
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleViewRecord(record)}
                                    className="text-blue-400"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEditRecord(record)}
                                    className="text-green-400"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-gray-800 border-gray-700">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">
                                          Delete Record
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-gray-200">
                                          Are you sure you want to delete this record? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="border-gray-600 text-gray-200">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteRecord(record.id)}
                                          className="bg-red-600"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-200">
                          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="border-gray-600 text-gray-200"
                          >
                            Previous
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="border-gray-600 text-gray-200"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table Schema */}
        <Card className="bg-gray-800/50 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Table Schema
            </CardTitle>
            <CardDescription className="text-gray-200">
              Column structure for {currentTable?.displayName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentTable?.columns.map((column) => (
                <div key={column.name} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{column.name}</h4>
                    {getColumnTypeBadge(column.type)}
                  </div>
                  <div className="flex gap-2">
                    {column.isRequired && (
                      <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                        Required
                      </Badge>
                    )}
                    {column.isUnique && (
                      <Badge variant="outline" className="border-blue-600 text-blue-400 text-xs">
                        Unique
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Record Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">View Record</DialogTitle>
              <DialogDescription className="text-gray-200">
                Record details from {currentTable?.displayName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRecord && Object.entries(selectedRecord).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-200 font-medium">{key}:</span>
                  <span className="text-white">
                    {formatValue(value, key)}
                  </span>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
                className="border-gray-600 text-gray-200"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Record Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Record</DialogTitle>
              <DialogDescription className="text-gray-200">
                Edit record in {currentTable?.displayName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {currentTable?.columns.map((column) => (
                <div key={column.name}>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    {column.name}
                    {column.isRequired && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  <Input
                    value={editForm[column.name] || ''}
                    onChange={(e) => setEditForm({ ...editForm, [column.name]: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    disabled={column.name === 'id' || column.name.includes('password')}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-gray-600 text-gray-200"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveRecord}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}