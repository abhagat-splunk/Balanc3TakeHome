# Consensys Take Home Assignment

This repo/folder is the take home assignment. 
The problem statement was:
```
This assignment should ideally take between 3-5 hours. The description is intentionally a bit sparse, please feel free to fill in the blanks/extend/interpret. You may use any frameworks, ORMs, libraries as you see fit.

Using node, an http server of your choice (express recommended) and a DB of your choice (mongo or postgres recommended), we would like you to build a server side app with these functions. The endpoints should be written as a standard JSON API, REST API, or GraphQL API.
Accept an Ethereum address as input, and then:
query https://etherscan.io/apis and collects all transactions associated with that address.
store the transactions in the DB.
store the address balances in the DB.
Return transactions of stored ETH address, and accept some form of search params (which params are up to you).
Return stored address balances by ETH address, and any other information about the address you see fit.
Be prepared to explain design choices that you made. Frameworks, libraries, directory structures, coding conventions, et al.
```

Here are a few quick points about the application:
- I am using an MVC architecture for this application.
- The UI or View is majorly used to view the large number of transactions / balances after querying the Etherscan website.
- You can query the balances and transactions seperately and view each transaction on its page. 

# Folder structure
```
|- app
|---- controllers
|------- balance.controller.js
|------- transactions.controller.js
|------- main.controller.js
|---- models
|------- balance.js
|------- txn.js
|---- routes.js
|- node_modules
|- public
|---- css
|------- style.css
|- views
|---- layout.ejs
|---- pages
|------- balances.ejs
|------- home.ejs
|------- singletxn.ejs
|------- txns.ejs
| index.js
| .env
```
# Collections / Models
There are 2 major collections in the application:
1. Transactions (Storing all the transactions)
2. Balance (Storing all the balances)

# How to use the app
- Save the environment variables in the .env folder in the root level of the repo. 
For example:
```
DB_URI = "mongodb://<url>/<db-name>"
API_KEY = "<api-key>"
```
- Start the node server using node / ```nodemon index.js```.
- Open ```http://localhost:8080``` on your browser. This will open the homepage.
- Enter the wallet address on the webpage to fetch the transaction and balance for the account.
- If you want to see already loaded transactions / already loaded balances, please use the navigation bar on the top.
- To search a transaction in the underlying database, try querying using the search query parameters in the URL.
   Example: http://localhost:8080/transactions/search?hash=<Transaction-Hash>
This would render the single transaction view and insert the found transaction.
- To find balance of an account, use: http://localhost:8080/balance/search?addr=<wallet-address>


##### Thanks to Etherscan.io for providing the API.


