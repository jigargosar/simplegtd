import { ChevronUp, ChevronDown } from 'lucide-react'
import { reorderTask } from './store'

const button =
    'grid place-items-center rounded-md p-2 text-muted transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none'

export function Reorder({ taskId }: { taskId: string }) {
    return (
        <div className="flex shrink-0 flex-col opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 focus-within:opacity-100">
            <button onClick={() => reorderTask(taskId, -1)} aria-label="Move up" className={button}>
                <ChevronUp className="size-4" strokeWidth={2.5} />
            </button>
            <button onClick={() => reorderTask(taskId, 1)} aria-label="Move down" className={button}>
                <ChevronDown className="size-4" strokeWidth={2.5} />
            </button>
        </div>
    )
}
