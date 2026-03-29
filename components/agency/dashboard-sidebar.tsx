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

export function AgencyDashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border top-16 h-[calc(100svh-4rem)]">
      <SidebarHeader className="p-4">
        {/* Agency Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            {agencyData.logo ? (
              <AvatarImage src={agencyData.logo} alt={agencyData.name} />
            ) : (
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {agencyData.name}
            </p>
            <p className="text-xs text-muted-foreground">Agency Account</p>
          </div>
        </div>

        {/* Status Info List */}
        <div className="mt-4 space-y-1.5 px-0.5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-medium">
            <span className="text-muted-foreground">Subscription:</span>
            <span className="text-sidebar-foreground">
              {agencyData.isPremium ? 'Premium' : 'Basic'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-medium">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-sidebar-foreground">
              {agencyData.isVerified ? 'Verified' : 'Standard'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-medium">
            <span className="text-muted-foreground">Credits:</span>
            <span className="text-sidebar-foreground">
              {agencyData.credits}
            </span>
          </div>
        </div>

        <Separator className="mt-4" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="justify-between"
                    >
                      <Link href={item.href}>
                        <span className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
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

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          Need help?{' '}
          <Link href="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
