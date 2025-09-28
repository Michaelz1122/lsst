'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Activity, Plus, Edit, Trash2, Eye, Copy, CheckCircle, AlertTriangle, Globe, BarChart3, Code, Zap, Shield, Smartphone, Monitor, Download } from 'lucide-react'

interface TrackingCode {
  id: string
  name: string
  type: 'analytics' | 'pixel' | 'tag' | 'custom'
  code: string
  placement: 'head' | 'body' | 'footer'
  status: 'active' | 'inactive' | 'error'
  lastUpdated: string
  description: string
}

interface TrackingEvent {
  id: string
  eventName: string
  category: string
  action: string
  label: string
  value: number
  platform: 'google' | 'facebook' | 'custom'
  status: 'active' | 'inactive'
}

export default function AdminTrackingCodes() {
  const [isClient, setIsClient] = useState(false)
  
  // Initialize with empty arrays to avoid hydration mismatch
  const [trackingCodes, setTrackingCodes] = useState<TrackingCode[]>([])
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([])
  
  // Populate data only on client side
  useEffect(() => {
    setIsClient(true)
    setTrackingCodes([
      {
        id: '1',
        name: 'Google Analytics',
        type: 'analytics',
        code: '<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  (window.dataLayer = window.dataLayer || []).push(arguments);\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', Date.now());\n  gtag(\'config\', \'G-XXXXXXXXXX\');\n</script>',
        placement: 'head',
        status: 'active',
        lastUpdated: '2024-01-20',
        description: 'Google Analytics 4 tracking for website analytics'
      },
      {
        id: '2',
        name: 'Facebook Pixel',
        type: 'pixel',
        code: '<!-- Meta Pixel Code -->\n<script>\n  !function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,\'script\',\n  \'https://connect.facebook.net/en_US/fbevents.js\');\n  fbq(\'init\', \'XXXXXXXXXXXXXXXX\');\n  fbq(\'track\', \'PageView\');\n</script>\n<noscript><img height="1" width="1" style="display:none"\n  src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXX&ev=PageView&noscript=1"\n/></noscript>',
        placement: 'head',
        status: 'active',
        lastUpdated: '2024-01-19',
        description: 'Facebook Pixel for conversion tracking and audience building'
      },
      {
        id: '3',
        name: 'Google Tag Manager',
        type: 'tag',
        code: '<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\nDate.now(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,\'script\',\'dataLayer\',\'GTM-XXXXXXX\');</script>\n<!-- End Google Tag Manager -->',
        placement: 'head',
        status: 'active',
        lastUpdated: '2024-01-18',
        description: 'Google Tag Manager container for all tracking tags'
      },
      {
        id: '4',
        name: 'Hotjar Heatmap',
        type: 'custom',
        code: '<!-- Hotjar Tracking Code -->\n<script>\n    (function(h,o,t,j,a,r){\n        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n        h._hjSettings={hjid:XXXXXXXXX,hjsv:6};\n        a=o.getElementsByTagName(\'head\')[0];\n        r=o.createElement(\'script\');r.async=1;\n        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n        a.appendChild(r);\n    })(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');\n</script>',
        placement: 'body',
        status: 'inactive',
        lastUpdated: '2024-01-17',
        description: 'Hotjar for heatmaps and user behavior analysis'
      }
    ])
    
    setTrackingEvents([
      {
        id: '1',
        eventName: 'Page View',
        category: 'engagement',
        action: 'view',
        label: 'Home Page',
        value: 1,
        platform: 'google',
        status: 'active'
      },
      {
        id: '2',
        eventName: 'Form Submission',
        category: 'lead',
        action: 'submit',
        label: 'Contact Form',
        value: 1,
        platform: 'facebook',
        status: 'active'
      },
      {
        id: '3',
        eventName: 'Button Click',
        category: 'engagement',
        action: 'click',
        label: 'CTA Button',
        value: 1,
        platform: 'google',
        status: 'active'
      },
      {
        id: '4',
        eventName: 'Purchase',
        category: 'conversion',
        action: 'purchase',
        label: 'Service Purchase',
        value: 100,
        platform: 'facebook',
        status: 'inactive'
      }
    ])
  }, [])

  const [globalSettings, setGlobalSettings] = useState({
    enableConsentManagement: true,
    cookiePolicy: 'strict',
    dataRetention: '365',
    anonymizeIP: true,
    enableDebugMode: false,
    blockBots: true,
    enableCrossDomainTracking: false,
    customDomain: '',
    enableServerSideTracking: false,
    enableClientSideTracking: true
  })

  const [selectedCode, setSelectedCode] = useState<TrackingCode | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<TrackingEvent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingEvent, setIsEditingEvent] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <BarChart3 className="h-4 w-4" />
      case 'pixel': return <Monitor className="h-4 w-4" />
      case 'tag': return <Code className="h-4 w-4" />
      case 'custom': return <Zap className="h-4 w-4" />
      default: return <Code className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'active': 'default',
      'inactive': 'secondary',
      'error': 'destructive'
    }
    
    const icons = {
      'active': <CheckCircle className="w-3 h-3" />,
      'inactive': <AlertTriangle className="w-3 h-3" />,
      'error': <AlertTriangle className="w-3 h-3" />
    }
    
    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center gap-1">
        {icons[status]}
        {status}
      </Badge>
    )
  }

  const getPlatformBadge = (platform: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'google': 'default',
      'facebook': 'secondary',
      'custom': 'outline'
    }
    
    return (
      <Badge variant={variants[platform] || 'outline'}>
        {platform}
      </Badge>
    )
  }

  const handleEditCode = (code: TrackingCode) => {
    setSelectedCode(code)
    setIsEditing(true)
  }

  const handleSaveCode = () => {
    if (selectedCode) {
      const today = new Date()
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      setTrackingCodes(trackingCodes.map(code => 
        code.id === selectedCode.id ? { ...selectedCode, lastUpdated: formattedDate } : code
      ))
      setIsEditing(false)
      setSelectedCode(null)
    }
  }

  const handleEditEvent = (event: TrackingEvent) => {
    setSelectedEvent(event)
    setIsEditingEvent(true)
  }

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setTrackingEvents(trackingEvents.map(event => 
        event.id === selectedEvent.id ? selectedEvent : event
      ))
      setIsEditingEvent(false)
      setSelectedEvent(null)
    }
  }

  const handleDeleteEvent = (id: string) => {
    setTrackingEvents(trackingEvents.filter(event => event.id !== id))
  }

  const handleToggleEventStatus = (id: string) => {
    setTrackingEvents(trackingEvents.map(event => 
      event.id === id 
        ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
        : event
    ))
  }

  const handleToggleStatus = (id: string) => {
    setTrackingCodes(trackingCodes.map(code => 
      code.id === id 
        ? { ...code, status: code.status === 'active' ? 'inactive' : 'active' }
        : code
    ))
  }

  const handlePreviewCode = () => {
    if (typeof window !== 'undefined') {
      window.open('/', '_blank')
    }
  }

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code)
      toast.success('Code copied to clipboard!')
    }
  }

  const validateTrackingCode = (code: string) => {
    // Basic validation for tracking codes
    const hasScriptTag = code.includes('<script')
    const hasClosingTag = code.includes('</script>')
    return hasScriptTag && hasClosingTag
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tracking Codes</h1>
          <p className="text-muted-foreground">
            Manage analytics pixels, tracking tags, and conversion events
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Tracking Code
          </Button>
          <Button variant="outline" onClick={() => setIsEventDialogOpen(true)}>
            <Activity className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="codes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="codes">Tracking Codes</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="codes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Active Tracking Codes
              </CardTitle>
              <CardDescription>
                Manage your tracking codes, pixels, and analytics scripts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trackingCodes.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading tracking codes...</p>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Placement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingCodes.map((code) => (
                      <TableRow key={code.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(code.type)}
                            {code.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{code.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{code.placement}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(code.status)}</TableCell>
                        <TableCell>{code.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleToggleStatus(code.id)}>
                              {code.status === 'active' ? 'Disable' : 'Enable'}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditCode(code)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleCopyCode(code.code)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={handlePreviewCode}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Tracking Events
              </CardTitle>
              <CardDescription>
                Manage custom tracking events and conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trackingEvents.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading tracking events...</p>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.eventName}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>{event.action}</TableCell>
                        <TableCell>{getPlatformBadge(event.platform)}</TableCell>
                        <TableCell>{event.value}</TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleToggleEventStatus(event.id)}>
                              {event.status === 'active' ? 'Disable' : 'Enable'}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Settings
              </CardTitle>
              <CardDescription>
                Configure tracking privacy settings and data handling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableConsentManagement">Enable Consent Management</Label>
                  <p className="text-sm text-muted-foreground">
                    Require user consent for tracking
                  </p>
                </div>
                <Switch
                  id="enableConsentManagement"
                  checked={globalSettings.enableConsentManagement}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableConsentManagement: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cookiePolicy">Cookie Policy</Label>
                <Select value={globalSettings.cookiePolicy} onValueChange={(value) => setGlobalSettings({ ...globalSettings, cookiePolicy: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">Strict (Essential only)</SelectItem>
                    <SelectItem value="moderate">Moderate (Essential + Analytics)</SelectItem>
                    <SelectItem value="relaxed">Relaxed (All cookies)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                <Select value={globalSettings.dataRetention} onValueChange={(value) => setGlobalSettings({ ...globalSettings, dataRetention: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymizeIP">Anonymize IP Addresses</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove last octet from IP addresses
                  </p>
                </div>
                <Switch
                  id="anonymizeIP"
                  checked={globalSettings.anonymizeIP}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, anonymizeIP: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableDebugMode">Enable Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Show debug information for development
                  </p>
                </div>
                <Switch
                  id="enableDebugMode"
                  checked={globalSettings.enableDebugMode}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableDebugMode: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blockBots">Block Bot Traffic</Label>
                  <p className="text-sm text-muted-foreground">
                    Exclude known bots from analytics
                  </p>
                </div>
                <Switch
                  id="blockBots"
                  checked={globalSettings.blockBots}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, blockBots: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableCrossDomainTracking">Enable Cross-Domain Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track users across multiple domains
                  </p>
                </div>
                <Switch
                  id="enableCrossDomainTracking"
                  checked={globalSettings.enableCrossDomainTracking}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableCrossDomainTracking: checked })}
                />
              </div>

              {globalSettings.enableCrossDomainTracking && (
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    value={globalSettings.customDomain}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, customDomain: e.target.value })}
                    placeholder="example.com"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableServerSideTracking">Enable Server-Side Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Use server-side tracking for better accuracy
                  </p>
                </div>
                <Switch
                  id="enableServerSideTracking"
                  checked={globalSettings.enableServerSideTracking}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableServerSideTracking: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableClientSideTracking">Enable Client-Side Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Use client-side tracking for real-time data
                  </p>
                </div>
                <Switch
                  id="enableClientSideTracking"
                  checked={globalSettings.enableClientSideTracking}
                  onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableClientSideTracking: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trackingEvents.filter(e => e.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  Tracking events firing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trackingCodes.filter(c => c.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  Tracking scripts active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Today</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  +15% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.3% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Event Activity</CardTitle>
              <CardDescription>
                Real-time tracking event activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: 'Page View', page: 'Home', time: '2 minutes ago', platform: 'Google Analytics' },
                  { event: 'Button Click', page: 'Services', time: '5 minutes ago', platform: 'Facebook Pixel' },
                  { event: 'Form Submission', page: 'Contact', time: '12 minutes ago', platform: 'Google Analytics' },
                  { event: 'Page View', page: 'About', time: '18 minutes ago', platform: 'Google Analytics' },
                  { event: 'Button Click', page: 'Home', time: '25 minutes ago', platform: 'Facebook Pixel' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{item.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.page} • {item.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{item.platform}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Load Time</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-xs text-muted-foreground">
                  -0.3s from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Script Size</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245KB</div>
                <p className="text-xs text-muted-foreground">
                  Total tracking scripts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.2%</div>
                <p className="text-xs text-muted-foreground">
                  Tracking script errors
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Detailed performance analysis of tracking scripts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Google Analytics</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Facebook Pixel</span>
                    <span className="text-yellow-600">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hotjar</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Google Tag Manager</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Monitoring
                </CardTitle>
                <CardDescription>
                  Live performance monitoring and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">All Systems Operational</span>
                    </div>
                    <span className="text-xs text-green-600">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">High Load Detected</span>
                    </div>
                    <span className="text-xs text-yellow-600">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Optimization Suggested</span>
                    </div>
                    <span className="text-xs text-blue-600">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GDPR Compliant</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  All tracking scripts compliant
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  Users accepting tracking
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Requests</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-muted-foreground">
                  Excellent privacy rating
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  GDPR, CCPA, and other regulation compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <span className="text-sm font-medium">GDPR Compliant</span>
                        <p className="text-xs text-gray-600">All requirements met</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <span className="text-sm font-medium">CCPA Compliant</span>
                        <p className="text-xs text-gray-600">California regulations</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div>
                        <span className="text-sm font-medium">Cookie Consent</span>
                        <p className="text-xs text-gray-600">Update required</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-600 text-white">Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Data Processing
                </CardTitle>
                <CardDescription>
                  Data handling and processing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Retention</span>
                    <span className="text-sm text-gray-600">365 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Location</span>
                    <span className="text-sm text-gray-600">EU</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Third-party Sharing</span>
                    <span className="text-sm text-gray-600">None</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Encryption</span>
                    <span className="text-sm text-gray-600">AES-256</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Anonymization</span>
                    <span className="text-sm text-gray-600">IP masked</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Compliance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Tracking Code Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Tracking Code</DialogTitle>
            <DialogDescription>
              Update tracking code configuration
            </DialogDescription>
          </DialogHeader>
          {selectedCode && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codeName">Name</Label>
                  <Input
                    id="codeName"
                    value={selectedCode.name}
                    onChange={(e) => setSelectedCode({ ...selectedCode, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codeType">Type</Label>
                  <Select value={selectedCode.type} onValueChange={(value: any) => setSelectedCode({ ...selectedCode, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="pixel">Pixel</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="codeDescription">Description</Label>
                <Textarea
                  id="codeDescription"
                  value={selectedCode.description}
                  onChange={(e) => setSelectedCode({ ...selectedCode, description: e.target.value })}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="codePlacement">Placement</Label>
                <Select value={selectedCode.placement} onValueChange={(value: any) => setSelectedCode({ ...selectedCode, placement: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="head">Head (&lt;head&gt;)</SelectItem>
                    <SelectItem value="body">Body (&lt;body&gt;)</SelectItem>
                    <SelectItem value="footer">Footer (before &lt;/body&gt;)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trackingCode">Tracking Code</Label>
                <Textarea
                  id="trackingCode"
                  value={selectedCode.code}
                  onChange={(e) => setSelectedCode({ ...selectedCode, code: e.target.value })}
                  rows={10}
                  className="font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {validateTrackingCode(selectedCode.code) ? (
                      <span className="text-green-600">✓ Valid tracking code</span>
                    ) : (
                      <span className="text-red-600">⚠ Invalid tracking code format</span>
                    )}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => handleCopyCode(selectedCode.code)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCode}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Tracking Code Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Tracking Code</DialogTitle>
            <DialogDescription>
              Add a new tracking code, pixel, or analytics script
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newCodeName">Name</Label>
                <Input
                  id="newCodeName"
                  placeholder="e.g., Google Analytics, Facebook Pixel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newCodeType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="pixel">Pixel</SelectItem>
                    <SelectItem value="tag">Tag</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newCodeDescription">Description</Label>
              <Textarea
                id="newCodeDescription"
                placeholder="Brief description of what this tracking code does"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newCodePlacement">Placement</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select placement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head">Head (&lt;head&gt;)</SelectItem>
                  <SelectItem value="body">Body (&lt;body&gt;)</SelectItem>
                  <SelectItem value="footer">Footer (before &lt;/body&gt;)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newTrackingCode">Tracking Code</Label>
              <Textarea
                id="newTrackingCode"
                placeholder="Paste your tracking code here..."
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsAddDialogOpen(false)
              toast.success('Tracking code added successfully!')
            }}>
              Add Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tracking Event</DialogTitle>
            <DialogDescription>
              Create a new custom tracking event
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  placeholder="e.g., Button Click, Form Submission"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventCategory">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventAction">Action</Label>
                <Input
                  id="eventAction"
                  placeholder="e.g., click, submit, view"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLabel">Label</Label>
                <Input
                  id="eventLabel"
                  placeholder="e.g., CTA Button, Contact Form"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventValue">Value</Label>
                <Input
                  id="eventValue"
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventPlatform">Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Analytics</SelectItem>
                    <SelectItem value="facebook">Facebook Pixel</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsEventDialogOpen(false)
              toast.success('Event added successfully!')
            }}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditingEvent} onOpenChange={setIsEditingEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tracking Event</DialogTitle>
            <DialogDescription>
              Update tracking event configuration
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editEventName">Event Name</Label>
                  <Input
                    id="editEventName"
                    value={selectedEvent.eventName}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, eventName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEventCategory">Category</Label>
                  <Select value={selectedEvent.category} onValueChange={(value) => setSelectedEvent({ ...selectedEvent, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="navigation">Navigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editEventAction">Action</Label>
                  <Input
                    id="editEventAction"
                    value={selectedEvent.action}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, action: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEventLabel">Label</Label>
                  <Input
                    id="editEventLabel"
                    value={selectedEvent.label}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, label: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editEventValue">Value</Label>
                  <Input
                    id="editEventValue"
                    type="number"
                    value={selectedEvent.value}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, value: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEventPlatform">Platform</Label>
                  <Select value={selectedEvent.platform} onValueChange={(value: any) => setSelectedEvent({ ...selectedEvent, platform: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Analytics</SelectItem>
                      <SelectItem value="facebook">Facebook Pixel</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingEvent(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}