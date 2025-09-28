'use client'

import { useState, useCallback, useRef } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  MoveUp, 
  MoveDown, 
  Type, 
  Image, 
  Video, 
  Code, 
  FileText,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  Link as LinkIcon,
  Layout,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Download,
  Send,
  BarChart3,
  GripVertical,
  Settings,
  Search,
  Filter
} from 'lucide-react'

interface ContentBlock {
  id: string
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'code' | 'list' | 'quote' | 'button' | 'link' | 'container' | 'columns'
  content: string
  props?: {
    level?: number
    src?: string
    alt?: string
    href?: string
    buttonText?: string
    ordered?: boolean
    language?: string
    columns?: number
    width?: string
    height?: string
  }
  styles?: {
    textAlign?: 'left' | 'center' | 'right'
    fontSize?: string
    color?: string
    backgroundColor?: string
    padding?: string
    margin?: string
    borderRadius?: string
    border?: string
  }
  children?: ContentBlock[]
}

interface PageData {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  featuredImage?: string
  author?: string
  publishDate?: string
  blocks: ContentBlock[]
}

interface Template {
  id: string
  name: string
  description: string
  thumbnail?: string
  blocks: ContentBlock[]
}

const ItemTypes = {
  BLOCK: 'block',
  TOOL: 'tool'
}

