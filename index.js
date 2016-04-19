var express = require("express");
var session = require("express-session");
var bcrypt = require("bcrypt");

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

  bcrypt.hash("secretpass", 10, function(err, hash) {
    // add the crypted password to the session
    req.session.password = hash;

    // send the entire session back
    res.send(req.session);
  });
});

app.listen(3000);
