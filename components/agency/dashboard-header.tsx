'use client'

import Link from 'next/link'
import { Bell, MessageCircle, Search, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
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

interface DashboardHeaderProps {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="-ml-2 lg:hidden" />
        <Separator orientation="vertical" className="h-6 lg:hidden" />
        
        {/* Page title */}
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <span className="sm:hidden font-semibold text-foreground">{title}</span>
      </div>

      <div className="flex items-center gap-1">
        {/* Search - hidden on mobile */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-48 lg:w-64 pl-9 h-9"
          />
        </div>

        {/* Back to site */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Back to site</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back to main site</TooltipContent>
        </Tooltip>

        {/* Messages */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  SC
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/agency/dashboard-v2">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/agency/dashboard-v2/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
