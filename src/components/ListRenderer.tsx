import { useEffect, useState } from "react"
import Button from "./Button"

const ListRenderer = (props:{ type: string})=> {
    const [data, setdata] = useState([])
    useEffect(() => {
        const getData =  localStorage.getItem(props.type)
        if(typeof getData === 'string'){
            const parse = JSON.parse(getData)
            setdata(parse)
        }
    },[props.type])
    console.log(data)
    let displayData = data.map((item: any, index) => <li key={`${props.type}-${index}`}>{item.source}: {item.amount}EUR on {item.date}</li>)
    return (
        <div>
            <h2>{props.type} <Button label={"ADD"} type={props.type}/></h2>
            {(displayData.length) ? <>{displayData}</> : <p>There is no data to display</p>}
        </div>
    )

}

export default ListRenderer