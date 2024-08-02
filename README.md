# Dollarguard :dollar: :lock: 

Personal project to learn Angular and everything involded with it.

## Currently working on: Implementing editing expense with backend

## Todo: Expense Form (not high priority)
- Add character count to notes text input field
- Remove outline from date field when clicking away
- Remove the ability to click in the month title to navigate the calendar
- Fix bug where if user leaves category option clicked error message displays

## Todo in general
- Investigate about pure functions to prevent so many re-renders from Change Detection
- Invert expense array to display the latest expenses at the top of the table
- Add fourth monthly stat card for which expense has the highest dollar amount
- Edit specific expense
- Look into moving validations of params to their on validator constraint

# Design todos
- Design how expenses and percentage overview sections will look when there are 0 expenses

# Known defects
- If a category has a big expense it will occupy 100% of the percentage overview area
- Users are allowed to enter a new expense with amount 0