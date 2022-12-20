import { useEffect, useState } from "react"

import { ListRendererType } from "../types/ListRendererType"

import NavButton from "./NavButton"

const ListRenderer = ({type}: ListRendererType)=> {
    const [data, setdata] = useState([])

    useEffect(() => {
        const getData: string | null = localStorage.getItem(type)
        if(typeof getData === 'string'){
            const parse = JSON.parse(getData)
            setdata(parse)
        }
    },[type])

    let displayData = data.map((item: any) => {
        const getDate = new Date(item.date).toLocaleDateString("default", {weekday:"short", month: "short", day:"numeric", year:"numeric"})

        return (
            <li key={`${item.id}`}>
                {item.source}: €{item.amount} on {getDate}
                <NavButton
                    label={"Update"}
                    type={type}
                    idToEdit={item.id}
                />
            </li>
        )
    })
    return (
        <div>
            <h2>
                {type}
                <NavButton
                    label={"ADD"}
                    type={type}
                />
            </h2>
            {(displayData.length) ? <> {displayData} </> : <p>There is no data to display</p>}
        </div>
    )

}

export default ListRenderer