import { FormDataType } from "../types/FormType";

const CalculateBalance = () => {
  let totalIncome = 0;
  let totalExpense = 0;

  const getListsOfIncomeJSON = localStorage.getItem("Income");
  const getListsOfExpensesJSON = localStorage.getItem("Expense");
  const getTransferedValue = localStorage.getItem("transfer")
  const getSavings = localStorage.getItem("savings")

  if (typeof getListsOfIncomeJSON === "string") {
    const getListsOfIncome = JSON.parse(getListsOfIncomeJSON);
    totalIncome = getListsOfIncome
      .map((data: FormDataType) => data.amount)
      .reduce((prev: string, next: string) =>  parseFloat(prev) + parseFloat(next), 0);
  }

  if (typeof getListsOfExpensesJSON === "string") {
    const getListsOfExpenses = JSON.parse(getListsOfExpensesJSON);
    totalExpense = getListsOfExpenses
      .map((data: FormDataType) => data.amount)
      .reduce((prev: string, next: string) =>  parseFloat(prev) + parseFloat(next), 0);
  }

  const calcCurrentBal = Number(totalIncome) + Number(getTransferedValue) - Number(totalExpense) - Number(getSavings)
  localStorage.setItem("balance", JSON.stringify(calcCurrentBal))

  return calcCurrentBal
};

export default CalculateBalance;
