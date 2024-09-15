# Dollarguard :dollar: :lock: 

Personal project to learn Angular and everything involded with it.

## Currently working on: User Authentication

## Todo: Expense Form (not high priority)
- Add character count to notes text input field
- Remove outline from date field when clicking away
- Remove the ability to click in the month title to navigate the calendar
- Fix bug where if user leaves category option clicked error message displays
- Allow cents expenses

## Todo in general
- Enable fourth monthly stat card for which expense has the highest dollar amount
- Look into moving validations of params to their on validator constraint
- Add comma formatting to the expenses amount displayed in the expenses table
- Use NestJS HttpExceptions enums instead of using hard coded status codes
- Use .pipe() and tap() operator instead of suscribing in the expense service
- Move validation from NestJS controller to services instead
- Add create expense for a particular year in the expenses page in the year selection page
- Create component for error handling when logging in or signing up
- Look into preventing user from making too many login & sign up requests with invalid credentials or duplicate email for sign up
- Look into anything security wise before fully finishing the auth process
- Update auth.guard.ts in server to check if the token has not expired because we are only checking if the token is present or not
- Look into creating reusable components with input fields with icons on the side
- Create service for toast message to handle expense deletion toast message from the expense table component
- Add loading state while retrieving user years for year selection component

# Design/create todos
- Design how expenses table and percentage overview sections will look when there are zero expenses
- Design how years selection page will look like when there is zero years for the user's account

# Known defects
- If a category has a big expense it will occupy 100% of the percentage overview area
- Users can start editing an expense and then delete the expense before updating it (causing a 400 bad requet error)

# Maybe future features
- Add support for different types of currencies
- Add in the future maybe query params to tell the user they have been logged out for a reason

# Things Done (Front-End Auth)
- Handle errors if user enter wrong credentials
- Handle errors if user enter an exisiting email when signing up

# Things Done (Back-End Auth)
- Add HttpOnly when creating cookies