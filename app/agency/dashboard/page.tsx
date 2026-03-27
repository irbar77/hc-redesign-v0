'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { AgencyDashboardSidebar } from '@/components/agency/dashboard-sidebar'
import { AgencyProfileForm } from '@/components/agency/profile-form'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default function AgencyDashboardPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      <SidebarProvider>
        <div className="flex flex-1 min-h-0">
          <AgencyDashboardSidebar />
          <SidebarInset className="flex-1 flex flex-col min-h-0">
            {/* Mobile header with sidebar trigger */}
            <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4 lg:hidden">
              <SidebarTrigger className="-ml-2" />
              <Separator orientation="vertical" className="h-6" />
              <span className="font-semibold">Agency Profile</span>
            </header>
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 hidden lg:block">
                  <h1 className="text-2xl font-bold text-foreground">Agency Profile</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your agency information and settings
                  </p>
                </div>
                <AgencyProfileForm
                  onChangesMade={() => setHasUnsavedChanges(true)}
                  hasUnsavedChanges={hasUnsavedChanges}
                  onSave={() => setHasUnsavedChanges(false)}
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
