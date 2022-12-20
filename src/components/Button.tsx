import useModal from "../hooks/useModal"
import Modal from "./Modal"

const Button = (props:{label: string, type: string, source?:object}) => {
    const {modalIsOpen, toggle} = useModal()
    return (
        <>
            <button onClick={toggle}>
                {props.label}
            </button>
            <>
                <Modal type={props.type} label={props.label} modalIsOpen={modalIsOpen} toggle={toggle} source={props.source}/>
            </>
        </>
    )
}

export default Button