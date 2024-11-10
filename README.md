#  Dollarguard :dollar: :lock:  

Personal project to learn Angular and back-end development.

:fire: [Live site](https://dollarguard.pages.dev/login)
##  Currently working on: Integrating custom categories for each user

##  Todo in general

- Figure out how to handle when users delete a category that have exisiting expenses tied to the deleted category

- Add loading state while retrieving user years for year selection component

- Add loading state while expenses are being added and table is loading

- Allow users to add their own categories

- Allow users to adjust their monthly budget

- Enable fourth monthly stat card for which expense has the highest dollar amount

- Add comma formatting to the expenses amount displayed in the expenses table

- Use .pipe() and tap() operator instead of subscribing in the expense service

- Add create expense for a particular year in the expenses page in the year selection page

- Create component for error handling when logging in or signing up

- Look into preventing user from making too many login & sign up requests with invalid credentials or duplicate email for sign up

- Look into creating reusable components with input fields with icons on the side

- Update toast messages service to contain list of options for parameters

##  Todo: Expense Form (not high priority)

- Add character count to notes text input field

- Remove outline from date field when clicking away

- Remove the ability to click in the month title to navigate the calendar

- Fix bug where if user leaves category option clicked error message displays

- Allow cents expenses

##  Design/create todos

- Design how expenses table and percentage overview sections will look when there are zero expenses

- Design how years selection page will look like when there is zero years for the user's account

##  Known defects

- If a category has a big expense it will occupy 100% of the percentage overview area

- Users can start editing an expense and then delete the expense before updating it (causing a 400 bad request error)


##  Maybe future features

- Add support for different types of currencies

- Add in the future maybe query params to tell the user they have been logged out for a reason