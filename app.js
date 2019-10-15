var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});
  
app.get('/api/timestamp/:date_string', function(req, res) {
  let dateString = req.params.date_string;
  let formattedDate = new Date(dateString);
  let unixDate = Date.parse(formattedDate).toString();
  let response = "";
  console.log(/^\d*$/.test(req.params.date_string));
  if(new Date(dateString) == 'Invalid Date') {
    response = "Invalid Date";
  } else {
    response = unixDate;
  }
  //res.send(formattedDate);
  res.send(response);
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// SPECIFICATIONS
// ERROR {"error" : "Invalid Date" }
// VALID {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
// EMPTY new Date();