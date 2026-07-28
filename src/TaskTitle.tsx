import { useState } from 'react'
import { renameTask } from './store'

const textClass = 'wrap-anywhere text-base leading-7 transition-colors'

export function TaskTitleInput({
    id,
    initial,
    onClose,
}: {
    id: string
    initial: string
    onClose: () => void
}) {
    const [value, setValue] = useState(initial)

    // Empty (trimmed) always reverts, whether closed by Enter, Escape, or blur.
    function commit() {
        renameTask(id, value)
        onClose()
    }

    return (
        <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') onClose()
            }}
            className={`${textClass} min-w-0 flex-1 rounded-sm bg-transparent text-ink outline-none`}
        />
    )
}

export function TaskTitleText({ title, done }: { title: string; done: boolean }) {
    return (
        <span className={`${textClass} ${done ? 'text-muted line-through decoration-rule' : 'text-ink'}`}>
            {title}
        </span>
    )
}
