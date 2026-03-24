'use client'

import { MapPin, Star, BadgeCheck, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Agency, Caregiver, Job } from '@/lib/mock-data'

export function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-card-foreground">{agency.name}</h3>
              {agency.verified && (
                <BadgeCheck className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {agency.location}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{agency.rating}</span>
            <span className="text-xs text-muted-foreground">({agency.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{agency.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {agency.services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          {agency.hiring && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Hiring Now
            </Badge>
          )}
          <Button variant="outline" size="sm" className="ml-auto">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 bg-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {caregiver.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{caregiver.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {caregiver.location}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{caregiver.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {caregiver.experience}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            {caregiver.hourlyRate}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {caregiver.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          {caregiver.available ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Available
            </Badge>
          ) : (
            <Badge variant="secondary">Currently Unavailable</Badge>
          )}
          <Button variant="outline" size="sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{job.title}</h3>
            <p className="text-sm text-primary font-medium">{job.agencyName}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
          </div>
          <Badge variant="outline">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{job.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{job.salary}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {job.requirements.slice(0, 3).map((req) => (
            <Badge key={req} variant="secondary" className="text-xs">
              {req}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{job.postedAt}</span>
          <Button size="sm">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}
