'use client'

import { ReactNode, useEffect, useState } from 'react'

interface RTLWrapperProps {
  children: ReactNode
  className?: string
  language?: 'ar' | 'en'
  forceDirection?: 'rtl' | 'ltr' | 'auto'
}

export default function RTLWrapper({ 
  children, 
  className = '', 
  language = 'ar',
  forceDirection
}: RTLWrapperProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Add RTL-specific CSS classes to body
    const isRTL = forceDirection === 'rtl' || (forceDirection === 'auto' && language === 'ar')
    
    if (isRTL) {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
      document.body.classList.add('rtl-enabled')
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
      document.body.classList.remove('rtl-enabled')
    }
    
    // Cleanup on unmount
    return () => {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
      document.body.classList.remove('rtl-enabled')
    }
  }, [language, forceDirection])
  
  const isRTL = forceDirection === 'rtl' || (forceDirection === 'auto' && language === 'ar')
  
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <div 
      className={`${className} ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: isRTL 
          ? "'Noto Sans Arabic', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', sans-serif" 
          : "'Inter', 'Segoe UI', 'system-ui', '-apple-system', 'BlinkMacSystemFont', sans-serif",
        lineHeight: '1.8',
        letterSpacing: isRTL ? '0.02em' : '0.01em',
        fontSynthesis: 'none',
        fontVariantLigatures: 'common-ligatures',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      {/* RTL-specific styles */}
      <style jsx global>{`
        .rtl-enabled {
          font-family: 'Noto Sans Arabic', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', sans-serif;
        }
        
        .rtl-enabled .text-left {
          text-align: right !important;
        }
        
        .rtl-enabled .text-right {
          text-align: left !important;
        }
        
        .rtl-enabled .ml-auto {
          margin-right: auto !important;
          margin-left: 0 !important;
        }
        
        .rtl-enabled .mr-auto {
          margin-left: auto !important;
          margin-right: 0 !important;
        }
        
        .rtl-enabled .pl-4 {
          padding-right: 1rem !important;
          padding-left: 0 !important;
        }
        
        .rtl-enabled .pr-4 {
          padding-left: 1rem !important;
          padding-right: 0 !important;
        }
        
        .rtl-enabled .border-l {
          border-right: 1px solid currentColor !important;
          border-left: none !important;
        }
        
        .rtl-enabled .border-r {
          border-left: 1px solid currentColor !important;
          border-right: none !important;
        }
        
        .rtl-enabled .rounded-l-lg {
          border-top-right-radius: 0.5rem !important;
          border-bottom-right-radius: 0.5rem !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }
        
        .rtl-enabled .rounded-r-lg {
          border-top-left-radius: 0.5rem !important;
          border-bottom-left-radius: 0.5rem !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        
        /* Flexbox RTL fixes */
        .rtl-enabled .flex-row-reverse {
          flex-direction: row-reverse;
        }
        
        .rtl-enabled .justify-start {
          justify-content: flex-end !important;
        }
        
        .rtl-enabled .justify-end {
          justify-content: flex-start !important;
        }
        
        /* Input field fixes */
        .rtl-enabled input[type="text"],
        .rtl-enabled input[type="email"],
        .rtl-enabled input[type="password"],
        .rtl-enabled textarea,
        .rtl-enabled select {
          text-align: right;
        }
        
        .rtl-enabled input::placeholder {
          text-align: right;
        }
        
        /* Table fixes */
        .rtl-enabled table {
          direction: rtl;
        }
        
        .rtl-enabled th {
          text-align: right;
        }
        
        .rtl-enabled td {
          text-align: right;
        }
        
        /* List fixes */
        .rtl-enabled ul,
        .rtl-enabled ol {
          padding-right: 1.5rem;
          padding-left: 0;
        }
        
        .rtl-enabled .list-disc {
          list-style-type: disc;
        }
        
        .rtl-enabled .list-decimal {
          list-style-type: decimal;
        }
        
        /* Button fixes */
        .rtl-enabled .btn-group > .btn:not(:last-child) {
          margin-left: 0;
          margin-right: -1px;
        }
        
        /* Navigation fixes */
        .rtl-enabled .nav-link {
          margin-right: 0;
          margin-left: 1rem;
        }
        
        /* Form fixes */
        .rtl-enabled .form-label {
          text-align: right;
        }
        
        .rtl-enabled .form-check-input {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        
        /* Code block fixes */
        .rtl-enabled pre {
          direction: ltr;
          text-align: left;
        }
        
        .rtl-enabled code {
          direction: ltr;
          text-align: left;
        }
        
        /* Icon fixes */
        .rtl-enabled .icon-left {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        
        .rtl-enabled .icon-right {
          margin-left: 0;
          margin-right: 0.5rem;
        }
        
        /* Animation fixes */
        @keyframes slideInRTL {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRTL {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .rtl-enabled .slide-in {
          animation: slideInRTL 0.3s ease-out;
        }
        
        .rtl-enabled .slide-out {
          animation: slideOutRTL 0.3s ease-out;
        }
        
        /* Print styles */
        @media print {
          .rtl-enabled {
            direction: rtl;
          }
        }
        
        /* Mobile-specific RTL fixes */
        @media (max-width: 768px) {
          .rtl-enabled .container {
            padding-right: 1rem;
            padding-left: 1rem;
          }
          
          .rtl-enabled .mobile-nav {
            right: 0;
            left: auto;
          }
          
          .rtl-enabled .mobile-menu {
            right: 0;
            left: auto;
            transform: translateX(100%);
          }
          
          .rtl-enabled .mobile-menu.active {
            transform: translateX(0);
          }
        }
      `}</style>
      
      {children}
    </div>
  )
}