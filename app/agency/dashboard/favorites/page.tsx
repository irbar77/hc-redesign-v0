'use client'

import { useState } from 'react'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  Heart,
  MapPin,
  Star,
  Clock,
  BadgeCheck,
  Grid3X3,
  List,
  MoreVertical,
  Trash2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

// Mock data for favorite caregivers
const favoriteCaregivers = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    avatar: null,
    role: 'HHA',
    rating: 4.9,
    reviews: 47,
    location: 'Brooklyn, NY',
    experience: '8 years',
    hourlyRate: '$18-22',
    availability: 'Immediate',
    verified: true,
    languages: ['English', 'Spanish'],
    skills: ['Alzheimer Care', 'Hoyer Lift', 'Wound Care'],
    lastActive: '2 hours ago',
    savedDate: 'Mar 15, 2024',
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: null,
    role: 'PCA',
    rating: 4.8,
    reviews: 32,
    location: 'Queens, NY',
    experience: '5 years',
    hourlyRate: '$16-20',
    availability: 'Within 1 week',
    verified: true,
    languages: ['English'],
    skills: ['Dementia Care', 'Medication Management'],
    lastActive: '5 hours ago',
    savedDate: 'Mar 12, 2024',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    avatar: null,
    role: 'CNA',
    rating: 5.0,
    reviews: 61,
    location: 'Manhattan, NY',
    experience: '10 years',
    hourlyRate: '$20-25',
    availability: 'Within 2 weeks',
    verified: true,
    languages: ['English', 'Mandarin', 'Cantonese'],
    skills: ['Hospice Care', 'IV Therapy', 'Vital Signs'],
    lastActive: '1 day ago',
    savedDate: 'Mar 10, 2024',
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: null,
    role: 'HHA',
    rating: 4.7,
    reviews: 28,
    location: 'Bronx, NY',
    experience: '3 years',
    hourlyRate: '$15-18',
    availability: 'Immediate',
    verified: false,
    languages: ['English'],
    skills: ['Personal Care', 'Meal Preparation', 'Light Housekeeping'],
    lastActive: '3 hours ago',
    savedDate: 'Mar 8, 2024',
  },
  {
    id: '5',
    name: 'Emily Davis',
    avatar: null,
    role: 'PCA',
    rating: 4.9,
    reviews: 53,
    location: 'Staten Island, NY',
    experience: '6 years',
    hourlyRate: '$17-21',
    availability: 'Within 1 week',
    verified: true,
    languages: ['English', 'Russian'],
    skills: ['Pediatric Care', 'Special Needs', 'CPR Certified'],
    lastActive: '30 min ago',
    savedDate: 'Mar 5, 2024',
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: null,
    role: 'CNA',
    rating: 4.6,
    reviews: 19,
    location: 'Brooklyn, NY',
    experience: '2 years',
    hourlyRate: '$16-19',
    availability: 'Within 2 weeks',
    verified: true,
    languages: ['English', 'Korean'],
    skills: ['Post-Surgery Care', 'Physical Therapy Assistance'],
    lastActive: '6 hours ago',
    savedDate: 'Mar 1, 2024',
  },
]

export default function AgencyFavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('recent')
  const [filterRole, setFilterRole] = useState('all')

  const filteredCaregivers = favoriteCaregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caregiver.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caregiver.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || caregiver.role === filterRole
    return matchesSearch && matchesRole
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'HHA': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'PCA': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'CNA': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto">
      <DashboardPageHeader
        title="Favorites"
        description="Caregivers you've saved for future reference"
        breadcrumbs={[
          { label: 'Dashboard', href: '/agency/dashboard' },
          { label: 'Favorites' },
        ]}
      />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search caregivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="HHA">HHA</SelectItem>
              <SelectItem value="PCA">PCA</SelectItem>
              <SelectItem value="CNA">CNA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Saved</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredCaregivers.length} caregiver{filteredCaregivers.length !== 1 ? 's' : ''} saved
      </p>

      {/* Caregivers Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCaregivers.map((caregiver) => (
            <Card key={caregiver.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(caregiver.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-foreground">{caregiver.name}</h3>
                        {caregiver.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(caregiver.role)}`}>
                          {caregiver.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{caregiver.experience}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><ExternalLink className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
                      <DropdownMenuItem><MessageCircle className="h-4 w-4 mr-2" />Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Remove from Favorites</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /><span>{caregiver.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{caregiver.rating} ({caregiver.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /><span>{caregiver.availability}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {caregiver.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs font-normal">{skill}</Badge>
                  ))}
                  {caregiver.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">+{caregiver.skills.length - 3}</Badge>
                  )}
                </div>

                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{caregiver.hourlyRate}/hr</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <MessageCircle className="h-3.5 w-3.5 mr-1.5" />Message
                    </Button>
                    <Button size="sm" className="h-8">Invite</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCaregivers.map((caregiver) => (
            <Card key={caregiver.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {getInitials(caregiver.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{caregiver.name}</h3>
                      {caregiver.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                      <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(caregiver.role)}`}>{caregiver.role}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{caregiver.location}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{caregiver.rating} ({caregiver.reviews})</span>
                      <span>{caregiver.experience}</span>
                      <span>{caregiver.hourlyRate}/hr</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {caregiver.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs font-normal">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline"><MessageCircle className="h-4 w-4 mr-1.5" />Message</Button>
                    <Button size="sm">Invite</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><ExternalLink className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredCaregivers.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No favorites found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery || filterRole !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start saving caregivers to see them here'}
          </p>
          {!searchQuery && filterRole === 'all' && (
            <Button className="mt-4" asChild>
              <Link href="/search/caregivers"><Search className="h-4 w-4 mr-2" />Find Caregivers</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
