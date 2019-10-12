var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});
  
app.get('/api/timestamp/:date_string', function(req, res) {
  console.log(req.params.date_string);
})  

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});