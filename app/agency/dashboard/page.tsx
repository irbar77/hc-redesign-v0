'use client'

import Link from 'next/link'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Briefcase,
  Users,
  MessageCircle,
  Eye,
  Plus,
  UserPlus,
  Edit,
  ArrowUpRight,
  Star,
  Heart,
  Clock,
  CheckCircle,
  TrendingUp,
} from 'lucide-react'

// Mock KPI data
const kpis = [
  {
    title: 'Active Jobs',
    value: '5',
    change: '+2 this week',
    icon: Briefcase,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    href: '/agency/dashboard/jobs',
  },
  {
    title: 'Team Members',
    value: '12',
    change: '+3 this month',
    icon: Users,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    href: '/agency/dashboard/my-team',
  },
  {
    title: 'Unread Messages',
    value: '3',
    change: '2 new today',
    icon: MessageCircle,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    href: '/agency/dashboard/messages',
  },
  {
    title: 'Profile Views',
    value: '156',
    change: '+23% this week',
    icon: Eye,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    href: '/agency/dashboard/profile',
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: '1',
    type: 'application',
    title: 'New application received',
    description: 'Maria Garcia applied for "Live-in HHA Needed"',
    timestamp: '5 minutes ago',
    avatar: null,
    initials: 'MG',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
  },
  {
    id: '2',
    type: 'message',
    title: 'New message',
    description: 'John Smith sent a message about the PCA position',
    timestamp: '15 minutes ago',
    avatar: null,
    initials: 'JS',
    icon: MessageCircle,
    iconColor: 'text-blue-500',
  },
  {
    id: '3',
    type: 'review',
    title: 'New 5-star review',
    description: 'Sarah Johnson left a review for your agency',
    timestamp: '1 hour ago',
    avatar: null,
    initials: 'SJ',
    icon: Star,
    iconColor: 'text-yellow-500',
  },
  {
    id: '4',
    type: 'favorite',
    title: 'Added to favorites',
    description: 'Emily Davis added your agency to favorites',
    timestamp: '3 hours ago',
    avatar: null,
    initials: 'ED',
    icon: Heart,
    iconColor: 'text-pink-500',
  },
  {
    id: '5',
    type: 'team',
    title: 'Team member joined',
    description: 'Robert Chen accepted your team invitation',
    timestamp: '1 day ago',
    avatar: null,
    initials: 'RC',
    icon: UserPlus,
    iconColor: 'text-primary',
  },
]

// Profile completion mock
const profileCompletion = {
  percentage: 72,
  completed: [
    'Agency name & type',
    'Contact information',
    'License details',
    'Services offered',
  ],
  pending: [
    'Upload agency logo',
    'Add service counties',
    'Complete hiring info',
  ],
}

export default function AgencyDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <DashboardPageHeader
        title="Welcome back, Sunrise Home Care"
        description="Here's an overview of your agency dashboard"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <Link key={kpi.title} href={kpi.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.iconBg}`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.title}</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.change}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button asChild className="gap-2">
          <Link href="/agency/dashboard/jobs">
            <Plus className="h-4 w-4" />
            Post a Job
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2 bg-card">
          <Link href="/agency/dashboard/my-team">
            <UserPlus className="h-4 w-4" />
            Invite Team Member
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2 bg-card">
          <Link href="/agency/dashboard/profile">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Activity - wider column */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-xs">
                  <Link href="/agency/dashboard/notifications">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start gap-3 py-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        {activity.avatar ? (
                          <AvatarImage src={activity.avatar} alt="" />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {activity.initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <activity.icon className={`h-3.5 w-3.5 ${activity.iconColor} shrink-0`} />
                          <p className="text-sm font-medium text-foreground truncate">
                            {activity.title}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion - narrower column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Profile Completion</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {profileCompletion.percentage}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={profileCompletion.percentage} className="h-2" />

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Completed
                </p>
                <div className="space-y-1.5">
                  {profileCompletion.completed.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  To complete
                </p>
                <div className="space-y-1.5">
                  {profileCompletion.pending.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" asChild className="w-full mt-2 bg-card">
                <Link href="/agency/dashboard/profile">
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  Complete Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
