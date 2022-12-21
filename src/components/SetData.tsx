import { Box, Button, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { CommonType } from "../types/CommonType"

const SetData = ({type,label}: CommonType) => {
    const buttonName = (type === "target") ? "Set" : "Transfer"

    const [value, setValue] = useState("0")
    const [errorMsg, setErrorMsg] = useState('')
    const [errorFlag, setErrorFlag] = useState(false)

    useEffect(() => {
        if(type === "target") {
            const getData = localStorage.getItem(type)
            if(typeof getData === 'string'){
                const parse = JSON.parse(getData)
                setValue(parse)
            }
        }
    },[type])

    const handleOnSetValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const incomingAmount = e.target.value
        const getCurrentBalance = localStorage.getItem("balance")
        const getSavingsBalance = localStorage.getItem("savings")

        if((type === 'savings' && Number(incomingAmount) > Number(getCurrentBalance))
            ||
            (type === 'transfer' && Number(incomingAmount) > Number(getSavingsBalance))
        ) {
            setErrorMsg('You dont have sufficient money to transfer')
            setErrorFlag(true)
        } else {
          setErrorMsg('')
          setErrorFlag(false)
        }
        setValue(e.target.value)
    }

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       if(typeof type === 'string'){
            localStorage.setItem(type,JSON.stringify(Number(value)))
       }
    }

    return(
        <Box
            component = {"form"}
            autoComplete = "off"
            className = "form"
        >
            <TextField
                required
                sx = {{mb:2}}
                label = {label}
                type = "number"
                placeholder = "amount"
                InputProps={{
                    inputProps:{min: 1},
                    startAdornment: <InputAdornment position="start">€</InputAdornment>
                }}
                value = {value}
                onChange = {(e) => handleOnSetValue(e)}
                error = {(errorFlag)}
                helperText = {errorFlag && errorMsg}
            />
            <Button
                variant = "contained"
                type = "submit"
                sx = {{mt:2}}
                onClick = {(e) => handleOnSubmit(e)}
                disabled = {errorFlag ? true : false}
            >
                {buttonName}
            </Button>
        </Box>
    )
}

export default SetData