import { ReactNode } from "react"
import useModal from "../hooks/useModal"
import Modal from "./Modal"

const Button = (props:{label: string, type: string}) => {
    const {modalIsOpen, toggle} = useModal()
    return (
        <>
            <button onClick={toggle}>
                {props.label}
            </button>
            <>
                <Modal type={props.type} label={props.label} modalIsOpen={modalIsOpen} toggle={toggle}/>
            </>
        </>
    )
}

export default Button