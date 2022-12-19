import { useState } from "react"
import Button from "./Button"
import ListRenderer from "./ListRenderer"

const Main = (props:{
    savings: number,
    setSavings: (Savings:number) => void,
    target: number,
    setTarget: (target:number) => void,
    progress: number,
    setProgress: (progress:number) => void
}) => {
    return (
        <section className="dashboard__main-container">
            <Button label={"Set target"} type={"target"}/>
            <Button label={"Transfer to saving account"} type={"transfer"} />
            <ListRenderer type={"Income"}/>
            <ListRenderer type={"Expenses"}/>
        </section>
    )
}

export default Main