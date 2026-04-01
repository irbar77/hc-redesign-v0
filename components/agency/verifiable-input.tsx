'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifiableInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  isVerified: boolean
  onVerify: () => void
  placeholder?: string
  disabled?: boolean
}

export function VerifiableInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  isVerified,
  onVerify,
  placeholder,
  disabled,
}: VerifiableInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'pr-10 bg-card disabled:opacity-70 disabled:cursor-not-allowed',
              isVerified
                ? 'border-green-500/50 focus-visible:border-green-500 focus-visible:ring-green-500/20'
                : 'border-amber-500/50 focus-visible:border-amber-500 focus-visible:ring-amber-500/20'
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isVerified ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
          </div>
        </div>
        <Button
          type="button"
          variant={isVerified ? 'secondary' : 'outline'}
          size="default"
          onClick={onVerify}
          disabled={disabled || isVerified}
          className={cn(
            'shrink-0',
            !isVerified && 'bg-card',
            isVerified && 'text-green-600 bg-green-500/10 border-green-500/20'
          )}
        >
          {isVerified ? 'Verified' : 'Verify'}
        </Button>
      </div>
      {!isVerified && (
        <p className="text-xs text-amber-600">
          Please verify your {label.toLowerCase()} to increase trust
        </p>
      )}
    </div>
  )
}
