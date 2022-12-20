import Button from "./Button"
import ListRenderer from "./ListRenderer"

const Main = () => {
    return (
        <section className="dashboard__main-container">
            <Button label={"Set target"} type={"target"}/>
            <Button label={"Transfer to saving account"} type={"savings"} />
            <ListRenderer type={"Income"}/>
            <ListRenderer type={"Expenses"}/>
        </section>
    )
}

export default Main