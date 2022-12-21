import { IconButton } from "@mui/material"
import ReactModal from "react-modal"
import { ModalType } from "../types/ModalType"

import Form from "./Form"
import SetData from "./SetData"

const Modal = ({type,label,modalIsOpen,toggle,idToEdit}: ModalType) => {
    const openForm = (type === 'Expense' || type === 'Income')
    const openSetData = (type === 'target' || type === 'savings' || type === 'transfer')

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }
      };

    return (
        <>
            <ReactModal
                isOpen = {modalIsOpen}
                onRequestClose = {toggle}
                ariaHideApp = {false}
                style = {customStyles}
            >
                <div className = "modal">
                    <IconButton
                        onClick = {toggle}
                        className = "fa fa-times-circle-o"
                        sx = {{position: "absolute", right:0, top: 0, zIndex:2000}}
                    >
                    </IconButton>
                    {openForm && (
                        <Form
                            type = {type}
                            idToEdit = {idToEdit}
                            label = {label}
                        />
                    )}
                    {openSetData && (
                        <SetData
                            type = {type}
                            label = {label}
                        />
                    )}
                </div>
            </ReactModal>
        </>
    )
}

export default Modal