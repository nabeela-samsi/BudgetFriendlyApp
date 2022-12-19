import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";

const Form = (props: {label: string}) => {
  const placeholder = props.label === "Expense" ? "Electricity bill" : "Salary";
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState("0")
  const [date, setDate] = useState(new Date())
  const [formData, setFormData] = useState([])
  useEffect(()=>{
    const getData =  localStorage.getItem(props.label)
      if(typeof getData === 'string'){
        setFormData(JSON.parse(getData))
      }
  },[props.label])

  const handleOnSubmit = async() => {
    const value = formData.length ? [...formData, {source, amount, date}] : [{source, amount, date}]
    await localStorage.setItem(props.label,JSON.stringify(value))
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label className="form__source">
        <p>Source of {props.label.toLocaleLowerCase()}</p>
        <input
          type="text"
          placeholder={placeholder}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </label>
      <label className="form__amt">
        <p>Amount of {props.label.toLocaleLowerCase()}</p>
        <input
          className="amount"
          type="number"
          placeholder="amount"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label className="form__date">
        <p>Date of {props.label.toLocaleLowerCase()}</p>
        <DatePicker
          value={date}
          onChange={(date:any) => setDate(date)}
        />
      </label>
      <br /> <br />
      <button type="submit">Add {props.label}</button>
    </form>
  );
};

export default Form;
