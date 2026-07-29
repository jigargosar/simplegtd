import { useEffect, useState } from 'react'
import { Undo2 } from 'lucide-react'

type Pending = { label: string; undo: () => void }

let show: ((p: Pending | undefined) => void) | undefined
let armed: Pending | undefined

export function offerUndo(label: string, undo: () => void) {
    armed = { label, undo }
    show?.(armed)
}

// Ctrl+Z reaches the same undo the bar offers, without tabbing down to the bar.
export function undoLast() {
    if (armed === undefined) return false
    armed.undo()
    armed = undefined
    show?.(undefined)
    return true
}

export function UndoBar() {
    const [pending, setPending] = useState<Pending | undefined>(undefined)

    useEffect(() => {
        show = setPending
        return () => {
            show = undefined
        }
    }, [])

    useEffect(() => {
        if (pending === undefined) return
        const t = setTimeout(() => {
            armed = undefined
            setPending(undefined)
        }, 8000)
        return () => clearTimeout(t)
    }, [pending])

    if (pending === undefined) return null

    return (
        <div role="status" className="fixed inset-x-0 bottom-6 flex justify-center px-5">
            <div className="flex items-center gap-4 rounded-lg border-2 border-rule bg-raised px-4 py-3 shadow-lg">
                <span className="text-base leading-6 text-ink">{pending.label}</span>
                <button
                    onClick={undoLast}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-sm tracking-[0.08em] text-accent uppercase transition-colors hover:bg-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                    <Undo2 className="size-4" strokeWidth={2.5} />
                    Undo
                </button>
            </div>
        </div>
    )
}
