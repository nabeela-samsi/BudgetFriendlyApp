export interface PropType{
    type: string
    label: string
    modalIsOpen:boolean
    toggle: () => void
    source?:Object
}