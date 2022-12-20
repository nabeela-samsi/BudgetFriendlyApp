import { useEffect, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import uuid4 from "uuid4"
import { FormDataType } from "../types/FormType";
import { CommonType } from "../types/CommonType";


const Form = ({label,idToEdit}: CommonType) => {
  const placeholder = label === "Expenses" ? "Electricity bill" : "Salary";

  const [source, setSource] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState<string | null | Date>(new Date())
  const [errorMsg, setErrorMsg] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)
  const [formData, setFormData] = useState([])

  useEffect(() => {
    const getFormData = localStorage.getItem(label)
    if(typeof getFormData === 'string') {
      setFormData(JSON.parse(getFormData))
    }
  },[label])

  useEffect(() => {
    if(idToEdit && formData.length) {
      const getSpecificData: FormDataType[]= formData.filter((data: FormDataType) => data.id === idToEdit)
      setSource(getSpecificData[0].source)
      setAmount(getSpecificData[0].amount)
      setDate(getSpecificData[0].date)
    }
  },[idToEdit, formData])

  const handleOnAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const incomingAmount = e.target.value
    const getCurrentBalance = localStorage.getItem("balance")
    console.log(label === 'Expenses')
    if(label === 'Expenses' && Number(incomingAmount) > Number(getCurrentBalance)) {
        setErrorMsg('You dont have sufficient money to spend')
        setErrorFlag(true)
    } else {
      setErrorMsg('')
      setErrorFlag(false)
    }
    setAmount(parseFloat(e.target.value))
  }

  const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    let dataList
    if((idToEdit)) {
       dataList = formData.map((data: FormDataType) => {
          if(data.id === idToEdit) {
            return {id:idToEdit, source, amount, date}
          }
          return true
       })
    } else {
      const id =uuid4()
      dataList = formData.length ? [...formData, {id, source, amount, date}] : [{id, source, amount, date}]
    }
    await localStorage.setItem(label,JSON.stringify(dataList))
    window.alert(`${label} added successfully`)
    setSource('')
    setAmount(0)
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
        label={"Source of " + label.toLocaleLowerCase()}
        placeholder={placeholder}
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <TextField
        required
        sx={{mb:2}}
        label={"Amount of " + label.toLocaleLowerCase()}
        type="number"
        placeholder="amount"
        InputProps={{
          inputProps:{min: 1},
          startAdornment: <InputAdornment position="start">€</InputAdornment>
        }}
        value={amount}
        onChange={(e) => handleOnAmountChange(e)}
        error={(errorFlag)}
        helperText={errorFlag && errorMsg}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{mb:2}}>
        <DatePicker
          label={"Date of " + label.toLocaleLowerCase()}
          value={date}
          onChange={(e: Date | null) => setDate(e)}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit" sx={{mt:2}} disabled={errorFlag ? true : false} >
        Add {label}
      </Button>
    </Box>
  );
};

export default Form;
