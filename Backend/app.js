const express = require("express");
const bodyParser = require("body-parser");

const placesroutes = require("./routes/places-routes");
const usersroutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

//  middleware that ensures we parse incoming request bodies (into jsom objects)
app.use(bodyParser.json());

app.use("/api/places", placesroutes);

app.use("/api/users", usersroutes);
// middleware that activats when no route is returned from the above middleware

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  //hand over to error middleware below
  throw error;
});

// default error handler middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
