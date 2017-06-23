
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var monthNames = ["January", "February", "March",
                 "April", "May", "June",
                 "July", "August", "September",
                 "October", "November", "December"];

function getValidTime(time) {
  if(/^\d+$/.test(time)) {
	  return parseInt(time);

  } else if(/^[A-Z][a-z]+ \d\d?, \d{4}$/.test(time)) {
	  return time;

  } else {
	  throw Error;
  }
}

app.get("/:time", 
		function (request, response) {
			try {
				var time = getValidTime(request.params.time);
			} catch(err) {
				response.send("Invalid timestamp format");
			}

			var date = new Date(time);
			if(isNaN(date.getTime())) {
				// date is invalid
				response.send("The timestamp given is invalid");
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
