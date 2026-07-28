import { Search } from 'lucide-react'
import type { Filter } from './types'
import { useFilter, setFilter, useQuery, setQuery } from './store'

const options: Filter[] = ['all', 'active', 'done']

export function Filters() {
    const active = useFilter()
    const query = useQuery()

    return (
        <div className="flex flex-wrap items-center gap-2 pb-10">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-md border-2 border-rule px-3 py-2 focus-within:border-accent">
                <Search className="size-4 shrink-0 text-muted" strokeWidth={2.5} />
                <span className="sr-only">Search tasks</span>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
                />
            </label>
            {options.map((option) => {
                const selected = option === active
                return (
                    <button
                        key={option}
                        onClick={() => setFilter(option)}
                        aria-pressed={selected}
                        className={`rounded-md border-2 px-3 py-2 font-mono text-sm tracking-[0.08em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                            selected
                                ? 'border-accent bg-accent text-on-accent'
                                : 'border-rule text-muted hover:text-ink'
                        }`}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
}
