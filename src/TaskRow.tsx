import { Check } from 'lucide-react'
import type { Task } from './types'
import { toggleTask } from './store'

export function TaskRow({ task }: { task: Task }) {
    return (
        <li>
            <button
                onClick={() => toggleTask(task.id)}
                aria-pressed={task.done}
                className="group flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-raised focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
                <span
                    className={`mt-1 grid size-[1.125rem] shrink-0 place-items-center rounded-[6px] border-2 transition-colors ${
                        task.done
                            ? 'border-accent bg-accent text-on-accent'
                            : 'border-rule group-hover:border-accent'
                    }`}
                >
                    <Check
                        className={`size-3 transition-opacity ${task.done ? 'opacity-100' : 'opacity-0'}`}
                        strokeWidth={3.5}
                    />
                </span>
                <span
                    className={`wrap-anywhere text-base leading-7 transition-colors ${
                        task.done ? 'text-muted line-through decoration-rule' : 'text-ink'
                    }`}
                >
                    {task.title}
                </span>
            </button>
        </li>
    )
}
