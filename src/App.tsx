import { useSections } from './sections'
import { useMatchCount } from './tasks'
import { useQuery, useFilter } from './store'
import { SectionView } from './SectionView'
import { Capture } from './Capture'
import { UndoBar } from './Undo'
import { Filters } from './Filters'
import { AddSection } from './AddSection'
import { useGlobalKeys } from './keys'

const message = 'text-base leading-7 text-muted'

// One message for the whole app beats the same line repeated under every list.
function NoMatches() {
    const query = useQuery().trim()
    const filter = useFilter()
    return (
        <p className={message}>
            {query !== ''
                ? `Nothing matches "${query}". Try a shorter word, or clear the search.`
                : filter === 'done'
                  ? 'Nothing is done yet. Tick something off and it will show up here.'
                  : 'Everything is done. Capture something new above.'}
        </p>
    )
}

export function App() {
    const sections = useSections()
    const matches = useMatchCount()
    useGlobalKeys()

    const narrowed = useQuery().trim() !== '' || useFilter() !== 'all'

    return (
        <div className="min-h-screen bg-paper font-sans">
            <main className="mx-auto w-full max-w-3xl px-5 pt-14 pb-24 sm:px-10">
                <header className="flex items-baseline gap-3 pb-10">
                    <h1 className="font-mono text-sm font-medium tracking-[0.16em] text-ink uppercase">
                        simplegtd
                    </h1>
                    <span className="h-px flex-1 bg-rule" />
                </header>

                <Capture />

                <Filters />

                {sections.length === 0 ? (
                    <p className={message}>No lists yet. Add one to get started.</p>
                ) : narrowed && matches === 0 ? (
                    <NoMatches />
                ) : (
                    sections.map((section) => <SectionView key={section.id} section={section} />)
                )}

                <div className="sm:pl-[10rem]">
                    <AddSection />
                </div>
            </main>
            <UndoBar />
        </div>
    )
}
