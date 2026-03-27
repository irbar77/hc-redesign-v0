'use client'

import { useState } from 'react'
import { BasicInfoSection } from './sections/basic-info-section'
import { HiringSection } from './sections/hiring-section'
import { PatientInfoSection } from './sections/patient-info-section'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface AgencyProfileFormProps {
  onChangesMade: () => void
  hasUnsavedChanges: boolean
  onSave: () => void
}

export function AgencyProfileForm({
  onChangesMade,
  hasUnsavedChanges,
  onSave,
}: AgencyProfileFormProps) {
  const [isHiring, setIsHiring] = useState(true)

  const handleSave = () => {
    // In a real app, this would submit to API
    console.log('Saving profile...')
    onSave()
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Section 1: Basic Information */}
      <BasicInfoSection onChangesMade={onChangesMade} />

      {/* Section 2: Hiring (conditional) */}
      <HiringSection
        isHiring={isHiring}
        onHiringChange={(value) => {
          setIsHiring(value)
          onChangesMade()
        }}
        onChangesMade={onChangesMade}
      />

      {/* Section 3: Patient Information */}
      <PatientInfoSection onChangesMade={onChangesMade} />

      {/* Floating Save Button */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-50">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes
            </p>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
