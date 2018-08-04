require('dotenv').config();

const express = require("express"),
	app = express(),
	port = process.env.PORT || 8080,
	expressLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	bodyParser     = require('body-parser'),
  	expressValidator = require('express-validator');



app.use(express.static(__dirname + '/public'));


//Connect to db
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

app.set('view engine','ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(require('./app/routes'));


app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});