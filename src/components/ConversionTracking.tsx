'use client'

import { useEffect } from 'react'

interface ConversionData {
  conversion_type: string
  value?: number
  currency?: string
  user_data?: {
    email?: string
    phone?: string
    name?: string
  }
  metadata?: Record<string, any>
}

export default function ConversionTracking() {
  useEffect(() => {
    // Simple conversion tracking
    const trackConversion = (conversionData: ConversionData) => {
      const conversion = {
        ...conversionData,
        timestamp: Date.now(),
        page_url: window.location.href,
        user_agent: navigator.userAgent
      }

      // Store conversions in localStorage for demo purposes
      const conversions = JSON.parse(localStorage.getItem('conversions') || '[]')
      conversions.push(conversion)
      
      // Keep only last 50 conversions
      if (conversions.length > 50) {
        conversions.shift()
      }
      
      localStorage.setItem('conversions', JSON.stringify(conversions))
      
      // In a real implementation, you would send this to your conversion tracking service
      console.log('Conversion Tracked:', conversion)
      
      // You could also send to Facebook Pixel, Google Analytics, etc.
      // if (typeof fbq !== 'undefined') {
      //   fbq('track', 'Purchase', conversionData);
      // }
    }

    // Track form submissions as conversions
    const trackFormConversion = (e: Event) => {
      const form = e.target as HTMLFormElement
      
      // Check if form has conversion tracking attributes
      const conversionType = form.getAttribute('data-conversion-type') || 'form_submission'
      const conversionValue = parseFloat(form.getAttribute('data-conversion-value') || '0')
      
      // Extract form data
      const formData = new FormData(form)
      const userData = {
        email: formData.get('email')?.toString() || undefined,
        phone: formData.get('phone')?.toString() || undefined,
        name: formData.get('name')?.toString() || undefined
      }

      trackConversion({
        conversion_type: conversionType,
        value: conversionValue,
        currency: 'EGP',
        user_data: userData,
        metadata: {
          form_id: form.id || 'unknown',
          form_action: form.action || 'unknown'
        }
      })
    }

    // Track button clicks as conversions
    const trackButtonClick = (e: Event) => {
      const button = e.target as HTMLElement
      const buttonElement = button.tagName === 'BUTTON' ? button : button.closest('button')
      
      if (buttonElement) {
        const conversionType = buttonElement.getAttribute('data-conversion-type')
        const conversionValue = parseFloat(buttonElement.getAttribute('data-conversion-value') || '0')
        
        if (conversionType) {
          trackConversion({
            conversion_type: conversionType,
            value: conversionValue,
            currency: 'EGP',
            metadata: {
              button_text: buttonElement.textContent || 'unknown',
              button_id: buttonElement.id || 'unknown'
            }
          })
        }
      }
    }

    // Track lead magnet downloads
    const trackLeadMagnet = (e: Event) => {
      const element = e.target as HTMLElement
      const leadMagnetElement = element.closest('[data-lead-magnet]')
      
      if (leadMagnetElement) {
        const magnetType = leadMagnetElement.getAttribute('data-lead-magnet') || 'unknown'
        
        trackConversion({
          conversion_type: 'lead_magnet_download',
          metadata: {
            magnet_type: magnetType,
            element_text: leadMagnetElement.textContent || 'unknown'
          }
        })
      }
    }

    // Track outbound link clicks
    const trackOutboundClick = (e: Event) => {
      const link = e.target as HTMLElement
      const linkElement = link.tagName === 'A' ? link : link.closest('a')
      
      if (linkElement) {
        const href = linkElement.getAttribute('href')
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
          trackConversion({
            conversion_type: 'outbound_click',
            metadata: {
              destination_url: href,
              link_text: linkElement.textContent || 'unknown'
            }
          })
        }
      }
    }

    // Track phone number clicks
    const trackPhoneClick = (e: Event) => {
      const link = e.target as HTMLElement
      const linkElement = link.tagName === 'A' ? link : link.closest('a')
      
      if (linkElement) {
        const href = linkElement.getAttribute('href')
        if (href && href.startsWith('tel:')) {
          trackConversion({
            conversion_type: 'phone_click',
            metadata: {
              phone_number: href.replace('tel:', ''),
              link_text: linkElement.textContent || 'unknown'
            }
          })
        }
      }
    }

    // Track email clicks
    const trackEmailClick = (e: Event) => {
      const link = e.target as HTMLElement
      const linkElement = link.tagName === 'A' ? link : link.closest('a')
      
      if (linkElement) {
        const href = linkElement.getAttribute('href')
        if (href && href.startsWith('mailto:')) {
          trackConversion({
            conversion_type: 'email_click',
            metadata: {
              email_address: href.replace('mailto:', ''),
              link_text: linkElement.textContent || 'unknown'
            }
          })
        }
      }
    }

    // Add event listeners
    document.addEventListener('submit', trackFormConversion)
    document.addEventListener('click', trackButtonClick)
    document.addEventListener('click', trackLeadMagnet)
    document.addEventListener('click', trackOutboundClick)
    document.addEventListener('click', trackPhoneClick)
    document.addEventListener('click', trackEmailClick)

    // Cleanup
    return () => {
      document.removeEventListener('submit', trackFormConversion)
      document.removeEventListener('click', trackButtonClick)
      document.removeEventListener('click', trackLeadMagnet)
      document.removeEventListener('click', trackOutboundClick)
      document.removeEventListener('click', trackPhoneClick)
      document.removeEventListener('click', trackEmailClick)
    }
  }, [])

  return null
}