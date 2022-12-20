import { LinearProgress } from "@mui/material"
import React, { useEffect, useState } from "react"

const TargetInfo = (props:{ balance: number, setBalance: (balance: number) => void}) => {
    const [target, setTarget] = useState(0)
    const [savings, setSavings] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const getTarget = localStorage.getItem("target")
        if(typeof getTarget === "string") {
            setTarget(JSON.parse(getTarget))
        }

        const getSavings = localStorage.getItem("savings")
        if(typeof getSavings === "string") {
            setSavings(JSON.parse(getSavings))
        }

        if(savings > 0 && target > 0){
            const clacProgress = Math.floor((savings / target) * 100)
            setProgress(clacProgress)
        }
    },[savings, target])

    const onHandleClick = () => {
        if(window.confirm("Please confirm do you want to transfer to current account?")){
            const clacBalance = props.balance + savings
            props.setBalance(clacBalance)
            setSavings(0)
            localStorage.removeItem("savings")
        }
    }

    return(
        <aside className="dashboard__side-container">
            <p>
                Current Savings: {savings}
                <button onClick={onHandleClick}>Reset</button>
            </p>
            <p>Target: {target}</p>
            <p>Progress: {progress}% </p>
            <React.Fragment>
                <LinearProgress variant={"determinate"}  value={progress} title={"Progress"}
                style={{ width: "50%", marginRight: "4px", height:"5%"}}/>
            </React.Fragment>
        </aside>
    )
}

export default TargetInfo