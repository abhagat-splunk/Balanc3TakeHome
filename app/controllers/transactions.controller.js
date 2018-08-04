/*
	This is the transaction controller file. dotenv is used to access the stored variables inside the .env file.
	It exports 4 different functions - showTransactions, showSingleTransaction, fetchTransactions, searchTransactions.
*/
require('dotenv').config();
const Transaction = require('../models/txn'),
	fetch = require('node-fetch'),
	port = process.env.PORT || 8080;
const Balance = require('../models/balance');
	
module.exports = {
	showTransactions: showTransactions,
	showSingleTransaction: showSingleTransaction,
	fetchTransactions: fetchTransactions,
	searchTransactions: searchTransactions
}

//show all transactions present in the collection
function showTransactions(req,res) {
	Transaction.find({}, (err,txns) => {
		if (err) {
      		res.status(404);
      		res.send('Txns not found!');
    	}
		res.render('pages/txns', {txns: txns});
	});
}

//This function shows a single transaction (used when the button is pressed to view a txn exclusively)
function showSingleTransaction(req,res) {
	Transaction.findOne({hash: req.params.hash}, (err,txn) => {
		if (err) {
      		res.status(404);
      		res.send('Txns not found!');
    	}
    	res.render('pages/singletxn', {txn:txn});	
	});
}

//This is used to seed the transactions after they are fetched using the etherscan API
function seedTransactions(txns) {
	for(txn of txns){
		var newTxn = new Transaction(txn);
		newTxn.save(function(err,result){
			if(err){
				console.log(err);
			}
		});
	}
}

//This is used to fetch transactions from the API. The wallet address is obtained from the main page textbox and other tokens are obtained from the .env file.
function fetchTransactions(req,res){
	var walletAddr = req.body.addr;
	var txnAddr = 'http://api.etherscan.io/api?module=account&action=txlist&address='+walletAddr+'&endblock=99999999&sort=asc&apikey='+process.env.API_KEY;
	var balanceAddr = 'https://api.etherscan.io/api?module=account&action=balance&address='+walletAddr+'&tag=latest&apikey='+process.env.API_KEY;
	//console.log(fulladdr);
	fetch(txnAddr)
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			return json['result'];
			
		})
		.then(function(txns){
			seedTransactions(txns);
			return txns;		
		})
		.then(function(txns){
			var newBalance = new Balance();
			fetch(balanceAddr)
			.then(function(response){
				return response.json();
			})
			.then(function(balanceResponse){
				newBalance['address'] = walletAddr;
				newBalance['balance'] = balanceResponse['result'];
				newBalance.save(function(err,result){
					if(err){
						console.log(err);
					}
				})
			})
			res.redirect('/transactions');	
		});
}

/* This is used to search a transaction from the transactions collection.
 	To search a transaction in the underlying database, try querying using the search query parameters in the URL.
 	Example: http://localhost:8080/transactions/search?hash=<Transaction-Hash>
   This would render the single transaction view and insert the found transaction.
*/
function searchTransactions(req,res){
	var transHash = req.query.hash;
	console.log(transHash);
	Transaction.findOne({hash:transHash}, (err,txn) => {
		if (err) {
      		res.status(404);
      		res.send('Txns not found!');
      		res.render('pages/error');
    	}
		res.render('pages/singletxn', {txn:txn});
	});
}
