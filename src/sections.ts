import { generateKeyBetween } from 'fractional-indexing'
import type { SectionId } from './types'
import { getState, set, useStore, byOrder, sameItems } from './store'

export function useSections() {
    return useStore((s) => [...s.sections].sort(byOrder), sameItems)
}

// While the filter box or the tabs are narrowing things down, a list with no
// surviving tasks is noise, so it drops out entirely.
export function useVisibleSections() {
    return useStore((s) => {
        const f = s.filter ?? 'all'
        const q = (s.query ?? '').trim().toLowerCase()
        const sorted = [...s.sections].sort(byOrder)
        if (q === '' && f === 'all') return sorted
        return sorted.filter((sec) =>
            s.tasks.some(
                (t) =>
                    t.sectionId === sec.id &&
                    (f === 'all' ? true : f === 'done' ? t.done : !t.done) &&
                    (q === '' || t.title.toLowerCase().includes(q)),
            ),
        )
    }, sameItems)
}

// Capture lands on the last list used, falling back to whichever sorts first.
export function useCaptureTarget() {
    return useStore((s) => {
        const sorted = [...s.sections].sort(byOrder)
        return sorted.find((x) => x.id === s.lastSectionId)?.id ?? sorted[0]?.id
    }, Object.is)
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

export function renameSection(id: SectionId, title: string) {
    const trimmed = title.trim()
    if (trimmed === '') return
    const state = getState()
    set({
        ...state,
        sections: state.sections.map((s) => (s.id === id ? { ...s, title: trimmed } : s)),
    })
}

// Deleting a list takes its tasks with it.
export function deleteSection(id: SectionId) {
    const state = getState()
    set({
        ...state,
        sections: state.sections.filter((s) => s.id !== id),
        tasks: state.tasks.filter((t) => t.sectionId !== id),
    })
}

export function toggleSectionCollapsed(id: SectionId) {
    const state = getState()
    set({
        ...state,
        sections: state.sections.map((s) => (s.id === id ? { ...s, collapsed: !s.collapsed } : s)),
    })
}

export function placeSection(id: SectionId, beforeId: SectionId | null) {
    if (id === beforeId) return
    const state = getState()
    const others = state.sections.filter((s) => s.id !== id).sort(byOrder)
    const i = beforeId === null ? others.length : others.findIndex((s) => s.id === beforeId)
    if (i === -1) return
    const order = generateKeyBetween(others[i - 1]?.order ?? null, others[i]?.order ?? null)
    set({ ...state, sections: state.sections.map((s) => (s.id === id ? { ...s, order } : s)) })
}
