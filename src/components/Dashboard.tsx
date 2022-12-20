import {useEffect, useState} from "react";
import Main from "./Main";
import TargetInfo from "./TargetInfo";

const Dashboard = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const getTotalIncome = localStorage.getItem("Total Income")
        const getTotalExpenses = localStorage.getItem("Total Expenses")
        const getTransferedValue = localStorage.getItem("transfer")
        const getSavings = localStorage.getItem("savings")

        const calcCurrentBal = Number(getTotalIncome) - Number(getTotalExpenses) + Number(getTransferedValue) - Number(getSavings)
        setBalance(calcCurrentBal)
        localStorage.setItem("balance", JSON.stringify(calcCurrentBal))
    },[])

    return (
        <>
            <h1>Current Balance: {balance}</h1>
            <div className="dashboard">
                <TargetInfo
                    balance={balance}
                    setBalance={setBalance}
                />
                <Main/>
            </div>
        </>
    )
}

export default Dashboard