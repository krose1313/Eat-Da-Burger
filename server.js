var express = require("express");
var bodyParser = require("body-parser");
var expressMethodOverride = require("express-method-override");
const orm = require('./config/orm.js')

var app = express();
var port = 3000 || process.env.PORT;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use Handlebars to render the main index.html page with the orders in it.
app.get("/", function(req, res) {
  orm.selectAll('orders', function(err, data) {
    if (err) { return res.status(500).end(); }
    console.log(data)
    res.render("index", { orders: data });
  });
});

// Create a new order
app.post("/orders", function(req, res) {
  orm.insertInto('orders', 'food_order', req.body.order, function(err, data) {
    if (err) { return res.status(500).end(); }
    res.json({ id: data.insertId });
  })
});

// Retrieve all orders
app.get("/orders", function(req, res) {
  orm.selectAll('orders', function(err, result) {
    if (err) { return res.status(500).end(); }
    res.json(result);
  });
});

// Update a order
app.put("/food_order/:id", function(req, res) {
  orm.updateOne('orders', 'food_order', req.body.order, req.params.id, function(err, data) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (data.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});

// Delete a order
app.delete("/orders/:id", function(req, res) {
  orm.deleteOne('orders', req.params.id, function(err, data) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (data.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});

app.listen(port, function() {
  console.log("listening on port", port);
});
