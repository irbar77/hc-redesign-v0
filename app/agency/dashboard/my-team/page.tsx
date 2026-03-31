'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AgencyDashboardSidebarV3 } from '@/components/agency/dashboard-sidebar-v3'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Bell,
  MessageCircle,
  Home,
  Search,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  Filter,
  MoreVertical,
  Trash2,
  ExternalLink,
  Users,
  Copy,
  Check,
  Upload,
  UserPlus,
  Eye,
  UserCheck,
  Infinity,
  Send,
  FileSpreadsheet,
  Plus,
  X,
  ChevronDown,
  Edit,
  Ban,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

// Mock data for team members
const teamMembers = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    avatar: null,
    role: 'HHA',
    phone: '+1 (718) 555-0123',
    email: 'maria.r@email.com',
    location: 'Brooklyn, NY',
    status: 'active',
    joinedDate: 'Mar 15, 2024',
    joinMethod: 'invite',
    lastActive: '2 hours ago',
    casesCompleted: 24,
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: null,
    role: 'PCA',
    phone: '+1 (347) 555-0456',
    email: 'james.w@email.com',
    location: 'Queens, NY',
    status: 'active',
    joinedDate: 'Mar 12, 2024',
    joinMethod: 'manual',
    lastActive: '5 hours ago',
    casesCompleted: 18,
  },
  {
    id: '3',
    name: 'Sofia Chen',
    avatar: null,
    role: 'CNA',
    phone: '+1 (646) 555-0789',
    email: 'sofia.c@email.com',
    location: 'Manhattan, NY',
    status: 'active',
    joinedDate: 'Feb 28, 2024',
    joinMethod: 'file',
    lastActive: '1 day ago',
    casesCompleted: 31,
  },
  {
    id: '4',
    name: 'Robert Johnson',
    avatar: null,
    role: 'HHA',
    phone: '+1 (917) 555-0321',
    email: 'robert.j@email.com',
    location: 'Bronx, NY',
    status: 'inactive',
    joinedDate: 'Feb 15, 2024',
    joinMethod: 'invite',
    lastActive: '1 week ago',
    casesCompleted: 12,
  },
  {
    id: '5',
    name: 'Elena Petrova',
    avatar: null,
    role: 'PCA',
    phone: '+1 (718) 555-0654',
    email: 'elena.p@email.com',
    location: 'Staten Island, NY',
    status: 'active',
    joinedDate: 'Jan 20, 2024',
    joinMethod: 'manual',
    lastActive: '3 hours ago',
    casesCompleted: 42,
  },
  {
    id: '6',
    name: 'Michael Brown',
    avatar: null,
    role: 'CNA',
    phone: '+1 (347) 555-0987',
    email: 'michael.b@email.com',
    location: 'Brooklyn, NY',
    status: 'pending',
    joinedDate: 'Mar 20, 2024',
    joinMethod: 'invite',
    lastActive: 'Never',
    casesCompleted: 0,
  },
]

