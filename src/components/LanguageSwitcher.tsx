'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, ChevronDown } from 'lucide-react'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'button' | 'select'
  onLanguageChange?: (language: 'ar' | 'en') => void
  // Add admin-specific props
  isAdmin?: boolean
  showFlags?: boolean
}

const languages = [
  { code: 'ar' as const, name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸', nativeName: 'English' }
]

export default function LanguageSwitcher({ 
  className = '', 
  variant = 'button',
  onLanguageChange,
  isAdmin = false,
  showFlags = true
}: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'ar' | 'en'>('ar')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language') as 'ar' | 'en' | null
    const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en'
    const language = savedLanguage || browserLanguage
    
    setCurrentLanguage(language)
    
    // Apply language to document
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [])

  const handleLanguageChange = (language: 'ar' | 'en') => {
    setCurrentLanguage(language)
    
    // Save to localStorage
    localStorage.setItem('language', language)
    
    // Update document attributes
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    
    // Add RTL class to body if needed
    if (language === 'ar') {
      document.body.classList.add('rtl-enabled')
    } else {
      document.body.classList.remove('rtl-enabled')
    }
    
    // Trigger custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }))
    
    // Call callback if provided
    if (onLanguageChange) {
      onLanguageChange(language)
    }
    
    setIsOpen(false)
  }

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0]
  }

  // Admin-specific styling
  if (isAdmin) {
    if (variant === 'select') {
      return (
        <Select value={currentLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className={`w-32 ${className}`}>
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                <div className="flex items-center space-x-2">
                  {showFlags && <span>{language.flag}</span>}
                  <span>{language.nativeName}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white border-gray-300 hover:bg-gray-50"
        >
          <Globe className="w-4 h-4" />
          {showFlags && <span>{getCurrentLanguageInfo().flag}</span>}
          <span className="hidden sm:inline">{getCurrentLanguageInfo().nativeName}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-gray-100 transition-colors ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {showFlags && <span className="text-lg">{language.flag}</span>}
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Public site styling (original)
  if (variant === 'select') {
    return (
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-32 ${className}`}>
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                {showFlags && <span>{language.flag}</span>}
                <span>{language.nativeName}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Globe className="w-4 h-4" />
        {showFlags && <span>{getCurrentLanguageInfo().flag}</span>}
        <span className="hidden sm:inline">{getCurrentLanguageInfo().nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-gray-100 transition-colors ${
                  currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {showFlags && <span className="text-lg">{language.flag}</span>}
                <div className="flex-1">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
                {currentLanguage === language.code && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}