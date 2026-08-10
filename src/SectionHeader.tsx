import { useState } from 'react'
import { ChevronRight, GripVertical, X } from 'lucide-react'
import type { Section } from './types'
import { toggleSectionCollapsed, renameSection, deleteSection } from './sections'
import { useOpenCount } from './tasks'
import { Edit } from './Edit'
import { Confirm } from './Confirm'
import { meta, ring } from './ui'

export function SectionHeader({
    section,
    onGrab,
}: {
    section: Section
    onGrab: (grabbed: boolean) => void
}) {
    const [editing, setEditing] = useState(false)
    const [asking, setAsking] = useState(false)
    const open = useOpenCount(section.id)

    if (asking) {
        return (
            <Confirm
                text={section.title}
                onRemove={() => deleteSection(section.id)}
                onKeep={() => setAsking(false)}
            />
        )
    }

    return (
        <div className="group/h flex items-center gap-2 rounded-lg border-b border-rule px-1 pb-1.5 hover:bg-fill">
            <button
                onClick={() => toggleSectionCollapsed(section.id)}
                aria-expanded={!section.collapsed}
                aria-label={`${section.collapsed ? 'Expand' : 'Collapse'} ${section.title}`}
                className={`grid size-9 shrink-0 place-items-center rounded-lg ${ring}`}
            >
                <ChevronRight
                    className={`size-4 text-ink2 transition-transform ${
                        section.collapsed ? '' : 'rotate-90'
                    }`}
                />
            </button>

            {editing ? (
                <Edit
                    value={section.title}
                    onDone={(next) => {
                        renameSection(section.id, next)
                        setEditing(false)
                    }}
                    onCancel={() => setEditing(false)}
                    className="min-w-0 flex-1 rounded-lg bg-fill px-1.5 py-1 font-display text-[19px] font-medium text-ink"
                />
            ) : (
                <h2 className="min-w-0 flex-1">
                    <button
                        onClick={() => setEditing(true)}
                        aria-label={`Rename ${section.title}`}
                        className={`block max-w-full truncate rounded-lg px-1.5 py-1 text-left font-display text-[19px] font-medium ${ring}`}
                    >
                        {section.title}
                    </button>
                </h2>
            )}

            {/* The count and the controls share one fixed width, so hovering shifts nothing. */}
            <span className="relative flex h-9 w-18 shrink-0 items-center justify-end">
                <span
                    className={`${meta} tabular-nums text-ink2 group-hover/h:opacity-0`}
                >{`${open} open`}</span>
                <span className="absolute right-0 flex items-center opacity-0 group-hover/h:opacity-100 focus-within:opacity-100">
                    <span
                        onMouseDown={() => onGrab(true)}
                        onMouseUp={() => onGrab(false)}
                        className="grid size-9 cursor-grab place-items-center text-soft"
                        title="Drag to reorder"
                    >
                        <GripVertical className="size-4" />
                    </span>
                    <button
                        onClick={() => setAsking(true)}
                        aria-label={`Remove list ${section.title}`}
                        className={`grid size-9 place-items-center rounded-md text-soft hover:bg-paper hover:text-brick ${ring}`}
                    >
                        <X className="size-4" />
                    </button>
                </span>
            </span>
        </div>
    )
}
