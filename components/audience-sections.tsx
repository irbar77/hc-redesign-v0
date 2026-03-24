import { ArrowRight, Briefcase, Building2, Heart, Shield, Clock, Users, DollarSign, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureItem) {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="pt-6">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h4 className="font-semibold text-card-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

export function ForCaregiversSection() {
  const features: FeatureItem[] = [
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: 'Find Quality Jobs',
      description: 'Browse hundreds of caregiver positions from verified agencies in your area.',
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: 'Competitive Pay',
      description: 'Compare rates and find positions that match your experience and skills.',
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Flexible Schedules',
      description: 'Choose from full-time, part-time, live-in, or per-diem opportunities.',
    },
  ]

  return (
    <section id="for-caregivers" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              For Caregivers
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Build your career in home care
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Whether you are a certified HHA, CNA, or experienced companion, find rewarding 
              opportunities with reputable agencies and private clients in your neighborhood.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2">
                Browse Jobs
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Create Profile
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ForAgenciesSection() {
  const features: FeatureItem[] = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Access Qualified Talent',
      description: 'Connect with certified caregivers actively seeking employment in your service area.',
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: 'Smart Matching',
      description: 'Our platform matches your job requirements with caregiver skills and availability.',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Verified Profiles',
      description: 'All caregiver profiles include certifications, background checks, and reviews.',
    },
  ]

  return (
    <section id="for-agencies" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid sm:grid-cols-1 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              For Agencies
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Grow your home care agency
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Expand your reach and find qualified caregivers faster. List your agency, 
              post jobs, and connect with families seeking your services.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2">
                List Your Agency
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ForFamiliesSection() {
  const features: FeatureItem[] = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: 'Compassionate Care',
      description: 'Find caregivers who truly care about your loved ones well-being.',
    },
    {
      icon: <Building2 className="h-6 w-6 text-primary" />,
      title: 'Trusted Agencies',
      description: 'Browse licensed and insured home care agencies with verified reviews.',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Peace of Mind',
      description: 'All caregivers undergo background checks and credential verification.',
    },
  ]

  return (
    <section id="for-families" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              For Families & Patients
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Quality care for your loved ones
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Finding the right caregiver or agency should not be stressful. Search by location, 
              compare options, read reviews, and find the perfect match for your family needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2">
                Find Care Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
