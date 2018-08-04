/*
	This is the balance controller file. dotenv is used to access the stored variables inside the .env file.
	It exports 3 different functions - fetchBalance, showBalance, showAllBalances.
*/
require('dotenv').config();
const Balance = require('../models/balance'),
	fetch = require('node-fetch'),
	port = process.env.PORT || 8080;

module.exports = {
	fetchBalance: fetchBalance,
	showBalance: showBalance,
	showAllBalances: showAllBalances
}

// This function fetches balance from the etherscan API and loads it into the mongoDB database 
// This is an exclusive fetch from the API (if you have fetched transactions for a specific address, it's balance is already fetched)
function fetchBalance(req, res){
	var walletAddr = req.query.addr;
	var balanceAddr = 'https://api.etherscan.io/api?module=account&action=balance&address='+walletAddr+'&tag=latest&apikey='+process.env.API_KEY;
	var newBalance = new Balance();
	//console.log("starting promise");
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
				res.render('pages/singleBal', {bal:newBalance});
			})
		});	
}

/* This function shows the balance of a particular wallet address (stored in the balance collection).
   To find balance of an account, use the following link: http://localhost:8080/balance/search?addr=<wallet-address>
*/
function showBalance(req,res){
	var walletAddr = req.query.addr;
	Balance.findOne({address: walletAddr}, (err,bal) =>{
		if (err) {
      		res.status(404);
      		res.send('Balance/Address not found!');
    	}
    	res.render('pages/singleBal', {bal:bal});	
	});
}

// This function shows all the balances in the underlying balance collection
function showAllBalances(req, res){
	Balance.find({}, (err,bals) =>{
		if(err){
			res.status(404);
			res.send('Balances not found!');
		}
		res.render('pages/balances.ejs',{bals:bals});
	})
}