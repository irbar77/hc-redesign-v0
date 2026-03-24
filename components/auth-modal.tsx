'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
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

          {mode === 'signup' && (
            <SignupForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          )}

          {mode === 'forgot-password' && <ForgotPasswordForm />}
        </div>

        {/* Footer with mode switch */}
        <div className="px-6 pb-6 pt-2">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {mode === 'forgot-password' ? 'or' : 'or continue with'}
              </span>
            </div>
          </div>

          {mode !== 'forgot-password' && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button variant="outline" type="button" className="w-full">
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          )}

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

function SignupForm({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (show: boolean) => void
}) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="signup-firstname">First name</Label>
          <Input id="signup-firstname" type="text" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-lastname">Last name</Label>
          <Input id="signup-lastname" type="text" placeholder="Doe" />
        </div>
      </div>

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
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
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
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
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
