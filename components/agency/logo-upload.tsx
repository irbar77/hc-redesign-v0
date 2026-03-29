'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoUploadProps {
  currentLogo: string | null
  onLogoChange: (logo: string | null) => void
}

export function LogoUpload({ currentLogo, onLogoChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onLogoChange(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar 
        className="h-20 w-20 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => inputRef.current?.click()}
      >
        {currentLogo ? (
          <AvatarImage src={currentLogo} alt="Agency logo" className="object-cover" />
        ) : (
          <AvatarFallback className="rounded-lg bg-muted">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Logo
        </Button>
        {currentLogo && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onLogoChange(null)}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        )}
        <p className="text-xs text-muted-foreground">
          JPG, PNG or SVG. Max 2MB.
        </p>
      </div>
    </div>
  )
}
