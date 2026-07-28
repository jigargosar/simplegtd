import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import type { Task } from './types'
import { toggleTask, deleteTask } from './store'
import { TaskTitleInput, TaskTitleText } from './TaskTitle'
import { offerUndo } from './Undo'
import { MoveTask } from './MoveTask'

export function TaskRow({ task }: { task: Task }) {
    const [editing, setEditing] = useState(false)

    return (
        <li className="group/row flex items-start gap-1 rounded-md pr-1 transition-colors hover:bg-raised">
            <button
                onClick={() => toggleTask(task.id)}
                aria-label={task.done ? 'Mark not done' : 'Mark done'}
                aria-pressed={task.done}
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

            <MoveTask taskId={task.id} sectionId={task.sectionId} />

            <button
                onClick={() => {
                    const undo = deleteTask(task.id)
                    if (undo !== undefined) offerUndo('Task deleted', undo)
                }}
                aria-label={`Delete "${task.title}"`}
                className="shrink-0 rounded-md p-3 text-muted opacity-0 transition-[opacity,color] duration-300 group-hover/row:opacity-100 hover:text-ink focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <Trash2 className="size-4" strokeWidth={2} />
            </button>
        </li>
    )
}
