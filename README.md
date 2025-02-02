#  Dollarguard :dollar: :lock:  

Personal project to learn Angular and back-end development.

:fire: [Live site](https://dollarguard.pages.dev/login)

##  Currently working on: allowing users to delete years that they are tracking

##  Todo in general

- Do different view for mobile users for the expenses table

- Do different view for mobile users for the percentage overview section

- Update header

- Add delete option for specific year (in case user enters the wrong year in the new active year form)

- Add loading state for monthly cards when editing and fetching data

- Add fomatting to the rest of the monthly stats cards

- Prevent user from pasting values in any of the p-inputNumber elements

- Figure out how to handle when users delete a category that have exisiting expenses tied to the deleted category

- Add loading state while expenses are being added and table is loading

- Enable fourth monthly stat card for which expense has the highest dollar amount

- Create component for error handling when logging in or signing up

- Look into preventing user from making too many login & sign up requests with invalid credentials or duplicate email for sign up

- Update toast messages service to contain list of options for parameters

- Make month selector draggable certain viewport

- Sort year selection page from oldest to most current year

- On mobile switch date component to use native input date instead of Primeng datepicker

- When filtering is implemented add the total current expenses for the active category being filtered

- Update expenses table with new category if the new category already existed. It should include the new color

- Create button in login screen to be able to login with test account (so setup isn’t required to test the app)

##  Todo: Expense Form (not high priority)

- Look into creating reusable components with input fields with icons on the side

- Remove outline from date field when clicking away

- Remove the ability to click in the month title to navigate the calendar

- Fix bug where if user leaves category option clicked error message displays

- Fix rounding issue with budget left card (and problably the rest of the cards)

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

- Add filtering by category for the expenses table