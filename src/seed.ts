import { generateNKeysBetween } from 'fractional-indexing'
import type { State } from './types'

const seedSections: [string, string[]][] = [
    [
        'Today',
        [
            'Reply to the invoice thread',
            'Renew the domain before it lapses',
            'Walk before the light goes',
        ],
    ],
    ['This week', ['Draft the deploy workflow', 'Book the dentist for the chipped molar']],
    ['Waiting on', ['Signed lease from the landlord', 'Refund from the airline']],
    ['Someday', ['Learn to make dal from scratch', 'Fix the wobbly chair']],
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
