import { useEffect, useState } from "react"
import Button from "./Button"

const ListRenderer = (props:{ type: string})=> {
    const [data, setdata] = useState([])
    let totalAmount = 0

    useEffect(() => {
        const getData =  localStorage.getItem(props.type)
        if(typeof getData === 'string'){
            const parse = JSON.parse(getData)
            setdata(parse)
        }
    },[props.type])
    let displayData = data.map((item: any, index) => {
        totalAmount = totalAmount + +item.amount
        localStorage.setItem(`Total ${props.type}`,JSON.stringify(totalAmount))

        const getDate = new Date(item.date).toLocaleDateString("default", {weekday:"short", month: "short", day:"numeric", year:"numeric"})

        return (
            <li key={`${props.type}-${item.source}-${item.date}-${index}`}>
                {item.source}: {item.amount}EUR on {getDate}
                <Button label={"Update"} type={props.type} source={item}/>
            </li>
        )
    })
    return (
        <div>
            <h2>{props.type} <Button label={"ADD"} type={props.type}/></h2>
            {(displayData.length) ? <>{displayData}</> : <p>There is no data to display</p>}
        </div>
    )

}

export default ListRenderer