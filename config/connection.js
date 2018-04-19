const express = require("express");
const mysql  = require('mysql');
var app = express();
app.use(express.logger());

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b8f91155f39e12",
  password: "cf74bf8c",
  database: "heroku_9959dc4e30eb620"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;