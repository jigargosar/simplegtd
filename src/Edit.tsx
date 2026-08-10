import { useEffect, useRef } from 'react'
import { ring } from './ui'

// Renaming a task and renaming a list are the same interaction at two type sizes.
// Blank always cancels, whether you leave by Enter, Escape, or clicking away.
export function Edit({
    value,
    onDone,
    onCancel,
    className,
}: {
    value: string
    onDone: (next: string) => void
    onCancel: () => void
    className: string
}) {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()
        ref.current?.select()
    }, [])

    function done() {
        const next = ref.current?.value.trim() ?? ''
        if (next === '') onCancel()
        else onDone(next)
    }

    return (
        <input
            ref={ref}
            defaultValue={value}
            onBlur={done}
            onKeyDown={(e) => {
                if (e.key === 'Enter') done()
                if (e.key === 'Escape') onCancel()
            }}
            className={`${className} ${ring}`}
        />
    )
}
