import { FolderInput } from 'lucide-react'
import type { SectionId } from './types'
import { useSections } from './sections'
import { moveTask } from './tasks'

// The native select is stretched invisibly over the icon: full keyboard and
// menu behaviour for free, at icon width instead of the widest list name.
export function MoveTask({ taskId, sectionId }: { taskId: string; sectionId: SectionId }) {
    const sections = useSections()

    return (
        <div className="relative shrink-0 opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 focus-within:opacity-100">
            <span className="grid place-items-center p-3 text-muted">
                <FolderInput className="size-4" strokeWidth={2} />
            </span>
            <select
                value={sectionId}
                onChange={(e) => moveTask(taskId, e.target.value)}
                aria-label="Move to list"
                data-move
                tabIndex={-1}
                className="absolute inset-0 cursor-pointer rounded-md opacity-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.title}
                    </option>
                ))}
            </select>
        </div>
    )
}
