'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Home,
  User,
  Briefcase,
  BarChart3,
  FileText,
  Mail,
  Menu,
  X,
  ChevronDown,
  Download,
  Calculator,
  FileQuestion,
  Shield,
  FileText as FileContract,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Activity,
  Zap,
  PenTool,
  Lightbulb,
  Radio,
  FileSpreadsheet
} from 'lucide-react'

interface NavigationProps {
  currentPath?: string
}

export default function Navigation({ currentPath = '/' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const fullText = 'Michael Zahy'

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Only track sections on home page
      if (window.location.pathname === '/') {
        const sections = ['home', 'work', 'about', 'services', 'contact']
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }
    
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('nav')) {
        setOpenDropdown(null)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeText, 200) // Typing speed
      } else {
        // Text is complete, stop typing and hide cursor
        setIsTyping(false)
      }
    }

    typeText()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [fullText])

  const navItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: Home, 
      section: 'home' 
    },
    { 
      href: '/about', 
      label: 'About', 
      icon: User, 
      section: 'about' 
    },
    {
      href: '/services',
      label: 'Services',
      icon: Briefcase,
      dropdown: [
        { href: '/services', label: 'All Services', icon: Briefcase },
        { href: '/case-studies', label: 'Case Studies', icon: BarChart3 }
      ]
    },
    {
      href: '/tools',
      label: 'Tools',
      icon: Calculator,
      dropdown: [
        { 
          href: '/tools#mediaBuyers', 
          label: 'Media Buyers Tools', 
          icon: Radio,
          subItems: [
            { href: '/roi-calculator', label: 'ROI Calculator', icon: TrendingUp },
            { href: '/cac-calculator', label: 'CAC Calculator', icon: Users },
            { href: '/ad-budget-calculator', label: 'Ad Budget Calculator', icon: Target },
            { href: '/conversion-rate-calculator', label: 'Conversion Rate Calculator', icon: BarChart3 },
            { href: '/ab-test-calculator', label: 'A/B Test Calculator', icon: Activity },
            { href: '/media-buying-plan-tool', label: 'Media Buying Plan Tool', icon: Radio }
          ]
        },
        { 
          href: '/tools#marketers', 
          label: 'Marketers & Planners Tools', 
          icon: Target,
          subItems: [
            { href: '/ltv-calculator', label: 'LTV Calculator', icon: DollarSign },
            { href: '/break-even-calculator', label: 'Break-even Calculator', icon: BarChart3 },
            { href: '/marketing-strategy-tool', label: 'Marketing Strategy Tool', icon: Lightbulb },
            { href: '/metrics-analysis-tool', label: 'Basic Metrics Analysis Tools', icon: BarChart3 },
            { href: '/external-factors-evaluation-tool', label: 'External Factors Evaluation Tools', icon: Target },
            { href: '/comprehensive-strategy-tool', label: 'Comprehensive Strategy Tools', icon: Lightbulb },
            { href: '/google-sheets-docs-tool', label: 'Google Sheets & Docs Tools', icon: FileSpreadsheet }
          ]
        },
        { 
          href: '/tools#contentWriters', 
          label: 'Content Writers Tools', 
          icon: PenTool,
          subItems: [
            { href: '/copywriting-tools', label: 'Copywriting Tools', icon: PenTool },
            { href: '/creative-optimization-tool', label: 'Creative Optimisation Tools', icon: Zap }
          ]
        },
        { href: '/tools', label: 'View All Tools', icon: Calculator }
      ]
    },
    {
      href: '/resources',
      label: 'Resources',
      icon: Download,
      dropdown: [
        { href: '/marketing-audit', label: 'Marketing Audit', icon: BarChart3 },
        { href: '/marketing-strategy-guide', label: 'Strategy Guide', icon: Download },
        { href: '/faq', label: 'FAQ', icon: FileQuestion }
      ]
    },
    { 
      href: '/contact', 
      label: 'Contact', 
      icon: Mail, 
      section: 'contact' 
    },
  ]

  const legalItems = [
    { href: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
    { href: '/terms-of-service', label: 'Terms of Service', icon: FileContract },
    { href: '/disclaimer', label: 'Disclaimer', icon: Shield },
    { href: '/cookie-policy', label: 'Cookie Policy', icon: Shield }
  ]

  const handleNavigation = (href: string, section?: string) => {
    // Check if we're on the client side
    const isClient = typeof window !== 'undefined'
    
    if (!isClient) return
    
    // Close all dropdowns and mobile menu
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    
    if (section && window.location.pathname === '/') {
      // Handle section navigation on home page
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (href.startsWith('/')) {
      // Handle internal navigation
      if (window.location.pathname === href) {
        // Already on the same page, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        // Navigate to the page
        window.location.href = href
      }
    } else {
      // Handle external links
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  const isActive = (item: typeof navItems[0]) => {
    // Check if we're on the client side
    const isClient = typeof window !== 'undefined'
    
    if (!isClient) {
      return currentPath === item.href
    }
    
    if (window.location.pathname !== '/') {
      if (item.dropdown) {
        // Check if current path matches any dropdown item
        for (const dropItem of item.dropdown) {
          if (dropItem.href && currentPath === dropItem.href) {
            return true
          }
        }
        return false
      }
      return currentPath === item.href
    }
    return item.section && activeSection === item.section
  }

  const isDropdownActive = (item: typeof navItems[0]) => {
    if (!item.dropdown) return false
    for (const dropItem of item.dropdown) {
      if (dropItem.href && currentPath === dropItem.href) {
        return true
      }
    }
    return false
  }

  const toggleDropdown = (itemLabel: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel)
  }

  const DropdownMenu = ({ items, isOpen }: { items: typeof navItems[0]['dropdown'], isOpen: boolean }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-96 bg-gradient-to-b from-black/95 via-black/90 to-black/85 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          {/* Dropdown header with gradient accent */}
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 w-full"></div>
          
          <div className="py-2 max-h-96 overflow-y-auto custom-scrollbar">
            {items?.map((dropItem) => (
              <div key={dropItem.label} className="dropdown-item">
                {dropItem.href ? (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleNavigation(dropItem.href)
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 relative ${
                      currentPath === dropItem.href
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-l-4 border-purple-400'
                        : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon with gradient background */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      currentPath === dropItem.href
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                    }`}>
                      {dropItem.icon && <dropItem.icon className={`w-4 h-4 ${
                        currentPath === dropItem.href ? 'text-white' : 'text-purple-300'
                      }`} />}
                    </div>
                    
                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium truncate ${
                        currentPath === dropItem.href ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {dropItem.label}
                      </span>
                    </div>
                    
                    {/* Active indicator */}
                    {currentPath === dropItem.href && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        initial={false}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Hover arrow */}
                    <motion.div
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={false}
                    >
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  </motion.button>
                ) : (
                  // Category header with sub-items
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-2 text-purple-300 font-medium text-sm border-b border-white/10">
                      <dropItem.icon className="w-4 h-4" />
                      {dropItem.label}
                    </div>
                    {dropItem.subItems?.map((subItem: any) => (
                      <motion.button
                        key={subItem.label}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleNavigation(subItem.href)
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all duration-200 relative ml-4 ${
                          currentPath === subItem.href
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-l-4 border-purple-400'
                            : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Icon with gradient background */}
                        <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${
                          currentPath === subItem.href
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                        }`}>
                          {subItem.icon && <subItem.icon className={`w-3 h-3 ${
                            currentPath === subItem.href ? 'text-white' : 'text-purple-300'
                          }`} />}
                        </div>
                        
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-medium truncate ${
                            currentPath === subItem.href ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {subItem.label}
                          </span>
                        </div>
                        
                        {/* Active indicator */}
                        {currentPath === subItem.href && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                            initial={false}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Dropdown footer with subtle gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-1"></div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-purple-500/20 h-16 shadow-lg' 
        : 'bg-black/60 backdrop-blur-lg border-b border-purple-500/20 h-20 shadow-lg'
    }`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => handleNavigation('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <motion.span 
              className="text-white font-bold text-lg relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              MZ
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {typedText}
            {isTyping && <motion.span 
              className="inline-block w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />}
          </motion.span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              <motion.button
                onClick={(e) => item.dropdown ? toggleDropdown(item.label, e) : handleNavigation(item.href, item.section)}
                className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 group flex items-center gap-2 ${
                  isActive(item) 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.dropdown && (
                  <ChevronDown 
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openDropdown === item.label ? 'rotate-180' : ''
                    }`} 
                  />
                )}
                {isActive(item) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
              {item.dropdown && (
                <DropdownMenu items={item.dropdown} isOpen={openDropdown === item.label} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay to prevent interaction with background elements */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[55] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 bg-black/80 backdrop-blur-lg rounded-b-2xl border border-purple-500/20 shadow-2xl relative z-[56]"
          >
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <motion.button
                  onClick={(e) => item.dropdown ? toggleDropdown(item.label, e) : handleNavigation(item.href, item.section)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item) || isDropdownActive(item)
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-4 border-purple-400 shadow-lg' 
                      : 'bg-black/40 text-gray-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white backdrop-blur-sm border border-purple-500/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.dropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 text-purple-400 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </motion.button>
                
                {/* Mobile Dropdown */}
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-2 space-y-1 overflow-hidden"
                  >
                    {item.dropdown.map((dropItem) => (
                      <motion.button
                        key={dropItem.href}
                        onClick={() => handleNavigation(dropItem.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                          currentPath === dropItem.href
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-4 border-purple-400 shadow-lg'
                            : 'bg-black/40 text-gray-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white backdrop-blur-sm border border-purple-500/20'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Icon with gradient background */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          currentPath === dropItem.href
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                        }`}>
                          {dropItem.icon && <dropItem.icon className={`w-4 h-4 ${
                            currentPath === dropItem.href ? 'text-white' : 'text-purple-300'
                          }`} />}
                        </div>
                        
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-medium truncate ${
                            currentPath === dropItem.href ? 'text-white' : 'text-gray-300'
                          }`}>
                            {dropItem.label}
                          </span>
                        </div>
                        
                        {/* Active indicator */}
                        {currentPath === dropItem.href && (
                          <motion.div
                            className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
          {/* Legal Links */}
          <div className="mt-6 pt-4 border-t border-purple-500/30">
            <p className="text-xs text-gray-400 px-4 mb-2 font-medium">Legal</p>
            {legalItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPath === item.href
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-l-4 border-purple-400 shadow-lg'
                    : 'bg-black/40 text-gray-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white backdrop-blur-sm border border-purple-500/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">{item.label}</span>
                {currentPath === item.href && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
        </>
      )}
    </nav>
  )
}

// Custom scrollbar styles for dropdown menus
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(147, 51, 234, 0.1);
    border-radius: 4px;
    margin: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(147, 51, 234, 0.6) 0%, rgba(236, 72, 153, 0.6) 100%);
    border-radius: 4px;
    border: 1px solid rgba(147, 51, 234, 0.3);
    transition: all 0.3s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(147, 51, 234, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%);
  }
`

// Inject custom scrollbar styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = customScrollbarStyles
  document.head.appendChild(style)
}