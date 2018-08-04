/*
	This is the transaction model file. The application uses mongoose to connect to the local database.
*/
const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Creating Transaction schema
const txnSchema = new Schema({
	blockNumber: String,
	timeStamp: String,
	hash: {
		type: String,
		unique: true
	},
	nonce: String,
	blockHash: String,
	transactionIndex: String,
	from: String,
	to: String,
	value: String,
	gas: String,
	gasPrice: String,
	isError: String,
	txreceipt_status: String,
	input: String,
	contractAddress: String,
	cumulativeGasUsed: String,
	gasUsed: String,
	confirmations: String,
	balance: String
});


//Creating model
const txnModel = mongoose.model('Transaction', txnSchema);

//exporting the model
module.exports = txnModel;