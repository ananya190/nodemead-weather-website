const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const hbs = require("hbs");
// hbs is required as a module for partials, but you don't need to
// require it to set it as your view engine
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const name = "Ananya George";

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name,
    description: "About me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    name,
    description: "This is the help page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, response) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          location,
          forecast: response,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("not-found", {
    name,
    title: "Help Not Found",
    errorMsg: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("not-found", {
    name,
    title: "Page Not Found",
    errorMsg: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
}); // start server and listen on this port
