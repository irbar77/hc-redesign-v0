'use client'

import { useState } from 'react'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  Briefcase,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Copy,
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

// Mock data for jobs/cases
const jobs = [
  {
    id: '1', title: 'Live-in HHA Needed', status: 'active', type: 'Live-in', role: 'HHA',
    location: 'Manhattan, NY', hourlyRate: '$20-25', schedule: 'Mon-Fri, 24/7',
    postedDate: 'Mar 20, 2024', expiresDate: 'Apr 20, 2024', applicants: 12, views: 156,
    description: 'Looking for experienced HHA for elderly patient with mobility issues.',
    requirements: ['2+ years experience', 'Hoyer Lift certified', 'Valid driver license'],
  },
  {
    id: '2', title: 'Part-time PCA for Alzheimer Patient', status: 'active', type: 'Part-time', role: 'PCA',
    location: 'Brooklyn, NY', hourlyRate: '$18-22', schedule: 'Mon, Wed, Fri - 8AM-4PM',
    postedDate: 'Mar 18, 2024', expiresDate: 'Apr 18, 2024', applicants: 8, views: 98,
    description: 'Seeking compassionate PCA with Alzheimer care experience.',
    requirements: ['Alzheimer care experience', 'CPR certified'],
  },
  {
    id: '3', title: 'Weekend CNA - Wound Care', status: 'paused', type: 'Part-time', role: 'CNA',
    location: 'Queens, NY', hourlyRate: '$22-28', schedule: 'Sat-Sun, 8AM-8PM',
    postedDate: 'Mar 10, 2024', expiresDate: 'Apr 10, 2024', applicants: 5, views: 67,
    description: 'CNA needed for weekend wound care and general assistance.',
    requirements: ['CNA license', 'Wound care experience', '1+ year experience'],
  },
  {
    id: '4', title: 'Full-time HHA for Couple', status: 'closed', type: 'Full-time', role: 'HHA',
    location: 'Staten Island, NY', hourlyRate: '$19-23', schedule: 'Mon-Fri, 9AM-5PM',
    postedDate: 'Feb 25, 2024', expiresDate: 'Mar 25, 2024', applicants: 15, views: 234,
    description: 'Experienced HHA needed to care for elderly couple.',
    requirements: ['3+ years experience', 'Cooking skills', 'Light housekeeping'],
  },
  {
    id: '5', title: 'Overnight PCA Needed', status: 'draft', type: 'Overnight', role: 'PCA',
    location: 'Bronx, NY', hourlyRate: '$17-20', schedule: 'Sun-Thu, 10PM-6AM',
    postedDate: 'Mar 22, 2024', expiresDate: null, applicants: 0, views: 0,
    description: 'Overnight PCA for patient requiring minimal assistance.',
    requirements: ['PCA certificate', 'Reliable transportation'],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400'
    case 'paused': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'closed': return 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive'
    case 'draft': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
    default: return 'bg-gray-100 text-gray-600 border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <CheckCircle className="h-3.5 w-3.5" />
    case 'paused': return <Pause className="h-3.5 w-3.5" />
    case 'closed': return <XCircle className="h-3.5 w-3.5" />
    case 'draft': return <Edit className="h-3.5 w-3.5" />
    default: return null
  }
}

export default function AgencyJobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    const matchesRole = roleFilter === 'all' || job.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const activeJobs = jobs.filter(j => j.status === 'active').length
  const pausedJobs = jobs.filter(j => j.status === 'paused').length
  const closedJobs = jobs.filter(j => j.status === 'closed').length
  const draftJobs = jobs.filter(j => j.status === 'draft').length

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto">
      <DashboardPageHeader
        title="Jobs"
        description="Manage your job postings and cases"
        breadcrumbs={[
          { label: 'Dashboard', href: '/agency/dashboard' },
          { label: 'Jobs' },
        ]}
      >
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Post New Job</span>
        </Button>
      </DashboardPageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-none bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeJobs}</p>
                <p className="text-xs text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <Pause className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pausedJobs}</p>
                <p className="text-xs text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{closedJobs}</p>
                <p className="text-xs text-muted-foreground">Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{draftJobs}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[110px] bg-card">
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

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No jobs found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Try adjusting your filters or create a new job posting.
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 lg:p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Job Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            <span className="ml-1 capitalize">{job.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.role} - {job.type}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{job.hourlyRate}/hr</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" />View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" />Edit Job</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" />Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {job.status === 'active' && <DropdownMenuItem className="gap-2"><Pause className="h-4 w-4" />Pause Job</DropdownMenuItem>}
                          {job.status === 'paused' && <DropdownMenuItem className="gap-2"><Play className="h-4 w-4" />Resume Job</DropdownMenuItem>}
                          {job.status !== 'closed' && <DropdownMenuItem className="gap-2"><XCircle className="h-4 w-4" />Close Job</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs font-normal">{req}</Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-normal">+{job.requirements.length - 3} more</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.schedule}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Posted {job.postedDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex lg:flex-col gap-4 lg:gap-3 lg:min-w-[140px] lg:items-end lg:text-right">
                    <div className="flex items-center lg:flex-row-reverse gap-2">
                      <div className="p-1.5 rounded-md bg-muted"><Users className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{job.applicants}</p>
                        <p className="text-xs text-muted-foreground">Applicants</p>
                      </div>
                    </div>
                    <div className="flex items-center lg:flex-row-reverse gap-2">
                      <div className="p-1.5 rounded-md bg-muted"><Eye className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{job.views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                    </div>
                    {job.status !== 'draft' && (
                      <Button variant="outline" size="sm" className="gap-1.5 mt-auto bg-card">
                        <Users className="h-3.5 w-3.5" />View Applicants
                      </Button>
                    )}
                    {job.status === 'draft' && (
                      <Button size="sm" className="gap-1.5 mt-auto">
                        <Play className="h-3.5 w-3.5" />Publish
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
