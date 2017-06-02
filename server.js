var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/people', function (req, res, next) {

  var templateArgs = {
    people: peopleData,
    title: "Photos of People"
  };

  res.render('peoplePage', templateArgs);

});

app.get('/people/:person', function (req, res, next) {
  console.log("== url params for request:", req.params);
  var person = req.params.person;
  var personData = peopleData[person];
  if (personData) {
    var templateArgs = {
      photos: personData.photos,
      name: personData.name,
      title: "Photos of People - " + personData.name
    }
    res.render('photosPage', templateArgs);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
