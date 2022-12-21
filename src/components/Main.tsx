import NavButton from "./NavButton"
import ListRenderer from "./ListRenderer"

const Main = ({setBalance}:{setBalance: (balance: number) => void}) => {
    return (
        <section className="dashboard__main-container">
            <div className="action-buttons">
                <NavButton
                    label={"Set target"}
                    type={"target"}
                />
                <NavButton
                    label={"Transfer to saving account"}
                    type={"savings"}
                />
                <NavButton
                    label={"Transfer to current account"}
                    type={"transfer"}
                />
            </div>
            <ListRenderer
                type={"Income"}
                setBalance = {setBalance}
            />
            <ListRenderer
                type={"Expense"}
                setBalance = {setBalance}
            />
        </section>
    )
}

export default Main