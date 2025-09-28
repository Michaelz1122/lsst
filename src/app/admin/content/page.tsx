'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Edit, Eye, Trash2, FileText, Type, ImageIcon, Video, Hash } from 'lucide-react'
import Link from 'next/link'

interface ContentItem {
  id: string
  type: 'text' | 'heading' | 'paragraph' | 'image' | 'video' | 'button' | 'link'
  content: string
  page: string
  pageId: string
  section: string
  lastModified: string
  status: 'published' | 'draft'
}

interface Page {
  id: string
  title: string
  slug: string
  contentCount: number
  lastModified: string
}

export default function AdminContent() {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Home Page',
      slug: '/',
      contentCount: 8,
      lastModified: '2024-01-20'
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      contentCount: 6,
      lastModified: '2024-01-18'
    },
    {
      id: '3',
      title: 'Services',
      slug: '/services',
      contentCount: 12,
      lastModified: '2024-01-19'
    },
    {
      id: '4',
      title: 'Contact',
      slug: '/contact',
      contentCount: 4,
      lastModified: '2024-01-17'
    }
  ])

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'heading',
      content: 'Welcome to Our Website',
      page: 'Home Page',
      pageId: '1',
      section: 'Hero Section',
      lastModified: '2024-01-20',
      status: 'published'
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'We provide amazing services that help businesses grow and succeed in the digital world.',
      page: 'Home Page',
      pageId: '1',
      section: 'Hero Section',
      lastModified: '2024-01-20',
      status: 'published'
    },
    {
      id: '3',
      type: 'heading',
      content: 'Our Services',
      page: 'Home Page',
      pageId: '1',
      section: 'Services Section',
      lastModified: '2024-01-19',
      status: 'published'
    },
    {
      id: '4',
      type: 'paragraph',
      content: 'Learn about our company history and mission to provide the best services.',
      page: 'About Us',
      pageId: '2',
      section: 'About Section',
      lastModified: '2024-01-18',
      status: 'published'
    },
    {
      id: '5',
      type: 'text',
      content: 'Call us: +1 (555) 123-4567',
      page: 'Contact',
      pageId: '4',
      section: 'Contact Info',
      lastModified: '2024-01-17',
      status: 'published'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPage, setSelectedPage] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.section.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPage = selectedPage === 'all' || item.pageId === selectedPage
    const matchesType = selectedType === 'all' || item.type === selectedType
    
    return matchesSearch && matchesPage && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heading': return <Hash className="h-4 w-4" />
      case 'paragraph': return <FileText className="h-4 w-4" />
      case 'text': return <Type className="h-4 w-4" />
      case 'image': return <ImageIcon className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <Type className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'heading': 'default',
      'paragraph': 'secondary',
      'text': 'outline',
      'image': 'secondary',
      'video': 'outline',
      'button': 'default',
      'link': 'outline'
    }
    
    return (
      <Badge variant={variants[type] || 'outline'} className="text-xs">
        {type}
      </Badge>
    )
  }

  const handleEdit = (content: ContentItem) => {
    setEditingContent(content)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editingContent) {
      setContentItems(contentItems.map(item => 
        item.id === editingContent.id ? editingContent : item
      ))
      setIsEditing(false)
      setEditingContent(null)
    }
  }

  const handleDelete = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Edit any text or content element on any page
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/page-builder">
            <Plus className="mr-2 h-4 w-4" />
            Build New Page
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">All Content</TabsTrigger>
          <TabsTrigger value="pages">Pages Overview</TabsTrigger>
          <TabsTrigger value="search">Search & Replace</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Content</CardTitle>
              <CardDescription>
                Find specific content items by page, type, or search term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Search Content</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Filter by Page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger>
                      <SelectValue placeholder="All pages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      {pages.map(page => (
                        <SelectItem key={page.id} value={page.id}>
                          {page.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Filter by Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="heading">Heading</SelectItem>
                      <SelectItem value="paragraph">Paragraph</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="button">Button</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Content Items ({filteredContent.length})</CardTitle>
              <CardDescription>
                Click on any content item to edit it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          {getTypeBadge(item.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {item.content.length > 80 
                            ? `${item.content.substring(0, 80)}...` 
                            : item.content
                          }
                        </div>
                      </TableCell>
                      <TableCell>{item.page}</TableCell>
                      <TableCell>{item.section}</TableCell>
                      <TableCell>{item.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/page-builder?page=${item.pageId}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredContent.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4" />
                  <p>No content items found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pages Overview</CardTitle>
              <CardDescription>
                Manage all pages and their content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Content Items</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{page.contentCount} items</Badge>
                      </TableCell>
                      <TableCell>{page.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/page-builder?page=${page.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={page.slug} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search & Replace</CardTitle>
              <CardDescription>
                Find and replace text across all pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="searchText">Search For</Label>
                    <Input
                      id="searchText"
                      placeholder="Enter text to search for..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replaceText">Replace With</Label>
                    <Input
                      id="replaceText"
                      placeholder="Enter replacement text..."
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Search</Button>
                  <Button variant="outline">Replace All</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Content Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Make changes to your content item
            </DialogDescription>
          </DialogHeader>
          
          {editingContent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(editingContent.type)}
                    {getTypeBadge(editingContent.type)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Page</Label>
                  <div className="text-sm text-muted-foreground">{editingContent.page}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentText">Content</Label>
                <Textarea
                  id="contentText"
                  value={editingContent.content}
                  onChange={(e) => setEditingContent({ 
                    ...editingContent, 
                    content: e.target.value 
                  })}
                  rows={6}
                  placeholder="Enter content..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={editingContent.section}
                  onChange={(e) => setEditingContent({ 
                    ...editingContent, 
                    section: e.target.value 
                  })}
                  placeholder="Section name..."
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}