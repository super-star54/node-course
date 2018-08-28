var express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //   res.send("<h1>Hello Express!</h1>");
  res.send({
    name: "Andrew",
    likes: "movies"
  });
});
app.get("/despre", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/home", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "About Page",

    welcomeMessage: "Welcome"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects"
  });
});

app.get("/bad", (req, res) => {
  res.send("There has been an error");
});

app.listen(port);
