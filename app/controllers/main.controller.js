/*
	This is the main controller file. It exports a single function claled showHome which displays the main page.
*/
module.exports = {
	showHome: showHome
}
function showHome(req,res){
	res.render('pages/home'); 
}