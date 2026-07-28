import type { Filter } from './types'
import { useFilter, setFilter } from './store'

const options: Filter[] = ['all', 'active', 'done']

export function Filters() {
    const active = useFilter()

    return (
        <div role="group" aria-label="Show" className="flex items-center gap-2 pb-10">
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
