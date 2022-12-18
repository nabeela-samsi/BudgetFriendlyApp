import { useState } from "react"
import Button from "./Button"
import ListRenderer from "./ListRenderer"

const Main = () => {
     // eslint-disable-next-line
     const [expenses, setExpenses] = useState([])
     // eslint-disable-next-line
     const [income, setIncome] = useState([])
    return (
        <section className="dashboard__main-container">
            <Button type={"Set Target"} /> <Button type={"Transfer to Saving Account"} />
            <ListRenderer  data={income} type={"Income"}/>
            <ListRenderer data={expenses} type={"Expenses"}/>
        </section>
    )
}

export default Main