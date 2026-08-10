import { useEffect, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import type { Filter } from './types'
import { useQuery, setQuery, useFilter, setFilter } from './store'
import { useVisibleSections, addSection } from './sections'
import { useTally } from './tasks'
import { SectionView } from './SectionView'
import { Capture } from './Capture'
import { Ghost } from './Ghost'
import { useDnd } from './Dnd'
import { EMPTY, meta, ring } from './ui'

const views: Filter[] = ['all', 'active', 'done']

export function App() {
    const sections = useVisibleSections()
    const query = useQuery()
    const filter = useFilter()
    const tally = useTally()
    const { drag, over } = useDnd()
    const [capturing, setCapturing] = useState(false)

    // The one shortcut worth having: a thought arrives, you press C, it is filed.
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== 'c' || e.metaKey || e.ctrlKey || e.altKey) return
            const target = e.target as HTMLElement | null
            if (target !== null && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
            e.preventDefault()
            setCapturing(true)
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])

    const sifting = query.trim() !== '' || filter !== 'all'

    return (
        <>
            <main className="mx-auto min-h-screen w-full max-w-xl bg-paper pb-28 shadow-[0_0_60px_rgba(15,18,14,.35)]">
                <header className="sticky top-0 z-20 border-b border-rule bg-paper/95 px-5 pt-5 pb-3 backdrop-blur-sm">
                    <div className="flex items-baseline justify-between gap-4">
                        <h1 className="font-display text-[23px] font-semibold tracking-tight">
                            SimpleGTD
                        </h1>
                        <p className={`${meta} shrink-0 tabular-nums text-ink2`}>{tally}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-3">
                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-soft" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Filter"
                                aria-label="Filter"
                                className={`h-10 w-full min-w-0 rounded-lg border border-rule bg-paper pr-9 pl-8 text-[15px] placeholder:text-soft ${ring}`}
                            />
                            {query !== '' && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="Clear filter"
                                    className={`absolute top-1/2 right-1.5 grid size-7 -translate-y-1/2 place-items-center rounded-md text-soft hover:bg-fill hover:text-ink ${ring}`}
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>
                        <div className="flex shrink-0 gap-0.5 rounded-lg border border-rule p-0.5">
                            {views.map((view) => (
                                <button
                                    key={view}
                                    onClick={() => setFilter(view)}
                                    aria-pressed={filter === view}
                                    className={`h-8 rounded-md px-2.5 ${meta} ${ring} ${
                                        filter === view
                                            ? 'bg-pine font-medium text-paper'
                                            : 'text-ink2 hover:bg-fill'
                                    }`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {sections.map((section, i) => (
                    <SectionView
                        key={section.id}
                        section={section}
                        nextId={sections[i + 1]?.id ?? null}
                        sifting={sifting}
                    />
                ))}

                {drag?.kind === 'section' && over?.sectionId === null && over.beforeId === null && (
                    <div className="pointer-events-none mx-6 mt-2 h-0.5 rounded-full bg-pine" />
                )}

                {sections.length === 0 && (
                    <p className="px-5 pt-10 text-[15px] text-ink2">
                        {sifting ? EMPTY : 'No lists yet. Add one below.'}
                    </p>
                )}

                {!sifting && (
                    <div className="px-5 pt-8">
                        <Ghost label="New list" display onAdd={addSection} />
                    </div>
                )}
            </main>

            <button
                onClick={() => setCapturing(true)}
                className={`fixed right-6 bottom-6 z-30 flex h-12 items-center gap-2 rounded-full bg-pine pr-3 pl-4 text-paper shadow-lg hover:bg-ink ${ring}`}
            >
                <Plus className="size-4" />
                <span className="text-[14px] font-medium">Capture</span>
                <kbd className="rounded bg-paper/25 px-1.5 py-0.5 font-mono text-[11px]">C</kbd>
            </button>

            <Capture open={capturing} onClose={() => setCapturing(false)} />
        </>
    )
}
