import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ring } from './ui'

// One faint line that becomes a row once you type in it. Serves both "add a task"
// at the foot of a list and "new list" at the foot of the page.
export function Ghost({
    label,
    display,
    onAdd,
}: {
    label: string
    display?: boolean
    onAdd: (value: string) => void
}) {
    const [value, setValue] = useState('')

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (value.trim() === '') return
                onAdd(value.trim())
                setValue('')
            }}
            className="flex items-center gap-1 px-1 pt-1.5"
        >
            <span className="grid size-9 shrink-0 place-items-center text-soft">
                <Plus className="size-4" />
            </span>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={label}
                aria-label={label}
                className={`min-w-0 flex-1 bg-transparent leading-6 text-ink placeholder:text-soft hover:bg-fill focus:bg-fill ${
                    display
                        ? 'rounded-lg px-1.5 py-1 font-display text-[19px] font-medium'
                        : 'rounded-md px-1 py-2 text-[15px]'
                } ${ring}`}
            />
        </form>
    )
}
