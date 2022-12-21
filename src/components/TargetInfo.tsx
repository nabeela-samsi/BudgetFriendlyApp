import { useEffect, useState } from "react"
import { LinearProgress } from "@mui/material"

const TargetInfo = () => {
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

    return(
        <aside className = "dashboard__side-container">
            <p>
                Current Savings: €{savings}
            </p>
            <p>
                Target: €{target}
            </p>
            <p>
                Progress: {progress}%
            </p>
            <LinearProgress
                variant = {"determinate"}
                value = {progress}
                title = {"Progress"}
                style = {{ width: "50%", marginRight: "4px", height:"3%"}}
                color = "secondary"
            />
        </aside>
    )
}

export default TargetInfo