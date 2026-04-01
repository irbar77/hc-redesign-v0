'use client'

import { useState } from 'react'
import { ArrowDownAZ, ArrowUpZA, Briefcase, Globe, Gift, LayoutGrid, MapIcon, List, ChevronDown, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const LANGUAGES = [
  'English',
  'Spanish',
  'Chinese',
  'Tagalog',
  'Vietnamese',
  'Korean',
  'Russian',
  'Arabic',
  'French',
  'Portuguese',
]

const BENEFITS = [
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  '401(k)',
  'Paid Time Off',
  'Flexible Schedule',
  'Training Programs',
  'Mileage Reimbursement',
]

const CERTIFICATES = [
  'HHA',
  'PCA',
  'CNA',
  'RN',
  'LPN',
  'Registered HHA',
  'Physical Therapy Aide',
]

export type SortOrder = 'a-z' | 'z-a' | 'none'
export type ViewMode = 'card' | 'list' | 'map'

interface SearchFiltersProps {
  resultCount: number
  zipCode: string
  sortOrder: SortOrder
  onSortChange: (sort: SortOrder) => void
  hiringNow: boolean
  onHiringNowChange: (value: boolean) => void
  selectedLanguages: string[]
  onLanguagesChange: (languages: string[]) => void
  selectedBenefits: string[]
  onBenefitsChange: (benefits: string[]) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  activeTab?: 'agencies' | 'caregivers' | 'jobs'
}

export function SearchFilters({
  resultCount,
  zipCode,
  sortOrder,
  onSortChange,
  hiringNow,
  onHiringNowChange,
  selectedLanguages,
  onLanguagesChange,
  selectedBenefits,
  onBenefitsChange,
  viewMode,
  onViewModeChange,
  activeTab = 'agencies'
}: SearchFiltersProps) {
  const [languagesOpen, setLanguagesOpen] = useState(false)
  const [benefitsOpen, setBenefitsOpen] = useState(false)

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguagesChange(selectedLanguages.filter((l) => l !== language))
    } else {
      onLanguagesChange([...selectedLanguages, language])
    }
  }

  const toggleBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      onBenefitsChange(selectedBenefits.filter((b) => b !== benefit))
    } else {
      onBenefitsChange([...selectedBenefits, benefit])
    }
  }

  return (
    <div className="space-y-4">
      {/* Results info bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span>
          {' results found for ZIP code '}
          <span className="font-semibold text-foreground">{zipCode || '—'}</span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-3 gap-1.5 transition-colors hover:bg-accent hover:text-accent-foreground ${
              viewMode === 'card' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
            onClick={() => onViewModeChange('card')}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Card</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-3 gap-1.5 transition-colors hover:bg-accent hover:text-accent-foreground ${
              viewMode === 'list' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">List</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-3 gap-1.5 transition-colors hover:bg-accent hover:text-accent-foreground ${
              viewMode === 'map' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
            onClick={() => onViewModeChange('map')}
          >
            <MapIcon className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Map</span>
          </Button>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Sort */}
        <Select
          value={sortOrder}
          onValueChange={(value) => onSortChange(value as SortOrder)}
        >
          <SelectTrigger className="w-auto h-9 gap-2 bg-card">
            {sortOrder === 'a-z' && <ArrowDownAZ className="h-4 w-4" />}
            {sortOrder === 'z-a' && <ArrowUpZA className="h-4 w-4" />}
            {sortOrder === 'none' && <ArrowDownAZ className="h-4 w-4 opacity-50" />}
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="a-z">A to Z</SelectItem>
            <SelectItem value="z-a">Z to A</SelectItem>
          </SelectContent>
        </Select>

        {/* Hiring Now checkbox */}
        <Button
          variant={hiringNow ? 'default' : 'outline'}
          size="sm"
          className={`h-9 gap-2 ${!hiringNow ? 'bg-card' : ''}`}
          onClick={() => onHiringNowChange(!hiringNow)}
        >
          <Briefcase className="h-4 w-4" />
          {activeTab === 'caregivers' ? 'Open to Work' : 'Hiring Now'}
        </Button>

        {/* Languages dropdown */}
        <Popover open={languagesOpen} onOpenChange={setLanguagesOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={selectedLanguages.length > 0 ? 'default' : 'outline'}
              size="sm"
              className={`h-9 gap-2 ${selectedLanguages.length === 0 ? 'bg-card' : ''}`}
            >
              <Globe className="h-4 w-4" />
              Languages
              {selectedLanguages.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-primary-foreground/20 text-primary-foreground">
                  {selectedLanguages.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium mb-3">Select Languages</p>
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {LANGUAGES.map((language) => (
                  <div key={language} className="flex items-center gap-2">
                    <Checkbox
                      id={`lang-${language}`}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => toggleLanguage(language)}
                    />
                    <Label
                      htmlFor={`lang-${language}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedLanguages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs"
                  onClick={() => onLanguagesChange([])}
                >
                  Clear all
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Benefits dropdown */}
        <Popover open={benefitsOpen} onOpenChange={setBenefitsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={selectedBenefits.length > 0 ? 'default' : 'outline'}
              size="sm"
              className={`h-9 gap-2 ${selectedBenefits.length === 0 ? 'bg-card' : ''}`}
            >
              {activeTab === 'caregivers' ? <BadgeCheck className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
              {activeTab === 'caregivers' ? 'Certificate' : 'Benefits'}
              {selectedBenefits.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-primary-foreground/20 text-primary-foreground">
                  {selectedBenefits.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium mb-3">Select {activeTab === 'caregivers' ? 'Certificate' : 'Benefits'}</p>
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {(activeTab === 'caregivers' ? CERTIFICATES : BENEFITS).map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <Checkbox
                      id={`benefit-${benefit}`}
                      checked={selectedBenefits.includes(benefit)}
                      onCheckedChange={() => toggleBenefit(benefit)}
                    />
                    <Label
                      htmlFor={`benefit-${benefit}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedBenefits.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs"
                  onClick={() => onBenefitsChange([])}
                >
                  Clear all
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Active filters badges */}
        {(selectedLanguages.length > 0 || selectedBenefits.length > 0) && (
          <div className="hidden md:flex items-center gap-1.5 ml-2">
            {selectedLanguages.slice(0, 2).map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
            {selectedLanguages.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{selectedLanguages.length - 2} more
              </Badge>
            )}
            {selectedBenefits.slice(0, 2).map((benefit) => (
              <Badge key={benefit} variant="secondary" className="text-xs">
                {benefit}
              </Badge>
            ))}
            {selectedBenefits.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{selectedBenefits.length - 2} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
