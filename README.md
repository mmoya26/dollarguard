# Dollarguard :dollar: :lock: 

Personal project to learn Angular and everything involded with it.

## Currently working on: Years selection page

## Todo: Expense Form (not high priority)
- Add character count to notes text input field
- Remove outline from date field when clicking away
- Remove the ability to click in the month title to navigate the calendar
- Fix bug where if user leaves category option clicked error message displays

## Todo in general
- Investigate about pure functions to prevent so many re-renders from Change Detection
- Add fourth monthly stat card for which expense has the highest dollar amount
- Look into moving validations of params to their on validator constraint
- Sort user expense years from latest to oldest
- Sort expenses table from newest to oldest
- Add year indicator in the expenses page
- Add comma formatting to the expenses amount displayed in the expenses table
- Use NestJS HttpExceptions enums instead of using hard coded status codes
- Use .pipe() and tap() operator instead of suscribing in the expense service
- Style success message when creating an expense

# Design/create todos
- Design how expenses table and percentage overview sections will look when there are zero expenses
- Design how years selection page will look like when there is zero years for the user's account

# Known defects
- If a category has a big expense it will occupy 100% of the percentage overview area
- Users can start editing an expense and then delete the expense before updating it (causing a 400 bad requet error)

# Maybe future features
- Add support for different types of currencies