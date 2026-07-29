import { generateKeyBetween } from 'fractional-indexing'
import type { SectionId } from './types'
import { getState, set, useStore, byOrder, sameItems } from './store'

export function useSections() {
    return useStore((s) => [...s.sections].sort(byOrder), sameItems)
}

export function firstSectionId() {
    return [...getState().sections].sort(byOrder)[0]?.id
}

export function addSection(title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    const last = [...state.sections].sort(byOrder).at(-1)
    const section = {
        id: crypto.randomUUID(),
        title: trimmed,
        order: generateKeyBetween(last?.order ?? null, null),
        collapsed: false,
    }
    set({ ...state, sections: [...state.sections, section] })
    return section.id
}

// Capture files here, so its label has to name whatever list actually sorts first.
export function useFirstSection() {
    return useStore((s) => [...s.sections].sort(byOrder)[0], Object.is)
}

export function renameSection(id: SectionId, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    set({ ...state, sections: state.sections.map((s) => (s.id === id ? { ...s, title: trimmed } : s)) })
}

export function reorderSection(id: SectionId, direction: -1 | 1) {
    const state = getState()
    const sorted = [...state.sections].sort(byOrder)
    const i = sorted.findIndex((s) => s.id === id)
    const target = i + direction
    if (i === -1 || target < 0 || target >= sorted.length) return
    const [a, b] =
        direction === -1
            ? [sorted[target - 1]?.order ?? null, sorted[target].order]
            : [sorted[target].order, sorted[target + 1]?.order ?? null]
    const order = generateKeyBetween(a, b)
    set({ ...state, sections: state.sections.map((s) => (s.id === id ? { ...s, order } : s)) })
}

// Deleting a list takes its tasks with it, so undo has to restore both.
export function deleteSection(id: SectionId) {
    const state = getState()
    const section = state.sections.find((s) => s.id === id)
    if (section === undefined) return
    const tasks = state.tasks.filter((t) => t.sectionId === id)
    set({
        ...state,
        sections: state.sections.filter((s) => s.id !== id),
        tasks: state.tasks.filter((t) => t.sectionId !== id),
    })
    return () =>
        set({
            ...getState(),
            sections: [...getState().sections, section],
            tasks: [...getState().tasks, ...tasks],
        })
}

export function toggleSectionCollapsed(id: SectionId) {
    const state = getState()
    set({
        ...state,
        sections: state.sections.map((s) => (s.id === id ? { ...s, collapsed: !s.collapsed } : s)),
    })
}
