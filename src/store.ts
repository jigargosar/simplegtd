import { useSyncExternalStore } from 'react'
import type { Filter, State } from './types'
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

export function getState() {
    return state
}

export function set(next: State) {
    state = next
    localStorage.setItem(KEY, JSON.stringify(state))
    listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export function useStore<T>(select: (s: State) => T, isEqual: (a: T, b: T) => boolean): T {
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

export const byOrder = <T extends { order: string }>(a: T, b: T) => (a.order < b.order ? -1 : 1)

export const sameItems = <T>(a: T[], b: T[]) => a.length === b.length && a.every((x, i) => x === b[i])

// --- view state ---

export function useQuery() {
    return useStore((s) => s.query ?? '', Object.is)
}

export function setQuery(query: string) {
    set({ ...state, query })
}

export function useFilter() {
    return useStore((s) => s.filter ?? 'all', Object.is)
}

export function setFilter(filter: Filter) {
    set({ ...state, filter })
}
