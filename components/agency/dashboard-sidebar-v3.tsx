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
  { title: 'Profile', icon: User, href: '/agency/dashboard', isActive: true },
  { title: 'Messages', icon: MessageCircle, href: '/agency/dashboard/messages', badge: 3 },
  { title: 'Favorites', icon: Heart, href: '/agency/dashboard/favorites' },
  { title: 'Jobs', icon: Briefcase, href: '/agency/dashboard/jobs' },
  { title: 'Notifications', icon: Bell, href: '/agency/dashboard/notifications', badge: 5 },
  { title: 'My Team', icon: Users, href: '/agency/dashboard/team' },
  { title: 'Settings', icon: Settings, href: '/agency/dashboard/settings' },
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
    <Sidebar className="border-r-0 inset-y-0 h-svh bg-card">
      {/* Logo Section - same height as content header (h-14 = 56px) */}
      <SidebarHeader className="h-14 flex flex-col justify-center px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 rounded-md hover:opacity-80 transition-opacity -mt-[14px]">
          <span className="text-xl font-semibold text-foreground tracking-tight">
            hcz<MapPin className="inline-block h-5 w-5 -mx-0.5 text-primary" strokeWidth={2.5} />p<span className="text-primary">.com</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarHeader className="px-2 py-3">
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
              <Link href="/agency/dashboard/settings" className="flex items-center gap-2">
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

        {/* Status Info List */}
        <div className="mt-4 mx-2 rounded-xl bg-muted/30 p-3 flex flex-col gap-2.5 border border-border/50">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
            <span className="text-muted-foreground">Subscription:</span>
            <span className={agencyData.isPremium ? 'text-yellow-600 dark:text-yellow-500' : 'text-sidebar-foreground'}>
              {agencyData.isPremium ? 'Premium' : 'Basic'}
            </span>
          </div>
          <div className="h-px bg-border/50 w-full" />
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
            <span className="text-muted-foreground">Status:</span>
            <span className={agencyData.isVerified ? 'text-emerald-600 dark:text-emerald-500' : 'text-sidebar-foreground'}>
              {agencyData.isVerified ? 'Verified' : 'Standard'}
            </span>
          </div>
          <div className="h-px bg-border/50 w-full" />
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
            <span className="text-muted-foreground">Credits:</span>
            <span className="text-sidebar-foreground">
              {agencyData.credits}
            </span>
          </div>
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
