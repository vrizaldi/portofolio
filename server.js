var projects = require("./projects.json");

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static("./public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/get_projects", function(req, res) {
	res.json(projects);
});

app.get("*", function(req, res) {
	res.redirect("/");		// redirect to homepage (only page)
});

// listen for requests :)
const PORT = process.env.PORT ? process.env.PORT : 21701;
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
