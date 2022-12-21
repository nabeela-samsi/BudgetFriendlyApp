import {useEffect, useState} from "react";
import CalculateBalance from "../utility/CalculateBalance";

import Main from "./Main";
import TargetInfo from "./TargetInfo";

const Dashboard = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        setBalance(CalculateBalance())
    },[balance])

    return (
        <>
            <h2 style={{paddingLeft:"10%"}}>Current Balance: €{balance}</h2>
            <div className="dashboard">
                <TargetInfo />
                <Main
                    setBalance={setBalance}
                />
            </div>
        </>
    )
}

export default Dashboard