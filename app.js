var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get('/api/timestamp/', function(req,res) {
    let newDate = new Date();
    let newUnixDate = Date.parse(newDate).toString();
    res.json({"unix": newUnixDate, "utc" : newDate })
})
  
app.get('/api/timestamp/:date_string', function(req, res) {
  let dateString = req.params.date_string;
  let formattedDate = new Date(dateString);
  let unixDate = Date.parse(formattedDate).toString();
  let response = "";
  console.log("test date url");
  console.log(/^\d*$/.test(req.params.date_string));
  if(new Date(dateString) == 'Invalid Date') {
    response = "Invalid Date";
    res.json({"error" : "Invalid Date" })
  } else {  
    if(dateString > 0) {
      var date = new Date(dateString*1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      res.json({"unix": dateString, "utc" : formattedTime });
    } else {
      res.json({"unix": unixDate, "utc" : formattedDate });
    }
    
    
  }
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// SPECIFICATIONS
// ERROR {"error" : "Invalid Date" }
// VALID {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
// EMPTY new Date();