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
import { HeartPulse } from 'lucide-react'

interface PatientInfoSectionProps {
  onChangesMade: () => void
}

const insuranceOptions = [
  { value: 'medicare', label: 'Medicare' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'mltc', label: 'MLTC (Managed Long Term Care)' },
  { value: 'private-pay', label: 'Private Pay' },
  { value: 'aetna', label: 'Aetna' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'united-healthcare', label: 'United Healthcare' },
  { value: 'humana', label: 'Humana' },
  { value: 'fidelis', label: 'Fidelis Care' },
  { value: 'healthfirst', label: 'Healthfirst' },
  { value: 'metroplus', label: 'MetroPlus' },
  { value: 'emblem-health', label: 'Emblem Health' },
  { value: 'vns-choice', label: 'VNS Choice' },
  { value: 'senior-whole-health', label: 'Senior Whole Health' },
  { value: 'centers-plan', label: 'Centers Plan for Healthy Living' },
  { value: 'elderserve', label: 'ElderServe' },
  { value: 'independence-care', label: 'Independence Care System' },
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
    'medicare',
    'medicaid',
    'mltc',
    'private-pay',
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
          <MultiSelectCombobox
            options={insuranceOptions}
            selected={selectedInsurances}
            onChange={(values) => {
              setSelectedInsurances(values)
              handleChange()
            }}
            placeholder="Select insurances..."
            searchPlaceholder="Search insurances..."
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
