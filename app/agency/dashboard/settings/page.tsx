'use client'

import { useState } from 'react'
import { DashboardPageHeader } from '@/components/agency/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Bell,
  User,
  Lock,
  CreditCard,
  Shield,
  Trash2,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Crown,
  LogOut,
  Key,
  Globe,
  BellRing,
  FileText,
  Download,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [newApplications, setNewApplications] = useState(true)
  const [newMessages, setNewMessages] = useState(true)
  const [teamUpdates, setTeamUpdates] = useState(true)
  const [paymentAlerts, setPaymentAlerts] = useState(true)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
      <DashboardPageHeader
        title="Settings"
        description="Manage your account preferences"
        breadcrumbs={[
          { label: 'Dashboard', href: '/agency/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="account" className="gap-2"><User className="h-4 w-4 hidden sm:inline" />Account</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4 hidden sm:inline" />Notifications</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2"><CreditCard className="h-4 w-4 hidden sm:inline" />Billing</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4 hidden sm:inline" />Security</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" />Email Address</CardTitle>
              <CardDescription>Manage your account email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input id="email" type="email" defaultValue="contact@sunrisehomecare.com" className="flex-1" />
                    <Badge variant="outline" className="h-9 px-3 bg-primary/10 text-primary border-primary/20"><Check className="h-3 w-3 mr-1" />Verified</Badge>
                  </div>
                </div>
              </div>
              <Button>Update Email</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" />Password</CardTitle>
              <CardDescription>Change your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input id="current-password" type={showCurrentPassword ? 'text' : 'password'} placeholder="Enter current password" />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input id="new-password" type={showNewPassword ? 'text' : 'password'} placeholder="Enter new password" />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />Language & Region</CardTitle>
              <CardDescription>Set your preferred language and timezone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en"><SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem><SelectItem value="zh">Chinese</SelectItem><SelectItem value="ru">Russian</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="est"><SelectTrigger><SelectValue placeholder="Select timezone" /></SelectTrigger><SelectContent><SelectItem value="est">Eastern Time (ET)</SelectItem><SelectItem value="cst">Central Time (CT)</SelectItem><SelectItem value="mst">Mountain Time (MT)</SelectItem><SelectItem value="pst">Pacific Time (PT)</SelectItem></SelectContent></Select>
                </div>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5" />Notification Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">Email Notifications</Label><p className="text-sm text-muted-foreground">Receive notifications via email</p></div><Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">Push Notifications</Label><p className="text-sm text-muted-foreground">Receive push notifications in browser</p></div><Switch checked={pushNotifications} onCheckedChange={setPushNotifications} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">SMS Notifications</Label><p className="text-sm text-muted-foreground">Receive notifications via SMS</p></div><Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notification Types</CardTitle><CardDescription>Select which notifications you want to receive</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">New Applications</Label><p className="text-sm text-muted-foreground">When someone applies to your job posting</p></div><Switch checked={newApplications} onCheckedChange={setNewApplications} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">New Messages</Label><p className="text-sm text-muted-foreground">When you receive a new message</p></div><Switch checked={newMessages} onCheckedChange={setNewMessages} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">Team Updates</Label><p className="text-sm text-muted-foreground">When team members join or leave</p></div><Switch checked={teamUpdates} onCheckedChange={setTeamUpdates} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">Payment Alerts</Label><p className="text-sm text-muted-foreground">Billing and payment notifications</p></div><Switch checked={paymentAlerts} onCheckedChange={setPaymentAlerts} /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="font-medium">Marketing & Updates</Label><p className="text-sm text-muted-foreground">News, features, and promotional content</p></div><Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle className="flex items-center gap-2"><Crown className="h-5 w-5 text-primary" />Premium Plan</CardTitle><CardDescription>Your current subscription plan</CardDescription></div>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 bg-background rounded-lg border"><p className="text-2xl font-bold">Unlimited</p><p className="text-sm text-muted-foreground">Job Postings</p></div>
                <div className="text-center p-4 bg-background rounded-lg border"><p className="text-2xl font-bold">250</p><p className="text-sm text-muted-foreground">Credits Remaining</p></div>
                <div className="text-center p-4 bg-background rounded-lg border"><p className="text-2xl font-bold">Unlimited</p><p className="text-sm text-muted-foreground">Team Broadcasts</p></div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div><p className="text-sm text-muted-foreground">Next billing date</p><p className="font-medium">April 15, 2026</p></div>
                <div className="flex gap-2"><Button variant="outline">Change Plan</Button><Button>Buy Credits</Button></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Payment Method</CardTitle><CardDescription>Manage your payment methods</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div><p className="font-medium">Visa ending in 4242</p><p className="text-sm text-muted-foreground">Expires 12/2027</p></div>
                </div>
                <div className="flex items-center gap-2"><Badge variant="outline">Default</Badge><Button variant="ghost" size="sm">Edit</Button></div>
              </div>
              <Button variant="outline" className="w-full"><CreditCard className="h-4 w-4 mr-2" />Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Billing History</CardTitle><CardDescription>View and download your invoices</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Mar 15, 2026', amount: '$99.00', status: 'Paid', invoice: 'INV-2026-003' },
                  { date: 'Feb 15, 2026', amount: '$99.00', status: 'Paid', invoice: 'INV-2026-002' },
                  { date: 'Jan 15, 2026', amount: '$99.00', status: 'Paid', invoice: 'INV-2026-001' },
                ].map((item) => (
                  <div key={item.invoice} className="flex items-center justify-between p-3 border rounded-lg">
                    <div><p className="font-medium">{item.date}</p><p className="text-sm text-muted-foreground">{item.invoice}</p></div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">{item.amount}</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">{item.status}</Badge>
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5" />Two-Factor Authentication</CardTitle><CardDescription>Add an extra layer of security to your account</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label className="font-medium">Enable 2FA</Label><p className="text-sm text-muted-foreground">{twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Protect your account with 2FA'}</p></div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>
              {twoFactorEnabled && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Two-factor authentication is active. You will need to enter a code from your authenticator app when signing in.</p>
                  <Button variant="outline" size="sm" className="mt-3"><Key className="h-4 w-4 mr-2" />View Recovery Codes</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Active Sessions</CardTitle><CardDescription>Manage your active sessions across devices</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {[
                { device: 'Chrome on Windows', location: 'New York, USA', current: true, lastActive: 'Now' },
                { device: 'Safari on iPhone', location: 'New York, USA', current: false, lastActive: '2 hours ago' },
                { device: 'Firefox on MacOS', location: 'Brooklyn, USA', current: false, lastActive: '3 days ago' },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"><Globe className="h-5 w-5 text-muted-foreground" /></div>
                    <div>
                      <div className="flex items-center gap-2"><p className="font-medium">{session.device}</p>{session.current && <Badge variant="outline" className="text-xs">Current</Badge>}</div>
                      <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>}
                </div>
              ))}
              <Button variant="outline" className="w-full text-destructive hover:text-destructive"><LogOut className="h-4 w-4 mr-2" />Sign Out All Other Sessions</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" />Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                <div><p className="font-medium">Delete Account</p><p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p></div>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" />Delete Account</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers, including:
                        <ul className="list-disc list-inside mt-2 space-y-1"><li>All job postings and applications</li><li>Team members and communications</li><li>Billing history and credits</li><li>All messages and favorites</li></ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete Account</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
