import uuid4 from "uuid4"

const IncomeSourceLists = (): Object[] => {
    const sourceLists: Object[] = [[
        { title: 'Salary'},
        {title: 'House Rent'},
        {title: 'Shop Rent'},
        {title: 'Business'},
        {title: 'Others'}
    ]]
    return sourceLists
}

export default IncomeSourceLists