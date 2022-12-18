import Button from "./Button"

const ListRenderer = (props:{data: Object[], type: string})=> {
    let displayData = props.data.map((item, index) => <li key={`${props.type}-${index}`}></li>)
    return (
        <div>
            <h2>{props.type} <Button type={"ADD"} /></h2>
            {(displayData.length) ? <>{displayData}</> : <p>There is no data to display</p>}
        </div>
    )

}

export default ListRenderer