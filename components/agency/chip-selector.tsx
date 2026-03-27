'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChipSelectorProps {
  options: string[]
  selected: string[]
  onChange: (values: string[]) => void
  allowCustom?: boolean
  customPlaceholder?: string
}

export function ChipSelector({
  options,
  selected,
  onChange,
  allowCustom = false,
  customPlaceholder = 'Add custom...',
}: ChipSelectorProps) {
  const [customValue, setCustomValue] = useState('')
  const [showInput, setShowInput] = useState(false)

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const addCustomOption = () => {
    const trimmed = customValue.trim()
    if (trimmed && !selected.includes(trimmed) && !options.includes(trimmed)) {
      onChange([...selected, trimmed])
      setCustomValue('')
      setShowInput(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomOption()
    } else if (e.key === 'Escape') {
      setShowInput(false)
      setCustomValue('')
    }
  }

  // Custom values are those that are selected but not in default options
  const customValues = selected.filter((v) => !options.includes(v))

  return (
    <div className="space-y-3">
      {/* Preset options */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className={cn(
                'inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors',
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Custom values */}
      {customValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 rounded-full border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
            >
              {value}
              <button
                type="button"
                onClick={() => onChange(selected.filter((v) => v !== value))}
                className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {value}</span>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add custom input */}
      {allowCustom && (
        <div className="flex items-center gap-2">
          {showInput ? (
            <>
              <Input
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={customPlaceholder}
                className="h-8 w-auto max-w-xs"
                autoFocus
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={addCustomOption}
                disabled={!customValue.trim()}
              >
                Add
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowInput(false)
                  setCustomValue('')
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowInput(true)}
              className="gap-1.5 text-muted-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Custom
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
