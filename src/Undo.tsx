import { useEffect, useState } from 'react'
import { Undo2 } from 'lucide-react'

type Pending = { label: string; undo: () => void }

let show: ((p: Pending) => void) | undefined

export function offerUndo(label: string, undo: () => void) {
    show?.({ label, undo })
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
        const t = setTimeout(() => setPending(undefined), 8000)
        return () => clearTimeout(t)
    }, [pending])

    if (pending === undefined) return null

    return (
        <div
            role="status"
            className="fixed inset-x-0 bottom-6 flex justify-center px-5"
        >
            <div className="flex items-center gap-4 rounded-lg border-2 border-rule bg-raised px-4 py-3 shadow-lg">
                <span className="text-base leading-6 text-ink">{pending.label}</span>
                <button
                    onClick={() => {
                        pending.undo()
                        setPending(undefined)
                    }}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-sm tracking-[0.08em] text-accent uppercase transition-colors hover:bg-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                    <Undo2 className="size-4" strokeWidth={2.5} />
                    Undo
                </button>
            </div>
        </div>
    )
}
