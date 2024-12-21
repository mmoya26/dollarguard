#  Dollarguard :dollar: :lock:  

Personal project to learn Angular and back-end development.

:fire: [Live site](https://dollarguard.pages.dev/login)

##  Currently working on: small tweaks and bug fixes

##  Todo in general
- Add loading state for monthly cards when editing and fetching data

- Add fomatting to the rest of the monthly stats cards

- Prevent user from pasting values in amount and budget inputs

- Figure out how to handle when users delete a category that have exisiting expenses tied to the deleted category

- Add loading state while expenses are being added and table is loading

- Enable fourth monthly stat card for which expense has the highest dollar amount

- Create component for error handling when logging in or signing up

- Look into preventing user from making too many login & sign up requests with invalid credentials or duplicate email for sign up

- Update toast messages service to contain list of options for parameters

##  Todo: Expense Form (not high priority)

- Look into creating reusable components with input fields with icons on the side

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

- Users can paste values bigger than the max in the budget input field

- If the user creates two categories with the same name both categories get deleted when one is deleted


##  Maybe future features

- Add support for different types of currencies

- Give users option for the percentages overview section to toggle between percentages and total dollar amount per category

- Add create expense for a particular year in the expenses page in the year selection page