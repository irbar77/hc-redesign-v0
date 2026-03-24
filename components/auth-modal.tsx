'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Search, Briefcase, Building2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthMode = 'login' | 'signup' | 'forgot-password'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: AuthMode
}

export function AuthModal({
  open,
  onOpenChange,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden">
        {/* Header with brand */}
        <div className="bg-primary/5 dark:bg-primary/10 px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              HC
            </div>
            <span className="text-xl font-semibold text-foreground">
              hczip<span className="text-primary">.com</span>
            </span>
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create an account'}
              {mode === 'forgot-password' && 'Reset your password'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'login' &&
                'Enter your credentials to access your account'}
              {mode === 'signup' &&
                'Fill in your details to get started'}
              {mode === 'forgot-password' &&
                "Enter your email and we'll send you a reset link"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form content */}
        <div className="p-6">
          {mode === 'login' && (
            <LoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onForgotPassword={() => handleModeChange('forgot-password')}
            />
          )}

          {mode === 'signup' && <SignupForm />}

          {mode === 'forgot-password' && <ForgotPasswordForm />}
        </div>

        {/* Footer with mode switch */}
        <div className="px-6 pb-6 pt-2">
          <p className="text-sm text-center text-muted-foreground">
            {mode === 'login' && (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('signup')}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </button>
              </>
            )}
            {mode === 'forgot-password' && (
              <>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className="text-primary font-medium hover:underline"
                >
                  Back to login
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LoginForm({
  showPassword,
  setShowPassword,
  onForgotPassword,
}: {
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  onForgotPassword: () => void
}) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Log in
        <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}

type UserType = 'looking' | 'offering' | null
type EmployerType = 'agency' | 'individual' | null

function SignupForm() {
  const [userType, setUserType] = useState<UserType>(null)
  const [employerType, setEmployerType] = useState<EmployerType>(null)

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>I am</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setUserType('looking')
              setEmployerType(null)
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              userType === 'looking'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-muted-foreground/50'
            }`}
          >
            <Search className="size-5" />
            <span className="text-sm font-medium">Looking for work</span>
          </button>
          <button
            type="button"
            onClick={() => setUserType('offering')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              userType === 'offering'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-muted-foreground/50'
            }`}
          >
            <Briefcase className="size-5" />
            <span className="text-sm font-medium">Offering work</span>
          </button>
        </div>
      </div>

      {userType === 'offering' && (
        <div className="space-y-2">
          <Label>I represent</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEmployerType('agency')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                employerType === 'agency'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <Building2 className="size-5" />
              <span className="text-sm font-medium">Agency</span>
            </button>
            <button
              type="button"
              onClick={() => setEmployerType('individual')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                employerType === 'individual'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <User className="size-5" />
              <span className="text-sm font-medium">Individual</span>
            </button>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={!userType || (userType === 'offering' && !employerType)}
      >
        Create account
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  )
}

function ForgotPasswordForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="reset-email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          We&apos;ll send you a link to reset your password
        </p>
      </div>

      <Button type="submit" className="w-full">
        Send reset link
        <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}
