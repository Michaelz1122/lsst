# Marketing Agency Website - Next.js

A professional marketing agency website built with Next.js 15, featuring comprehensive marketing tools, calculators, and multi-language support (English/Arabic).

## 🌟 Features

### 🎯 Marketing Tools & Calculators
- **ROI Calculator** - Calculate return on investment for marketing campaigns
- **CAC Calculator** - Customer acquisition cost analysis
- **LTV Calculator** - Customer lifetime value calculation
- **Ad Budget Calculator** - Plan your advertising budget effectively
- **A/B Test Calculator** - Determine statistical significance of test results
- **Break-even Calculator** - Find your break-even point
- **Conversion Rate Calculator** - Analyze and optimize conversion rates

### 📊 Strategy Tools
- **Marketing Strategy Tool** - Comprehensive strategy development
- **Media Buying Plan Tool** - Plan media buying campaigns
- **Creative Optimization Tool** - Optimize ad creatives
- **Metrics Analysis Tool** - Analyze marketing metrics
- **External Factors Evaluation Tool** - Assess external market factors
- **Comprehensive Strategy Tool** - All-in-one strategy planning

### 📝 Content Tools
- **Copywriting Tools** - Enhance your marketing copy
- **Google Sheets & Docs Tools** - Integration with Google Workspace

### 🌍 Multi-Language Support
- Complete English and Arabic versions
- RTL (Right-to-Left) support for Arabic
- Localized content and tools

### 🎨 Modern Design
- Responsive design with Tailwind CSS
- Professional UI with shadcn/ui components
- Smooth animations with Framer Motion
- Dark theme with gradient accents

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand, TanStack Query
- **Real-time**: Socket.IO

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [calculator-name]/        # Calculator pages
│   ├── [calculator-name]-ar/      # Arabic versions
│   ├── tools/                    # Tools overview page
│   ├── api/                      # API routes
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── Navigation.tsx           # Main navigation
│   ├── Logo.tsx                 # Company logo
│   └── [other components]       # Custom components
├── hooks/
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notifications
├── lib/
│   ├── db.ts                    # Database connection
│   ├── utils.ts                 # Utility functions
│   └── socket.ts                # Socket.IO setup
└── prisma/
    └── schema.prisma            # Database schema
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
# Create database schema
npm run db:push
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="file:./dev.db"

# Optional: AI Integration
OPENAI_API_KEY="your-openai-api-key"
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the Website
- Open your browser to `http://localhost:3000`
- The website will be running with all marketing tools and features

## 🌐 Deployment

### 🚀 Vercel Deployment (Recommended)

This project is fully optimized and ready for deployment on Vercel.com!

#### Quick Start
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables (see `.env.example`)
4. Deploy! 🎉

#### Detailed Guide
See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for complete deployment instructions.

#### One-Command Deployment
```bash
# Install Vercel CLI
npm i -g vercel
vercel login

# Deploy to Vercel
vercel --prod
```

#### Environment Variables Required
```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### z.ai Platform Deployment

#### 1. Push to Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Configure Environment
In the z.ai dashboard, add required environment variables from `.env.example`.

## 🔗 API Integration

### OpenAI API (Optional)
For AI-powered features:

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to environment variables:
```env
OPENAI_API_KEY="sk-your-openai-api-key"
```

## 📱 Available Tools

### Media Buyers Tools
- ROI Calculator
- CAC Calculator  
- Ad Budget Calculator
- Conversion Rate Calculator
- A/B Test Calculator
- Media Buying Plan Tool

### Marketers & Planners Tools
- LTV Calculator
- Break-even Calculator
- Marketing Strategy Tool
- Metrics Analysis Tool
- External Factors Evaluation Tool
- Comprehensive Strategy Tool
- Google Sheets & Docs Tools

### Content Writers Tools
- Copywriting Tools
- Creative Optimization Tool

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Pink gradients
- **Background**: Dark theme (gray-900 to black)
- **Accent**: Blue/Cyan highlights
- **Text**: White with gray variations

### Components
- Professional navigation with dropdown menus
- Interactive calculator interfaces
- Responsive card layouts
- Animated backgrounds and elements
- Mobile-first design approach

## 🛡️ Security Features

- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure database queries
- Rate limiting

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` is correctly set
- Run `npm run db:push` to create/update schema

### Build Errors
- Check TypeScript types
- Verify all dependencies are installed
- Run `npm run lint` to check for issues

### Tool Not Working
- Verify API keys are set (if using AI features)
- Check browser console for errors
- Ensure all required data is provided

## 📞 Support

For support and inquiries:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure the database is properly configured

## 📄 License

This project is for demonstration and educational purposes.

---

**Note**: This is a marketing agency website showcasing various tools and calculators. All features are fully functional and ready for production use.