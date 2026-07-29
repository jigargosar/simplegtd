import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import type { Task } from './types'
import { toggleTask, deleteTask, reorderTask } from './tasks'
import { TaskTitleInput, TaskTitleText } from './TaskTitle'
import { offerUndo } from './Undo'
import { MoveTask } from './MoveTask'
import { Reorder } from './Reorder'
import { focusRow, preserveFocus } from './keys'

export function TaskRow({ task }: { task: Task }) {
    const [editing, setEditing] = useState(false)

    function remove(row: HTMLElement) {
        const undo = deleteTask(task.id)
        if (undo === undefined) return
        offerUndo('Task deleted', undo)
        preserveFocus(row)
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
        if (editing || e.target !== e.currentTarget) return
        const row = e.currentTarget
        const handled = () => {
            e.preventDefault()
            e.stopPropagation()
        }
        if (e.key === 'Enter' || e.key === 'F2') {
            setEditing(true)
            handled()
        } else if (e.key === ' ') {
            toggleTask(task.id)
            preserveFocus(row)
            handled()
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            remove(row)
            handled()
        } else if (e.key === 'm') {
            row.querySelector<HTMLSelectElement>('[data-move]')?.focus()
            handled()
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const direction = e.key === 'ArrowUp' ? -1 : 1
            if (e.altKey) reorderTask(task.id, direction)
            else focusRow(row, direction)
            handled()
        }
    }

    return (
        <li
            data-row
            tabIndex={editing ? -1 : 0}
            onKeyDown={onKeyDown}
            aria-label={task.title}
            className="group/row flex items-start gap-1 rounded-md pr-1 transition-colors hover:bg-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
            <button
                onClick={() => toggleTask(task.id)}
                aria-label={task.done ? 'Mark not done' : 'Mark done'}
                aria-pressed={task.done}
                tabIndex={-1}
                className="group/box grid shrink-0 place-items-center rounded-md p-3 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <span
                    className={`grid size-[1.125rem] place-items-center rounded-[6px] border-2 transition-colors ${
                        task.done
                            ? 'border-accent bg-accent text-on-accent'
                            : 'border-rule group-hover/box:border-accent'
                    }`}
                >
                    <Check
                        className={`size-3 transition-opacity ${task.done ? 'opacity-100' : 'opacity-0'}`}
                        strokeWidth={3.5}
                    />
                </span>
            </button>

            <div
                onDoubleClick={() => setEditing(true)}
                className="flex min-w-0 flex-1 items-start py-2.5"
            >
                {editing ? (
                    <TaskTitleInput
                        id={task.id}
                        initial={task.title}
                        onClose={() => setEditing(false)}
                    />
                ) : (
                    <TaskTitleText title={task.title} done={task.done} />
                )}
            </div>

            <Reorder taskId={task.id} />
            <MoveTask taskId={task.id} sectionId={task.sectionId} />

            <button
                onClick={(e) => remove(e.currentTarget.closest('[data-row]') as HTMLElement)}
                aria-label={`Delete "${task.title}"`}
                tabIndex={-1}
                className="shrink-0 rounded-md p-3 text-muted opacity-0 transition-[opacity,color] duration-300 group-hover/row:opacity-100 hover:text-ink focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <Trash2 className="size-4" strokeWidth={2} />
            </button>
        </li>
    )
}
