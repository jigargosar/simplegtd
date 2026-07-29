import { getState, set, useStore } from './store'

// Half-typed text is user data too: an interrupted session should lose none of it.
export function useDraft(key: string) {
    const value = useStore((s) => s.drafts?.[key] ?? '', Object.is)
    return [value, (next: string) => setDraft(key, next)] as const
}

export function setDraft(key: string, value: string) {
    const state = getState()
    const drafts = { ...state.drafts, [key]: value }
    if (value === '') delete drafts[key]
    set({ ...state, drafts })
}
