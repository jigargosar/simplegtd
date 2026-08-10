import { meta, ring } from './ui'

// Removal has to carry resistance, and there is no undo to fall back on, so the
// row turns into this strip in place rather than vanishing under the pointer.
export function Confirm({
    text,
    onRemove,
    onKeep,
}: {
    text: string
    onRemove: () => void
    onKeep: () => void
}) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-fill px-2">
            <p className="min-w-0 flex-1 truncate text-[15px] leading-6 text-ink2">
                Remove &ldquo;{text}&rdquo;?
            </p>
            <button
                onClick={onRemove}
                className={`h-9 shrink-0 rounded-md px-3 font-medium text-brick hover:bg-paper ${meta} ${ring}`}
            >
                Remove
            </button>
            <button
                onClick={onKeep}
                className={`h-9 shrink-0 rounded-md px-3 text-ink2 hover:bg-paper ${meta} ${ring}`}
            >
                Keep
            </button>
        </div>
    )
}
