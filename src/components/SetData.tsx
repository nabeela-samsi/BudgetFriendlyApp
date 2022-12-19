import { useEffect, useState } from "react"

const SetData = (props:{type: string, label:string, toggle: () => void}) => {
    const buttonName = (props.type === "target") ? "Set" : "Transfer"
    const [value, setValue] = useState("0")

    useEffect(() => {
        if(props.type === "target") {
            const getData =  localStorage.getItem(props.type)
            if(typeof getData === 'string'){
                const parse = JSON.parse(getData)
                setValue(parse)
            }
        }
    },[])

    const handleSetValue = () => {
       localStorage.setItem(props.type,JSON.stringify(value))
    }

    return(
        <form>
            <p>{props.label}</p>
            <input type="number" min={0} value={value} className="value" onChange={(e) => setValue(e.target.value)} />
            <button type="submit" onClick={handleSetValue}>{buttonName}</button>
        </form>
    )
}

export default SetData