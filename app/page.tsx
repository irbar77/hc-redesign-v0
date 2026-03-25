'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { SearchBlock, SearchTab } from '@/components/search-block'
import { AgencyCard, CaregiverCard, JobCard } from '@/components/result-cards'
import { SearchFilters, SortOrder, ViewMode } from '@/components/search-filters'
import {
  ForCaregiversSection,
  ForAgenciesSection,
  ForFamiliesSection,
} from '@/components/audience-sections'
import { Footer } from '@/components/footer'
import {
  mockAgencies,
  mockCaregivers,
  mockJobs,
  searchByZipCode,
} from '@/lib/mock-data'
import { Building2, Users, Briefcase, CheckCircle2 } from 'lucide-react'

export default function Home() {
  const [searchResults, setSearchResults] = useState<{
    agencies: typeof mockAgencies
    caregivers: typeof mockCaregivers
    jobs: typeof mockJobs
  } | null>(null)
  const [activeTab, setActiveTab] = useState<SearchTab>('agencies')
  const [hasSearched, setHasSearched] = useState(false)
  const [currentZipCode, setCurrentZipCode] = useState('')
  
  // Filter states (design only, no functionality)
  const [sortOrder, setSortOrder] = useState<SortOrder>('none')
  const [hiringNow, setHiringNow] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('card')

  const handleSearch = (zipCode: string, tab: SearchTab) => {
    setActiveTab(tab)
    setHasSearched(true)
    setCurrentZipCode(zipCode)
    setSearchResults({
      agencies: searchByZipCode(mockAgencies, zipCode),
      caregivers: searchByZipCode(mockCaregivers, zipCode),
      jobs: searchByZipCode(mockJobs, zipCode),
    })
  }
  
  const getCurrentResultCount = () => {
    if (!searchResults) return 0
    if (activeTab === 'agencies') return searchResults.agencies.length
    if (activeTab === 'caregivers') return searchResults.caregivers.length
    if (activeTab === 'jobs') return searchResults.jobs.length
    return 0
  }

  const stats = [
    { icon: <Building2 className="h-5 w-5" />, value: '500+', label: 'Agencies' },
    { icon: <Users className="h-5 w-5" />, value: '10,000+', label: 'Caregivers' },
    { icon: <Briefcase className="h-5 w-5" />, value: '2,500+', label: 'Active Jobs' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Home care connections{' '}
                <span className="text-primary">made simple</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The marketplace where caregivers find jobs, agencies find talent,
                and families find quality care — all by ZIP code.
              </p>
            </div>

            {/* Search Block */}
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
              <SearchBlock onSearch={handleSearch} initialTab={activeTab} />
              
              {/* Quick stats */}
              <div className="mt-6 pt-6 border-t border-border flex flex-wrap justify-center gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                    {stat.icon}
                    <span className="font-semibold text-foreground">{stat.value}</span>
                    <span className="text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results */}
            {hasSearched && searchResults && (
              <div className="mt-10">
                {/* Filters and results info */}
                <div className="mb-6">
                  <SearchFilters
                    resultCount={getCurrentResultCount()}
                    zipCode={currentZipCode}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    hiringNow={hiringNow}
                    onHiringNowChange={setHiringNow}
                    selectedLanguages={selectedLanguages}
                    onLanguagesChange={setSelectedLanguages}
                    selectedBenefits={selectedBenefits}
                    onBenefitsChange={setSelectedBenefits}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>

                <div className={
                  viewMode === 'list' 
                    ? "flex flex-col gap-3" 
                    : "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                }>
                  {activeTab === 'agencies' &&
                    searchResults.agencies.map((agency) => (
                      <AgencyCard key={agency.id} agency={agency} viewMode={viewMode} />
                    ))}
                  {activeTab === 'caregivers' &&
                    searchResults.caregivers.map((caregiver) => (
                      <CaregiverCard key={caregiver.id} caregiver={caregiver} />
                    ))}
                  {activeTab === 'jobs' &&
                    searchResults.jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>

                {((activeTab === 'agencies' && searchResults.agencies.length === 0) ||
                  (activeTab === 'caregivers' && searchResults.caregivers.length === 0) ||
                  (activeTab === 'jobs' && searchResults.jobs.length === 0)) && (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <p className="text-muted-foreground">
                      No results found for this ZIP code. Try a different search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        {!hasSearched && (
          <section className="py-16 bg-card">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground">How it works</h2>
                <p className="mt-4 text-muted-foreground">
                  Three simple steps to connect with the right people
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Enter your ZIP code',
                    description: 'Start by entering your location to find care options near you.',
                  },
                  {
                    step: '02',
                    title: 'Browse & compare',
                    description: 'View agencies, caregivers, or jobs. Filter by ratings, services, and availability.',
                  },
                  {
                    step: '03',
                    title: 'Connect & hire',
                    description: 'Reach out directly, schedule interviews, and find your perfect match.',
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust indicators */}
        {!hasSearched && (
          <section className="py-12 border-y border-border bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Background Checked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Licensed Agencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Secure Platform</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Audience Sections */}
        {!hasSearched && (
          <>
            <ForCaregiversSection />
            <ForAgenciesSection />
            <ForFamiliesSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
