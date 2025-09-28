// Analytics and Monitoring Configuration for Vercel
// This file sets up various analytics and monitoring tools

import { useEffect } from 'react';

// Vercel Analytics (automatically configured by Vercel)
export const VercelAnalytics = () => {
  useEffect(() => {
    // Vercel Analytics is automatically injected by Vercel
    // No additional setup needed
    if (process.env.NODE_ENV === 'production') {
      console.log('Vercel Analytics enabled');
    }
  }, []);

  return null;
};

// Web Vitals monitoring
export const WebVitals = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const reportWebVitals = ({ name, value, id }) => {
        // Send to Vercel Analytics
        if (window.va) {
          window.va('event', {
            name: 'web-vital',
            data: {
              metric: name,
              value: Math.round(name === 'CLS' ? value * 1000 : value),
              id,
            },
          });
        }
      };

      // Import and use web-vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      });
    }
  }, []);

  return null;
};

// Custom event tracking
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Send to Vercel Analytics
    if (window.va) {
      window.va('event', {
        name: eventName,
        data: eventData,
      });
    }

    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  }
};

// Page view tracking
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Send to Vercel Analytics
    if (window.va) {
      window.va('event', {
        name: 'page_view',
        data: {
          page_path: pagePath,
          page_title: pageTitle,
        },
      });
    }

    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    console.error('Error tracked:', error, errorInfo);

    // Send to Vercel Analytics
    if (window.va) {
      window.va('event', {
        name: 'error',
        data: {
          error_message: error.message,
          error_stack: error.stack,
          ...errorInfo,
        },
      });
    }
  }
};

// Performance monitoring
export const monitorPerformance = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Monitor page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          trackEvent('page_load_performance', {
            load_time: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
            dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            first_paint: Math.round(navigation.responseStart - navigation.fetchStart),
          });
        }
      }, 0);
    });

    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          trackEvent('resource_load', {
            resource_type: entry.initiatorType,
            resource_size: entry.transferSize,
            load_time: Math.round(entry.duration),
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

// User behavior tracking
export const trackUserBehavior = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll depth milestones
        if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
          trackEvent('scroll_depth', {
            scroll_percent: scrollPercent,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', {
        time_seconds: timeOnPage,
      });
    });

    // Track form interactions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      trackEvent('form_submission', {
        form_id: form.id || 'unknown',
        form_action: form.action || 'unknown',
      });
    });

    // Track outbound links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        trackEvent('outbound_link', {
          link_url: link.href,
          link_text: link.textContent,
        });
      }
    });
  }
};

// Analytics Provider Component
export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Initialize analytics
      monitorPerformance();
      trackUserBehavior();
      
      // Track initial page view
      trackPageView(window.location.pathname, document.title);
    }
  }, []);

  return (
    <>
      <VercelAnalytics />
      <WebVitals />
      {children}
    </>
  );
};

// Hook for using analytics in components
export const useAnalytics = () => {
  const trackToolUsage = (toolName, toolData = {}) => {
    trackEvent('tool_usage', {
      tool_name: toolName,
      ...toolData,
    });
  };

  const trackConversion = (conversionType, conversionData = {}) => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      ...conversionData,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackError,
    trackToolUsage,
    trackConversion,
  };
};

export default AnalyticsProvider;