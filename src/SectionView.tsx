
import type { Section } from './types'
import { useSectionTasks } from './store'
import { SectionHeader } from './SectionHeader'
import { TaskRow } from './TaskRow'

export function SectionView({ section }: { section: Section }) {
    const tasks = useSectionTasks(section.id)
    const remaining = tasks.filter((t) => !t.done).length

    return (
        <section className="grid grid-cols-1 sm:grid-cols-[10rem_1fr]">
            <div className="flex items-start justify-start pb-1 sm:justify-end sm:pt-1 sm:pr-6">
                <SectionHeader section={section} />
            </div>

            <div className="border-l-2 border-rule pb-12 pl-4">
                {section.collapsed ? (
                    <p className="px-3 py-2.5 font-mono text-[0.875rem] tracking-[0.04em] text-muted uppercase">
                        {remaining} open
                    </p>
                ) : tasks.length === 0 ? (
                    <p className="px-3 py-2.5 text-base leading-7 text-muted">
                        Nothing filed here. Capture above, then move it down.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-1">
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
