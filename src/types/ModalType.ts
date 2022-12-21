export interface ModalType{
    type: string | undefined
    label: string
    modalIsOpen: boolean
    toggle: () => void
    idToEdit?: string
}