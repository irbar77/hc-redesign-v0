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
import { ChipSelector } from '../chip-selector'
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

const defaultBenefits = [
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  'Paid Time Off',
  '401(k)',
  'Flexible Schedule',
  'Weekly Pay',
  'Direct Deposit',
  'Training Provided',
  'Referral Bonus',
  'Sign-on Bonus',
  'Transportation Assistance',
]

const defaultRequirements = [
  '1+ Year Experience',
  '2+ Years Experience',
  'Alzheimer Care Experience',
  'Dementia Care Experience',
  'Hoyer Lift Experience',
  'Wound Care Experience',
  'Valid Driver License',
  'Own Transportation',
  'COVID-19 Vaccinated',
  'Flu Shot',
  'TB Test',
  'Background Check Clearance',
]

const defaultDocuments = [
  'PCA Certificate',
  'HHA Certificate',
  'CNA License',
  'CPR Certification',
  'First Aid Certification',
  'Physical Exam',
  'TB Test Results',
  'Drug Screen',
  'Background Check',
  'I-9 Documents',
  'Social Security Card',
  'State ID / Driver License',
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
    'Health Insurance',
    'Paid Time Off',
    'Weekly Pay',
    'Direct Deposit',
  ])
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    '1+ Year Experience',
    'COVID-19 Vaccinated',
  ])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([
    'PCA Certificate',
    'CPR Certification',
    'Background Check',
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
            <ChipSelector
              options={defaultBenefits}
              selected={selectedBenefits}
              onChange={(values) => {
                setSelectedBenefits(values)
                handleChange()
              }}
              allowCustom
              customPlaceholder="Add custom benefit..."
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label>Requirements</Label>
            <ChipSelector
              options={defaultRequirements}
              selected={selectedRequirements}
              onChange={(values) => {
                setSelectedRequirements(values)
                handleChange()
              }}
              allowCustom
              customPlaceholder="Add custom requirement..."
            />
          </div>

          {/* Required Documents */}
          <div className="space-y-2">
            <Label>Required Documents</Label>
            <ChipSelector
              options={defaultDocuments}
              selected={selectedDocuments}
              onChange={(values) => {
                setSelectedDocuments(values)
                handleChange()
              }}
              allowCustom
              customPlaceholder="Add custom document..."
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
