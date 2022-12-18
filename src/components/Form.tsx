import { useState } from "react";
import DatePicker from "react-date-picker";
import { useLocation } from "react-router-dom";

const IncomeExpenseForm = () => {
  const location = useLocation();
  const { state } = location;
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const placeholder = state.label === "expense" ? "Electricity bill" : "Salary";

  // const onhandleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     source,
  //     amount,
  //     date,
  //   };
  //   localStorage.setItem("expense1", JSON.stringify(data));
  // };

  return (
    <form>
      <label className="form__source">
        <p>Source of {state.label}</p>
        <input
          type="text"
          placeholder={placeholder}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </label>
      <label className="form__amt">
        <p>Amount of {state.label}</p>
        <input
          className="amount"
          type="number"
          placeholder="amount"
          min={0}
          value={amount}
          // onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label className="form__date">
        <p>Date of {state.label}</p>
        <DatePicker
          value={date}
          // onChange={(e) => setDate(e.toLocaleDateString())}
        />
      </label>
      <br /> <br />
      <button type="submit">Add {state.label}</button>
    </form>
  );
};

export default IncomeExpenseForm;
