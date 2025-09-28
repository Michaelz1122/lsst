import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create initial content for the home page
  const homeContent = [
    {
      key: 'home_hero_title',
      title: 'Hero Section Title',
      content: 'Michael Zahy - Performance Marketing Expert',
      type: 'text',
      page: 'home',
      section: 'hero-title'
    },
    {
      key: 'home_hero_subtitle',
      title: 'Hero Section Subtitle',
      content: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.',
      type: 'text',
      page: 'home',
      section: 'hero-subtitle'
    },
    {
      key: 'home_services_heading',
      title: 'Services Section Heading',
      content: 'Our Services',
      type: 'text',
      page: 'home',
      section: 'services-heading'
    },
    {
      key: 'home_meta_ads_title',
      title: 'Meta Ads Service Title',
      content: 'Meta Ads Management',
      type: 'text',
      page: 'home',
      section: 'meta-ads-title'
    },
    {
      key: 'home_meta_ads_description',
      title: 'Meta Ads Service Description',
      content: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI through data-driven optimization and creative excellence.',
      type: 'text',
      page: 'home',
      section: 'meta-ads-description'
    },
    {
      key: 'home_performance_marketing_title',
      title: 'Performance Marketing Title',
      content: 'Performance Marketing',
      type: 'text',
      page: 'home',
      section: 'performance-marketing-title'
    },
    {
      key: 'home_performance_marketing_description',
      title: 'Performance Marketing Description',
      content: 'Comprehensive digital marketing strategies focused on maximizing conversions, revenue, and ROI across multiple platforms and channels.',
      type: 'text',
      page: 'home',
      section: 'performance-marketing-description'
    },
    {
      key: 'home_growth_hacking_title',
      title: 'Growth Hacking Title',
      content: 'Growth Hacking',
      type: 'text',
      page: 'home',
      section: 'growth-hacking-title'
    },
    {
      key: 'home_growth_hacking_description',
      title: 'Growth Hacking Description',
      content: 'Innovative strategies and experiments to accelerate business growth through viral marketing, creative campaigns, and scalable acquisition tactics.',
      type: 'text',
      page: 'home',
      section: 'growth-hacking-description'
    },
    {
      key: 'home_ecommerce_marketing_title',
      title: 'E-commerce Marketing Title',
      content: 'E-commerce Marketing',
      type: 'text',
      page: 'home',
      section: 'ecommerce-marketing-title'
    },
    {
      key: 'home_ecommerce_marketing_description',
      title: 'E-commerce Marketing Description',
      content: 'Specialized marketing solutions for online stores focusing on product sales, customer retention, and revenue growth through targeted campaigns.',
      type: 'text',
      page: 'home',
      section: 'ecommerce-marketing-description'
    },
    {
      key: 'home_lead_generation_title',
      title: 'Lead Generation Title',
      content: 'Lead Generation',
      type: 'text',
      page: 'home',
      section: 'lead-generation-title'
    },
    {
      key: 'home_lead_generation_description',
      title: 'Lead Generation Description',
      content: 'High-quality lead acquisition strategies for service-based businesses with focus on lead quality, cost efficiency, and conversion optimization.',
      type: 'text',
      page: 'home',
      section: 'lead-generation-description'
    },
    {
      key: 'home_marketing_analytics_title',
      title: 'Marketing Analytics Title',
      content: 'Marketing Analytics',
      type: 'text',
      page: 'home',
      section: 'marketing-analytics-title'
    },
    {
      key: 'home_marketing_analytics_description',
      title: 'Marketing Analytics Description',
      content: 'In-depth data analysis and reporting to understand campaign performance, customer behavior, and opportunities for optimization and growth.',
      type: 'text',
      page: 'home',
      section: 'marketing-analytics-description'
    }
  ]

  // Insert content
  for (const content of homeContent) {
    await prisma.content.upsert({
      where: { key: content.key },
      update: content,
      create: content
    })
  }

  // Create admin user
  const adminUser = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'admin123456', // In production, use hashed passwords
      name: 'Administrator',
      role: 'admin'
    }
  })

  console.log('Database seeded successfully!')
  console.log('Admin user created:', adminUser.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })