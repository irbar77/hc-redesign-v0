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
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VerifiableInput } from '../verifiable-input'
import { MultiSelectCombobox } from '../multi-select-combobox'
import { LogoUpload } from '../logo-upload'
import { Building2 } from 'lucide-react'

interface BasicInfoSectionProps {
  onChangesMade: () => void
}

const agencyTypes = [
  { value: 'licensed', label: 'Licensed Home Care Agency (LHCSA)' },
  { value: 'certified', label: 'Certified Home Health Agency (CHHA)' },
  { value: 'hospice', label: 'Hospice' },
  { value: 'lthhcp', label: 'LTHHCP' },
  { value: 'fiscal', label: 'Fiscal Intermediary' },
]

const servicesOptions = [
  { value: 'personal-care', label: 'Personal Care' },
  { value: 'companion-care', label: 'Companion Care' },
  { value: 'home-health', label: 'Home Health Aide' },
  { value: 'skilled-nursing', label: 'Skilled Nursing' },
  { value: 'physical-therapy', label: 'Physical Therapy' },
  { value: 'occupational-therapy', label: 'Occupational Therapy' },
  { value: 'speech-therapy', label: 'Speech Therapy' },
  { value: 'respiratory-therapy', label: 'Respiratory Therapy' },
  { value: 'wound-care', label: 'Wound Care' },
  { value: 'medication-management', label: 'Medication Management' },
  { value: 'alzheimer-dementia', label: 'Alzheimer & Dementia Care' },
  { value: 'hospice-care', label: 'Hospice Care' },
  { value: 'respite-care', label: 'Respite Care' },
  { value: 'live-in-care', label: 'Live-in Care' },
  { value: '24-hour-care', label: '24-Hour Care' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'zh', label: 'Chinese (Mandarin)' },
  { value: 'zh-cantonese', label: 'Chinese (Cantonese)' },
  { value: 'ru', label: 'Russian' },
  { value: 'ko', label: 'Korean' },
  { value: 'ht', label: 'Haitian Creole' },
  { value: 'bn', label: 'Bengali' },
  { value: 'ar', label: 'Arabic' },
  { value: 'fr', label: 'French' },
  { value: 'it', label: 'Italian' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'tl', label: 'Tagalog' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ur', label: 'Urdu' },
  { value: 'he', label: 'Hebrew' },
  { value: 'yi', label: 'Yiddish' },
]

export function BasicInfoSection({ onChangesMade }: BasicInfoSectionProps) {
  const [agencyName, setAgencyName] = useState('Sunrise Home Care')
  const [agencyType, setAgencyType] = useState('licensed')
  const [logo, setLogo] = useState<string | null>(null)
  const [email, setEmail] = useState('contact@sunrisehomecare.com')
  const [emailVerified, setEmailVerified] = useState(true)
  const [phone, setPhone] = useState('(718) 555-0123')
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [licenseNumber, setLicenseNumber] = useState('LHCSA-12345')
  const [licenseDate, setLicenseDate] = useState('2020-05-15')
  const [website, setWebsite] = useState('https://sunrisehomecare.com')
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'personal-care',
    'companion-care',
    'home-health',
  ])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    'en',
    'es',
    'ru',
  ])

  // Address fields
  const [street, setStreet] = useState('123 Main Street')
  const [apt, setApt] = useState('Suite 100')
  const [city, setCity] = useState('Brooklyn')
  const [state, setState] = useState('NY')
  const [zipCode, setZipCode] = useState('11201')

  const handleChange = () => {
    onChangesMade()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Basic Information
        </CardTitle>
        <CardDescription>
          General information about your agency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agency Name and Type Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="agency-name">Agency Name</Label>
            <Input
              id="agency-name"
              value={agencyName}
              onChange={(e) => {
                setAgencyName(e.target.value)
                handleChange()
              }}
              placeholder="Enter agency name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-type">Agency Type</Label>
            <Select
              value={agencyType}
              onValueChange={(value) => {
                setAgencyType(value)
                handleChange()
              }}
            >
              <SelectTrigger id="agency-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {agencyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Agency Logo</Label>
          <LogoUpload
            currentLogo={logo}
            onLogoChange={(newLogo) => {
              setLogo(newLogo)
              handleChange()
            }}
          />
        </div>

        {/* Address Group */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Location</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="street" className="text-sm font-normal text-muted-foreground">
                Street Address
              </Label>
              <Input
                id="street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value)
                  handleChange()
                }}
                placeholder="Street address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apt" className="text-sm font-normal text-muted-foreground">
                Apt, Suite, etc. (optional)
              </Label>
              <Input
                id="apt"
                value={apt}
                onChange={(e) => {
                  setApt(e.target.value)
                  handleChange()
                }}
                placeholder="Apt, Suite, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-normal text-muted-foreground">
                City
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value)
                  handleChange()
                }}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-normal text-muted-foreground">
                State
              </Label>
              <Select
                value={state}
                onValueChange={(value) => {
                  setState(value)
                  handleChange()
                }}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-sm font-normal text-muted-foreground">
                ZIP Code
              </Label>
              <Input
                id="zip"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value)
                  handleChange()
                }}
                placeholder="ZIP Code"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <VerifiableInput
            id="phone"
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value)
              handleChange()
            }}
            isVerified={phoneVerified}
            onVerify={() => setPhoneVerified(true)}
            placeholder="(xxx) xxx-xxxx"
          />
          <VerifiableInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value)
              handleChange()
            }}
            isVerified={emailVerified}
            onVerify={() => setEmailVerified(true)}
            placeholder="email@example.com"
          />
        </div>

        {/* License Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="license-number">License Number</Label>
            <Input
              id="license-number"
              value={licenseNumber}
              onChange={(e) => {
                setLicenseNumber(e.target.value)
                handleChange()
              }}
              placeholder="License number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license-date">License Issue Date</Label>
            <Input
              id="license-date"
              type="date"
              value={licenseDate}
              onChange={(e) => {
                setLicenseDate(e.target.value)
                handleChange()
              }}
            />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value)
              handleChange()
            }}
            placeholder="https://example.com"
          />
        </div>

        {/* Services Multi-select */}
        <div className="space-y-2">
          <Label>Services Offered</Label>
          <MultiSelectCombobox
            options={servicesOptions}
            selected={selectedServices}
            onChange={(values) => {
              setSelectedServices(values)
              handleChange()
            }}
            placeholder="Select services..."
            searchPlaceholder="Search services..."
          />
        </div>

        {/* Languages Multi-select */}
        <div className="space-y-2">
          <Label>Languages Spoken</Label>
          <MultiSelectCombobox
            options={languageOptions}
            selected={selectedLanguages}
            onChange={(values) => {
              setSelectedLanguages(values)
              handleChange()
            }}
            placeholder="Select languages..."
            searchPlaceholder="Search languages..."
          />
        </div>
      </CardContent>
    </Card>
  )
}
