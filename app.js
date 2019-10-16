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
    if(dateString.indexOf("-") == -1) {
      var a = new Date(dateString * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      res.json({"unix": dateString, "utc" : time});
    } else {
      let formattedDate = new Date(dateString);
      let unixDate = Date.parse(formattedDate);
      res.json({"unix": unixDate, "utc" : formattedDate});
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