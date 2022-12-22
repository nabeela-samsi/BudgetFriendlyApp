import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import uuid4 from "uuid4"

import { FormDataType } from "../types/FormType";
import { CommonType } from "../types/CommonType";
import FormValidation from "../utility/FormValidation";
import SourceLists from "../utility/SelectLists";

const Form = ({type, idToEdit, label}: CommonType) => {
  const [source, setSource] = useState('None')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState<Date |null>(new Date())
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldError, setFiledError] = useState('')
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(false)
  const [sourceLists, setSourceLists] = useState<string[]>([])

  useEffect(() => {
    setLoading(true)
    const getFormData = localStorage.getItem(type)
    if(typeof getFormData === 'string') {
      setFormData(JSON.parse(getFormData))
    }
    setSourceLists(SourceLists(type))
    setLoading(false)
  },[type])

  useEffect(() => {
    setLoading(true)
    if(idToEdit && formData.length) {
      const getSpecificData: FormDataType[]= formData.filter((data: FormDataType) => data.id === idToEdit)
      setSource(getSpecificData[0].source)
      setAmount(getSpecificData[0].amount)
      setDate(getSpecificData[0].date)
    }
    setLoading(false)
  },[idToEdit, formData])

  const handleOnAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    FormValidation(e.target.value, type, source).then(result => {
      if(result.error) {
          setErrorMsg(result.message)
          setFiledError(result.field)
      }
    })
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
          <Autocomplete
            disablePortal
            sx = {{mb:2}}
            id = {`${type}-sourcelist`}
            options = {sourceLists}
            getOptionLabel = {(option: string) => option}
            value={source}
            onInputChange = {(_,value) => setSource(value)}
            renderInput = {(params) => <TextField {...params} label = {"Source of " + type.toLocaleLowerCase()}  error = {(fieldError === 'Source')}
            helperText = {fieldError === 'Source' && errorMsg} required/> }
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
            error = {(fieldError === 'Amount')}
            helperText = {errorMsg && fieldError === 'Amount'}
          />
          <LocalizationProvider
            dateAdapter = {AdapterDayjs}
            sx = {{mb:2}}
          >
            <DatePicker
              label = {"Date of " + type.toLocaleLowerCase()}
              value = {date}
              onChange = {(newDate): void => setDate(newDate)}
              renderInput = {(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>
          <Button
            variant = "contained"
            type = "submit"
            sx = {{mt:2}}
            disabled = {fieldError.trim.length > 0 ? true : false}
          >
            {label} {type}
          </Button>
        </Box>
      }
    </>
  );
};

export default Form;
