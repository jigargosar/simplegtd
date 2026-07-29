import { generateKeyBetween } from 'fractional-indexing'
import type { SectionId, Task } from './types'
import { getState, set, useStore, byOrder, sameItems } from './store'

export function useSectionTasks(sectionId: SectionId) {
    return useStore((s) => {
        const f = s.filter ?? 'all'
        const q = (s.query ?? '').trim().toLowerCase()
        return s.tasks
            .filter((t) => t.sectionId === sectionId)
            .filter((t) => (f === 'all' ? true : f === 'done' ? t.done : !t.done))
            .filter((t) => q === '' || t.title.toLowerCase().includes(q))
            .sort(byOrder)
    }, sameItems)
}

// How many tasks survive the filter and the search box, across every list?
export function useMatchCount() {
    return useStore((s) => {
        const f = s.filter ?? 'all'
        const q = (s.query ?? '').trim().toLowerCase()
        return s.tasks.filter(
            (t) =>
                (f === 'all' ? true : f === 'done' ? t.done : !t.done) &&
                (q === '' || t.title.toLowerCase().includes(q)),
        ).length
    }, Object.is)
}

// Is anything in this section at all, ignoring the filter and search box?
export function useSectionIsEmpty(sectionId: SectionId) {
    return useStore((s) => !s.tasks.some((t) => t.sectionId === sectionId), Object.is)
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
    set({ ...state, tasks: [...state.tasks, task] })
}

export function toggleTask(id: string) {
    const state = getState()
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })
}

export function renameTask(id: string, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, title: trimmed } : t)) })
}

export function reorderTask(id: string, direction: -1 | 1) {
    const state = getState()
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined) return
    const siblings = state.tasks.filter((t) => t.sectionId === task.sectionId).sort(byOrder)
    const i = siblings.findIndex((t) => t.id === id)
    const target = i + direction
    if (target < 0 || target >= siblings.length) return
    // Land between the neighbour we're passing and whatever is beyond it.
    const [a, b] =
        direction === -1
            ? [siblings[target - 1]?.order ?? null, siblings[target].order]
            : [siblings[target].order, siblings[target + 1]?.order ?? null]
    const order = generateKeyBetween(a, b)
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, order } : t)) })
}

export function moveTask(id: string, sectionId: SectionId) {
    const state = getState()
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined || task.sectionId === sectionId) return
    const last = state.tasks.filter((t) => t.sectionId === sectionId).sort(byOrder).at(-1)
    const moved = { ...task, sectionId, order: generateKeyBetween(last?.order ?? null, null) }
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? moved : t)) })
}

export function deleteTask(id: string) {
    const state = getState()
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined) return
    set({ ...state, tasks: state.tasks.filter((t) => t.id !== id) })
    return () => set({ ...getState(), tasks: [...getState().tasks, task] })
}
