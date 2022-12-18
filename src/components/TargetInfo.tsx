import { useState } from "react"

const TargetInfo = () => {
    // eslint-disable-next-line
    const [savings, setSavings] = useState(0)
    // eslint-disable-next-line
    const [target, setTarget] = useState(0)
    // eslint-disable-next-line
    const [progress, seProgress] = useState(0)

    return(
        <aside className="dashboard__side-container">
            <p>Current Savings: {savings}</p>
            <p>Target: {target}</p>
            <p>Progress: {progress}% </p>
        </aside>
    )
}

export default TargetInfo