import { useState } from "react"

const TargetInfo = (props:{savings:number, target:number, progress: number}) => {
    return(
        <aside className="dashboard__side-container">
            <p>Current Savings: {props.savings}</p>
            <p>Target: {props.target}</p>
            <p>Progress: {props.progress}% </p>
        </aside>
    )
}

export default TargetInfo