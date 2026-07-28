import type { SectionId } from './types'
import { useSections, moveTask } from './store'

export function MoveTask({ taskId, sectionId }: { taskId: string; sectionId: SectionId }) {
    const sections = useSections()

    return (
        <label className="shrink-0 opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 focus-within:opacity-100">
            <span className="sr-only">Move to list</span>
            <select
                value={sectionId}
                onChange={(e) => moveTask(taskId, e.target.value)}
                className="cursor-pointer rounded-md border-2 border-transparent bg-transparent px-2 py-2 font-mono text-sm tracking-[0.04em] text-muted uppercase transition-colors hover:border-rule hover:text-ink focus-visible:border-rule focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                {sections.map((s) => (
                    <option key={s.id} value={s.id} className="bg-paper text-ink normal-case">
                        {s.title}
                    </option>
                ))}
            </select>
        </label>
    )
}
