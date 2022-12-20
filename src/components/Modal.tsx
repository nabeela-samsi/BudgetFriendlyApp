import ReactModal from "react-modal"
import { PropType } from "../types/Icommon"
import Form from "./Form"
import SetData from "./SetData"

const Modal = (props: PropType) => {
    const openForm = (props.type === 'Expenses' || props.type === 'Income')
    const openSetData = (props.type === 'target' || props.type === 'savings' || props.type === 'transfer')

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
            <ReactModal isOpen={props.modalIsOpen} onRequestClose={props.toggle} ariaHideApp={false} style={customStyles}>
               <div className="modal">
                <button onClick={props.toggle}>Close</button>
                    {openForm && (
                        <Form label={props.type} idToEdit={props.idToEdit}/>
                    )}
                    {openSetData && (
                        <SetData type={props.type} label={props.label}/>
                    )}
                </div>
            </ReactModal>
        </>
    )
}

export default Modal