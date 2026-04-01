'use client'

import { useState } from 'react'
import { Search, MapPin, Building2, Users, Briefcase, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type SearchTab = 'agencies' | 'caregivers' | 'jobs'

interface SearchBlockProps {
  onSearch: (zipCode: string, tab: SearchTab) => void
  initialTab?: SearchTab
  compact?: boolean
}

export function SearchBlock({ onSearch, initialTab = 'agencies', compact = false }: SearchBlockProps) {
  const [zipCode, setZipCode] = useState('')
  const [activeTab, setActiveTab] = useState<SearchTab>(initialTab)

  const handleSearch = () => {
    onSearch(zipCode, activeTab)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as SearchTab)
  }

  return (
    <div className={`w-full ${compact ? '' : 'max-w-3xl mx-auto'}`}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className={`w-full grid grid-cols-3 ${compact ? 'h-10' : 'h-12'} bg-muted/50`}>
          <TabsTrigger
            value="agencies"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground hover:bg-card/60 hover:text-foreground transition-all"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Agencies</span>
          </TabsTrigger>
          <TabsTrigger
            value="caregivers"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground hover:bg-card/60 hover:text-foreground transition-all"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Caregivers</span>
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground hover:bg-card/60 hover:text-foreground transition-all"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Cases</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={`flex gap-2 ${compact ? 'mt-3' : 'mt-4'}`}>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter ZIP code..."
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`pl-10 ${compact ? 'h-11' : 'h-12'} bg-card border-border`}
          />
        </div>
        <Button
          onClick={handleSearch}
          size={compact ? 'default' : 'lg'}
          className={compact ? 'h-11 px-6' : 'h-12 px-8'}
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
