'use client'

import { MapPin, Star, BadgeCheck, Phone, Globe, Crown, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Agency } from '@/lib/mock-data'

// Free tier card - basic, compact design
export function AgencyCardFree({ agency }: { agency: Agency }) {
  return (
    <Card className="hover:shadow-sm transition-shadow bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-base text-card-foreground">{agency.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              {agency.location}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{agency.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {agency.services.slice(0, 2).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs font-normal">
              {service}
            </Badge>
          ))}
          {agency.services.length > 2 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{agency.services.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          {agency.hiring && (
            <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
              Hiring
            </Badge>
          )}
          <Button variant="ghost" size="sm" className="ml-auto text-xs h-8">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Basic tier card - standard design with more info
export function AgencyCardBasic({ agency }: { agency: Agency }) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card border-border">
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
        <p className="text-sm text-muted-foreground line-clamp-2">{agency.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {agency.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {agency.services.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{agency.services.length - 3}
            </Badge>
          )}
        </div>

        {agency.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {agency.phone}
          </div>
        )}
        
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

// Premium tier card - featured design with highlights
export function AgencyCardPremium({ agency }: { agency: Agency }) {
  return (
    <Card className="hover:shadow-lg transition-all bg-card border-2 border-primary/20 relative overflow-hidden">
      {/* Premium badge */}
      <div className="absolute top-0 right-0">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Crown className="h-3 w-3" />
          Premium
        </div>
      </div>
      
      {agency.featured && (
        <div className="absolute top-0 left-0">
          <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-br-lg flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        </div>
      )}

      <CardHeader className="pb-3 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xl text-card-foreground">{agency.name}</h3>
              {agency.verified && (
                <BadgeCheck className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {agency.location}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm text-amber-700">{agency.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{agency.reviewCount} reviews</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{agency.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {agency.services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              {service}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {agency.phone && (
            <div className="flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">{agency.phone}</span>
            </div>
          )}
          {agency.website && (
            <div className="flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-primary hover:underline cursor-pointer">{agency.website}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {agency.hiring && (
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              Actively Hiring
            </Badge>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              Contact
            </Button>
            <Button size="sm">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Universal component that renders the right card based on tier
export function AgencyCard({ agency }: { agency: Agency }) {
  switch (agency.tier) {
    case 'premium':
      return <AgencyCardPremium agency={agency} />
    case 'basic':
      return <AgencyCardBasic agency={agency} />
    case 'free':
    default:
      return <AgencyCardFree agency={agency} />
  }
}

// List view variant for all tiers
export function AgencyCardListView({ agency }: { agency: Agency }) {
  const isPremium = agency.tier === 'premium'
  
  return (
    <Card className={`hover:shadow-md transition-all ${isPremium ? 'border-2 border-primary/20' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Left - Logo placeholder */}
        <div className={`h-20 w-20 sm:h-24 sm:w-24 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl font-bold ${
          isPremium ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600' : 'bg-muted text-muted-foreground'
        }`}>
          {agency.name.substring(0, 2).toUpperCase()}
        </div>
        
        {/* Center - Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-semibold ${isPremium ? 'text-lg' : 'text-base'} text-card-foreground`}>
                  {agency.name}
                </h3>
                {agency.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {agency.location}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md flex-shrink-0">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{agency.rating}</span>
              <span className="text-xs text-muted-foreground">({agency.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{agency.description}</p>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {agency.services.slice(0, isPremium ? 5 : 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {agency.services.length > (isPremium ? 5 : 3) && (
              <Badge variant="secondary" className="text-xs">
                +{agency.services.length - (isPremium ? 5 : 3)}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Right - Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
          {agency.hiring && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Hiring
            </Badge>
          )}
          <Button variant={isPremium ? 'default' : 'outline'} size="sm">
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  )
}
