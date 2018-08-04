/*
	This is the routes.js file. It routes the request according to its need. We require all the controllers: main, transaction and balance 
	to use the functions they export.
*/
const express = require('express'),
	router = express.Router(),
	mainController = require('./controllers/main.controller'),
	txnController = require('./controllers/transactions.controller'),
	balController = require('./controllers/balance.controller');


module.exports = router;

//Routes to homepage
router.get('/', mainController.showHome);	

//Shows all the documents available in the transactions collection
router.get('/transactions', txnController.showTransactions);
//Searches for a transaction in the database
router.get('/transactions/search', txnController.searchTransactions);
//Fetches the list of transactions from the Etherscan API
router.post('/transactions/fetch', txnController.fetchTransactions);
//Shows a single transaction from the underlying database
router.get('/transactions/:hash', txnController.showSingleTransaction);


//Shows all the documents available in the balance collection
router.get('/balance', balController.showAllBalances);
//Fetches balance for a particular address from the API
router.get('/balance/fetch', balController.fetchBalance);
//Searches for a balance in the underlying database
router.get('/balance/search', balController.showBalance);