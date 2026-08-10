import { useSyncExternalStore } from 'react'

// Reordering is drag and drop, and nothing else moves a task between lists, so
// this is the only mover in the app. Native HTML5 drag events, no dependency,
// which means desktop pointers only.

type Drag = { kind: 'task' | 'section'; id: string }

// For a task drag, `sectionId` is the list being dropped into and `beforeId` the
// task to land in front of. For a section drag, `sectionId` is null and
// `beforeId` is the list to land above. Null `beforeId` means the end.
type Over = { sectionId: string | null; beforeId: string | null }

type Dnd = { drag: Drag | null; over: Over | null }

let state: Dnd = { drag: null, over: null }
const listeners = new Set<() => void>()

function set(next: Dnd) {
    state = next
    listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

const read = () => state

export function useDnd() {
    return useSyncExternalStore(subscribe, read, read)
}

// Drop reads the latest gap directly, because a stale render would land the item
// in the wrong place.
export function getDnd() {
    return state
}

// Handlers read this before claiming a dragover, so a task drag and a list drag
// never fight over the same target.
export function dragKind() {
    return state.drag?.kind ?? null
}

export function beginDrag(kind: Drag['kind'], id: string) {
    set({ drag: { kind, id }, over: null })
}

export function endDrag() {
    if (state.drag === null && state.over === null) return
    set({ drag: null, over: null })
}

export function hoverGap(sectionId: string | null, beforeId: string | null) {
    const { over } = state
    if (over !== null && over.sectionId === sectionId && over.beforeId === beforeId) return
    set({ ...state, over: { sectionId, beforeId } })
}

// Which gap is the pointer nearest, the one above this element or the one below?
export function gapBefore(e: { clientY: number; currentTarget: Element }, id: string, next: string | null) {
    const box = e.currentTarget.getBoundingClientRect()
    return e.clientY < box.top + box.height / 2 ? id : next
}