const DraggableBlock = ({ 
  block, 
  index, 
  moveBlock, 
  renderBlock, 
  isPreview = false,
  selectedBlock,
  setSelectedBlock 
}: {
  block: ContentBlock
  index: number
  moveBlock: (dragIndex: number, hoverIndex: number) => void
  renderBlock: (block: ContentBlock, isPreview?: boolean) => React.ReactNode
  isPreview?: boolean
  selectedBlock: ContentBlock | null
  setSelectedBlock: (block: ContentBlock) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    hover(item: { id: string; index: number }, monitor) {
      if (!ref.current) return
      
      const dragIndex = item.index
      const hoverIndex = index
      
      if (dragIndex === hoverIndex) return
      
      moveBlock(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ${isDragging ? 'opacity-50' : 'opacity-100'} ${
        selectedBlock?.id === block.id ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => !isPreview && setSelectedBlock(block)}
    >
      {!isPreview && (
        <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <Badge variant="outline" className="text-xs">
            {block.type}
          </Badge>
          <span className="text-xs text-gray-500">
            ID: {block.id}
          </span>
        </div>
      )}
      {renderBlock(block, isPreview)}
    </div>
  )
}

const BlockTools = ({ onAddBlock }: { onAddBlock: (type: ContentBlock['type']) => void }) => {
  const tools = [
    { type: 'heading', icon: Heading1, label: 'Heading', description: 'Add a heading' },
    { type: 'paragraph', icon: Type, label: 'Paragraph', description: 'Add text content' },
    { type: 'image', icon: Image, label: 'Image', description: 'Add an image' },
    { type: 'video', icon: Video, label: 'Video', description: 'Embed a video' },
    { type: 'list', icon: List, label: 'List', description: 'Add a list' },
    { type: 'quote', icon: Quote, label: 'Quote', description: 'Add a blockquote' },
    { type: 'button', icon: Send, label: 'Button', description: 'Add a button' },
    { type: 'link', icon: LinkIcon, label: 'Link', description: 'Add a link' },
    { type: 'code', icon: Code, label: 'Code', description: 'Add code block' },
    { type: 'container', icon: Layout, label: 'Container', description: 'Add a container' },
    { type: 'columns', icon: Layout, label: 'Columns', description: 'Add column layout' },
  ]

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TOOL,
    item: { type: 'tool' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={`space-y-2 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {tools.map((tool) => (
        <Button
          key={tool.type}
          variant="outline"
          className="w-full justify-start h-auto p-3"
          onClick={() => onAddBlock(tool.type as ContentBlock['type'])}
        >
          <tool.icon className="mr-2 h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">{tool.label}</div>
            <div className="text-xs text-muted-foreground">{tool.description}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}

function PageBuilderContent() {
  const [page, setPage] = useState<PageData>({
    id: '1',
    title: 'Home Page',
    slug: '/',
    status: 'draft',
    seoTitle: 'Welcome to Our Website',
    seoDescription: 'Discover amazing content and services',
    seoKeywords: 'website, services, business',
    author: 'Admin',
    publishDate: new Date().toISOString().slice(0, 16),
    blocks: [
      {
        id: '1',
        type: 'heading',
        content: 'Welcome to Our Website',
        props: { level: 1 },
        styles: { textAlign: 'center', fontSize: '2.5rem' }
      },
      {
        id: '2',
        type: 'paragraph',
        content: 'We provide amazing services that help businesses grow and succeed in the digital world. Our team of experts is dedicated to delivering exceptional results.',
        styles: { textAlign: 'center', fontSize: '1.1rem' }
      },
      {
        id: '3',
        type: 'heading',
        content: 'Our Services',
        props: { level: 2 },
        styles: { textAlign: 'center' }
      },
      {
        id: '4',
        type: 'columns',
        content: '',
        props: { columns: 3 },
        children: [
          {
            id: 'col1',
            type: 'container',
            content: '',
            children: [
              {
                id: 'col1h1',
                type: 'heading',
                content: 'Web Development',
                props: { level: 3 }
              },
              {
                id: 'col1p1',
                type: 'paragraph',
                content: 'Custom web development solutions tailored to your needs.'
              }
            ]
          },
          {
            id: 'col2',
            type: 'container',
            content: '',
            children: [
              {
                id: 'col2h1',
                type: 'heading',
                content: 'Digital Marketing',
                props: { level: 3 }
              },
              {
                id: 'col2p1',
                type: 'paragraph',
                content: 'Strategic marketing campaigns to grow your business.'
              }
            ]
          },
          {
            id: 'col3',
            type: 'container',
            content: '',
            children: [
              {
                id: 'col3h1',
                type: 'heading',
                content: 'SEO Optimization',
                props: { level: 3 }
              },
              {
                id: 'col3p1',
                type: 'paragraph',
                content: 'Improve your search engine rankings and visibility.'
              }
            ]
          }
        ]
      }
    ]
  })

  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [blockCounter, setBlockCounter] = useState(100)
  const [saving, setSaving] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Landing Page',
      description: 'Modern landing page template',
      blocks: [
        {
          id: 't1',
          type: 'heading',
          content: 'Welcome to Our Platform',
          props: { level: 1 },
          styles: { textAlign: 'center', fontSize: '3rem' }
        },
        {
          id: 't2',
          type: 'paragraph',
          content: 'Transform your business with our cutting-edge solutions.',
          styles: { textAlign: 'center', fontSize: '1.2rem' }
        }
      ]
    },
    {
      id: '2',
      name: 'Blog Post',
      description: 'Clean blog post layout',
      blocks: [
        {
          id: 't3',
          type: 'heading',
          content: 'Blog Post Title',
          props: { level: 1 }
        },
        {
          id: 't4',
          type: 'paragraph',
          content: 'Your blog post content goes here...'
        }
      ]
    }
  ])

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setPage((prevPage) => {
      const newBlocks = [...prevPage.blocks]
      const draggedBlock = newBlocks[dragIndex]
      newBlocks.splice(dragIndex, 1)
      newBlocks.splice(hoverIndex, 0, draggedBlock)
      return { ...prevPage, blocks: newBlocks }
    })
  }, [])

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block_${blockCounter}`,
      type,
      content: type === 'heading' ? 'New Heading' : 
               type === 'paragraph' ? 'Enter your text here...' :
               type === 'button' ? 'Click Me' :
               type === 'link' ? 'Link Text' :
               type === 'columns' ? 'Column Layout' : '',
      props: type === 'heading' ? { level: 2 } : 
             type === 'columns' ? { columns: 2 } : {},
      styles: { textAlign: 'left' }
    }
    
    setPage({ ...page, blocks: [...page.blocks, newBlock] })
    setBlockCounter(blockCounter + 1)
  }

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    const updateBlockRecursive = (blocks: ContentBlock[]): ContentBlock[] => {
      return blocks.map(block => {
        if (block.id === blockId) {
          return { ...block, ...updates }
        }
        if (block.children) {
          return { ...block, children: updateBlockRecursive(block.children) }
        }
        return block
      })
    }

    setPage({
      ...page,
      blocks: updateBlockRecursive(page.blocks)
    })
  }

  const deleteBlock = (blockId: string) => {
    const deleteBlockRecursive = (blocks: ContentBlock[]): ContentBlock[] => {
      return blocks.filter(block => block.id !== blockId)
        .map(block => {
          if (block.children) {
            return { ...block, children: deleteBlockRecursive(block.children) }
          }
          return block
        })
    }

    setPage({
      ...page,
      blocks: deleteBlockRecursive(page.blocks)
    })
    setSelectedBlock(null)
  }

  const duplicateBlock = (blockId: string) => {
    const findAndDuplicateBlock = (blocks: ContentBlock[]): ContentBlock[] => {
      return blocks.flatMap(block => {
        if (block.id === blockId) {
          const duplicatedBlock = {
            ...block,
            id: `block_${blockCounter}`,
            content: `${block.content} (Copy)`
          }
          setBlockCounter(blockCounter + 1)
          return [block, duplicatedBlock]
        }
        if (block.children) {
          return [{ ...block, children: findAndDuplicateBlock(block.children) }]
        }
        return [block]
      })
    }

    setPage({
      ...page,
      blocks: findAndDuplicateBlock(page.blocks)
    })
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px'
      case 'tablet': return '768px'
      default: return '100%'
    }
  }

  const renderBlock = (block: ContentBlock, isPreview = false) => {
    const commonProps = {
      key: block.id,
      className: `p-4 border rounded-lg mb-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        !isPreview ? 'min-h-[60px]' : ''
      }`,
      style: {
        backgroundColor: block.styles?.backgroundColor,
        border: block.styles?.border,
        borderRadius: block.styles?.borderRadius,
        padding: block.styles?.padding,
        margin: block.styles?.margin
      }
    }

    const styles = block.styles || {}
    const styleProps = {
      textAlign: styles.textAlign || 'left',
      fontSize: styles.fontSize,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      padding: styles.padding,
      margin: styles.margin,
      borderRadius: styles.borderRadius,
      border: styles.border
    }

    switch (block.type) {
      case 'heading':
        const headingLevel = block.props?.level || 2
        const headingProps = {
          h1: { as: 'h1', className: 'text-4xl font-bold' },
          h2: { as: 'h2', className: 'text-3xl font-semibold' },
          h3: { as: 'h3', className: 'text-2xl font-medium' },
          h4: { as: 'h4', className: 'text-xl font-medium' },
          h5: { as: 'h5', className: 'text-lg font-medium' },
          h6: { as: 'h6', className: 'text-base font-medium' }
        }
        const HeadingComponent = headingProps[`h${Math.min(Math.max(headingLevel, 1), 6)}` as keyof typeof headingProps]
        return (
          <div {...commonProps}>
            <HeadingComponent.as style={styleProps} className={HeadingComponent.className}>
              {block.content || 'Heading Text'}
            </HeadingComponent.as>
          </div>
        )

      case 'paragraph':
        return (
          <div {...commonProps}>
            <p style={styleProps}>
              {block.content || 'Paragraph text...'}
            </p>
          </div>
        )

      case 'list':
        const items = block.content.split('\n').filter(item => item.trim())
        const isOrdered = block.props?.ordered || false
        const ListTag = isOrdered ? 'ol' : 'ul'
        return (
          <div {...commonProps}>
            <ListTag style={styleProps} className={isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside'}>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ListTag>
          </div>
        )

      case 'quote':
        return (
          <div {...commonProps}>
            <blockquote style={styleProps} className="border-l-4 border-gray-300 pl-4 italic">
              {block.content || 'Quote text...'}
            </blockquote>
          </div>
        )

      case 'button':
        return (
          <div {...commonProps}>
            <button 
              style={styleProps}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {block.content || 'Button Text'}
            </button>
          </div>
        )

      case 'link':
        return (
          <div {...commonProps}>
            <a 
              href={block.props?.href || '#'} 
              style={styleProps}
              className="text-blue-500 hover:text-blue-600 underline transition-colors"
            >
              {block.content || 'Link Text'}
            </a>
          </div>
        )

      case 'image':
        return (
          <div {...commonProps}>
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {block.props?.src ? (
                <img 
                  src={block.props.src} 
                  alt={block.props?.alt || 'Image'} 
                  className="max-w-full h-auto mx-auto rounded"
                  style={{ maxWidth: block.props?.width, height: block.props?.height }}
                />
              ) : (
                <>
                  <Image className="mx-auto h-12 w-12 text-gray-400" alt="" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to add image
                  </p>
                </>
              )}
            </div>
          </div>
        )

      case 'video':
        return (
          <div {...commonProps}>
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {block.props?.src ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video 
                    src={block.props.src} 
                    controls 
                    className="w-full h-full"
                    style={{ maxWidth: block.props?.width, height: block.props?.height }}
                  />
                </div>
              ) : (
                <>
                  <Video className="mx-auto h-12 w-12 text-gray-400" alt="" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to add video
                  </p>
                </>
              )}
            </div>
          </div>
        )

      case 'code':
        return (
          <div {...commonProps}>
            <pre style={styleProps} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <code>{block.content || '// Code here'}</code>
            </pre>
          </div>
        )

      case 'container':
        return (
          <div {...commonProps}>
            <div className="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4">
              {block.content && (
                <div className="mb-2 text-sm text-gray-500">{block.content}</div>
              )}
              {block.children?.map((child, index) => (
                <div key={child.id} className="mb-2">
                  {renderBlock(child, isPreview)}
                </div>
              ))}
              {!block.children?.length && (
                <div className="text-center text-gray-400 py-4">
                  <p>Container - Drop blocks here</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'columns':
        const columnCount = block.props?.columns || 2
        return (
          <div {...commonProps}>
            <div className={`grid grid-cols-1 md:grid-cols-${columnCount} gap-4 min-h-[200px]`}>
              {Array.from({ length: columnCount }).map((_, index) => (
                <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[150px]">
                  <div className="text-sm text-gray-500 mb-2">Column {index + 1}</div>
                  {block.children?.[index]?.children?.map((child, childIndex) => (
                    <div key={child.id} className="mb-2">
                      {renderBlock(child, isPreview)}
                    </div>
                  ))}
                  {!block.children?.[index]?.children?.length && (
                    <div className="text-center text-gray-400 py-4">
                      <p>Drop blocks here</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div {...commonProps}>
            <p>Unknown block type</p>
          </div>
        )
    }
  }

  const BlockEditor = ({ block, onClose }: { block: ContentBlock, onClose: () => void }) => {
    const [editedBlock, setEditedBlock] = useState(block)

    const saveChanges = () => {
      updateBlock(block.id, editedBlock)
      onClose()
    }

    return (
      <Dialog open={!!block} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {block.type}</DialogTitle>
            <DialogDescription>
              Make changes to your content block
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={editedBlock.content}
                  onChange={(e) => setEditedBlock({ ...editedBlock, content: e.target.value })}
                  rows={4}
                  placeholder="Enter content..."
                />
              </div>

              <div className="space-y-4">
                {block.type === 'heading' && (
                  <div className="space-y-2">
                    <Label>Heading Level</Label>
                    <Select 
                      value={editedBlock.props?.level?.toString() || '2'} 
                      onValueChange={(value) => setEditedBlock({ 
                        ...editedBlock, 
                        props: { ...editedBlock.props, level: parseInt(value) } 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">H1</SelectItem>
                        <SelectItem value="2">H2</SelectItem>
                        <SelectItem value="3">H3</SelectItem>
                        <SelectItem value="4">H4</SelectItem>
                        <SelectItem value="5">H5</SelectItem>
                        <SelectItem value="6">H6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {block.type === 'list' && (
                  <div className="space-y-2">
                    <Label>List Type</Label>
                    <Select 
                      value={editedBlock.props?.ordered ? 'ordered' : 'unordered'} 
                      onValueChange={(value) => setEditedBlock({ 
                        ...editedBlock, 
                        props: { ...editedBlock.props, ordered: value === 'ordered' } 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unordered">Bullet List</SelectItem>
                        <SelectItem value="ordered">Numbered List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {block.type === 'columns' && (
                  <div className="space-y-2">
                    <Label>Number of Columns</Label>
                    <Select 
                      value={editedBlock.props?.columns?.toString() || '2'} 
                      onValueChange={(value) => setEditedBlock({ 
                        ...editedBlock, 
                        props: { ...editedBlock.props, columns: parseInt(value) } 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Column</SelectItem>
                        <SelectItem value="2">2 Columns</SelectItem>
                        <SelectItem value="3">3 Columns</SelectItem>
                        <SelectItem value="4">4 Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {block.type === 'link' && (
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={editedBlock.props?.href || ''}
                      onChange={(e) => setEditedBlock({ 
                        ...editedBlock, 
                        props: { ...editedBlock.props, href: e.target.value } 
                      })}
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {block.type === 'image' && (
                  <>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={editedBlock.props?.src || ''}
                        onChange={(e) => setEditedBlock({ 
                          ...editedBlock, 
                          props: { ...editedBlock.props, src: e.target.value } 
                        })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Alt Text</Label>
                      <Input
                        value={editedBlock.props?.alt || ''}
                        onChange={(e) => setEditedBlock({ 
                          ...editedBlock, 
                          props: { ...editedBlock.props, alt: e.target.value } 
                        })}
                        placeholder="Image description"
                      />
                    </div>
                  </>
                )}

                {block.type === 'video' && (
                  <div className="space-y-2">
                    <Label>Video URL</Label>
                    <Input
                      value={editedBlock.props?.src || ''}
                      onChange={(e) => setEditedBlock({ 
                        ...editedBlock, 
                        props: { ...editedBlock.props, src: e.target.value } 
                      })}
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Styles</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Text Alignment</Label>
                  <Select 
                    value={editedBlock.styles?.textAlign || 'left'} 
                    onValueChange={(value: 'left' | 'center' | 'right') => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, textAlign: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select 
                    value={editedBlock.styles?.fontSize || ''} 
                    onValueChange={(value) => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, fontSize: value } 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.875rem">Small</SelectItem>
                      <SelectItem value="1rem">Normal</SelectItem>
                      <SelectItem value="1.125rem">Large</SelectItem>
                      <SelectItem value="1.25rem">X-Large</SelectItem>
                      <SelectItem value="1.5rem">2X-Large</SelectItem>
                      <SelectItem value="2rem">3X-Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={editedBlock.styles?.color || '#000000'}
                    onChange={(e) => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, color: e.target.value } 
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={editedBlock.styles?.backgroundColor || '#ffffff'}
                    onChange={(e) => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, backgroundColor: e.target.value } 
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Padding</Label>
                  <Input
                    value={editedBlock.styles?.padding || ''}
                    onChange={(e) => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, padding: e.target.value } 
                    })}
                    placeholder="1rem"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Margin</Label>
                  <Input
                    value={editedBlock.styles?.margin || ''}
                    onChange={(e) => setEditedBlock({ 
                      ...editedBlock, 
                      styles: { ...editedBlock.styles, margin: e.target.value } 
                    })}
                    placeholder="1rem"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={saveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const savePage = async () => {
    try {
      setSaving(true)
      // Here you would save to your API
      console.log('Saving page:', page)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Page saved successfully!')
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Error saving page')
    } finally {
      setSaving(false)
    }
  }

  const applyTemplate = (template: Template) => {
    setPage({
      ...page,
      blocks: template.blocks.map(block => ({
        ...block,
        id: `block_${blockCounter + Math.random()}`
      }))
    })
    setBlockCounter(prev => prev + 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Builder</h1>
          <p className="text-muted-foreground">
            Drag and drop to build your page with full control over every element
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              const pageData = JSON.stringify(page, null, 2)
              const blob = new Blob([pageData], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${page.slug.replace('/', 'home')}-page.json`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={savePage} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Page'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Block Tools */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Blocks
                  </CardTitle>
                  <CardDescription>
                    Drag and drop or click to add content blocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BlockTools onAddBlock={addBlock} />
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Page Content</CardTitle>
                  <CardDescription>
                    Drag blocks to reorder, click to edit, or use the tools on the left to add new content
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                      className={previewMode === 'desktop' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Monitor className="mr-1 h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                      className={previewMode === 'tablet' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Tablet className="mr-1 h-4 w-4" />
                      Tablet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                      className={previewMode === 'mobile' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Smartphone className="mr-1 h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="min-h-[600px] p-4 border rounded-lg bg-white overflow-auto"
                    style={{ maxWidth: getPreviewWidth(), margin: '0 auto' }}
                  >
                    {page.blocks.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg font-medium mb-2">No content yet</p>
                        <p className="text-sm">Start building your page by adding blocks from the left panel</p>
                      </div>
                    ) : (
                      page.blocks.map((block, index) => (
                        <DraggableBlock
                          key={block.id}
                          block={block}
                          index={index}
                          moveBlock={moveBlock}
                          renderBlock={renderBlock}
                          isPreview={isPreviewMode}
                          selectedBlock={selectedBlock}
                          setSelectedBlock={setSelectedBlock}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Block Actions */}
              {selectedBlock && !isPreviewMode && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Block</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => duplicateBlock(selectedBlock.id)}
                      >
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Duplicate
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteBlock(selectedBlock.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBlock(null)}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
              <CardDescription>
                Configure basic page information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={page.title}
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                    placeholder="Page Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <Input
                    value={page.slug}
                    onChange={(e) => setPage({ ...page, slug: e.target.value })}
                    placeholder="/page-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={page.status} 
                    onValueChange={(value: 'published' | 'draft') => setPage({ ...page, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={page.author || ''}
                    onChange={(e) => setPage({ ...page, author: e.target.value })}
                    placeholder="Author Name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your page for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SEO Title</Label>
                <Input
                  value={page.seoTitle || ''}
                  onChange={(e) => setPage({ ...page, seoTitle: e.target.value })}
                  placeholder="SEO Title (60 characters max)"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {page.seoTitle?.length || 0}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={page.seoDescription || ''}
                  onChange={(e) => setPage({ ...page, seoDescription: e.target.value })}
                  placeholder="Meta description (160 characters max)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  {page.seoDescription?.length || 0}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={page.seoKeywords || ''}
                  onChange={(e) => setPage({ ...page, seoKeywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input
                  value={page.featuredImage || ''}
                  onChange={(e) => setPage({ ...page, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Templates</CardTitle>
              <CardDescription>
                Choose a template to get started quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        onClick={() => applyTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Preview</CardTitle>
              <CardDescription>
                See how your page looks to visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                      className={previewMode === 'desktop' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Monitor className="mr-1 h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                      className={previewMode === 'tablet' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Tablet className="mr-1 h-4 w-4" />
                      Tablet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                      className={previewMode === 'mobile' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <Smartphone className="mr-1 h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-white min-h-[600px] overflow-auto">
                  <div style={{ maxWidth: getPreviewWidth(), margin: '0 auto' }}>
                    {page.blocks.map((block) => renderBlock(block, true))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publish Page</CardTitle>
              <CardDescription>
                Review and publish your page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Make sure to review your page content and settings before publishing.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Input
                    type="datetime-local"
                    value={page.publishDate || ''}
                    onChange={(e) => setPage({ ...page, publishDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={page.status} 
                    onValueChange={(value: 'published' | 'draft') => setPage({ ...page, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="published">Publish Immediately</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setPage({ ...page, status: 'draft' })}
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={() => {
                    setPage({ ...page, status: 'published' })
                    savePage()
                  }}
                >
                  Publish Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedBlock && (
        <BlockEditor 
          block={selectedBlock} 
          onClose={() => setSelectedBlock(null)} 
        />
      )}
    </div>
  )
}

export default function PageBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageBuilderContent />
    </DndProvider>
  )
}