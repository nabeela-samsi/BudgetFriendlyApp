const SourceLists = (type: string) => {
    let result: string[] = []
    if(type === 'Income') {
        result = ['None', 'Salary', 'House Rent', 'Shop Rent', 'Business', 'Side Business', 'Other']
    }
    if(type === 'Expense') {
        result = ['None', 'Rent', 'Fuel', 'Holiday', 'Transportation', 'Shopping', 'Party', 'Loan', 'Personal', 'Health Care', 'Child Care', 'Family', 'Grocery', 'Food', 'Other']
    }
    return result
}

export default SourceLists