import { useSyncExternalStore } from 'react'
import { generateKeyBetween } from 'fractional-indexing'
import type { Filter, SectionId, State, Task } from './types'
import { makeSeedState } from './seed'

const KEY = 'simplegtd/v1'

let state: State = load()
const listeners = new Set<() => void>()

function load(): State {
    try {
        const raw = localStorage.getItem(KEY)
        if (raw === null) return makeSeedState()
        const parsed = JSON.parse(raw) as State
        if (!Array.isArray(parsed.sections) || !Array.isArray(parsed.tasks)) return makeSeedState()
        return parsed
    } catch {
        return makeSeedState()
    }
}

function set(next: State) {
    state = next
    localStorage.setItem(KEY, JSON.stringify(state))
    listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function useStore<T>(select: (s: State) => T, isEqual: (a: T, b: T) => boolean): T {
    let cached: T | undefined
    let hasCache = false
    const read = () => {
        const next = select(state)
        if (hasCache && isEqual(cached as T, next)) return cached as T
        cached = next
        hasCache = true
        return next
    }
    return useSyncExternalStore(subscribe, read, read)
}

const byOrder = <T extends { order: string }>(a: T, b: T) => (a.order < b.order ? -1 : 1)

const sameItems = <T>(a: T[], b: T[]) => a.length === b.length && a.every((x, i) => x === b[i])

// --- selectors ---

export function useSections() {
    return useStore((s) => [...s.sections].sort(byOrder), sameItems)
}

export function useSectionTasks(sectionId: SectionId) {
    return useStore((s) => {
        const f = s.filter ?? 'all'
        return s.tasks
            .filter((t) => t.sectionId === sectionId)
            .filter((t) => (f === 'all' ? true : f === 'done' ? t.done : !t.done))
            .sort(byOrder)
    }, sameItems)
}

export function useFilter() {
    return useStore((s) => s.filter ?? 'all', Object.is)
}

export function setFilter(filter: Filter) {
    set({ ...state, filter })
}

// --- actions ---

export function addTask(sectionId: SectionId, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const existing = state.tasks.filter((t) => t.sectionId === sectionId).sort(byOrder)
    const last = existing.at(-1)
    const task: Task = {
        id: crypto.randomUUID(),
        sectionId,
        title: trimmed,
        done: false,
        order: generateKeyBetween(last?.order ?? null, null),
    }
    set({ ...state, tasks: [...state.tasks, task] })
}

export function firstSectionId() {
    return [...state.sections].sort(byOrder)[0]?.id
}

export function toggleTask(id: string) {
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })
}

export function renameTask(id: string, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, title: trimmed } : t)) })
}

export function moveTask(id: string, sectionId: SectionId) {
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined || task.sectionId === sectionId) return
    const last = state.tasks.filter((t) => t.sectionId === sectionId).sort(byOrder).at(-1)
    const moved = { ...task, sectionId, order: generateKeyBetween(last?.order ?? null, null) }
    set({ ...state, tasks: state.tasks.map((t) => (t.id === id ? moved : t)) })
}

export function deleteTask(id: string) {
    const task = state.tasks.find((t) => t.id === id)
    if (task === undefined) return
    set({ ...state, tasks: state.tasks.filter((t) => t.id !== id) })
    return () => set({ ...state, tasks: [...state.tasks, task] })
}

export function toggleSectionCollapsed(id: SectionId) {
    set({
        ...state,
        sections: state.sections.map((s) => (s.id === id ? { ...s, collapsed: !s.collapsed } : s)),
    })
}
