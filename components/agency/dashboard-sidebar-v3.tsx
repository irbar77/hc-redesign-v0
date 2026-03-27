'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  User,
  MessageCircle,
  Heart,
  Briefcase,
  Bell,
  Users,
  Settings,
  Crown,
  BadgeCheck,
  Coins,
  FolderOpen,
  Building2,
  MapPin,
  Home,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigationItems = [
  { title: 'Profile', icon: User, href: '/agency/dashboard-v3', isActive: true },
  { title: 'Messages', icon: MessageCircle, href: '/agency/dashboard-v3/messages', badge: 3 },
  { title: 'Favorites', icon: Heart, href: '/agency/dashboard-v3/favorites' },
  { title: 'Jobs', icon: Briefcase, href: '/agency/dashboard-v3/jobs' },
  { title: 'Notifications', icon: Bell, href: '/agency/dashboard-v3/notifications', badge: 5 },
  { title: 'My Team', icon: Users, href: '/agency/dashboard-v3/team' },
  { title: 'Settings', icon: Settings, href: '/agency/dashboard-v3/settings' },
]

// Mock data - in real app this would come from API/context
const agencyData = {
  name: 'Sunrise Home Care',
  logo: null,
  isPremium: true,
  isVerified: true,
  credits: 250,
  openCases: 12,
}

export function AgencyDashboardSidebarV3() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 inset-y-0 h-svh bg-sidebar">
      {/* Logo Section - same height as content header (h-14 = 56px) */}
      <SidebarHeader className="h-14 flex items-center px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 rounded-md hover:opacity-80 transition-opacity ml-0.5">
          <span className="text-xl font-semibold text-foreground tracking-tight">
            hcz<MapPin className="inline-block h-5 w-5 -mx-0.5 text-primary" strokeWidth={2.5} />p<span className="text-primary">.com</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarHeader className="px-4 py-3">
        {/* Agency Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 -mx-2 rounded-lg hover:bg-sidebar-accent transition-colors text-left">
              <Avatar className="h-9 w-9 rounded-lg shrink-0">
                {agencyData.logo ? (
                  <AvatarImage src={agencyData.logo} alt={agencyData.name} />
                ) : (
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {agencyData.name}
                </p>
                <p className="text-xs text-muted-foreground">Agency Account</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/agency/dashboard-v3/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Badges */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {agencyData.isPremium && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px] px-1.5 py-0">
                  <Crown className="h-2.5 w-2.5 mr-0.5" />
                  Premium
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Premium account with extra features</TooltipContent>
            </Tooltip>
          )}
          {agencyData.isVerified && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] px-1.5 py-0">
                  <BadgeCheck className="h-2.5 w-2.5 mr-0.5" />
                  Verified
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Verified agency</TooltipContent>
            </Tooltip>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="justify-between h-9"
                    >
                      <Link href={item.href}>
                        <span className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </span>
                        {item.badge && (
                          <Badge
                            variant="default"
                            className="h-5 min-w-5 px-1.5 text-[10px]"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Stats Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-2 text-xs">Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-2 rounded-md bg-sidebar-accent/50">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Credits</span>
                    </div>
                    <span className="text-sm font-semibold text-sidebar-foreground">
                      {agencyData.credits}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Available credits for premium features</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-2 rounded-md bg-sidebar-accent/50">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Open Cases</span>
                    </div>
                    <span className="text-sm font-semibold text-sidebar-foreground">
                      {agencyData.openCases}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Active open cases</TooltipContent>
              </Tooltip>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 pt-2">
        <Separator className="mb-3" />
        <div className="text-[11px] text-muted-foreground text-center">
          Need help?{' '}
          <Link href="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
