export type SectionId = string

export type TaskId = string

export type Section = {
    id: SectionId
    title: string
    order: string
    collapsed: boolean
}

export type Task = {
    id: TaskId
    sectionId: SectionId
    title: string
    done: boolean
    order: string
}

export type State = {
    sections: Section[]
    tasks: Task[]
}
