const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');
var   app     = express();


app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


//middleware 
app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method}  ${req.url}`;

	console.log(log);
	fs.appendFileSync('server.log', log + '\n');

	next();

});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		title: 'Home Page',
		message: 'Welcome to hamepage'
	});	 
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		title: 'About Page',
		message: 'welcome to about page'
	});
});


app.listen(3000);