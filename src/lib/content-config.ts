// Content configuration for the website
// This file contains all the editable content that can be managed through the admin panel

export interface ContentItem {
  id: string
  type: string
  title: string
  content: string
  rawContent?: string
  properties?: any
}

export interface PageContent {
  id: string
  title: string
  path: string
  content: string
  sections: ContentItem[]
  lastModified: string
}

// Home page content
export const homePageContent: PageContent = {
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
      content: 'Media Buyer & Performance Marketing',
      rawContent: 'Media Buyer & Performance Marketing'
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
      id: 'meta-ads-price',
      type: 'services',
      title: 'Meta Ads Price',
      content: 'Starting from EGP 5,000/month',
      rawContent: 'Starting from EGP 5,000/month'
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
      id: 'performance-marketing-price',
      type: 'services',
      title: 'Performance Marketing Price',
      content: 'Starting from EGP 7,500/month',
      rawContent: 'Starting from EGP 7,500/month'
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
      id: 'growth-hacking-price',
      type: 'services',
      title: 'Growth Hacking Price',
      content: 'Starting from EGP 10,000/month',
      rawContent: 'Starting from EGP 10,000/month'
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
      id: 'ecommerce-marketing-price',
      type: 'services',
      title: 'E-commerce Marketing Price',
      content: 'Starting from EGP 6,000/month',
      rawContent: 'Starting from EGP 6,000/month'
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
      id: 'lead-generation-price',
      type: 'services',
      title: 'Lead Generation Price',
      content: 'Starting from EGP 4,000/month',
      rawContent: 'Starting from EGP 4,000/month'
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
      id: 'marketing-analytics-price',
      type: 'services',
      title: 'Marketing Analytics Price',
      content: 'Starting from EGP 3,000/month',
      rawContent: 'Starting from EGP 3,000/month'
    }
  ],
  lastModified: new Date().toISOString()
}

// Hook to get content by ID
export function getContentById(pageContent: PageContent, id: string): string {
  const section = pageContent.sections.find(section => section.id === id)
  return section?.content || ''
}

// Hook to get content by type
export function getContentByType(pageContent: PageContent, type: string): ContentItem[] {
  return pageContent.sections.filter(section => section.type === type)
}

// Hook to get service prices
export function getServicePrices(pageContent: PageContent): Record<string, string> {
  const servicePrices: Record<string, string> = {}
  
  pageContent.sections
    .filter(section => section.type === 'services' && section.id.includes('price'))
    .forEach(section => {
      const serviceId = section.id.replace('-price', '')
      servicePrices[serviceId] = section.content
    })
  
  return servicePrices
}