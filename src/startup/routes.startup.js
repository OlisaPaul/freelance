// This file determines which of the routes will be used based on the api url
const express = require("express");
const cors = require("cors");
const error = require("../middleware/error.middleware");
const auth = require("../routes/auth.routes");
const job = require("../routes/job.routes");
const users = require("../routes/users.routes");

module.exports = function (app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // if the api is {{baseUrl}}/api/v1/posts, it uses the posts method in the router object

  app.use("/api/v1/auth", auth);
  app.use("/api/v1/jobs", job);
  app.use("/api/v1/users", users);

  // it calls the error middleware if there was a rejected promise.
  app.use(error);
};
