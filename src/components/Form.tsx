import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

const Form = (props: {label: string, sourceToEdit?:Object | any}) => {
  const placeholder = props.label === "Expenses" ? "Electricity bill" : "Salary";
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState("0")
  const [date, setDate] = useState(new Date())
  const [formData, setFormData] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)

  useEffect(() => {
    if(props.sourceToEdit) {
      setSource(props.sourceToEdit.source)
      setAmount(props.sourceToEdit.amount)
      const dateFormat = new Date(props.sourceToEdit.date)
      setDate(dateFormat)
    }
  },[props.sourceToEdit])

  useEffect(() => {
    const getFormData = localStorage.getItem(props.label)
    if(typeof getFormData === 'string') {
      setFormData(JSON.parse(getFormData))
    }

    const getTotalIncome = localStorage.getItem("Total Income")
    if(typeof getTotalIncome === 'string' && props.label === 'expenses') {
      setTotalIncome(JSON.parse(getTotalIncome))
    }
  },[props.label])

  const handleOnAmountChange = (e: any) => {
    const incomingAmount = e.target.value
    if(props.label === 'expenses' && incomingAmount > totalIncome) {

    }
    setAmount(e.target.value)
  }

  const handleOnDateChange = (e: any) => {
    setDate(e)
  }

  const handleOnSubmit = async() => {
    const value = formData.length ? [...formData, {source, amount, date}] : [{source, amount, date}]
    await localStorage.setItem(props.label,JSON.stringify(value))
  }

  return (
      <Box
        component={"form"}
        sx={{
          '& .MuiTextField-root':{m:1,width:'25ch'}
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <div>
          <TextField
            required
            label={"Source of " + props.label.toLocaleLowerCase()}
            placeholder={placeholder}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <TextField
            required
            label={"Amount of " + props.label.toLocaleLowerCase()}
            type="number"
            placeholder="amount"
            InputProps={{
              inputProps:{min: 0}
            }}
            value={amount}
            onChange={(e) => handleOnAmountChange(e)}
          />
          <TextField
            id="date"
            label={"Date of " + props.label.toLocaleLowerCase()}
            type="date"
            sx={{width: 220}}
            InputLabelProps={{
              shrink:true, required:true
            }}
            defaultValue={date}
            onChange={(e) => handleOnDateChange}
          />

        </div>

      <button type="submit">Add {props.label}</button>
    </Box>
  );
};

export default Form;
