'use client'

import { useState } from 'react'
import { BasicInfoSection } from './sections/basic-info-section'
import { HiringSection } from './sections/hiring-section'
import { PatientInfoSection } from './sections/patient-info-section'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Building2, Briefcase, HeartPulse } from 'lucide-react'

interface AgencyProfileFormProps {
  onChangesMade: () => void
  hasUnsavedChanges: boolean
  onSave: () => void
  defaultTab?: string
}

export function AgencyProfileForm({
  onChangesMade,
  hasUnsavedChanges,
  onSave,
  defaultTab = 'basic-info',
}: AgencyProfileFormProps) {
  const [isHiring, setIsHiring] = useState(true)

  const handleSave = () => {
    // In a real app, this would submit to API
    console.log('Saving profile...')
    onSave()
  }

  return (
    <div className="pb-24">
      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="basic-info" className="gap-2">
            <Building2 className="h-4 w-4 hidden sm:inline" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="hiring" className="gap-2">
            <Briefcase className="h-4 w-4 hidden sm:inline" />
            Hiring
          </TabsTrigger>
          <TabsTrigger value="patient-services" className="gap-2">
            <HeartPulse className="h-4 w-4 hidden sm:inline" />
            Patient Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <BasicInfoSection onChangesMade={onChangesMade} />
        </TabsContent>

        <TabsContent value="hiring">
          <HiringSection
            isHiring={isHiring}
            onHiringChange={(value) => {
              setIsHiring(value)
              onChangesMade()
            }}
            onChangesMade={onChangesMade}
          />
        </TabsContent>

        <TabsContent value="patient-services">
          <PatientInfoSection onChangesMade={onChangesMade} />
        </TabsContent>
      </Tabs>

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
