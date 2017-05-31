var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
var app = express();
var port = process.env.PORT || 3000;

var peoplePageTemplate = fs.readFileSync('./templates/peoplePage.template', 'utf8');
var personCardTemplate = fs.readFileSync('./templates/personCard.template', 'utf8');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/people', function (req, res, next) {

  var templateArgs = {
    people: peopleData
  };

  res.render('peoplePage', templateArgs);

});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
