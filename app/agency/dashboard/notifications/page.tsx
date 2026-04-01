'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  MessageCircle,
  Check,
  CheckCheck,
  Trash2,
  Briefcase,
  Heart,
  Star,
  DollarSign,
  AlertCircle,
  Info,
  Settings,
  Eye,
  Clock,
  Filter,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type NotificationType = 'message' | 'application' | 'favorite' | 'review' | 'payment' | 'system' | 'alert'

interface Notification {
  id: string; type: NotificationType; title: string; description: string; timestamp: string; read: boolean; actionUrl?: string; avatar?: string; avatarFallback?: string
}

const notifications: Notification[] = [
  { id: '1', type: 'application', title: 'New Application Received', description: 'Maria Garcia applied for "Live-in HHA Needed" position', timestamp: '5 minutes ago', read: false, actionUrl: '/agency/dashboard/jobs', avatarFallback: 'MG' },
  { id: '2', type: 'message', title: 'New Message', description: 'John Smith sent you a message about the PCA position', timestamp: '15 minutes ago', read: false, actionUrl: '/agency/dashboard/messages', avatarFallback: 'JS' },
  { id: '3', type: 'review', title: 'New Review', description: 'Sarah Johnson left a 5-star review for your agency', timestamp: '1 hour ago', read: false, actionUrl: '/agency/dashboard/profile', avatarFallback: 'SJ' },
  { id: '4', type: 'payment', title: 'Payment Received', description: 'You received a payment of $250 for premium subscription', timestamp: '2 hours ago', read: true },
  { id: '5', type: 'favorite', title: 'Added to Favorites', description: 'Emily Davis added your agency to their favorites', timestamp: '3 hours ago', read: true, avatarFallback: 'ED' },
  { id: '6', type: 'system', title: 'Profile Verification Complete', description: 'Your agency profile has been verified successfully', timestamp: '1 day ago', read: true },
  { id: '7', type: 'alert', title: 'License Expiring Soon', description: 'Your business license will expire in 30 days. Please renew.', timestamp: '2 days ago', read: true, actionUrl: '/agency/dashboard/profile' },
  { id: '8', type: 'application', title: 'Application Withdrawn', description: 'Robert Chen withdrew their application for "Weekend CNA"', timestamp: '3 days ago', read: true, avatarFallback: 'RC' },
  { id: '9', type: 'system', title: 'Credits Added', description: '50 credits have been added to your account', timestamp: '5 days ago', read: true },
  { id: '10', type: 'message', title: 'Message from Support', description: 'Your support ticket #1234 has been resolved', timestamp: '1 week ago', read: true },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message': return <MessageCircle className="h-5 w-5 text-primary" />
    case 'application': return <Briefcase className="h-5 w-5 text-blue-500" />
    case 'favorite': return <Heart className="h-5 w-5 text-pink-500" />
    case 'review': return <Star className="h-5 w-5 text-yellow-500" />
    case 'payment': return <DollarSign className="h-5 w-5 text-green-500" />
    case 'system': return <Info className="h-5 w-5 text-muted-foreground" />
    case 'alert': return <AlertCircle className="h-5 w-5 text-orange-500" />
    default: return <Bell className="h-5 w-5 text-muted-foreground" />
  }
}

const getNotificationBg = (type: NotificationType) => {
  switch (type) {
    case 'message': return 'bg-primary/10'
    case 'application': return 'bg-blue-500/10'
    case 'favorite': return 'bg-pink-500/10'
    case 'review': return 'bg-yellow-500/10'
    case 'payment': return 'bg-green-500/10'
    case 'system': return 'bg-muted'
    case 'alert': return 'bg-orange-500/10'
    default: return 'bg-muted'
  }
}

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notificationsList.filter(n => !n.read).length

  const filteredNotifications = notificationsList.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotificationsList(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id))
  }

  const clearAllRead = () => {
    setNotificationsList(prev => prev.filter(n => !n.read))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
      <DashboardPageHeader
        title="Notifications"
        description="Stay updated with your latest activity"
        breadcrumbs={[
          { label: 'Dashboard', href: '/agency/dashboard' },
          { label: 'Notifications' },
        ]}
      >
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0} className="gap-1.5 bg-card">
          <CheckCheck className="h-4 w-4" />Mark all as read
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 bg-card"><Settings className="h-4 w-4" /><span className="hidden sm:inline">Settings</span></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Bell className="h-4 w-4 mr-2" />Notification Preferences</DropdownMenuItem>
            <DropdownMenuItem><Filter className="h-4 w-4 mr-2" />Filter Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={clearAllRead}><Trash2 className="h-4 w-4 mr-2" />Clear all read</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DashboardPageHeader>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex bg-muted rounded-lg p-1">
          <TabsTrigger 
            value="all" 
            className="gap-1.5 transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            All
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-muted-foreground/10 text-muted-foreground">
              {notificationsList.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="unread" 
            className="gap-1.5 transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-1 h-5 px-1.5 text-xs bg-primary text-primary-foreground">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="application"
            className="transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Applications
          </TabsTrigger>
          <TabsTrigger 
            value="message"
            className="transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Messages
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No notifications</h3>
            <p className="text-muted-foreground">{activeTab === 'unread' ? "You're all caught up!" : 'No notifications to display'}</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group relative flex items-start gap-4 p-4 rounded-lg border transition-all hover:bg-muted ${
                !notification.read ? 'bg-muted/40 border-border shadow-sm' : 'bg-card border-border'
              }`}
            >
              <div className="shrink-0">
                {notification.avatar ? (
                  <Avatar className="h-10 w-10"><AvatarImage src={notification.avatar} /><AvatarFallback>{notification.avatarFallback}</AvatarFallback></Avatar>
                ) : notification.avatarFallback ? (
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-xs">{notification.avatarFallback}</AvatarFallback></Avatar>
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationBg(notification.type)}`}>{getNotificationIcon(notification.type)}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{notification.description}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markAsRead(notification.id)}><Check className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Mark as read</TooltipContent></Tooltip>
                    )}
                    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteNotification(notification.id)}><Trash2 className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Delete</TooltipContent></Tooltip>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{notification.timestamp}</span>
                  {notification.actionUrl && (
                    <Link href={notification.actionUrl} className="text-xs text-primary hover:underline flex items-center gap-1"><Eye className="h-3 w-3" />View details</Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
