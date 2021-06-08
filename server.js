var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
    let utcString = new Date().toUTCString();
    let unixTime = Date.now()
    res.json({"unix": unixTime,"utc": utcString});
});

app.get("/api/:date", function (req, res) {
  let year = 0, month = 0, day = 0;
  if(req.params.date){
    const splitDate = req.params.date.split("-");
    year = splitDate[0] || 0;
    month = splitDate[1]-1 || 0;
    day = splitDate[2] || 0;
  }
  if(req.params.date.split(" ").length === 3)req.params.date = Date.parse(req.params.date)
  let utcString = new Date(Date.UTC(year, month, day, 0, 0, 0)).toUTCString();
  let unixTime = new Date(req.params.date).getTime()
  if(new Date(Number(req.params.date)).toUTCString() !== "Invalid Date") {
    utcString = new Date(Number(req.params.date)).toUTCString();
    unixTime = Number(req.params.date);
  }
  if(utcString && utcString !== "Invalid Date") res.json({"unix": unixTime,"utc": utcString});
  else res.json({"error": utcString});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
