'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MultiSelectCombobox } from '../multi-select-combobox'
import { Briefcase } from 'lucide-react'

interface HiringSectionProps {
  isHiring: boolean
  onHiringChange: (value: boolean) => void
  onChangesMade: () => void
}

const positionOptions = [
  { value: 'pca', label: 'PCA (Personal Care Aide)' },
  { value: 'hha', label: 'HHA (Home Health Aide)' },
  { value: 'cna', label: 'CNA (Certified Nursing Assistant)' },
  { value: 'lpn', label: 'LPN (Licensed Practical Nurse)' },
  { value: 'rn', label: 'RN (Registered Nurse)' },
  { value: 'companion', label: 'Companion' },
  { value: 'live-in', label: 'Live-in Caregiver' },
]

const benefitsOptions = [
  { value: 'health-insurance', label: 'Health Insurance' },
  { value: 'dental-insurance', label: 'Dental Insurance' },
  { value: 'vision-insurance', label: 'Vision Insurance' },
  { value: 'paid-time-off', label: 'Paid Time Off' },
  { value: '401k', label: '401(k)' },
  { value: 'flexible-schedule', label: 'Flexible Schedule' },
  { value: 'weekly-pay', label: 'Weekly Pay' },
  { value: 'direct-deposit', label: 'Direct Deposit' },
  { value: 'training-provided', label: 'Training Provided' },
  { value: 'referral-bonus', label: 'Referral Bonus' },
  { value: 'sign-on-bonus', label: 'Sign-on Bonus' },
  { value: 'transportation-assistance', label: 'Transportation Assistance' },
]

const requirementsOptions = [
  { value: '1-year-exp', label: '1+ Year Experience' },
  { value: '2-years-exp', label: '2+ Years Experience' },
  { value: 'alzheimer-exp', label: 'Alzheimer Care Experience' },
  { value: 'dementia-exp', label: 'Dementia Care Experience' },
  { value: 'hoyer-lift-exp', label: 'Hoyer Lift Experience' },
  { value: 'wound-care-exp', label: 'Wound Care Experience' },
  { value: 'driver-license', label: 'Valid Driver License' },
  { value: 'own-transportation', label: 'Own Transportation' },
  { value: 'covid-vaccinated', label: 'COVID-19 Vaccinated' },
  { value: 'flu-shot', label: 'Flu Shot' },
  { value: 'tb-test', label: 'TB Test' },
  { value: 'background-check', label: 'Background Check Clearance' },
]

const documentsOptions = [
  { value: 'pca-cert', label: 'PCA Certificate' },
  { value: 'hha-cert', label: 'HHA Certificate' },
  { value: 'cna-license', label: 'CNA License' },
  { value: 'cpr-cert', label: 'CPR Certification' },
  { value: 'first-aid-cert', label: 'First Aid Certification' },
  { value: 'physical-exam', label: 'Physical Exam' },
  { value: 'tb-results', label: 'TB Test Results' },
  { value: 'drug-screen', label: 'Drug Screen' },
  { value: 'background-check', label: 'Background Check' },
  { value: 'i9-docs', label: 'I-9 Documents' },
  { value: 'ssn-card', label: 'Social Security Card' },
  { value: 'state-id', label: 'State ID / Driver License' },
]

export function HiringSection({
  isHiring,
  onHiringChange,
  onChangesMade,
}: HiringSectionProps) {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([
    'pca',
    'hha',
  ])
  const [minRate, setMinRate] = useState('18')
  const [maxRate, setMaxRate] = useState('25')
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([
    'health-insurance',
    'paid-time-off',
    'weekly-pay',
    'direct-deposit',
  ])
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    '1-year-exp',
    'covid-vaccinated',
  ])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([
    'pca-cert',
    'cpr-cert',
    'background-check',
  ])
  const [description, setDescription] = useState(
    'Join our team of dedicated caregivers! We offer competitive pay, flexible scheduling, and a supportive work environment. We are looking for compassionate individuals who are committed to providing quality care to our clients.'
  )

  const handleChange = () => {
    onChangesMade()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Hiring Information</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="hiring-mode" className="text-sm font-normal">
              We are hiring
            </Label>
            <Switch
              id="hiring-mode"
              checked={isHiring}
              onCheckedChange={onHiringChange}
            />
          </div>
        </div>
        <CardDescription>
          {isHiring
            ? 'Configure your job offerings and requirements for potential candidates'
            : 'Enable hiring mode to show your agency in job searches'}
        </CardDescription>
      </CardHeader>

      {isHiring && (
        <CardContent className="space-y-6">
          {/* Positions */}
          <div className="space-y-2">
            <Label>Positions We&apos;re Hiring For</Label>
            <MultiSelectCombobox
              options={positionOptions}
              selected={selectedPositions}
              onChange={(values) => {
                setSelectedPositions(values)
                handleChange()
              }}
              placeholder="Select positions..."
              searchPlaceholder="Search positions..."
            />
          </div>

          {/* Hourly Rate Range */}
          <div className="space-y-2">
            <Label>Hourly Rate Range</Label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={minRate}
                  onChange={(e) => {
                    setMinRate(e.target.value)
                    handleChange()
                  }}
                  className="pl-7"
                  placeholder="Min"
                />
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={maxRate}
                  onChange={(e) => {
                    setMaxRate(e.target.value)
                    handleChange()
                  }}
                  className="pl-7"
                  placeholder="Max"
                />
              </div>
              <span className="text-muted-foreground text-sm">/hour</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <Label>Benefits Offered</Label>
            <MultiSelectCombobox
              options={benefitsOptions}
              selected={selectedBenefits}
              onChange={(values) => {
                setSelectedBenefits(values)
                handleChange()
              }}
              placeholder="Select benefits..."
              searchPlaceholder="Search benefits..."
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label>Requirements</Label>
            <MultiSelectCombobox
              options={requirementsOptions}
              selected={selectedRequirements}
              onChange={(values) => {
                setSelectedRequirements(values)
                handleChange()
              }}
              placeholder="Select requirements..."
              searchPlaceholder="Search requirements..."
            />
          </div>

          {/* Required Documents */}
          <div className="space-y-2">
            <Label>Required Documents</Label>
            <MultiSelectCombobox
              options={documentsOptions}
              selected={selectedDocuments}
              onChange={(values) => {
                setSelectedDocuments(values)
                handleChange()
              }}
              placeholder="Select documents..."
              searchPlaceholder="Search documents..."
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="hiring-description">Additional Information</Label>
            <Textarea
              id="hiring-description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                handleChange()
              }}
              placeholder="Tell potential candidates about your agency, work culture, and what makes you a great employer..."
              className="min-h-32"
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
