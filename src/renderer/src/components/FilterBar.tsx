import React from 'react';
import { Search, Filter, SortAsc, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const FilterBar: React.FC = () => {
  const {
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    sortBy, setSortBy
  } = useAppStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 card-glass">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search filenames..."
          className="w-full bg-transparent border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-text-secondary"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="flex items-center gap-2 px-3 py-2 btn btn-ghost text-sm text-text-secondary cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Type: {filterType === 'all' ? 'All' : filterType === 'exact' ? 'Exact Match' : 'Similar'}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </div>
          <div className="absolute top-full right-0 mt-1 w-40 card-glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === 'all' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setFilterType('all')}>All Duplicates</div>
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === 'exact' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setFilterType('exact')}>Exact Match</div>
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === 'similar' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setFilterType('similar')}>Similar Only</div>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 px-3 py-2 btn btn-ghost text-sm text-text-secondary cursor-pointer">
            <SortAsc className="w-4 h-4" />
            <span>Sort: {sortBy === 'similarity' ? 'Similarity' : sortBy === 'size' ? 'Size' : 'Date'}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </div>
          <div className="absolute top-full right-0 mt-1 w-40 card-glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === 'similarity' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setSortBy('similarity')}>By Similarity</div>
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === 'size' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setSortBy('size')}>By Space Saved</div>
            <div className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === 'date' ? 'text-accent-cyan' : 'text-text-secondary'}`} onClick={() => setSortBy('date')}>By Date</div>
          </div>
        </div>
      </div>
    </div>
  );
};
