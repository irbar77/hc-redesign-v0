'use client'

import { useEffect, useState } from 'react'
import { Palette, Contrast } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'emerald' | 'mono'>('emerald')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') as 'emerald' | 'mono'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-color-theme', savedTheme)
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'emerald' ? 'mono' : 'emerald'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-color-theme', newTheme)
    localStorage.setItem('color-theme', newTheme)
  }

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3"
      title={theme === 'emerald' ? 'Switch to Monochrome' : 'Switch to Emerald'}
    >
      {theme === 'emerald' ? (
        <>
          <Palette className="h-4 w-4 text-primary" />
          <span className="hidden lg:inline text-xs font-semibold">Emerald</span>
        </>
      ) : (
        <>
          <Contrast className="h-4 w-4" />
          <span className="hidden lg:inline text-xs font-semibold">Mono</span>
        </>
      )}
    </Button>
  )
}
