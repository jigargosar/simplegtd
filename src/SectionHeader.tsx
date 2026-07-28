import { useState } from 'react'
import { ChevronRight, Trash2 } from 'lucide-react'
import type { Section } from './types'
import { toggleSectionCollapsed, renameSection, deleteSection } from './store'
import { offerUndo } from './Undo'

const labelClass = 'font-mono text-[1.25rem] leading-7 font-semibold tracking-[0.02em] uppercase'

export function SectionHeader({ section }: { section: Section }) {
    const [editing, setEditing] = useState(false)

    if (editing) {
        return (
            <input
                autoFocus
                defaultValue={section.title}
                onBlur={(e) => {
                    renameSection(section.id, e.target.value)
                    setEditing(false)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                    if (e.key === 'Escape') setEditing(false)
                }}
                className={`${labelClass} w-full min-w-0 bg-transparent text-ink outline-none sm:text-right`}
            />
        )
    }

    return (
        <div className="group/head flex items-center gap-1">
            <button
                onClick={() => toggleSectionCollapsed(section.id)}
                onDoubleClick={() => setEditing(true)}
                aria-expanded={!section.collapsed}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <ChevronRight
                    className={`size-4 text-muted transition-transform duration-200 sm:order-2 ${section.collapsed ? '' : 'rotate-90'}`}
                    strokeWidth={3}
                />
                <h2 className={`${labelClass} text-ink`}>{section.title}</h2>
            </button>
            <button
                onClick={() => {
                    const undo = deleteSection(section.id)
                    if (undo !== undefined) offerUndo(`List "${section.title}" deleted`, undo)
                }}
                aria-label={`Delete list "${section.title}"`}
                className="order-first shrink-0 rounded-md p-2 text-muted opacity-0 transition-[opacity,color] duration-300 group-hover/head:opacity-100 hover:text-ink focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <Trash2 className="size-4" strokeWidth={2} />
            </button>
        </div>
    )
}
