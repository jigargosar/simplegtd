import { useState } from 'react'
import { Plus } from 'lucide-react'
import { addSection } from './sections'

export function AddSection() {
    const [value, setValue] = useState<string | undefined>(undefined)

    if (value === undefined) {
        return (
            <button
                onClick={() => setValue('')}
                className="flex items-center gap-2 rounded-md border-2 border-rule px-3 py-2 font-mono text-sm tracking-[0.08em] text-muted uppercase transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <Plus className="size-4" strokeWidth={2.5} />
                Add a list
            </button>
        )
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                addSection(value)
                setValue(undefined)
            }}
        >
            <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                    addSection(value)
                    setValue(undefined)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') setValue(undefined)
                }}
                placeholder="Name the list"
                aria-label="Name the new list"
                className="w-full max-w-xs rounded-md border-2 border-accent bg-transparent px-3 py-2 font-mono text-sm tracking-[0.08em] text-ink uppercase placeholder:normal-case placeholder:text-muted focus:outline-none"
            />
        </form>
    )
}
