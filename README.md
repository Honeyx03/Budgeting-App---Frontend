# Budgeting-App---Frontend
Frontend application for establishing the backend for my Budgtr app. Uses JavaScript, React, Axios, and RESTful Routes

## Budgtr App

Budgtr is a web application that allows users to log their financial transactions. The application incorporates both front-end and back-end components to manage and display financial transactions.

### Deployment URLs
Front-end: https://http://localhost:3000/budget
Back-end: https://http://localhost:0325


### Back-end
The back-end of the application is responsible for managing the financial transactions and providing RESTful API routes to perform CRUD operations on transactions.

#### Resources
The back-end includes a single resource with the following attributes:

* id: A unique identifier for each transaction.
* item_name: String - the name of the transaction (e.g., income, savings, expenses).
* amount: Number - the amount of the transaction.
* date: String - the date of the transaction in the format "MM/dd/yyyy".
* isDeduction: Boolean - indicates whether the transaction is a deduction from the total income.
* category: String - category of the transaction (e.g., income, savings, food, etc.).

### API Routes

1. GET /transactions: Get a list of all transactions.
2. GET /transactions/:id: Get details of an individual transaction.
3. POST /transactions: Create a new transaction.
4. PUT /transactions/:id: Update an existing transaction.
5. DELETE /transactions/:id: Delete a transaction.
6. Not Found: Return an appropriate "Not Found" response for unmatched routes.

### Front-end
The front-end of the application is built using React and provides a user-friendly interface to interact with financial transactions.

#### Pages and Features
1. Index Page: Displays all transactions with a navigation bar and a total account balance at the top. The account balance is color-coded based on its value.
2. Show Page: Shows detailed information about a specific transaction.
3. New Page: Allows users to create a new transaction using a form.
4. Edit Page: Allows users to edit an existing transaction using a form.

#### Navigation
The navigation bar is present on all pages and includes the application name and a button to create a new transaction.

#### Date Format Conversion
The application supports inputting dates in the "MM/dd/yyyy" format. Upon submission, the dates are converted to the "MMMM d, yyyy" format for human readability.

#### Front-end Calculations
The total account balance is calculated based on transaction amounts, considering whether the transaction is an income or deduction. The CSS of the total balance changes color based on its value (green for positive, yellow for near zero, and red for negative).

#### Stretch Goals
For additional features, consider implementing one or more of the following:

* Use a select HTML element to allow users to choose transaction categories from a dropdown menu.
* Display the account balance in the navigation bar on all pages.
* Provide error messages for invalid data during create or edit operations.
* Use the date object for the date field and apply the date input type.
* Add a checkbox or separate input to indicate whether a transaction is a deposit or withdrawal.
* Implement a user login system for viewing/updating transactions.
* Incorporate visualization libraries like Chart.js or D3 to display budget visualizations.

### Credits
Developed by Noni Porter