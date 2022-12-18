import Button from "./Button"

const SetData = (props:{type:string, label:string}) => {
    return(
        <>
            <p>{props.label}</p>
            <input type="number" min={0}/>
            <Button type={props.type}/>
        </>
    )
}

export default SetData