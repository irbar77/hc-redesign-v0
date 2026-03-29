'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown, X, Search, Plus } from 'lucide-react'
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
  searchPlaceholder = 'Найдите или добавьте свой...',
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const [customOptions, setCustomOptions] = useState<Option[]>([])

  const allOptions = [...options, ...customOptions]

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedLabels = selected
    .map((value) => allOptions.find((opt) => opt.value === value)?.label)
    .filter(Boolean)

  const canCreate = searchQuery.length > 0 && !allOptions.some(opt => opt.label.toLowerCase() === searchQuery.toLowerCase())

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const handleCreate = () => {
    const newValue = searchQuery.toLowerCase().replace(/\s+/g, '-')
    const newOption = { value: newValue, label: searchQuery }
    setCustomOptions(prev => [...prev, newOption])
    if (!selected.includes(newValue)) {
      onChange([...selected, newValue])
    }
    setSearchQuery('')
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
            className="w-full justify-between font-normal h-auto min-h-9 py-2 group"
          >
            <span className="text-muted-foreground truncate group-hover:text-accent-foreground">
              {selected.length > 0
                ? `${selected.length} selected`
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:text-accent-foreground group-hover:opacity-100" />
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
                  <div
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors group hover:bg-primary hover:text-primary-foreground',
                      isSelected ? 'bg-secondary text-secondary-foreground' : 'text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute left-2 flex h-4 w-4 items-center justify-center',
                        isSelected ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <Check className={cn(
                        "h-4 w-4", 
                        isSelected ? "text-primary group-hover:text-primary-foreground" : "text-transparent group-hover:text-primary-foreground"
                      )} />
                    </span>
                    <span className="truncate group-hover:text-primary-foreground">
                      {option.label}
                    </span>
                  </div>
                )
              })
            )}
            {canCreate && (
              <div
                onClick={handleCreate}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-primary hover:text-primary-foreground transition-colors mt-1 border-t border-border pt-2 group"
              >
                <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                </span>
                <span className="text-muted-foreground group-hover:text-primary-foreground">Add &quot;</span>
                <span className="font-medium group-hover:text-primary-foreground">{searchQuery}</span>
                <span className="text-muted-foreground group-hover:text-primary-foreground">&quot;</span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((value) => {
            const option = allOptions.find((opt) => opt.value === value)
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
