'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AgencyDashboardSidebarV3 } from '@/components/agency/dashboard-sidebar-v3'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Bell,
  MessageCircle,
  Home,
  Check,
  CheckCheck,
  Trash2,
  User,
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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

// Notification types
type NotificationType = 'message' | 'application' | 'favorite' | 'review' | 'payment' | 'system' | 'alert'

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl?: string
  avatar?: string
  avatarFallback?: string
}

// Mock data for notifications
const notifications: Notification[] = [
  {
    id: '1',
    type: 'application',
    title: 'New Application Received',
    description: 'Maria Garcia applied for "Live-in HHA Needed" position',
    timestamp: '5 minutes ago',
    read: false,
    actionUrl: '/agency/dashboard/jobs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    avatarFallback: 'MG',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'John Smith sent you a message about the PCA position',
    timestamp: '15 minutes ago',
    read: false,
    actionUrl: '/agency/dashboard/messages',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    avatarFallback: 'JS',
  },
  {
    id: '3',
    type: 'review',
    title: 'New Review',
    description: 'Sarah Johnson left a 5-star review for your agency',
    timestamp: '1 hour ago',
    read: false,
    actionUrl: '/agency/dashboard/profile',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    avatarFallback: 'SJ',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Received',
    description: 'You received a payment of $250 for premium subscription',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'favorite',
    title: 'Added to Favorites',
    description: 'Emily Davis added your agency to their favorites',
    timestamp: '3 hours ago',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    avatarFallback: 'ED',
  },
  {
    id: '6',
    type: 'system',
    title: 'Profile Verification Complete',
    description: 'Your agency profile has been verified successfully',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '7',
    type: 'alert',
    title: 'License Expiring Soon',
    description: 'Your business license will expire in 30 days. Please renew.',
    timestamp: '2 days ago',
    read: true,
    actionUrl: '/agency/dashboard/profile',
  },
  {
    id: '8',
    type: 'application',
    title: 'Application Withdrawn',
    description: 'Robert Chen withdrew their application for "Weekend CNA"',
    timestamp: '3 days ago',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    avatarFallback: 'RC',
  },
  {
    id: '9',
    type: 'system',
    title: 'Credits Added',
    description: '50 credits have been added to your account',
    timestamp: '5 days ago',
    read: true,
  },
  {
    id: '10',
    type: 'message',
    title: 'Message from Support',
    description: 'Your support ticket #1234 has been resolved',
    timestamp: '1 week ago',
    read: true,
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return <MessageCircle className="h-5 w-5 text-primary" />
    case 'application':
      return <Briefcase className="h-5 w-5 text-blue-500" />
    case 'favorite':
      return <Heart className="h-5 w-5 text-pink-500" />
    case 'review':
      return <Star className="h-5 w-5 text-yellow-500" />
    case 'payment':
      return <DollarSign className="h-5 w-5 text-green-500" />
    case 'system':
      return <Info className="h-5 w-5 text-muted-foreground" />
    case 'alert':
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />
  }
}

const getNotificationBg = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return 'bg-primary/10'
    case 'application':
      return 'bg-blue-500/10'
    case 'favorite':
      return 'bg-pink-500/10'
    case 'review':
      return 'bg-yellow-500/10'
    case 'payment':
      return 'bg-green-500/10'
    case 'system':
      return 'bg-muted'
    case 'alert':
      return 'bg-orange-500/10'
    default:
      return 'bg-muted'
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
    setNotificationsList(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
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
    <div className="h-screen flex flex-col bg-sidebar overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-1 min-h-0">
          <AgencyDashboardSidebarV3 />
          <SidebarInset className="flex-1 flex flex-col min-h-0">
            {/* Content Panel */}
            <div className="flex-1 flex flex-col bg-background overflow-hidden">
              {/* Header */}
              <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 lg:px-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="lg:hidden" />
                  <Separator orientation="vertical" className="h-6 lg:hidden" />
                  {/* Breadcrumbs */}
                  <Breadcrumb className="hidden sm:flex">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/agency/dashboard">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Notifications</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="flex items-center gap-1">
                  {/* Back to site */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href="/">
                          <Home className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Back to site</TooltipContent>
                  </Tooltip>

                  {/* Messages */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 relative">
                        <Link href="/agency/dashboard/messages">
                          <MessageCircle className="h-4 w-4" />
                          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            3
                          </span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Messages</TooltipContent>
                  </Tooltip>

                  {/* Notifications */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>

                  <ThemeToggle />

                  <Separator orientation="vertical" className="h-6 mx-2" />

                  {/* Credits */}
                  <div className="hidden sm:flex items-center gap-1.5 text-sm mr-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-medium">250</span>
                    <span className="text-muted-foreground">credits</span>
                  </div>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 gap-2 px-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline-block text-sm font-medium">Emerald</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/">Back to Site</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/agency/dashboard">Account Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
                  {/* Page Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                      <p className="text-muted-foreground mt-1">
                        Stay updated with your latest activity
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        className="gap-1.5"
                      >
                        <CheckCheck className="h-4 w-4" />
                        Mark all as read
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Settings</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Bell className="h-4 w-4 mr-2" />
                            Notification Preferences
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Filter className="h-4 w-4 mr-2" />
                            Filter Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={clearAllRead}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear all read
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex">
                      <TabsTrigger value="all" className="gap-1.5">
                        All
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                          {notificationsList.length}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="unread" className="gap-1.5">
                        Unread
                        {unreadCount > 0 && (
                          <Badge className="ml-1 h-5 px-1.5 text-xs bg-primary">
                            {unreadCount}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="application">Applications</TabsTrigger>
                      <TabsTrigger value="message">Messages</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Notifications List */}
                  <div className="space-y-2">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <Bell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          No notifications
                        </h3>
                        <p className="text-muted-foreground">
                          {activeTab === 'unread'
                            ? "You're all caught up!"
                            : 'No notifications to display'}
                        </p>
                      </div>
                    ) : (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`group relative flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-accent/50 ${
                            !notification.read
                              ? 'bg-accent/30 border-primary/20'
                              : 'bg-card border-border'
                          }`}
                        >
                          {/* Unread indicator */}
                          {!notification.read && (
                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                          )}

                          {/* Icon or Avatar */}
                          <div className="shrink-0">
                            {notification.avatar ? (
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationBg(notification.type)}`}>
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                  {notification.description}
                                </p>
                              </div>
                              {/* Actions */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!notification.read && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => markAsRead(notification.id)}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Mark as read</TooltipContent>
                                  </Tooltip>
                                )}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-destructive hover:text-destructive"
                                      onClick={() => deleteNotification(notification.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </span>
                              {notification.actionUrl && (
                                <Link
                                  href={notification.actionUrl}
                                  className="text-xs text-primary hover:underline flex items-center gap-1"
                                >
                                  <Eye className="h-3 w-3" />
                                  View details
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
