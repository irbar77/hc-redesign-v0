'use client'

import Link from 'next/link'
import { AgencyDashboardSidebarV3 } from '@/components/agency/dashboard-sidebar-v3'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Bell,
  MessageCircle,
  Home,
  Coins,
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <SidebarProvider>
        <AgencyDashboardSidebarV3 />
        <SidebarInset className="flex-1 flex flex-col min-h-0 border-l border-border/50">
          <div className="flex-1 flex flex-col bg-background overflow-hidden">
            {/* Shared Header */}
            <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 lg:px-6 border-b border-border">
              <div className="flex items-center gap-2">
                {/* Mobile sidebar trigger */}
                <SidebarTrigger className="-ml-2 lg:hidden" />
                <Separator orientation="vertical" className="h-6 lg:hidden" />
              </div>

              <div className="flex items-center gap-1">
                {/* Back to site */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 hidden sm:flex">
                      <Link href="/">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Back to site</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Back to main site</TooltipContent>
                </Tooltip>

                {/* Messages */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative" asChild>
                      <Link href="/agency/dashboard/messages">
                        <MessageCircle className="h-4 w-4" />
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center border-2 border-background">
                          3
                        </span>
                        <span className="sr-only">Messages</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Messages</TooltipContent>
                </Tooltip>

                {/* Notifications */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative" asChild>
                      <Link href="/agency/dashboard/notifications">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center border-2 border-background">
                          5
                        </span>
                        <span className="sr-only">Notifications</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Credits */}
                <div className="hidden sm:flex items-center gap-1.5 text-sm ml-1 px-2 py-1 rounded-md bg-muted/50">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold text-foreground">250</span>
                  <span className="text-muted-foreground text-xs">credits</span>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

                {/* User Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          SC
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/agency/dashboard/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/agency/dashboard/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
