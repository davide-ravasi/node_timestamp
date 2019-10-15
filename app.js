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
  console.log(dateString);
  let formattedDate = new Date(dateString);
  let unixDate = Date.parse(formattedDate).toString();
  let response = "";
  console.log(/^\d*$/.test(req.params.date_string));
  if(new Date(dateString) == 'Invalid Date') {
    response = "Invalid Date";
    res.json({"error" : "Invalid Date" })
  } else {  
    res.json({"unix": unixDate, "utc" : formattedDate });
  }
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// SPECIFICATIONS
// ERROR {"error" : "Invalid Date" }
// VALID {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
// EMPTY new Date();