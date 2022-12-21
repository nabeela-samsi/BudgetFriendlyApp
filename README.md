# Budget friendly app

Welcome to budget friendly app project. It is a simple and user friendly application built using React TypeScript template.

## Tech Stack used

- TypeScript
- HTML
- SCSS

## Prerequsities

- In terminal run
    - npm i

## How to start the application?

- in terminal run
    - npm run start

## How it is helpful?

- We can add / update / delete the Income and Expenses records
- We can set specific target
- We are able to see incomes and expenses history.
- If we have balance in current account we can transfer the amount from current to the savings account and vice versa.
- Current Balance is calculated from incomes, expenses, savings and transfered amount. `totalIncome + transfered money - totalExpenses - savings`
- The progress bar is calculated if target set and there is a balance in savings. `(savings / target)*100`
- Required validations are taken care like below
    - while adding income / expense, the source, amount and date are required fields.
    - while adding income / expense /traget / transfering the money amount is required and cannot be 0 or less than 1
    - the app doesnt allow to add the amount of expense more than the current balance
    - while using transfer to savings account, the given amount should not be greater than the current balance
    while using transfer to current account, the given amount should not be greater than the savings balance

## Demo

- Here you can check the work. [Budget Friendly App](https://ephemeral-madeleine-5fd95a.netlify.app/)