import { Button, Icon } from "@mui/material"
import useModal from "../hooks/useModal"
import Modal from "./Modal"

const NavButton = (props:{label: string, type: string, idToEdit?: string}) => {
    const {modalIsOpen, toggle} = useModal()
    const addButton = (props.label === 'ADD')
    const updateButton = (props.label === 'Update')
    return (
        <>
            {!(addButton || updateButton) && (
                <Button onClick={toggle} variant="outlined">
                    {props.label}
                </Button>
            )}
            {addButton && (
                <Icon className="fa fa-plus-circle" onClick={toggle}/>
            )}
            {updateButton && (
                <Icon className="fa fa-pencil" onClick={toggle}/>
            )}
            <>
                <Modal type={props.type} label={props.label} modalIsOpen={modalIsOpen} toggle={toggle} idToEdit={props.idToEdit}/>
            </>
        </>
    )
}

export default NavButton