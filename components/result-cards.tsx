'use client'

import { MapPin, Star, BadgeCheck, ShieldCheck, Clock, DollarSign, Users, Globe, Award, Zap, FileText, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Building2 } from 'lucide-react'
import type { Agency, Caregiver, Job } from '@/lib/mock-data'
import type { ViewMode } from '@/components/search-filters'
import { cn } from '@/lib/utils'

interface AgencyCardProps {
  agency: Agency
  viewMode?: ViewMode
}

export function AgencyCard({ agency, viewMode = 'card' }: AgencyCardProps) {
  const isPremium = agency.tier === 'premium'
  const isVerified = agency.tier === 'verified'
  const isFree = agency.tier === 'free'
  const isListView = viewMode === 'list'

  // List view layout
  if (isListView) {
    return (
      <Card 
        className={cn(
          "transition-all duration-200 bg-card relative overflow-hidden",
          isPremium && "ring-1 ring-primary/30 shadow-md hover:shadow-lg",
          isVerified && "ring-1 ring-primary/20 hover:shadow-md",
          isFree && "hover:shadow-sm"
        )}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Main content */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Left: Name, location, badges */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {agency.hiring && (
                    <Badge className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
                      Hiring Now
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="font-semibold text-card-foreground text-base sm:text-lg truncate">
                    {agency.name}
                  </h3>
                  {(isPremium || isVerified) && (
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                  )}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md shrink-0 bg-muted ml-auto sm:ml-2">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{agency.rating}</span>
                    <span className="text-xs text-muted-foreground">({agency.reviewCount})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {agency.zipCode}, {agency.location}
                  </span>
                  {isPremium && agency.yearsInBusiness && (
                    <span className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      {agency.yearsInBusiness} years
                    </span>
                  )}
                  {isPremium && agency.staffCount && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {agency.staffCount}+ staff
                    </span>
                  )}
                  {isVerified && agency.yearsInBusiness && (
                    <span className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      {agency.yearsInBusiness} years
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                  {agency.description}
                </p>

                {/* Services and benefits in one row */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {agency.services.slice(0, 3).map((service) => (
                    <Badge 
                      key={service} 
                      variant="secondary" 
                      className="text-xs bg-muted text-muted-foreground hover:bg-muted/80"
                    >
                      {service}
                    </Badge>
                  ))}
                  {agency.services.length > 3 && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      +{agency.services.length - 3}
                    </Badge>
                  )}
                  {isPremium && agency.benefits && agency.benefits.slice(0, 2).map((benefit) => (
                    <span 
                      key={benefit} 
                      className="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full dark:text-sky-300 dark:bg-sky-950/50"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Footer area */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 px-4 py-3 sm:px-5 sm:py-4 bg-muted/40 dark:bg-muted/20 sm:w-40">
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
              {isPremium ? "PREMIUM" : isVerified ? "VERIFIED" : "BASIC"}
            </span>
            <Button 
              variant={isPremium ? "default" : "outline"} 
              size="sm"
            >
              View Profile
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  // Card view layout (default)
  return (
    <Card 
      className={cn(
        "transition-all duration-200 bg-card relative overflow-hidden flex flex-col p-0 gap-0",
        isPremium && "ring-1 ring-primary/30 shadow-md hover:shadow-lg",
        isVerified && "ring-1 ring-primary/20 hover:shadow-md",
        isFree && "hover:shadow-sm"
      )}
    >
      <CardHeader className="pt-6 pb-3">
        {/* Hiring badge at top - reserved space for alignment */}
        <div className="min-h-[1.5rem] mb-2">
          {agency.hiring && (
            <Badge className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
              Hiring Now
            </Badge>
          )}
        </div>

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
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{agency.zipCode}, {agency.location}</span>
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

      <CardContent className="space-y-3 flex-1 pb-6">
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
      </CardContent>

      {/* Footer - flush to bottom */}
      <div className="flex items-center justify-between px-6 py-4 mt-auto bg-muted/40 dark:bg-muted/20 border-t border-border/50">
        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
          {isPremium ? "PREMIUM MEMBER" : isVerified ? "VERIFIED MEMBER" : "BASIC LISTING"}
        </span>
        <Button 
          variant={isPremium ? "default" : "outline"} 
          size="sm"
        >
          View Profile
        </Button>
      </div>
    </Card>
  )
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  const isPremium = caregiver.tier === 'premium'
  const isVerified = caregiver.tier === 'verified'
  const isFree = caregiver.tier === 'free'

  return (
    <Card 
      className={cn(
        "transition-all duration-200 bg-card relative overflow-hidden flex flex-col p-0 gap-0",
        isPremium && "ring-1 ring-primary/30 shadow-md hover:shadow-lg",
        isVerified && "ring-1 ring-primary/20 hover:shadow-md",
        isFree && "hover:shadow-sm"
      )}
    >
      <CardHeader className="pt-6 pb-3">
        {/* Availability badge at top - reserved space for alignment */}
        <div className="min-h-[1.5rem] mb-2">
          {caregiver.available && (
            <Badge className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
              Available Now
            </Badge>
          )}
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm sm:text-base">
                {caregiver.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 mt-0.5">
              <div className="flex items-center gap-2">
                <h3 className={cn(
                  "font-semibold text-card-foreground truncate",
                  isPremium ? "text-lg" : "text-base"
                )}>
                  {caregiver.name}
                </h3>
                {(isPremium || isVerified) && (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{caregiver.zipCode}, {caregiver.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md shrink-0 bg-muted ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{caregiver.rating}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">({caregiver.reviewCount})</span>
          </div>
        </div>

        {/* Premium: Extra info row */}
        {isPremium && (
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              {caregiver.certificate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {caregiver.experience}
            </span>
            {caregiver.responseTime && (
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                Fast response
              </span>
            )}
          </div>
        )}

        {/* Verified: Relevant info row */}
        {isVerified && (
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              {caregiver.certificate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {caregiver.experience}
            </span>
          </div>
        )}

        {/* Free: Relevant info row */}
        {isFree && (
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              {caregiver.certificate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {caregiver.experience}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 flex-1 pb-6">
        <p className={cn(
          "text-sm text-muted-foreground",
          isPremium ? "line-clamp-3" : "line-clamp-2"
        )}>
          {caregiver.description}
        </p>

        {/* Skills - light gray pills */}
        <div className="flex flex-wrap gap-1.5">
          {caregiver.skills.slice(0, isPremium ? 4 : isFree ? 2 : 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-xs bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {skill}
            </Badge>
          ))}
          {caregiver.skills.length > (isPremium ? 4 : isFree ? 2 : 3) && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{caregiver.skills.length - (isPremium ? 4 : isFree ? 2 : 3)} more
            </Badge>
          )}
        </div>

        {/* Premium: Languages */}
        {isPremium && caregiver.languages && caregiver.languages.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>{caregiver.languages.join(', ')}</span>
          </div>
        )}

        {/* Verified: Languages (simpler) */}
        {isVerified && caregiver.languages && caregiver.languages.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>{caregiver.languages.slice(0, 2).join(', ')}{caregiver.languages.length > 2 ? ` +${caregiver.languages.length - 2}` : ''}</span>
          </div>
        )}

      </CardContent>

      {/* Footer - flush to bottom */}
      <div className="flex items-center justify-between px-6 py-4 mt-auto bg-muted/40 dark:bg-muted/20 border-t border-border/50">
        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
          {isPremium ? "PREMIUM MEMBER" : isVerified ? "VERIFIED MEMBER" : "BASIC LISTING"}
        </span>
        <Button 
          variant={isPremium ? "default" : "outline"} 
          size="sm"
        >
          View Profile
        </Button>
      </div>
    </Card>
  )
}

export function JobCard({ job }: { job: Job }) {
  const isPremium = job.tier === 'premium'
  const isVerified = job.tier === 'verified'
  const isFree = job.tier === 'free'

  return (
    <Card 
      className={cn(
        "transition-all duration-200 bg-card relative overflow-hidden flex flex-col p-0 gap-0",
        isPremium && "ring-1 ring-primary/30 shadow-md hover:shadow-lg",
        isVerified && "ring-1 ring-primary/20 hover:shadow-md",
        isFree && "hover:shadow-sm"
      )}
    >
      <CardHeader className="pt-6 pb-3">
        {/* Availability badge at top - reserved space for alignment */}
        <div className="min-h-[1.5rem] mb-2 flex justify-between items-center">
          <Badge variant="outline" className="text-xs bg-muted">
            {job.type}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">{job.postedAt}</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-semibold text-card-foreground truncate",
                isPremium ? "text-lg" : "text-base"
              )}>
                {job.title}
              </h3>
              {(isPremium || isVerified) && (
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-primary font-medium mt-0.5">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="truncate">{job.agencyName}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{job.zipCode}, {job.location}</span>
            </div>
          </div>
        </div>

        {/* Unified Info Row for all tiers since salary & schedule are critical for Cases */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
          {job.salary && (
            <span className="flex items-center gap-1 font-medium text-primary">
              <DollarSign className="h-3.5 w-3.5" />
              {job.salary}
            </span>
          )}
          {job.hours && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {job.hours}
            </span>
          )}
          {job.schedule && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {job.schedule}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 pb-6">
        <p className={cn(
          "text-sm text-muted-foreground",
          isPremium ? "line-clamp-3" : "line-clamp-2"
        )}>
          {job.description}
        </p>

        {/* Requirements - light gray pills */}
        <div className="flex flex-wrap gap-1.5">
          {job.requirements.slice(0, isPremium ? 4 : isFree ? 2 : 3).map((req) => (
            <Badge 
              key={req} 
              variant="secondary" 
              className="text-xs bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {req}
            </Badge>
          ))}
          {job.requirements.length > (isPremium ? 4 : isFree ? 2 : 3) && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{job.requirements.length - (isPremium ? 4 : isFree ? 2 : 3)} more
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer - flush to bottom */}
      <div className="flex items-center justify-between px-6 py-4 mt-auto bg-muted/40 dark:bg-muted/20 border-t border-border/50">
        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
          {isPremium ? "PREMIUM LISTING" : isVerified ? "VERIFIED LISTING" : "BASIC LISTING"}
        </span>
        <Button 
          variant={isPremium ? "default" : "outline"} 
          size="sm"
        >
          View Case
        </Button>
      </div>
    </Card>
  )
}

