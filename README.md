# Challlenge: Building a Node.js/Express.js App with REST API

In this tutorial, we'll guide you through building a Node.js/Express.js app that serves a REST API. The app will handle accounts, agreements, and submissions. We will use SQLite as the database and Sequelize as the ORM to interact with it. Additionally, we'll include instructions for setting up the frontend using Next.js and demonstrate calls to the backend endpoints.

## Step 1: Project Setup

1. Navigate to the root directory.

2. Create a new local repository for this project.

3. Make sure you have Node.js installed (preferably the LTS version).

4. Navigate to backend directory `cd ./back`.

5. Install the required dependencies by running the command: `npm install`.

6. Seed the local SQLite database with sample data by running: `npm run seed`. Note that this command will drop the database if it already exists.

7. Confirm that the database file `database.sqlite3` is present in your repository.

8. Start the server and the React client together by running: `npm start`.

9. Verify that the server is running on port 3001.

## Step 2: Understand Data Models

The application has three main data models: Account, Agreement, and Submission. Let's understand them:

```text
find mode informatio in `/back/models`
```

- Account:
  - An account can be either a `buyer` or a `supplier`.
  - Buyers create agreements with suppliers, and suppliers do submissions for buyers.
  - Each account has a `balance` property.

- Agreement:
  - An agreement is a contract between a buyer and a supplier.
  - Agreements can have three statuses: `new`, `in_progress`, or `terminated`.
  - Agreements are considered active only when they are in the `in_progress` status.
  - Agreements group submissions within them.

- Submission:
  - A submission represents the work done by a supplier for a buyer under a specific agreement.
  - Suppliers get paid for submissions completed for buyers under a certain agreement.

## Step 3: Implementing the APIs

Let's start implementing the required APIs for the application.

1. **_GET_** `/agreements/:id` - Create an endpoint that return the agreement only if it belongs to the calling account.

2. **_GET_** `/agreements` - Return a list of agreements belonging to the user (buyer or supplier) where the agreements are not terminated.

3. **_GET_** `/submissions/unpaid` - Get all unpaid submissions for a user (either a buyer or supplier) but only for active agreements.

4. **_POST_** `/submissions/:submission_id/pay` - Implement this API to allow buyers to pay for a submission. A buyer can only pay if their balance is greater than or equal to the amount to pay. The amount should be moved from the buyer's balance to the supplier's balance.

5. **_POST_** `/balances/deposit/:accountId` - Implement the API to allow buyers to deposit money into their balance. A buyer can't deposit more than 10% of their total submissions to pay at the moment of deposit.

6. **_GET_** `/admin/best-supplier-profession?start=<date>&end=<date>` - Implement this API to return the best buyer profession that earned the most money (sum of submissions paid) for any supplier who worked in the specified time range.

7. **_GET_** `/admin/best-buyers?start=<date>&end=<date>&limit=<integer>` - Implement this API to return the buyers who paid the most for submissions in the given time period. The result should be limited based on the query parameter `limit`, with the default limit set to 3.

## Step 4: Task for Frontend Development with Next.js

For the frontend development, we'll use Next.js to create a simple demonstration of the application that makes calls to the freshly implemented APIs.

1. Navigate to backend directory `cd ./front`.

2. Install the required dependencies by running the command: `npm install`.

3. Start the server and the React client together by running: `npm run dev`.

4. Verify that the server is running on port 3000.

5. Create a page to display the user's agreements. Fetch data from the `/agreements` API.

6. Create a page to display the unpaid submissions for the user. Fetch data from the `/submissions/unpaid` API.

7. Implement a feature on the submission's page that allows the user (buyer) to pay for a submission by calling the `/submissions/:submission_id/pay` API.

8. Create a page for the user to deposit money into their balance using the `/balances/deposit/:accountId` API.

9. Create an admin page that shows the best profession using the `/admin/best-supplier-profession` API, and another page that shows the best buyers using the `/admin/best-buyers` API.

## Going Extra Mile

If you have extra time and want to impress, consider adding the following:

- Write unit tests for your backend APIs using a testing framework like Jest.

- Use transaction for inserts or updates.

- Create a visually appealing frontend with custom styling using CSS or a UI library like Tailwind Css or Ant Design.

- Implement authentication and user registration to secure certain parts of the application.

- Add pagination and filtering options for the agreements and submissions list.

## Submission

Once you've completed the assignment, zip your repository (including the .git folder) and send it to the specified email address.
