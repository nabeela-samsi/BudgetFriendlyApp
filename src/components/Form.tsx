import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import uuid4 from "uuid4"
import { FormDataType } from "../types/FormType";
import { CommonType } from "../types/CommonType";


const Form = ({type, idToEdit, label}: CommonType) => {
  const placeholder = type === "Expense" ? "Electricity bill" : "Salary";

  const [source, setSource] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState<string | null | Date>(new Date())
  const [errorMsg, setErrorMsg] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFormData = localStorage.getItem(type)
    if(typeof getFormData === 'string') {
      setFormData(JSON.parse(getFormData))
    }
  },[type])

  useEffect(() => {
    if(idToEdit && formData.length) {
      setLoading(true)
      const getSpecificData: FormDataType[]= formData.filter((data: FormDataType) => data.id === idToEdit)
      setSource(getSpecificData[0].source)
      setAmount(getSpecificData[0].amount)
      setDate(getSpecificData[0].date)
    }
    setLoading(false)
  },[idToEdit, formData])

  const handleOnAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const incomingAmount = e.target.value
    const getCurrentBalance = localStorage.getItem("balance")
    const regExp = /^0[0-9].*$/


    if(regExp.test(incomingAmount)){
      setErrorMsg('Please dont start the amount value with 0')
      setErrorFlag(true)
    } else if(type === 'Expense' && Number(incomingAmount) > Number(getCurrentBalance)) {
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
    if(idToEdit && idToEdit.length) {
       dataList = formData.map((data: FormDataType) => {
          if(data.id === idToEdit) {
            return {id:idToEdit, source, amount, date}
          }
          return data
       })
    } else {
      const id = uuid4()
      dataList = formData.length ? [...formData, {id, source, amount, date}] : [{id, source, amount, date}]
    }
    await localStorage.setItem(type,JSON.stringify(dataList))
    const action = (label === 'ADD') ? "added" : "updated"
    window.alert(`${type} ${action} successfully`)
    setSource('')
    setAmount(0)
    setDate(new Date())
  }

  return (
    <>
      {
        loading ? <CircularProgress/> :
        <Box
          component = "form"
          autoComplete = "off"
          onSubmit = {(e) => handleOnSubmit(e)}
          className = "form"
        >
          <TextField
            required
            sx = {{mb:2}}
            type = {"Source of " + type.toLocaleLowerCase()}
            placeholder = {placeholder}
            value = {source}
            onChange = {(e) => setSource(e.target.value)}
          />
          <TextField
            required
            sx = {{mb:2}}
            label = {"Amount of " + type.toLocaleLowerCase()}
            type = "number"
            placeholder = "amount"
            InputProps = {{
              inputProps:{min: 1},
              startAdornment: <InputAdornment position="start">€</InputAdornment>
            }}
            value = {amount}
            onChange = {(e) => handleOnAmountChange(e)}
            error = {(errorFlag)}
            helperText = {errorFlag && errorMsg}
          />
          <LocalizationProvider
            dateAdapter = {AdapterDayjs}
            sx = {{mb:2}}
          >
            <DatePicker
              label = {"Date of " + type.toLocaleLowerCase()}
              value = {date}
              onChange = {(e: Date | null) => setDate(e)}
              renderInput = {(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>
          <Button
            variant = "contained"
            type = "submit"
            sx = {{mt:2}}
            disabled = {errorFlag ? true : false}
          >
            {label} {type}
          </Button>
        </Box>
      }
    </>
  );
};

export default Form;
