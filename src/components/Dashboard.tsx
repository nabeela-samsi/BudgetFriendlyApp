import {useState} from "react";
import Button from "./Button";
import ListRenderer from "./ListRenderer";
import Main from "./Main";
import TargetInfo from "./TargetInfo";
// import SetData from "./SetData";


const Dashboard = () => {
    // eslint-disable-next-line
    const [balance, setBalance] = useState(0)

    return (
        <>
            <h1>Current Balance: {balance}</h1>
            <div className="dashboard">
                <TargetInfo />
                <Main />
            </div>
        </>
    )
}

export default Dashboard