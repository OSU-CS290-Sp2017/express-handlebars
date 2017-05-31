var path = require('path');
var fs = require('fs');
var express = require('express');
var peopleData = require('./peopleData');
var app = express();
var port = process.env.PORT || 3000;

var peoplePageTemplate = fs.readFileSync('./templates/peoplePage.template', 'utf8');
var personCardTemplate = fs.readFileSync('./templates/personCard.template', 'utf8');

app.get('/people', function (req, res, next) {

  var peopleContent = '';
  Object.keys(peopleData).forEach(function (person) {
    var personData = peopleData[person];
    var personCardContent = personCardTemplate.replace(new RegExp("{{url}}"), "/people/" + person)
      .replace(new RegExp("{{name}}"), personData.name);

    peopleContent += personCardContent;
  });

  res.status(200).send(peoplePageTemplate.replace(new RegExp("{{people}}"), peopleContent));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
