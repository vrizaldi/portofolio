// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.get("/timestamp/:time", 
		function (request, response) {
			var time = req.params.time
			var date = new Date(time);
			if(isNaN(d.getTime())) {
				// date is invalid
				response.end("The date given is invalid");
			}
			var timestamp = {
				unix: date.getTime(),
				natural: date.getMonth() + " " + date.getDate() 
						+ ", " + date.getYear();
			};
			response.json(timestamp);
		});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
