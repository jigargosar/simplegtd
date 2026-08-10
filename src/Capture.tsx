import { useEffect, useRef, useState } from 'react'
import type { SectionId } from './types'
import { useSections, useCaptureTarget, addSection } from './sections'
import { addTask } from './tasks'
import { meta, ring } from './ui'

// Capture is a modal so a thought can be filed from anywhere on the page without
// first scrolling to the list it belongs in.
export function Capture({ open, onClose }: { open: boolean; onClose: () => void }) {
    const box = useRef<HTMLDialogElement>(null)
    const field = useRef<HTMLInputElement>(null)
    const sections = useSections()
    const target = useCaptureTarget()
    const [value, setValue] = useState('')
    const [to, setTo] = useState<SectionId | undefined>(target)

    useEffect(() => {
        if (!open) {
            box.current?.close()
            return
        }
        setTo(target)
        setValue('')
        box.current?.showModal()
        field.current?.focus()
    }, [open])

    function submit(e: React.FormEvent) {
        e.preventDefault()
        if (value.trim() === '') return
        // With no lists at all, a captured thought still has to land somewhere.
        const sectionId = to ?? addSection('Inbox')
        if (sectionId === undefined) return
        addTask(sectionId, value)
        onClose()
    }

    const name = sections.find((s) => s.id === to)?.title ?? 'Inbox'

    return (
        <dialog
            ref={box}
            onClose={onClose}
            onClick={(e) => e.target === box.current && onClose()}
            className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl bg-paper p-0 text-ink shadow-2xl"
        >
            <form onSubmit={submit} className="flex flex-col gap-4 p-6">
                <p className={`${meta} text-ink2`}>Capture</p>
                <input
                    ref={field}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="What do you mean to do?"
                    aria-label="New task"
                    className={`w-full rounded-none border-b-2 border-rule bg-transparent px-1 pb-2 font-display text-[21px] text-ink placeholder:text-soft ${ring}`}
                />
                <div className="flex flex-wrap gap-1.5">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setTo(s.id)}
                            className={`h-9 rounded-full px-3.5 text-[13px] ${ring} ${
                                to === s.id
                                    ? 'bg-pine font-medium text-paper'
                                    : 'border border-rule text-ink2 hover:bg-fill'
                            }`}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="font-mono text-[11px] text-ink2">Esc to close</p>
                    <button
                        className={`h-10 rounded-lg bg-pine px-4 text-[14px] font-medium text-paper hover:bg-ink ${ring}`}
                    >
                        Add to {name}
                    </button>
                </div>
            </form>
        </dialog>
    )
}
