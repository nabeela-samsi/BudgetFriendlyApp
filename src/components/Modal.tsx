import ReactModal from "react-modal"
import { PropType } from "../types/Icommon"
import Form from "./Form"
import SetData from "./SetData"

const Modal = (props: PropType) => {
    const openForm = (props.type === 'Expenses' || props.type === 'Income')
    const openSetData = (props.type === 'target' || props.type === 'transfer')
    console.log(openForm)
    console.log(openSetData)
    return (
        <>
            <ReactModal isOpen={props.modalIsOpen} onRequestClose={props.toggle} ariaHideApp={false}>
               <button onClick={props.toggle}>Close</button>
                {openForm && (
                    <Form label={props.type}/>
                )}
                {openSetData && (
                    <SetData type={props.type} label={props.label} toggle={props.toggle}/>
                )}
            </ReactModal>
        </>
    )
}

export default Modal