import type { Section } from './types'
import { useSectionTasks, useSectionIsEmpty } from './tasks'
import { useQuery, useFilter } from './store'
import { SectionHeader } from './SectionHeader'
import { TaskRow } from './TaskRow'

// Four distinct empty states: nothing here yet, nothing matches the search,
// nothing matches the filter, and the list is simply collapsed.
function EmptyState({ sectionId }: { sectionId: string }) {
    const isEmpty = useSectionIsEmpty(sectionId)
    const query = useQuery().trim()
    const filter = useFilter()

    const message = isEmpty
        ? 'Nothing filed here. Capture above, then move it down.'
        : query !== ''
          ? `Nothing in this list matches "${query}".`
          : filter === 'done'
            ? 'Nothing here is done yet.'
            : 'Everything in this list is done.'

    return <p className="px-3 py-2.5 text-base leading-7 text-muted">{message}</p>
}

export function SectionView({ section }: { section: Section }) {
    const tasks = useSectionTasks(section.id)

    return (
        <section className="grid grid-cols-1 sm:grid-cols-[10rem_1fr]">
            <div className="flex items-start justify-start pb-1 sm:justify-end sm:pt-1 sm:pr-6">
                <SectionHeader section={section} />
            </div>

            <div className="border-l-2 border-rule pb-12 pl-4">
                {section.collapsed ? null : tasks.length === 0 ? (
                    <EmptyState sectionId={section.id} />
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
