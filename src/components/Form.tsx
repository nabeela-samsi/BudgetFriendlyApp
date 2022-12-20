import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import uuid4 from "uuid4"


const Form = (props: {label: string, idToEdit?: string}) => {
  const placeholder = props.label === "Expenses" ? "Electricity bill" : "Salary";
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState("0")
  const [date, setDate] = useState<Date | null>(new Date())
  const [errorMsg, setErrorMsg] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)
  const [formData, setFormData] = useState([])

  useEffect(() => {
    const getFormData = localStorage.getItem(props.label)
    if(typeof getFormData === 'string') {
      setFormData(JSON.parse(getFormData))
    }
  },[props.label])

  useEffect(() => {
    if(props.idToEdit && formData.length) {
      const getSpecificData: any = formData.filter((data: any) => data.id === props.idToEdit)
      setSource(getSpecificData[0].source)
      setAmount(getSpecificData[0].amount)
      setDate(getSpecificData[0].date)
    }
  },[props.idToEdit, formData])

  const handleOnAmountChange = (e: any) => {
    const incomingAmount = e.target.value
    const getCurrentBalance = localStorage.getItem("balance")
    console.log(props.label === 'Expenses')
    if(props.label === 'Expenses' && incomingAmount > Number(getCurrentBalance)) {
        setErrorMsg('You dont have sufficient money to spend')
        setErrorFlag(true)
    } else {
      setErrorMsg('')
      setErrorFlag(false)
    }
    setAmount(e.target.value)
  }

  const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    let dataList
    if((props.idToEdit)) {
       dataList = formData.map((data: any) => {
          if(data.id === props.idToEdit) {
            return {id:props.idToEdit, source, amount, date}
          }
          return true
       })
    } else {
      const id =uuid4()
      dataList = formData.length ? [...formData, {id, source, amount, date}] : [{id, source, amount, date}]
    }
    await localStorage.setItem(props.label,JSON.stringify(dataList))
    window.alert(`${props.label} added successfully`)
    setSource('')
    setAmount("0")
    setDate(new Date())
  }

  return (
    <Box
      component={"form"}
      autoComplete="off"
      onSubmit={(e) => handleOnSubmit(e) }
      className="form"
    >
      <TextField
        required
        sx={{mb:2}}
        label={"Source of " + props.label.toLocaleLowerCase()}
        placeholder={placeholder}
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <TextField
        required
        sx={{mb:2}}
        label={"Amount of " + props.label.toLocaleLowerCase()}
        type="number"
        placeholder="amount"
        InputProps={{
          inputProps:{min: 1}
        }}
        value={amount}
        onChange={(e) => handleOnAmountChange(e)}
        error={(errorFlag)}
        helperText={errorFlag && errorMsg}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{mb:2}}>
        <DatePicker
          label={"Date of " + props.label.toLocaleLowerCase()}
          value={date}
          onChange={(e: Date | null) => setDate(e)}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit" sx={{mt:2}} disabled={errorFlag ? true : false} >
        Add {props.label}
      </Button>
    </Box>
  );
};

export default Form;
