'use client'

import { MapPin, Star, BadgeCheck, Clock, DollarSign, Users, Globe, Award, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Agency, Caregiver, Job } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function AgencyCard({ agency }: { agency: Agency }) {
  const isPremium = agency.tier === 'premium'
  const isVerified = agency.tier === 'verified'
  const isFree = agency.tier === 'free'

  return (
    <Card 
      className={cn(
        "transition-all duration-200 bg-card relative overflow-hidden",
        isPremium && "ring-1 ring-primary/30 shadow-md hover:shadow-lg",
        isVerified && "ring-1 ring-primary/20 hover:shadow-md",
        isFree && "hover:shadow-sm"
      )}
    >
      {/* Premium badge indicator */}
      {isPremium && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-primary/10 to-transparent px-3 py-1">
            <span className="text-xs font-medium text-primary flex items-center gap-1">
              <Award className="h-3 w-3" />
              Featured
            </span>
          </div>
        </div>
      )}

      <CardHeader className={cn("pb-3", isPremium && "pt-6")}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-semibold text-card-foreground truncate",
                isPremium ? "text-lg" : "text-base"
              )}>
                {agency.name}
              </h3>
              {(isPremium || isVerified) && (
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{agency.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md shrink-0 bg-muted">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{agency.rating}</span>
            <span className="text-xs text-muted-foreground">({agency.reviewCount})</span>
          </div>
        </div>

        {/* Premium: Extra info row */}
        {isPremium && (
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            {agency.yearsInBusiness && (
              <span className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-primary" />
                {agency.yearsInBusiness} years
              </span>
            )}
            {agency.staffCount && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-primary" />
                {agency.staffCount}+ staff
              </span>
            )}
            {agency.responseTime && (
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                Fast response
              </span>
            )}
          </div>
        )}

        {/* Verified: Years in business */}
        {isVerified && agency.yearsInBusiness && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-primary" />
            {agency.yearsInBusiness} years in business
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <p className={cn(
          "text-sm text-muted-foreground",
          isPremium ? "line-clamp-3" : "line-clamp-2"
        )}>
          {agency.description}
        </p>

        {/* Services - light gray pills */}
        <div className="flex flex-wrap gap-1.5">
          {agency.services.slice(0, isPremium ? 4 : isFree ? 2 : 3).map((service) => (
            <Badge 
              key={service} 
              variant="secondary" 
              className="text-xs bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {service}
            </Badge>
          ))}
          {agency.services.length > (isPremium ? 4 : isFree ? 2 : 3) && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{agency.services.length - (isPremium ? 4 : isFree ? 2 : 3)} more
            </Badge>
          )}
        </div>

        {/* Premium: Languages */}
        {isPremium && agency.languages && agency.languages.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>{agency.languages.join(', ')}</span>
          </div>
        )}

        {/* Verified: Languages (simpler) */}
        {isVerified && agency.languages && agency.languages.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>{agency.languages.slice(0, 2).join(', ')}{agency.languages.length > 2 ? ` +${agency.languages.length - 2}` : ''}</span>
          </div>
        )}

        {/* Premium: Benefits preview - light blue pills */}
        {isPremium && agency.benefits && agency.benefits.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {agency.benefits.slice(0, 3).map((benefit) => (
              <span 
                key={benefit} 
                className="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full dark:text-sky-300 dark:bg-sky-950/50"
              >
                {benefit}
              </span>
            ))}
            {agency.benefits.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5">
                +{agency.benefits.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={cn(
          "flex items-center justify-between pt-2",
          isPremium && "border-t border-primary/10"
        )}>
          <div className="flex items-center gap-2">
            {agency.hiring && (
              <Badge className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
                Hiring Now
              </Badge>
            )}
          </div>
          <Button 
            variant={isPremium ? "default" : "outline"} 
            size="sm"
          >
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
