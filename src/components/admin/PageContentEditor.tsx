'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  FileText, 
  Type, 
  Hash, 
  Image, 
  Video, 
  MessageSquare,
  Search,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Award,
  Calendar,
  Target,
  Heart,
  TrendingUp,
  Star,
  Download,
  Zap,
  ArrowRight,
  Send,
  BarChart3,
  Folder,
  HelpCircle,
  Settings,
  Tag,
  Upload,
} from 'lucide-react'

interface PageContent {
  id: string
  title: string
  path: string
  content: string
  sections: PageSection[]
  lastModified: string
}

interface PageSection {
  id: string
  type: 'heading' | 'paragraph' | 'list' | 'button' | 'link' | 'hero' | 'stats' | 'services' | 'testimonials' | 'achievement' | 'timeline' | 'skills-category' | 'skills-items' | 'value' | 'case-study' | 'review' | 'lead-magnet' | 'additional-service' | 'process' | 'form-label' | 'form-placeholder' | 'form-button' | 'stat' | 'category' | 'faq-question' | 'faq-answer' | 'tool'
  title: string
  content: string
  rawContent?: string
  properties?: any
}

interface EditableContent {
  id: string
  type: string
  label: string
  value: string
  path: string
  section: string
}

export default function PageContentEditor() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('')
  const [pageContent, setPageContent] = useState<PageContent | null>(null)
  const [editableContent, setEditableContent] = useState<EditableContent[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<EditableContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Available pages in the project
  const availablePages = [
    { id: 'home', title: 'Home Page', path: '/' },
    { id: 'about', title: 'About Us', path: '/about' },
    { id: 'services', title: 'Services', path: '/services' },
    { id: 'contact', title: 'Contact', path: '/contact' },
    { id: 'case-studies', title: 'Case Studies', path: '/case-studies' },
    { id: 'tools', title: 'Tools', path: '/tools' },
    { id: 'faq', title: 'FAQ', path: '/faq' }
  ]

  // Sample content extraction (in real implementation, this would parse actual page files)
  const extractPageContent = (pageId: string): PageContent => {
    const pageData: { [key: string]: PageContent } = {
      home: {
        id: 'home',
        title: 'Home Page',
        path: '/',
        content: '',
        sections: [
          {
            id: 'hero-title',
            type: 'hero',
            title: 'Hero Section Title',
            content: 'Michael Zahy - Performance Marketing Expert',
            rawContent: 'Michael Zahy - Performance Marketing Expert'
          },
          {
            id: 'hero-subtitle',
            type: 'hero',
            title: 'Hero Section Subtitle',
            content: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.',
            rawContent: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.'
          },
          {
            id: 'services-heading',
            type: 'heading',
            title: 'Services Section Heading',
            content: 'Our Services',
            rawContent: 'Our Services'
          },
          {
            id: 'meta-ads-title',
            type: 'services',
            title: 'Meta Ads Service Title',
            content: 'Meta Ads Management',
            rawContent: 'Meta Ads Management'
          },
          {
            id: 'meta-ads-description',
            type: 'services',
            title: 'Meta Ads Service Description',
            content: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI through data-driven optimization and creative excellence.',
            rawContent: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI through data-driven optimization and creative excellence.'
          },
          {
            id: 'performance-marketing-title',
            type: 'services',
            title: 'Performance Marketing Title',
            content: 'Performance Marketing',
            rawContent: 'Performance Marketing'
          },
          {
            id: 'performance-marketing-description',
            type: 'services',
            title: 'Performance Marketing Description',
            content: 'Comprehensive digital marketing strategies focused on maximizing conversions, revenue, and ROI across multiple platforms and channels.',
            rawContent: 'Comprehensive digital marketing strategies focused on maximizing conversions, revenue, and ROI across multiple platforms and channels.'
          },
          {
            id: 'growth-hacking-title',
            type: 'services',
            title: 'Growth Hacking Title',
            content: 'Growth Hacking',
            rawContent: 'Growth Hacking'
          },
          {
            id: 'growth-hacking-description',
            type: 'services',
            title: 'Growth Hacking Description',
            content: 'Innovative strategies and experiments to accelerate business growth through viral marketing, creative campaigns, and scalable acquisition tactics.',
            rawContent: 'Innovative strategies and experiments to accelerate business growth through viral marketing, creative campaigns, and scalable acquisition tactics.'
          },
          {
            id: 'ecommerce-marketing-title',
            type: 'services',
            title: 'E-commerce Marketing Title',
            content: 'E-commerce Marketing',
            rawContent: 'E-commerce Marketing'
          },
          {
            id: 'ecommerce-marketing-description',
            type: 'services',
            title: 'E-commerce Marketing Description',
            content: 'Specialized marketing solutions for online stores focusing on product sales, customer retention, and revenue growth through targeted campaigns.',
            rawContent: 'Specialized marketing solutions for online stores focusing on product sales, customer retention, and revenue growth through targeted campaigns.'
          },
          {
            id: 'lead-generation-title',
            type: 'services',
            title: 'Lead Generation Title',
            content: 'Lead Generation',
            rawContent: 'Lead Generation'
          },
          {
            id: 'lead-generation-description',
            type: 'services',
            title: 'Lead Generation Description',
            content: 'High-quality lead acquisition strategies for service-based businesses with focus on lead quality, cost efficiency, and conversion optimization.',
            rawContent: 'High-quality lead acquisition strategies for service-based businesses with focus on lead quality, cost efficiency, and conversion optimization.'
          },
          {
            id: 'marketing-analytics-title',
            type: 'services',
            title: 'Marketing Analytics Title',
            content: 'Marketing Analytics',
            rawContent: 'Marketing Analytics'
          },
          {
            id: 'marketing-analytics-description',
            type: 'services',
            title: 'Marketing Analytics Description',
            content: 'In-depth data analysis and reporting to understand campaign performance, customer behavior, and opportunities for optimization and growth.',
            rawContent: 'In-depth data analysis and reporting to understand campaign performance, customer behavior, and opportunities for optimization and growth.'
          },
          {
            id: 'meta-ads-price',
            type: 'services',
            title: 'Meta Ads Price',
            content: 'Starting from EGP 5,000/month',
            rawContent: 'Starting from EGP 5,000/month'
          },
          {
            id: 'performance-marketing-price',
            type: 'services',
            title: 'Performance Marketing Price',
            content: 'Starting from EGP 7,500/month',
            rawContent: 'Starting from EGP 7,500/month'
          },
          {
            id: 'growth-hacking-price',
            type: 'services',
            title: 'Growth Hacking Price',
            content: 'Starting from EGP 10,000/month',
            rawContent: 'Starting from EGP 10,000/month'
          },
          {
            id: 'ecommerce-marketing-price',
            type: 'services',
            title: 'E-commerce Marketing Price',
            content: 'Starting from EGP 6,000/month',
            rawContent: 'Starting from EGP 6,000/month'
          },
          {
            id: 'lead-generation-price',
            type: 'services',
            title: 'Lead Generation Price',
            content: 'Starting from EGP 4,000/month',
            rawContent: 'Starting from EGP 4,000/month'
          },
          {
            id: 'marketing-analytics-price',
            type: 'services',
            title: 'Marketing Analytics Price',
            content: 'Starting from EGP 3,000/month',
            rawContent: 'Starting from EGP 3,000/month'
          },
          {
            id: 'stats-spend',
            type: 'stats',
            title: 'Ad Spend Statistic',
            content: '250K+',
            rawContent: '250K+'
          },
          {
            id: 'stats-spend-label',
            type: 'stats',
            title: 'Ad Spend Label',
            content: 'Ad Spend Managed (EGP)',
            rawContent: 'Ad Spend Managed (EGP)'
          },
          {
            id: 'stats-roi',
            type: 'stats',
            title: 'ROI Statistic',
            content: '4.2x',
            rawContent: '4.2x'
          },
          {
            id: 'stats-roi-label',
            type: 'stats',
            title: 'ROI Label',
            content: 'Average ROI',
            rawContent: 'Average ROI'
          },
          {
            id: 'stats-clients',
            type: 'stats',
            title: 'Clients Statistic',
            content: '20+',
            rawContent: '20+'
          },
          {
            id: 'stats-clients-label',
            type: 'stats',
            title: 'Clients Label',
            content: 'Happy Clients',
            rawContent: 'Happy Clients'
          },
          {
            id: 'stats-campaigns',
            type: 'stats',
            title: 'Campaigns Statistic',
            content: '48+',
            rawContent: '48+'
          },
          {
            id: 'stats-campaigns-label',
            type: 'stats',
            title: 'Campaigns Label',
            content: 'Successful Campaigns',
            rawContent: 'Successful Campaigns'
          },
          {
            id: 'case-studies-heading',
            type: 'heading',
            title: 'Case Studies Heading',
            content: 'Case Studies',
            rawContent: 'Case Studies'
          },
          {
            id: 'case-studies-subtitle',
            type: 'paragraph',
            title: 'Case Studies Subtitle',
            content: 'Real results from real campaigns. Discover how I\'ve helped businesses achieve exceptional ROI through strategic digital marketing.',
            rawContent: 'Real results from real campaigns. Discover how I\'ve helped businesses achieve exceptional ROI through strategic digital marketing.'
          },
          {
            id: 'case-study-1-title',
            type: 'case-study',
            title: 'Case Study 1 Title',
            content: 'Pharmacy Weight Gain Products',
            rawContent: 'Pharmacy Weight Gain Products'
          },
          {
            id: 'case-study-1-client',
            type: 'case-study',
            title: 'Case Study 1 Client',
            content: 'Dr. Remon Moner Pharmacy',
            rawContent: 'Dr. Remon Moner Pharmacy'
          },
          {
            id: 'case-study-1-results',
            type: 'case-study',
            title: 'Case Study 1 Results',
            content: '11.1x ROAS',
            rawContent: '11.1x ROAS'
          },
          {
            id: 'case-study-2-title',
            type: 'case-study',
            title: 'Case Study 2 Title',
            content: 'E-commerce Fashion Brand',
            rawContent: 'E-commerce Fashion Brand'
          },
          {
            id: 'case-study-2-client',
            type: 'case-study',
            title: 'Case Study 2 Client',
            content: 'Egypt Market Focus',
            rawContent: 'Egypt Market Focus'
          },
          {
            id: 'case-study-2-results',
            type: 'case-study',
            title: 'Case Study 2 Results',
            content: '8.5x ROAS',
            rawContent: '8.5x ROAS'
          },
          {
            id: 'case-study-3-title',
            type: 'case-study',
            title: 'Case Study 3 Title',
            content: 'Local Service Business',
            rawContent: 'Local Service Business'
          },
          {
            id: 'case-study-3-client',
            type: 'case-study',
            title: 'Case Study 3 Client',
            content: 'Lead Generation Campaign',
            rawContent: 'Lead Generation Campaign'
          },
          {
            id: 'case-study-3-results',
            type: 'case-study',
            title: 'Case Study 3 Results',
            content: '60% Cost Reduction',
            rawContent: '60% Cost Reduction'
          },
          {
            id: 'reviews-heading',
            type: 'heading',
            title: 'Reviews Heading',
            content: 'Client Reviews',
            rawContent: 'Client Reviews'
          },
          {
            id: 'review-1-name',
            type: 'review',
            title: 'Review 1 Name',
            content: 'Ahmed Hassan',
            rawContent: 'Ahmed Hassan'
          },
          {
            id: 'review-1-company',
            type: 'review',
            title: 'Review 1 Company',
            content: 'E-commerce Store Owner',
            rawContent: 'E-commerce Store Owner'
          },
          {
            id: 'review-1-text',
            type: 'review',
            title: 'Review 1 Text',
            content: 'Michael helped us achieve 11.1x ROAS in just 3 months. His specialist knowledge in Facebook ads is unmatched!',
            rawContent: 'Michael helped us achieve 11.1x ROAS in just 3 months. His specialist knowledge in Facebook ads is unmatched!'
          },
          {
            id: 'review-2-name',
            type: 'review',
            title: 'Review 2 Name',
            content: 'Sara Mohamed',
            rawContent: 'Sara Mohamed'
          },
          {
            id: 'review-2-company',
            type: 'review',
            title: 'Review 2 Company',
            content: 'Marketing Director',
            rawContent: 'Marketing Director'
          },
          {
            id: 'review-2-text',
            type: 'review',
            title: 'Review 2 Text',
            content: 'Working with Michael transformed our digital marketing strategy. We saw a 300% increase in qualified leads.',
            rawContent: 'Working with Michael transformed our digital marketing strategy. We saw a 300% increase in qualified leads.'
          },
          {
            id: 'review-3-name',
            type: 'review',
            title: 'Review 3 Name',
            content: 'Karim Ali',
            rawContent: 'Karim Ali'
          },
          {
            id: 'review-3-company',
            type: 'review',
            title: 'Review 3 Company',
            content: 'Startup Founder',
            rawContent: 'Startup Founder'
          },
          {
            id: 'review-3-text',
            type: 'review',
            title: 'Review 3 Text',
            content: 'Michael\'s data-driven approach helped us scale from 0 to 6 figures in monthly revenue.',
            rawContent: 'Michael\'s data-driven approach helped us scale from 0 to 6 figures in monthly revenue.'
          },
          {
            id: 'lead-magnets-heading',
            type: 'heading',
            title: 'Lead Magnets Heading',
            content: 'Free Resources',
            rawContent: 'Free Resources'
          },
          {
            id: 'lead-magnet-1-title',
            type: 'lead-magnet',
            title: 'Lead Magnet 1 Title',
            content: 'Marketing Audit',
            rawContent: 'Marketing Audit'
          },
          {
            id: 'lead-magnet-1-description',
            type: 'lead-magnet',
            title: 'Lead Magnet 1 Description',
            content: 'Get a comprehensive analysis of your current marketing performance',
            rawContent: 'Get a comprehensive analysis of your current marketing performance'
          },
          {
            id: 'lead-magnet-2-title',
            type: 'lead-magnet',
            title: 'Lead Magnet 2 Title',
            content: 'ROI Calculator',
            rawContent: 'ROI Calculator'
          },
          {
            id: 'lead-magnet-2-description',
            type: 'lead-magnet',
            title: 'Lead Magnet 2 Description',
            content: 'Calculate your potential return on investment with marketing strategies',
            rawContent: 'Calculate your potential return on investment with marketing strategies'
          },
          {
            id: 'lead-magnet-3-title',
            type: 'lead-magnet',
            title: 'Lead Magnet 3 Title',
            content: 'Marketing Strategy Guide',
            rawContent: 'Marketing Strategy Guide'
          },
          {
            id: 'lead-magnet-3-description',
            type: 'lead-magnet',
            title: 'Lead Magnet 3 Description',
            content: 'Download our comprehensive guide to successful performance marketing',
            rawContent: 'Download our comprehensive guide to successful performance marketing'
          },
          {
            id: 'hero-subtitle',
            type: 'hero',
            title: 'Hero Subtitle',
            content: 'Media Buyer & Performance Marketing',
            rawContent: 'Media Buyer & Performance Marketing'
          },
          {
            id: 'hero-name',
            type: 'hero',
            title: 'Hero Name',
            content: 'Michael Zahy',
            rawContent: 'Michael Zahy'
          },
          {
            id: 'about-section-name',
            type: 'paragraph',
            title: 'About Section Name',
            content: 'Michael Zahy',
            rawContent: 'Michael Zahy'
          },
          {
            id: 'footer-copyright',
            type: 'paragraph',
            title: 'Footer Copyright',
            content: '© 2024 Michael Zahy. All rights reserved.',
            rawContent: '© 2024 Michael Zahy. All rights reserved.'
          },
          {
            id: 'nav-home',
            type: 'heading',
            title: 'Navigation Home',
            content: 'Home',
            rawContent: 'Home'
          },
          {
            id: 'nav-about',
            type: 'heading',
            title: 'Navigation About',
            content: 'About',
            rawContent: 'About'
          },
          {
            id: 'nav-services',
            type: 'heading',
            title: 'Navigation Services',
            content: 'Services',
            rawContent: 'Services'
          },
          {
            id: 'nav-tools',
            type: 'heading',
            title: 'Navigation Tools',
            content: 'Tools',
            rawContent: 'Tools'
          },
          {
            id: 'nav-contact',
            type: 'heading',
            title: 'Navigation Contact',
            content: 'Contact',
            rawContent: 'Contact'
          },
          {
            id: 'nav-resources',
            type: 'heading',
            title: 'Navigation Resources',
            content: 'Resources',
            rawContent: 'Resources'
          },
          {
            id: 'lets-connect-title',
            type: 'heading',
            title: 'Let\'s Connect Title',
            content: 'Let\'s Connect',
            rawContent: 'Let\'s Connect'
          },
          {
            id: 'send-message-button',
            type: 'form-button',
            title: 'Send Message Button',
            content: 'Send Message',
            rawContent: 'Send Message'
          },
          {
            id: 'whatsapp-quick-title',
            type: 'heading',
            title: 'WhatsApp Quick Title',
            content: 'Quick WhatsApp Contact',
            rawContent: 'Quick WhatsApp Contact'
          },
          {
            id: 'whatsapp-quick-description',
            type: 'paragraph',
            title: 'WhatsApp Quick Description',
            content: 'For quick response and direct inquiry, click the button below to contact via WhatsApp with a pre-filled message',
            rawContent: 'For quick response and direct inquiry, click the button below to contact via WhatsApp with a pre-filled message'
          },
          {
            id: 'whatsapp-tip',
            type: 'paragraph',
            title: 'WhatsApp Tip',
            content: '💡 Pro tip: For urgent inquiries, WhatsApp provides the fastest response time',
            rawContent: '💡 Pro tip: For urgent inquiries, WhatsApp provides the fastest response time'
          },
          {
            id: 'whatsapp-button-text',
            type: 'form-button',
            title: 'WhatsApp Button Text',
            content: 'Open WhatsApp Chat',
            rawContent: 'Open WhatsApp Chat'
          },
          {
            id: 'whatsapp-copy-button-text',
            type: 'form-button',
            title: 'WhatsApp Copy Button Text',
            content: 'Copy Message',
            rawContent: 'Copy Message'
          },
          {
            id: 'whatsapp-success-message',
            type: 'paragraph',
            title: 'WhatsApp Success Message',
            content: 'Message copied successfully! You can paste it in WhatsApp.',
            rawContent: 'Message copied successfully! You can paste it in WhatsApp.'
          },
          {
            id: 'whatsapp-card-title',
            type: 'heading',
            title: 'WhatsApp Card Title',
            content: 'WhatsApp',
            rawContent: 'WhatsApp'
          },
          {
            id: 'case-studies-section-heading',
            type: 'heading',
            title: 'Case Studies Section Heading',
            content: 'Case Studies',
            rawContent: 'Case Studies'
          },
          {
            id: 'client-reviews-heading',
            type: 'heading',
            title: 'Client Reviews Heading',
            content: 'Client Reviews',
            rawContent: 'Client Reviews'
          },
          {
            id: 'free-resources-heading',
            type: 'heading',
            title: 'Free Resources Heading',
            content: 'Free Resources',
            rawContent: 'Free Resources'
          },
          {
            id: 'view-all-case-studies',
            type: 'button',
            title: 'View All Case Studies Button',
            content: 'View All Case Studies',
            rawContent: 'View All Case Studies'
          },
          {
            id: 'form-success-message',
            type: 'paragraph',
            title: 'Form Success Message',
            content: 'Thank you for your inquiry! I will contact you within 24 hours.',
            rawContent: 'Thank you for your inquiry! I will contact you within 24 hours.'
          },
          {
            id: 'form-error-message',
            type: 'paragraph',
            title: 'Form Error Message',
            content: 'There was an error sending your message. Please try again.',
            rawContent: 'There was an error sending your message. Please try again.'
          },
          {
            id: 'network-error-message',
            type: 'paragraph',
            title: 'Network Error Message',
            content: 'Network error. Please check your connection and try again.',
            rawContent: 'Network error. Please check your connection and try again.'
          },
          {
            id: 'response-time-text',
            type: 'paragraph',
            title: 'Response Time Text',
            content: 'I typically respond within 24 hours',
            rawContent: 'I typically respond within 24 hours'
          },
          {
            id: 'whatsapp-closing-text',
            type: 'paragraph',
            title: 'WhatsApp Closing Text',
            content: 'Please reply as soon as possible. Thank you!',
            rawContent: 'Please reply as soon as possible. Thank you!'
          },
          {
            id: 'footer-designed-with-text',
            type: 'paragraph',
            title: 'Footer Designed With Text',
            content: 'Designed with',
            rawContent: 'Designed with'
          },
          {
            id: 'footer-location-text',
            type: 'paragraph',
            title: 'Footer Location Text',
            content: 'in Egypt',
            rawContent: 'in Egypt'
          }
        ],
        lastModified: '2024-01-20'
      },
      about: {
        id: 'about',
        title: 'About Us',
        path: '/about',
        content: '',
        sections: [
          {
            id: 'about-title',
            type: 'heading',
            title: 'Page Title',
            content: 'Passionate About Growth',
            rawContent: 'Passionate About Growth'
          },
          {
            id: 'about-subtitle',
            type: 'paragraph',
            title: 'Page Subtitle',
            content: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.',
            rawContent: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.'
          },
          {
            id: 'achievement-spend',
            type: 'achievement',
            title: 'Achievement Spend',
            content: '200K+',
            rawContent: '200K+'
          },
          {
            id: 'achievement-spend-label',
            type: 'achievement',
            title: 'Achievement Spend Label',
            content: 'Ad Spend Managed',
            rawContent: 'Ad Spend Managed'
          },
          {
            id: 'achievement-roi',
            type: 'achievement',
            title: 'Achievement ROI',
            content: '4.2x',
            rawContent: '4.2x'
          },
          {
            id: 'achievement-roi-label',
            type: 'achievement',
            title: 'Achievement ROI Label',
            content: 'Average ROI',
            rawContent: 'Average ROI'
          },
          {
            id: 'achievement-clients',
            type: 'achievement',
            title: 'Achievement Clients',
            content: '20+',
            rawContent: '20+'
          },
          {
            id: 'achievement-clients-label',
            type: 'achievement',
            title: 'Achievement Clients Label',
            content: 'Happy Clients',
            rawContent: 'Happy Clients'
          },
          {
            id: 'achievement-campaigns',
            type: 'achievement',
            title: 'Achievement Campaigns',
            content: '85+',
            rawContent: '85+'
          },
          {
            id: 'achievement-campaigns-label',
            type: 'achievement',
            title: 'Achievement Campaigns Label',
            content: 'Successful Campaigns',
            rawContent: 'Successful Campaigns'
          },
          {
            id: 'story-heading',
            type: 'heading',
            title: 'My Story Heading',
            content: 'My Story',
            rawContent: 'My Story'
          },
          {
            id: 'story-paragraph-1',
            type: 'paragraph',
            title: 'Story Paragraph 1',
            content: 'My journey in digital marketing began with a simple realization: businesses need more than just advertising—they need strategic, data-driven marketing that delivers measurable results.',
            rawContent: 'My journey in digital marketing began with a simple realization: businesses need more than just advertising—they need strategic, data-driven marketing that delivers measurable results.'
          },
          {
            id: 'story-paragraph-2',
            type: 'paragraph',
            title: 'Story Paragraph 2',
            content: 'Starting in 2020, I immersed myself in the world of performance marketing, quickly discovering my passion for Facebook advertising and media buying. What started as curiosity soon became a expertise as I helped businesses transform their digital presence.',
            rawContent: 'Starting in 2020, I immersed myself in the world of performance marketing, quickly discovering my passion for Facebook advertising and media buying. What started as curiosity soon became a expertise as I helped businesses transform their digital presence.'
          },
          {
            id: 'story-paragraph-3',
            type: 'paragraph',
            title: 'Story Paragraph 3',
            content: 'Today, I specialize in creating high-converting Facebook and Instagram campaigns that consistently deliver exceptional ROI. My approach combines creative thinking with analytical rigor, ensuring every advertising dollar is maximized for optimal performance.',
            rawContent: 'Today, I specialize in creating high-converting Facebook and Instagram campaigns that consistently deliver exceptional ROI. My approach combines creative thinking with analytical rigor, ensuring every advertising dollar is maximized for optimal performance.'
          },
          {
            id: 'timeline-heading',
            type: 'heading',
            title: 'Timeline Heading',
            content: 'Professional Journey',
            rawContent: 'Professional Journey'
          },
          {
            id: 'timeline-subtitle',
            type: 'paragraph',
            title: 'Timeline Subtitle',
            content: 'Key milestones in my marketing career',
            rawContent: 'Key milestones in my marketing career'
          },
          {
            id: 'timeline-2023-title',
            type: 'timeline',
            title: 'Timeline 2023 Title',
            content: 'Performance Marketing Specialist',
            rawContent: 'Performance Marketing Specialist'
          },
          {
            id: 'timeline-2023-description',
            type: 'timeline',
            title: 'Timeline 2023 Description',
            content: 'Specialized in Meta Ads and performance marketing, achieving exceptional ROI for clients',
            rawContent: 'Specialized in Meta Ads and performance marketing, achieving exceptional ROI for clients'
          },
          {
            id: 'timeline-2022-title',
            type: 'timeline',
            title: 'Timeline 2022 Title',
            content: 'Media Buyer Specialist',
            rawContent: 'Media Buyer Specialist'
          },
          {
            id: 'timeline-2022-description',
            type: 'timeline',
            title: 'Timeline 2022 Description',
            content: 'Focused on strategic media buying and campaign optimization across multiple platforms',
            rawContent: 'Focused on strategic media buying and campaign optimization across multiple platforms'
          },
          {
            id: 'timeline-2021-title',
            type: 'timeline',
            title: 'Timeline 2021 Title',
            content: 'Digital Marketing Consultant',
            rawContent: 'Digital Marketing Consultant'
          },
          {
            id: 'timeline-2021-description',
            type: 'timeline',
            title: 'Timeline 2021 Description',
            content: 'Started consulting for businesses on digital marketing strategies and implementation',
            rawContent: 'Started consulting for businesses on digital marketing strategies and implementation'
          },
          {
            id: 'timeline-2020-title',
            type: 'timeline',
            title: 'Timeline 2020 Title',
            content: 'Marketing Career Begin',
            rawContent: 'Marketing Career Begin'
          },
          {
            id: 'timeline-2020-description',
            type: 'timeline',
            title: 'Timeline 2020 Description',
            content: 'Began journey in digital marketing with focus on social media advertising',
            rawContent: 'Began journey in digital marketing with focus on social media advertising'
          },
          {
            id: 'skills-heading',
            type: 'heading',
            title: 'Skills Heading',
            content: 'Core Competencies',
            rawContent: 'Core Competencies'
          },
          {
            id: 'skills-subtitle',
            type: 'paragraph',
            title: 'Skills Subtitle',
            content: 'Specialized skills and expertise',
            rawContent: 'Specialized skills and expertise'
          },
          {
            id: 'skills-category-1',
            type: 'skills-category',
            title: 'Skills Category 1',
            content: 'Advertising Platforms',
            rawContent: 'Advertising Platforms'
          },
          {
            id: 'skills-category-1-items',
            type: 'skills-items',
            title: 'Skills Category 1 Items',
            content: 'Meta Ads, Google Ads, TikTok Ads',
            rawContent: 'Meta Ads, Google Ads, TikTok Ads'
          },
          {
            id: 'skills-category-2',
            type: 'skills-category',
            title: 'Skills Category 2',
            content: 'Analytics & Tracking',
            rawContent: 'Analytics & Tracking'
          },
          {
            id: 'skills-category-2-items',
            type: 'skills-items',
            title: 'Skills Category 2 Items',
            content: 'Google Analytics, Facebook Pixel, Conversion Tracking, ROI Analysis',
            rawContent: 'Google Analytics, Facebook Pixel, Conversion Tracking, ROI Analysis'
          },
          {
            id: 'skills-category-3',
            type: 'skills-category',
            title: 'Skills Category 3',
            content: 'Strategy & Planning',
            rawContent: 'Strategy & Planning'
          },
          {
            id: 'skills-category-3-items',
            type: 'skills-items',
            title: 'Skills Category 3 Items',
            content: 'Campaign Strategy, Audience Research, A/B Testing, Budget Optimization',
            rawContent: 'Campaign Strategy, Audience Research, A/B Testing, Budget Optimization'
          },
          {
            id: 'skills-category-4',
            type: 'skills-category',
            title: 'Skills Category 4',
            content: 'Creative & Content',
            rawContent: 'Creative & Content'
          },
          {
            id: 'skills-category-4-items',
            type: 'skills-items',
            title: 'Skills Category 4 Items',
            content: 'Ad Creative, Copywriting, Visual Design, Video Production',
            rawContent: 'Ad Creative, Copywriting, Visual Design, Video Production'
          },
          {
            id: 'values-heading',
            type: 'heading',
            title: 'Values Heading',
            content: 'My Values',
            rawContent: 'My Values'
          },
          {
            id: 'values-subtitle',
            type: 'paragraph',
            title: 'Values Subtitle',
            content: 'Principles that guide my work',
            rawContent: 'Principles that guide my work'
          },
          {
            id: 'value-1-title',
            type: 'value',
            title: 'Value 1 Title',
            content: 'Results-Driven',
            rawContent: 'Results-Driven'
          },
          {
            id: 'value-1-description',
            type: 'value',
            title: 'Value 1 Description',
            content: 'Focused on delivering measurable results and maximizing ROI for every campaign',
            rawContent: 'Focused on delivering measurable results and maximizing ROI for every campaign'
          },
          {
            id: 'value-2-title',
            type: 'value',
            title: 'Value 2 Title',
            content: 'Data-Backed',
            rawContent: 'Data-Backed'
          },
          {
            id: 'value-2-description',
            type: 'value',
            title: 'Value 2 Description',
            content: 'All decisions are based on thorough data analysis and performance metrics',
            rawContent: 'All decisions are based on thorough data analysis and performance metrics'
          },
          {
            id: 'value-3-title',
            type: 'value',
            title: 'Value 3 Title',
            content: 'Client-Centric',
            rawContent: 'Client-Centric'
          },
          {
            id: 'value-3-description',
            type: 'value',
            title: 'Value 3 Description',
            content: 'Building long-term partnerships through transparency and exceptional service',
            rawContent: 'Building long-term partnerships through transparency and exceptional service'
          },
          {
            id: 'value-4-title',
            type: 'value',
            title: 'Value 4 Title',
            content: 'Innovative',
            rawContent: 'Innovative'
          },
          {
            id: 'value-4-description',
            type: 'value',
            title: 'Value 4 Description',
            content: 'Continuously exploring new strategies and technologies to stay ahead of the curve',
            rawContent: 'Continuously exploring new strategies and technologies to stay ahead of the curve'
          },
          {
            id: 'reviews-heading',
            type: 'heading',
            title: 'Reviews Heading',
            content: 'Client Reviews',
            rawContent: 'Client Reviews'
          },
          {
            id: 'reviews-subtitle',
            type: 'paragraph',
            title: 'Reviews Subtitle',
            content: 'What businesses say about working with me',
            rawContent: 'What businesses say about working with me'
          }
        ],
        lastModified: '2024-01-18'
      },
      services: {
        id: 'services',
        title: 'Services',
        path: '/services',
        content: '',
        sections: [
          {
            id: 'services-title',
            type: 'heading',
            title: 'Page Title',
            content: 'Marketing Services',
            rawContent: 'Marketing Services'
          },
          {
            id: 'services-subtitle',
            type: 'paragraph',
            title: 'Page Subtitle',
            content: 'Comprehensive digital marketing solutions designed to deliver exceptional ROI and accelerate your business growth.',
            rawContent: 'Comprehensive digital marketing solutions designed to deliver exceptional ROI and accelerate your business growth.'
          },
          {
            id: 'services-heading',
            type: 'heading',
            title: 'Services Heading',
            content: 'Core Services',
            rawContent: 'Core Services'
          },
          {
            id: 'services-subheading',
            type: 'paragraph',
            title: 'Services Subheading',
            content: 'Comprehensive solutions for your marketing needs',
            rawContent: 'Comprehensive solutions for your marketing needs'
          },
          {
            id: 'meta-ads-service-title',
            type: 'services',
            title: 'Meta Ads Service Title',
            content: 'Meta Ads Management',
            rawContent: 'Meta Ads Management'
          },
          {
            id: 'meta-ads-service-desc',
            type: 'services',
            title: 'Meta Ads Service Description',
            content: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI',
            rawContent: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI'
          },
          {
            id: 'meta-ads-price',
            type: 'services',
            title: 'Meta Ads Price',
            content: 'Starting from EGP 5,000/month',
            rawContent: 'Starting from EGP 5,000/month'
          },
          {
            id: 'meta-ads-features-heading',
            type: 'services',
            title: 'Meta Ads Features Heading',
            content: 'Key Features',
            rawContent: 'Key Features'
          },
          {
            id: 'meta-ads-features',
            type: 'services',
            title: 'Meta Ads Features',
            content: 'Campaign Strategy & Planning, Ad Creative & Copywriting, Audience Research & Targeting, A/B Testing & Optimization, Performance Analytics & Reporting, Dedicated Account Manager',
            rawContent: 'Campaign Strategy & Planning, Ad Creative & Copywriting, Audience Research & Targeting, A/B Testing & Optimization, Performance Analytics & Reporting, Dedicated Account Manager'
          },
          {
            id: 'meta-ads-deliverables-heading',
            type: 'services',
            title: 'Meta Ads Deliverables Heading',
            content: 'Deliverables',
            rawContent: 'Deliverables'
          },
          {
            id: 'meta-ads-deliverables',
            type: 'services',
            title: 'Meta Ads Deliverables',
            content: 'Custom Campaign Strategy, Ad Creative Assets, Weekly Performance Reports, Monthly Strategy Reviews, ROI Analysis & Insights, Competitor Analysis',
            rawContent: 'Custom Campaign Strategy, Ad Creative Assets, Weekly Performance Reports, Monthly Strategy Reviews, ROI Analysis & Insights, Competitor Analysis'
          },
          {
            id: 'meta-ads-ideal-heading',
            type: 'services',
            title: 'Meta Ads Ideal Heading',
            content: 'Ideal For',
            rawContent: 'Ideal For'
          },
          {
            id: 'meta-ads-ideal',
            type: 'services',
            title: 'Meta Ads Ideal',
            content: 'E-commerce Businesses, Service-Based Companies, Local Businesses, Startups & Scale-ups',
            rawContent: 'E-commerce Businesses, Service-Based Companies, Local Businesses, Startups & Scale-ups'
          },
          {
            id: 'performance-marketing-service-title',
            type: 'services',
            title: 'Performance Marketing Title',
            content: 'Performance Marketing',
            rawContent: 'Performance Marketing'
          },
          {
            id: 'performance-marketing-service-desc',
            type: 'services',
            title: 'Performance Marketing Description',
            content: 'Data-driven marketing strategies focused on maximizing conversions and revenue',
            rawContent: 'Data-driven marketing strategies focused on maximizing conversions and revenue'
          },
          {
            id: 'performance-marketing-price',
            type: 'services',
            title: 'Performance Marketing Price',
            content: 'Starting from EGP 7,500/month',
            rawContent: 'Starting from EGP 7,500/month'
          },
          {
            id: 'growth-hacking-service-title',
            type: 'services',
            title: 'Growth Hacking Title',
            content: 'Growth Hacking',
            rawContent: 'Growth Hacking'
          },
          {
            id: 'growth-hacking-service-desc',
            type: 'services',
            title: 'Growth Hacking Description',
            content: 'Innovative strategies to accelerate business growth through digital channels',
            rawContent: 'Innovative strategies to accelerate business growth through digital channels'
          },
          {
            id: 'growth-hacking-price',
            type: 'services',
            title: 'Growth Hacking Price',
            content: 'Starting from EGP 10,000/month',
            rawContent: 'Starting from EGP 10,000/month'
          },
          {
            id: 'additional-services-heading',
            type: 'heading',
            title: 'Additional Services Heading',
            content: 'Additional Services',
            rawContent: 'Additional Services'
          },
          {
            id: 'additional-services-subtitle',
            type: 'paragraph',
            title: 'Additional Services Subtitle',
            content: 'Flexible solutions for specific needs',
            rawContent: 'Flexible solutions for specific needs'
          },
          {
            id: 'facebook-audit-title',
            type: 'additional-service',
            title: 'Facebook Audit Title',
            content: 'Facebook Ads Audit',
            rawContent: 'Facebook Ads Audit'
          },
          {
            id: 'facebook-audit-description',
            type: 'additional-service',
            title: 'Facebook Audit Description',
            content: 'Comprehensive analysis of your current Facebook ads performance',
            rawContent: 'Comprehensive analysis of your current Facebook ads performance'
          },
          {
            id: 'facebook-audit-price',
            type: 'additional-service',
            title: 'Facebook Audit Price',
            content: 'EGP 2,500',
            rawContent: 'EGP 2,500'
          },
          {
            id: 'facebook-audit-duration',
            type: 'additional-service',
            title: 'Facebook Audit Duration',
            content: '3-5 days',
            rawContent: '3-5 days'
          },
          {
            id: 'strategy-session-title',
            type: 'additional-service',
            title: 'Strategy Session Title',
            content: 'Marketing Strategy Session',
            rawContent: 'Marketing Strategy Session'
          },
          {
            id: 'strategy-session-description',
            type: 'additional-service',
            title: 'Strategy Session Description',
            content: '2-hour deep dive into your marketing challenges and opportunities',
            rawContent: '2-hour deep dive into your marketing challenges and opportunities'
          },
          {
            id: 'strategy-session-price',
            type: 'additional-service',
            title: 'Strategy Session Price',
            content: 'EGP 1,500',
            rawContent: 'EGP 1,500'
          },
          {
            id: 'strategy-session-duration',
            type: 'additional-service',
            title: 'Strategy Session Duration',
            content: '2 hours',
            rawContent: '2 hours'
          },
          {
            id: 'creative-package-title',
            type: 'additional-service',
            title: 'Creative Package Title',
            content: 'Ad Creative Package',
            rawContent: 'Ad Creative Package'
          },
          {
            id: 'creative-package-description',
            type: 'additional-service',
            title: 'Creative Package Description',
            content: 'Professional ad creatives for your campaigns',
            rawContent: 'Professional ad creatives for your campaigns'
          },
          {
            id: 'creative-package-price',
            type: 'additional-service',
            title: 'Creative Package Price',
            content: 'EGP 3,000',
            rawContent: 'EGP 3,000'
          },
          {
            id: 'creative-package-duration',
            type: 'additional-service',
            title: 'Creative Package Duration',
            content: '1 week',
            rawContent: '1 week'
          },
          {
            id: 'process-heading',
            type: 'heading',
            title: 'Process Heading',
            content: 'How It Works',
            rawContent: 'How It Works'
          },
          {
            id: 'process-step-1-title',
            type: 'process',
            title: 'Process Step 1 Title',
            content: 'Discovery & Strategy',
            rawContent: 'Discovery & Strategy'
          },
          {
            id: 'process-step-1-description',
            type: 'process',
            title: 'Process Step 1 Description',
            content: 'Understanding your business goals and developing a customized strategy',
            rawContent: 'Understanding your business goals and developing a customized strategy'
          },
          {
            id: 'process-step-2-title',
            type: 'process',
            title: 'Process Step 2 Title',
            content: 'Campaign Setup',
            rawContent: 'Campaign Setup'
          },
          {
            id: 'process-step-2-description',
            type: 'process',
            title: 'Process Step 2 Description',
            content: 'Creating and configuring your advertising campaigns',
            rawContent: 'Creating and configuring your advertising campaigns'
          },
          {
            id: 'process-step-3-title',
            type: 'process',
            title: 'Process Step 3 Title',
            content: 'Optimization',
            rawContent: 'Optimization'
          },
          {
            id: 'process-step-3-description',
            type: 'process',
            title: 'Process Step 3 Description',
            content: 'Continuous monitoring and improvement of campaign performance',
            rawContent: 'Continuous monitoring and improvement of campaign performance'
          },
          {
            id: 'process-step-4-title',
            type: 'process',
            title: 'Process Step 4 Title',
            content: 'Reporting & Analysis',
            rawContent: 'Reporting & Analysis'
          },
          {
            id: 'process-step-4-description',
            type: 'process',
            title: 'Process Step 4 Description',
            content: 'Detailed performance reports and strategic insights',
            rawContent: 'Detailed performance reports and strategic insights'
          }
        ],
        lastModified: '2024-01-19'
      },
      contact: {
        id: 'contact',
        title: 'Contact',
        path: '/contact',
        content: '',
        sections: [
          {
            id: 'contact-title',
            type: 'heading',
            title: 'Contact Title',
            content: 'Let\'s Connect',
            rawContent: 'Let\'s Connect'
          },
          {
            id: 'contact-subtitle',
            type: 'paragraph',
            title: 'Contact Subtitle',
            content: 'Ready to take your business to the next level? Choose your preferred way to reach out and let\'s discuss how we can achieve your marketing goals together.',
            rawContent: 'Ready to take your business to the next level? Choose your preferred way to reach out and let\'s discuss how we can achieve your marketing goals together.'
          },
          {
            id: 'contact-form-title',
            type: 'heading',
            title: 'Contact Form Title',
            content: 'Send Me a Message',
            rawContent: 'Send Me a Message'
          },
          {
            id: 'contact-form-subtitle',
            type: 'paragraph',
            title: 'Contact Form Subtitle',
            content: 'Fill out the form below and I\'ll get back to you within 24 hours. I\'m excited to learn about your project and discuss how we can work together.',
            rawContent: 'Fill out the form below and I\'ll get back to you within 24 hours. I\'m excited to learn about your project and discuss how we can work together.'
          },
          {
            id: 'form-label-name',
            type: 'form-label',
            title: 'Form Label Name',
            content: 'Full Name',
            rawContent: 'Full Name'
          },
          {
            id: 'form-placeholder-name',
            type: 'form-placeholder',
            title: 'Form Placeholder Name',
            content: 'Enter your full name',
            rawContent: 'Enter your full name'
          },
          {
            id: 'form-label-email',
            type: 'form-label',
            title: 'Form Label Email',
            content: 'Email Address',
            rawContent: 'Email Address'
          },
          {
            id: 'form-placeholder-email',
            type: 'form-placeholder',
            title: 'Form Placeholder Email',
            content: 'your@email.com',
            rawContent: 'your@email.com'
          },
          {
            id: 'form-label-phone',
            type: 'form-label',
            title: 'Form Label Phone',
            content: 'Phone Number',
            rawContent: 'Phone Number'
          },
          {
            id: 'form-placeholder-phone',
            type: 'form-placeholder',
            title: 'Form Placeholder Phone',
            content: '+20 XXX XXX XXXX',
            rawContent: '+20 XXX XXX XXXX'
          },
          {
            id: 'form-label-company',
            type: 'form-label',
            title: 'Form Label Company',
            content: 'Company',
            rawContent: 'Company'
          },
          {
            id: 'form-placeholder-company',
            type: 'form-placeholder',
            title: 'Form Placeholder Company',
            content: 'Your company name',
            rawContent: 'Your company name'
          },
          {
            id: 'form-label-service',
            type: 'form-label',
            title: 'Form Label Service',
            content: 'Service Interest',
            rawContent: 'Service Interest'
          },
          {
            id: 'form-placeholder-service',
            type: 'form-placeholder',
            title: 'Form Placeholder Service',
            content: 'Select a service you\'re interested in',
            rawContent: 'Select a service you\'re interested in'
          },
          {
            id: 'form-label-budget',
            type: 'form-label',
            title: 'Form Label Budget',
            content: 'Budget Range',
            rawContent: 'Budget Range'
          },
          {
            id: 'form-placeholder-budget',
            type: 'form-placeholder',
            title: 'Form Placeholder Budget',
            content: 'Select your budget range',
            rawContent: 'Select your budget range'
          },
          {
            id: 'form-label-message',
            type: 'form-label',
            title: 'Form Label Message',
            content: 'Your Message',
            rawContent: 'Your Message'
          },
          {
            id: 'form-placeholder-message',
            type: 'form-placeholder',
            title: 'Form Placeholder Message',
            content: 'Tell me about your project, goals, and any specific requirements...',
            rawContent: 'Tell me about your project, goals, and any specific requirements...'
          },
          {
            id: 'form-button-text',
            type: 'form-button',
            title: 'Form Button Text',
            content: 'Send Message',
            rawContent: 'Send Message'
          },
          {
            id: 'get-in-touch-title',
            type: 'heading',
            title: 'Get In Touch Title',
            content: 'Get In Touch',
            rawContent: 'Get In Touch'
          },
          {
            id: 'get-in-touch-subtitle',
            type: 'paragraph',
            title: 'Get In Touch Subtitle',
            content: 'Choose your preferred method to reach out.',
            rawContent: 'Choose your preferred method to reach out.'
          }
        ],
        lastModified: '2024-01-17'
      },
      'case-studies': {
        id: 'case-studies',
        title: 'Case Studies',
        path: '/case-studies',
        content: '',
        sections: [
          {
            id: 'case-studies-title',
            type: 'heading',
            title: 'Case Studies Title',
            content: 'Case Studies',
            rawContent: 'Case Studies'
          },
          {
            id: 'case-studies-subtitle',
            type: 'paragraph',
            title: 'Case Studies Subtitle',
            content: 'Real results from real campaigns. Discover how I\'ve helped businesses achieve exceptional ROI through strategic digital marketing.',
            rawContent: 'Real results from real campaigns. Discover how I\'ve helped businesses achieve exceptional ROI through strategic digital marketing.'
          },
          {
            id: 'case-study-1-title',
            type: 'case-study',
            title: 'Case Study 1 Title',
            content: 'Pharmacy Weight Gain Products',
            rawContent: 'Pharmacy Weight Gain Products'
          },
          {
            id: 'case-study-1-client',
            type: 'case-study',
            title: 'Case Study 1 Client',
            content: 'Dr. Remon Moner Pharmacy',
            rawContent: 'Dr. Remon Moner Pharmacy'
          },
          {
            id: 'case-study-1-category',
            type: 'case-study',
            title: 'Case Study 1 Category',
            content: 'E-commerce',
            rawContent: 'E-commerce'
          },
          {
            id: 'case-study-1-industry',
            type: 'case-study',
            title: 'Case Study 1 Industry',
            content: 'Healthcare',
            rawContent: 'Healthcare'
          },
          {
            id: 'case-study-1-duration',
            type: 'case-study',
            title: 'Case Study 1 Duration',
            content: '3 months',
            rawContent: '3 months'
          },
          {
            id: 'case-study-1-budget',
            type: 'case-study',
            title: 'Case Study 1 Budget',
            content: 'EGP 45,000',
            rawContent: 'EGP 45,000'
          },
          {
            id: 'case-study-1-results-roas',
            type: 'case-study',
            title: 'Case Study 1 ROAS',
            content: '11.1x',
            rawContent: '11.1x'
          },
          {
            id: 'case-study-1-results-revenue',
            type: 'case-study',
            title: 'Case Study 1 Revenue',
            content: 'EGP 500,000',
            rawContent: 'EGP 500,000'
          },
          {
            id: 'case-study-1-results-leads',
            type: 'case-study',
            title: 'Case Study 1 Leads',
            content: '1,200+',
            rawContent: '1,200+'
          },
          {
            id: 'case-study-2-title',
            type: 'case-study',
            title: 'Case Study 2 Title',
            content: 'E-commerce Fashion Brand',
            rawContent: 'E-commerce Fashion Brand'
          },
          {
            id: 'case-study-2-client',
            type: 'case-study',
            title: 'Case Study 2 Client',
            content: 'Egypt Market Focus',
            rawContent: 'Egypt Market Focus'
          },
          {
            id: 'case-study-2-category',
            type: 'case-study',
            title: 'Case Study 2 Category',
            content: 'E-commerce',
            rawContent: 'E-commerce'
          },
          {
            id: 'case-study-2-industry',
            type: 'case-study',
            title: 'Case Study 2 Industry',
            content: 'Fashion & Apparel',
            rawContent: 'Fashion & Apparel'
          },
          {
            id: 'case-study-2-duration',
            type: 'case-study',
            title: 'Case Study 2 Duration',
            content: '6 months',
            rawContent: '6 months'
          },
          {
            id: 'case-study-2-budget',
            type: 'case-study',
            title: 'Case Study 2 Budget',
            content: 'EGP 120,000',
            rawContent: 'EGP 120,000'
          },
          {
            id: 'case-study-2-results-roas',
            type: 'case-study',
            title: 'Case Study 2 ROAS',
            content: '8.5x',
            rawContent: '8.5x'
          },
          {
            id: 'case-study-2-results-revenue',
            type: 'case-study',
            title: 'Case Study 2 Revenue',
            content: 'EGP 1,020,000',
            rawContent: 'EGP 1,020,000'
          },
          {
            id: 'case-study-2-results-orders',
            type: 'case-study',
            title: 'Case Study 2 Orders',
            content: '3,400+',
            rawContent: '3,400+'
          },
          {
            id: 'case-study-3-title',
            type: 'case-study',
            title: 'Case Study 3 Title',
            content: 'Local Service Business',
            rawContent: 'Local Service Business'
          },
          {
            id: 'case-study-3-client',
            type: 'case-study',
            title: 'Case Study 3 Client',
            content: 'Lead Generation Campaign',
            rawContent: 'Lead Generation Campaign'
          },
          {
            id: 'case-study-3-category',
            type: 'case-study',
            title: 'Case Study 3 Category',
            content: 'Lead Generation',
            rawContent: 'Lead Generation'
          },
          {
            id: 'case-study-3-industry',
            type: 'case-study',
            title: 'Case Study 3 Industry',
            content: 'Home Services',
            rawContent: 'Home Services'
          },
          {
            id: 'case-study-3-duration',
            type: 'case-study',
            title: 'Case Study 3 Duration',
            content: '4 months',
            rawContent: '4 months'
          },
          {
            id: 'case-study-3-budget',
            type: 'case-study',
            title: 'Case Study 3 Budget',
            content: 'EGP 35,000',
            rawContent: 'EGP 35,000'
          },
          {
            id: 'case-study-3-results-leads',
            type: 'case-study',
            title: 'Case Study 3 Leads',
            content: '450+',
            rawContent: '450+'
          },
          {
            id: 'case-study-3-results-cost-reduction',
            type: 'case-study',
            title: 'Case Study 3 Cost Reduction',
            content: '60%',
            rawContent: '60%'
          },
          {
            id: 'stats-heading',
            type: 'heading',
            title: 'Stats Heading',
            content: 'Overall Impact',
            rawContent: 'Overall Impact'
          },
          {
            id: 'stats-revenue',
            type: 'stat',
            title: 'Total Revenue Generated',
            content: 'EGP 1.5M+',
            rawContent: 'EGP 1.5M+'
          },
          {
            id: 'stats-clients',
            type: 'stat',
            title: 'Happy Clients',
            content: '20+',
            rawContent: '20+'
          },
          {
            id: 'stats-campaigns',
            type: 'stat',
            title: 'Successful Campaigns',
            content: '85+',
            rawContent: '85+'
          },
          {
            id: 'stats-roi',
            type: 'stat',
            title: 'Average ROI',
            content: '4.2x',
            rawContent: '4.2x'
          }
        ],
        lastModified: '2024-01-16'
      },
      tools: {
        id: 'tools',
        title: 'Tools',
        path: '/tools',
        content: '',
        sections: [
          {
            id: 'tools-title',
            type: 'heading',
            title: 'Tools Title',
            content: 'Marketing Tools Suite',
            rawContent: 'Marketing Tools Suite'
          },
          {
            id: 'tools-subtitle',
            type: 'paragraph',
            title: 'Tools Subtitle',
            content: 'Professional tools designed for media buyers, marketers, and content creators to optimize their campaigns and maximize ROI',
            rawContent: 'Professional tools designed for media buyers, marketers, and content creators to optimize their campaigns and maximize ROI'
          },
          {
            id: 'tools-search-placeholder',
            type: 'form-placeholder',
            title: 'Tools Search Placeholder',
            content: 'Search tools...',
            rawContent: 'Search tools...'
          },
          {
            id: 'category-media-buyers-title',
            type: 'category',
            title: 'Media Buyers Category Title',
            content: 'Tools for Media Buyers',
            rawContent: 'Tools for Media Buyers'
          },
          {
            id: 'category-media-buyers-description',
            type: 'category',
            title: 'Media Buyers Category Description',
            content: 'Essential tools for media planning, budgeting, and campaign optimization',
            rawContent: 'Essential tools for media planning, budgeting, and campaign optimization'
          },
          {
            id: 'category-marketers-title',
            type: 'category',
            title: 'Marketers Category Title',
            content: 'Tools for Marketers & Planners',
            rawContent: 'Tools for Marketers & Planners'
          },
          {
            id: 'category-marketers-description',
            type: 'category',
            title: 'Marketers Category Description',
            content: 'Strategic tools for marketing planning, analysis, and growth',
            rawContent: 'Strategic tools for marketing planning, analysis, and growth'
          },
          {
            id: 'category-content-writers-title',
            type: 'category',
            title: 'Content Writers Category Title',
            content: 'Tools for Content Writers',
            rawContent: 'Tools for Content Writers'
          },
          {
            id: 'category-content-writers-description',
            type: 'category',
            title: 'Content Writers Category Description',
            content: 'Creative tools for content creation, copywriting, and optimization',
            rawContent: 'Creative tools for content creation, copywriting, and optimization'
          },
          {
            id: 'tool-roi-calculator-title',
            type: 'tool',
            title: 'ROI Calculator Title',
            content: 'ROI Calculator',
            rawContent: 'ROI Calculator'
          },
          {
            id: 'tool-roi-calculator-description',
            type: 'tool',
            title: 'ROI Calculator Description',
            content: 'Calculate your return on investment for marketing campaigns',
            rawContent: 'Calculate your return on investment for marketing campaigns'
          },
          {
            id: 'tool-roi-calculator-features',
            type: 'tool',
            title: 'ROI Calculator Features',
            content: 'ROI Calculation, Campaign Analysis, Performance Metrics',
            rawContent: 'ROI Calculation, Campaign Analysis, Performance Metrics'
          },
          {
            id: 'tool-cac-calculator-title',
            type: 'tool',
            title: 'CAC Calculator Title',
            content: 'CAC Calculator',
            rawContent: 'CAC Calculator'
          },
          {
            id: 'tool-cac-calculator-description',
            type: 'tool',
            title: 'CAC Calculator Description',
            content: 'Calculate Customer Acquisition Cost for your campaigns',
            rawContent: 'Calculate Customer Acquisition Cost for your campaigns'
          },
          {
            id: 'tool-cac-calculator-features',
            type: 'tool',
            title: 'CAC Calculator Features',
            content: 'CAC Calculation, Budget Planning, Cost Analysis',
            rawContent: 'CAC Calculation, Budget Planning, Cost Analysis'
          },
          {
            id: 'tool-ad-budget-calculator-title',
            type: 'tool',
            title: 'Ad Budget Calculator Title',
            content: 'Ad Budget Calculator',
            rawContent: 'Ad Budget Calculator'
          },
          {
            id: 'tool-ad-budget-calculator-description',
            type: 'tool',
            title: 'Ad Budget Calculator Description',
            content: 'Plan and optimize your advertising budget effectively',
            rawContent: 'Plan and optimize your advertising budget effectively'
          },
          {
            id: 'tool-ad-budget-calculator-features',
            type: 'tool',
            title: 'Ad Budget Calculator Features',
            content: 'Budget Planning, Cost Optimization, ROI Projections',
            rawContent: 'Budget Planning, Cost Optimization, ROI Projections'
          },
          {
            id: 'tool-copywriting-title',
            type: 'tool',
            title: 'Copywriting Tools Title',
            content: 'Copywriting Tools',
            rawContent: 'Copywriting Tools'
          },
          {
            id: 'tool-copywriting-description',
            type: 'tool',
            title: 'Copywriting Tools Description',
            content: 'Enhance your copywriting with AI-powered tools',
            rawContent: 'Enhance your copywriting with AI-powered tools'
          },
          {
            id: 'tool-copywriting-features',
            type: 'tool',
            title: 'Copywriting Tools Features',
            content: 'Copy Generation, Headline Optimization, Tone Analysis',
            rawContent: 'Copy Generation, Headline Optimization, Tone Analysis'
          },
          {
            id: 'calculator-calculate-button',
            type: 'form-button',
            title: 'Calculator Calculate Button',
            content: 'Calculate ROI',
            rawContent: 'Calculate ROI'
          },
          {
            id: 'calculator-reset-button',
            type: 'form-button',
            title: 'Calculator Reset Button',
            content: 'Reset',
            rawContent: 'Reset'
          },
          {
            id: 'calculator-download-button',
            type: 'form-button',
            title: 'Calculator Download Button',
            content: 'Download',
            rawContent: 'Download'
          },
          {
            id: 'calculator-view-results-button',
            type: 'form-button',
            title: 'Calculator View Results Button',
            content: 'View Results',
            rawContent: 'View Results'
          }
        ],
        lastModified: '2024-01-15'
      },
      faq: {
        id: 'faq',
        title: 'FAQ',
        path: '/faq',
        content: '',
        sections: [
          {
            id: 'faq-title',
            type: 'heading',
            title: 'FAQ Title',
            content: 'Got Questions?',
            rawContent: 'Got Questions?'
          },
          {
            id: 'faq-subtitle',
            type: 'paragraph',
            title: 'FAQ Subtitle',
            content: 'Find answers to common questions about my services, process, and how I can help your business grow.',
            rawContent: 'Find answers to common questions about my services, process, and how I can help your business grow.'
          },
          {
            id: 'faq-search-placeholder',
            type: 'form-placeholder',
            title: 'FAQ Search Placeholder',
            content: 'Search for answers...',
            rawContent: 'Search for answers...'
          },
          {
            id: 'stats-questions',
            type: 'stat',
            title: 'Questions Answered',
            content: '500+',
            rawContent: '500+'
          },
          {
            id: 'stats-clients',
            type: 'stat',
            title: 'Happy Clients',
            content: '20+',
            rawContent: '20+'
          },
          {
            id: 'stats-experience',
            type: 'stat',
            title: 'Years Experience',
            content: '4+',
            rawContent: '4+'
          },
          {
            id: 'stats-success-rate',
            type: 'stat',
            title: 'Success Rate',
            content: '98%',
            rawContent: '98%'
          },
          {
            id: 'category-general-title',
            type: 'category',
            title: 'General Category Title',
            content: 'General Questions',
            rawContent: 'General Questions'
          },
          {
            id: 'category-general-question-1',
            type: 'faq-question',
            title: 'General Question 1',
            content: 'What services do you offer?',
            rawContent: 'What services do you offer?'
          },
          {
            id: 'category-general-answer-1',
            type: 'faq-answer',
            title: 'General Answer 1',
            content: 'I offer comprehensive digital marketing services including Meta Ads Management, Performance Marketing, and Growth Hacking. Each service is tailored to your specific business needs and goals.',
            rawContent: 'I offer comprehensive digital marketing services including Meta Ads Management, Performance Marketing, and Growth Hacking. Each service is tailored to your specific business needs and goals.'
          },
          {
            id: 'category-general-question-2',
            type: 'faq-question',
            title: 'General Question 2',
            content: 'How long have you been in the marketing industry?',
            rawContent: 'How long have you been in the marketing industry?'
          },
          {
            id: 'category-general-answer-2',
            type: 'faq-answer',
            title: 'General Answer 2',
            content: 'I have been working in digital marketing since 2020, specializing in Facebook advertising and performance marketing. Over the years, I\'ve helped numerous businesses achieve exceptional results.',
            rawContent: 'I have been working in digital marketing since 2020, specializing in Facebook advertising and performance marketing. Over the years, I\'ve helped numerous businesses achieve exceptional results.'
          },
          {
            id: 'category-services-title',
            type: 'category',
            title: 'Services Category Title',
            content: 'Services & Pricing',
            rawContent: 'Services & Pricing'
          },
          {
            id: 'category-services-question-1',
            type: 'faq-question',
            title: 'Services Question 1',
            content: 'What is included in your Meta Ads Management service?',
            rawContent: 'What is included in your Meta Ads Management service?'
          },
          {
            id: 'category-services-answer-1',
            type: 'faq-answer',
            title: 'Services Answer 1',
            content: 'My Meta Ads Management service includes campaign strategy & planning, ad creative & copywriting, audience research & targeting, A/B testing & optimization, performance analytics & reporting, and dedicated account management.',
            rawContent: 'My Meta Ads Management service includes campaign strategy & planning, ad creative & copywriting, audience research & targeting, A/B testing & optimization, performance analytics & reporting, and dedicated account management.'
          },
          {
            id: 'category-services-question-2',
            type: 'faq-question',
            title: 'Services Question 2',
            content: 'How much do your services cost?',
            rawContent: 'How much do your services cost?'
          },
          {
            id: 'category-services-answer-2',
            type: 'faq-answer',
            title: 'Services Answer 2',
            content: 'My services start from EGP 5,000/month for Meta Ads Management, EGP 7,500/month for Performance Marketing, and EGP 10,000/month for Growth Hacking. I also offer one-time services like Facebook Ads Audit (EGP 2,500) and Marketing Strategy Sessions (EGP 1,500).',
            rawContent: 'My services start from EGP 5,000/month for Meta Ads Management, EGP 7,500/month for Performance Marketing, and EGP 10,000/month for Growth Hacking. I also offer one-time services like Facebook Ads Audit (EGP 2,500) and Marketing Strategy Sessions (EGP 1,500).'
          },
          {
            id: 'still-have-questions-title',
            type: 'heading',
            title: 'Still Have Questions Title',
            content: 'Still Have Questions?',
            rawContent: 'Still Have Questions?'
          },
          {
            id: 'still-have-questions-subtitle',
            type: 'paragraph',
            title: 'Still Have Questions Subtitle',
            content: 'Can\'t find the answer you\'re looking for? I\'m here to help.',
            rawContent: 'Can\'t find the answer you\'re looking for? I\'m here to help.'
          }
        ],
        lastModified: '2024-01-14'
      }
    }

    return pageData[pageId] || pageData.home
  }

  const loadPageContent = async (pageId: string) => {
    setIsLoading(true)
    setSelectedPage(pageId)
    
    try {
      // Fetch content from API
      const response = await fetch('/api/admin/content')
      if (response.ok) {
        const data = await response.json()
        const pageData = data.pages.find((p: any) => p.id === pageId)
        
        if (pageData && pageData.sections) {
          const content: PageContent = {
            id: pageData.id,
            title: pageData.title,
            path: pageData.path,
            content: '',
            sections: pageData.sections.map((section: any) => ({
              id: section.id,
              type: section.type,
              title: section.title,
              content: section.content,
              rawContent: section.content
            })),
            lastModified: pageData.sections[0]?.lastModified || new Date().toISOString()
          }
          
          setPageContent(content)
          
          // Convert sections to editable content
          const editable = content.sections.map(section => ({
            id: section.id,
            type: section.type,
            label: section.title,
            value: section.content,
            path: content.path,
            section: section.type
          }))
          
          setEditableContent(editable)
        } else {
          // Fallback to mock data if no content exists
          const content = extractPageContent(pageId)
          setPageContent(content)
          
          const editable = content.sections.map(section => ({
            id: section.id,
            type: section.type,
            label: section.title,
            value: section.content,
            path: content.path,
            section: section.type
          }))
          
          setEditableContent(editable)
        }
      } else {
        throw new Error('Failed to fetch content')
      }
    } catch (error) {
      console.error('Error loading content:', error)
      // Fallback to mock data
      const content = extractPageContent(pageId)
      setPageContent(content)
      
      const editable = content.sections.map(section => ({
        id: section.id,
        type: section.type,
        label: section.title,
        value: section.content,
        path: content.path,
        section: section.type
      }))
      
      setEditableContent(editable)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: EditableContent) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!editingItem) return
    
    setSaveStatus('saving')
    
    try {
      // Make real API call
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId: selectedPage,
          sectionId: editingItem.id,
          content: editingItem.value,
          title: editingItem.label,
          type: editingItem.type,
          key: `${selectedPage}_${editingItem.id}`
        })
      })

      if (response.ok) {
        // Update the editable content
        setEditableContent(prev => 
          prev.map(item => 
            item.id === editingItem.id ? editingItem : item
          )
        )
        
        // Update page content
        if (pageContent) {
          setPageContent(prev => ({
            ...prev!,
            sections: prev.sections.map(section => 
              section.id === editingItem.id 
                ? { ...section, content: editingItem.value, rawContent: editingItem.value }
                : section
            )
          }))
        }

        setSaveStatus('saved')
        toast.success('Content saved successfully!')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        throw new Error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      setSaveStatus('error')
      toast.error('Failed to save content. Please try again.')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
    
    setIsEditing(false)
    setEditingItem(null)
  }

  const filteredContent = editableContent.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heading': return <Hash className="h-4 w-4" />
      case 'paragraph': return <FileText className="h-4 w-4" />
      case 'hero': return <Type className="h-4 w-4" />
      case 'services': return <MessageSquare className="h-4 w-4" />
      case 'stats': return <Type className="h-4 w-4" />
      case 'achievement': return <Award className="h-4 w-4" />
      case 'timeline': return <Calendar className="h-4 w-4" />
      case 'skills-category': return <Target className="h-4 w-4" />
      case 'skills-items': return <CheckCircle className="h-4 w-4" />
      case 'value': return <Heart className="h-4 w-4" />
      case 'case-study': return <TrendingUp className="h-4 w-4" />
      case 'review': return <Star className="h-4 w-4" />
      case 'lead-magnet': return <Download className="h-4 w-4" />
      case 'additional-service': return <Zap className="h-4 w-4" />
      case 'process': return <ArrowRight className="h-4 w-4" />
      case 'form-label': return <Tag className="h-4 w-4" />
      case 'form-placeholder': return <MessageSquare className="h-4 w-4" />
      case 'form-button': return <Send className="h-4 w-4" />
      case 'stat': return <BarChart3 className="h-4 w-4" />
      case 'category': return <Folder className="h-4 w-4" />
      case 'faq-question': return <HelpCircle className="h-4 w-4" />
      case 'faq-answer': return <MessageSquare className="h-4 w-4" />
      case 'tool': return <Settings className="h-4 w-4" />
      default: return <Type className="h-4 w-4" />
    }
  }

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving': return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'saved': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return null
    }
  }

  useEffect(() => {
    if (availablePages.length > 0 && !selectedPage) {
      loadPageContent(availablePages[0].id)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Content Editor</h1>
          <p className="text-muted-foreground">
            Edit the actual content from your website pages
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-600">Changes saved</span>
          )}
          {saveStatus === 'saving' && (
            <span className="text-sm text-blue-600">Saving...</span>
          )}
        </div>
      </div>

      {/* Page Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Page to Edit</CardTitle>
          <CardDescription>
            Choose which page content you want to modify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availablePages.map((page) => (
              <Button
                key={page.id}
                variant={selectedPage === page.id ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => loadPageContent(page.id)}
                disabled={isLoading}
              >
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">{page.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {pageContent && (
        <>
          {/* Page Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {pageContent.title}
              </CardTitle>
              <CardDescription>
                Path: {pageContent.path} • Last modified: {pageContent.lastModified}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Sections:</span>
                  <span>{pageContent.sections.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Status:</span>
                  <Badge variant="outline">Published</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Content Editor</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Edit</TabsTrigger>
              <TabsTrigger value="seo">SEO Optimizer</TabsTrigger>
              <TabsTrigger value="media">Media Manager</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
              <TabsTrigger value="export">Export/Import</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Content Elements
                  </CardTitle>
                  <CardDescription>
                    Edit individual content elements from your page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search content elements..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="max-w-sm"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                      <Button size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save All
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {filteredContent.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getTypeIcon(item.type)}
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.value.length > 80 
                                  ? `${item.value.substring(0, 80)}...` 
                                  : item.value
                                }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.type}</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredContent.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="mx-auto h-12 w-12 mb-4" />
                        <p>No content elements found matching your search.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Bulk Content Editor
                  </CardTitle>
                  <CardDescription>
                    Edit multiple content elements at once
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Filter by Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="heading">Headings</SelectItem>
                            <SelectItem value="paragraph">Paragraphs</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="stats">Statistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Filter by Section</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All sections" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sections</SelectItem>
                            <SelectItem value="hero">Hero</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="case-studies">Case Studies</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">
                        Selected elements: 12
                      </div>
                      <Button className="w-full">
                        Edit Selected Elements
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    SEO Optimization
                  </CardTitle>
                  <CardDescription>
                    Optimize your content for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>SEO Title</Label>
                        <Input defaultValue={pageContent.title} />
                        <p className="text-xs text-muted-foreground">
                          60 characters recommended
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea rows={3} placeholder="Enter meta description" />
                        <p className="text-xs text-muted-foreground">
                          160 characters recommended
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Focus Keywords</Label>
                      <Input placeholder="keyword1, keyword2, keyword3" />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">SEO Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Title Length</span>
                          <Badge className="bg-green-600 text-white">Good</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Meta Description</span>
                          <Badge className="bg-yellow-600 text-white">Needs Work</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Keyword Density</span>
                          <Badge className="bg-green-600 text-white">Optimal</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Readability Score</span>
                          <Badge className="bg-green-600 text-white">Excellent</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" alt="Media icon" />
                    Media Manager
                  </CardTitle>
                  <CardDescription>
                    Manage images, videos, and other media assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Media
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Import from URL
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" alt="Image placeholder" />
                        </div>
                        <p className="text-sm font-medium">hero-image.jpg</p>
                        <p className="text-xs text-muted-foreground">245 KB</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" alt="Image placeholder" />
                        </div>
                        <p className="text-sm font-medium">logo.png</p>
                        <p className="text-xs text-muted-foreground">89 KB</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">demo-video.mp4</p>
                        <p className="text-xs text-muted-foreground">2.4 MB</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">Add New</p>
                        <p className="text-xs text-muted-foreground">Upload media</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Version History
                  </CardTitle>
                  <CardDescription>
                    Track changes and restore previous versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Current Version</p>
                            <p className="text-sm text-muted-foreground">
                              Updated 2 hours ago • 12 changes
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Changes
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Version 2.1</p>
                            <p className="text-sm text-muted-foreground">
                              Updated yesterday • 8 changes
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                          <Button variant="outline" size="sm">
                            Compare
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">Version 2.0</p>
                            <p className="text-sm text-muted-foreground">
                              Updated 3 days ago • 15 changes
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                          <Button variant="outline" size="sm">
                            Compare
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Export Content
                    </CardTitle>
                    <CardDescription>
                      Download your content in various formats
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export as JSON
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export as XML
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export as Plain Text
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Import Content
                    </CardTitle>
                    <CardDescription>
                      Import content from external sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JSON, CSV, XML
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Choose File
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              {editingItem && `Editing: ${editingItem.label}`}
            </DialogDescription>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(editingItem.type)}
                    <Badge variant="outline">{editingItem.type}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <div className="text-sm text-muted-foreground">{editingItem.section}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentValue">Content</Label>
                <Textarea
                  id="contentValue"
                  value={editingItem.value}
                  onChange={(e) => setEditingItem({ 
                    ...editingItem, 
                    value: e.target.value 
                  })}
                  rows={6}
                  placeholder="Enter content..."
                />
                <p className="text-xs text-muted-foreground">
                  This will update the actual text on your website
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}