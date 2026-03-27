'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { MultiSelectCombobox } from '../multi-select-combobox'
import { ChipSelector } from '../chip-selector'
import { HeartPulse } from 'lucide-react'

interface PatientInfoSectionProps {
  onChangesMade: () => void
}

const defaultInsurances = [
  'Medicare',
  'Medicaid',
  'MLTC (Managed Long Term Care)',
  'Private Pay',
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'United Healthcare',
  'Humana',
  'Fidelis Care',
  'Healthfirst',
  'MetroPlus',
  'Emblem Health',
  'VNS Choice',
  'Senior Whole Health',
  'Centers Plan for Healthy Living',
  'ElderServe',
  'Independence Care System',
]

const servicesForPatientsOptions = [
  { value: 'personal-care', label: 'Personal Care' },
  { value: 'companion-care', label: 'Companion Care' },
  { value: 'homemaking', label: 'Homemaking' },
  { value: 'meal-preparation', label: 'Meal Preparation' },
  { value: 'medication-reminders', label: 'Medication Reminders' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'skilled-nursing', label: 'Skilled Nursing' },
  { value: 'physical-therapy', label: 'Physical Therapy' },
  { value: 'occupational-therapy', label: 'Occupational Therapy' },
  { value: 'speech-therapy', label: 'Speech Therapy' },
  { value: 'alzheimer-care', label: 'Alzheimer Care' },
  { value: 'dementia-care', label: 'Dementia Care' },
  { value: 'hospice-care', label: 'Hospice Care' },
  { value: 'palliative-care', label: 'Palliative Care' },
  { value: 'respite-care', label: 'Respite Care' },
  { value: 'post-surgery-care', label: 'Post-Surgery Care' },
  { value: 'wound-care', label: 'Wound Care' },
  { value: 'iv-therapy', label: 'IV Therapy' },
  { value: 'ventilator-care', label: 'Ventilator Care' },
  { value: 'pediatric-care', label: 'Pediatric Care' },
]

const countyOptions = [
  { value: 'manhattan', label: 'Manhattan (New York County)' },
  { value: 'brooklyn', label: 'Brooklyn (Kings County)' },
  { value: 'queens', label: 'Queens (Queens County)' },
  { value: 'bronx', label: 'Bronx (Bronx County)' },
  { value: 'staten-island', label: 'Staten Island (Richmond County)' },
  { value: 'nassau', label: 'Nassau County' },
  { value: 'suffolk', label: 'Suffolk County' },
  { value: 'westchester', label: 'Westchester County' },
  { value: 'rockland', label: 'Rockland County' },
  { value: 'orange', label: 'Orange County' },
  { value: 'dutchess', label: 'Dutchess County' },
  { value: 'putnam', label: 'Putnam County' },
  { value: 'bergen', label: 'Bergen County, NJ' },
  { value: 'hudson', label: 'Hudson County, NJ' },
  { value: 'essex', label: 'Essex County, NJ' },
  { value: 'passaic', label: 'Passaic County, NJ' },
]

export function PatientInfoSection({ onChangesMade }: PatientInfoSectionProps) {
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([
    'Medicare',
    'Medicaid',
    'MLTC (Managed Long Term Care)',
    'Private Pay',
  ])
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'personal-care',
    'companion-care',
    'homemaking',
    'meal-preparation',
  ])
  const [selectedCounties, setSelectedCounties] = useState<string[]>([
    'brooklyn',
    'queens',
    'manhattan',
  ])

  const handleChange = () => {
    onChangesMade()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          Patient Information
        </CardTitle>
        <CardDescription>
          Information for patients and families looking for care services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Accepted Insurances */}
        <div className="space-y-2">
          <Label>Accepted Insurances</Label>
          <ChipSelector
            options={defaultInsurances}
            selected={selectedInsurances}
            onChange={(values) => {
              setSelectedInsurances(values)
              handleChange()
            }}
            allowCustom
            customPlaceholder="Add custom insurance..."
          />
        </div>

        {/* Services for Patients */}
        <div className="space-y-2">
          <Label>Services for Patients</Label>
          <MultiSelectCombobox
            options={servicesForPatientsOptions}
            selected={selectedServices}
            onChange={(values) => {
              setSelectedServices(values)
              handleChange()
            }}
            placeholder="Select services..."
            searchPlaceholder="Search services..."
          />
        </div>

        {/* Service Counties */}
        <div className="space-y-2">
          <Label>Service Counties</Label>
          <MultiSelectCombobox
            options={countyOptions}
            selected={selectedCounties}
            onChange={(values) => {
              setSelectedCounties(values)
              handleChange()
            }}
            placeholder="Select counties..."
            searchPlaceholder="Search counties..."
          />
        </div>
      </CardContent>
    </Card>
  )
}
