'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface MultiSelectComboboxProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
  searchPlaceholder = 'Search...',
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedLabels = selected
    .map((value) => options.find((opt) => opt.value === value)?.label)
    .filter(Boolean)

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selected.filter((v) => v !== value))
  }

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal h-auto min-h-9 py-2"
          >
            <span className="text-muted-foreground truncate">
              {selected.length > 0
                ? `${selected.length} selected`
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </p>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                      isSelected && 'bg-accent/50'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute left-2 flex h-4 w-4 items-center justify-center',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </span>
                    {option.label}
                  </button>
                )
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            if (!option) return null
            return (
              <Badge
                key={value}
                variant="secondary"
                className="gap-1 pr-1 font-normal"
              >
                {option.label}
                <button
                  onClick={(e) => removeOption(value, e)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {option.label}</span>
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
