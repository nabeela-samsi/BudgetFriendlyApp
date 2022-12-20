import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const SetData = (props:{type: string, label:string}) => {
    const buttonName = (props.type === "target") ? "Set" : "Transfer"
    const [value, setValue] = useState("0")

    useEffect(() => {
        if(props.type === "target") {
            const getData =  localStorage.getItem(props.type)
            if(typeof getData === 'string'){
                const parse = JSON.parse(getData)
                setValue(parse)
            }
        }
    },[props.type])

    const handleSetValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       localStorage.setItem(props.type,JSON.stringify(value))
    }

    return(
        <Box
            component={"form"}
            noValidate
            autoComplete="off"
            className="form"
        >
            <TextField
                required
                sx={{mb:2}}
                label={props.label}
                type="number"
                placeholder="amount"
                InputProps={{
                inputProps:{min: 1}
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="contained" type="submit" sx={{mt:2}} onClick={(e) => handleSetValue(e)}>{buttonName}</Button>
        </Box>
    )
}

export default SetData