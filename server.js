// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date?", (req, res, next) => {
  const integerDate = parseInt(req.params.date, 10);
  if (req.params.date === undefined) {
    const timestamp = Date.now();
    res.send({ unix: timestamp, utc: new Date().toUTCString() });
  } else if (integerDate == req.params.date) {
    const date = new Date(integerDate);
    if (date.toString() === "Invalid Date") {
      res.send({ error: "Invalid Date" });
    }
    res.send({ unix: integerDate, utc: date.toUTCString() });
  } else {
    const timestamp = Date.parse(req.params.date);
    const date = new Date(timestamp);
    if (date.toString() === "Invalid Date") {
      res.send({ error: "Invalid Date" });
    }
    res.send({ unix: timestamp, utc: date.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
