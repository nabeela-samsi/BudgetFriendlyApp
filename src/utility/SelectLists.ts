const SourceLists = (type: string) => {
    let result: string[] = []
    if(type === 'Income') {
        result = ['Salary', 'House Rent', 'Shop Rent', 'Business', 'Side Business', 'Other']
    }
    if(type === 'Expense') {
        result = ['Rent', 'Fuel', 'Holiday', 'Transportation', 'Shopping', 'Party', 'Loan', 'Personal', 'Health Care', 'Child Care', 'Family', 'Grocery', 'Food', 'Other']
    }
    return result
}

export default SourceLists