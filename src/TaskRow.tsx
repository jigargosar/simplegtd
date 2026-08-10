import { useState } from 'react'
import { Check, GripVertical, X } from 'lucide-react'
import type { Task } from './types'
import { toggleTask, renameTask, deleteTask } from './tasks'
import { Edit } from './Edit'
import { Confirm } from './Confirm'
import { beginDrag, dragKind, endDrag, gapBefore, hoverGap, useDnd } from './Dnd'
import { ring } from './ui'

export function TaskRow({ task, nextId }: { task: Task; nextId: string | null }) {
    const [editing, setEditing] = useState(false)
    const [asking, setAsking] = useState(false)
    // HTML5 drag has no handle of its own, so the row only becomes draggable
    // while the grip is held down.
    const [grabbed, setGrabbed] = useState(false)
    const { drag, over } = useDnd()

    const dragging = drag?.kind === 'task' && drag.id === task.id
    const line =
        drag?.kind === 'task' && over?.sectionId === task.sectionId && over.beforeId === task.id

    if (asking) {
        return (
            <li>
                <Confirm
                    text={task.title}
                    onRemove={() => deleteTask(task.id)}
                    onKeep={() => setAsking(false)}
                />
            </li>
        )
    }

    return (
        <li
            draggable={grabbed}
            onDragStart={(e) => {
                // The row sits inside the section, which is draggable too. Without
                // this the section's own handler would claim the drag on the way up.
                e.stopPropagation()
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('text/plain', task.id)
                beginDrag('task', task.id)
            }}
            onDragEnd={(e) => {
                e.stopPropagation()
                setGrabbed(false)
                endDrag()
            }}
            onDragOver={(e) => {
                if (dragKind() !== 'task') return
                e.preventDefault()
                e.stopPropagation()
                hoverGap(task.sectionId, gapBefore(e, task.id, nextId))
            }}
            className={`group relative flex items-center gap-1 rounded-lg px-1 hover:bg-fill ${
                dragging ? 'opacity-40' : ''
            }`}
        >
            {line && (
                <span className="pointer-events-none absolute inset-x-1 -top-1 h-0.5 rounded-full bg-pine" />
            )}
            <button
                onClick={() => toggleTask(task.id)}
                aria-pressed={task.done}
                aria-label={`Mark ${task.title} ${task.done ? 'not done' : 'done'}`}
                className={`grid size-9 shrink-0 place-items-center rounded-md ${ring}`}
            >
                <span
                    className={`grid size-5 place-items-center rounded-full border-2 ${
                        task.done ? 'border-pine bg-pine text-paper' : 'border-rule'
                    }`}
                >
                    {task.done && <Check className="size-3" strokeWidth={3.5} />}
                </span>
            </button>

            {editing ? (
                <Edit
                    value={task.title}
                    onDone={(next) => {
                        renameTask(task.id, next)
                        setEditing(false)
                    }}
                    onCancel={() => setEditing(false)}
                    className="min-w-0 flex-1 rounded-md bg-fill px-1 py-2 text-[15px] leading-6 text-ink"
                />
            ) : (
                <>
                    <button
                        onClick={() => setEditing(true)}
                        aria-label={`Rename ${task.title}`}
                        className={`min-w-0 flex-1 cursor-text rounded-md px-1 py-2 text-left ${ring}`}
                    >
                        <span className="relative inline-block max-w-full">
                            <span
                                className={`block truncate text-[15px] leading-6 ${
                                    task.done ? 'text-ink2' : 'text-ink'
                                }`}
                            >
                                {task.title}
                            </span>
                            {/* Drawn by hand rather than line-through: it sweeps across on tick. */}
                            <svg
                                className="strike pointer-events-none absolute inset-x-0 top-1/2 h-3 w-full -translate-y-1/2"
                                viewBox="0 0 100 6"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M.6 3.5C21 2.1 43 4.3 65 2.9S91 3.2 99.4 2.5"
                                    fill="none"
                                    className="stroke-ink2"
                                    strokeWidth=".7"
                                    strokeLinecap="round"
                                    strokeDasharray="102"
                                    style={{ strokeDashoffset: task.done ? 0 : 102 }}
                                />
                            </svg>
                        </span>
                    </button>

                    <span
                        onMouseDown={() => setGrabbed(true)}
                        onMouseUp={() => setGrabbed(false)}
                        className="grid size-9 shrink-0 cursor-grab place-items-center text-soft opacity-0 group-hover:opacity-100"
                        title="Drag to reorder"
                    >
                        <GripVertical className="size-4" />
                    </span>

                    <button
                        onClick={() => setAsking(true)}
                        aria-label={`Remove ${task.title}`}
                        className={`grid size-9 shrink-0 place-items-center rounded-md text-soft opacity-0 group-hover:opacity-100 hover:bg-paper hover:text-brick focus-visible:opacity-100 ${ring}`}
                    >
                        <X className="size-4" />
                    </button>
                </>
            )}
        </li>
    )
}
