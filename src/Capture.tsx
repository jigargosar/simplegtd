import { useState } from 'react'
import { CornerDownLeft } from 'lucide-react'
import { addTask } from './tasks'
import { firstSectionId } from './sections'

export function Capture() {
    const [value, setValue] = useState('')

    function submit(e: React.FormEvent) {
        e.preventDefault()
        const sectionId = firstSectionId()
        if (sectionId === undefined) return
        addTask(sectionId, value)
        setValue('')
    }

    return (
        <form onSubmit={submit} className="flex items-center gap-3 pb-12">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What's on your mind?"
                aria-label="Capture a task into Inbox"
                className="min-w-0 flex-1 border-b-2 border-rule bg-transparent px-1 pt-2 pb-3 text-lg text-ink transition-colors placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
                type="submit"
                disabled={value.trim() === ''}
                aria-label="Add to Inbox"
                className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 font-mono text-xs tracking-[0.1em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none enabled:text-accent enabled:hover:bg-raised disabled:text-muted disabled:opacity-60"
            >
                <CornerDownLeft className="size-3.5" strokeWidth={2.5} />
                File
            </button>
        </form>
    )
}
