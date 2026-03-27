'use client'

import { useState } from 'react'
import { AgencyDashboardSidebarV2 } from '@/components/agency/dashboard-sidebar-v2'
import { DashboardHeader } from '@/components/agency/dashboard-header'
import { AgencyProfileForm } from '@/components/agency/profile-form'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function AgencyDashboardV2Page() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <SidebarProvider>
        <AgencyDashboardSidebarV2 />
        <SidebarInset className="flex-1 flex flex-col min-h-0">
          <DashboardHeader 
            title="Agency Profile" 
            description="Manage your agency information"
          />
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
              <AgencyProfileForm
                onChangesMade={() => setHasUnsavedChanges(true)}
                hasUnsavedChanges={hasUnsavedChanges}
                onSave={() => setHasUnsavedChanges(false)}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
