'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              HC
            </div>
            <span className="text-xl font-semibold text-foreground">
              hczip<span className="text-primary">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#for-caregivers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Caregivers
            </Link>
            <Link
              href="#for-agencies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Agencies
            </Link>
            <Link
              href="#for-families"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Families
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu / Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="#for-caregivers"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Caregivers
              </Link>
              <Link
                href="#for-agencies"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Agencies
              </Link>
              <Link
                href="#for-families"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Families
              </Link>
              <div className="flex gap-2 px-3 pt-2 sm:hidden">
                <Button variant="ghost" size="sm" className="flex-1">
                  Log in
                </Button>
                <Button size="sm" className="flex-1">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
