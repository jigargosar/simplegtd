import { generateNKeysBetween } from 'fractional-indexing'
import type { State } from './types'

const seedSections: [string, string[]][] = [
    [
        'Inbox',
        [
            'Anything you think of lands here first',
            'Empty this list by moving each line somewhere below',
        ],
    ],
    [
        'Next',
        ['The things you would do if you had a free hour', 'Reply to the email about the invoice'],
    ],
    ['Waiting', ['Waiting on a reply from the accountant', 'Package should arrive Thursday']],
    ['Someday', ['Learn to make proper sourdough', 'Repaint the hallway']],
]

export function makeSeedState(): State {
    const sectionOrders = generateNKeysBetween(null, null, seedSections.length)
    const sections = seedSections.map(([title], i) => ({
        id: `seed-section-${i}`,
        title,
        order: sectionOrders[i],
        collapsed: false,
    }))
    const tasks = seedSections.flatMap(([, titles], si) => {
        const orders = generateNKeysBetween(null, null, titles.length)
        return titles.map((title, ti) => ({
            id: `seed-task-${si}-${ti}`,
            sectionId: sections[si].id,
            title,
            done: false,
            order: orders[ti],
        }))
    })
    return { sections, tasks }
}
