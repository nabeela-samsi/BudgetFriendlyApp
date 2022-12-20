import ReactModal from "react-modal"
import { PropType } from "../types/Icommon"
import Form from "./Form"
import SetData from "./SetData"

const Modal = (props: PropType) => {
    const openForm = (props.type === 'Expenses' || props.type === 'Income')
    const openSetData = (props.type === 'target' || props.type === 'savings')

    return (
        <>
            <ReactModal isOpen={props.modalIsOpen} onRequestClose={props.toggle} ariaHideApp={false}>
               <button onClick={props.toggle}>Close</button>
                {openForm && (
                    <Form label={props.type} sourceToEdit={props.source}/>
                )}
                {openSetData && (
                    <SetData type={props.type} label={props.label} toggle={props.toggle}/>
                )}
            </ReactModal>
        </>
    )
}

export default Modal