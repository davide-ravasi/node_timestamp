var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});
  
app.get('/api/timestamp/:date_string', function(req, res) {
  const dateString = req.params.date_string;
  const formattedDate = new Date(dateString);
  const unixDate = Date.parse(formattedDate);
  console.log("unix date" + Date.parse(formattedDate));
  res.send(formattedDate);
  //res.send(unixDate);
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});