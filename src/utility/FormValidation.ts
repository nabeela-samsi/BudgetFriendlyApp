const FormValidation = async(incomingAmount: string,type: string) => {
    let result = {message: '', error: false}
    let getCurrentBalance = await localStorage.getItem("balance")
    let getSavingsBalance = await localStorage.getItem("savings")
    let checkExepense = (type === 'Expense' && Number(incomingAmount) > Number(getCurrentBalance))
    let checkSavings = (type === 'savings' && Number(incomingAmount) > Number(getCurrentBalance))
    let checkTransfer = (type === 'transfer' && Number(incomingAmount) > Number(getSavingsBalance))

    const regExp = /^0[0-9].*$/
    const messageKeyword = (type === 'Expense') ? 'spend' : 'transfer'

    if(regExp.test(incomingAmount)){
      result.message = 'Please dont start the amount value with 0'
      result.error = true
    } else if(checkExepense || checkSavings || checkTransfer) {
        result.message = `You dont have sufficient money to ${messageKeyword}`
        result.error = true
    }
    return result
}

export default FormValidation