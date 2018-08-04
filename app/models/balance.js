/*
	This is the balance model file. The application uses mongoose to connect to the local database.
*/
const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Creating Balance schema
const balanceSchema = new Schema({
	address: {
		type: String,
		unique: true
	},
	balance: String
});


//Creating model
const balanceModel = mongoose.model('Balance', balanceSchema);

//Exporting the model
module.exports = balanceModel;