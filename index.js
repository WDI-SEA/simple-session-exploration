var express = require("express");
var session = require("express-session");

var app = express();
app.use(session({
  secret: 'mooncheese',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  req.getUser = function() {
    return session.user;
  }
  next();
});

app.get("/", function(req, res) {
  // pick a random number from 0-9
  var ran = Math.floor(Math.random() * 10);

  // set the value of the session at that number to a random decimal.
  req.session[ran] = Math.random();

  // send the raw session object back as data to the server
  res.send(req.session);
});

app.listen(3000);
