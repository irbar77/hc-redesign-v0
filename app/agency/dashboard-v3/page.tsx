'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AgencyDashboardSidebarV3 } from '@/components/agency/dashboard-sidebar-v3'
import { AgencyProfileForm } from '@/components/agency/profile-form'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Bell,
  MessageCircle,
  Home,
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

export default function AgencyDashboardV3Page() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <div className="h-screen flex bg-sidebar overflow-hidden">
      <SidebarProvider>
        <AgencyDashboardSidebarV3 />
        <SidebarInset className="flex-1 flex flex-col min-h-0">
          {/* Inset Content Panel */}
          <div className="flex-1 flex flex-col bg-background overflow-hidden">
            {/* Header inside the panel */}
            <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 lg:px-6">
              <div className="flex items-center gap-2">
                {/* Mobile sidebar trigger */}
                <SidebarTrigger className="-ml-2 lg:hidden" />
                <Separator orientation="vertical" className="h-6 lg:hidden" />
                
                {/* Page title */}
                <div>
                  <h1 className="text-base font-semibold text-foreground">Agency Profile</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Manage your agency information</p>
                </div>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                      <MessageCircle className="h-4 w-4" />
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        3
                      </span>
                      <span className="sr-only">Messages</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Messages</TooltipContent>
                </Tooltip>

                {/* Notifications */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        5
                      </span>
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                {/* Theme Toggle */}
                <ThemeToggle />

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
                      <Link href="/agency/dashboard-v3">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/agency/dashboard-v3/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
                <AgencyProfileForm
                  onChangesMade={() => setHasUnsavedChanges(true)}
                  hasUnsavedChanges={hasUnsavedChanges}
                  onSave={() => setHasUnsavedChanges(false)}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
