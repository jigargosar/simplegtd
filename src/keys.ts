import { useEffect } from 'react'
import { undoLast } from './Undo'

const isTyping = (t: EventTarget | null) =>
    t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))

const focus = (selector: string) => {
    const el = document.querySelector<HTMLElement>(selector)
    el?.focus()
    return el !== null
}

// Deliberately unadvertised: nothing on the surface hints these exist. Casual
// use with a mouse looks identical; power users find them without being shown.
export function useGlobalKeys() {
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
                if (isTyping(e.target)) return
                if (undoLast()) e.preventDefault()
                return
            }
            if (isTyping(e.target)) {
                // Escape gets you out of any field and back to the document.
                if (e.key === 'Escape') (e.target as HTMLElement).blur()
                return
            }
            if (e.key === '/') {
                if (focus('[data-search]')) e.preventDefault()
            } else if (e.key === 'c') {
                if (focus('[data-capture]')) e.preventDefault()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])
}

// Rows are the unit of keyboard work, so focus moves between rows, not controls.
export function focusRow(from: HTMLElement, direction: -1 | 1) {
    const rows = [...document.querySelectorAll<HTMLElement>('[data-row]')]
    const i = rows.indexOf(from)
    const next = rows[i + direction]
    next?.focus()
    return next !== undefined
}

// A row can vanish under you two ways: deleted, or filtered out by marking it
// done while "active" is showing. Either way focus must not fall to the body.
export function preserveFocus(from: HTMLElement) {
    const i = [...document.querySelectorAll<HTMLElement>('[data-row]')].indexOf(from)
    requestAnimationFrame(() => {
        if (from.isConnected) return from.focus()
        const live = [...document.querySelectorAll<HTMLElement>('[data-row]')]
        if (live.length === 0) return document.querySelector<HTMLElement>('[data-search]')?.focus()
        live[Math.min(i, live.length - 1)].focus()
    })
}
