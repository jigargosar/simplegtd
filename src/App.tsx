import { useSections } from './store'
import { SectionView } from './SectionView'
import { Capture } from './Capture'
import { UndoBar } from './Undo'
import { Filters } from './Filters'

export function App() {
    const sections = useSections()

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
                    <p className="text-base leading-7 text-muted">
                        No lists yet. Add one to get started.
                    </p>
                ) : (
                    sections.map((section) => <SectionView key={section.id} section={section} />)
                )}
            </main>
            <UndoBar />
        </div>
    )
}
