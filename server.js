// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var monthNames = ["January", "February", "March",
                 "April", "May", "June",
                 "July", "August", "September",
                 "October", "November", "December"];
app.get("/timestamp/:time", 
		function (request, response) {
			var time = parseInt(request.params.time);
			var date = new Date(time);
			if(isNaN(date.getTime())) {
				// date is invalid
				response.end("The date given is invalid");
			}
			var timestamp = {
				unix: date.getTime(),
				natural: monthNames[date.getMonth()] + " " 
            + date.getDate() + ", " 
            + date.getFullYear()
			};
			response.json(timestamp);
		});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
