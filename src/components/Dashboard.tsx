import {useState} from "react";
import Button from "./Button";
import ListRenderer from "./ListRenderer";
import Main from "./Main";
import TargetInfo from "./TargetInfo";
// import SetData from "./SetData";


const Dashboard = () => {
    // eslint-disable-next-line
    const [balance, setBalance] = useState(0)
    // eslint-disable-next-line
    const [savings, setSavings] = useState(0)
    // eslint-disable-next-line
    const [target, setTarget] = useState(0)
    // eslint-disable-next-line
    const [progress, setProgress] = useState(0)

    return (
        <>
            <h1>Current Balance: {balance}</h1>
            <div className="dashboard">
                <TargetInfo
                    savings={savings}
                    target={target}
                    progress={progress}
                />
                <Main
                    savings={savings}
                    setSavings={setSavings}
                    target={target}
                    setTarget={setTarget}
                    progress={progress}
                    setProgress={setProgress}
                />
            </div>
        </>
    )
}

export default Dashboard