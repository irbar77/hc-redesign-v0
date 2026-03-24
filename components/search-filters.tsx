'use client'

import { ArrowUpDown, Grid3X3, List, Map, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export type ViewMode = 'grid' | 'list' | 'map'
export type SortOption = 'rating' | 'reviews' | 'name' | 'distance'

interface SearchFiltersProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  filters: {
    verified: boolean
    hiring: boolean
    premium: boolean
  }
  onFiltersChange: (filters: { verified: boolean; hiring: boolean; premium: boolean }) => void
  resultCount: number
  resultType: string
}

export function SearchFilters({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  filters,
  onFiltersChange,
  resultCount,
  resultType,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-border">
      {/* Left side - Results count and filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span> {resultType} found
        </span>
        
        {/* Filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(filters.verified || filters.hiring || filters.premium) && (
                <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {[filters.verified, filters.hiring, filters.premium].filter(Boolean).length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.verified}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, verified: checked })
              }
            >
              Verified only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.hiring}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, hiring: checked })
              }
            >
              Hiring now
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.premium}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, premium: checked })
              }
            >
              Premium agencies
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side - Sort and View toggle */}
      <div className="flex items-center gap-3">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="reviews">Most reviews</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View mode toggle */}
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
          className="border rounded-lg p-1"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view" className="h-8 w-8 p-0">
            <Grid3X3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Map view" className="h-8 w-8 p-0">
            <Map className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
