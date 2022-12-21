import { Icon } from "@mui/material"
import { useEffect, useState } from "react"
import { FormDataType } from "../types/FormType"

import { ListRendererType } from "../types/ListRendererType"
import CalculateBalance from "../utility/CalculateBalance"

import NavButton from "./NavButton"

const ListRenderer = ({type, setBalance}: ListRendererType)=> {
    const [data, setData] = useState([])
    const [toggle, setToggle] =useState(false)

    useEffect(() => {
        const getData: string | null = localStorage.getItem(type)
        if(typeof getData === 'string'){
            const parse = JSON.parse(getData)
            setData(parse)
        }
    },[type, toggle])

    const deleteData = (id: string) => {
        if(window.confirm("Please confirm do you want to delete the data?")){
            const filteredData = data.filter((item: FormDataType) => item.id !== id)
            localStorage.setItem(type, JSON.stringify(filteredData))
            setBalance(CalculateBalance())
            setToggle(true)
        }
    }

    const displayData = data.map((item: any) => {
        const getDate = new Date(item.date).toLocaleDateString("default", {weekday:"short", month: "short", day:"numeric", year:"numeric"})

        return (
            <li key={`${item.id}`}>
                {item.source}: €{item.amount} on {getDate}
                <NavButton
                    label={"Update"}
                    type={type}
                    idToEdit={item.id}
                />
                <Icon
                    className="fa fa-trash-o"
                    onClick={() => deleteData(item.id)}
                    color="error"
                >
                </Icon>
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