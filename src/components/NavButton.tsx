import { Button, Icon } from "@mui/material"
import useModal from "../hooks/useModal"

import { CommonType } from "../types/CommonType";

import Modal from "./Modal"

const NavButton = ({label,type,idToEdit}: CommonType) => {
    const {modalIsOpen, toggle} = useModal()
    const addButton = (label === 'ADD')
    const updateButton = (label === 'Update')

    return (
        <>
            {!(addButton || updateButton) && (
                <Button
                    onClick={toggle}
                    variant="outlined"
                    sx={{mr: '1em'}}
                >
                    {label}
                </Button>
            )}
            {addButton && (
                <Icon
                    className="fa fa-plus-circle"
                    onClick={toggle}
                />
            )}
            {updateButton && (
                <Icon
                    className="fa fa-pencil"
                    onClick={toggle}
                />
            )}
            <>
                <Modal
                    type={type}
                    label={label}
                    modalIsOpen={modalIsOpen}
                    toggle={toggle}
                    idToEdit={idToEdit}
                />
            </>
        </>
    )
}

export default NavButton