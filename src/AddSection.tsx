import { useState } from 'react'
import { Plus } from 'lucide-react'
import { addSection } from './sections'
import { useDraft } from './drafts'

export function AddSection() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useDraft('newList')

    function commit() {
        addSection(value)
        setValue('')
        setOpen(false)
    }

    // A name typed but never committed survives a reload; reopening restores it.
    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
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
                commit()
            }}
        >
            <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpen(false)
                }}
                placeholder="Name the list"
                aria-label="Name the new list"
                className="w-full max-w-xs rounded-md border-2 border-accent bg-transparent px-3 py-2 font-mono text-sm tracking-[0.08em] text-ink uppercase placeholder:normal-case placeholder:text-muted focus:outline-none"
            />
        </form>
    )
}
