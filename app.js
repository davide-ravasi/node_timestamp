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
      let a = new Date(dateString * 1000);
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let year = a.getFullYear();
      var month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let min = a.getMinutes();
      let sec = a.getSeconds();
      let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      res.json({"unix": dateString, "utc" : time});
    } else {
      let formattedDate = new Date(dateString);
      let unixDate = Date.parse(formattedDate);
      res.json({"unix": unixDate, "utc" : formattedDate});
    }
    
    //res.json({"unix": dateString, "utc" : time});
  }
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

// SPECIFICATIONS
// ERROR {"error" : "Invalid Date" }
// VALID {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
// EMPTY new Date();