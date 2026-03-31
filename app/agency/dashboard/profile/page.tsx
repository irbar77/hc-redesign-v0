'use client'

import { useState } from 'react'
import { AgencyProfileForm } from '@/components/agency/profile-form'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'

export default function AgencyProfilePage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
      <DashboardPageHeader
        title="Agency Profile"
        description="Manage your agency information and settings"
        breadcrumbs={[
          { label: 'Dashboard', href: '/agency/dashboard' },
          { label: 'Profile' },
        ]}
      />
      <AgencyProfileForm
        onChangesMade={() => setHasUnsavedChanges(true)}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={() => setHasUnsavedChanges(false)}
      />
    </div>
  )
}
