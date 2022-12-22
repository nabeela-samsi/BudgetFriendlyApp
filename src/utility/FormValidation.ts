const FormValidation = async(incomingAmount: string,type: string, source?: string) => {
  let result = {message: '', error: false, field: ''}
  let getCurrentBalance = await localStorage.getItem("balance")
  let getSavingsBalance = await localStorage.getItem("savings")
  let checkExepense = (type === 'Expense' && Number(incomingAmount) > Number(getCurrentBalance))
  let checkSavings = (type === 'savings' && Number(incomingAmount) > Number(getCurrentBalance))
  let checkTransfer = (type === 'transfer' && Number(incomingAmount) > Number(getSavingsBalance))

  const regExp = /^0[0-9].*$/
  const messageKeyword = (type === 'Expense') ? 'spend' : 'transfer'

  if(source === 'None') {
    result.message = 'Please select the source value first'
    result.error = true
    result.field = 'Source'
  }else if(regExp.test(incomingAmount)){
    result.message = 'Please dont start the amount value with 0'
    result.error = true
    result.field = 'Amount'
  } else if(checkExepense || checkSavings || checkTransfer) {
      result.message = `You dont have sufficient money to ${messageKeyword}`
      result.error = true
      result.field = 'Amount'
  }
  return result
}

export default FormValidation