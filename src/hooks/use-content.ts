'use client'

import { homePageContent, getContentById, getServicePrices } from '@/lib/content-config'

export function useContent() {
  // For now, we'll use the static content from the config
  // In a real implementation, this would fetch from an API or context
  const pageContent = homePageContent

  const getContent = (id: string) => {
    return getContentById(pageContent, id)
  }

  const getServicePrice = (serviceId: string) => {
    const prices = getServicePrices(pageContent)
    return prices[serviceId] || ''
  }

  return {
    getContent,
    getServicePrice,
    pageContent
  }
}