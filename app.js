var express = require("express");
var app = express();

app.get('/api/timestamp/', function(req,res) {
    let newDate = new Date();
    let newUnixDate = Date.parse(newDate).toString();
    res.json({"unix": newUnixDate, "utc" : newDate })
})
  
app.get('/api/timestamp/:date_string', function(req, res) {
  let dateString = req.params.date_string;
  
  if(isNaN(Date.parse(dateString)) == true && new Date(dateString*1000) == "Invalid Date") {
    var response = "Invalid Date";
    res.json({"error" : "Invalid Date" })
  } else {
    let unixDate = '';
    let formattedDate = '';
    
    if(dateString.indexOf("-") == -1) {
      unixDate = dateString;
      let a = new Date(dateString * 1000);
      formattedDate = a.toUTCString();
    } else {
      let a = new Date(dateString);
      formattedDate = a.toUTCString();
      unixDate = a.getTime()/1000;
      
    }
    
    res.json({"unix": unixDate, "utc" : formattedDate});
  }
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// SPECIFICATIONS
// ERROR {"error" : "Invalid Date" }
// VALID {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
// EMPTY new Date();