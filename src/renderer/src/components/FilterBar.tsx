import React, { useState, useRef, useEffect } from 'react'
import { Search, Filter, SortAsc, ChevronDown, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

type FilterType = 'all' | 'exact' | 'similar'
type SortBy = 'similarity' | 'size' | 'date'

const typeOptions: { value: FilterType; label: string }[] = [
  { value: 'all',     label: 'All Duplicates' },
  { value: 'exact',   label: 'Exact Match'    },
  { value: 'similar', label: 'Similar Only'   }
]

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'similarity', label: 'By Similarity' },
  { value: 'size',       label: 'By Space Saved' },
  { value: 'date',       label: 'By Date'        }
]

function DropdownMenu<T extends string>({
  icon: Icon,
  label,
  value,
  options,
  onChange
}: {
  icon: React.ElementType
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = options.find(o => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-sm text-white/60 hover:text-white/80 hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Icon className="w-3.5 h-3.5 text-white/40" />
        <span className="font-medium">{label}: <span className="text-cyan-400">{current?.label}</span></span>
        <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-44 card-glass rounded-xl shadow-elevated overflow-hidden z-20 animate-slide-down border border-white/[0.09]">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full px-4 py-2.5 text-sm text-left transition-colors flex items-center justify-between
                ${opt.value === value
                  ? 'text-cyan-400 bg-cyan-500/[0.07]'
                  : 'text-white/55 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
            >
              {opt.label}
              {opt.value === value && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const FilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, filterType, setFilterType, sortBy, setSortBy } = useAppStore()

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search filenames…"
          className="input-glass w-full py-2 pl-9 pr-8 text-sm"
          aria-label="Search duplicate files"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-white/[0.14] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-2.5 h-2.5 text-white/60" />
          </button>
        )}
      </div>

      {/* Type filter */}
      <DropdownMenu<FilterType>
        icon={Filter}
        label="Type"
        value={filterType}
        options={typeOptions}
        onChange={setFilterType}
      />

      {/* Sort dropdown */}
      <DropdownMenu<SortBy>
        icon={SortAsc}
        label="Sort"
        value={sortBy}
        options={sortOptions}
        onChange={setSortBy}
      />
    </div>
  )
}
