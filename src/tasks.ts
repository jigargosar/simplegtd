import { generateKeyBetween } from 'fractional-indexing'
import type { SectionId, Task, TaskId } from './types'
import { getState, set, useStore, byOrder, sameItems } from './store'

const matches = (t: Task, filter: string, query: string) =>
    (filter === 'all' ? true : filter === 'done' ? t.done : !t.done) &&
    (query === '' || t.title.toLowerCase().includes(query))

export function useSectionTasks(sectionId: SectionId) {
    return useStore((s) => {
        const f = s.filter ?? 'all'
        const q = (s.query ?? '').trim().toLowerCase()
        return s.tasks
            .filter((t) => t.sectionId === sectionId && matches(t, f, q))
            .sort(byOrder)
    }, sameItems)
}

export function useOpenCount(sectionId: SectionId) {
    return useStore(
        (s) => s.tasks.filter((t) => t.sectionId === sectionId && !t.done).length,
        Object.is,
    )
}

export function useTally() {
    return useStore((s) => {
        const open = s.tasks.filter((t) => !t.done).length
        return `${open} open · ${s.tasks.length - open} done`
    }, Object.is)
}

export function addTask(sectionId: SectionId, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    const last = state.tasks.filter((t) => t.sectionId === sectionId).sort(byOrder).at(-1)
    const task: Task = {
        id: crypto.randomUUID(),
        sectionId,
        title: trimmed,
        done: false,
        order: generateKeyBetween(last?.order ?? null, null),
    }
    set({ ...state, tasks: [...state.tasks, task], lastSectionId: sectionId })
}

export function toggleTask(id: TaskId) {
    const state = getState()
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })
}

export function renameTask(id: TaskId, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, title: trimmed } : t)) })
}

export function deleteTask(id: TaskId) {
    const state = getState()
    set({ ...state, tasks: state.tasks.filter((t) => t.id !== id) })
}

// Drag drops a task in front of `beforeId`, or at the end of the list when that
// is null. The same call covers reordering inside a list and moving across lists.
export function placeTask(id: TaskId, sectionId: SectionId, beforeId: TaskId | null) {
    if (id === beforeId) return
    const state = getState()
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined) return
    const siblings = state.tasks.filter((t) => t.sectionId === sectionId && t.id !== id).sort(byOrder)
    const i = beforeId === null ? siblings.length : siblings.findIndex((t) => t.id === beforeId)
    if (i === -1) return
    const order = generateKeyBetween(siblings[i - 1]?.order ?? null, siblings[i]?.order ?? null)
    if (task.sectionId === sectionId && task.order === order) return
    set({
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, sectionId, order } : t)),
    })
}