export default function MyTeamPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [copied, setCopied] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addMethod, setAddMethod] = useState<'manual' | 'file'>('manual')

  // Form state for manual add
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    location: '',
  })

  const inviteLink = 'https://hczop.com/join/sunrise-home-care/abc123xyz'

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredMembers = teamMembers
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'all' || member.role === roleFilter
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'cases':
          return b.casesCompleted - a.casesCompleted
        case 'recent':
        default:
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
      }
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
      default:
        return null
    }
  }

  const getJoinMethodBadge = (method: string) => {
    switch (method) {
      case 'invite':
        return <Badge variant="outline" className="text-xs">Via Link</Badge>
      case 'manual':
        return <Badge variant="outline" className="text-xs">Manual</Badge>
      case 'file':
        return <Badge variant="outline" className="text-xs">Imported</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      'HHA': 'bg-blue-100 text-blue-700',
      'PCA': 'bg-purple-100 text-purple-700',
      'CNA': 'bg-teal-100 text-teal-700',
    }
    return <Badge className={`${colors[role] || 'bg-gray-100 text-gray-700'} hover:${colors[role]}`}>{role}</Badge>
  }

  return (
    <div className="h-screen flex flex-col bg-sidebar overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-1 min-h-0">
          <AgencyDashboardSidebarV3 />
          <SidebarInset className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col bg-background overflow-hidden">
              {/* Header */}
              <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 lg:px-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-2 lg:hidden" />
                  <Separator orientation="vertical" className="h-6 lg:hidden" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/agency/dashboard">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>My Team</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                          <Home className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Back to site</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <MessageCircle className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                          3
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Messages</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                          5
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>

                  <ThemeToggle />

                  <Separator orientation="vertical" className="h-6 hidden md:block" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 px-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="/avatars/user.jpg" />
                          <AvatarFallback className="text-xs bg-primary/10">SC</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline text-sm font-medium">Emerald</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/agency/dashboard">Profile Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Account</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </header>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
                  {/* Page Header */}
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">Your Internal Team</h1>
                    <p className="text-muted-foreground mt-1">
                      The fastest way for mass communication and team coordination.
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Eye className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">4</p>
                            <p className="text-sm text-muted-foreground">Invites Viewed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">7</p>
                            <p className="text-sm text-muted-foreground">Team Members Joined</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Send className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold flex items-center gap-1">
                              <Infinity className="h-5 w-5" />
                            </p>
                            <p className="text-sm text-muted-foreground">Broadcast Limit</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Invite Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        Invite Your Staff Members
                      </CardTitle>
                      <CardDescription>
                        Use this personal link to add your own caregivers to your private roster. They will be marked as Team Members, enabling you to send bulk notifications when new cases or replacements are needed. These workers stay exclusive to your agency and will not appear in public search.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Invite Link */}
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input
                            value={inviteLink}
                            readOnly
                            className="pr-20 bg-muted/50 font-mono text-sm"
                          />
                        </div>
                        <Button onClick={handleCopyLink} variant="outline" className="gap-2">
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Link
                            </>
                          )}
                        </Button>
                      </div>

                      <Separator />

                      {/* Alternative Methods */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 flex-1">
                              <Upload className="h-4 w-4" />
                              Upload Spreadsheet
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Add Team Members</DialogTitle>
                              <DialogDescription>
                                Choose how you want to add members to your team.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <Tabs value={addMethod} onValueChange={(v) => setAddMethod(v as 'manual' | 'file')}>
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="manual" className="gap-2">
                                  <UserPlus className="h-4 w-4" />
                                  Manual Entry
                                </TabsTrigger>
                                <TabsTrigger value="file" className="gap-2">
                                  <FileSpreadsheet className="h-4 w-4" />
                                  Upload File
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="manual" className="space-y-4 mt-4">
                                <div className="grid gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                      id="name"
                                      placeholder="John Doe"
                                      value={newMember.name}
                                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="role">Role *</Label>
                                      <Select
                                        value={newMember.role}
                                        onValueChange={(v) => setNewMember({ ...newMember, role: v })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="HHA">HHA</SelectItem>
                                          <SelectItem value="PCA">PCA</SelectItem>
                                          <SelectItem value="CNA">CNA</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="phone">Phone</Label>
                                      <Input
                                        id="phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={newMember.phone}
                                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      placeholder="john@email.com"
                                      value={newMember.email}
                                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                      id="location"
                                      placeholder="Brooklyn, NY"
                                      value={newMember.location}
                                      onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="file" className="space-y-4 mt-4">
                                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                  <FileSpreadsheet className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                                  <p className="text-sm font-medium mb-1">
                                    Drop your file here or click to browse
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-4">
                                    Supports CSV, XLS, XLSX (max 5MB)
                                  </p>
                                  <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose File
                                  </Button>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <p className="text-sm font-medium mb-2">Required columns:</p>
                                  <p className="text-xs text-muted-foreground">
                                    Name, Role (HHA/PCA/CNA), Phone, Email, Location
                                  </p>
                                  <Button variant="link" className="h-auto p-0 mt-2 text-xs">
                                    Download template file
                                  </Button>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setIsAddDialogOpen(false)}>
                                {addMethod === 'manual' ? 'Add Member' : 'Upload & Import'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button 
                          variant="outline" 
                          className="gap-2 flex-1"
                          onClick={() => {
                            setAddMethod('manual')
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          Add Manually
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Team Members List */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Team Members
                        <Badge variant="secondary" className="ml-1">{teamMembers.length}</Badge>
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search members..."
                            className="pl-9 w-full sm:w-48"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        {/* Role Filter */}
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="HHA">HHA</SelectItem>
                            <SelectItem value="PCA">PCA</SelectItem>
                            <SelectItem value="CNA">CNA</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Recently Joined</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                            <SelectItem value="cases">Most Cases</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Members Table */}
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/30">
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Member</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Role</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Contact</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Location</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Joined</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Cases</th>
                                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredMembers.map((member) => (
                                <tr key={member.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-9 w-9">
                                        <AvatarImage src={member.avatar || undefined} />
                                        <AvatarFallback className="text-xs bg-primary/10">
                                          {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium text-sm">{member.name}</p>
                                        <p className="text-xs text-muted-foreground md:hidden">{member.phone}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    {getRoleBadge(member.role)}
                                  </td>
                                  <td className="p-4 hidden md:table-cell">
                                    <div className="space-y-1">
                                      <p className="text-sm flex items-center gap-1.5">
                                        <Phone className="h-3 w-3 text-muted-foreground" />
                                        {member.phone}
                                      </p>
                                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <Mail className="h-3 w-3" />
                                        {member.email}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="p-4 hidden lg:table-cell">
                                    <p className="text-sm flex items-center gap-1.5">
                                      <MapPin className="h-3 w-3 text-muted-foreground" />
                                      {member.location}
                                    </p>
                                  </td>
                                  <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                      {getStatusBadge(member.status)}
                                      {getJoinMethodBadge(member.joinMethod)}
                                    </div>
                                  </td>
                                  <td className="p-4 hidden lg:table-cell">
                                    <p className="text-sm">{member.joinedDate}</p>
                                    <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                                  </td>
                                  <td className="p-4 hidden md:table-cell">
                                    <p className="text-sm font-medium">{member.casesCompleted}</p>
                                  </td>
                                  <td className="p-4 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <ExternalLink className="h-4 w-4 mr-2" />
                                          View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <MessageCircle className="h-4 w-4 mr-2" />
                                          Send Message
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {member.status === 'active' ? (
                                          <DropdownMenuItem>
                                            <Ban className="h-4 w-4 mr-2" />
                                            Deactivate
                                          </DropdownMenuItem>
                                        ) : (
                                          <DropdownMenuItem>
                                            <BadgeCheck className="h-4 w-4 mr-2" />
                                            Activate
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Remove from Team
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {filteredMembers.length === 0 && (
                            <div className="p-12 text-center">
                              <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                              <h3 className="font-medium text-lg mb-1">No team members found</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                                  ? 'Try adjusting your filters or search query'
                                  : 'Start by inviting caregivers to join your team'}
                              </p>
                              <Button onClick={handleCopyLink} variant="outline" className="gap-2">
                                <Copy className="h-4 w-4" />
                                Copy Invite Link
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
