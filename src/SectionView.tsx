import { useState } from 'react'
import type { Section } from './types'
import { useSectionTasks, addTask, placeTask } from './tasks'
import { placeSection } from './sections'
import { SectionHeader } from './SectionHeader'
import { TaskRow } from './TaskRow'
import { Ghost } from './Ghost'
import { beginDrag, dragKind, endDrag, gapBefore, getDnd, hoverGap, useDnd } from './Dnd'

const LINE = 'pointer-events-none mx-1 h-0.5 rounded-full bg-pine'

export function SectionView({
    section,
    nextId,
    sifting,
}: {
    section: Section
    nextId: string | null
    sifting: boolean
}) {
    const tasks = useSectionTasks(section.id)
    const [grabbed, setGrabbed] = useState(false)
    const { drag, over } = useDnd()
    // A collapsed list opens itself while you are filtering, or its matches would hide.
    const open = !section.collapsed || sifting

    const draggingTask = drag?.kind === 'task'
    const draggingList = drag?.kind === 'section'
    const listLine = draggingList && over?.sectionId === null && over.beforeId === section.id
    const tailLine = draggingTask && over?.sectionId === section.id && over.beforeId === null

    function drop(e: React.DragEvent) {
        e.preventDefault()
        const { drag, over } = getDnd()
        if (drag !== null && over !== null) {
            if (drag.kind === 'task' && over.sectionId !== null) {
                placeTask(drag.id, over.sectionId, over.beforeId)
            } else if (drag.kind === 'section') {
                placeSection(drag.id, over.beforeId)
            }
        }
        setGrabbed(false)
        endDrag()
    }

    return (
        <section
            draggable={grabbed}
            onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('text/plain', section.id)
                beginDrag('section', section.id)
            }}
            onDragEnd={() => {
                setGrabbed(false)
                endDrag()
            }}
            onDragOver={(e) => {
                if (dragKind() !== 'section') return
                e.preventDefault()
                hoverGap(null, gapBefore(e, section.id, nextId))
            }}
            onDrop={drop}
            className={`px-5 pt-7 ${draggingList && drag.id === section.id ? 'opacity-40' : ''}`}
        >
            {listLine && <div className={`${LINE} mb-2`} />}

            <SectionHeader section={section} onGrab={setGrabbed} />

            <div
                className={`grid transition-[grid-template-rows] duration-200 ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden pb-1.5">
                    <ul
                        onDragOver={(e) => {
                            if (dragKind() !== 'task') return
                            e.preventDefault()
                            hoverGap(section.id, null)
                        }}
                        className={`flex flex-col gap-1.5 pt-2 ${draggingTask ? 'min-h-9' : ''}`}
                    >
                        {tasks.map((task, i) => (
                            <TaskRow key={task.id} task={task} nextId={tasks[i + 1]?.id ?? null} />
                        ))}
                        {tailLine && <li className={LINE} />}
                    </ul>
                    {!sifting && (
                        <Ghost label="Add a task" onAdd={(value) => addTask(section.id, value)} />
                    )}
                </div>
            </div>
        </section>
    )
}
