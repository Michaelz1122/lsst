'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Globe, Mail, Phone, MapPin, Save, Palette, Shield, Database, Zap, Bell, Users, CreditCard } from 'lucide-react'

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'My Website',
    siteDescription: 'Welcome to our amazing website',
    siteUrl: 'https://mywebsite.com',
    adminEmail: 'admin@mywebsite.com',
    maintenanceMode: false,
    allowRegistration: true,
    siteLanguage: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  })

  const [contactSettings, setContactSettings] = useState({
    email: 'contact@mywebsite.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    businessHours: 'Monday - Friday: 9AM - 6PM',
    whatsapp: '+1 (555) 987-6543',
    facebook: 'https://facebook.com/mywebsite',
    twitter: 'https://twitter.com/mywebsite',
    instagram: 'https://instagram.com/mywebsite',
    linkedin: 'https://linkedin.com/company/mywebsite'
  })

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'My Website - Welcome',
    metaDescription: 'Discover amazing content and services on our website',
    metaKeywords: 'website, business, services',
    ogImage: '/og-image.jpg',
    twitterHandle: '@mywebsite',
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://mywebsite.com/sitemap.xml',
    canonicalUrl: '',
    noIndex: false,
    structuredData: ''
  })

  const [designSettings, setDesignSettings] = useState({
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    accentColor: '#f59e0b',
    fontFamily: 'Inter',
    fontSize: '16px',
    borderRadius: '8px',
    darkMode: false,
    animations: true,
    customCSS: ''
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    requireSpecialChars: true,
    sslEnabled: true,
    backupEnabled: true,
    autoBackup: 'daily'
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@mywebsite.com',
    smtpPassword: '••••••••',
    encryption: 'tls',
    fromName: 'My Website',
    fromEmail: 'noreply@mywebsite.com',
    emailNotifications: true,
    bounceHandling: true
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    securityAlerts: true,
    updateNotifications: true,
    backupNotifications: true,
    userRegistrationAlerts: true,
    commentNotifications: false,
    formSubmissionAlerts: true,
    performanceAlerts: true
  })

  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'USD',
    paymentGateway: 'stripe',
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalClientId: '',
    paypalSecret: '',
    taxRate: '0',
    shippingEnabled: false
  })

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving settings:', { 
      generalSettings, 
      contactSettings, 
      seoSettings,
      designSettings,
      securitySettings,
      emailSettings,
      notificationSettings,
      paymentSettings
    })
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your website settings and preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic website configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteLanguage">Site Language</Label>
                  <Select value={generalSettings.siteLanguage} onValueChange={(value) => setGeneralSettings({ ...generalSettings, siteLanguage: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="CET">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={generalSettings.dateFormat} onValueChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select value={generalSettings.timeFormat} onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeFormat: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable user registration
                  </p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={generalSettings.allowRegistration}
                  onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, allowRegistration: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Manage your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={contactSettings.phone}
                    onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={contactSettings.whatsapp}
                  onChange={(e) => setContactSettings({ ...contactSettings, whatsapp: e.target.value })}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Textarea
                  id="businessHours"
                  value={contactSettings.businessHours}
                  onChange={(e) => setContactSettings({ ...contactSettings, businessHours: e.target.value })}
                  rows={2}
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Social Media Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={contactSettings.facebook}
                      onChange={(e) => setContactSettings({ ...contactSettings, facebook: e.target.value })}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={contactSettings.twitter}
                      onChange={(e) => setContactSettings({ ...contactSettings, twitter: e.target.value })}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={contactSettings.instagram}
                      onChange={(e) => setContactSettings({ ...contactSettings, instagram: e.target.value })}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={contactSettings.linkedin}
                      onChange={(e) => setContactSettings({ ...contactSettings, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Configure search engine optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 50-60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 150-160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={seoSettings.metaKeywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    value={seoSettings.ogImage}
                    onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter Handle</Label>
                  <Input
                    id="twitterHandle"
                    value={seoSettings.twitterHandle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, twitterHandle: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={seoSettings.canonicalUrl}
                  onChange={(e) => setSeoSettings({ ...seoSettings, canonicalUrl: e.target.value })}
                  placeholder="https://mywebsite.com/page"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="robotsTxt">Robots.txt</Label>
                <Textarea
                  id="robotsTxt"
                  value={seoSettings.robotsTxt}
                  onChange={(e) => setSeoSettings({ ...seoSettings, robotsTxt: e.target.value })}
                  rows={6}
                  placeholder="User-agent: *\nAllow: /"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="structuredData">Structured Data (JSON-LD)</Label>
                <Textarea
                  id="structuredData"
                  value={seoSettings.structuredData}
                  onChange={(e) => setSeoSettings({ ...seoSettings, structuredData: e.target.value })}
                  rows={8}
                  placeholder="{
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;WebSite&quot;,
  &quot;name&quot;: &quot;My Website&quot;,
  &quot;url&quot;: &quot;https://mywebsite.com&quot;
}"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="noIndex">No Index</Label>
                  <p className="text-sm text-muted-foreground">
                    Prevent search engines from indexing this site
                  </p>
                </div>
                <Switch
                  id="noIndex"
                  checked={seoSettings.noIndex}
                  onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, noIndex: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design Settings
              </CardTitle>
              <CardDescription>
                Customize the appearance of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={designSettings.primaryColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, primaryColor: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={designSettings.primaryColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={designSettings.secondaryColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, secondaryColor: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={designSettings.secondaryColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={designSettings.accentColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, accentColor: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={designSettings.accentColor}
                      onChange={(e) => setDesignSettings({ ...designSettings, accentColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select value={designSettings.fontFamily} onValueChange={(value) => setDesignSettings({ ...designSettings, fontFamily: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select value={designSettings.fontSize} onValueChange={(value) => setDesignSettings({ ...designSettings, fontSize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14px">14px</SelectItem>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="18px">18px</SelectItem>
                      <SelectItem value="20px">20px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <Select value={designSettings.borderRadius} onValueChange={(value) => setDesignSettings({ ...designSettings, borderRadius: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0px">None</SelectItem>
                      <SelectItem value="4px">Small</SelectItem>
                      <SelectItem value="8px">Medium</SelectItem>
                      <SelectItem value="12px">Large</SelectItem>
                      <SelectItem value="16px">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark theme for the website
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={designSettings.darkMode}
                  onCheckedChange={(checked) => setDesignSettings({ ...designSettings, darkMode: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable smooth animations and transitions
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={designSettings.animations}
                  onCheckedChange={(checked) => setDesignSettings({ ...designSettings, animations: checked })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={designSettings.customCSS}
                  onChange={(e) => setDesignSettings({ ...designSettings, customCSS: e.target.value })}
                  rows={8}
                  placeholder="/* Add your custom CSS here */"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin login
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Select value={securitySettings.maxLoginAttempts} onValueChange={(value) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Select value={securitySettings.passwordMinLength} onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordMinLength: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                      <SelectItem value="16">16 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                  <Switch
                    id="requireSpecialChars"
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireSpecialChars: checked })}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sslEnabled">SSL Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Force HTTPS connections
                  </p>
                </div>
                <Switch
                  id="sslEnabled"
                  checked={securitySettings.sslEnabled}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, sslEnabled: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="backupEnabled">Backup Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic backups
                  </p>
                </div>
                <Switch
                  id="backupEnabled"
                  checked={securitySettings.backupEnabled}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, backupEnabled: checked })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="autoBackup">Auto Backup Frequency</Label>
                <Select value={securitySettings.autoBackup} onValueChange={(value) => setSecuritySettings({ ...securitySettings, autoBackup: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>
                Configure SMTP and email delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Select value={emailSettings.smtpPort} onValueChange={(value) => setEmailSettings({ ...emailSettings, smtpPort: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="587">587</SelectItem>
                      <SelectItem value="465">465</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                    placeholder="noreply@mywebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="encryption">Encryption</Label>
                <Select value={emailSettings.encryption} onValueChange={(value) => setEmailSettings({ ...emailSettings, encryption: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                    placeholder="My Website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                    placeholder="noreply@mywebsite.com"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for system events
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={emailSettings.emailNotifications}
                  onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, emailNotifications: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="bounceHandling">Bounce Handling</Label>
                  <p className="text-sm text-muted-foreground">
                    Handle bounced emails automatically
                  </p>
                </div>
                <Switch
                  id="bounceHandling"
                  checked={emailSettings.bounceHandling}
                  onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, bounceHandling: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailAlerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications
                    </p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Security-related notifications
                    </p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, securityAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updateNotifications">Update Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      System update notifications
                    </p>
                  </div>
                  <Switch
                    id="updateNotifications"
                    checked={notificationSettings.updateNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, updateNotifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="backupNotifications">Backup Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup completion notifications
                    </p>
                  </div>
                  <Switch
                    id="backupNotifications"
                    checked={notificationSettings.backupNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, backupNotifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="userRegistrationAlerts">User Registration Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      New user registration notifications
                    </p>
                  </div>
                  <Switch
                    id="userRegistrationAlerts"
                    checked={notificationSettings.userRegistrationAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, userRegistrationAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="commentNotifications">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      New comment notifications
                    </p>
                  </div>
                  <Switch
                    id="commentNotifications"
                    checked={notificationSettings.commentNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, commentNotifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="formSubmissionAlerts">Form Submission Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Contact form submissions
                    </p>
                  </div>
                  <Switch
                    id="formSubmissionAlerts"
                    checked={notificationSettings.formSubmissionAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, formSubmissionAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="performanceAlerts">Performance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Website performance notifications
                    </p>
                  </div>
                  <Switch
                    id="performanceAlerts"
                    checked={notificationSettings.performanceAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, performanceAlerts: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment gateways and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="EGP">EGP (ج.م)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Payment Gateway</Label>
                  <Select value={paymentSettings.paymentGateway} onValueChange={(value) => setPaymentSettings({ ...paymentSettings, paymentGateway: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="both">Both Stripe & PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {paymentSettings.paymentGateway === 'stripe' || paymentSettings.paymentGateway === 'both' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                    <Input
                      id="stripePublicKey"
                      value={paymentSettings.stripePublicKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                      placeholder="pk_test_..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                    <Input
                      id="stripeSecretKey"
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                      placeholder="sk_test_..."
                    />
                  </div>
                </>
              ) : null}
              
              {paymentSettings.paymentGateway === 'paypal' || paymentSettings.paymentGateway === 'both' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                    <Input
                      id="paypalClientId"
                      value={paymentSettings.paypalClientId}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                      placeholder="Your PayPal Client ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypalSecret">PayPal Secret</Label>
                    <Input
                      id="paypalSecret"
                      type="password"
                      value={paymentSettings.paypalSecret}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalSecret: e.target.value })}
                      placeholder="Your PayPal Secret"
                    />
                  </div>
                </>
              ) : null}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shippingEnabled">Shipping Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable shipping for products
                  </p>
                </div>
                <Switch
                  id="shippingEnabled"
                  checked={paymentSettings.shippingEnabled}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, shippingEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}